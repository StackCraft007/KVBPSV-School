import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { X } from "lucide-react";

type Album = { id: string; title: string };
type Image = { id: string; album_id: string; image_url: string };

const GalleryAlbumManager: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch albums and images
  useEffect(() => {
    const fetchData = async () => {
      const { data: albumData } = await supabase.from("gallery_albums").select("*").order("created_at");
      const { data: imageData } = await supabase.from("gallery_images").select("*").order("created_at");
      setAlbums(albumData || []);
      setImages(imageData || []);
    };
    fetchData();
  }, []);

  // Add new album
  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumTitle.trim()) return;
    const { data, error } = await supabase.from("gallery_albums").insert([{ title: newAlbumTitle }]).select().single();
    if (!error && data) setAlbums(albums => [...albums, data]);
    setNewAlbumTitle("");
  };

  // Remove album and its images
  const handleRemoveAlbum = async (albumId: string) => {
    await supabase.from("gallery_images").delete().eq("album_id", albumId);
    await supabase.from("gallery_albums").delete().eq("id", albumId);
    setAlbums(albums => albums.filter(a => a.id !== albumId));
    setImages(images => images.filter(img => img.album_id !== albumId));
  };

  // Upload image to album
  const handleUploadImage = async (albumId: string, file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      const { data, error } = await supabase.from("gallery_images").insert([{ album_id: albumId, image_url: url }]).select().single();
      if (!error && data) setImages(imgs => [...imgs, data]);
    } finally {
      setUploading(false);
    }
  };

  // Remove image
  const handleRemoveImage = async (imageId: string) => {
    await supabase.from("gallery_images").delete().eq("id", imageId);
    setImages(imgs => imgs.filter(img => img.id !== imageId));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Gallery Albums</h2>
      <form onSubmit={handleAddAlbum} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New Album Title"
          value={newAlbumTitle}
          onChange={e => setNewAlbumTitle(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add Album
        </button>
      </form>
      <div className="grid md:grid-cols-2 gap-6">
        {albums.map(album => (
          <div key={album.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">{album.title}</div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemoveAlbum(album.id)}
                title="Delete Album"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {images.filter(img => img.album_id === album.id).map(img => (
                <div key={img.id} className="relative group">
                  <img src={img.image_url} alt="" className="h-24 w-32 object-cover rounded" />
                  <button
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition"
                    onClick={() => handleRemoveImage(img.id)}
                    title="Remove Image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={e => {
                if (e.target.files) {
                  Array.from(e.target.files).forEach(file => handleUploadImage(album.id, file));
                  e.target.value = "";
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAlbumManager;
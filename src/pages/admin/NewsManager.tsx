import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { X, Pencil } from "lucide-react";

type News = { id: string; title: string; description: string; date: string };
type NewsImage = { id: string; news_id: string; image_url: string };

const NewsManager: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [images, setImages] = useState<NewsImage[]>([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", date: "" });
  const [newImages, setNewImages] = useState<File[]>([]);

  // Fetch news and images
  useEffect(() => {
    const fetchData = async () => {
      const { data: newsData } = await supabase.from("news").select("*").order("date", { ascending: false });
      const { data: imageData } = await supabase.from("news_images").select("*");
      setNewsList(newsData || []);
      setImages(imageData || []);
    };
    fetchData();
  }, []);

  // Handle input for new news
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new news
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.date) return;
    const { data, error } = await supabase.from("news").insert([form]).select().single();
    if (!error && data) {
      setNewsList(news => [data, ...news]);
      // Upload images if any
      for (const file of newImages) {
        const url = await uploadToCloudinary(file);
        await supabase.from("news_images").insert([{ news_id: data.id, image_url: url }]);
      }
      // Fetch images again to update UI
      const { data: imageData } = await supabase.from("news_images").select("*");
      setImages(imageData || []);
    }
    setForm({ title: "", description: "", date: "" });
    setNewImages([]);
  };

  // Remove news and its images
  const handleRemoveNews = async (newsId: string) => {
    await supabase.from("news_images").delete().eq("news_id", newsId);
    await supabase.from("news").delete().eq("id", newsId);
    setNewsList(news => news.filter(n => n.id !== newsId));
    setImages(imgs => imgs.filter(img => img.news_id !== newsId));
  };

  // Start editing news
  const handleEditNews = (news: News) => {
    setEditingId(news.id);
    setEditForm({ title: news.title, description: news.description, date: news.date });
  };

  // Handle input for editing
  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Update news
  const handleUpdateNews = async (newsId: string) => {
    const { data, error } = await supabase.from("news").update(editForm).eq("id", newsId).select().single();
    if (!error && data) {
      setNewsList(news => news.map(n => n.id === newsId ? data : n));
      setEditingId(null);
    }
  };

  // Upload image to news
  const handleUploadImage = async (newsId: string, file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      const { data, error } = await supabase.from("news_images").insert([{ news_id: newsId, image_url: url }]).select().single();
      if (!error && data) setImages(imgs => [...imgs, data]);
    } finally {
      setUploading(false);
    }
  };

  // Remove image from news
  const handleRemoveImage = async (imageId: string) => {
    await supabase.from("news_images").delete().eq("id", imageId);
    setImages(imgs => imgs.filter(img => img.id !== imageId));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage News</h2>
      <form onSubmit={handleAddNews} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="News Title"
          value={form.title}
          onChange={handleInput}
          className="border p-2 rounded flex-1"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInput}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInput}
          className="border p-2 rounded flex-1"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={e => setNewImages(e.target.files ? Array.from(e.target.files) : [])}
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add News
        </button>
      </form>
      <div className="grid md:grid-cols-2 gap-6">
        {newsList.map(news => (
          <div key={news.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              {editingId === news.id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditInput}
                    className="border p-2 rounded flex-1 mb-2"
                  />
                </>
              ) : (
                <div className="font-bold text-lg">{news.title}</div>
              )}
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEditNews(news)}
                  title="Edit News"
                >
                  <Pencil size={20} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveNews(news.id)}
                  title="Delete News"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            {editingId === news.id ? (
              <>
                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditInput}
                  className="border p-2 rounded mb-2"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditInput}
                  className="border p-2 rounded mb-2 w-full"
                />
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded mb-2"
                  onClick={() => handleUpdateNews(news.id)}
                >
                  Save
                </button>
                <button
                  className="ml-2 text-gray-600 underline"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="text-sm text-gray-500 mb-2">{news.date}</div>
                <div className="mb-2">{news.description}</div>
              </>
            )}
            <div className="flex flex-wrap gap-2 mb-2">
              {images.filter(img => img.news_id === news.id).map(img => (
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
                  Array.from(e.target.files).forEach(file => handleUploadImage(news.id, file));
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

export default NewsManager;
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  onLoaded?: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onLoaded }) => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [lightbox, setLightbox] = useState<{ album: any; index: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: albumData } = await supabase.from("gallery_albums").select("*").order("created_at");
      const { data: imageData } = await supabase.from("gallery_images").select("*").order("created_at");
      setAlbums(albumData || []);
      setImages(imageData || []);
      if (onLoaded) onLoaded();
    };
    fetchData();
  }, []);

  const openLightbox = (album: any, index: number) => {
    setLightbox({ album, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "auto";
  };

  const showPrev = () => {
    if (!lightbox) return;
    setLightbox(l => {
      if (!l) return l;
      const albumImages = images.filter(img => img.album_id === l.album.id);
      const newIndex = (l.index - 1 + albumImages.length) % albumImages.length;
      return { ...l, index: newIndex };
    });
  };

  const showNext = () => {
    if (!lightbox) return;
    setLightbox(l => {
      if (!l) return l;
      const albumImages = images.filter(img => img.album_id === l.album.id);
      const newIndex = (l.index + 1) % albumImages.length;
      return { ...l, index: newIndex };
    });
  };

  return (
    <section id="gallery" className="py-10 relative overflow-hidden bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-primary text-sm font-medium rounded-full mb-4">
            Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Campus Life & Activities
          </h2>
          <p className="text-lg text-gray-600">
            Explore our vibrant campus environment and student experiences through these images
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map(album => {
            const albumImages = images.filter(img => img.album_id === album.id);
            if (albumImages.length === 0) return null;
            return (
              <div
                key={album.id}
                className="overflow-hidden rounded-xl shadow-md border border-gray-200 group cursor-pointer relative"
                onClick={() => openLightbox(album, 0)}
              >
                <div className="relative">
                  <img
                    src={albumImages[0].image_url}
                    alt={album.title}
                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold px-4 py-2 rounded shadow">
                      Click to see more images
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-lg font-medium text-white drop-shadow-md">{album.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <div
            className="w-11/12 md:w-4/5 lg:w-2/3 h-auto max-h-[80vh] relative flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/70"
              onClick={showPrev}
            >
              <ChevronLeft size={32} />
            </button>
            {(() => {
              const albumImages = images.filter(img => img.album_id === lightbox.album.id);
              const img = albumImages[lightbox.index];
              return (
                <img
                  src={img.image_url}
                  alt={lightbox.album.title}
                  className="w-full h-full max-h-[100vh] object-contain bg-black rounded"
                />
              );
            })()}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/70"
              onClick={showNext}
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
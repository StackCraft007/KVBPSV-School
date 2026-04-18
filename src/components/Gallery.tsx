import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Loader2, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from '../context/LanguageContext';
import { supabase } from "../lib/supabase";

interface GalleryProps {
  onLoaded?: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  album: string;
}

const Gallery: React.FC<GalleryProps> = ({ onLoaded }) => {
  const { t } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ item: GalleryItem; index: number } | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
      if (onLoaded) onLoaded();
    }
  };

  const getWatermarkedUrl = (url: string, type: 'image' | 'video') => {
    return url;
  };

  const openLightbox = (item: GalleryItem, index: number) => {
    setLightbox({ item, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "auto";
  };

  const showPrev = () => {
    if (!lightbox) return;
    const newIndex = (lightbox.index - 1 + items.length) % items.length;
    setLightbox({ item: items[newIndex], index: newIndex });
  };

  const showNext = () => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + 1) % items.length;
    setLightbox({ item: items[newIndex], index: newIndex });
  };

  // Group items by album
  const albums = items.reduce((acc: Record<string, GalleryItem[]>, item) => {
    if (!acc[item.album]) acc[item.album] = [];
    acc[item.album].push(item);
    return acc;
  }, {});

  if (loading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="animate-spin text-orange-600" size={40} />
    </div>
  );

  return (
    <section id="gallery" className="py-7 relative overflow-hidden bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-1.5 bg-blue-50 text-primary text-base font-medium rounded-full mb-4">
            {t('gallery.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('gallery.subtitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('gallery.description')}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic">
            No memories uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(albums).map((albumName) => {
              const albumItems = albums[albumName];
              const firstItem = albumItems[0];
              return (
                <div
                  key={albumName}
                  className="overflow-hidden rounded-xl shadow-md border border-gray-200 group cursor-pointer relative"
                  onClick={() => openLightbox(firstItem, items.indexOf(firstItem))}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={getWatermarkedUrl(firstItem.url, firstItem.type)}
                      alt={firstItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {firstItem.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="text-white fill-white" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-semibold px-4 py-2 rounded shadow">
                        View {albumItems.length} {albumItems.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-lg font-medium text-white drop-shadow-md">{albumName}</p>
                    <p className="text-sm text-gray-300">{firstItem.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[60] bg-black/40 p-2 rounded-full"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            <div
              className="w-11/12 h-screen relative flex items-center justify-center p-4 md:p-10"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-3 hover:bg-black/70 z-[60] transition-colors"
                onClick={showPrev}
              >
                <ChevronLeft size={32} />
              </button>
              
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <motion.div
                  key={lightbox.item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full max-h-[80vh] flex items-center justify-center"
                >
                  {lightbox.item.type === 'video' ? (
                    <video 
                      src={lightbox.item.url} 
                      controls 
                      autoPlay 
                      className="max-w-full max-h-full rounded shadow-2xl"
                    />
                  ) : (
                      <img
                        src={getWatermarkedUrl(lightbox.item.url, lightbox.item.type)}
                        alt={lightbox.item.title}
                        className="max-w-full max-h-full object-contain rounded shadow-2xl"
                      />
                  )}
                </motion.div>
                <div className="text-center">
                  <h3 className="text-white text-xl font-bold">{lightbox.item.title}</h3>
                  <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">{lightbox.item.album}</p>
                </div>
              </div>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-3 hover:bg-black/70 z-[60] transition-colors"
                onClick={showNext}
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
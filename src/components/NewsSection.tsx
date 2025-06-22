import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface NewsSectionProps {
  onLoaded?: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onLoaded }) => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [popup, setPopup] = useState<{ news: any; index: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: newsData } = await supabase.from("news").select("*").order("date", { ascending: false });
      const { data: imageData } = await supabase.from("news_images").select("*");
      setNewsList(newsData || []);
      setImages(imageData || []);
      if (onLoaded) onLoaded();
    };
    fetchData();
  }, []);

  const openPopup = (news: any, index: number) => {
    setPopup({ news, index });
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setPopup(null);
    document.body.style.overflow = "auto";
  };

  const showPrev = () => {
    if (!popup) return;
    setPopup(l => {
      if (!l) return l;
      const newsImages = images.filter(img => img.news_id === l.news.id);
      const newIndex = (l.index - 1 + newsImages.length) % newsImages.length;
      return { ...l, index: newIndex };
    });
  };

  const showNext = () => {
    if (!popup) return;
    setPopup(l => {
      if (!l) return l;
      const newsImages = images.filter(img => img.news_id === l.news.id);
      const newIndex = (l.index + 1) % newsImages.length;
      return { ...l, index: newIndex };
    });
  };

  return (
    <section id="news" className="py-8   relative overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-primary text-sm font-medium rounded-full mb-4">
            News
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Latest Events & Announcements
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map(news => {
            const newsImages = images.filter(img => img.news_id === news.id);
            return (
              <div
                key={news.id}
                className="neo-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  {newsImages[0] && (
                    <img
                      src={newsImages[0].image_url}
                      alt={news.title}
                      className="w-full h-full object-cover bg-black"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-sm font-medium flex items-center shadow-sm">
                    {news.date}
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-3">{news.description}</p>
                  <div className="mt-auto flex justify-end">
                    <button
                      className="text-orange-600 hover:underline font-medium"
                      onClick={e => {
                        e.stopPropagation();
                        openPopup(news, 0);
                      }}
                    >
                      Read more &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Popup */}
      {popup && (() => {
        const newsImages = images.filter(img => img.news_id === popup.news.id);
        const img = newsImages[popup.index];
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={closePopup}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto relative flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              {/* X button to close the popup */}
              <button
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors z-10"
                onClick={closePopup}
              >
                <X style={{color:"white"}} size={32} />
              </button>
              <div className="relative w-full">
                {img && (
                  <img
                    src={img.image_url}
                    alt={popup.news.title}
                    className="w-full max-h-72 object-cover rounded-t-lg"
                  />
                )}
                {newsImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/70"
                      onClick={e => { e.stopPropagation(); showPrev(); }}
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/70"
                      onClick={e => { e.stopPropagation(); showNext(); }}
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}
              </div>
              <div className="p-6 w-full">
                <h3 className="text-2xl font-bold mb-4 text-center">{popup.news.title}</h3>
                <p className="text-gray-700 mb-4 text-center">{popup.news.description}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default NewsSection;
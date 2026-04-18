import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';
import { supabase } from "../lib/supabase";

interface News {
  id: string;
  title_en: string;
  title_mr: string;
  description_en: string;
  description_mr: string;
  date: string;
  image_url: string;
}

interface NewsSectionProps {
  onLoaded?: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onLoaded }) => {
  const { t, language } = useLanguage();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [popup, setPopup] = useState<News | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_items")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setNewsData(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newsData.length > 0 && imagesLoaded >= newsData.length && onLoaded) {
      onLoaded();
    } else if (newsData.length === 0 && !loading && onLoaded) {
      onLoaded();
    }
  }, [imagesLoaded, newsData, loading]);



  const openPopup = (news: News) => {
    setPopup(news);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setPopup(null);
    document.body.style.overflow = "auto";
  };

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <section id="news" className="py-7 relative overflow-hidden">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-1.5 bg-blue-50 text-primary text-base font-medium rounded-full mb-4">
            {t('news.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('news.heading')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map(news => (
            <div
              key={news.id}
              className="neo-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image_url}
                  alt={language === 'en' ? news.title_en : news.title_mr}
                  className="w-full h-full object-cover bg-black"
                  loading="lazy"
                  onLoad={handleImageLoad}
                />
                <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-sm font-medium flex items-center shadow-sm">
                  {new Date(news.date).toLocaleDateString(language === 'en' ? 'en-US' : 'mr-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {language === 'en' ? news.title_en : news.title_mr}
                </h3>
                <p className="text-gray-600 mb-2 line-clamp-3">
                  {language === 'en' ? news.description_en : news.description_mr}
                </p>
                <div className="mt-auto flex justify-end">
                  <button
                    className="text-orange-600 hover:underline font-medium"
                    onClick={e => {
                      e.stopPropagation();
                      openPopup(news);
                    }}
                  >
                    {t('news.readmore')} &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
          {newsData.length === 0 && !loading && (
             <div className="col-span-full text-center py-20 text-gray-500 italic">
                No recent news or events to show.
             </div>
          )}
        </div>
      </div>
      {/* Popup */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto relative flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10 bg-black/50 p-1 rounded-full"
              onClick={closePopup}
            >
              <X size={24} />
            </button>
            <div className="relative w-full">
              <img
                src={popup.image_url}
                alt={language === 'en' ? popup.title_en : popup.title_mr}
                className="w-full max-h-72 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6 w-full">
              <h3 className="text-2xl font-bold mb-2 text-center">
                {language === 'en' ? popup.title_en : popup.title_mr}
              </h3>
              <p className="text-sm text-gray-400 text-center mb-4">
                {new Date(popup.date).toLocaleDateString(language === 'en' ? 'en-US' : 'mr-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
              </p>
              <p className="text-gray-700 mb-4 text-center">
                {language === 'en' ? popup.description_en : popup.description_mr}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;

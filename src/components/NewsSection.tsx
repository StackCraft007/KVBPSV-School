import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

interface News {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface NewsSectionProps {
  onLoaded?: () => void;
}

const newsData: News[] = [
  {
    id: "1",
    title: "news.cultural.title",
    description: "news.cultural.description",
    date: "2025-08-15",
    image: "/images/Cultural Activities/cultural-activities-2.jpg"
  },
  {
    id: "2",
    title: "news.science.title",
    description: "news.science.description",
    date: "2025-08-10",
    image: "/images/Events/event1.jpeg"
  },
  {
    id: "3",
    title: "news.sports.title",
    description: "news.sports.description",
    date: "2025-08-05",
    image: "/images/Sports/kho-kho.jpeg"
  }
];

const NewsSection: React.FC<NewsSectionProps> = ({ onLoaded }) => {
  const { t } = useLanguage();
  const [popup, setPopup] = useState<News | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    if (imagesLoaded === newsData.length && onLoaded) {
      onLoaded();
    }
  }, [imagesLoaded]);

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
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-primary text-sm font-medium rounded-full mb-4">
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
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover bg-black"
                  loading="lazy"
                  onLoad={handleImageLoad}
                />
                <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-sm font-medium flex items-center shadow-sm">
                  {new Date(news.date).toLocaleDateString()}
                </div>
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{t(news.title)}</h3>
                <p className="text-gray-600 mb-2 line-clamp-3">{t(news.description)}</p>
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
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
              onClick={closePopup}
            >
              <X size={32} />
            </button>
            <div className="relative w-full">
              <img
                src={popup.image}
                alt={popup.title}
                className="w-full max-h-72 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6 w-full">
              <h3 className="text-2xl font-bold mb-4 text-center">{t(popup.title)}</h3>
              <p className="text-gray-700 mb-4 text-center">{t(popup.description)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;

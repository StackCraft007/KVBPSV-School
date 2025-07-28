import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

interface GalleryProps {
  onLoaded?: () => void;
}

interface Album {
  id: string;
  title: string;
  images: string[];
}

const galleryData: Album[] = [
  {
    id: "school",
    title: "School Campus",
    images: [
      "/images/School Building/KVBP School img1.jpeg",
      "/images/School Building/KVBP School img2.jpeg"
    ]
  },
  {
    id: "classrooms",
    title: "Classrooms",
    images: [
      "/images/Classrooms/classroom1.jpeg",
      "/images/Classrooms/Projector facility.jpeg"
    ]
  },
  {
    id: "computer-labs",
    title: "Computer Labs",
    images: [
      "/images/Computer Labs/3-cctv surveillance.jpeg",
      "/images/Computer Labs/1-complab1.jpg",
      "/images/Computer Labs/2-complab3.jpg"
    ]
  },
  {
    id: "hostel",
    title: "Hostel Facilities",
    images: [
      "/images/Hostel Facilites/Hostel1.jpg"
    ]
  },
  {
    id: "library",
    title: "Library",
    images: [
      "/images/Library/library-1.jpg",
      "/images/Library/library-2.jpg"
    ]
  },
  {
    id: "science-labs",
    title: "Science Labs",
    images: [
      "/images/Science Labs/science-lab-1.jpg",
      "/images/Science Labs/science-lab-2.jpg"
    ]
  },
  {
    id: "sports",
    title: "Sports",
    images: [
      "/images/Sports/kho-kho.jpeg",
      "/images/Sports/table-tennis.jpeg",
      "/images/Sports/volleyball.jpeg"
    ]
  },
  {
    id: "science-exhibition",
    title: "Science Exhibition",
    images: [
      "/images/Science Exhibition/Science_Exhibition.jpg",
      "/images/Science Exhibition/Science_Exhibition-2.jpg"
    ]
  },
  {
    id: "cultural-activities",
    title: "Cultural Activities",
    images: [
      "/images/Cultural Activities/cultural-activities-1.jpg",
      "/images/Cultural Activities/cultural-activities-2.jpg",
      "/images/Cultural Activities/dance2.jpeg"
    ]
  }
];

const Gallery: React.FC<GalleryProps> = ({ onLoaded }) => {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<{ album: Album; index: number } | null>(null);

  useEffect(() => {
    if (onLoaded) onLoaded();
  }, []);

  const openLightbox = (album: Album, index: number) => {
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
      const newIndex = (l.index - 1 + l.album.images.length) % l.album.images.length;
      return { ...l, index: newIndex };
    });
  };

  const showNext = () => {
    if (!lightbox) return;
    setLightbox(l => {
      if (!l) return l;
      const newIndex = (l.index + 1) % l.album.images.length;
      return { ...l, index: newIndex };
    });
  };

  return (
    <section id="gallery" className="py-7 relative overflow-hidden bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-primary text-sm font-medium rounded-full mb-4">
            {t('gallery.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('gallery.subtitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('gallery.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map(album => (
            <div
              key={album.id}
              className="overflow-hidden rounded-xl shadow-md border border-gray-200 group cursor-pointer relative"
              onClick={() => openLightbox(album, 0)}
            >
              <div className="relative">
                <img
                  src={album.images[0]}
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
          ))}
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
            <img
              src={lightbox.album.images[lightbox.index]}
              alt={lightbox.album.title}
              className="w-full h-full max-h-[100vh] object-contain bg-black rounded"
            />
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
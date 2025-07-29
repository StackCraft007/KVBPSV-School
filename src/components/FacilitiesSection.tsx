import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, BookMarked, Home, Dumbbell, Music, Monitor } from 'lucide-react';

const FacilitiesSection: React.FC = () => {
  const { t } = useLanguage();

  const facilities = [
    {
      icon: <Home size={24} className="text-primary" />,
      title: t('facilities.hostel'),
      description: t('facilities.hostel.text'),
      image: '/images/Hostel Facilites/Hostel2.avif'
    },
    {
      icon: <Dumbbell size={24} className="text-primary" />,
      title: t('facilities.sports'),
      description: t('facilities.sports.text'),
      image: '/images/Sports/volleyball.avif'
    },
    {
      icon: <BookMarked size={24} className="text-primary" />,
      title: t('facilities.library'),
      description: t('facilities.library.text'),
      image: '/images/Library/library-2.avif'
    },
    {
      icon: <BookOpen size={24} className="text-primary" />,
      title: t('facilities.labs'),
      description: t('facilities.labs.text'),
      image: '/images/Science Labs/science-lab-1.avif'
    },
    {
      icon: <Music size={24} className="text-primary" />,
      title: t('facilities.cultural'),
      description: t('facilities.cultural.text'),
      image: '/images/Cultural Activities/cultural-activities-1.avif'
    },
    {
      icon: <Monitor size={24} className="text-primary" />,
      title: t('facilities.computer'),
      description: t('facilities.computer.text'),
      image: '/images/Computer Labs/1-complab1.avif'
    },
  ];

  return (
    <section id="facilities" className="py-10 relative overflow-hidden bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-1.5 bg-orange-50 text-red-600 text-base font-medium rounded-full mb-4 animate-fade-in">
            {t('facilities.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            {t('facilities.subtitle')}
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in animation-delay-100">
            {t('facilities.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {facility.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-3 flex items-center justify-center rounded-full bg-red-50 text-red-600">
                    {facility.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{facility.title}</h3>
                </div>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;

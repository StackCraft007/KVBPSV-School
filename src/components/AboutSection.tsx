import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, GraduationCap, Users, Building } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BookOpen size={24} className="text-primary" />,
      title: t('about.mission'),
      description: t('about.mission.text'),
    },
    {
      icon: <GraduationCap size={24} className="text-primary" />,
      title: t('about.vision'),
      description: t('about.vision.text'),
    },
    {
      icon: <Building size={24} className="text-primary" />,
      title: t('about.trust'),
      description: t('about.trust.text'),
    },
  ];

  return (
    <section id="about" className="py-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gray-50/50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-1.5 bg-blue-50 text-primary text-base font-medium rounded-full mb-4 animate-fade-in">
            {t('about.established')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            {t('about.title')}
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in animation-delay-100">
            {t('about.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6 animate-slide-in-left">
            <p className="text-gray-700 leading-relaxed">
              {t('about.description')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">40+</div>
                <div className="text-gray-600 mt-1">{t('about.years')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-gray-600 mt-1">{t('about.students')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-gray-600 mt-1">{t('about.faculty')}</div>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-6 animate-slide-in-right">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="neo-card rounded-xl p-6 transition-transform duration-300 hover:translate-y-[-5px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

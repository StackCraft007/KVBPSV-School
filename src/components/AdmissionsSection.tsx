import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Scroll, GraduationCap, FileText, Wallet } from 'lucide-react';

const AdmissionsSection: React.FC = () => {
  const { t } = useLanguage();

  const admissionInfo = [
    {
      icon: <Scroll size={24} className="text-red-600" />,
      title: t('admissions.process'),
      description: t('admissions.process.text'),
    },
    {
      icon: <GraduationCap size={24} className="text-red-600" />,
      title: t('admissions.eligibility'),
      description: t('admissions.eligibility.text'),
    },
    {
      icon: <FileText size={24} className="text-red-600" />,
      title: t('admissions.documents'),
      description: t('admissions.documents.text'),
    },
    {
      icon: <Wallet size={24} className="text-red-600" />,
      title: t('admissions.fees'),
      description: t('admissions.fees.text'),
    },
  ];

  return (
    <section id="admissions" className="py-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50 rounded-bl-full opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50 rounded-tr-full opacity-50 -z-10"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-5 py-1.5 bg-red-50 text-red-600 text-base font-medium rounded-full mb-4 animate-fade-in">
            {t('admissions.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            {t('admissions.subtitle')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {admissionInfo.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-red-50 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-fade-in animation-delay-400">
          <p className="text-gray-600 mb-6">{t('admissions.contact')}</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
          >
            {t('admissions.apply')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
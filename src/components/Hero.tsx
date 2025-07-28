import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden text-white"
      style={{
        backgroundImage: "url('/images/School Building/KVBP School img1.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 bg-orange-50/80 text-primary text-sm font-medium rounded-full mb-4 animate-fade-in">
          {t('hero.welcome')}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animation-delay-100 animate-fade-in">
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{t('hero.campus')}</span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-orange-100 max-w-xl mx-auto animation-delay-150 animate-fade-in">
          {t('hero.tagline')}
        </p>
        <p className="text-sm text-orange-200 max-w-xl mx-auto animation-delay-150 animate-fade-in">
          {t('hero.trust')}
        </p>
        <p className="text-lg text-orange-200 max-w-xl mx-auto animation-delay-200 animate-fade-in">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animation-delay-300 animate-fade-in">
          <a
            href="#about"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
          >
            {t('hero.cta')}
          </a>
          <a
            href="#admissions"
            className="inline-flex items-center justify-center px-6 py-3 border border-red-600 rounded-lg text-base font-medium text-red-600 bg-white/90 hover:bg-red-50 transition-colors duration-200"
          >
            {t('hero.admissions')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

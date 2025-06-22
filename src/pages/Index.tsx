import React, { useState, useRef } from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FacilitiesSection from '../components/FacilitiesSection';
import AdmissionsSection from '../components/AdmissionsSection';
import Gallery from '../components/Gallery';
import NewsSection from '../components/NewsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SchoolLoader from '../components/SchoolLoader';

const Index: React.FC = () => {
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const timerStarted = useRef(false);

  // Start the 4s timer on first render
  React.useEffect(() => {
    if (!timerStarted.current) {
      timerStarted.current = true;
      setTimeout(() => setMinTimePassed(true), 2000);
    }
  }, []);

  const showLoader = !minTimePassed || !galleryLoaded || !newsLoaded;

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        {showLoader && <SchoolLoader />}
        {!showLoader && <Header />}
        <main className="flex-grow">
          <Hero />
          <AboutSection />
          <FacilitiesSection />
          <AdmissionsSection />
          <Gallery onLoaded={() => setGalleryLoaded(true)} />
          <NewsSection onLoaded={() => setNewsLoaded(true)} />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;

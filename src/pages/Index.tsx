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
import FoundersSection from '../components/FoundersSection';
import PrincipalDeskSection from '../components/PrincipalDeskSection';
import Footer from '../components/Footer';
import SchoolLoader from '../components/SchoolLoader';

const Index: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  // Show loader for exactly 3 seconds
  React.useEffect(() => {
    setTimeout(() => setShowLoader(false), 3000);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        {showLoader && <SchoolLoader />}
        {!showLoader && <Header />}
        <main className="flex-grow">
          <Hero />
          <AboutSection />
          <FoundersSection />
          <PrincipalDeskSection />
          <FacilitiesSection />
          <AdmissionsSection />
          <Gallery />
          <NewsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;

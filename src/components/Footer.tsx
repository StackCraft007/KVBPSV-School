
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Youtube size={20} />, href: '#', label: 'Youtube' },
  ];

  const quickLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.admissions'), href: '#admissions' },
    { name: t('nav.news'), href: '#news' },
    { name: t('nav.gallery'), href: '#gallery' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8">
        {/* Main Content */}
        <div className="text-center mb-6">
          {/* Logo and School Name */}
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 mr-3 rounded-full overflow-hidden border-2 border-orange-400">
              <img 
                src="/images/logo/Phadke logo photo.jpeg" 
                alt="Krantiveer Vasudev Balwant Phadke" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-orange-400">क्रांतिवीर वासुदेव बळवंत</span>
              <span className="text-xl font-bold">फडके स्मृति विद्यालय</span>
            </div>
          </div>

          {/* Motto and Trust */}
          <div className="mb-4">
            <span className="block text-base text-gray-300">तमसोमा ज्योतिर्गमय</span>
            <span className="block text-sm text-gray-400">सरस्वती प्रतिष्ठान दधिचिंना प्रणाम संस्था</span>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center mb-4">
            <ul className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="mb-4">
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* About Text */}
          <p className="text-gray-400 max-w-2xl mx-auto text-sm mb-4">
            एक प्रमुख द्विभाषिक शैक्षणिक संस्था जी शिक्षण आणि अध्ययनामध्ये उत्कृष्टतेसाठी समर्पित आहे.
          </p>
        </div>
        
        {/* Copyright */}
        <div className="pt-4 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            © {currentYear} क्रांतिवीर वासुदेव बळवंत फडके स्मृति विद्यालय. {t('footer.copyright')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

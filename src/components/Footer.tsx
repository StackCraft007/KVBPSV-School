
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

  const footerLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.admissions'), href: '#admissions' },
    { name: t('nav.news'), href: '#news' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.contact'), href: '#contact' },
    { name: t('footer.privacy'), href: '#' },
    { name: t('footer.terms'), href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 mr-3 rounded-full overflow-hidden border-2 border-orange-400">
                <img 
                  src="/images/logo/Phadke logo photo.jpeg" 
                  alt="Krantiveer Vasudev Balwant Phadke" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-orange-400">क्रांतिवीर वासुदेव बळवंत</span>
                <span className="text-lg font-bold">फडके स्मृति विद्यालय</span>
              </div>
            </div>
            <span className="block text-sm text-gray-400 mt-2">तमसोमा ज्योतिर्गमय</span>
            <span className="block text-xs text-gray-500 mt-1">सरस्वती प्रतिष्ठान दधिचिंना प्रणाम संस्था</span>
            <p className="text-gray-400 mt-4 max-w-xs">
              एक प्रमुख द्विभाषिक शैक्षणिक संस्था जी शिक्षण आणि अध्ययनामध्ये उत्कृष्टतेसाठी समर्पित आहे.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 4).map((link, index) => (
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
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Faculty Resources
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Academic Calendar
                </a>
              </li>
              {footerLinks.slice(4).map((link, index) => (
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
          
          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400">
              <span className="block mb-1">info@kvbpsmriti.edu</span>
              <span>+91 12345 67890</span>
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            © {currentYear} क्रांतिवीर वासुदेव बळवंत फडके स्मृति विद्यालय. {t('footer.copyright')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

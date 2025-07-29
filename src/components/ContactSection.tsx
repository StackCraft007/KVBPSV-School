import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: <MapPin size={24} className="text-red-600" />,
      title: t('contact.address'),
      content: t('contact.address.text'),
    },
    {
      icon: <Phone size={24} className="text-red-600" />,
      title: t('contact.phone'),
      content: '+91 97671 73929',
    },
    {
      icon: <Mail size={24} className="text-red-600" />,
      title: t('contact.email'),
      content: 'kvbpsv4502rawadi@gmail.com',
    },
    {
      icon: <Clock size={24} className="text-red-600" />,
      title: t('contact.hours'),
      content: t('contact.hours.text'),
    },
  ];

  return (
    <section id="contact" className="py-5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-50 rounded-tr-full opacity-50 -z-10"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-red-600 text-sm font-medium rounded-full mb-4 animate-fade-in">
            {t('contact.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            {t('contact.subtitle')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in-left">
            {contactItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mr-4 p-3 bg-orange-50 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg h-80 animate-slide-in-right border-4 border-orange-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26612.329824382266!2d73.83962083955077!3d18.16780710000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295a5d240e7c3%3A0x6c7c759d174d23e4!2sRawadi%2C%20Maharashtra%20412206!5e0!3m2!1sen!2sin!4v1719058973992!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Campus Location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

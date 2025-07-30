import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFacebook, 
  FaInstagram,
  FaUsers
} from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61578783275403&sk=about_details', color: 'hover:bg-blue-600' },
  { icon: FaInstagram, href: 'https://www.instagram.com/kvbp_rawadi/', color: 'hover:bg-pink-600' },
];

const FloatingSocialIcons = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-3 mb-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 } 
                }}
                exit={{ 
                  opacity: 0, 
                  y: 20,
                  transition: { delay: (socialLinks.length - index - 1) * 0.1 } 
                }}
                className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 transition-colors duration-300 ${social.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaUsers     size={20} />
      </motion.button>
    </div>
  );
};

export default FloatingSocialIcons;

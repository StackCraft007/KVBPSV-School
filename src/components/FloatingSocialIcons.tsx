import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFacebook, 
  FaInstagram,
  FaUsers
} from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61578783275403&sk=about_details', color: 'hover:text-white hover:bg-blue-600' },
  { icon: FaInstagram, href: 'https://www.instagram.com/kvbp_rawadi/', color: 'hover:text-white hover:bg-pink-600' },
];

const FloatingSocialIcons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (!heroSection) return;

      const heroRect = heroSection.getBoundingClientRect();
      const heroBottom = heroRect.bottom;
      const viewportHeight = window.innerHeight;
      
      // Show icons almost immediately when starting to scroll
      if (heroBottom <= viewportHeight * 0.95) {
        setShowIcons(true);
      } else {
        setShowIcons(false);
        setIsOpen(false);
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIcons && (
        <motion.div
          className="fixed bottom-8 right-3 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
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
                    className={`w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color}`}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaUsers size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSocialIcons;

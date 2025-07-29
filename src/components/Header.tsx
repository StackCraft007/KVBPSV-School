// import React, { useState, useEffect } from 'react';
// import { useLanguage } from '../context/LanguageContext';
// import { Menu, X, UserCircle } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Header: React.FC = () => {
//   const { language, setLanguage, t } = useLanguage();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       setIsScrolled(scrollPosition > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const navLinks = [
//     { id: 'home', label: t('nav.home'), href: '#home' },
//     { id: 'about', label: t('nav.about'), href: '#about' },
//     { id: 'facilities', label: t('nav.facilities'), href: '#facilities' },
//     { id: 'admissions', label: t('nav.admissions'), href: '#admissions' },
//     { id: 'news', label: t('nav.news'), href: '#news' },
//     { id: 'gallery', label: t('nav.gallery'), href: '#gallery' },
//     { id: 'contact', label: t('nav.contact'), href: '#contact' },
//   ];

//   // Helper to check if current route is admin
//   const isAdminRoute = location.pathname.startsWith('/admin');

//   // Handler for nav link click
//   const handleNavClick = (href: string) => {
//     if (isAdminRoute) {
//       // Go to main page and scroll to section
//       window.location.href = '/' + href;
//     } else {
//       // Scroll to section on current page
//       const id = href.replace('#', '');
//       const el = document.getElementById(id);
//       if (el) {
//         el.scrollIntoView({ behavior: 'smooth' });
//       } else {
//         window.location.hash = href;
//       }
//     }
//   };

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a href="#" className="flex items-center">
//               <div className="h-12 w-12 mr-3 rounded-full overflow-hidden border-2 border-orange-400">
//                 <img 
//                   src="/images/logo/Phadke logo photo.avif" 
//                   alt="Krantiveer Vasudev Balwant Phadke" 
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-lg md:text-xl font-bold text-primary">क्रांतिवीर वासुदेव बळवंत</span>
//                 <span className="text-lg md:text-xl font-bold">फडके स्मृति विद्यालय</span>
//               </div>
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {navLinks.map((link) => (
//               <a
//                 key={link.id}
//                 className="nav-link font-medium"
//                 style={{ cursor: 'pointer' }}
//                 onClick={e => {
//                   e.preventDefault();
//                   handleNavClick(link.href);
//                 }}
//               >
//                 {link.label}
//               </a>
//             ))}
//           </nav>

//           {/* Language Switcher & Admin Icon */}
//           <div className="hidden md:flex items-center gap-4">
//             <div className="language-switch">
//               <button
//                 className={`language-option ${language === 'mr' ? 'language-option-active' : ''}`}
//                 onClick={() => setLanguage('mr')}
//               >
//                 मराठी
//               </button>
//               <button
//                 className={`language-option ${language === 'en' ? 'language-option-active' : ''}`}
//                 onClick={() => setLanguage('en')}
//               >
//                 English
//               </button>
//             </div>
//             {/* Admin/User Icon */}
//             {/* <UserCircle
//               size={32}
//               className="ml-4 cursor-pointer text-primary hover:text-orange-600 transition-colors"
//               onClick={() => {
//                 const isLoggedIn = !!localStorage.getItem('supabase.auth.token');
//                 if (isLoggedIn) {
//                   navigate('/admin/dashboard');
//                 } else {
//                   navigate('/admin/login');
//                 }
//               }}
//             /> */}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
//               onClick={toggleMobileMenu}
//             >
//               <span className="sr-only">Open main menu</span>
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
//           isMobileMenuOpen ? 'max-h-screen bg-white/90 backdrop-blur-md shadow-sm' : 'max-h-0'
//         }`}
//       >
//         <div className="px-4 py-3 space-y-1">
//           {navLinks.map((link) => (
//             <a
//               key={link.id}
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
//               style={{ cursor: 'pointer' }}
//               onClick={e => {
//                 e.preventDefault();
//                 handleNavClick(link.href);
//                 toggleMobileMenu();
//               }}
//             >
//               {link.label}
//             </a>
//           ))}
          
//           {/* Mobile Language Switcher */}
//           <div className="pt-4 pb-2 flex items-center justify-between">
//             <div className="language-switch w-full flex justify-center">
//               <button
//                 className={`language-option ${language === 'mr' ? 'language-option-active' : ''}`}
//                 onClick={() => setLanguage('mr')}
//               >
//                 मराठी
//               </button>
//               <button
//                 className={`language-option ${language === 'en' ? 'language-option-active' : ''}`}
//                 onClick={() => setLanguage('en')}
//               >
//                 English
//               </button>
//             </div>
//             {/* Admin/User Icon for mobile */}
//             {/* <UserCircle
//               size={32}
//               className="ml-4 cursor-pointer text-primary hover:text-orange-600 transition-colors"
//               onClick={() => {
//                 setIsMobileMenuOpen(false);
//                 const isLoggedIn = !!localStorage.getItem('supabase.auth.token');
//                 if (isLoggedIn) {
//                   navigate('/admin/dashboard');
//                 } else {
//                   navigate('/admin/login');
//                 }
//               }}
//             /> */}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { id: 'home', label: t('nav.home'), href: '#home' },
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'facilities', label: t('nav.facilities'), href: '#facilities' },
    { id: 'admissions', label: t('nav.admissions'), href: '#admissions' },
    { id: 'news', label: t('nav.news'), href: '#news' },
    { id: 'gallery', label: t('nav.gallery'), href: '#gallery' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleNavClick = (href: string) => {
    if (isAdminRoute) {
      window.location.href = '/' + href;
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = href;
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <div className="h-12 w-12 mr-3 rounded-full overflow-hidden border-2 border-orange-400">
                <img 
                  src="/images/logo/Phadke logo photo.avif" 
                  alt="Krantiveer Vasudev Balwant Phadke" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm md:text-xl font-bold text-primary">क्रांतिवीर वासुदेव बळवंत</span>
                <span className="text-sm md:text-xl font-bold">फडके स्मृति विद्यालय</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                className="nav-link font-medium"
                style={{ cursor: 'pointer' }}
                onClick={e => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language Switcher + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Compact Language Toggle */}
            <div className="flex items-center border border-gray-300 rounded-md text-xs font-semibold bg-transparent opacity-70 hover:opacity-100 transition-opacity duration-200 overflow-hidden" >
              <button
                className={`px-3 py-1 w-10 text-center ${
                  language === 'en'
                    ? 'bg-orange-500 text-white'
                    : 'bg-transparent text-black hover:bg-orange-100'
                }` } style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                className={`px-3 py-1 w-10 text-center ${
                  language === 'mr'
                    ? 'bg-orange-500 text-white'
                    : 'bg-transparent text-black hover:bg-orange-100'
                }`}
                onClick={() => setLanguage('mr')}
              >
                म
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } bg-white/95 backdrop-blur-md shadow-md overflow-hidden`}
      >
        <div className="px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              style={{ cursor: 'pointer' }}
              onClick={e => {
                e.preventDefault();
                handleNavClick(link.href);
                toggleMobileMenu();
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

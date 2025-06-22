import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'mr' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translations
const translations: Record<string, Record<Language, string>> = {
  // Header
  'nav.home': {
    en: 'Home',
    mr: 'मुख्यपृष्ठ',
  },
  'nav.about': {
    en: 'About',
    mr: 'आमच्याबद्दल',
  },
  'nav.admissions': {
    en: 'Admissions',
    mr: 'प्रवेश',
  },
  'nav.news': {
    en: 'News & Events',
    mr: 'बातम्या आणि कार्यक्रम',
  },
  'nav.gallery': {
    en: 'Gallery',
    mr: 'गॅलरी',
  },
  'nav.contact': {
    en: 'Contact',
    mr: 'संपर्क',
  },
  'nav.facilities': {
    en: 'Facilities',
    mr: 'सुविधा',
  },

  // Hero Section
  'hero.welcome': {
    en: 'Welcome to',
    mr: 'येथे आपले स्वागत आहे',
  },
  'hero.campus': {
    en: 'Krantiveer Vasudev Balvant Phadke Smriti Vidyalay',
    mr: 'क्रांतिवीर वासुदेव बळवंत फडके स्मृति विद्यालय',
  },
  'hero.trust': {
    en: 'Saraswati Pratishthan Dadhichinna Pranam Sanstha',
    mr: 'सरस्वती प्रतिष्ठान दधिचिंना प्रणाम संस्था',
  },
  'hero.tagline': {
    en: 'तमसोमा ज्योतिर्गमय',
    mr: 'तमसोमा ज्योतिर्गमय',
  },
  'hero.subtitle': {
    en: 'Leading bilingual education with excellence in academics and cultural heritage since 1983',
    mr: '१९८३ पासून शैक्षणिक उत्कृष्टता आणि सांस्कृतिक वारसा यांच्यासह द्विभाषिक शिक्षणात अग्रगण्य',
  },
  'hero.cta': {
    en: 'Learn More',
    mr: 'अधिक जाणून घ्या',
  },
  'hero.admissions': {
    en: 'Apply Now',
    mr: 'आता अर्ज करा',
  },

  // About Section
  'about.title': {
    en: 'About Our Institution',
    mr: 'आमच्या संस्थेबद्दल',
  },
  'about.subtitle': {
    en: 'Excellence in education since 1983',
    mr: '१९८३ पासून शिक्षणातील उत्कृष्टता',
  },
  'about.description': {
    en: 'Established on February 17, 1983, our school is dedicated to providing quality education that embraces both Marathi and English languages. Named after the great revolutionary Krantiveer Vasudev Balvant Phadke, we nurture students from standards 5th to 12th following Maharashtra State Board curriculum. Located in the beautiful surroundings of Rawadi, Bhor, Pune, our school also provides hostel facilities for students.',
    mr: '१७ फेब्रुवारी १९८३ रोजी स्थापित, आमची शाळा मराठी आणि इंग्रजी या दोन्ही भाषांना सामावून घेणारे गुणवत्तापूर्ण शिक्षण देण्यासाठी समर्पित आहे. महान क्रांतिकारक क्रांतिवीर वासुदेव बळवंत फडके यांच्या नावावर, आम्ही इयत्ता ५ वी ते १२ वी पर्यंतच्या विद्यार्थ्यांचे महाराष्ट्र राज्य मंडळाच्या अभ्यासक्रमानुसार संगोपन करतो. रावडी, भोर, पुणे येथील सुंदर परिसरात स्थित, आमची शाळा विद्यार्थ्यांसाठी वसतिगृह सुविधा देखील प्रदान करते.',
  },
  'about.mission': {
    en: 'Our Mission',
    mr: 'आमचे ध्येय',
  },
  'about.mission.text': {
    en: 'To lead students from darkness to light (तमसोमा ज्योतिर्गमय) through quality education while preserving our cultural heritage.',
    mr: 'गुणवत्तापूर्ण शिक्षणाद्वारे आपला सांस्कृतिक वारसा जपत विद्यार्थ्यांना अंधारातून प्रकाशाकडे (तमसोमा ज्योतिर्गमय) नेणे.',
  },
  'about.vision': {
    en: 'Our Vision',
    mr: 'आमची दृष्टी',
  },
  'about.vision.text': {
    en: 'To become a leading institution that bridges traditional values with modern education, creating well-rounded individuals inspired by the revolutionary spirit of Vasudev Balvant Phadke.',
    mr: 'वासुदेव बळवंत फडके यांच्या क्रांतिकारी भावनेने प्रेरित, पारंपारिक मूल्यांना आधुनिक शिक्षणाशी जोडणारी, सर्वांगीण व्यक्तिमत्त्व तयार करणारी अग्रगण्य संस्था बनणे.',
  },
  'about.trust': {
    en: 'Managing Trust',
    mr: 'व्यवस्थापन विश्वस्त',
  },
  'about.trust.text': {
    en: 'Saraswati Pratishthan Dadhichinna Pranam Sanstha',
    mr: 'सरस्वती प्रतिष्ठान दधिचिंना प्रणाम संस्था',
  },

  // Facilities Section
  'facilities.title': {
    en: 'Our Facilities',
    mr: 'आमच्या सुविधा',
  },
  'facilities.subtitle': {
    en: 'Providing a complete environment for growth',
    mr: 'विकासासाठी संपूर्ण वातावरण प्रदान करणे',
  },
  'facilities.hostel': {
    en: 'Hostel',
    mr: 'वसतिगृह',
  },
  'facilities.hostel.text': {
    en: 'Well-maintained residential facilities for boys and girls with proper supervision and care.',
    mr: 'मुले आणि मुलींसाठी योग्य देखरेख आणि काळजीसह सुव्यवस्थित निवासी सुविधा.',
  },
  'facilities.sports': {
    en: 'Sports',
    mr: 'क्रीडा',
  },
  'facilities.sports.text': {
    en: 'Spacious playgrounds for outdoor games and indoor facilities for table tennis and other sports.',
    mr: 'मैदानी खेळांसाठी विशाल मैदान आणि टेबल टेनिस आणि इतर खेळांसाठी अंतर्गत सुविधा.',
  },
  'facilities.library': {
    en: 'Library',
    mr: 'ग्रंथालय',
  },
  'facilities.library.text': {
    en: 'A vast collection of books, reference materials, and periodicals to enhance knowledge.',
    mr: 'ज्ञान वाढवण्यासाठी पुस्तके, संदर्भ सामग्री आणि नियतकालिकांचा विशाल संग्रह.',
  },
  'facilities.labs': {
    en: 'Laboratories',
    mr: 'प्रयोगशाळा',
  },
  'facilities.labs.text': {
    en: 'Modern science and computer laboratories for practical learning and experimentation.',
    mr: 'प्रात्यक्षिक शिक्षण आणि प्रयोगांसाठी आधुनिक विज्ञान आणि संगणक प्रयोगशाळा.',
  },
  'facilities.cultural': {
    en: 'Cultural Activities',
    mr: 'सांस्कृतिक उपक्रम',
  },
  'facilities.cultural.text': {
    en: 'Regular cultural programs to develop artistic talents and preserve traditional values.',
    mr: 'कलात्मक प्रतिभा विकसित करण्यासाठी आणि पारंपारिक मूल्ये जपण्यासाठी नियमित सांस्कृतिक कार्यक्रम.',
  },
  'facilities.computer': {
    en: 'Computer Lab',
    mr: 'संगणक प्रयोगशाळा',
  },
  'facilities.computer.text': {
    en: 'Modern computer laboratories with internet access and latest software for digital literacy.',
    mr: 'डिजिटल साक्षरतेसाठी इंटरनेट अॅक्सेस आणि नवीनतम सॉफ्टवेअरसह आधुनिक संगणक प्रयोगशाळा.',
  },

  // Admissions Section
  'admissions.title': {
    en: 'Admissions',
    mr: 'प्रवेश',
  },
  'admissions.subtitle': {
    en: 'Join our prestigious institution',
    mr: 'आमच्या प्रतिष्ठित संस्थेत सामील व्हा',
  },
  'admissions.process': {
    en: 'Admission Process',
    mr: 'प्रवेश प्रक्रिया',
  },
  'admissions.process.text': {
    en: 'Our admission process is designed to identify students who will thrive in our bilingual learning environment and contribute positively to our school community.',
    mr: 'आमची प्रवेश प्रक्रिया अशा विद्यार्थ्यांना ओळखण्यासाठी डिझाइन केली आहे जे आमच्या द्विभाषिक शिक्षण वातावरणात यशस्वी होतील आणि आमच्या शाळेच्या समुदायात सकारात्मक योगदान देतील.',
  },
  'admissions.eligibility': {
    en: 'Eligibility Criteria',
    mr: 'पात्रता निकष',
  },
  'admissions.eligibility.text': {
    en: 'Students seeking admission must meet age requirements and demonstrate basic academic proficiency through an entrance assessment.',
    mr: 'प्रवेश घेऊ इच्छिणाऱ्या विद्यार्थ्यांनी वयाची आवश्यकता पूर्ण करणे आणि प्रवेश मूल्यांकनाद्वारे मूलभूत शैक्षणिक प्रावीण्य प्रदर्शित करणे आवश्यक आहे.',
  },
  'admissions.documents': {
    en: 'Required Documents',
    mr: 'आवश्यक कागदपत्रे',
  },
  'admissions.documents.text': {
    en: 'Birth certificate, previous school records, passport-sized photographs, and address proof are required for admission application.',
    mr: 'प्रवेश अर्जासाठी जन्म प्रमाणपत्र, मागील शाळेची कागदपत्रे, पासपोर्ट आकाराचे फोटो आणि पत्त्याचा पुरावा आवश्यक आहे.',
  },
  'admissions.fees': {
    en: 'Fee Structure',
    mr: 'शुल्क संरचना',
  },
  'admissions.fees.text': {
    en: 'Our fee structure includes tuition, development fees, and additional charges for extracurricular activities and special programs.',
    mr: 'आमच्या शुल्क संरचनेमध्ये शिक्षण शुल्क, विकास शुल्क आणि अभ्यासेतर क्रियाकलाप आणि विशेष कार्यक्रमांसाठी अतिरिक्त शुल्क समाविष्ट आहे.',
  },
  'admissions.apply': {
    en: 'Apply Now',
    mr: 'आता अर्ज करा',
  },
  'admissions.contact': {
    en: 'Contact our admissions office for more information',
    mr: 'अधिक माहितीसाठी आमच्या प्रवेश कार्यालयाशी संपर्क साधा',
  },

  // News Section
  'news.title': {
    en: 'News & Events',
    mr: 'बातम्या आणि कार्यक्रम',
  },
  'news.subtitle': {
    en: 'Stay updated with our latest happenings',
    mr: 'आमच्या नवीनतम घडामोडींसह अद्ययावत रहा',
  },
  'news.readmore': {
    en: 'Read More',
    mr: 'अधिक वाचा',
  },
  'news.1.title': {
    en: 'Annual Cultural Festival Coming Soon',
    mr: 'वार्षिक सांस्कृतिक महोत्सव लवकरच',
  },
  'news.1.date': {
    en: 'December 12, 2023',
    mr: '१२ डिसेंबर, २०२३',
  },
  'news.1.excerpt': {
    en: 'Join us for a celebration of culture, arts, and performances showcasing our students\' talents in both languages.',
    mr: 'दोन्ही भाषांमध्ये आमच्या विद्यार्थ्यांच्या कौशल्याचे प्रदर्शन करणाऱ्या संस्कृती, कला आणि प्रदर्शनांच्या उत्सवासाठी आमच्यासोबत सहभागी व्हा.',
  },
  'news.2.title': {
    en: 'Sports Day Competition Results',
    mr: 'क्रीडा दिन स्पर्धा निकाल',
  },
  'news.2.date': {
    en: 'November 20, 2023',
    mr: '२० नोव्हेंबर, २०२३',
  },
  'news.2.excerpt': {
    en: 'Congratulations to all participants and winners of our annual sports day competitions that showcased exceptional talent and sportsmanship.',
    mr: 'आमच्या वार्षिक क्रीडा दिन स्पर्धांमध्ये असाधारण प्रतिभा आणि खेळाडूवृत्ती दर्शविणाऱ्या सर्व सहभागींना आणि विजेत्यांना अभिनंदन.',
  },
  'news.3.title': {
    en: 'New Science Laboratory Inauguration',
    mr: 'नवीन विज्ञान प्रयोगशाळेचे उद्घाटन',
  },
  'news.3.date': {
    en: 'October 15, 2023',
    mr: '१५ ऑक्टोबर, २०२३',
  },
  'news.3.excerpt': {
    en: 'We are proud to announce the opening of our state-of-the-art science laboratory to enhance the learning experience of our students.',
    mr: 'आमच्या विद्यार्थ्यांचा शिक्षण अनुभव वाढवण्यासाठी आमच्या अत्याधुनिक विज्ञान प्रयोगशाळेच्या उद्घाटनाची घोषणा करण्यास आम्हाला अभिमान वाटतो.',
  },

  // Contact Section
  'contact.title': {
    en: 'Contact Us',
    mr: 'संपर्क साधा',
  },
  'contact.subtitle': {
    en: 'Get in touch with our administration',
    mr: 'आमच्या प्रशासनाशी संपर्क साधा',
  },
  'contact.address': {
    en: 'Address',
    mr: 'पत्ता',
  },
  'contact.address.text': {
    en: 'Krantiveer Vasudev Balvant Phadke Smriti Vidyalay, Rawadi, Bhor, Pune, Maharashtra, India',
    mr: 'क्रांतिवीर वासुदेव बळवंत फडके स्मृति विद्यालय, रावडी, भोर, पुणे, महाराष्ट्र, भारत',
  },
  'contact.phone': {
    en: 'Phone',
    mr: 'फोन',
  },
  'contact.email': {
    en: 'Email',
    mr: 'ईमेल',
  },
  'contact.hours': {
    en: 'Office Hours',
    mr: 'कार्यालयीन वेळ',
  },
  'contact.hours.text': {
    en: 'Monday to Friday: 9:00 AM - 5:00 PM',
    mr: 'सोमवार ते शुक्रवार: सकाळी ९:०० - संध्याकाळी ५:००',
  },

  // Footer
  'footer.copyright': {
    en: 'All Rights Reserved',
    mr: 'सर्व हक्क राखीव',
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    mr: 'गोपनीयता धोरण',
  },
  'footer.terms': {
    en: 'Terms of Use',
    mr: 'वापरण्याच्या अटी',
  },
  'footer.trust': {
    en: 'Saraswati Pratishthan Dadhichinna Pranam Sanstha',
    mr: 'सरस्वती प्रतिष्ठान दधिचिंना प्रणाम संस्था',
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

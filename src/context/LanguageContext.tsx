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
    en: '"तमसो मा ज्योतिर्गमय"',
    mr: '"तमसो मा ज्योतिर्गमय"',
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
  'about.established': {
    en: 'Est. 1983',
    mr: 'स्था. १९८३',
  },
  'about.years': {
    en: 'Years Experience',
    mr: 'वर्षांचा अनुभव',
  },
  'about.students': {
    en: 'Students',
    mr: 'विद्यार्थी',
  },
  'about.faculty': {
    en: 'Faculty',
    mr: 'शिक्षक वर्ग',
  },
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

  // Founders Section
  'founders.name.1': {
    en: 'Late Dr. Prabhakar Chintaman Joshi',
    mr: 'कै. डॉ. प्रभाकर चिंतामण जोशी',
  },
  'founders.name.2': {
    en: 'Late Balwant Chintaman Joshi',
    mr: 'कै. बलवंत चिंतामण जोशी',
  },
  'founders.designation.1': {
    en: 'Founding President',
    mr: 'संस्थापक अध्यक्ष',
  },
  'founders.designation.2': {
    en: 'Founding Secretary',
    mr: 'संस्थापक कार्यवाह',
  },
  'founders.dates.1': {
    en: '27.01.1935 - 06.09.2020',
    mr: '२७.०१.१९३५ - ०६.०९.२०२०',
  },
  'founders.dates.2': {
    en: '23.07.1939 - 04.09.2020',
    mr: '२३.०७.१९३९ - ०४.०९.२०२०',
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
  'facilities.description': {
    en: 'Our school provides a comprehensive environment for student growth and development',
    mr: 'आमची शाळा विद्यार्थ्यांच्या वाढीसाठी आणि विकासासाठी सर्वसमावेशक वातावरण प्रदान करते',
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
    en: 'News',
    mr: 'बातम्या',
  },
  'news.heading': {
    en: 'Latest Events & Announcements',
    mr: 'नवीनतम कार्यक्रम आणि घोषणा',
  },
  'news.readmore': {
    en: 'Read More',
    mr: 'अधिक वाचा',
  },
  'news.cultural.title': {
    en: 'Annual Cultural Festival Coming Soon',
    mr: 'वार्षिक सांस्कृतिक महोत्सव लवकरच येत आहे',
  },
  'news.cultural.description': {
    en: 'Join us for a celebration of culture, arts, and performances showcasing our students\' talents in both languages.',
    mr: 'दोन्ही भाषांमध्ये आमच्या विद्यार्थ्यांच्या कलागुणांचे प्रदर्शन करणाऱ्या संस्कृती, कला आणि कार्यक्रमांच्या उत्सवासाठी आमच्यासोबत सहभागी व्हा.',
  },
  'news.science.title': {
    en: 'New Science Laboratory Inauguration',
    mr: 'नवीन विज्ञान प्रयोगशाळेचे उद्घाटन',
  },
  'news.science.description': {
    en: 'We are proud to announce the opening of our state-of-the-art science laboratory to enhance the learning experience.',
    mr: 'शैक्षणिक अनुभव वृद्धिंगत करण्यासाठी आमच्या अत्याधुनिक विज्ञान प्रयोगशाळेच्या उद्घाटनाची घोषणा करताना आम्हाला अभिमान वाटतो.',
  },
  'news.sports.title': {
    en: 'Sports Day Competition Results',
    mr: 'क्रीडा दिन स्पर्धा निकाल',
  },
  'news.sports.description': {
    en: 'Congratulations to all participants and winners of our annual sports day competitions that showcased sportsmanship.',
    mr: 'वार्षिक क्रीडा दिन स्पर्धांमध्ये खेळाडूवृत्ती दाखवणाऱ्या सर्व सहभागी आणि विजेत्यांचे अभिनंदन.',
  },

  // Gallery Section
  'gallery.title': {
    en: 'Gallery',
    mr: 'गॅलरी',
  },
  'gallery.subtitle': {
    en: 'Campus Life & Activities',
    mr: 'शालेय जीवन आणि उपक्रम',
  },
  'gallery.description': {
    en: 'Explore our vibrant campus environment and student experiences through these images',
    mr: 'या छायाचित्रांद्वारे आमचे जीवंत शालेय वातावरण आणि विद्यार्थ्यांचे अनुभव पहा',
  },

  // Principal's Desk Section
  'principal.title': {
    en: 'From Principal\'s Desk',
    mr: 'मुख्याध्यापकांच्या लेखणीतून'
  },
  'principal.subtitle': {
    en: 'Welcome Message',
    mr: 'स्वागत संदेश'
  },
  'principal.name': {
    en: 'Mr. Vijaykumar Wakde',
    mr: 'श्री.विजयकुमार वाकडे'
  },
  'principal.designation': {
    en: 'Principal',
    mr: 'मुख्यध्यापक'
  },
  'principal.message.part1': {
    en: 'Welcome to Krantiveer Vasudev Balvant Phadke Smriti Vidyalay, where we believe in nurturing not just students, but future leaders who will carry forward the legacy of our great namesake. Our institution stands as a beacon of holistic education, combining the richness of our cultural heritage with modern educational practices.',
    mr: 'क्रांतिवीर वासुदेव बळवंत फडके स्मृति विद्यालयात आपले स्वागत आहे, जिथे आम्ही केवळ विद्यार्थी नव्हे तर भविष्यातील नेते घडवतो जे आमच्या महान नामांकित व्यक्तीचा वारसा पुढे नेतील. आमची संस्था सर्वांगीण शिक्षणाचा दीपस्तंभ म्हणून उभी आहे, जी आमच्या सांस्कृतिक वारशाची समृद्धी आधुनिक शैक्षणिक पद्धतींशी जोडते.'
  },
  'principal.message.part2': {
    en: 'Our commitment to bilingual education ensures that our students are firmly rooted in their mother tongue while being equally proficient in English, preparing them for global opportunities. We focus on character building, academic excellence, and extra-curricular activities to ensure the all-round development of our students.',
    mr: 'द्विभाषिक शिक्षणाप्रति आमची बांधिलकी याची खात्री करते की आमचे विद्यार्थी त्यांच्या मातृभाषेत दृढ मुळे असताना इंग्रजीमध्येही तितकेच प्रवीण असतील, त्यांना जागतिक संधींसाठी तयार करतात. आम्ही आमच्या विद्यार्थ्यांच्या सर्वांगीण विकासासाठी चारित्र्य घडवणे, शैक्षणिक उत्कृष्टता आणि अभ्यासेतर उपक्रमांवर लक्ष केंद्रित करतो.'
  },
  'principal.message.part3': {
    en: 'I invite you to explore our school, its rich traditions, and the innovative learning environment we have created. Together, let us embark on this journey of shaping bright futures and creating responsible citizens who will make significant contributions to our society.',
    mr: 'मी आपल्याला आमची शाळा, तिच्या समृद्ध परंपरा आणि आम्ही निर्माण केलेले नावीन्यपूर्ण शिक्षण वातावरण अनुभवण्यासाठी आमंत्रित करते. चला, आपण एकत्र उज्ज्वल भविष्य घडवण्याच्या आणि जबाबदार नागरिक तयार करण्याच्या या प्रवासात सहभागी होऊ जे आपल्या समाजाला महत्त्वपूर्ण योगदान देतील.'
  },

  // Founders Section
  'founders.title': {
    en: 'Our Visionary Founders',
    mr: 'आमचे दूरदर्शी संस्थापक'
  },
  'founders.subtitle': {
    en: 'Our Legacy',
    mr: 'आमचा वारसा'
  },
  'founders.description': {
    en: 'The pillars of wisdom who laid the foundation of our institution with their vision and dedication.',
    mr: 'त्यांच्या दृष्टी आणि समर्पणातून आमच्या संस्थेचा पाया रचणारे ज्ञानाचे स्तंभ.'
  },
  'founder1.designation': {
    en: 'Founder & First Chairman',
    mr: 'संस्थापक आणि प्रथम अध्यक्ष'
  },
  'founder2.designation': {
    en: 'Co-Founder & First Principal',
    mr: 'सह-संस्थापक आणि प्रथम मुख्याध्यापिका'
  },
  'founder1.quote': {
    en: 'Education is not just about academic excellence, but about building character and values that last a lifetime.',
    mr: 'शिक्षण हे केवळ शैक्षणिक उत्कृष्टतेबद्दल नाही, तर जीवनभर टिकणारे चारित्र्य आणि मूल्ये घडवण्याबद्दल आहे.'
  },
  'founder2.quote': {
    en: 'Every child has unlimited potential; our duty is to nurture it with love and dedication.',
    mr: 'प्रत्येक मुलामध्ये अमर्याद क्षमता आहे; ती प्रेम आणि समर्पणाने जोपासणे हे आमचे कर्तव्य आहे.'
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
  'footer.quicklinks': {
    en: 'Quick Links',
    mr: 'जलद दुवे',
  },
  'footer.connect': {
    en: 'Connect With Us',
    mr: 'आमच्याशी जोडा',
  },
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

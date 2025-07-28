import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Founder {
  id: string;
  name: string;
  designation: string;
  dates: string;
  quote: string;
  image: string;
}

const foundersData: Founder[] = [
  {
    id: "1",
    name: "founders.name.1",
    designation: "founders.designation.1",
    dates: "founders.dates.1",
    quote: "founder1.quote",
    image: "/images/People/Founder image -1.jpg"
  },
  {
    id: "2",
    name: "founders.name.2",
    designation: "founders.designation.2",
    dates: "founders.dates.2",
    quote: "founder2.quote",
    image: "/images/People/Founder image -2.jpg"
  }
];

const FoundersSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="founders" className=" bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-red-600 text-sm font-medium rounded-full mb-4">
            {t('founders.subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('founders.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('founders.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {foundersData.map(founder => (
            <div
              key={founder.id}
              className="flex flex-col items-center bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-full h-[400px] overflow-hidden bg-gray-100">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-contain  p-2"
                />
              </div>
              
              <div className="p-8 text-center w-full">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {t(founder.name)}
                </h3>
                <p className="text-red-600 text-lg font-medium mb-4">
  {t(founder.designation)}
</p>

                
                <div className="mb-6 text-gray-600 font-semibold">
  <p className="mb-1">({t(founder.dates)})</p>
</div>

                
                <div className="relative">
                  <svg
                    className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 h-8 w-8 text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-lg italic text-gray-600 pl-10">
                    {t(founder.quote)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PrincipalDeskSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="principal-desk" className="bg-gradient-to-b from-gray-50 to-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-5 py-2 bg-orange-50 text-red-600 text-base rounded-full mb-4">            
            {t('principal.subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('principal.title')}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Principal's Image */}
            <div className="lg:w-1/3">
              <div className="relative">
                <div className="w-64 h-auto md:w-80 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="/images/People/20260217_154654.jpg"
                    alt={t('principal.name')}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-8 py-3 rounded-full shadow-md text-center w-max">
                  <h3 className="text-xl font-semibold text-gray-900">{t('principal.name')}</h3>
                </div>
              </div>
            </div>

            {/* Principal's Message */}
            <div className="lg:w-2/3 mt-12 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-md p-8 relative">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 h-8 w-8 text-red-100 rotate-180"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <div className="space-y-4">
                  <p className="text-gray-700 italic mb-4 text-base md:text-base leading-relaxed">
                    {t('principal.message.part1')}
                  </p>
                  <p className="text-gray-700 italic mb-4 text-base md:text-base leading-relaxed">
                    {t('principal.message.part2')}
                  </p>
                  <p className="text-gray-700 italic mb-4 text-base md:text-base leading-relaxed">
                    {t('principal.message.part3')}
                  </p>
                  <p className="text-gray-700 italic mb-4 text-base md:text-base leading-relaxed">
                    {t('principal.message.part4')}
                  </p>
                  <p className="text-gray-700 italic mb-4 text-base md:text-base leading-relaxed">
                    {t('principal.message.part5')}
                  </p>
                  <p className="text-gray-700 italic mb-4 text-base md:text-base leading-relaxed">
                    {t('principal.message.quote')}
                  </p>
                  <p className="text-gray-700 italic mb-4 text-base md:text-base leading-relaxed">
                    {t('principal.message.thanks')}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <div className="text-right">
                    <p className="text-gray-800 text-lg font-semibold">{t('principal.signature.name')}</p>
                    <p className="text-gray-700 text-lg">{t('principal.signature.designation')}</p>
                    <p className="text-gray-600 text-lg mt-1">{t('principal.signature.school')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalDeskSection;

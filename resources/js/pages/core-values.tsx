import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

// SVG Icon Components
const IconIntegrity = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M9 12l2 2 4-4"/>
    <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1h-6c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h6z"/>
    <path d="M3 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1h-6c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h6z"/>
  </svg>
);

const IconGrowth = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M3 3v18h18"/>
    <path d="M7 12l4-4 4 4 6-6"/>
  </svg>
);

const IconExcellence = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
  </svg>
);

const IconInnovation = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0-10-10z"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const IconResponsibility = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const IconTeamwork = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export default function CoreValuesPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through core values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue(prev => (prev + 1) % 6);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const coreValues = [
    {
      title: t('pages.core_values.values.0.title'),
      subtitle: t('pages.core_values.values.0.subtitle'),
      description: t('pages.core_values.values.0.description'),
      icon: <IconIntegrity />
    },
    {
      title: t('pages.core_values.values.1.title'),
      subtitle: t('pages.core_values.values.1.subtitle'),
      description: t('pages.core_values.values.1.description'),
      icon: <IconGrowth />
    },
    {
      title: t('pages.core_values.values.2.title'),
      subtitle: t('pages.core_values.values.2.subtitle'),
      description: t('pages.core_values.values.2.description'),
      icon: <IconExcellence />
    },
    {
      title: t('pages.core_values.values.3.title'),
      subtitle: t('pages.core_values.values.3.subtitle'),
      description: t('pages.core_values.values.3.description'),
      icon: <IconInnovation />
    },
    {
      title: t('pages.core_values.values.4.title'),
      subtitle: t('pages.core_values.values.4.subtitle'),
      description: t('pages.core_values.values.4.description'),
      icon: <IconResponsibility />
    },
    {
      title: t('pages.core_values.values.5.title'),
      subtitle: t('pages.core_values.values.5.subtitle'),
      description: t('pages.core_values.values.5.description'),
      icon: <IconTeamwork />
    },
  ];

  return (
    <div className="flex flex-col bg-white relative overflow-x-hidden min-h-screen">
      <Header sticky={true} transparent={false} />
      <div className="flex-1 flex flex-col z-10 pt-16 sm:pt-20">

        {/* Mobile Layout - Stack Vertically */}
        <div className="block lg:hidden">

          {/* Mobile Hero Section */}
          <div className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
            <img
              src={imageUrl('corevalues.jpg')}
              alt="Core Values"
              className="w-full h-full object-cover opacity-70"
            />

            {/* Mobile Title */}
            <div className={`absolute bottom-6 left-4 right-4 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-2xl sm:text-3xl font-light leading-tight">
                {t('pages.core_values.hero_title_1')}
                <br />
                <span className="font-normal">{t('pages.core_values.hero_title_2')}</span>
              </h1>
              <div className="w-16 h-1 bg-yellow-400 mt-4"></div>
              <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                {t('pages.core_values.hero_list')}
              </p>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="bg-white p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">

              {/* Header */}
              <div className={`mb-8 transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-500 uppercase tracking-wider text-xs font-medium">
                    {t('pages.core_values.header')}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-light text-gray-900 leading-relaxed mb-3">
                  {t('pages.core_values.six_pillars')}
                  <span className="text-yellow-600 font-medium"> {t('pages.core_values.six_pillars_highlight')}</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {t('pages.core_values.hero_list')}
                </p>
              </div>

              {/* Core Values List */}
              <div className="space-y-4">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    } ${
                      activeValue === index
                        ? 'scale-[1.02] bg-yellow-50 shadow-lg rounded-xl p-4'
                        : 'hover:bg-gray-50 rounded-xl p-4'
                    }`}
                    style={{
                      transitionDelay: `${500 + (index * 150)}ms`
                    }}
                    onClick={() => setActiveValue(index)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 transition-all duration-500 ${
                        activeValue === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                      }`}>
                        {value.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                            {value.subtitle}
                          </div>
                          <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 leading-tight ${
                            activeValue === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                          }`}>
                            {value.title}
                          </h3>
                        </div>
                        <p className={`leading-relaxed transition-all duration-500 ${
                          activeValue === index
                            ? 'text-gray-800 text-sm sm:text-base'
                            : 'text-gray-600 text-xs sm:text-sm group-hover:text-gray-800'
                        }`}>
                          {value.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                              activeValue === index ? 'w-full' : 'w-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Bottom Section */}
              <div className={`mt-12 pt-6 border-t border-gray-200 transform transition-all duration-1500 delay-1200 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">{t('pages.core_values.cta_title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {t('pages.core_values.cta_desc')}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm">
                      <span className="relative z-10">{t('pages.core_values.cta_btn_1')}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    <button className="group border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105 text-sm">
                      {t('pages.core_values.cta_btn_2')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex w-full relative" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
          {/* Left Side - Image and Title */}
          <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
            <img
              src={imageUrl('corevalues.jpg')}
              alt="Core Values"
              className="w-full h-full object-cover opacity-70"
            />
            <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-5xl font-light leading-tight">
                {t('pages.core_values.hero_title_1')}
                <br />
                <span className="font-normal">{t('pages.core_values.hero_title_2')}</span>
              </h1>
              <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
              <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
                {t('pages.core_values.hero_list')}
              </p>
            </div>
          </div>

          {/* Right Side - Core Values Content */}
          <div className="w-1/2 bg-white relative h-full flex-shrink-0">
            {/* Accent Line */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>

            {/* Content Container */}
            <div
              ref={rightPanelRef}
              className="h-full overflow-y-auto"
              style={{ padding: '3rem 4rem' }}
            >
              <div className="max-w-xl">
                {/* Header */}
                <div className={`mb-12 transform transition-all duration-1000 delay-300 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-500 uppercase tracking-wider text-sm font-medium">
                      {t('pages.core_values.header')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 leading-relaxed mb-4">
                    {t('pages.core_values.six_pillars')}
                    <span className="text-yellow-600 font-medium"> {t('pages.core_values.six_pillars_highlight')}</span>
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {t('pages.core_values.hero_list')}
                  </p>
                </div>

                {/* Core Values List */}
                <div className="space-y-8">
                  {coreValues.map((value, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-1000 cursor-pointer group ${
                        isLoaded
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-8 opacity-0'
                      } ${
                        activeValue === index
                          ? 'scale-105 bg-yellow-50 shadow-lg rounded-2xl p-6 -mx-2'
                          : 'hover:bg-gray-50 rounded-2xl p-6 -mx-2'
                      }`}
                      style={{
                        transitionDelay: `${500 + (index * 150)}ms`
                      }}
                      onClick={() => setActiveValue(index)}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`text-2xl flex-shrink-0 transition-all duration-500 ${
                          activeValue === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                        }`}>
                          {value.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                              {value.subtitle}
                            </div>
                            <h3 className={`text-xl font-semibold transition-colors duration-300 leading-tight ${
                              activeValue === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                            }`}>
                              {value.title}
                            </h3>
                          </div>
                          <p className={`leading-relaxed transition-all duration-500 ${
                            activeValue === index
                              ? 'text-gray-800 text-base'
                              : 'text-gray-600 text-sm group-hover:text-gray-800'
                          }`}>
                            {value.description}
                          </p>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                activeValue === index ? 'w-full' : 'w-0'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className={`mt-16 pt-8 border-t border-gray-200 transform transition-all duration-1500 delay-1200 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-gray-900">{t('pages.core_values.cta_title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('pages.core_values.cta_desc')}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <span className="relative z-10">{t('pages.core_values.cta_btn_1')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                      <button className="group border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105">
                        {t('pages.core_values.cta_btn_2')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
        }
        * { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}

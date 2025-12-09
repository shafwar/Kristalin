import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

// SVG Icon Components
const IconTarget = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconDiamond = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <polygon points="6 3 18 3 22 9 12 21 2 9 6 3"/><line x1="12" y1="3" x2="12" y2="21"/>
  </svg>
);
const IconHandshake = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M8 13l-4-4a3 3 0 014-4l4 4"/><path d="M16 11l4-4a3 3 0 00-4-4l-4 4"/><path d="M12 17v-7"/><path d="M7 17h10"/>
  </svg>
);
const IconLightning = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

export default function CompanyOverview() {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    // Smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through sections for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const companyData = {
    founded: t('pages.company_overview.company_values.founded_year'),
    operations: t('pages.company_overview.company_values.operations_location'),
    focus: t('pages.company_overview.company_values.focus_area'),
    partnerships: t('pages.company_overview.company_values.partnerships_countries')
  };

  const sections = [
    {
      title: t('pages.company_overview.sections.company_goals.title'),
      subtitle: t('pages.company_overview.sections.company_goals.subtitle'),
      content: t('pages.company_overview.sections.company_goals.content'),
      icon: <IconTarget />
    },
    {
      title: t('pages.company_overview.sections.natural_resources.title'),
      subtitle: t('pages.company_overview.sections.natural_resources.subtitle'),
      content: t('pages.company_overview.sections.natural_resources.content'),
      icon: <IconDiamond />
    },
    {
      title: t('pages.company_overview.sections.strategic_partnerships.title'),
      subtitle: t('pages.company_overview.sections.strategic_partnerships.subtitle'),
      content: t('pages.company_overview.sections.strategic_partnerships.content'),
      icon: <IconHandshake />
    },
    {
      title: t('pages.company_overview.sections.innovation_excellence.title'),
      subtitle: t('pages.company_overview.sections.innovation_excellence.subtitle'),
      content: t('pages.company_overview.sections.innovation_excellence.content'),
      icon: <IconLightning />
    }
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
              src={imageUrl('companyoverview.jpg')}
              alt={t('pages.company_overview.alt_texts.papua_forest')}
              className="w-full h-full object-cover opacity-70"
            />
            
            {/* Mobile Title */}
            <div className={`absolute bottom-6 left-4 right-4 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-2xl sm:text-3xl font-light leading-tight">
                {t('pages.company_overview.page_title').split(' ')[0]}<br />
                <span className="font-normal">{t('pages.company_overview.page_title').split(' ')[1]}</span>
              </h1>
              <div className="w-16 h-1 bg-yellow-400 mt-4"></div>
            </div>
            
            {/* Mobile Company Stats */}
            <div className={`absolute top-4 right-4 transform transition-all duration-1500 delay-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <div className="grid grid-cols-2 gap-2 text-center">
                  {Object.entries(companyData).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-yellow-400 font-bold text-sm">{value}</div>
                      <div className="text-white/80 text-xs uppercase tracking-wide">{t(`pages.company_overview.company_data.${key}`)}</div>
                    </div>
                  ))}
                </div>
              </div>
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
                    {t('pages.company_overview.subtitle')}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-light text-gray-900 leading-relaxed">
                  {t('pages.company_overview.main_heading')}
                </h2>
              </div>

              {/* Dynamic Content Sections */}
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } ${
                      activeSection === index 
                        ? 'scale-[1.02] bg-yellow-50 shadow-lg rounded-xl p-4' 
                        : 'hover:bg-gray-50 rounded-xl p-4'
                    }`}
                    style={{ 
                      transitionDelay: `${600 + (index * 200)}ms` 
                    }}
                    onClick={() => setActiveSection(index)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 transition-all duration-500 ${
                        activeSection === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                      }`}>
                        {section.icon}
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                            {section.subtitle}
                          </div>
                          <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                            activeSection === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                          }`}>
                            {section.title}
                          </h3>
                        </div>
                        <p className={`leading-relaxed transition-all duration-500 ${
                          activeSection === index 
                            ? 'text-gray-800 text-sm sm:text-base' 
                            : 'text-gray-600 text-xs sm:text-sm group-hover:text-gray-800'
                        }`}>
                          {section.content}
                        </p>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                              activeSection === index ? 'w-full' : 'w-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Bottom Section */}
              <div className={`mt-12 pt-6 transform transition-all duration-1500 delay-1200 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">{t('pages.company_overview.cta.future_title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {t('pages.company_overview.cta.future_desc')}
                    </p>
                  </div>
                  <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm w-full sm:w-auto">
                    <span className="relative z-10">{t('pages.company_overview.cta.learn_more_btn')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex w-full relative" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
          {/* Left Side - Your Image and Title, with animation */}
          <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
            <img 
              src={imageUrl('companyoverview.jpg')}
              alt={t('pages.company_overview.alt_texts.papua_forest')}
              className="w-full h-full object-cover opacity-70"
            />
            <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-5xl font-light leading-tight">
                {t('pages.company_overview.page_title').split(' ')[0]}<br />
                <span className="font-normal">{t('pages.company_overview.page_title').split(' ')[1]}</span>
              </h1>
              <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
            </div>
            {/* Floating Stats */}
            <div className={`absolute top-16 right-16 transform transition-all duration-1500 delay-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  {Object.entries(companyData).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-yellow-400 font-bold text-lg">{value}</div>
                      <div className="text-white/80 text-xs uppercase tracking-wide">{t(`pages.company_overview.company_data.${key}`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Right Side - Animated Content Panel */}
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
                      {t('pages.company_overview.subtitle')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 leading-relaxed">
                    {t('pages.company_overview.main_heading')}
                  </h2>
                </div>
                {/* Dynamic Content Sections */}
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-1000 cursor-pointer group ${
                        isLoaded 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      } ${
                        activeSection === index 
                          ? 'scale-105 bg-yellow-50 shadow-lg rounded-2xl p-6 -mx-2' 
                          : 'hover:bg-gray-50 rounded-2xl p-6 -mx-2'
                      }`}
                      style={{ 
                        transitionDelay: `${600 + (index * 200)}ms` 
                      }}
                      onClick={() => setActiveSection(index)}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`text-2xl flex-shrink-0 transition-all duration-500 ${
                          activeSection === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                        }`}>
                          {section.icon}
                        </div>
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                              {section.subtitle}
                            </div>
                            <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                              activeSection === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                            }`}>
                              {section.title}
                            </h3>
                          </div>
                          <p className={`leading-relaxed transition-all duration-500 ${
                            activeSection === index 
                              ? 'text-gray-800 text-base' 
                              : 'text-gray-600 text-sm group-hover:text-gray-800'
                          }`}>
                            {section.content}
                          </p>
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                activeSection === index ? 'w-full' : 'w-0'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom Section */}
                <div className={`mt-16 pt-8 transform transition-all duration-1500 delay-1200 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-gray-900">{t('pages.company_overview.cta.future_title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('pages.company_overview.cta.future_desc')}
                      </p>
                    </div>
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <span className="relative z-10">{t('pages.company_overview.cta.learn_more_btn')}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Elegant Custom Styles */}
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
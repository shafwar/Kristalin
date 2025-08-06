import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../hooks/useTranslation';

// SVG Icon Components
const IconCompetent = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M9 11H3a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h6"/>
    <path d="M11 11V3a2 2 0 0 1 2-2h3c1.1 0 2 .9 2 2v8"/>
    <path d="M21 11H15"/>
    <path d="M7 19V11"/>
  </svg>
);

const IconVisionary = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconInspiring = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconSelfActualizing = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const IconHumble = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default function LeadershipTraitsPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTrait, setActiveTrait] = useState(0);

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through leadership traits
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrait(prev => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const leadershipTraits = [
    {
      title: t('pages.leadership_traits.traits.0.title'),
      subtitle: t('pages.leadership_traits.traits.0.subtitle'),
      description: t('pages.leadership_traits.traits.0.description'),
      icon: <IconCompetent />
    },
    {
      title: t('pages.leadership_traits.traits.1.title'),
      subtitle: t('pages.leadership_traits.traits.1.subtitle'),
      description: t('pages.leadership_traits.traits.1.description'),
      icon: <IconVisionary />
    },
    {
      title: t('pages.leadership_traits.traits.2.title'),
      subtitle: t('pages.leadership_traits.traits.2.subtitle'),
      description: t('pages.leadership_traits.traits.2.description'),
      icon: <IconInspiring />
    },
    {
      title: t('pages.leadership_traits.traits.3.title'),
      subtitle: t('pages.leadership_traits.traits.3.subtitle'),
      description: t('pages.leadership_traits.traits.3.description'),
      icon: <IconSelfActualizing />
    },
    {
      title: t('pages.leadership_traits.traits.4.title'),
      subtitle: t('pages.leadership_traits.traits.4.subtitle'),
      description: t('pages.leadership_traits.traits.4.description'),
      icon: <IconHumble />
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
              src="https://substackcdn.com/image/fetch/$s_!RnDN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9949df21-4f48-4eae-86ed-97b002558a97_1312x928.webp"
              alt={t('pages.leadership_traits.alt_texts.leadership_meeting')}
              className="w-full h-full object-cover opacity-70"
            />
            
            {/* Mobile Title */}
            <div className={`absolute bottom-6 left-4 right-4 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-2xl sm:text-3xl font-light leading-tight">
                {t('pages.leadership_traits.hero_title_1')}<br />
                <span className="font-normal">{t('pages.leadership_traits.hero_title_2')}</span>
              </h1>
              <div className="w-16 h-1 bg-yellow-400 mt-4"></div>
              <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                {t('pages.leadership_traits.hero_list')}
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
                    {t('pages.leadership_traits.header')}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-light text-gray-900 leading-relaxed mb-3">
                  {t('pages.leadership_traits.main_heading')}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {t('pages.leadership_traits.hero_list')}
                </p>
              </div>

              {/* Leadership Traits List */}
              <div className="space-y-4">
                {leadershipTraits.map((trait, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } ${
                      activeTrait === index 
                        ? 'scale-[1.02] bg-yellow-50 shadow-lg rounded-xl p-4' 
                        : 'hover:bg-gray-50 rounded-xl p-4'
                    }`}
                    style={{ 
                      transitionDelay: `${500 + (index * 150)}ms` 
                    }}
                    onClick={() => setActiveTrait(index)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 transition-all duration-500 ${
                        activeTrait === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                      }`}>
                        {trait.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                            {trait.subtitle}
                          </div>
                          <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 leading-tight ${
                            activeTrait === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                          }`}>
                            {trait.title}
                          </h3>
                        </div>
                        <p className={`leading-relaxed transition-all duration-500 ${
                          activeTrait === index 
                            ? 'text-gray-800 text-sm sm:text-base' 
                            : 'text-gray-600 text-xs sm:text-sm group-hover:text-gray-800'
                        }`}>
                          {trait.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                              activeTrait === index ? 'w-full' : 'w-0'
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
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">{t('pages.leadership_traits.cta_title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {t('pages.leadership_traits.cta_desc')}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm">
                      <span className="relative z-10">{t('pages.leadership_traits.cta_btn_1')}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    <button className="group border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105 text-sm">
                      {t('pages.leadership_traits.cta_btn_2')}
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
              src="https://substackcdn.com/image/fetch/$s_!RnDN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9949df21-4f48-4eae-86ed-97b002558a97_1312x928.webp"
              alt={t('pages.leadership_traits.alt_texts.leadership_meeting')}
              className="w-full h-full object-cover opacity-70"
            />
            <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-5xl font-light leading-tight">
                {t('pages.leadership_traits.hero_title_1')}<br />
                <span className="font-normal">{t('pages.leadership_traits.hero_title_2')}</span>
              </h1>
              <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
              <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
                {t('pages.leadership_traits.hero_list')}
              </p>
            </div>
          </div>
          
          {/* Right Side - Leadership Traits Content */}
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
                      {t('pages.leadership_traits.header')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 leading-relaxed mb-4">
                    {t('pages.leadership_traits.main_heading')}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {t('pages.leadership_traits.hero_list')}
                  </p>
                </div>

                {/* Leadership Traits List */}
                <div className="space-y-8">
                  {leadershipTraits.map((trait, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-1000 cursor-pointer group ${
                        isLoaded 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      } ${
                        activeTrait === index 
                          ? 'scale-105 bg-yellow-50 shadow-lg rounded-2xl p-6 -mx-2' 
                          : 'hover:bg-gray-50 rounded-2xl p-6 -mx-2'
                      }`}
                      style={{ 
                        transitionDelay: `${500 + (index * 150)}ms` 
                      }}
                      onClick={() => setActiveTrait(index)}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`text-2xl flex-shrink-0 transition-all duration-500 ${
                          activeTrait === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                        }`}>
                          {trait.icon}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                              {trait.subtitle}
                            </div>
                            <h3 className={`text-xl font-semibold transition-colors duration-300 leading-tight ${
                              activeTrait === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                            }`}>
                              {trait.title}
                            </h3>
                          </div>
                          <p className={`leading-relaxed transition-all duration-500 ${
                            activeTrait === index 
                              ? 'text-gray-800 text-base' 
                              : 'text-gray-600 text-sm group-hover:text-gray-800'
                          }`}>
                            {trait.description}
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                activeTrait === index ? 'w-full' : 'w-0'
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
                      <h4 className="text-lg font-medium text-gray-900">{t('pages.leadership_traits.cta_title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('pages.leadership_traits.cta_desc')}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <span className="relative z-10">{t('pages.leadership_traits.cta_btn_1')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                      <button className="group border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105">
                        {t('pages.leadership_traits.cta_btn_2')}
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
import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../hooks/useTranslation';

// SVG Icon Components
const IconEye = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconTrendingUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconLeaf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M7 20s4-9 6-13 6-2 6-2-3 14-5 18"/>
    <path d="M22 9s-7-6-13-6c-3 0-9 4-9 9 0 1 0 3 0 3s1 1 3 1c6 0 13-6 13-6"/>
  </svg>
);

const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default function VisionMissionPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMission, setActiveMission] = useState(0);

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through mission pillars
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMission(prev => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const missionPillars = [
    {
      title: t('pages.vision_mission.mission.pillars.growth_development.title'),
      subtitle: t('pages.vision_mission.mission.pillars.growth_development.subtitle'),
      description: t('pages.vision_mission.mission.pillars.growth_development.description'),
      icon: <IconTrendingUp />
    },
    {
      title: t('pages.vision_mission.mission.pillars.professional_entity.title'),
      subtitle: t('pages.vision_mission.mission.pillars.professional_entity.subtitle'),
      description: t('pages.vision_mission.mission.pillars.professional_entity.description'),
      icon: <IconUsers />
    },
    {
      title: t('pages.vision_mission.mission.pillars.managerial_principles.title'),
      subtitle: t('pages.vision_mission.mission.pillars.managerial_principles.subtitle'),
      description: t('pages.vision_mission.mission.pillars.managerial_principles.description'),
      icon: <IconSettings />
    },
    {
      title: t('pages.vision_mission.mission.pillars.technology_integration.title'),
      subtitle: t('pages.vision_mission.mission.pillars.technology_integration.subtitle'),
      description: t('pages.vision_mission.mission.pillars.technology_integration.description'),
      icon: <IconTarget />
    },
    {
      title: t('pages.vision_mission.mission.pillars.environmental_stewardship.title'),
      subtitle: t('pages.vision_mission.mission.pillars.environmental_stewardship.subtitle'),
      description: t('pages.vision_mission.mission.pillars.environmental_stewardship.description'),
      icon: <IconLeaf />
    },
    {
      title: t('pages.vision_mission.mission.pillars.community_empowerment.title'),
      subtitle: t('pages.vision_mission.mission.pillars.community_empowerment.subtitle'),
      description: t('pages.vision_mission.mission.pillars.community_empowerment.description'),
      icon: <IconHeart />
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
              src="https://robinsonsjewelers.com/cdn/shop/articles/How_many_grams_in_an_ounce_of_gold.jpg?v=1728561631&width=1200"
              alt={t('pages.vision_mission.alt_texts.gold_bars')}
              className="w-full h-full object-cover opacity-80"
            />
            
            {/* Mobile Title */}
            <div className={`absolute bottom-6 left-4 right-4 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-2xl sm:text-3xl font-light leading-tight">
                {(() => {
                  const title = t('pages.vision_mission.page_title');
                  if (title.includes(' & ')) {
                    const parts = title.split(' & ');
                    return (
                      <>
                        {parts[0]}<br />
                        <span className="font-normal">& {parts[1]}</span>
                      </>
                    );
                  } else {
                    return <span className="font-normal">{title}</span>;
                  }
                })()}
              </h1>
              <div className="w-16 h-1 bg-yellow-400 mt-4"></div>
              <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                {t('pages.vision_mission.description')}
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
                    {t('pages.vision_mission.subtitle')}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-light text-gray-900 leading-relaxed">
                  {t('pages.vision_mission.main_heading')}
                </h2>
              </div>

              {/* Vision Section */}
              <div className={`mb-12 transform transition-all duration-1000 delay-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="bg-yellow-50 rounded-xl p-4 sm:p-6 border border-yellow-200">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <IconEye />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                          {t('pages.vision_mission.vision.label')}
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-yellow-800 leading-tight">
                          {t('pages.vision_mission.vision.title')}
                        </h3>
                      </div>
                      <p className="text-yellow-700 leading-relaxed text-sm sm:text-base">
                        {t('pages.vision_mission.vision.content')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Header */}
              <div className={`mb-6 transform transition-all duration-1000 delay-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-500 uppercase tracking-wider text-xs font-medium">
                    {t('pages.vision_mission.mission.label')}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-light text-gray-900 leading-relaxed">
                  {t('pages.vision_mission.mission.title')}
                </h3>
              </div>

              {/* Mission Pillars */}
              <div className="space-y-4">
                {missionPillars.map((pillar, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } ${
                      activeMission === index 
                        ? 'scale-[1.02] bg-yellow-50 shadow-lg rounded-xl p-4' 
                        : 'hover:bg-gray-50 rounded-xl p-4'
                    }`}
                    style={{ 
                      transitionDelay: `${900 + (index * 150)}ms` 
                    }}
                    onClick={() => setActiveMission(index)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 transition-all duration-500 ${
                        activeMission === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                      }`}>
                        {pillar.icon}
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                            {pillar.subtitle}
                          </div>
                          <h4 className={`text-sm sm:text-base font-semibold transition-colors duration-300 leading-tight ${
                            activeMission === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                          }`}>
                            {pillar.title}
                          </h4>
                        </div>
                        <p className={`leading-relaxed transition-all duration-500 ${
                          activeMission === index 
                            ? 'text-gray-800 text-xs sm:text-sm' 
                            : 'text-gray-600 text-xs group-hover:text-gray-800'
                        }`}>
                          {pillar.description}
                        </p>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                              activeMission === index ? 'w-full' : 'w-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Call to Action */}
              <div className={`mt-12 pt-6 border-t border-gray-200 transform transition-all duration-1500 delay-1400 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">{t('pages.vision_mission.cta.prosperity_title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {t('pages.vision_mission.cta.prosperity_desc')}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm">
                      <span className="relative z-10">{t('pages.vision_mission.cta.impact_stories_btn')}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    <button className="group border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105 text-sm">
                      {t('pages.vision_mission.cta.learn_more_btn')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex w-full relative" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
          {/* Left Side - Image and Title with animations */}
          <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
            <img 
              src="https://robinsonsjewelers.com/cdn/shop/articles/How_many_grams_in_an_ounce_of_gold.jpg?v=1728561631&width=1200"
              alt={t('pages.vision_mission.alt_texts.gold_bars')}
              className="w-full h-full object-cover opacity-80"
            />
            <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-5xl font-light leading-tight">
                {(() => {
                  const title = t('pages.vision_mission.page_title');
                  if (title.includes(' & ')) {
                    const parts = title.split(' & ');
                    return (
                      <>
                        {parts[0]}<br />
                        <span className="font-normal">& {parts[1]}</span>
                      </>
                    );
                  } else {
                    return <span className="font-normal">{title}</span>;
                  }
                })()}
              </h1>
              <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
              <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
                {t('pages.vision_mission.description')}
              </p>
            </div>
          </div>
          
          {/* Right Side - Vision & Mission Content */}
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
                      {t('pages.vision_mission.subtitle')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 leading-relaxed">
                    {t('pages.vision_mission.main_heading')}
                  </h2>
                </div>

                {/* Vision Section */}
                <div className={`mb-16 transform transition-all duration-1000 delay-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
                    <div className="flex items-start space-x-6">
                      <div className="text-3xl flex-shrink-0">
                        <IconEye />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-2">
                            {t('pages.vision_mission.vision.label')}
                          </div>
                          <h3 className="text-2xl font-semibold text-yellow-800 leading-tight">
                            {t('pages.vision_mission.vision.title')}
                          </h3>
                        </div>
                        <p className="text-yellow-700 leading-relaxed">
                          {t('pages.vision_mission.vision.content')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission Header */}
                <div className={`mb-8 transform transition-all duration-1000 delay-700 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-500 uppercase tracking-wider text-sm font-medium">
                      {t('pages.vision_mission.mission.label')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 leading-relaxed">
                    {t('pages.vision_mission.mission.title')}
                  </h3>
                </div>

                {/* Mission Pillars */}
                <div className="space-y-6">
                  {missionPillars.map((pillar, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-1000 cursor-pointer group ${
                        isLoaded 
                          ? 'translate-y-0 opacity-100' 
                          : 'translate-y-8 opacity-0'
                      } ${
                        activeMission === index 
                          ? 'scale-105 bg-yellow-50 shadow-lg rounded-2xl p-6 -mx-2' 
                          : 'hover:bg-gray-50 rounded-2xl p-6 -mx-2'
                      }`}
                      style={{ 
                        transitionDelay: `${900 + (index * 150)}ms` 
                      }}
                      onClick={() => setActiveMission(index)}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`text-2xl flex-shrink-0 transition-all duration-500 ${
                          activeMission === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                        }`}>
                          {pillar.icon}
                        </div>
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-1">
                              {pillar.subtitle}
                            </div>
                            <h4 className={`text-lg font-semibold transition-colors duration-300 leading-tight ${
                              activeMission === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                            }`}>
                              {pillar.title}
                            </h4>
                          </div>
                          <p className={`leading-relaxed transition-all duration-500 ${
                            activeMission === index 
                              ? 'text-gray-800 text-sm' 
                              : 'text-gray-600 text-xs group-hover:text-gray-800'
                          }`}>
                            {pillar.description}
                          </p>
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                activeMission === index ? 'w-full' : 'w-0'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className={`mt-16 pt-8 border-t border-gray-200 transform transition-all duration-1500 delay-1400 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-gray-900">{t('pages.vision_mission.cta.prosperity_title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('pages.vision_mission.cta.prosperity_desc')}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <span className="relative z-10">{t('pages.vision_mission.cta.impact_stories_btn')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                      <button className="group border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105">
                        {t('pages.vision_mission.cta.learn_more_btn')}
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
import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../hooks/useTranslation';

// SVG Icon Components
const IconQuote = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400/30 w-8 h-8 sm:w-12 sm:h-12">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
  </svg>
);

const IconMining = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M6 20h12l-6-10z"/>
    <path d="M8 14l8 0"/>
    <path d="M2 20h20"/>
    <path d="M12 4v6"/>
  </svg>
);

const IconGold = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 2v20"/>
    <path d="M2 12h20"/>
  </svg>
);

const IconIndonesia = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function MessageFromFounder() {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % 3);
    }, 8000); // 8 seconds for reading
    return () => clearInterval(interval);
  }, []);

  const founderQuotes = [
    {
      text: t('pages.message_from_founder.quotes.0.text'),
      focus: t('pages.message_from_founder.quotes.0.focus')
    },
    {
      text: t('pages.message_from_founder.quotes.1.text'),
      focus: t('pages.message_from_founder.quotes.1.focus')
    },
    {
      text: t('pages.message_from_founder.quotes.2.text'),
      focus: t('pages.message_from_founder.quotes.2.focus')
    }
  ];

  const keyPrinciples = [
    {
      icon: <IconMining />,
      title: t('pages.message_from_founder.principles.items.0.title'),
      description: t('pages.message_from_founder.principles.items.0.description')
    },
    {
      icon: <IconGold />,
      title: t('pages.message_from_founder.principles.items.1.title'),
      description: t('pages.message_from_founder.principles.items.1.description')
    },
    {
      icon: <IconIndonesia />,
      title: t('pages.message_from_founder.principles.items.2.title'),
      description: t('pages.message_from_founder.principles.items.2.description')
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
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="/arifbudi.jpg"
                alt={t('pages.message_from_founder.hero.alt_text')}
                className="w-full h-full object-cover opacity-70"
                draggable="false"
              />
            </div>
            
            {/* Mobile Title */}
            <div className={`absolute bottom-6 left-4 right-4 z-10 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-2xl sm:text-3xl font-light leading-tight">
                {t('pages.message_from_founder.hero.title_line1')}<br />
                <span className="font-normal">{t('pages.message_from_founder.hero.title_line2')}</span>
              </h1>
              <div className="w-16 h-1 bg-yellow-400 mt-4"></div>
              <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                {t('pages.message_from_founder.hero.description')}
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
                    {t('pages.message_from_founder.header.subtitle')}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-light text-gray-900 leading-relaxed mb-4">
                  {t('pages.message_from_founder.header.title_line1')}
                  <span className="text-yellow-600 font-medium"> {t('pages.message_from_founder.header.title_line2')}</span>
                </h2>
              </div>

              {/* Main Quote Section */}
              <div className={`mb-8 transform transition-all duration-1000 delay-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-2 -left-2 z-0">
                    <IconQuote />
                  </div>
                  
                  {/* Quote Content */}
                  <div className="relative z-10 bg-yellow-50 rounded-xl p-4 sm:p-6 border border-yellow-200">
                    <div className="space-y-4">
                      <blockquote className="text-base sm:text-lg leading-relaxed text-gray-800 font-light italic">
                        "{founderQuotes[currentQuote].text}"
                      </blockquote>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div>
                          <div className="font-semibold text-gray-900 text-base sm:text-lg">{t('pages.message_from_founder.founder_info.name')}</div>
                          <div className="text-yellow-600 text-sm font-medium">{t('pages.message_from_founder.founder_info.title')}</div>
                          <div className="text-gray-500 text-xs">{t('pages.message_from_founder.founder_info.company')}</div>
                        </div>
                        <div className="sm:text-right">
                          <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider">
                            {founderQuotes[currentQuote].focus}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote Navigation Dots */}
                  <div className="flex justify-center space-x-2 mt-3">
                    {founderQuotes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuote(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentQuote === index ? 'bg-yellow-500 w-5' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Founder's Message Content */}
              <div className={`mb-8 transform transition-all duration-1000 delay-700 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{t('pages.message_from_founder.message.greeting')}</h3>
                  
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{__html: t('pages.message_from_founder.message.paragraph1')}}>
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{__html: t('pages.message_from_founder.message.paragraph2')}}>
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{__html: t('pages.message_from_founder.message.paragraph3')}}>
                  </p>
                </div>
              </div>

              {/* Key Principles */}
              <div className={`mb-8 transform transition-all duration-1000 delay-900 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{t('pages.message_from_founder.principles.title')}</h3>
                <div className="space-y-3">
                  {keyPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                      <div className="text-yellow-500 mt-1 flex-shrink-0">
                        {principle.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{principle.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{principle.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Call to Action */}
              <div className={`mt-12 pt-6 border-t border-gray-200 transform transition-all duration-1500 delay-1100 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-medium text-gray-900">{t('pages.message_from_founder.cta.title')}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {t('pages.message_from_founder.cta.description')}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm">
                      <span className="relative z-10">{t('pages.message_from_founder.cta.button_story')}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    <button className="group border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105 text-sm">
                      <a href="/contact">
                        {t('pages.message_from_founder.cta.button_contact')}
                      </a>
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
          <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden min-h-[600px]">
            {/* Gambar statis, tidak pernah terkena animasi */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="/arifbudi.jpg"
                alt={t('pages.message_from_founder.hero.alt_text')}
                width={600}
                height={600}
                className="w-full h-full object-cover opacity-70"
                draggable="false"
              />
            </div>
            {/* Konten teks tetap animasi, overlay di atas gambar */}
            <div className={`absolute bottom-16 left-16 z-10 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-5xl font-light leading-tight">
                {t('pages.message_from_founder.hero.title_line1')}<br />
                <span className="font-normal">{t('pages.message_from_founder.hero.title_line2')}</span>
              </h1>
              <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
              <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
                {t('pages.message_from_founder.hero.description')}
              </p>
            </div>
          </div>
          
          {/* Right Side - Message Content */}
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
                      {t('pages.message_from_founder.header.subtitle')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 leading-relaxed mb-6">
                    {t('pages.message_from_founder.header.title_line1')}
                    <span className="text-yellow-600 font-medium"> {t('pages.message_from_founder.header.title_line2')}</span>
                  </h2>
                </div>

                {/* Main Quote Section */}
                <div className={`mb-12 transform transition-all duration-1000 delay-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="relative">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 -left-4 z-0">
                      <IconQuote />
                    </div>
                    
                    {/* Quote Content */}
                    <div className="relative z-10 bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
                      <div className="space-y-6">
                        <blockquote className="text-xl leading-relaxed text-gray-800 font-light italic">
                          "{founderQuotes[currentQuote].text}"
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 text-lg">{t('pages.message_from_founder.founder_info.name')}</div>
                            <div className="text-yellow-600 text-sm font-medium">{t('pages.message_from_founder.founder_info.title')}</div>
                            <div className="text-gray-500 text-xs">{t('pages.message_from_founder.founder_info.company')}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider">
                              {founderQuotes[currentQuote].focus}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quote Navigation Dots */}
                    <div className="flex justify-center space-x-2 mt-4">
                      {founderQuotes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuote(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentQuote === index ? 'bg-yellow-500 w-6' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Founder's Message Content */}
                <div className={`mb-12 transform transition-all duration-1000 delay-700 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('pages.message_from_founder.message.greeting')}</h3>
                    
                    <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: t('pages.message_from_founder.message.paragraph1')}}>
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: t('pages.message_from_founder.message.paragraph2')}}>
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: t('pages.message_from_founder.message.paragraph3')}}>
                    </p>
                  </div>
                </div>

                {/* Key Principles */}
                <div className={`mb-12 transform transition-all duration-1000 delay-900 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('pages.message_from_founder.principles.title')}</h3>
                  <div className="space-y-4">
                    {keyPrinciples.map((principle, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                        <div className="text-yellow-500 mt-1">
                          {principle.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{principle.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className={`mt-16 pt-8 border-t border-gray-200 transform transition-all duration-1500 delay-1100 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}>
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-gray-900">{t('pages.message_from_founder.cta.title')}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('pages.message_from_founder.cta.description')}
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                        <span className="relative z-10">{t('pages.message_from_founder.cta.button_story')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </button>
                      <button className="group border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105">
                        <a href="/contact">
                          {t('pages.message_from_founder.cta.button_contact')}
                        </a>
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
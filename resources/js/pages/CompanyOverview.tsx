import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// SVG Icon Components
const IconTarget = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
const IconDiamond = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 18 3 22 9 12 21 2 9 6 3"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
);
const IconHandshake = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13l-4-4a3 3 0 014-4l4 4"/><path d="M16 11l4-4a3 3 0 00-4-4l-4 4"/><path d="M12 17v-7"/><path d="M7 17h10"/></svg>
);
const IconLightning = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

export default function CompanyOverview() {
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
    founded: "1989",
    operations: "Nabire, Papua",
    focus: "Gold Mining",
    partnerships: "China & Korea"
  };

  const sections = [
    {
      title: "Company Goals",
      subtitle: "Our Foundation",
      content: "Established to operate comprehensive business activities in the mining and processing sector, driving innovation and sustainable growth in Indonesia's natural resource industry.",
      icon: <IconTarget />
    },
    {
      title: "Natural Resources",
      subtitle: "Rich Heritage",
      content: "PT Kristalin Eka Lestari focuses on the exploration and exploitation of Indonesia's abundant natural resources, particularly specializing in gold mining operations in the resource-rich region of Nabire, Papua.",
      icon: <IconDiamond />
    },
    {
      title: "Strategic Partnerships",
      subtitle: "Global Collaboration",
      content: "Operating hand in hand with local partners and international investors from China and Korea, we leverage world-class technology and expertise to optimize mining operations from upstream to downstream processes.",
      icon: <IconHandshake />
    },
    {
      title: "Innovation Excellence",
      subtitle: "Continuous Growth",
      content: "Committed to continuous innovation and operational excellence, we refine our business processes to deliver optimal satisfaction to stakeholders while positioning ourselves at the forefront of the mining industry.",
      icon: <IconLightning />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* Main Content */}
      <div
        className="flex w-full relative"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
      >
        {/* Left Side - Your Image and Title, with animation */}
        <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
          <img 
            src="https://m-mtoday.com/wp-content/uploads/sites/12/2023/10/benefits-of-gold-mining-image.jpeg"
            alt="Papua Forest"
            className="w-full h-full object-cover opacity-70"
          />
          <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-white text-5xl font-light leading-tight">
              Company<br />
              <span className="font-normal">Overview</span>
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
                    <div className="text-white/80 text-xs uppercase tracking-wide">{key}</div>
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
                    Company Overview
                  </span>
                </div>
                <h2 className="text-3xl font-light text-gray-900 leading-relaxed">
                  Pioneering Excellence in 
                  <span className="text-yellow-600 font-medium"> Mining Innovation</span>
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
                    <h4 className="text-lg font-medium text-gray-900">Building Indonesia's Future</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Through responsible mining practices and international collaboration, 
                      we're committed to sustainable growth and community development.
                    </p>
                  </div>
                  <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <span className="relative z-10">Learn More About Our Mission</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
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
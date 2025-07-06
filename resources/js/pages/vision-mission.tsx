import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// SVG Icon Components
const IconEye = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconCompass = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76"/>
  </svg>
);

const IconTrendingUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const IconLeaf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20s4-9 6-13 6-2 6-2-3 14-5 18"/>
    <path d="M22 9s-7-6-13-6c-3 0-9 4-9 9 0 1 0 3 0 3s1 1 3 1c6 0 13-6 13-6"/>
  </svg>
);

const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default function VisionMissionPage() {
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

  const companyStats = {
    vision: "One Vision",
    mission: "Six Pillars",
    established: "Since 1989",
    commitment: "Excellence"
  };

  const missionPillars = [
    {
      title: "Continuous Growth & Development",
      subtitle: "Innovation Excellence",
      description: "We are committed to perpetual advancement through strategic innovation, embracing cutting-edge technologies and methodologies that drive sustainable growth across all operational dimensions.",
      icon: <IconTrendingUp />
    },
    {
      title: "Professional Entity Development",
      subtitle: "Organizational Excellence",
      description: "We cultivate a culture of professionalism by investing in human capital development, implementing world-class operational standards, and fostering organizational capabilities.",
      icon: <IconUsers />
    },
    {
      title: "Sound Managerial Principles",
      subtitle: "Leadership Excellence",
      description: "Our management philosophy is anchored in transparency, accountability, and strategic decision-making that balances stakeholder interests while ensuring operational efficiency.",
      icon: <IconSettings />
    },
    {
      title: "Advanced Technology Integration",
      subtitle: "Technological Innovation",
      description: "We leverage state-of-the-art, economically viable, and highly productive technologies that optimize resource extraction efficiency while minimizing environmental impact.",
      icon: <IconTarget />
    },
    {
      title: "Environmental Stewardship",
      subtitle: "Ecological Responsibility",
      description: "Our unwavering commitment to environmental conservation encompasses maintaining ecosystem balance and pioneering sustainable mining practices that protect Papua's biodiversity.",
      icon: <IconLeaf />
    },
    {
      title: "Community Empowerment",
      subtitle: "Social Impact",
      description: "We actively explore and develop local community potential through comprehensive empowerment programs, skill development initiatives, and economic opportunities that create lasting prosperity.",
      icon: <IconHeart />
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
        {/* Left Side - Image and Title with animations */}
        <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
          <img 
            src="https://robinsonsjewelers.com/cdn/shop/articles/How_many_grams_in_an_ounce_of_gold.jpg?v=1728561631&width=1200"
            alt="Gold bars and gold powder on scale"
            className="w-full h-full object-cover opacity-80"
          />
          <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-white text-5xl font-light leading-tight">
              Our Vision<br />
              <span className="font-normal">& Mission</span>
            </h1>
            <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
            <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
              Guiding principles that drive our commitment to excellence, sustainability, and community prosperity.
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
                    Vision & Mission
                  </span>
                </div>
                <h2 className="text-3xl font-light text-gray-900 leading-relaxed">
                  Guiding Principles for
                  <span className="text-yellow-600 font-medium"> Sustainable Excellence</span>
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
                          Our Vision
                        </div>
                        <h3 className="text-2xl font-semibold text-yellow-800 leading-tight">
                          Leading Indonesia's Sustainable Mining Future
                        </h3>
                      </div>
                      <p className="text-yellow-700 leading-relaxed">
                        To become a transformative entity that orchestrates Indonesia's abundant natural resources with unparalleled optimization and unwavering responsibility, creating sustainable prosperity that enriches local communities, strengthens our nation's economic foundation, and establishes new paradigms of ethical mining practices that serve as a beacon for the global mining industry.
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
                    Our Mission
                  </span>
                </div>
                <h3 className="text-2xl font-light text-gray-900 leading-relaxed">
                  Six Pillars of
                  <span className="text-yellow-600 font-medium"> Operational Excellence</span>
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
                    <h4 className="text-lg font-medium text-gray-900">Committed to Indonesia's Prosperity</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Through our vision and mission, we strive to create lasting positive impact that transcends traditional mining operations, 
                      building a legacy of responsible resource stewardship and community empowerment.
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <span className="relative z-10">Our Impact Stories</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    <button className="group border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105">
                      Learn More
                    </button>
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
import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// SVG Icon Components
const IconBuilding = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12h4h4"/>
    <path d="M6 20h4"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M14 20h4"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconLeaf = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20s4-9 6-13 6-2 6-2-3 14-5 18"/>
    <path d="M22 9s-7-6-13-6c-3 0-9 4-9 9 0 1 0 3 0 3s1 1 3 1c6 0 13-6 13-6"/>
  </svg>
);

const IconTrendingUp = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconMining = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 20h12l-6-10z"/>
    <path d="M8 14l8 0"/>
    <path d="M2 20h20"/>
    <path d="M12 4v6"/>
  </svg>
);

export default function AboutPage() {
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
      setActiveSection(prev => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const companyStats = {
    founded: "1989",
    location: "Jakarta",
    operations: "Nabire, Papua",
    partnerships: "China & Korea"
  };

  const sections = [
    {
      title: "Company Foundation",
      subtitle: "Our Beginning",
      content: "Established in 1989, PT Kristalin Eka Lestari remains a privately owned company headquartered in Jakarta. Founded with a vision to excel in Indonesia's mining industry, particularly in exploration and gold mining operations.",
      icon: <IconBuilding />
    },
    {
      title: "Global Partnerships",
      subtitle: "International Collaboration",
      content: "We operate hand in hand with local partners and foreign investors from China and Korea, bringing world-renowned heavy equipment, advanced mining technology, and integrated solutions from upstream to downstream operations.",
      icon: <IconGlobe />
    },
    {
      title: "Environmental Stewardship",
      subtitle: "Sustainable Mining",
      content: "Our mining practices in Nabire, Papua are designed to minimize ecological impact while contributing to local economic development. We actively engage with communities to ensure our operations benefit the people of Papua.",
      icon: <IconLeaf />
    },
    {
      title: "Continuous Innovation",
      subtitle: "Excellence Commitment",
      content: "We are committed to refining our internal business processes and operational sites to give customers optimal satisfaction. This commitment positions us at the forefront for achieving shared goals with stakeholders.",
      icon: <IconTrendingUp />
    },
    {
      title: "Mining Operations",
      subtitle: "Core Business",
      content: "Located in the resource-rich region of Nabire, Papua, our focus on sustainable alluvial gold extraction employs modern techniques that maximize operational efficiency while maintaining the highest safety standards.",
      icon: <IconMining />
    }
  ];

  const additionalContent = [
    {
      title: "Our Operations",
      content: "Located in the resource-rich region of Nabire, Papua, our mining operations focus on sustainable alluvial gold extraction. We employ modern mining techniques that minimize environmental impact while maximizing operational efficiency and safety standards."
    },
    {
      title: "International Partnerships",
      content: "Our strategic alliances with Chinese and Korean investors bring cutting-edge technology and expertise to our operations. These partnerships enable us to access world-class mining equipment, advanced processing techniques, and international best practices."
    },
    {
      title: "Commitment to Excellence",
      content: "Since our establishment in 1989, we have maintained our commitment to operational excellence, environmental responsibility, and community development. Our approach combines traditional mining knowledge with modern technology."
    },
    {
      title: "Environmental Stewardship",
      content: "We recognize the importance of environmental protection in our operations. Our mining practices are designed to minimize ecological impact while contributing to local economic development and community engagement."
    },
    {
      title: "Future Vision",
      content: "PT Kristalin Eka Lestari continues to explore new opportunities for growth and expansion. We remain committed to innovation, sustainability, and creating lasting value for stakeholders while maintaining our leadership position."
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
            src="https://agincourtresources.com/wp-content/uploads/2020/11/Peran-Pertambangan-Emas-Terhadap-Ekonomi-1.jpg"
            alt="Mining Operations"
            className="w-full h-full object-cover opacity-70"
          />
          <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-white text-5xl font-light leading-tight">
              About Kristalin<br />
              <span className="font-normal">Eka Lestari</span>
            </h1>
            <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
          </div>
          {/* Floating Company Stats */}
          <div className={`absolute top-16 right-16 transform transition-all duration-1500 delay-500 ${
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                {Object.entries(companyStats).map(([key, value], index) => (
                  <div key={key} className="space-y-1">
                    <div className="text-yellow-400 font-bold text-lg">{value}</div>
                    <div className="text-white/80 text-xs uppercase tracking-wide">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
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
                    About Kristalin Eka Lestari
                  </span>
                </div>
                <h2 className="text-3xl font-light text-gray-900 leading-relaxed">
                  Building Indonesia's Mining
                  <span className="text-yellow-600 font-medium"> Future Since 1989</span>
                </h2>
              </div>

              {/* Company Introduction */}
              <div className={`mb-12 transform transition-all duration-1000 delay-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <p className="text-gray-700 leading-relaxed text-base mb-6">
                  Established as <span className="font-semibold text-gray-900">PT Kristalin Eka Lestari</span> in 1989, 
                  we remain a privately owned company headquartered in Jakarta. Our founder, chairman and largest 
                  shareholder actively operates in the <span className="text-yellow-600 font-semibold">mining industry</span>, 
                  specifically in <span className="text-yellow-600 font-semibold">exploration and gold mining</span> operational 
                  production sector located in Nabire, Papua.
                </p>
              </div>

              {/* Dynamic Content Sections */}
              <div className="space-y-8 mb-12">
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
                      transitionDelay: `${700 + (index * 150)}ms` 
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

              {/* Additional Detailed Content */}
              <div className={`space-y-8 transform transition-all duration-1500 delay-1200 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                {additionalContent.map((item, index) => (
                  <div key={index} className="group">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-yellow-500 mb-4 group-hover:w-16 transition-all duration-300"></div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Call to Action */}
              <div className={`mt-16 pt-8 border-t border-gray-200 transform transition-all duration-1500 delay-1400 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-900">Committed to Sustainable Growth</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Through responsible mining practices and international collaboration, 
                      we continue to build Indonesia's mining future while creating lasting value for all stakeholders.
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <span className="relative z-10">Our Mining Operations</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                    <button className="group border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105">
                      Contact Us
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
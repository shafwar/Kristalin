import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// SVG Icon Components
const IconQuote = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400/30">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
  </svg>
);

const IconMining = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 20h12l-6-10z"/>
    <path d="M8 14l8 0"/>
    <path d="M2 20h20"/>
    <path d="M12 4v6"/>
  </svg>
);

const IconGold = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 2v20"/>
    <path d="M2 12h20"/>
  </svg>
);

const IconIndonesia = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function MessageFromFounder() {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
      text: "Indonesia's golden heritage lies not just beneath our soil, but in our commitment to extract it responsibly, ensuring that every gram of gold we mine contributes to the prosperity of our nation and the welfare of our people.",
      focus: "National Heritage"
    },
    {
      text: "True mining excellence is achieved when we balance profitability with sustainability, creating lasting value that transcends generations while preserving Papua's natural beauty for our children's children.",
      focus: "Sustainable Excellence"
    },
    {
      text: "In the depths of Papua's earth, we don't just mine gold – we mine opportunities, forge partnerships, and build bridges between local communities and global markets, ensuring shared prosperity for all.",
      focus: "Community Partnership"
    }
  ];

  const keyPrinciples = [
    {
      icon: <IconMining />,
      title: "Responsible Mining",
      description: "Pioneering sustainable extraction methods that honor both economic growth and environmental stewardship."
    },
    {
      icon: <IconGold />,
      title: "Excellence in Gold",
      description: "Leveraging Indonesia's rich mineral resources to create world-class gold production standards."
    },
    {
      icon: <IconIndonesia />,
      title: "Indonesia's Pride",
      description: "Building a mining legacy that strengthens Indonesia's position in the global commodities market."
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
        {/* Left Side - Image and Title */}
        <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
          {/* Gambar statis, tidak pernah terkena animasi */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://agarocorp.com/images/about-us/arifbudi.jpg"
              alt="Message from Founder"
              className="w-full h-full object-cover opacity-70"
              draggable="false"
            />
          </div>
          {/* Konten teks tetap animasi, overlay di atas gambar */}
          <div className={`absolute bottom-16 left-16 z-10 transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-white text-5xl font-light leading-tight">
              Message<br />
              <span className="font-normal">from Founder</span>
            </h1>
            <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
            <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
              A visionary perspective on Indonesia's golden future and 
              sustainable mining excellence.
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
                    Message from Founder
                  </span>
                </div>
                <h2 className="text-3xl font-light text-gray-900 leading-relaxed mb-6">
                  Building Indonesia's
                  <span className="text-yellow-600 font-medium"> Golden Legacy</span>
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
                          <div className="font-semibold text-gray-900 text-lg">Arif Budi Setiawan</div>
                          <div className="text-yellow-600 text-sm font-medium">Founder & Chairman</div>
                          <div className="text-gray-500 text-xs">PT Kristalin Eka Lestari</div>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Honored Stakeholders,</h3>
                  
                  <p className="text-gray-700 leading-relaxed">
                    When we established PT Kristalin Eka Lestari in 1989, we envisioned more than just a mining company. 
                    We saw an opportunity to <strong>transform Indonesia's natural wealth into sustainable prosperity</strong> 
                    for our communities, our nation, and future generations.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Over three decades of operations in Papua's resource-rich landscape have taught us that  
                    <strong> true success in mining</strong> comes not from extracting the maximum, but from 
                    <strong> creating lasting value</strong> through responsible practices, innovative technologies, 
                    and genuine partnerships with local communities.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Today, as we look toward the future, our commitment remains unwavering: to be 
                    <strong> Indonesia's premier sustainable mining company</strong>, setting new standards 
                    for environmental stewardship, community empowerment, and operational excellence 
                    that serve as a beacon for the global mining industry.
                  </p>
                </div>
              </div>

              {/* Key Principles */}
              <div className={`mb-12 transform transition-all duration-1000 delay-900 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Our Founding Principles</h3>
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
                    <h4 className="text-lg font-medium text-gray-900">Together, We Build Tomorrow</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Join us in our mission to create a sustainable mining legacy that honors Indonesia's 
                      natural heritage while building prosperity for all stakeholders.
                    </p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <span className="relative z-10">Our Story</span>
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
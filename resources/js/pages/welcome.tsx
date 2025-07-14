import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "@inertiajs/react";

const PlaceholderImg = ({ text }: { text: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="600" height="400" fill="#e5e7eb" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#6b7280">{text}</text>
  </svg>
);

export default function Welcome() {
  const [currentNews, setCurrentNews] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentContent, setCurrentContent] = useState(0);

  const newsItems = [
    {
      date: "Just Updated",
      title: "News on Social Media About the Sale of Kristalin Eka Lestari is a HOAX.",
      excerpt: "Kristalin Eka Lestari has never been offered for sale to any party..."
    },
    {
      date: "15 Jun 2025",
      title: "Kristalin Eka Lestari Expands Gold Mining Operations in West Papua",
      excerpt: "The company opens a new mining area using environmentally friendly technology..."
    },
    {
      date: "28 May 2025",
      title: "CSR Program for Community Empowerment Reaches Target of 1,000 Families",
      excerpt: "Commitment to the welfare of Papua's communities continues to grow..."
    },
    {
      date: "10 May 2025",
      title: "ISO 14001 Certification for Environmental Management Standards in Mining",
      excerpt: "Kristalin Eka Lestari earns international certification for its environmental commitment..."
    },
  ];
  

  const contentSets = [
    {
      title1: "Introducing",
      title2: "Kristalin Ekalestari",
      subtitle: "Trusted gold mining company since 1989",
      titleColors: "text-gray-900",
      title2Colors: "bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent"
    },
    {
      title1: "Trusted Partner",
      title2: "Gold Exploration & Trading",
      subtitle: "Since 1989, committed to sustainable gold mining in Papua.",
      titleColors: "text-gray-900",
      title2Colors: "text-yellow-600"
    }
  ];

  // Content rotation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContent((prev) => (prev + 1) % contentSets.length);
    }, 5000); // Change content every 5 seconds
    return () => clearInterval(interval);
  }, [contentSets.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  // Main Content
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex-1 w-full flex flex-col md:flex-row bg-white relative py-6 md:py-8">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center pl-8 md:pl-20 pr-4 relative">
          {/* Animated SVG Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 600 400">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#FFD700">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
          
          <div className={`relative z-10 max-w-xl transition-all duration-1000 ${
            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            {/* Premium Staggered Animation with Fade + Scale */}
            <div className="relative">
              <div 
                key={currentContent}
                className="animate-containerFade"
              >
                <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                  <span className={`inline-block animate-staggeredFadeScale delay-0 ${contentSets[currentContent].titleColors}`}>
                    {contentSets[currentContent].title1}
                  </span>
                  <br />
                  <span className={`inline-block animate-staggeredFadeScale delay-200 ${contentSets[currentContent].title2Colors}`}>
                    {contentSets[currentContent].title2}
                  </span>
                </h1>
              </div>
            </div>

            {/* Subtitle with Elegant Fade */}
            <div className="relative">
              <p 
                key={`subtitle-${currentContent}`}
                className="mb-4 text-base md:text-lg text-gray-700 animate-staggeredFadeScale delay-400"
              >
                {contentSets[currentContent].subtitle}
              </p>
            </div>

            {/* Button with Final Reveal */}
            <a
              href="/about#about-kristalin"
              className="bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg inline-block mt-6 transform animate-staggeredFadeScale delay-600"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`relative transition-all duration-1000 delay-400 ${
            isLoaded ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-10 opacity-0 scale-95'
          }`}>
            <img
              src="/menara165.jpg"
              alt="Menara 165"
              className="w-full max-w-[420px] h-[220px] md:h-[320px] object-cover object-top rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Grid Section with enhanced animations */}
      <section className="w-full flex flex-col md:flex-row h-[260px] md:h-[320px] bg-black items-stretch">
        {/* Portfolio */}
        <div 
          className="flex-1 relative flex flex-col justify-end px-14 py-10 overflow-hidden border-r border-gray-800 cursor-pointer group"
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => window.location.href = '/line-of-business'}
        >
          <img
            src="https://web-assets.bcg.com/56/d2/d0e00f1a4355852a4bb364c4e513/valuecreationinmining-heroimage.jpg"
            alt="Our Portfolio"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              hoveredCard === 0 ? 'opacity-60 scale-110' : 'opacity-40 scale-100'
            }`}
            style={{ zIndex: 1 }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling;
              if (next && next instanceof HTMLElement) {
                next.style.display = 'block';
              }
            }}
          />
          <div className="hidden absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <PlaceholderImg text="Portfolio Image" />
          </div>
          <div className="relative z-10">
            <div className={`text-xs uppercase tracking-widest text-gray-300 mb-1 transition-all duration-300 ${
              hoveredCard === 0 ? 'text-yellow-300' : ''
            }`}>
              Business Line
            </div>
            <div className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 ${
              hoveredCard === 0 ? 'transform translate-x-2' : ''
            }`}>
              Our Portfolio
            </div>
            <div className={`h-1 bg-yellow-500 rounded mb-2 transition-all duration-300 ${
              hoveredCard === 0 ? 'w-16' : 'w-10'
            }`}></div>
          </div>
        </div>

        {/* Business Activities */}
        <Link 
          href="/business-activity"
          className="flex-1 relative flex flex-col justify-end px-14 py-10 overflow-hidden border-r border-gray-800 cursor-pointer group"
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img
            src="https://i0.wp.com/startuptipsdaily.com/wp-content/uploads/2017/06/mining-business-ideas-and-opportunity.jpg?fit=3072%2C2048&ssl=1"
            alt="Business Activities"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              hoveredCard === 1 ? 'opacity-60 scale-110' : 'opacity-40 scale-100'
            }`}
            style={{ zIndex: 1 }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const next = e.currentTarget.nextElementSibling;
              if (next && next instanceof HTMLElement) {
                next.style.display = 'block';
              }
            }}
          />
          <div className="hidden absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <PlaceholderImg text="Governance Image" />
          </div>
          <div className="relative z-10">
            <div className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 ${
              hoveredCard === 1 ? 'transform translate-x-2' : ''
            }`}>
              Business Activities
            </div>
            <span 
              className={`underline text-white hover:text-yellow-400 text-lg md:text-xl mt-2 transition-all duration-300 ${
                hoveredCard === 1 ? 'text-yellow-400' : ''
              }`}
            >
              Find out more →
            </span>
          </div>
        </Link>

        {/* News with proper normal sizing */}
        <div 
          className="flex-1 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 flex flex-col justify-between px-14 py-10 relative overflow-hidden"
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Clean background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>

          {/* Top Section - Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
                hoveredCard === 2 ? 'transform scale-110 text-black' : 'text-gray-900'
              }`}>
                News
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length)}
                  className="w-8 h-8 flex items-center justify-center text-black hover:text-white hover:bg-black hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentNews((prev) => (prev + 1) % newsItems.length)}
                  className="w-8 h-8 flex items-center justify-center text-black hover:text-white hover:bg-black hover:bg-opacity-20 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Middle Section - Content with proper spacing */}
          <div className="relative z-10 flex-1 flex flex-col justify-center space-y-3">
            <div key={currentNews} className="transform transition-all duration-500">
              {/* Date */}
              <div className="text-xs text-gray-800 mb-2 font-medium opacity-80">
                {newsItems[currentNews].date}
              </div>
              
              {/* Title */}
              <div className="text-lg md:text-xl font-bold text-black mb-3 leading-tight">
                {newsItems[currentNews].title}
              </div>
              
              {/* Description */}
              <div className="text-sm md:text-base text-gray-900 leading-relaxed opacity-90">
                {newsItems[currentNews].excerpt}
              </div>
            </div>
          </div>
          
          {/* Bottom Section - View button with proper spacing */}
          <div className="relative z-10 mt-4">
            <Link 
              href="/news"
              className="inline-flex items-center text-black hover:text-gray-800 text-lg md:text-xl font-medium group transition-all duration-300"
            >
              <span className="relative z-10">View</span>
              <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232323] text-white text-left py-4 text-xs px-8">
        <div className="animate-pulse">
          © 2025 PT Kristalin Eka Lestari. All rights reserved.
        </div>
      </footer>

      {/* Premium Staggered Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes containerFade {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          
          @keyframes staggeredFadeScale {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
              filter: blur(2px);
            }
            60% {
              opacity: 0.8;
              transform: translateY(5px) scale(0.98);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes premiumFadeIn {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes newsSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }
          
          .animate-containerFade {
            animation: containerFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .animate-staggeredFadeScale {
            opacity: 0;
            animation: staggeredFadeScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .animate-premiumFadeIn {
            animation: premiumFadeIn 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          /* Delay Classes for Staggered Effect */
          .delay-0 {
            animation-delay: 0ms;
          }
          
          .delay-200 {
            animation-delay: 200ms;
          }
          
          .delay-400 {
            animation-delay: 400ms;
          }
          
          .delay-600 {
            animation-delay: 600ms;
          }
          
          .delay-800 {
            animation-delay: 800ms;
          }
          
          /* Hover Enhancement */
          .hover-enhance {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .hover-enhance:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
        `
      }} />
    </div>
  );
}
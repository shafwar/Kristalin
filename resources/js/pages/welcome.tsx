import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

  const newsItems = [
    {
      date: "15 Jun 2025",
      title: "Kristalin Eka Lestari Ekspansi Operasi Tambang Emas di Papua Barat",
      excerpt: "Perusahaan membuka area tambang baru dengan teknologi ramah lingkungan..."
    },
    {
      date: "28 Mei 2025",
      title: "Program CSR Pemberdayaan Masyarakat Lokal Mencapai Target 1000 Keluarga",
      excerpt: "Komitmen terhadap kesejahteraan masyarakat Papua terus ditingkatkan..."
    },
    {
      date: "10 Mei 2025",
      title: "Sertifikasi ISO 14001 untuk Standar Pengelolaan Lingkungan Pertambangan",
      excerpt: "Kristalin Eka Lestari meraih sertifikat internasional untuk komitmen lingkungan..."
    }
  ];

  useEffect(() => {
    // Page load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

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
            <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-gray-900">
              <span className="inline-block animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                Mitra Terpercaya
              </span>
              <br />
              <span className="text-yellow-600 inline-block animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
                Eksplorasi & Perdagangan Emas
              </span>
            </h1>
            <p className={`mb-4 text-base md:text-lg text-gray-700 transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              Sejak 1989, berkomitmen untuk pertambangan emas berkelanjutan di Papua.
            </p>
            <a
              href="/about#about-kristalin"
              className={`bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 hover:shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg inline-block mt-6 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`relative transition-all duration-1000 delay-300 ${
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
        >
          <img
            src="https://kristalin.co.id/wp-content/uploads/2020/05/Anak-Papua.jpg"
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
        <div 
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
            <button className={`underline text-white hover:text-yellow-400 text-lg md:text-xl mt-2 transition-all duration-300 ${
              hoveredCard === 1 ? 'text-yellow-400' : ''
            }`}>
              Find out more →
            </button>
          </div>
        </div>

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
             <a 
               href="#" 
               className="inline-flex items-center text-black hover:text-gray-800 text-lg md:text-xl font-medium group transition-all duration-300"
             >
               <span className="relative z-10">View</span>
               <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               </div>
             </a>
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

      {/* Custom styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
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
          
          @keyframes textReveal {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes buttonReveal {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
    </div>
  );
}

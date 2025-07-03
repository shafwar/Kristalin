import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const PlaceholderImg = ({ text }: { text: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="xxhttp://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="600" height="400" fill="#e5e7eb" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#6b7280">{text}</text>
  </svg>
);

export default function Welcome() {
  const [currentNews, setCurrentNews] = useState(0);

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
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex-1 w-full flex flex-col md:flex-row bg-white relative py-6 md:py-8">
        <div className="flex-1 flex flex-col justify-center pl-8 md:pl-20 pr-4 relative">
          {/* SVG Pattern Emas */}
          <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 600 400">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#FFD700"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
          <div className="relative z-10 max-w-xl">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-gray-900">
              Mitra Terpercaya <span className="text-yellow-600">Eksplorasi & Perdagangan Emas</span>
            </h1>
            <p className="mb-4 text-base md:text-lg text-gray-700">
              Sejak 1989, berkomitmen untuk pertambangan emas berkelanjutan di Papua.
            </p>
            <a
              href="/about#about-kristalin"
              className="bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded shadow hover:bg-yellow-600 transition text-base md:text-lg inline-block mt-6"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/menara165.jpg"
            alt="Menara 165"
            className="w-full max-w-[420px] h-[220px] md:h-[320px] object-cover object-top rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Grid Section - Lebih rapi dan profesional */}
      <section className="w-full flex flex-col md:flex-row h-[260px] md:h-[320px] bg-black items-stretch">
        {/* Portfolio */}
        <div className="flex-1 relative flex flex-col justify-end px-14 py-10 overflow-hidden border-r border-gray-800">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Our Portfolio"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
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
            <div className="text-xs uppercase tracking-widest text-gray-300 mb-1">Business Line</div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-2">Our Portfolio</div>
            <div className="w-10 h-1 bg-yellow-500 rounded mb-2"></div>
          </div>
        </div>
        {/* Governance / Company Overview Button */}
        <div className="flex-1 relative flex flex-col justify-end px-14 py-10 overflow-hidden border-r border-gray-800">
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Corporate Governance"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
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
            <div className="text-2xl md:text-3xl font-bold text-white mb-2">Good Corporate<br />Governance</div>
            <button
              className="underline text-white hover:text-yellow-400 text-lg md:text-xl mt-2 cursor-pointer"
              type="button"
            >
              Find out more
            </button>
          </div>
        </div>
        {/* News */}
        <div className="flex-1 bg-yellow-400 flex flex-col justify-between px-14 py-10">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl md:text-3xl font-bold">News</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length)}
                  className="w-6 h-6 flex items-center justify-center text-black hover:text-gray-700"
                >←</button>
                <button
                  onClick={() => setCurrentNews((prev) => (prev + 1) % newsItems.length)}
                  className="w-6 h-6 flex items-center justify-center text-black hover:text-gray-700"
                >→</button>
              </div>
            </div>
            <div className="text-xs text-gray-800">{newsItems[currentNews].date}</div>
            <div className="mt-2 text-lg md:text-xl font-semibold text-black">{newsItems[currentNews].title}</div>
            <div className="text-sm md:text-base text-gray-800 mt-1">{newsItems[currentNews].excerpt}</div>
            <a href="#" className="mt-2 underline text-black hover:text-blue-900 text-lg md:text-xl block">View</a>
          </div>
          {/* News indicator dots */}
          <div className="flex gap-1 mt-4">
            {newsItems.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentNews ? 'bg-black' : 'bg-black bg-opacity-30'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232323] text-white text-left py-4 text-xs px-8">
        © 2025 PT Kristalin Eka Lestari. All rights reserved.
      </footer>
    </div>
  );
}

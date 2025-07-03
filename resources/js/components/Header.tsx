import React from "react";

export default function Header() {
  return (
    <header className="flex items-center h-20 w-full bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow pl-8 pr-6 relative z-50">
      {/* Logo/Home */}
      <div className="flex items-center min-w-[120px]">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Kristalin Eka Lestari Logo" className="h-16 w-auto object-contain" />
        </a>
      </div>
      
      {/* Menu */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex gap-10 text-base font-extrabold text-white uppercase tracking-wide">
          <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
          <li>
            <a
              href="https://modi.esdm.go.id/portal/detailPerusahaan/14963?jp=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Modi
            </a>
          </li>
          <li><a href="/company-overview" className="hover:text-yellow-400 transition">Company Overview</a></li>
          
          {/* About Us dengan Dropdown */}
          <li className="relative group">
            <a href="#" className="hover:text-yellow-400 transition flex items-center gap-1">
              About Us
              <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 12 12">
                <path d="M6 8L2 4h8l-4 4z"/>
              </svg>
            </a>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-80 bg-gradient-to-b from-[#444] via-[#666] to-[#888] text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-lg border border-gray-600">
              <div className="py-6 px-6">
                <div className="space-y-3">
                  <a href="/about#about-kristalin" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">ABOUT KRISTALIN EKA LESTARI</a>
                  <a href="/about#milestones" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">MILESTONES</a>
                  <a href="/about#vision-mission" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">OUR VISION & MISSION</a>
                  <a href="/about#core-values" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">OUR CORE VALUES</a>
                  <a href="/about#leadership-team" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">LEADERSHIP TEAM</a>
                  <a href="/about#message-founder" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">MESSAGE FROM FOUNDER</a>
                  <a href="/about#message-president" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">MESSAGE FROM PRESIDENT DIRECTOR</a>
                  <a href="/about#profile-board" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">PROFILE FOUNDER, BOARD OF COMMISSIONERS AND BOARD OF DIRECTORS</a>
                  <a href="/about#brand-evolution" className="block text-sm hover:text-yellow-300 transition-colors py-1 hover:bg-white hover:bg-opacity-10 px-2 rounded">BRAND EVOLUTION</a>
                </div>
              </div>
            </div>
          </li>
          
          <li><a href="#" className="hover:text-yellow-400 transition">Business Activities</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">CSR</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
        </ul>
      </nav>
      
      {/* Fitur kanan */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Language Switcher */}
        <button className="text-white font-bold flex items-center gap-1">
          ID <svg width="16" height="16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" /></svg>
        </button>
        {/* Search Icon */}
        <button className="text-white">
          <svg width="22" height="22" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
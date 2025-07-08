import React from "react";
import { Link } from "@inertiajs/react";

export default function Header() {
  return (
    <header className="flex items-center h-20 w-full bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow-lg relative z-50 px-4 md:px-8">
      {/* Logo Section */}
      <div className="flex items-center pl-6 pr-8">
        <a href="/" className="flex items-center" aria-label="Company Logo">
          <img src="/logo.svg" alt="Kristalin Eka Lestari Logo" className="h-16 md:h-20 w-auto object-contain" />
        </a>
      </div>
      {/* Navigation Menu */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex items-center gap-7 text-[15px] font-semibold text-white uppercase tracking-wide">
          <li>
            <a href="/" className="flex items-center justify-center hover:text-yellow-400 transition-colors duration-200 px-2 py-1" aria-label="Home">
              Home
            </a>
          </li>
          <li className="relative group">
            <a href="#" className="hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1 px-2 py-1">
              About Us
              <svg className="w-3 h-3 transform group-hover:rotate-180 transition-transform duration-200" fill="currentColor" viewBox="0 0 12 12">
                <path d="M6 8L2 4h8l-4 4z"/>
              </svg>
            </a>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-72 bg-gradient-to-b from-[#444] via-[#666] to-[#888] text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded-lg border border-gray-600">
              <div className="py-4 px-4">
                <div className="space-y-2">
                  <a href="/about#about-kristalin" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">About Kristalin Eka Lestari</a>
                  <a href="/vision-mission" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">Our Vision & Mission</a>
                  <a href="/company-overview" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">Company Overview</a>
                  <a href="/milestones" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">Milestones</a>
                  <a href="/core-values" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">Our Core Values</a>
                  <a href="/leadership-traits" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">Leadership Traits</a>
                  <a href="/message-from-founder" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">Message From Founder</a>
                  <a href="/news" className="block text-xs hover:text-yellow-300 transition-colors py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded">News</a>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="https://modi.esdm.go.id/portal/detailPerusahaan/14963?jp=1" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-200 px-2 py-1">Modi</a>
          </li>
          <li>
            <a href="https://goldprice.org/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-200 px-2 py-1">Gold Price</a>
          </li>
          <li>
            <a href="/line-of-business" className="hover:text-yellow-400 transition-colors duration-200 px-2 py-1">Our Line of Business</a>
          </li>
          <li>
            <Link href="/business-activity" className="hover:text-yellow-400 transition-colors duration-200 px-2 py-1">Business Activities</Link>
          </li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200 px-2 py-1">CSR</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200 px-2 py-1">Contact</a></li>
        </ul>
      </nav>
      {/* Right Side Features */}
      <div className="flex items-center gap-1 text-[15px] font-semibold uppercase tracking-wide h-full">
        {/* Language Switcher */}
        <button className="text-white font-semibold text-[15px] uppercase tracking-wide flex items-center justify-center min-w-[44px] px-2 py-1 h-10 hover:text-yellow-400 transition-colors duration-200">
          ID
          <svg width="12" height="12" fill="none" className="transform group-hover:rotate-180 transition-transform duration-200">
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* Search Icon */}
        <button className="text-white font-semibold text-[15px] uppercase tracking-wide flex items-center justify-center px-2 py-1 h-10 hover:text-yellow-400 transition-colors duration-200" aria-label="Search">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";

interface HeaderProps {
  sticky?: boolean;
  transparent?: boolean;
}

export default function Header({ sticky = false, transparent = false }: HeaderProps) {
  const [language, setLanguage] = useState("ID");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for transparent/sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
    };

    if (transparent || sticky) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [transparent, sticky]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Calculate opacity based on scroll position for smooth transition
  const getBackgroundOpacity = () => {
    if (!transparent) return 1;
    const maxScroll = 100; // Distance over which to animate
    const opacity = Math.min(scrollY / maxScroll, 1);
    return opacity;
  };

  const isScrolled = scrollY > 10;
  const backgroundOpacity = getBackgroundOpacity();
  const shadowOpacity = Math.min(scrollY / 50, 1); // Shadow appears gradually
  const blurIntensity = Math.min(scrollY / 80, 1); // Backdrop blur increases gradually
  const textOpacity = transparent ? Math.max(0.8, 1 - (backgroundOpacity * 0.2)) : 1;

  // Logo filter: putih saat transparent, normal saat solid
  const getLogoFilter = () => {
    if (!transparent) return 'none';
    
    const scrollProgress = Math.min(scrollY / 100, 1);
    if (scrollProgress < 0.5) {
      // Saat navbar masih transparent, logo jadi putih
      return 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))';
    } else {
      // Transisi kembali ke warna asli
      const normalProgress = (scrollProgress - 0.5) * 2; // 0 to 1
      const brightness = normalProgress;
      const invert = 1 - normalProgress;
      return `brightness(${brightness}) invert(${invert}) drop-shadow(0 2px 8px rgba(0,0,0,${0.3 * (1 - normalProgress)}))`;
    }
  };

  // Determine header classes and styles
  const getHeaderClasses = () => {
    let baseClasses = "flex items-center h-20 w-full px-4 md:px-8 z-50";
    
    if (sticky && transparent) {
      return `${baseClasses} fixed top-0 left-0 right-0 transition-all duration-300 ease-out`;
    } else if (sticky) {
      return `${baseClasses} fixed top-0 left-0 right-0 bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow-lg transition-all duration-500 ease-out`;
    } else {
      return `${baseClasses} bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow-lg relative`;
    }
  };

  const getHeaderStyle = () => {
    if (!transparent) return {};
    
    return {
      background: `linear-gradient(to bottom, 
        rgba(68, 68, 68, ${backgroundOpacity * 0.95}), 
        rgba(136, 136, 136, ${backgroundOpacity * 0.95}), 
        rgba(229, 231, 235, ${backgroundOpacity * 0.95}))`,
      boxShadow: shadowOpacity > 0 ? `0 10px 25px rgba(0, 0, 0, ${shadowOpacity * 0.15})` : 'none',
      backdropFilter: blurIntensity > 0 ? `blur(${blurIntensity * 12}px)` : 'none',
      WebkitBackdropFilter: blurIntensity > 0 ? `blur(${blurIntensity * 12}px)` : 'none',
    };
  };

  return (
    <header className={getHeaderClasses()} style={getHeaderStyle()}>
      {/* Logo Section */}
      <div className="flex items-center pl-6 pr-8">
        <a href="/" className="flex items-center" aria-label="Company Logo">
          <img 
            src="/logo.svg" 
            alt="Kristalin Eka Lestari Logo" 
            className="h-16 md:h-20 w-auto object-contain transition-all duration-300 ease-out"
            style={{
              filter: getLogoFilter()
            }}
          />
        </a>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 flex justify-center">
        <ul 
          className="flex items-center gap-7 text-[15px] font-semibold text-white uppercase tracking-wide transition-all duration-300 ease-out"
          style={{ opacity: textOpacity }}
        >
          <li>
            <a href="/" className="flex items-center justify-center hover:text-yellow-400 transition-all duration-300 ease-out px-2 py-1 hover:scale-105" aria-label="Home">
              Home
            </a>
          </li>
          <li className="relative group">
            <a href="#" className="hover:text-yellow-400 transition-all duration-300 ease-out flex items-center gap-1 px-2 py-1 hover:scale-105">
              About Us
              <svg className="w-3 h-3 transform group-hover:rotate-180 transition-transform duration-300 ease-out" fill="currentColor" viewBox="0 0 12 12">
                <path d="M6 8L2 4h8l-4 4z"/>
              </svg>
            </a>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-72 bg-gradient-to-b from-[#444] via-[#666] to-[#888] text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0 z-50 rounded-lg border border-gray-600 backdrop-blur-sm">
              <div className="py-4 px-4">
                <div className="space-y-2">
                  <a href="/about#about-kristalin" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">About Kristalin Eka Lestari</a>
                  <a href="/vision-mission" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">Our Vision & Mission</a>
                  <a href="/company-overview" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">Company Overview</a>
                  <a href="/milestones" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">Milestones</a>
                  <a href="/core-values" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">Our Core Values</a>
                  <a href="/leadership-traits" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">Leadership Traits</a>
                  <a href="/message-from-founder" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">Message From Founder</a>
                  <a href="/news" className="block text-xs hover:text-yellow-300 transition-all duration-300 ease-out py-2 hover:bg-white hover:bg-opacity-10 px-3 rounded hover:scale-105 hover:translate-x-1">News</a>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="https://modi.esdm.go.id/portal/detailPerusahaan/14963?jp=1" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 ease-out px-2 py-1 hover:scale-105">Modi</a>
          </li>
          <li>
            <a href="https://goldprice.org/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-all duration-300 ease-out px-2 py-1 hover:scale-105">Gold Price</a>
          </li>
          <li>
            <a href="/line-of-business" className="hover:text-yellow-400 transition-all duration-300 ease-out px-2 py-1 hover:scale-105">Our Line of Business</a>
          </li>
          <li>
            <Link href="/business-activity" className="hover:text-yellow-400 transition-all duration-300 ease-out px-2 py-1 hover:scale-105">Business Activities</Link>
          </li>
          <li><a href="/csr" className="hover:text-yellow-400 transition-all duration-300 ease-out px-2 py-1 hover:scale-105">CSR</a></li>
          <li><a href="/contact" className="hover:text-yellow-400 transition-all duration-300 ease-out px-2 py-1 hover:scale-105">Contact</a></li>
        </ul>
      </nav>

      {/* Right Side Features */}
      <div 
        className="flex items-center gap-1 text-[15px] font-semibold uppercase tracking-wide h-full text-white transition-all duration-300 ease-out"
        style={{ opacity: textOpacity }}
      >
        {/* Language Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-white font-semibold text-[15px] uppercase tracking-wide flex items-center justify-center min-w-[44px] px-2 py-1 h-10 hover:text-yellow-400 transition-all duration-300 ease-out focus:outline-none"
            style={{ opacity: textOpacity }}
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {language}
            <svg width="12" height="12" fill="none" className={`ml-1 transform transition-transform duration-300 ease-out ${dropdownOpen ? 'rotate-180' : ''}`}>
              <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white rounded shadow-lg z-50 border border-gray-200 animate-fadeIn transform transition-all duration-300 ease-out" role="listbox">
              <button
                className={`block w-full text-left px-4 py-2 text-sm uppercase font-semibold hover:bg-yellow-100 transition-all duration-300 ease-out hover:scale-105 ${language === 'ID' ? 'text-yellow-600' : 'text-gray-800'}`}
                onClick={() => { setLanguage('ID'); setDropdownOpen(false); }}
                role="option"
                aria-selected={language === 'ID'}
              >
                ID
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm uppercase font-semibold hover:bg-yellow-100 transition-all duration-300 ease-out hover:scale-105 ${language === 'EN' ? 'text-yellow-600' : 'text-gray-800'}`}
                onClick={() => { setLanguage('EN'); setDropdownOpen(false); }}
                role="option"
                aria-selected={language === 'EN'}
              >
                EN
              </button>
            </div>
          )}
        </div>
        {/* Search Icon */}
        <button 
          className="text-white font-semibold text-[15px] uppercase tracking-wide flex items-center justify-center px-2 py-1 h-10 hover:text-yellow-400 transition-all duration-300 ease-out hover:scale-105 focus:outline-none" 
          style={{ opacity: textOpacity }}
          aria-label="Search"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
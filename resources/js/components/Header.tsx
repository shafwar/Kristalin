import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface HeaderProps {
    sticky?: boolean;
    transparent?: boolean;
}

export default function Header({ sticky = false, transparent = false }: HeaderProps) {
    const [language, setLanguage] = useState('ID');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

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
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                const hamburgerButton = (event.target as Element).closest('[aria-label*="menu"]');
                if (!hamburgerButton) {
                    setMobileMenuOpen(false);
                }
            }
        }
        if (dropdownOpen || mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen, mobileMenuOpen]);

    // Close mobile menu when window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            const scrollY = window.scrollY;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [mobileMenuOpen]);

    // Calculate opacity based on scroll position for smooth transition
    const getBackgroundOpacity = () => {
        if (!transparent) return 1;
        // PERBAIKAN: Force solid background jika mobile menu terbuka
        if (mobileMenuOpen) return 1;
        const maxScroll = 100;
        const opacity = Math.min(scrollY / maxScroll, 1);
        return opacity;
    };

    const backgroundOpacity = getBackgroundOpacity();
    const shadowOpacity = Math.min(scrollY / 50, 1);
    const blurIntensity = Math.min(scrollY / 80, 1);
    // PERBAIKAN: Force white text jika mobile menu terbuka dan background solid
    const textOpacity = transparent && !mobileMenuOpen ? Math.max(0.8, 1 - backgroundOpacity * 0.2) : 1;

    // PERBAIKAN: Determine header classes and styles dengan kondisi mobile menu
    const getHeaderClasses = () => {
        const baseClasses = 'flex items-center h-16 sm:h-18 lg:h-20 w-full px-3 sm:px-4 md:px-6 lg:px-8 z-50';

        if (sticky && transparent) {
            return `${baseClasses} fixed top-0 left-0 right-0 transition-all duration-300 ease-out`;
        } else if (sticky) {
            return `${baseClasses} fixed top-0 left-0 right-0 bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow-lg transition-all duration-500 ease-out`;
        } else {
            return `${baseClasses} bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow-lg relative`;
        }
    };

    const getHeaderStyle = () => {
        // PERBAIKAN: Force solid background jika mobile menu terbuka
        if (!transparent || mobileMenuOpen) {
            return {
                background: 'linear-gradient(to bottom, rgb(68, 68, 68), rgb(136, 136, 136), rgb(229, 231, 235))',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            };
        }

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

    // PERBAIKAN: Logo logic dengan kondisi mobile menu
    const getLogoSrc = () => {
        if (!transparent) {
            return 'https://kristalin.co.id/wp-content/uploads/2019/10/Logo-Kristalin.png';
        }

        // Jika mobile menu terbuka, gunakan logo dark
        if (mobileMenuOpen) {
            return 'https://kristalin.co.id/wp-content/uploads/2019/10/Logo-Kristalin.png';
        }

        // Default transparent logic
        return scrollY < 50
            ? 'https://kristalin.co.id/wp-content/uploads/2019/10/Logo-Kristalin-white.png'
            : 'https://kristalin.co.id/wp-content/uploads/2019/10/Logo-Kristalin.png';
    };

    const getLogoFilter = () => {
        if (!transparent || mobileMenuOpen) return 'none';
        return scrollY < 50 ? 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))' : 'none';
    };

    // Navigation items for reusability
    const navigationItems = [
        { label: 'Home', href: '/' },
        {
            label: 'About Us',
            href: '#',
            hasDropdown: true,
            dropdownItems: [
                { label: 'About Kristalin Eka Lestari', href: '/about#about-kristalin' },
                { label: 'Our Vision & Mission', href: '/vision-mission' },
                { label: 'Company Overview', href: '/company-overview' },
                { label: 'Milestones', href: '/milestones' },
                { label: 'Our Core Values', href: '/core-values' },
                { label: 'Leadership Traits', href: '/leadership-traits' },
                { label: 'Message From Founder', href: '/message-from-founder' },
                { label: 'News', href: '/news' },
            ],
        },
        { label: 'Modi', href: 'https://modi.esdm.go.id/portal/detailPerusahaan/14963?jp=1', external: true },
        { label: 'Gold Price', href: 'https://goldprice.org/', external: true },
        { label: 'Line of Business', href: '/line-of-business' },
        { label: 'Business Activities', href: '/business-activity' },
        { label: 'CSR', href: '/csr' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <header className={getHeaderClasses()} style={getHeaderStyle()}>
            {/* Logo Section */}
            <div className="flex items-center pr-4 pl-2 sm:pr-6 sm:pl-4 lg:pr-8 lg:pl-6">
                <a href="/" className="flex items-center" aria-label="Company Logo">
                    <img
                        src={getLogoSrc()}
                        alt="Kristalin Eka Lestari Logo"
                        className="h-8 w-auto object-contain transition-all duration-700 ease-out sm:h-10 md:h-12 lg:h-16"
                        style={{ filter: getLogoFilter() }}
                    />
                </a>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden flex-1 justify-center lg:flex">
                <ul
                    className="flex items-center gap-4 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out xl:gap-7 xl:text-sm"
                    style={{ opacity: textOpacity }}
                >
                    {navigationItems.map((item, index) => (
                        <li key={index} className={item.hasDropdown ? 'group relative' : ''}>
                            {item.hasDropdown ? (
                                <>
                                    <a
                                        href={item.href}
                                        className="flex items-center gap-1 px-2 py-1 transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400"
                                    >
                                        {item.label}
                                        <svg
                                            className="h-3 w-3 transform transition-transform duration-300 ease-out group-hover:rotate-180"
                                            fill="currentColor"
                                            viewBox="0 0 12 12"
                                        >
                                            <path d="M6 8L2 4h8l-4 4z" />
                                        </svg>
                                    </a>
                                    {/* Desktop Dropdown Menu */}
                                    <div className="invisible absolute top-full left-0 z-50 mt-2 w-64 translate-y-2 transform rounded-lg border border-gray-600 bg-gradient-to-b from-[#444] via-[#666] to-[#888] text-white opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 xl:w-72">
                                        <div className="px-4 py-4">
                                            <div className="space-y-2">
                                                {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                                                    <a
                                                        key={dropdownIndex}
                                                        href={dropdownItem.href}
                                                        className="hover:bg-opacity-10 block rounded px-3 py-2 text-xs transition-all duration-300 ease-out hover:translate-x-1 hover:scale-105 hover:bg-white hover:text-yellow-300"
                                                    >
                                                        {dropdownItem.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : item.external ? (
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="px-2 py-1 transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex flex-1 justify-end lg:hidden">
                <button
                    className="p-2 text-white transition-all duration-300 ease-out hover:text-yellow-400"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    style={{ opacity: textOpacity }}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Right Side Features - Desktop Only */}
            <div
                className="hidden h-full items-center gap-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out lg:flex xl:text-sm"
                style={{ opacity: textOpacity }}
            >
                {/* Language Switcher */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex h-10 min-w-[44px] items-center justify-center px-2 py-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out hover:text-yellow-400 focus:outline-none xl:text-sm"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                    >
                        {language}
                        <svg
                            width="12"
                            height="12"
                            fill="none"
                            className={`ml-1 transform transition-transform duration-300 ease-out ${dropdownOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div
                            className="animate-fadeIn absolute right-0 z-50 mt-2 w-24 transform rounded border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-out"
                            role="listbox"
                        >
                            <button
                                className={`block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${language === 'ID' ? 'text-yellow-600' : 'text-gray-800'}`}
                                onClick={() => {
                                    setLanguage('ID');
                                    setDropdownOpen(false);
                                }}
                                role="option"
                                aria-selected={language === 'ID'}
                            >
                                ID
                            </button>
                            <button
                                className={`block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${language === 'EN' ? 'text-yellow-600' : 'text-gray-800'}`}
                                onClick={() => {
                                    setLanguage('EN');
                                    setDropdownOpen(false);
                                }}
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
                    className="flex h-10 items-center justify-center px-2 py-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400 focus:outline-none xl:text-sm"
                    aria-label="Search"
                >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <>
                {/* Mobile Menu Content */}
                <div
                    ref={mobileMenuRef}
                    className={`fixed top-16 right-0 bottom-0 left-0 z-40 overflow-y-auto bg-gradient-to-b from-[#444] via-[#666] to-[#888] shadow-2xl transition-all duration-400 ease-out sm:top-18 lg:top-20 lg:hidden ${
                        mobileMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-full opacity-0'
                    }`}
                    style={{
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        overscrollBehavior: 'contain',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <div className="min-h-full space-y-4 px-4 py-6">
                        {/* Mobile Language Switcher */}
                        <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                            <span className="text-sm font-semibold text-white">Language:</span>
                            <div className="flex gap-2">
                                <button
                                    className={`rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${language === 'ID' ? 'bg-yellow-600 text-white' : 'hover:bg-opacity-10 text-white hover:bg-white'}`}
                                    onClick={() => setLanguage('ID')}
                                >
                                    ID
                                </button>
                                <button
                                    className={`rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${language === 'EN' ? 'bg-yellow-600 text-white' : 'hover:bg-opacity-10 text-white hover:bg-white'}`}
                                    onClick={() => setLanguage('EN')}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        {/* Mobile Navigation Items */}
                        {navigationItems.map((item, index) => (
                            <div key={index} className="border-b border-gray-600 pb-4 last:border-b-0">
                                {item.hasDropdown ? (
                                    <div>
                                        <button className="w-full py-2 text-left text-base font-semibold text-white transition-all duration-300 hover:text-yellow-400">
                                            {item.label}
                                        </button>
                                        <div className="mt-2 space-y-2 pl-4">
                                            {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                                                <a
                                                    key={dropdownIndex}
                                                    href={dropdownItem.href}
                                                    className="block py-1 text-sm text-gray-300 transition-all duration-300 hover:text-yellow-300"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {dropdownItem.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ) : item.external ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block py-2 text-base font-semibold text-white transition-all duration-300 hover:text-yellow-400"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block py-2 text-base font-semibold text-white transition-all duration-300 hover:text-yellow-400"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile Search */}
                        <div className="pt-4">
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-yellow-500 hover:to-yellow-400">
                                <svg
                                    width="18"
                                    height="18"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </header>
    );
}

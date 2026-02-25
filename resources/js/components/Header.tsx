import { useTranslation } from '@/hooks/useTranslation';
import { Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { imageUrl } from '../lib/assets';

interface HeaderProps {
    sticky?: boolean;
    transparent?: boolean;
}

export default function Header({ sticky = false, transparent = false }: HeaderProps) {
    const { t, locale, switchLanguage, getCurrentLanguageCode } = useTranslation();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const aboutDropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

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
            if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
                setAboutDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                const hamburgerButton = (event.target as Element).closest('[aria-label*="menu"]');
                if (!hamburgerButton) {
                    setMobileMenuOpen(false);
                }
            }
        }
        if (dropdownOpen || aboutDropdownOpen || mobileMenuOpen || searchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen, aboutDropdownOpen, mobileMenuOpen, searchOpen]);

    // Close search on Escape and handle Enter
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSearchOpen(false);
            if (e.key === 'Enter' && searchOpen) {
                e.preventDefault();
                if (searchQuery.trim() !== '') {
                    router.get('/search', { q: searchQuery.trim() }, { preserveScroll: true });
                    setSearchOpen(false);
                }
            }
        };
        if (searchOpen) {
            window.addEventListener('keydown', onKey);
        }
        return () => window.removeEventListener('keydown', onKey);
    }, [searchOpen, searchQuery]);

    // Close mobile menu when window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
                // Ensure any page-level scroll lock is removed when switching to desktop
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
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
            document.body.classList.add('mobile-menu-open');

            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                document.body.classList.remove('mobile-menu-open');
                window.scrollTo(0, scrollY);
            };
        } else {
            document.body.classList.remove('mobile-menu-open');
        }
    }, [mobileMenuOpen]);

    // Calculate opacity based on scroll position for smooth transition
    const getBackgroundOpacity = () => {
        if (!transparent) return 1;
        if (mobileMenuOpen) return 1;
        const maxScroll = 100;
        const opacity = Math.min(scrollY / maxScroll, 1);
        return opacity;
    };

    const backgroundOpacity = getBackgroundOpacity();
    const shadowOpacity = Math.min(scrollY / 50, 1);
    const blurIntensity = Math.min(scrollY / 80, 1);
    const textOpacity = transparent && !mobileMenuOpen ? Math.max(0.8, 1 - backgroundOpacity * 0.2) : 1;

    // Determine header classes and styles
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

    // Logo logic
    const getLogoSrc = () => {
        return imageUrl('kristalinlogotransisi1.png');
    };

    const getLogoFilter = () => {
        if (!transparent || mobileMenuOpen) return 'none';
        return scrollY < 50 ? 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.3))' : 'none';
    };

    // Navigation items for reusability
    const navigationItems = [
        { label: t('nav.home'), href: '/' },
        {
            label: t('nav.about_us'),
            href: '#',
            hasDropdown: true,
            dropdownItems: [
                { label: t('nav.about_kristalin'), href: '/about#about-kristalin' },
                { label: t('nav.board_of_directors'), href: '/board-of-directors' },
                { label: t('nav.vision_mission'), href: '/vision-mission' },
                { label: t('nav.company_overview'), href: '/company-overview' },
                { label: t('nav.milestones'), href: '/milestones' },
                { label: t('nav.core_values'), href: '/core-values' },
                { label: t('nav.leadership_traits'), href: '/leadership-traits' },
                { label: t('nav.news'), href: '/news' },
                { label: t('nav.careers'), href: '/careers' },
            ],
        },
        { label: t('nav.modi'), href: 'https://minerbaone.esdm.go.id/publik/badan-usaha/detail/611426748818660096', external: true },
        { label: t('nav.gold_price'), href: 'https://goldprice.org/gold-price-indonesia.html', external: true },
        { label: t('nav.line_of_business'), href: '/line-of-business' },
        { label: t('nav.business_activities'), href: '/business-activity' },
        { label: t('nav.csr'), href: '/csr' },
        { label: t('nav.contact'), href: '/contact' },
    ];

    return (
        <header className={getHeaderClasses()} style={getHeaderStyle()}>
            {/* Logo Section */}
            <div className="flex items-center pr-2 pl-2 sm:pr-4 sm:pl-3 lg:pr-6 lg:pl-4">
                <a href="/" className="flex items-center" aria-label="Company Logo">
                    <img
                        src={getLogoSrc()}
                        alt="Kristalin Eka Lestari Logo"
                        className="h-8 w-auto object-contain transition-all duration-700 ease-out sm:h-9 md:h-10 lg:h-12 xl:h-14"
                        style={{ filter: getLogoFilter() }}
                    />
                </a>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden flex-1 justify-center lg:flex lg:px-2 xl:px-4">
                <ul
                    className="flex items-center gap-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out lg:gap-2 lg:text-xs xl:gap-3 xl:text-sm 2xl:gap-4"
                    style={{ opacity: textOpacity }}
                >
                    {navigationItems.map((item, index) => (
                        <li key={index} className={item.hasDropdown ? 'group relative' : ''}>
                            {item.hasDropdown ? (
                                <div
                                    className="relative"
                                    ref={aboutDropdownRef}
                                    onMouseEnter={() => {
                                        setAboutDropdownOpen(true);
                                    }}
                                    onMouseLeave={() => {
                                        setAboutDropdownOpen(false);
                                    }}
                                >
                                    <a
                                        href={item.href}
                                        className="flex items-center gap-1 px-2 py-2 transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400 lg:px-3"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {item.label}
                                        <svg
                                            className={`h-3 w-3 transform transition-transform duration-300 ease-out ${aboutDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="currentColor"
                                            viewBox="0 0 12 12"
                                        >
                                            <path d="M6 8L2 4h8l-4 4z" />
                                        </svg>
                                    </a>
                                    {/* Desktop Dropdown Menu with improved positioning */}
                                    <div
                                        className={`absolute top-full left-0 z-50 mt-1 w-64 transform rounded-lg border border-gray-600 bg-gradient-to-b from-[#444] via-[#666] to-[#888] text-white shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out xl:w-72 ${
                                            aboutDropdownOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                                        }`}
                                        onMouseEnter={() => setAboutDropdownOpen(true)}
                                        onMouseLeave={() => setAboutDropdownOpen(false)}
                                    >
                                        <div className="px-4 py-4">
                                            <div className="space-y-1">
                                                {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                                                    <a
                                                        key={dropdownIndex}
                                                        href={dropdownItem.href}
                                                        className="hover:bg-opacity-10 block rounded px-3 py-2.5 text-xs transition-all duration-300 ease-out hover:translate-x-1 hover:scale-105 hover:bg-white hover:text-yellow-300"
                                                    >
                                                        {dropdownItem.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : item.external ? (
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-2 transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400 lg:px-3"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="px-2 py-2 transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400 lg:px-3"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex flex-1 items-center justify-end gap-2 lg:hidden">
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
                className="hidden h-full items-center gap-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out lg:flex xl:gap-2 xl:text-sm"
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
                        {getCurrentLanguageCode()}
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
                                className={`block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${locale === 'id' ? 'text-yellow-600' : 'text-gray-800'}`}
                                onClick={() => {
                                    switchLanguage('id');
                                    setDropdownOpen(false);
                                }}
                                role="option"
                                aria-selected={locale === 'id'}
                            >
                                ID
                            </button>
                            <button
                                className={`block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${locale === 'en' ? 'text-yellow-600' : 'text-gray-800'}`}
                                onClick={() => {
                                    switchLanguage('en');
                                    setDropdownOpen(false);
                                }}
                                role="option"
                                aria-selected={locale === 'en'}
                            >
                                EN
                            </button>
                            <button
                                className={`block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${locale === 'zh' ? 'text-yellow-600' : 'text-gray-800'}`}
                                onClick={() => {
                                    switchLanguage('zh');
                                    setDropdownOpen(false);
                                }}
                                role="option"
                                aria-selected={locale === 'zh'}
                            >
                                ZH
                            </button>
                        </div>
                    )}
                </div>
                {/* Search Icon + Dropdown */}
                <div className="relative" ref={searchRef}>
                    <button
                        type="button"
                        onClick={() => setSearchOpen((o) => !o)}
                        className="flex h-10 items-center justify-center px-2 py-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400 focus:outline-none xl:text-sm"
                        aria-label={t('common.search')}
                    >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </button>

                    {/* Dropdown bar */}
                    <div
                        className={`absolute top-full right-0 mt-2 w-[320px] max-w-[80vw] transform transition-all duration-300 ${
                            searchOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                        }`}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (searchQuery.trim() !== '') {
                                    setIsSearching(true);
                                    router.get('/search', { q: searchQuery.trim() }, { preserveScroll: true });
                                    setTimeout(() => setIsSearching(false), 1000);
                                    setSearchOpen(false);
                                }
                            }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                            <div className="relative flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-2 shadow-xl transition-all duration-300 focus-within:scale-[1.02] focus-within:border-amber-400 hover:border-amber-300">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={`transition-all duration-300 ${
                                        isSearching ? 'animate-spin text-amber-500' : 'text-gray-400 group-focus-within:text-amber-500'
                                    }`}
                                >
                                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={`${t('common.search')}...`}
                                    className="w-full border-none bg-white text-gray-800 outline-none placeholder:text-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg"
                                >
                                    <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-white transition-transform duration-700 group-hover:translate-x-full" />
                                    <span className="relative">{t('common.search')}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Whistleblower / Internal feedback – subtle hint (shield icon) */}
                <Link
                    href="/internal-feedback"
                    className="flex h-10 items-center justify-center px-2 py-1 text-white/70 transition-all duration-300 hover:scale-105 hover:text-yellow-400 hover:opacity-100 focus:outline-none"
                    title={t('pages.internal_feedback.page_title')}
                    aria-label={t('pages.internal_feedback.page_title')}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                </Link>
            </div>

            {/* Mobile Menu - Right Drawer */}
            <>
                {/* Indonesian flag to represent site origin */}
                <div className="ml-2 flex items-center" title="Indonesia">
                    <svg role="img" aria-label="Flag of Indonesia" viewBox="0 0 3 2" className="h-4 w-6 rounded shadow sm:h-5 sm:w-8">
                        <rect width="3" height="1" y="0" fill="#CE1126" />
                        <rect width="3" height="1" y="1" fill="#FFFFFF" />
                    </svg>
                </div>
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 lg:hidden ${
                        mobileMenuOpen ? 'visible opacity-100 backdrop-blur-sm' : 'invisible opacity-0'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Drawer */}
                <div
                    ref={mobileMenuRef}
                    className={`fixed top-0 right-0 bottom-0 z-50 w-80 overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-96 lg:hidden ${
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        overscrollBehavior: 'contain',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {/* Close button inside menu */}
                    <div className="flex items-center justify-between px-4 pt-4 pb-2">
                        <img src={imageUrl('kristalinlogotransisi1.png')} alt="Kristalin Logo" className="h-10 object-contain" />
                        <button
                            className="p-2 text-gray-600 transition-all duration-300 ease-out hover:text-yellow-500"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="min-h-full space-y-4 px-4 py-4">
                        {/* Mobile Language Switcher */}
                        <div className="flex items-center justify-between pb-4">
                            <span className="text-sm font-semibold text-gray-800 uppercase">{t('common.language')}:</span>
                            <div className="flex gap-2">
                                <button
                                    className={`rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${locale === 'id' ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`}
                                    onClick={() => switchLanguage('id')}
                                >
                                    ID
                                </button>
                                <button
                                    className={`rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${locale === 'en' ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`}
                                    onClick={() => switchLanguage('en')}
                                >
                                    EN
                                </button>
                                <button
                                    className={`rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${locale === 'zh' ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`}
                                    onClick={() => switchLanguage('zh')}
                                >
                                    ZH
                                </button>
                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div className="pt-3">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (searchQuery.trim() !== '') {
                                        router.get('/search', { q: searchQuery.trim() }, { preserveScroll: true });
                                        setMobileMenuOpen(false);
                                    }
                                }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-15 blur-[6px] transition-opacity duration-300 group-hover:opacity-25" />
                                <div className="relative flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm transition-all duration-300 focus-within:border-amber-400 hover:border-amber-300">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                        <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={`${t('common.search')}...`}
                                        className="min-w-0 flex-1 border-none bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
                                    />
                                    <button
                                        type="submit"
                                        className="relative inline-flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg min-[380px]:px-5"
                                    >
                                        <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-0 min-[380px]:mr-2">
                                            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        <span className="hidden min-[380px]:inline">{t('common.search')}</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Mobile Navigation Items */}
                        {navigationItems.map((item, index) => (
                            <div key={index} className="mb-2">
                                {item.hasDropdown ? (
                                    <div>
                                        <button
                                            className="group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-semibold text-gray-800 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
                                            onClick={() => setMobileAboutDropdownOpen(!mobileAboutDropdownOpen)}
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-3 h-2 w-2 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                                <span>{item.label}</span>
                                            </div>
                                            <svg
                                                className={`h-5 w-5 transition-transform duration-300 ${mobileAboutDropdownOpen ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div
                                            className={`mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                                                mobileAboutDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                                                <a
                                                    key={dropdownIndex}
                                                    href={dropdownItem.href}
                                                    className="group ml-6 block rounded-lg px-4 py-2 text-sm text-gray-600 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="mr-3 h-2 w-2 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                                        <span>{dropdownItem.label}</span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ) : item.external ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block rounded-lg px-4 py-3 text-base font-semibold text-gray-800 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                            <span>{item.label}</span>
                                        </div>
                                    </a>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="group block rounded-lg px-4 py-3 text-base font-semibold text-gray-800 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center">
                                            <div className="mr-3 h-2 w-2 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                            <span>{item.label}</span>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </header>
    );
}

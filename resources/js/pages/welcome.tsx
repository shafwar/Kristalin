import { useTranslation } from '@/hooks/useTranslation';
import { imageUrl } from '@/lib/assets';
import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SplashScreen } from '../components/SplashScreen';

/**
 * INTERNAL FEEDBACK SYSTEM - TEMPORARILY DISABLED
 *
 * Components backed up to: resources/js/components/InternalFeedbackModal.BACKUP.tsx
 * To re-enable: Import from backup file
 *
 * Removed components:
 * - InternalFeedbackModal (line 8-526)
 * - FloatingFeedbackButton (line 528-571)
 */

// Main Welcome Component
const Welcome = () => {
    const { t } = useTranslation();
    // const [showFeedbackForm, setShowFeedbackForm] = useState(false); // DISABLED - Feedback system
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [currentContent, setCurrentContent] = useState(0);
    const [currentNews, setCurrentNews] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));

    // 5 berita relevan dari news archive dengan December Rice Mill sebagai highlight utama
    // Menggunakan translation keys untuk konsistensi bahasa
    const newsItems = [
        {
            id: 'dec-3',
            date: '10 Dec 2025',
            title: t('pages.welcome.news.items.dec-3.title'),
            excerpt: t('pages.welcome.news.items.dec-3.excerpt'),
            image: imageUrl('metronews_desember.jpeg'),
            url: '/news/dec-3',
            priority: 'high',
        },
        {
            id: 'sept-1',
            date: '1 Sep 2025',
            title: t('pages.welcome.news.items.sept-1.title'),
            excerpt: t('pages.welcome.news.items.sept-1.excerpt'),
            image: imageUrl('sept1.jpg'),
            url: '/news/sept-1',
            priority: 'high',
        },
        {
            id: 'jul-1',
            date: '15 Jul 2025',
            title: t('pages.welcome.news.items.jul-1.title'),
            excerpt: t('pages.welcome.news.items.jul-1.excerpt'),
            image: imageUrl('sembako.jpg'),
            url: '/news/jul-1',
            priority: 'medium',
        },
        {
            id: 'aug-2',
            date: '19 Aug 2025',
            title: t('pages.welcome.news.items.aug-2.title'),
            excerpt: t('pages.welcome.news.items.aug-2.excerpt'),
            image: imageUrl('agus2.jpg'),
            url: '/news/aug-2',
            priority: 'medium',
        },
        {
            id: 'feb-4',
            date: '3 Feb 2025',
            title: t('pages.welcome.news.items.feb-4.title'),
            excerpt: t('pages.welcome.news.items.feb-4.excerpt'),
            image: imageUrl('buruharian2.webp'),
            url: '/news/feb-4',
            priority: 'medium',
        },
    ];

    // Carousel slides untuk Portfolio & Board of Directors
    const carouselSlides = [
        {
            id: 1,
            image: imageUrl('directorshero.jpg'),
            category: t('pages.welcome.board.category'),
            title: t('pages.welcome.board.title'),
            link: '/board-of-directors',
        },
        {
            id: 0,
            image: imageUrl('portofolio.jpg'),
            category: t('pages.welcome.portfolio.category'),
            title: t('pages.welcome.portfolio.title'),
            link: '/line-of-business',
        },
    ];

    // Auto-rotation untuk carousel (lebih lambat & stabil)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 14000); // 14 detik untuk transisi lebih tenang
        return () => clearInterval(interval);
    }, [carouselSlides.length]);

    // Auto-rotation untuk berita setiap 8 detik agar orang bisa membaca dengan nyaman
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNews((prev) => (prev + 1) % newsItems.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    const contentSets = [
        {
            title1: t('pages.welcome.content_set_1.title1'),
            title2: t('pages.welcome.content_set_1.title2'),
            subtitle: t('pages.welcome.content_set_1.subtitle'),
            titleColors: 'text-white',
            title2Colors: 'text-white',
        },
        {
            title1: t('pages.welcome.content_set_2.title1'),
            title2: t('pages.welcome.content_set_2.title2'),
            subtitle: t('pages.welcome.content_set_2.subtitle'),
            titleColors: 'text-white',
            title2Colors: 'text-white',
        },
    ];

    // Loading screen effect - show on first visit or page reload
    useEffect(() => {
        const isReload = !sessionStorage.getItem('kristalin_session');
        if (isReload) {
            // SplashScreen will handle duration; session flag set on onDone
            return;
        }
        setShowLoadingScreen(false);
    }, []);

    // Detect mobile viewport once on mount and on resize (used to simplify animations on mobile)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Content rotation - Slower rotation for better UX
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Start with "Introducing" and give it more time
        const initialDelay = setTimeout(() => {
            setCurrentContent(0); // Start with "Introducing"
        }, 1200); // Wait a bit longer after loading for stability

        // Rotate content with a longer, more stable cadence
        const interval = setInterval(() => {
            setCurrentContent((prev) => (prev + 1) % contentSets.length);
        }, 14000); // 14 seconds for smoother, longer reads

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, [contentSets.length]);

    // Main Content
    return (
        <>
            <Head title="Home" />
            <div className="welcome-page relative flex min-h-screen flex-col overflow-x-hidden bg-white">
                {/* Splash Screen */}
                {showLoadingScreen && (
                    <SplashScreen
                        minDurationMs={4200}
                        fadeDurationMs={900}
                        title="Kristalin Ekalestari"
                        subtitle="Gold Mining Excellence"
                        onDone={() => {
                            sessionStorage.setItem('kristalin_session', 'true');
                            setShowLoadingScreen(false);
                        }}
                    />
                )}

                {/* Header - Hidden during loading */}
                <AnimatePresence>
                    {!showLoadingScreen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                        >
                            <Header sticky={true} transparent={false} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-1 flex-col overflow-hidden pt-16 sm:pt-20">
                    {/* Main Content with Elegant Fade In */}
                    <AnimatePresence>
                        {!showLoadingScreen && (
                            <motion.div
                                className="flex flex-1 flex-col"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                            >
                                {/* DISABLED - Feedback Form Modal */}
                                {/* {showFeedbackForm && <InternalFeedbackModal onClose={() => setShowFeedbackForm(false)} />} */}

                                {/* DISABLED - Floating Feedback Button */}
                                {/* <FloatingFeedbackButton onClick={() => setShowFeedbackForm(true)} /> */}

                                {/* Hero Section - top half of viewport on desktop */}
                                <section className="flex h-auto flex-col lg:h-[48vh] lg:flex-row">
                                    {/* Left Section - Background putih bersih tanpa elemen dekoratif */}
                                    <div className="relative flex h-full w-full flex-col justify-center bg-white p-6 sm:p-8 lg:w-1/2 lg:p-16">
                                        <div
                                            className={`relative z-10 transition-all duration-1000 ${
                                                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                            }`}
                                        >
                                            {/* Hero Text - desktop animated, mobile simplified to avoid flicker */}
                                            <div className="relative">
                                                {isMobile ? (
                                                    <>
                                                        <h1 className="mb-6 text-center text-2xl leading-tight font-bold sm:text-center sm:text-3xl lg:text-left lg:text-4xl xl:text-5xl">
                                                            <div className="inline-block text-gray-800">{contentSets[currentContent].title1}</div>
                                                            <br />
                                                            <span
                                                                className="inline-block"
                                                                style={{
                                                                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent',
                                                                    backgroundClip: 'text',
                                                                }}
                                                            >
                                                                {contentSets[currentContent].title2}
                                                            </span>
                                                        </h1>
                                                        <p className="mb-6 text-center text-sm text-gray-600 sm:text-center sm:text-base lg:text-left lg:text-lg">
                                                            {contentSets[currentContent].subtitle}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <AnimatePresence mode="wait">
                                                            <motion.div
                                                                key={currentContent}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{
                                                                    duration: 1.05,
                                                                    ease: [0.16, 1, 0.3, 1],
                                                                }}
                                                                style={{
                                                                    transform: 'translate3d(0, 0, 0)',
                                                                    willChange: 'opacity',
                                                                    backfaceVisibility: 'hidden',
                                                                    WebkitBackfaceVisibility: 'hidden',
                                                                }}
                                                            >
                                                                <h1 className="mb-6 text-center text-2xl leading-tight font-bold sm:text-center sm:text-3xl lg:text-left lg:text-4xl xl:text-5xl">
                                                                    {/* Title 1 - Smooth letter cascade */}
                                                                    <div className="inline-block text-gray-800">
                                                                        {contentSets[currentContent].title1
                                                                            .split('')
                                                                            .map((letter: string, index: number) => (
                                                                                <motion.span
                                                                                    key={`${currentContent}-${index}`}
                                                                                    initial={{
                                                                                        opacity: 0,
                                                                                        y: 8,
                                                                                    }}
                                                                                    animate={{
                                                                                        opacity: 1,
                                                                                        y: 0,
                                                                                    }}
                                                                                    exit={{
                                                                                        opacity: 0,
                                                                                    }}
                                                                                    transition={{
                                                                                        duration: 1.05,
                                                                                        ease: [0.16, 1, 0.3, 1],
                                                                                        delay: index * 0.035,
                                                                                    }}
                                                                                    className="inline-block"
                                                                                    style={{
                                                                                        transform: 'translate3d(0, 0, 0)',
                                                                                        willChange: 'opacity',
                                                                                        backfaceVisibility: 'hidden',
                                                                                        WebkitBackfaceVisibility: 'hidden',
                                                                                    }}
                                                                                >
                                                                                    {letter === ' ' ? '\u00A0' : letter}
                                                                                </motion.span>
                                                                            ))}
                                                                    </div>
                                                                    <br />
                                                                    {/* Title 2 - Gold gradient */}
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0 }}
                                                                        transition={{
                                                                            duration: 1.2,
                                                                            ease: [0.16, 1, 0.3, 1],
                                                                            delay: 0.45,
                                                                        }}
                                                                        className="inline-block"
                                                                        style={{
                                                                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                                                            WebkitBackgroundClip: 'text',
                                                                            WebkitTextFillColor: 'transparent',
                                                                            backgroundClip: 'text',
                                                                            transform: 'translate3d(0, 0, 0)',
                                                                            willChange: 'opacity',
                                                                            backfaceVisibility: 'hidden',
                                                                            WebkitBackfaceVisibility: 'hidden',
                                                                        }}
                                                                    >
                                                                        {contentSets[currentContent].title2}
                                                                    </motion.div>
                                                                </h1>
                                                            </motion.div>
                                                        </AnimatePresence>

                                                        {/* Subtitle - smooth fade on desktop */}
                                                        <div className="relative">
                                                            <AnimatePresence mode="wait">
                                                                <motion.p
                                                                    key={`subtitle-${currentContent}`}
                                                                    initial={{ opacity: 0, y: 8 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0 }}
                                                                    transition={{
                                                                        duration: 1.05,
                                                                        ease: [0.16, 1, 0.3, 1],
                                                                        delay: 0.65,
                                                                    }}
                                                                    className="mb-6 text-center text-sm text-gray-600 sm:text-center sm:text-base lg:text-left lg:text-lg"
                                                                    style={{
                                                                        transform: 'translate3d(0, 0, 0)',
                                                                        willChange: 'opacity',
                                                                        backfaceVisibility: 'hidden',
                                                                        WebkitBackfaceVisibility: 'hidden',
                                                                    }}
                                                                >
                                                                    {contentSets[currentContent].subtitle}
                                                                </motion.p>
                                                            </AnimatePresence>
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Buttons - responsive alignment */}
                                            <div className="mt-6 w-full">
                                                <div className="button-container flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-4 md:flex-row md:justify-center md:gap-4 lg:flex-row lg:justify-start lg:gap-4">
                                                    <button
                                                        className="flex h-12 w-full max-w-[280px] cursor-pointer items-center justify-center rounded-xl border-none bg-gradient-to-r from-yellow-400 to-amber-500 px-7 py-3.5 text-base font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-500 hover:to-orange-500 hover:shadow-xl sm:w-auto sm:min-w-[180px] md:w-auto md:min-w-[180px] lg:w-auto lg:min-w-[180px]"
                                                        onClick={() => (window.location.href = '/about#about-kristalin')}
                                                    >
                                                        {t('pages.welcome.buttons.learn_more')}
                                                    </button>

                                                    <button
                                                        className="relative flex h-12 w-full max-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-yellow-400 bg-transparent px-7 py-3.5 text-base font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-amber-500 hover:text-gray-900 hover:shadow-lg sm:w-auto sm:min-w-[180px] md:w-auto md:min-w-[180px] lg:w-auto lg:min-w-[180px]"
                                                        onClick={() => (window.location.href = '/milestones')}
                                                    >
                                                        {t('pages.welcome.buttons.see_milestones')}
                                                    </button>

                                                    {/* Instagram Link - Elegant and Integrated */}
                                                    <motion.a
                                                        href="https://www.instagram.com/kristalin_ekalestari/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex h-12 w-full max-w-[280px] cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 hover:shadow-xl sm:w-auto sm:min-w-[180px] md:w-auto md:min-w-[180px] lg:w-auto lg:min-w-[180px]"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                        </svg>
                                                        <span className="hidden sm:inline">{t('common.follow_us')}</span>
                                                        <span className="sm:hidden">Instagram</span>
                                                    </motion.a>
                                                </div>
                                            </div>

                                            {/* Konten tanpa elemen dekoratif */}
                                            <div className="relative"></div>
                                        </div>
                                    </div>

                                    {/* Right Section - CSR Card dengan gambar papua-children.png */}
                                    <Link
                                        href="/csr"
                                        className="relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-full lg:w-1/2 lg:p-12"
                                        onMouseEnter={() => setHoveredCard(4)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        {/* Background Image - Mobile optimized with proper aspect */}
                                        <img
                                            src={imageUrl('papua-children.png')}
                                            alt="CSR Impact in Papua"
                                            className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-300 will-change-auto lg:duration-500 ${
                                                hoveredCard === 4 ? 'lg:scale-105' : 'scale-100'
                                            }`}
                                            style={{
                                                objectPosition: 'center center',
                                                transform: 'translateZ(0)',
                                                backfaceVisibility: 'hidden',
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                            loading="lazy"
                                            decoding="async"
                                        />

                                        {/* Dark overlay - Static, stronger gradient */}
                                        <div className="absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                        <div className="relative z-10">
                                            <div className="mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm">
                                                {t('pages.welcome.csr.category')}
                                            </div>
                                            <h3
                                                className={`mb-4 text-2xl leading-tight font-bold transition-transform duration-200 sm:text-3xl lg:text-4xl ${
                                                    hoveredCard === 4 ? 'lg:translate-x-2' : 'translate-x-0'
                                                }`}
                                            >
                                                {t('pages.welcome.csr.title')}
                                            </h3>
                                            <span
                                                className={`text-base font-medium underline transition-colors duration-200 ${
                                                    hoveredCard === 4 ? 'text-yellow-400' : 'text-white'
                                                }`}
                                            >
                                                {t('pages.welcome.buttons.discover_more')}
                                            </span>
                                        </div>
                                    </Link>
                                </section>

                                {/* Bottom Grid - fills remaining height and touches footer on desktop */}
                                <section className="flex flex-1 flex-col bg-white lg:flex-row">
                                    {/* Carousel Card - Mobile Anti-Flicker Optimized */}
                                    <div className="relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-black sm:aspect-[16/9] lg:aspect-auto lg:h-auto lg:w-1/2 lg:flex-1">
                                        {isMobile ? (
                                            // Mobile: no framer-motion to avoid flicker, still updates with currentSlide
                                            <div
                                                className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8"
                                                onClick={() => (window.location.href = carouselSlides[currentSlide].link)}
                                            >
                                                <div className="absolute inset-0 h-full w-full">
                                                    <img
                                                        src={carouselSlides[currentSlide].image}
                                                        alt={carouselSlides[currentSlide].title}
                                                        className="h-full w-full object-cover"
                                                        style={{
                                                            objectPosition: 'center center',
                                                            transform: 'translate3d(0, 0, 0)',
                                                            backfaceVisibility: 'hidden',
                                                            WebkitBackfaceVisibility: 'hidden',
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                </div>

                                                <div className="pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                                <div className="relative z-10">
                                                    <div className="mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm">
                                                        {carouselSlides[currentSlide].category}
                                                    </div>
                                                    <h3 className="mb-4 text-xl font-bold sm:text-2xl lg:text-3xl">
                                                        {carouselSlides[currentSlide].title}
                                                    </h3>
                                                </div>
                                            </div>
                                        ) : (
                                            <AnimatePresence initial={false}>
                                                <motion.div
                                                    key={currentSlide}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        duration: 1.05,
                                                        ease: [0.16, 1, 0.3, 1],
                                                    }}
                                                    className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8"
                                                    style={{
                                                        transform: 'translate3d(0, 0, 0)',
                                                        willChange: 'opacity',
                                                        backfaceVisibility: 'hidden',
                                                        WebkitBackfaceVisibility: 'hidden',
                                                    }}
                                                    onMouseEnter={() => setHoveredCard(0)}
                                                    onMouseLeave={() => setHoveredCard(null)}
                                                    onClick={() => (window.location.href = carouselSlides[currentSlide].link)}
                                                >
                                                    {/* Image - Pure opacity crossfade for smoothness */}
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{
                                                            duration: 1.05,
                                                            ease: [0.16, 1, 0.3, 1],
                                                        }}
                                                        className="absolute inset-0 h-full w-full"
                                                        style={{
                                                            transform: 'translate3d(0, 0, 0)',
                                                            willChange: 'opacity',
                                                        }}
                                                    >
                                                        <img
                                                            src={carouselSlides[currentSlide].image}
                                                            alt={carouselSlides[currentSlide].title}
                                                            className="h-full w-full object-cover"
                                                            style={{
                                                                objectPosition: 'center center',
                                                                transform: 'translate3d(0, 0, 0)',
                                                                backfaceVisibility: 'hidden',
                                                                WebkitBackfaceVisibility: 'hidden',
                                                                imageRendering: '-webkit-optimize-contrast',
                                                            }}
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                            }}
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    </motion.div>

                                                    {/* Overlay - Static (no animation) for stability */}
                                                    <div className="pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                                    {/* Text - Simple fade after image settled */}
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{
                                                            duration: 1.0,
                                                            delay: 0.35,
                                                            ease: [0.16, 1, 0.3, 1],
                                                        }}
                                                        className="relative z-10"
                                                        style={{
                                                            transform: 'translate3d(0, 0, 0)',
                                                            willChange: 'opacity',
                                                        }}
                                                    >
                                                        <div className="mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm">
                                                            {carouselSlides[currentSlide].category}
                                                        </div>
                                                        <h3
                                                            className={`mb-4 text-xl font-bold transition-transform duration-300 sm:text-2xl lg:text-3xl ${
                                                                hoveredCard === 0 ? 'lg:translate-x-2' : 'translate-x-0'
                                                            }`}
                                                        >
                                                            {carouselSlides[currentSlide].title}
                                                        </h3>
                                                    </motion.div>
                                                </motion.div>
                                            </AnimatePresence>
                                        )}

                                        {/* Indicator Dots */}
                                        <div className="absolute bottom-6 left-6 z-20 flex gap-2 sm:bottom-8 sm:left-8 lg:bottom-8 lg:left-8">
                                            {carouselSlides.map((slide, idx) => (
                                                <button
                                                    key={slide.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentSlide(idx);
                                                    }}
                                                    className={`rounded-full transition-all duration-200 ${
                                                        idx === currentSlide ? 'h-2.5 w-8 bg-yellow-400' : 'h-2.5 w-2.5 bg-white/50 hover:bg-white/80'
                                                    }`}
                                                    aria-label={`Go to slide ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Business Activities Card - 25% width, gambar asli tanpa overlay warna */}
                                    <Link
                                        href="/business-activity"
                                        className="relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8"
                                        onMouseEnter={() => setHoveredCard(1)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        {/* Background Image - Mobile optimized with proper aspect */}
                                        <img
                                            src={imageUrl('businessactivity.jpg')}
                                            alt={t('pages.welcome.business_activities_alt')}
                                            className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-300 will-change-auto lg:duration-500 ${
                                                hoveredCard === 1 ? 'lg:scale-105' : 'scale-100'
                                            }`}
                                            style={{
                                                objectPosition: 'center center',
                                                transform: 'translateZ(0)',
                                                backfaceVisibility: 'hidden',
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                            loading="eager"
                                        />

                                        {/* Dark overlay - Static, stronger gradient */}
                                        <div className="absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                        <div className="relative z-10">
                                            <h3
                                                className={`mb-4 text-lg leading-tight font-bold transition-transform duration-200 sm:text-xl lg:text-2xl ${
                                                    hoveredCard === 1 ? 'lg:translate-x-2' : 'translate-x-0'
                                                }`}
                                            >
                                                {t('pages.welcome.business_activities.title')}
                                            </h3>
                                            <span
                                                className={`text-sm font-medium underline transition-colors duration-200 ${
                                                    hoveredCard === 1 ? 'text-yellow-400' : 'text-white'
                                                }`}
                                            >
                                                {t('pages.welcome.business_activities.find_out_more')}
                                            </span>
                                        </div>
                                    </Link>

                                    {/* News Card - 25% width, warna emas konsisten dengan link ke berita spesifik */}
                                    <Link
                                        id="news-update"
                                        data-news-section="true"
                                        href={newsItems[currentNews].url}
                                        className="relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-between overflow-hidden bg-yellow-400 p-6 no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8"
                                        onMouseEnter={() => setHoveredCard(2)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        {/* Background Image - Mobile optimized with proper aspect */}
                                        <div
                                            className={`absolute top-0 right-0 bottom-0 left-0 overflow-hidden transition-all duration-400 ease-out lg:duration-600 ${
                                                hoveredCard === 2 ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                                            }`}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentNews}
                                                    className="h-full w-full"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        duration: 0.9,
                                                        ease: [0.16, 1, 0.3, 1],
                                                    }}
                                                    style={{ transform: 'translateZ(0)' }}
                                                >
                                                    <img
                                                        src={newsItems[currentNews].image}
                                                        alt={newsItems[currentNews].title}
                                                        className="h-full w-full object-cover"
                                                        style={{
                                                            objectPosition: 'center center',
                                                            transform: 'translateZ(0)',
                                                            backfaceVisibility: 'hidden',
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                        loading="eager"
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                            {/* Dark overlay - Static, stronger gradient */}
                                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                        </div>

                                        {/* Top Section - Header */}
                                        <div className="relative z-10 mb-4">
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className={`text-xl font-bold transition-all duration-300 sm:text-2xl lg:text-3xl ${
                                                        hoveredCard === 2 ? 'text-white lg:scale-110' : 'scale-100 text-gray-800'
                                                    }`}
                                                >
                                                    <a
                                                        href="/news"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                        className={`${hoveredCard === 2 ? 'text-white hover:text-yellow-200' : 'text-gray-800 hover:text-yellow-700'} underline-offset-4 hover:underline`}
                                                    >
                                                        {t('pages.welcome.news.title_short')}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {/* Navigation Arrows */}
                                                    {newsItems.length > 1 && (
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
                                                                }}
                                                                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${
                                                                    hoveredCard === 2
                                                                        ? 'text-white hover:bg-white/20'
                                                                        : 'text-gray-700 hover:bg-gray-200'
                                                                }`}
                                                            >
                                                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M15 19l-7-7 7-7"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setCurrentNews((prev) => (prev + 1) % newsItems.length);
                                                                }}
                                                                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${
                                                                    hoveredCard === 2
                                                                        ? 'text-white hover:bg-white/20'
                                                                        : 'text-gray-700 hover:bg-gray-200'
                                                                }`}
                                                            >
                                                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M9 5l7 7-7 7"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Priority Indicator untuk berita penting */}
                                                    {newsItems[currentNews].priority === 'high' && (
                                                        <div
                                                            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 ${
                                                                hoveredCard === 2 ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
                                                            }`}
                                                        >
                                                            <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                                                            <span>{t('pages.welcome.news.highlight_badge')}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Middle Section - Content dengan berita Kristalin */}
                                        <div className="relative z-10 flex flex-1 flex-col justify-center">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentNews}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        ease: 'easeInOut',
                                                    }}
                                                    className="mb-4"
                                                >
                                                    {newsItems.length > 0 ? (
                                                        <>
                                                            {/* Date dengan icon */}
                                                            <div className="mb-3 flex items-center gap-2">
                                                                <div
                                                                    className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                                                                        hoveredCard === 2 ? 'bg-white' : 'bg-gray-500'
                                                                    }`}
                                                                ></div>
                                                                <div
                                                                    className={`text-xs font-medium transition-colors duration-300 ${
                                                                        hoveredCard === 2 ? 'text-gray-200' : 'text-gray-600'
                                                                    }`}
                                                                >
                                                                    {newsItems[currentNews].date}
                                                                </div>
                                                            </div>

                                                            {/* Title dengan line clamp */}
                                                            <div
                                                                className={`mb-3 line-clamp-2 text-sm leading-tight font-bold transition-colors duration-300 sm:text-base lg:text-lg ${
                                                                    hoveredCard === 2 ? 'text-white' : 'text-gray-800'
                                                                }`}
                                                            >
                                                                {newsItems[currentNews].title}
                                                            </div>

                                                            {/* Description dengan line clamp yang lebih jelas */}
                                                            <div
                                                                className={`line-clamp-3 text-xs leading-relaxed transition-colors duration-300 sm:text-sm ${
                                                                    hoveredCard === 2 ? 'text-gray-100' : 'text-gray-700'
                                                                }`}
                                                            >
                                                                {newsItems[currentNews].excerpt}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-center">
                                                            <div className="mb-2 text-4xl">📰</div>
                                                            <p
                                                                className={`text-sm font-medium transition-colors duration-300 ${
                                                                    hoveredCard === 2 ? 'text-white' : 'text-gray-800'
                                                                }`}
                                                            >
                                                                {t('pages.welcome.news.no_news_available')}
                                                            </p>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        {/* Bottom Section - View button dan dots indicator */}
                                        <div className="relative z-10">
                                            {/* View button */}
                                            <div
                                                className={`mb-3 flex items-center justify-between transition-colors duration-300 ${
                                                    hoveredCard === 2 ? 'border-white/20' : 'border-black/10'
                                                }`}
                                            >
                                                <div
                                                    className={`flex items-center text-sm font-semibold transition-all duration-300 sm:text-base ${
                                                        hoveredCard === 2 ? 'text-white' : 'text-gray-800'
                                                    }`}
                                                >
                                                    <span>{t('pages.welcome.news.view_button')}</span>
                                                    <div
                                                        className={`ml-2 transition-transform duration-300 ${hoveredCard === 2 ? 'translate-x-1' : 'translate-x-0'}`}
                                                    >
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dots indicator */}
                                            <div className="flex justify-center gap-1.5">
                                                {newsItems.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setCurrentNews(index);
                                                        }}
                                                        className={`transition-all duration-300 ${
                                                            index === currentNews
                                                                ? `h-1.5 w-6 rounded-full ${hoveredCard === 2 ? 'bg-white' : 'bg-gray-800'}`
                                                                : `h-1.5 w-1.5 rounded-full ${
                                                                      hoveredCard === 2
                                                                          ? 'bg-white/40 hover:bg-white/60'
                                                                          : 'bg-gray-400 hover:bg-gray-600'
                                                                  }`
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </section>

                                {/* Footer moved outside animated block */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!showLoadingScreen && <Footer />}

                {/* Premium Staggered Animation Styles */}
                <style
                    dangerouslySetInnerHTML={{
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

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
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

          /* Custom scrollbar styling */
          .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          /* Enhanced input focus states */
          input:focus, select:focus, textarea:focus {
            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
          }

          /* File upload hover effects */
          .border-dashed:hover {
            border-color: #f59e0b;
            background-color: #fef3c7;
          }

          /* Button hover effects */
          button:hover {
            transform: translateY(-1px);
          }

          button:active {
            transform: translateY(0);
          }

          /* Tab animation */
          .border-b-3 {
            border-bottom-width: 3px;
          }

          /* Modal backdrop */
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }

          /* Mobile responsive improvements */
          @media (max-width: 640px) {
            .line-clamp-2 {
              -webkit-line-clamp: 2;
            }

            .line-clamp-3 {
              -webkit-line-clamp: 2;
            }
          }

          /* Additional responsive utilities */
          @media (max-width: 1024px) {
            .lg\\:h-\\[400px\\] {
              height: auto;
              min-height: 400px;
            }

            .lg\\:h-\\[300px\\] {
              height: auto;
              min-height: 300px;
            }
          }

          @media (max-width: 768px) {
            .md\\:h-\\[350px\\] {
              height: auto;
              min-height: 350px;
            }

            .md\\:h-\\[250px\\] {
              height: auto;
              min-height: 250px;
            }
          }

          /* Responsive section heights */
          @media (max-width: 1023px) {
            section {
              height: auto !important;
            }

            section > div {
              min-height: 300px;
            }
          }

          /* Custom responsive button layout - Desktop left, mobile center */
          @media (max-width: 639px) {
            /* Mobile phones - buttons stacked vertically, centered */
            .button-container {
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }

          @media (min-width: 640px) and (max-width: 1023px) {
            /* Tablets (iPad, iPad Air, etc.) - buttons horizontal, centered */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 1rem !important;
            }
          }

          @media (min-width: 1024px) {
            /* Desktop - buttons horizontal, left-aligned */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: flex-start !important;
              gap: 1rem !important;
            }
          }

          /* Responsive button alignment */
          .button-container {
            align-items: center !important;
          }

          @media (min-width: 1024px) {
            .button-container {
              justify-content: flex-start !important;
            }
          }

          @media (max-width: 640px) {
            section > div {
              min-height: 250px;
            }

            .text-2xl {
              font-size: 1.75rem;
            }

            .text-3xl {
              font-size: 2rem;
            }

            .text-4xl {
              font-size: 2.25rem;
            }
          }

          /* Smooth transitions for all interactive elements */
          * {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }

          /* Enhanced hover states for cards */
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          /* Image optimization for different screen sizes */
          img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }

          /* Typography responsive scaling */
          @media (max-width: 480px) {
            h1 {
              line-height: 1.1;
            }

            h2, h3 {
              line-height: 1.2;
            }

            p {
              line-height: 1.5;
            }
          }

          /* Loading states */
          .loading {
            opacity: 0.7;
            pointer-events: none;
          }

          /* Focus states for accessibility */
          *:focus {
            outline: 2px solid #fbbf24;
            outline-offset: 2px;
          }

          /* Print styles */
          @media print {
            .no-print {
              display: none !important;
            }

            * {
              color: black !important;
              background: white !important;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .text-gray-600 {
              color: #000000 !important;
            }

            .text-gray-800 {
              color: #000000 !important;
            }

            .bg-yellow-400 {
              background-color: #000000 !important;
              color: #ffffff !important;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* Dark mode support (if needed in future) */
          @media (prefers-color-scheme: dark) {
            .dark-mode-ready {
              background-color: #1f2937;
              color: #f9fafb;
            }
          }

          /* Performance optimizations */
          .will-change-transform {
            will-change: transform;
          }

          .will-change-opacity {
            will-change: opacity;
          }

          /* GPU acceleration for smooth animations */
          .gpu-accelerated {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
          }

          /* Perspective utilities for 3D effects */
          .perspective-1000 {
            perspective: 1000px;
          }

          .perspective-500 {
            perspective: 500px;
          }

          /* Enhanced drop shadow for premium feel */
          .drop-shadow-premium {
            filter: drop-shadow(0 25px 50px rgba(251, 191, 36, 0.2));
          }

          /* Smooth blur transitions */
          .blur-transition {
            transition: filter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Shift floating feedback button when mobile menu is open */
          .floating-feedback-button { transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          body.mobile-menu-open .floating-feedback-button { right: 21rem !important; }
          @media (min-width: 640px) { /* match drawer sm:w-96 */
            body.mobile-menu-open .floating-feedback-button { right: 25rem !important; }
          }

          /* Floating animation keyframes */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          /* Instagram Link Responsive Styles */
          @media (max-width: 640px) {
            .instagram-link {
              padding: 0.75rem !important;
              gap: 0.5rem !important;
            }

            .instagram-link .icon-container {
              width: 2.5rem !important;
              height: 2.5rem !important;
            }

            .instagram-link .icon-container svg {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }

            .instagram-link .text-content span:first-child {
              font-size: 0.75rem !important;
            }

            .instagram-link .text-content span:last-child {
              font-size: 0.625rem !important;
            }
          }

          @media (min-width: 641px) and (max-width: 1024px) {
            .instagram-link {
              padding: 1rem !important;
              gap: 0.75rem !important;
            }
          }

          /* Instagram Link Hover Effects */
          .instagram-link {
            position: relative;
            overflow: hidden;
          }

          .instagram-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .instagram-link:hover::before {
            left: 100%;
          }

          /* Instagram Icon Pulse Animation */


          /* Particle animation keyframes */
          @keyframes particle-float {
            0% {
              transform: translateY(0px) scale(0);
              opacity: 0;
            }
            50% {
              transform: translateY(-20px) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-40px) scale(0);
              opacity: 0;
            }
          }

          .animate-particle {
            animation: particle-float 4s ease-in-out infinite;
          }

          /* Gradient text animation */
          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient-text {
            animation: gradient-shift 3s ease infinite;
          }

          /* Enhanced logo rotation */
          @keyframes logo-float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-5px) rotate(180deg);
            }
          }

          .animate-logo-float {
            animation: logo-float 8s ease-in-out infinite;
          }

          /* Premium glow animation */
          @keyframes premium-glow {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }

          .animate-premium-glow {
            animation: premium-glow 4s ease-in-out infinite;
          }

          /* Loading bar animation */
          @keyframes loading-pulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }

          .animate-loading-pulse {
            animation: loading-pulse 2s ease-in-out infinite;
          }
        `,
                    }}
                />
            </div>
        </>
    );
};

export default Welcome;

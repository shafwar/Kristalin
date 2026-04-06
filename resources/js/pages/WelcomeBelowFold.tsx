import { useTranslation } from '@/hooks/useTranslation';
import { imageUrl } from '@/lib/assets';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { welcomeBelowFoldCss } from './welcomeBelowFoldCss';

export default function WelcomeBelowFold() {
    const { t } = useTranslation();

    const newsItems = [
        {
            id: 'feb26-1',
            date: '10 Feb 2026',
            title: t('pages.welcome.news.items.feb26-1.title'),
            excerpt: t('pages.welcome.news.items.feb26-1.excerpt'),
            image: imageUrl('/february-news-01.jpg'),
            url: '/news/feb26-1',
            priority: 'high',
        },
        {
            id: 'feb26-2',
            date: '4 Feb 2026',
            title: t('pages.welcome.news.items.feb26-2.title'),
            excerpt: t('pages.welcome.news.items.feb26-2.excerpt'),
            image: imageUrl('/News-february-2.jpg'),
            url: '/news/feb26-2',
            priority: 'high',
        },
        {
            id: 'feb26-3',
            date: '22 Feb 2026',
            title: t('pages.welcome.news.items.feb26-3.title'),
            excerpt: t('pages.welcome.news.items.feb26-3.excerpt'),
            image: imageUrl('/news-3-february.jpg'),
            url: '/news/feb26-3',
            priority: 'high',
        },
        {
            id: 'feb26-4',
            date: '24 Feb 2026',
            title: t('pages.welcome.news.items.feb26-4.title'),
            excerpt: t('pages.welcome.news.items.feb26-4.excerpt'),
            image: imageUrl('/news-4-february.jpg'),
            url: '/news/feb26-4',
            priority: 'high',
        },
        {
            id: 'mar26-1',
            date: '6 Mar 2026',
            title: t('pages.welcome.news.items.mar26-1.title'),
            excerpt: t('pages.welcome.news.items.mar26-1.excerpt'),
            image: imageUrl('/maret-news-1.jpeg'),
            url: '/news/mar26-1',
            priority: 'high',
        },
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

    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentNews, setCurrentNews] = useState(0);
    const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 14000);
        return () => clearInterval(interval);
    }, [carouselSlides.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNews((prev) => (prev + 1) % newsItems.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [newsItems.length]);

    return (
        <>
            {/* Bottom Grid - fills remaining height and touches footer on desktop */}
            <section className="welcome-below-fold flex flex-1 flex-col bg-white lg:flex-row">
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
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="low"
                                />
                            </div>

                            <div className="pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="relative z-10">
                                <div className="mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm">
                                    {carouselSlides[currentSlide].category}
                                </div>
                                <h3 className="mb-4 text-xl font-bold sm:text-2xl lg:text-3xl">{carouselSlides[currentSlide].title}</h3>
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
                                        loading="eager"
                                        decoding="async"
                                        fetchPriority="low"
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
                                        const target = e.currentTarget as HTMLImageElement;
                                        const tried = parseInt(target.dataset.fallbackTried || '0', 10);
                                        try {
                                            const u = new URL(target.src);
                                            let pathPart = u.pathname.replace(/^\//, '');
                                            if (pathPart.startsWith('public/')) pathPart = pathPart.slice(7);
                                            if (pathPart.startsWith('images/')) pathPart = pathPart.slice(7);
                                            const filename = pathPart.replace(/^kristalin-assets\/public\//, '');
                                            if (tried === 0) {
                                                target.dataset.fallbackTried = '1';
                                                target.src = `${window.location.origin}/images/${filename}`;
                                            } else if (tried === 1) {
                                                target.dataset.fallbackTried = '2';
                                                target.src = `${window.location.origin}/kristalin-assets/public/${filename}`;
                                            } else {
                                                target.style.display = 'none';
                                            }
                                        } catch {
                                            target.style.display = 'none';
                                        }
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
                                                hoveredCard === 2 ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setCurrentNews((prev) => (prev + 1) % newsItems.length);
                                            }}
                                            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${
                                                hoveredCard === 2 ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                                <div className={`ml-2 transition-transform duration-300 ${hoveredCard === 2 ? 'translate-x-1' : 'translate-x-0'}`}>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
                                                  hoveredCard === 2 ? 'bg-white/40 hover:bg-white/60' : 'bg-gray-400 hover:bg-gray-600'
                                              }`
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </Link>
            </section>

            <style dangerouslySetInnerHTML={{ __html: welcomeBelowFoldCss }} />
        </>
    );
}

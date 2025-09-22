import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Director data with translation keys for positions
const directorsData = [
    { id: 17, name: 'Arif Budi Setiawan', positionKey: 'position_chairman', company: '', image: '' },
    { id: 4, name: 'Andito Prasetyowan', positionKey: 'position_president_director', company: 'PT Kristalin Ekalestari', image: '/IMG_9970.JPG' },
    {
        id: 11,
        name: 'Asri Dyah Wijayanti',
        positionKey: 'position_direktur_utama',
        company: 'PT Nusamineral Mining Services',
        image: '/IMG_4701.JPG',
    },
    { id: 5, name: 'Muhamad Luqman Baskara', positionKey: 'position_komisaris', company: 'PT Torindo Jaya Persada', image: '/IMG_0036.JPG' },
    { id: 12, name: 'Dony Rivai', positionKey: 'position_finance_director', company: 'PT Kristalin Ekalestari', image: '/IMG_4802.JPG' },
    { id: 6, name: 'Joshua Krisekaputra', positionKey: 'position_managing_partner', company: 'PT Kisara Global Capital', image: '/IMG_0188.JPG' },
    { id: 7, name: 'Reza Darmawan', positionKey: 'position_managing_partner', company: 'PT Kisara Global Capital', image: '/IMG_0272.JPG' },
    { id: 10, name: 'Prasetyo Nugroho', positionKey: 'position_managing_partner', company: 'PT Kisara Global Capital', image: '/IMG_4546.JPG' },
    { id: 14, name: 'Teguh Arief Herlambang', positionKey: 'position_group_head_compliance', company: '', image: '/IMG_4987.JPG' },
    { id: 16, name: 'Cindy Djunaidi', positionKey: 'position_group_hr_director', company: '', image: '/IMG_5220.JPG' },
    { id: 9, name: 'Danella Adira', positionKey: 'position_corporate_secretary', company: '', image: '/IMG_0457.JPG' },
    { id: 2, name: 'Gelombang Setiawan', positionKey: 'position_shareholder', company: 'PT Kristalin Ekalestari', image: '/IMG_9771.JPG' },
    { id: 8, name: 'Winarty', positionKey: 'position_shareholder', company: 'PT Kristalin Ekalestari', image: '/IMG_0378.JPG' },
    { id: 3, name: 'Muhammad Junaidi', positionKey: 'position_advisor_shareholder', company: '', image: '/IMG_9871.JPG', objectFit: 'cover' },
    { id: 15, name: 'Adelaide Pipit', positionKey: 'position_advisor_shareholder', company: '', image: '/IMG_5110.JPG' },
    { id: 1, name: 'Jilan Jia Auranya', positionKey: 'position_board_member', company: '', image: '/IMG_9617.JPG' },
    { id: 13, name: 'Novriadji Wibowo', positionKey: 'position_board_member', company: '', image: '/IMG_4892.JPG' },
];

// Enhanced Optimized Image Component - Performance focused for scroll
const OptimizedImage = ({
    src,
    alt,
    className,
    rotation,
    objectFit,
}: {
    src: string;
    alt: string;
    className: string;
    rotation?: string;
    objectFit?: string;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observerRef.current?.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }, // Increased margin for better preloading
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const handleError = useCallback(() => {
        setHasError(true);
        setIsLoaded(true);
    }, []);

    // Show mysterious icon when no image is provided
    if (!src || src === '') {
        return (
            <div className={`relative overflow-hidden ${className}`}>
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="text-center">
                        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400">
                            <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-slate-500">Anonymous</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
            {/* Enhanced loading skeleton with shimmer effect */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200">
                    <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100">
                    <svg className="mb-2 h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="text-xs text-slate-500">Image unavailable</span>
                </div>
            )}

            {/* Optimized image loading with priority for first 4 images */}
            {isInView && !hasError && (
                <img
                    src={src}
                    alt={alt}
                    className={`h-full w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        transform: rotation || 'none',
                        objectFit: (objectFit as 'cover' | 'contain' | 'fill' | 'none' | 'scale-down') || 'cover',
                    }}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
        </div>
    );
};

// Optimized Director Card Component - Performance focused
const DirectorCard = ({ director, index }: { director: (typeof directorsData)[0]; index: number }) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '30px',
            },
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
                isVisible
                    ? {
                          opacity: 1,
                          y: 0,
                      }
                    : {
                          opacity: 0,
                          y: 20,
                      }
            }
            transition={{
                duration: 0.4,
                delay: (index % 4) * 0.08,
                ease: 'easeOut',
            }}
            whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 },
            }}
            className="group"
        >
            <div className="relative overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-200/40 transition-all duration-300 group-hover:shadow-lg group-hover:ring-slate-300/60">
                {/* Director Photo - standard aspect ratio */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                        src={director.image}
                        alt={director.name}
                        className="h-full w-full"
                        rotation={(director as { rotation?: string }).rotation}
                        objectFit={(director as { objectFit?: string }).objectFit}
                    />

                    {/* Minimal overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Director Information - optimized spacing */}
                <div className="relative p-6">
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg leading-tight font-bold text-slate-900 transition-colors duration-300 group-hover:text-slate-800">
                                {director.name}
                            </h3>
                        </div>

                        <div>
                            <span className="inline-block rounded-full bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-800 ring-1 ring-amber-200/60">
                                {t(`board_of_directors.${director.positionKey}`)}
                            </span>
                        </div>

                        {director.company && <p className="text-sm leading-relaxed text-slate-600">{director.company}</p>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const BoardOfDirectors = () => {
    const { t } = useTranslation();
    const directorsRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200">
            <Header sticky={true} transparent={true} />

            {/* Enhanced Premium Hero Section with Business Activity Style */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                >
                    <img src="/board-hero-bg.jpg" alt="Board of Directors background" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                </div>

                <motion.div
                    className="relative z-20 mx-auto w-full max-w-5xl px-4 py-16 text-center sm:py-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.div
                        className="transform transition-all duration-1000 ease-out"
                        style={{
                            transform: `translateY(${scrollY * 0.2}px)`,
                            opacity: Math.max(0, 1 - scrollY / 600),
                        }}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        {/* MOBILE RESPONSIVE LEADERSHIP EXCELLENCE BADGE */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="mb-8 sm:mb-12"
                        >
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xl ring-2 ring-yellow-400/50 drop-shadow-lg backdrop-blur-sm sm:px-8 sm:py-3 sm:text-base">
                                <motion.svg
                                    className="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </motion.svg>
                                {t('board_of_directors.hero_badge')}
                            </span>
                        </motion.div>

                        {/* MOBILE RESPONSIVE MAIN TITLE */}
                        <motion.h1
                            className="mb-6 text-3xl leading-tight font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        >
                            <motion.span
                                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                            >
                                {t('board_of_directors.hero_title')}
                            </motion.span>
                        </motion.h1>

                        {/* MOBILE RESPONSIVE DESCRIPTION */}
                        <motion.p
                            className="mx-auto mb-8 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
                        >
                            {t('board_of_directors.hero_subtitle')}
                        </motion.p>

                        {/* MOBILE RESPONSIVE EXPLORE BUTTON */}
                        <motion.div
                            className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                        >
                            <motion.button
                                onClick={() => {
                                    if (directorsRef.current) {
                                        directorsRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 20px 40px rgba(251, 191, 36, 0.4)',
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                    {t('board_of_directors.section_title')}
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* MOBILE RESPONSIVE SCROLL INDICATOR */}
                <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 transform sm:bottom-6 lg:bottom-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
                >
                    <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white/60 sm:h-10 sm:w-6">
                        <div className="mt-1 h-2 w-1 animate-bounce rounded-full bg-white sm:mt-2 sm:h-3"></div>
                    </div>
                </motion.div>
            </section>

            {/* Premium Directors Section */}
            <section ref={directorsRef} className="py-20 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                    {/* Enhanced Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="mb-20 text-center"
                    >
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">{t('board_of_directors.section_title')}</h2>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-700">{t('board_of_directors.section_subtitle')}</p>
                    </motion.div>

                    {/* Premium Directors Grid */}
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {directorsData.map((director, index) => (
                            <DirectorCard key={director.id} director={director} index={index} />
                        ))}
                    </div>

                    {/* Enhanced Statistics Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="mt-32"
                    >
                        <div className="mb-16 text-center">
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">{t('board_of_directors.impact_title')}</h3>
                            <p className="mx-auto max-w-2xl text-gray-700">{t('board_of_directors.impact_subtitle')}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                            {[
                                {
                                    icon: (
                                        <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    ),
                                    number: directorsData.length,
                                    label: t('board_of_directors.stats_members'),
                                    description: t('board_of_directors.stats_members_desc'),
                                    color: 'amber',
                                },
                                {
                                    icon: (
                                        <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ),
                                    number: '150+',
                                    label: t('board_of_directors.stats_experience'),
                                    description: t('board_of_directors.stats_experience_desc'),
                                    color: 'emerald',
                                },
                                {
                                    icon: (
                                        <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                        </svg>
                                    ),
                                    number: 'ESG',
                                    label: t('board_of_directors.stats_sustainability'),
                                    description: t('board_of_directors.stats_sustainability_desc'),
                                    color: 'blue',
                                },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="group text-center"
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4 + index * 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                >
                                    <div
                                        className="relative mx-auto mb-8 overflow-hidden rounded-2xl bg-gradient-to-br p-6 shadow-xl transition-all duration-500 group-hover:shadow-2xl"
                                        style={{
                                            background:
                                                stat.color === 'amber'
                                                    ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                                                    : stat.color === 'emerald'
                                                      ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
                                                      : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                        }}
                                    >
                                        <div
                                            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-xl ${
                                                stat.color === 'amber'
                                                    ? 'bg-white/80 text-amber-700'
                                                    : stat.color === 'emerald'
                                                      ? 'bg-white/80 text-emerald-700'
                                                      : 'bg-white/80 text-blue-700'
                                            }`}
                                        >
                                            {stat.icon}
                                        </div>

                                        {/* Subtle glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="text-4xl font-bold text-slate-900">{stat.number}</div>
                                        <div className="text-lg font-semibold text-slate-800">{stat.label}</div>
                                        <div className="text-sm text-slate-600">{stat.description}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Enhanced shimmer animation styles */}
            <style>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>

            <Footer />
        </div>
    );
};

export default BoardOfDirectors;

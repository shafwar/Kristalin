import { AnimatePresence, Easing, motion, Variants } from 'framer-motion';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

// Enhanced animations with professional timing
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as unknown as Easing[],
        },
    },
};

// Enhanced Counter Animation with counting up effect
interface CounterAnimationProps {
    target: number;
    suffix?: string;
    duration?: number;
    delay?: number;
}

const CounterAnimation = ({ target, suffix = '', duration = 2000, delay = 0 }: CounterAnimationProps) => {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startCounting = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setCount(0);

        const increment = target / (duration / 50); // Update every 50ms
        let current = 0;

        intervalRef.current = setInterval(() => {
            current += increment;

            if (current >= target) {
                setCount(target);
                setIsAnimating(false);
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            } else {
                setCount(Math.floor(current));
            }
        }, 50);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            onViewportEnter={() => {
                setTimeout(startCounting, delay);
            }}
            transition={{
                duration: 0.8,
                delay: delay / 1000,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative mb-2 overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            style={{
                backgroundImage: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
            }}
        >
            <motion.span
                animate={{
                    scale: isAnimating ? [1, 1.05, 1] : 1,
                    color: isAnimating ? ['#fbbf24', '#f59e0b', '#fbbf24'] : '#fbbf24',
                }}
                transition={{
                    duration: 0.5,
                    repeat: isAnimating ? Infinity : 0,
                    repeatType: 'reverse',
                }}
            >
                {count.toLocaleString()}
                {suffix}
            </motion.span>

            {/* Shimmer effect that starts after counting */}
            {!isAnimating && count === target && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            )}
        </motion.div>
    );
};

// Professional Mining Icons with enhanced styling
interface IconProps {
    type: string;
    className?: string;
}
const icons: Record<string, React.ReactElement> = {
    mining: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.341A8 8 0 116.343 2.257M22 22l-5-5" />
        </svg>
    ),
    processing: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
        </svg>
    ),
    search: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth={2} />
        </svg>
    ),
    truck: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="1" y="3" width="15" height="13" rx="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8h3l4 4v4a2 2 0 01-2 2h-1" />
        </svg>
    ),
    users: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="9" cy="7" r="4" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="17" cy="7" r="4" strokeWidth={2} />
        </svg>
    ),
    education: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5c0-.638.214-1.24.584-1.922L12 14z"
            />
        </svg>
    ),
    environment: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 22c4.418 0 8-4.03 8-9 0-3.866-3.134-7-7-7S4 9.134 4 13c0 4.97 3.582 9 8 9z"
            />
        </svg>
    ),
    health: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
        </svg>
    ),
    analytics: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17v-6m4 6V7m4 10v-3" />
        </svg>
    ),
    drone: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
        </svg>
    ),
    network: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
        </svg>
    ),
    location: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="17.657" cy="16.657" r="4" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    trophy: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
        </svg>
    ),
    phone: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.7 2.8a2 2 0 01-.45 1.95l-1.35 1.35a16.001 16.001 0 006.586 6.586l1.35-1.35a2 2 0 011.95-.45l2.8.7A2 2 0 0121 17.72V21a2 2 0 01-2 2h-1C7.163 23 1 16.837 1 9V8a2 2 0 012-2z"
            />
        </svg>
    ),
    handshake: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17l6 6m0 0l6-6m-6 6V10" />
        </svg>
    ),
    globe: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
    ),
};
const Icon = ({ type, className = 'w-6 h-6' }: IconProps) => {
    const icon = icons[type] || icons.processing;
    if (React.isValidElement(icon) && icon.type === 'svg') {
        return React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className });
    }
    return icon;
};

const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
};

const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
};

// Fixed Mining Sectors Section untuk Mobile
function EnhancedMiningSectors({ t }: { t: (key: string) => string }) {
    const sectors = [
        {
            name: t('pages.business_activity.mining_sectors.sectors.gold.name'),
            description: t('pages.business_activity.mining_sectors.sectors.gold.description'),
            highlight: t('pages.business_activity.mining_sectors.sectors.gold.highlight'),
        },
        {
            name: t('pages.business_activity.mining_sectors.sectors.silver.name'),
            description: t('pages.business_activity.mining_sectors.sectors.silver.description'),
            highlight: t('pages.business_activity.mining_sectors.sectors.silver.highlight'),
        },
        {
            name: t('pages.business_activity.mining_sectors.sectors.other_metals.name'),
            description: t('pages.business_activity.mining_sectors.sectors.other_metals.description'),
            highlight: t('pages.business_activity.mining_sectors.sectors.other_metals.highlight'),
        },
    ];

    const images = [
        { src: imageUrl('gold1.jpg'), alt: t('pages.business_activity.mining_sectors.images.gold_alt') },
        { src: imageUrl('silver.jpg'), alt: t('pages.business_activity.mining_sectors.images.silver_alt') },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [showGoldDetail, setShowGoldDetail] = useState(false);
    const [showSilverDetail, setShowSilverDetail] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [images.length]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showGoldDetail || showSilverDetail) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showGoldDetail, showSilverDetail]);

    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header Section - MOBILE OPTIMIZED */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-12 text-center sm:mb-16"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '5rem' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mb-4 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 sm:mb-6"
                    />
                    <h1 className="mb-4 text-3xl font-bold text-gray-800 sm:mb-6 sm:text-4xl md:text-5xl">
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                            {t('pages.business_activity.mining_sectors.title_line1')}
                        </span>{' '}
                        <span className="text-gray-800">{t('pages.business_activity.mining_sectors.title_line2')}</span>
                    </h1>
                    <p className="mx-auto max-w-4xl px-2 text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
                        {t('pages.business_activity.mining_sectors.description')}
                    </p>
                </motion.div>

                {/* Main Content Grid - MOBILE RESPONSIVE */}
                <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 xl:grid-cols-5">
                    {/* Left Side - Detailed List - MOBILE OPTIMIZED */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="space-y-6 sm:space-y-8 xl:col-span-3"
                    >
                        {sectors.map((sector, index) => (
                            <motion.div
                                key={sector.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                    ease: 'easeOut',
                                }}
                                whileHover={{
                                    x: 4,
                                    transition: { duration: 0.3 },
                                }}
                                className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-lg sm:p-6 lg:p-8"
                            >
                                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                                    {/* Enhanced Bullet Point - MOBILE SIZED */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 180 }}
                                        transition={{ duration: 0.5 }}
                                        className="mt-0 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg sm:mt-1 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                                    >
                                        <div className="h-2 w-2 rounded-full bg-white sm:h-3 sm:w-3 lg:h-4 lg:w-4"></div>
                                    </motion.div>

                                    <div className="min-w-0 flex-1">
                                        {/* Sector Name and Badge - MOBILE RESPONSIVE */}
                                        <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                                            <h3 className="text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-amber-600 sm:text-xl lg:text-2xl">
                                                {sector.name}
                                            </h3>
                                            <span className="w-fit rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 sm:px-3">
                                                {sector.highlight}
                                            </span>
                                        </div>

                                        {/* Description - MOBILE OPTIMIZED */}
                                        <p className="mb-3 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 sm:mb-4 sm:text-base">
                                            {sector.description}
                                        </p>

                                        {/* Learn More Links - MOBILE FRIENDLY */}
                                        {index === 0 && (
                                            <motion.div className="opacity-100" whileHover={{ x: 3 }}>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowGoldDetail(true)}
                                                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 focus:underline focus:outline-none sm:gap-2 sm:text-sm"
                                                >
                                                    {t('pages.business_activity.mining_sectors.learn_more_gold')}
                                                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </motion.div>
                                        )}

                                        {index === 1 && (
                                            <motion.div className="opacity-100" whileHover={{ x: 3 }}>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowSilverDetail(true)}
                                                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 focus:underline focus:outline-none sm:gap-2 sm:text-sm"
                                                >
                                                    {t('pages.business_activity.mining_sectors.learn_more_silver')}
                                                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </motion.div>
                                        )}

                                        {index === 2 && (
                                            <motion.div className="opacity-100" whileHover={{ x: 3 }}>
                                                <button
                                                    type="button"
                                                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 focus:underline focus:outline-none sm:gap-2 sm:text-sm"
                                                >
                                                    {t('pages.business_activity.mining_sectors.learn_more_other_metals')}
                                                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Side - Enhanced Visual - MOBILE OPTIMIZED */}
                    <div className="relative overflow-visible xl:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        >
                            <div className="relative flex flex-col items-center justify-center overflow-visible rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-12">
                                <div className="flex w-full items-center justify-center overflow-hidden rounded-lg" style={{ minHeight: 200 }}>
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={images[activeIndex].src}
                                            src={images[activeIndex].src}
                                            alt={images[activeIndex].alt}
                                            className="h-auto w-full rounded-lg object-cover"
                                            style={{ maxHeight: 280 }}
                                            initial={{ x: 100, opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                                            animate={{ x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                            exit={{ x: -100, opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                                            transition={{ duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Image Caption - MOBILE RESPONSIVE */}
                                <div className="mt-4 text-center">
                                    <h4 className="mb-2 text-base font-semibold text-gray-800 sm:text-lg">
                                        {t('pages.business_activity.modern_operations.title')}
                                    </h4>
                                    <p className="text-xs text-gray-600 sm:text-sm">{t('pages.business_activity.modern_operations.subtitle')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Modals - MOBILE OPTIMIZED */}
                <AnimatePresence>
                    {showGoldDetail && (
                        <>
                            <motion.div
                                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowGoldDetail(false)}
                            />
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 40 }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <div className="relative mx-4 flex max-h-[90vh] w-full max-w-lg flex-col items-center overflow-y-auto rounded-2xl border border-amber-200 bg-white px-4 py-6 shadow-2xl sm:px-6 sm:py-8">
                                    <button
                                        className="absolute top-3 right-3 z-20 sm:top-4 sm:right-4"
                                        onClick={() => setShowGoldDetail(false)}
                                        aria-label="Close"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-100/80 text-gray-500 shadow transition-colors duration-200 hover:bg-red-100 hover:text-red-500 sm:h-10 sm:w-10">
                                            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 7L15 15M15 7L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    </button>

                                    <div className="flex w-full justify-center">
                                        <img
                                            src={imageUrl('gold1.jpg')}
                                            alt="Gold Operation"
                                            className="mb-4 aspect-[4/3] w-full max-w-xs rounded-xl bg-white object-cover sm:mb-6"
                                        />
                                    </div>

                                    <h2 className="mb-3 text-center text-xl font-bold text-amber-600 sm:mb-4 sm:text-2xl">Gold Operations</h2>

                                    <p className="mb-4 max-w-md text-center text-sm leading-relaxed text-gray-700 sm:mb-5 sm:text-base">
                                        Operasi pertambangan emas kami memanfaatkan teknologi aluvial modern di daerah aliran Sungai Musairo, Papua.
                                        Kami berkomitmen pada penambangan yang berkelanjutan, menjaga kelestarian lingkungan, dan memaksimalkan hasil
                                        dengan peralatan canggih.
                                    </p>

                                    <ul className="mx-auto mb-2 max-w-md list-disc space-y-1 pl-4 text-sm text-gray-600 sm:space-y-2 sm:pl-5 sm:text-base">
                                        <li>Teknologi aluvial modern dan efisien</li>
                                        <li>Pengelolaan lingkungan yang ketat</li>
                                        <li>Program pemberdayaan masyarakat sekitar</li>
                                        <li>Produksi emas berkadar tinggi</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </>
                    )}

                    {showSilverDetail && (
                        <>
                            <motion.div
                                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowSilverDetail(false)}
                            />
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 40 }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <div className="relative mx-4 flex max-h-[90vh] w-full max-w-lg flex-col items-center overflow-y-auto rounded-2xl border border-amber-200 bg-white px-4 py-6 shadow-2xl sm:px-6 sm:py-8">
                                    <button
                                        className="absolute top-3 right-3 z-20 sm:top-4 sm:right-4"
                                        onClick={() => setShowSilverDetail(false)}
                                        aria-label="Close"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-100/80 text-gray-500 shadow transition-colors duration-200 hover:bg-red-100 hover:text-red-500 sm:h-10 sm:w-10">
                                            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 7L15 15M15 7L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </span>
                                    </button>

                                    <div className="flex w-full justify-center">
                                        <img
                                            src={imageUrl('silver.jpg')}
                                            alt="Silver Operation"
                                            className="mb-4 aspect-[4/3] w-full max-w-xs rounded-xl bg-white object-cover sm:mb-6"
                                        />
                                    </div>

                                    <h2 className="mb-3 text-center text-xl font-bold text-amber-600 sm:mb-4 sm:text-2xl">Silver Operations</h2>

                                    <p className="mb-4 max-w-md text-center text-sm leading-relaxed text-gray-700 sm:mb-5 sm:text-base">
                                        Operasi pemrosesan perak kami menggunakan teknologi pemurnian canggih untuk menghasilkan perak berkadar tinggi
                                        dengan standar kualitas ekspor. Proses terintegrasi kami memastikan efisiensi, ramah lingkungan, dan
                                        konsistensi hasil.
                                    </p>

                                    <ul className="mx-auto mb-2 max-w-md list-disc space-y-1 pl-4 text-sm text-gray-600 sm:space-y-2 sm:pl-5 sm:text-base">
                                        <li>Teknologi pemurnian canggih</li>
                                        <li>Kadar kemurnian tinggi</li>
                                        <li>Proses ramah lingkungan</li>
                                        <li>Produk perak berkualitas ekspor</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Bottom Summary - MOBILE OPTIMIZED */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 rounded-2xl bg-gray-800 p-6 text-center text-white sm:mt-16 sm:p-8"
                >
                    <h3 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">{t('pages.business_activity.sustainable_excellence.title')}</h3>
                    <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
                        {t('pages.business_activity.sustainable_excellence.description')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// NEW ENHANCED ALLUVIAL GOLD MINING SECTION - MINIMALIST VERSION
function AlluvialGoldMiningSection({ t }: { t: (key: string) => string }) {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '4rem' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mx-auto mb-6 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-600"
                    />
                    <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">{t('pages.business_activity.alluvial_mining.title')}</h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">{t('pages.business_activity.alluvial_mining.subtitle')}</p>

                    {/* Torindo Jaya Partnership Box - Enhanced UI */}
                    <div className="mb-10 flex flex-col items-center justify-center rounded-2xl border border-amber-300 bg-gradient-to-br from-yellow-50 via-amber-50 to-white p-8 shadow-lg">
                        <div className="mb-3 flex items-center gap-3">
                            <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1m4 0h-1v-4h-1"
                                />
                            </svg>
                            <h3 className="text-2xl font-extrabold tracking-tight text-amber-700">
                                {t('pages.business_activity.alluvial_mining.torindo.title')}
                            </h3>
                        </div>
                        <div className="max-w-2xl text-center">
                            <p
                                className="text-base leading-relaxed text-gray-800 md:text-lg"
                                dangerouslySetInnerHTML={{ __html: t('pages.business_activity.alluvial_mining.torindo.description') }}
                            />
                        </div>
                    </div>
                </motion.div>
                {/* Main Content */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8 lg:col-span-2"
                    >
                        {/* Main Text */}
                        <div className="prose prose-lg max-w-none">
                            <p className="mb-6 leading-relaxed text-gray-700">{t('pages.business_activity.alluvial_mining.content.paragraph1')}</p>
                            <p className="mb-6 leading-relaxed text-gray-700">{t('pages.business_activity.alluvial_mining.content.paragraph2')}</p>
                            <p className="mb-8 leading-relaxed text-gray-700">{t('pages.business_activity.alluvial_mining.content.paragraph3')}</p>
                        </div>
                        {/* Key Operations */}
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                            <h3 className="mb-6 text-xl font-semibold text-gray-800">
                                {t('pages.business_activity.alluvial_mining.current_operations.title')}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                        <span className="font-medium text-gray-700">
                                            {t('pages.business_activity.alluvial_mining.current_operations.exploration')}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-amber-600">
                                        {t('pages.business_activity.alluvial_mining.current_operations.exploration_area')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                        <span className="font-medium text-gray-700">
                                            {t('pages.business_activity.alluvial_mining.current_operations.processing')}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-amber-600">
                                        {t('pages.business_activity.alluvial_mining.current_operations.processing_area')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Economic Impact */}
                        <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">
                                {t('pages.business_activity.alluvial_mining.economic_impact.title')}
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                {t('pages.business_activity.alluvial_mining.economic_impact.description')}
                            </p>
                        </div>
                    </motion.div>
                    {/* Right Column - Image & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-xl shadow-lg">
                            <img src={imageUrl('tracktor.png')} alt="Gold mining operations" className="h-64 w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute right-4 bottom-4 left-4 text-white">
                                <p className="text-sm font-medium">{t('pages.business_activity.modern_operations.title')}</p>
                                <p className="text-xs opacity-90">{t('pages.business_activity.modern_operations.location')}</p>
                            </div>
                        </div>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                <div className="mb-1 text-2xl font-bold text-amber-600">2007</div>
                                <div className="text-sm text-gray-600">{t('pages.business_activity.alluvial_mining.stats.est_year')}</div>
                            </div>
                            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
                                <div className="mb-1 text-2xl font-bold text-amber-600">17+</div>
                                <div className="text-sm text-gray-600">{t('pages.business_activity.alluvial_mining.stats.years_exp')}</div>
                            </div>
                        </div>
                        {/* Timeline */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h4 className="mb-4 font-semibold text-gray-800">{t('pages.business_activity.alluvial_mining.timeline.title')}</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    <div>
                                        <span className="font-medium text-gray-800">2007</span>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {t('pages.business_activity.alluvial_mining.timeline.mining_authority')}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    <div>
                                        <span className="font-medium text-gray-800">2010</span>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {t('pages.business_activity.alluvial_mining.timeline.exploration_license')}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                    <div>
                                        <span className="font-medium text-gray-800">2011</span>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {t('pages.business_activity.alluvial_mining.timeline.production_license')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function BusinessActivityPage() {
    const { t } = useTranslation();
    const miningSectorsRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header sticky={true} transparent={true} />

            {/* Hero Section - MOBILE OPTIMIZED */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                >
                    <img
                        src={imageUrl('businessactivity.jpg')}
                        alt={t('pages.business_activity.hero.alt_text')}
                        className="h-full w-full object-cover"
                    />
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
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* MOBILE RESPONSIVE HEADING */}
                        <motion.h1
                            className="mb-6 text-3xl leading-tight font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        >
                            <motion.span
                                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                {t('pages.business_activity.hero.title_line1')}
                            </motion.span>
                            <br />
                            <motion.span
                                className="text-white drop-shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                {t('pages.business_activity.hero.title_line2')}
                            </motion.span>
                        </motion.h1>

                        {/* MOBILE RESPONSIVE DESCRIPTION */}
                        <motion.p
                            className="mx-auto mb-8 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                        >
                            {t('pages.business_activity.hero.description')}
                        </motion.p>

                        {/* FIXED MOBILE BUTTON */}
                        <motion.div
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
                        >
                            <motion.button
                                onClick={() => {
                                    if (miningSectorsRef.current) {
                                        miningSectorsRef.current.scrollIntoView({ behavior: 'smooth' });
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
                                    {t('pages.business_activity.hero.explore_button')}
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
                    transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
                >
                    <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white/60 sm:h-10 sm:w-6">
                        <div className="mt-1 h-2 w-1 animate-bounce rounded-full bg-white sm:mt-2 sm:h-3"></div>
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Mining Sectors Section */}
            <div ref={miningSectorsRef}>
                <EnhancedMiningSectors t={t} />
            </div>

            {/* Our Location Section - BLACK BACKGROUND */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative bg-cover bg-fixed bg-center py-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${imageUrl('nabire.jpg')}')`,
                }}
            >
                <div className="mx-auto max-w-7xl px-4">
                    <motion.div variants={fadeInUp} transition={{ duration: 0.4, ease: 'easeInOut' }} className="mb-16 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm font-medium tracking-wider text-amber-400 uppercase"
                        >
                            {t('pages.business_activity.location.header')}
                        </motion.span>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '4rem' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mx-auto mt-2 mb-8 h-0.5 bg-amber-400"
                        />
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-6 text-3xl leading-tight font-bold text-white md:text-4xl"
                        >
                            {t('pages.business_activity.location.title')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mx-auto mb-12 max-w-5xl text-base leading-relaxed font-normal text-gray-200 md:text-lg"
                        >
                            {t('pages.business_activity.location.description_part1')}
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        {/* Left Side - Map/Visual */}
                        <motion.div variants={slideInLeft} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative">
                            <div className="rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40">
                                <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900">
                                    {/* Simple Map Placeholder */}
                                    <div className="relative h-full w-full bg-gradient-to-br from-gray-700 to-gray-800">
                                        {/* Papua Island Shape Representation */}
                                        <div className="absolute inset-4 rotate-12 transform rounded-lg bg-gradient-to-br from-green-700 to-green-800 opacity-80"></div>
                                        <div className="absolute inset-6 rotate-6 transform rounded-lg bg-gradient-to-br from-green-600 to-green-700 opacity-90"></div>
                                        {/* Location Marker */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.4 }}
                                            className="absolute top-1/2 right-1/3 z-10 -translate-x-1/2 -translate-y-1/2 transform"
                                        >
                                            <div className="relative">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        boxShadow: [
                                                            '0 0 0 0 rgba(251, 191, 36, 0.7)',
                                                            '0 0 0 10px rgba(251, 191, 36, 0)',
                                                            '0 0 0 0 rgba(251, 191, 36, 0)',
                                                        ],
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                                    className="h-5 w-5 rounded-full bg-amber-400 shadow-lg"
                                                />
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 1 }}
                                                className="absolute -top-10 left-1/2 -translate-x-1/2 transform rounded bg-amber-400 px-3 py-1 text-xs font-medium whitespace-nowrap text-black"
                                            >
                                                PT Kristalin Ekalestari
                                                <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-amber-400"></div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="mt-6 text-center"
                                >
                                    <p className="text-sm font-medium text-gray-300">{t('pages.business_activity.location.map_caption')}</p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Side - Details */}
                        <motion.div variants={slideInRight} className="space-y-8">
                            <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                                <div className="rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40">
                                    <motion.h3
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="mb-6 text-xl font-semibold text-white"
                                    >
                                        {t('pages.business_activity.location.mining_area_details.title')}
                                    </motion.h3>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                label: t('pages.business_activity.location.mining_area_details.total_area_label'),
                                                value: t('pages.business_activity.location.mining_area_details.total_area_value'),
                                                icon: 'location',
                                            },
                                            {
                                                label: t('pages.business_activity.location.mining_area_details.distance_label'),
                                                value: t('pages.business_activity.location.mining_area_details.distance_value'),
                                                icon: 'truck',
                                            },
                                            {
                                                label: t('pages.business_activity.location.mining_area_details.land_transport_label'),
                                                value: t('pages.business_activity.location.mining_area_details.land_transport_value'),
                                                icon: 'truck',
                                            },
                                            {
                                                label: t('pages.business_activity.location.mining_area_details.river_access_label'),
                                                value: t('pages.business_activity.location.mining_area_details.river_access_value'),
                                                icon: 'location',
                                            },
                                        ].map((detail) => (
                                            <motion.div
                                                key={detail.label}
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                                whileHover={{ x: 8, scale: 1.02 }}
                                                className="group flex cursor-pointer items-center justify-between rounded-lg bg-white/5 p-4 transition-all duration-300 hover:bg-white/10"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.6 }}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 transition-colors duration-300 group-hover:bg-amber-400"
                                                    >
                                                        <Icon type={detail.icon} className="h-4 w-4 text-white" />
                                                    </motion.div>
                                                    <span className="font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                                                        {detail.label}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-white transition-colors duration-300 group-hover:text-amber-400">
                                                    {detail.value}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                                <div className="rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40">
                                    <motion.h3
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="mb-6 text-xl font-semibold text-white"
                                    >
                                        {t('pages.business_activity.location.mineral_resources.title')}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="mb-6 text-sm leading-relaxed font-normal text-gray-400"
                                    >
                                        {t('pages.business_activity.location.mineral_resources.description')}
                                    </motion.p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { value: '32.7', label: t('pages.business_activity.location.mineral_resources.total_resources') },
                                            { value: '13.7', label: t('pages.business_activity.location.mineral_resources.ready_to_mine') },
                                        ].map((stat) => (
                                            <motion.div
                                                key={stat.label}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                whileHover={{ scale: 1.05 }}
                                                className="group cursor-pointer rounded-lg bg-amber-500/10 p-4 text-center transition-all duration-300 hover:bg-amber-500/20"
                                            >
                                                <div className="mb-1 text-2xl font-bold text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Alluvial Gold Mining Section */}
            <AlluvialGoldMiningSection t={t} />

            {/* Our Achievements Section - BLACK BACKGROUND */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-black py-20"
            >
                <div className="mx-auto max-w-7xl px-4">
                    <motion.div variants={fadeInUp} className="mb-16 text-center">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1, color: '#fbbf24' }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="mb-6 text-3xl leading-tight font-bold md:text-4xl"
                        >
                            {t('pages.business_activity.achievements.title')}
                        </motion.h2>
                        <div className="mx-auto mb-6 h-0.5 w-16 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                        <p className="mx-auto max-w-4xl text-base leading-relaxed font-normal text-gray-400 md:text-lg">
                            {t('pages.business_activity.achievements.subtitle')}
                        </p>
                    </motion.div>
                    {/* Achievements Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {[
                            {
                                number: 18,
                                label: t('pages.business_activity.achievements.years_experience.label'),
                                description: t('pages.business_activity.achievements.years_experience.description'),
                                icon: 'trophy',
                                suffix: '+',
                            },
                            {
                                number: 12,
                                label: t('pages.business_activity.achievements.mining_sites.label'),
                                description: t('pages.business_activity.achievements.mining_sites.description'),
                                icon: 'location',
                                suffix: '',
                            },
                            {
                                number: 46,
                                label: t('pages.business_activity.achievements.gold_reserves.label'),
                                description: t('pages.business_activity.achievements.gold_reserves.description'),
                                icon: 'mining',
                                suffix: '.4T',
                            },
                            {
                                number: 99,
                                label: t('pages.business_activity.achievements.success_rate.label'),
                                description: t('pages.business_activity.achievements.success_rate.description'),
                                icon: 'analytics',
                                suffix: '%',
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.02,
                                    boxShadow: '0 25px 50px rgba(251, 191, 36, 0.25)',
                                    borderColor: 'rgba(251, 191, 36, 0.6)',
                                }}
                                className="group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40"
                            >
                                {/* Background decoration */}
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                                        className="mx-auto mb-6 w-fit rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 p-4"
                                    >
                                        <Icon type={stat.icon} className="h-8 w-8 text-white" />
                                    </motion.div>

                                    <CounterAnimation target={stat.number} suffix={stat.suffix} duration={2000} delay={index * 300} />

                                    <h4 className="mb-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-amber-400">
                                        {stat.label}
                                    </h4>

                                    <p className="text-sm leading-relaxed font-normal text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                                        {stat.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Community Impact - ENHANCED BACKGROUND */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50/30 py-24"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-400 blur-3xl"></div>
                    <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-yellow-400 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-amber-300 opacity-20 blur-3xl"></div>
                </div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.3'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '40px 40px',
                        }}
                    ></div>
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-4">
                    {/* Enhanced Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="mb-20 text-center"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-medium text-amber-700 backdrop-blur-sm">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500"></div>
                            {t('pages.business_activity.community_impact.community_development_tag')}
                        </div>

                        <h2 className="mb-6 text-4xl font-bold text-gray-900">{t('pages.business_activity.community_impact.title')}</h2>
                        <div className="mx-auto mb-8 h-0.5 w-16 bg-amber-600"></div>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                            {t('pages.business_activity.community_impact.subtitle')}
                        </p>
                    </motion.div>

                    {/* Main Content - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mb-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2"
                    >
                        {/* Image with Enhanced Background */}
                        <div className="group relative">
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-75 blur-xl transition duration-1000 group-hover:opacity-100"></div>
                            <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl">
                                <img
                                    src={imageUrl('comdevelop.jpg')}
                                    alt="Community Development"
                                    className="h-80 w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Content with Enhanced Background */}
                        <div className="relative">
                            <div className="absolute -inset-6 rounded-2xl border border-gray-200/50 bg-white/50 backdrop-blur-sm"></div>
                            <div className="relative space-y-8 p-6">
                                <div>
                                    <div className="mb-4 inline-block rounded-full border border-amber-200 bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 text-sm font-medium text-amber-700">
                                        {t('pages.business_activity.community_impact.community_development_tag')}
                                    </div>
                                    <h3 className="mb-6 text-3xl font-bold text-gray-900">
                                        {t('pages.business_activity.community_impact.empowering_title')}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-gray-600">
                                        {t('pages.business_activity.community_impact.empowering_description')}
                                    </p>
                                </div>

                                {/* Enhanced Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md">
                                        <div className="mb-1 text-2xl font-bold text-amber-600">
                                            {t('pages.business_activity.community_impact.stats.miners_trained.value')}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {t('pages.business_activity.community_impact.stats.miners_trained.label')}
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md">
                                        <div className="mb-1 text-2xl font-bold text-amber-600">
                                            {t('pages.business_activity.community_impact.stats.success_rate.value')}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {t('pages.business_activity.community_impact.stats.success_rate.label')}
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md">
                                        <div className="mb-1 text-2xl font-bold text-amber-600">
                                            {t('pages.business_activity.community_impact.stats.villages.value')}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {t('pages.business_activity.community_impact.stats.villages.label')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Impact Areas - Enhanced */}
                    <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: 'users',
                                title: t('pages.business_activity.community_impact.stats.employment.label'),
                                value: t('pages.business_activity.community_impact.stats.employment.value'),
                                description: t('pages.business_activity.community_impact.stats.employment.description'),
                            },
                            {
                                icon: 'education',
                                title: t('pages.business_activity.community_impact.stats.training.label'),
                                value: t('pages.business_activity.community_impact.stats.training.value'),
                                description: t('pages.business_activity.community_impact.stats.training.description'),
                            },
                            {
                                icon: 'environment',
                                title: t('pages.business_activity.community_impact.stats.environment.label'),
                                value: t('pages.business_activity.community_impact.stats.environment.value'),
                                description: t('pages.business_activity.community_impact.stats.environment.description'),
                            },
                            {
                                icon: 'health',
                                title: t('pages.business_activity.community_impact.stats.healthcare.label'),
                                value: t('pages.business_activity.community_impact.stats.healthcare.value'),
                                description: t('pages.business_activity.community_impact.stats.healthcare.description'),
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                                whileHover={{ y: -5 }}
                                className="group relative"
                            >
                                {/* Card Background Glow */}
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-75 blur transition duration-1000 group-hover:opacity-100"></div>

                                <div className="relative rounded-xl border border-gray-200 bg-white/90 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-gradient-to-br from-amber-100 to-yellow-100"
                                    >
                                        <Icon type={item.icon} className="h-7 w-7 text-amber-600" />
                                    </motion.div>

                                    <div className="mb-2 text-3xl font-bold text-gray-900">{item.value}</div>
                                    <div className="mb-2 text-lg font-semibold text-gray-800">{item.title}</div>
                                    <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Partnership Summary - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative"
                    >
                        {/* Background Glow */}
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-400/10 to-yellow-400/10 blur-2xl"></div>

                        <div className="relative rounded-2xl border border-gray-200 bg-white/90 p-8 text-center backdrop-blur-sm md:p-12">
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                {t('pages.business_activity.community_impact.sustainable_communities.title')}
                            </h3>
                            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600">
                                {t('pages.business_activity.community_impact.sustainable_communities.description')}
                            </p>

                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                                {[
                                    {
                                        value: t('pages.business_activity.community_impact.sustainable_communities.partner_villages.value'),
                                        label: t('pages.business_activity.community_impact.sustainable_communities.partner_villages.label'),
                                    },
                                    {
                                        value: t('pages.business_activity.community_impact.sustainable_communities.active_programs.value'),
                                        label: t('pages.business_activity.community_impact.sustainable_communities.active_programs.label'),
                                    },
                                    {
                                        value: t('pages.business_activity.community_impact.sustainable_communities.annual_investment.value'),
                                        label: t('pages.business_activity.community_impact.sustainable_communities.annual_investment.label'),
                                    },
                                    {
                                        value: t('pages.business_activity.community_impact.sustainable_communities.lives_improved.value'),
                                        label: t('pages.business_activity.community_impact.sustainable_communities.lives_improved.label'),
                                    },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                                        whileHover={{ scale: 1.05 }}
                                        className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 text-center transition-all duration-300 hover:shadow-md"
                                    >
                                        <div className="mb-2 text-3xl font-bold text-amber-600">{stat.value}</div>
                                        <div className="text-gray-600">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Why Choose Us Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative bg-cover bg-fixed bg-center py-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${imageUrl('hero-linebusiness.png')}')`,
                }}
            >
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Left Content */}
                        <motion.div variants={slideInLeft} transition={{ duration: 0.4, ease: 'easeInOut' }}>
                            <h2 className="mb-4 text-sm font-semibold tracking-[0.25em] text-white">
                                {t('pages.business_activity.why_choose_us.header')}
                            </h2>
                            <div className="mb-8 h-0.5 w-20 bg-yellow-600"></div>
                            <h3 className="mb-6 text-4xl leading-tight font-normal text-white md:text-5xl">
                                {t('pages.business_activity.why_choose_us.title')}
                            </h3>
                            <p className="mb-8 text-xl text-white/90">{t('pages.business_activity.why_choose_us.subtitle')}</p>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.4, ease: 'easeInOut' }}
                                whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white px-8 py-4 font-semibold tracking-wide text-white transition-all duration-300"
                            >
                                <a href="/contact">{t('pages.business_activity.why_choose_us.contact_button')}</a>
                            </motion.button>
                        </motion.div>

                        {/* Right Content - Features */}
                        <motion.div variants={slideInRight} transition={{ delay: 0.2, duration: 0.4, ease: 'easeInOut' }} className="space-y-6">
                            {[
                                t('pages.business_activity.why_choose_us.features.professional'),
                                t('pages.business_activity.why_choose_us.features.on_time'),
                                t('pages.business_activity.why_choose_us.features.friendly'),
                                t('pages.business_activity.why_choose_us.features.best_fair'),
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * index, duration: 0.4, ease: 'easeInOut' }}
                                    className="group flex items-center space-x-4"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ duration: 0.4 }}
                                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-600"
                                    >
                                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" />
                                        </svg>
                                    </motion.div>
                                    <span className="text-lg text-white transition-colors duration-300 group-hover:text-yellow-300">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
}

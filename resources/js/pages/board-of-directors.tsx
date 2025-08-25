import { useTranslation } from '@/hooks/useTranslation';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Advanced Optimized Image Component with Progressive Loading
const OptimizedImage = ({ src, alt, className, loading = 'lazy', priority = false }: {
    src: string;
    alt: string;
    className: string;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (priority || loading === 'eager') {
            setIsInView(true);
            return;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observerRef.current?.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [priority, loading]);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
            {/* Loading skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            )}

            {/* Progressive image loading */}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                    loading={loading}
                    decoding="async"
                    onLoad={handleLoad}
                    style={{
                        willChange: 'opacity',
                        transform: 'translateZ(0)', // Force hardware acceleration
                    }}
                />
            )}
        </div>
    );
};

// Preload Manager for Critical Images
const useImagePreloader = (images: string[], preloadCount = 3) => {
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

    useEffect(() => {
        const preloadImages = async () => {
            const promises = images.slice(0, preloadCount).map((src) => {
                return new Promise<string>((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(src);
                    img.onerror = () => resolve(src);
                    img.src = src;
                });
            });

            const loadedImages = await Promise.all(promises);
            setPreloadedImages(new Set(loadedImages));
        };

        preloadImages();
    }, [images, preloadCount]);

    return preloadedImages;
};

const BoardOfDirectors = () => {
    const { t } = useTranslation();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    // Optimized photo array with compressed versions
    const directorPhotos = useMemo(
        () => [
            '/IMG_9617.JPG',
            '/IMG_9771.JPG',
            '/IMG_0171.JPG',
            '/IMG_9970.JPG',
            '/IMG_0036.JPG',
            '/IMG_0188.JPG',
            '/IMG_0272.JPG',
            '/IMG_0378.JPG',
            '/IMG_0457.JPG',
            '/IMG_4546.JPG',
            '/IMG_4701.JPG',
            '/IMG_4802.JPG',
            '/IMG_4892.JPG',
            '/IMG_4987.JPG',
            '/IMG_5110.JPG',
            '/IMG_5220.JPG',
            '/IMG_5382.JPG',
        ],
        [],
    );

    // Advanced preloading strategy
    const preloadedImages = useImagePreloader(directorPhotos, 5);

    // Optimized auto-play with performance monitoring
    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % directorPhotos.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [directorPhotos.length, isAutoPlay]);

    // Smart preloading of next and previous images
    useEffect(() => {
        const preloadAdjacentImages = () => {
            const nextIndex = (currentPhotoIndex + 1) % directorPhotos.length;
            const prevIndex = (currentPhotoIndex - 1 + directorPhotos.length) % directorPhotos.length;

            [nextIndex, prevIndex].forEach(index => {
                if (!preloadedImages.has(directorPhotos[index])) {
                    const img = new Image();
                    img.src = directorPhotos[index];
                }
            });
        };

        preloadAdjacentImages();
    }, [currentPhotoIndex, directorPhotos, preloadedImages]);

    // Enhanced navigation handlers with performance optimization
    const goToNext = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('right');
        setCurrentPhotoIndex((prev) => (prev + 1) % directorPhotos.length);
        setTimeout(() => setIsTransitioning(false), 300);
    }, [directorPhotos.length, isTransitioning]);

    const goToPrev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideDirection('left');
        setCurrentPhotoIndex((prev) => (prev - 1 + directorPhotos.length) % directorPhotos.length);
        setTimeout(() => setIsTransitioning(false), 300);
    }, [directorPhotos.length, isTransitioning]);

    const goToIndex = useCallback(
        (index: number) => {
            if (isTransitioning || index === currentPhotoIndex) return;
            setIsTransitioning(true);
            setSlideDirection(index > currentPhotoIndex ? 'right' : 'left');
            setCurrentPhotoIndex(index);
            setIsAutoPlay(false);
            setTimeout(() => setIsTransitioning(false), 300);
        },
        [currentPhotoIndex, isTransitioning],
    );

    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlay((prev) => !prev);
    }, []);

    // Optimized animation variants for smooth transitions
    const slideTransitionVariants = {
        enter: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction === 'right' ? 15 : -15,
            filter: 'blur(4px)',
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.4,
            },
        },
        exit: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? -1000 : 1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction === 'right' ? -15 : 15,
            filter: 'blur(4px)',
            transition: {
                duration: 0.3,
            },
        }),
    };

    // Container variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    // Thumbnail animation variants
    const thumbnailVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Header />

            {/* Hero Section with Enhanced Performance */}
            <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 py-16 sm:py-20 lg:py-24">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Powerful Gradient Title */}
                    <motion.div
                        className="mb-8 text-center sm:mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        <h1 className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-sm sm:text-5xl lg:text-6xl">
                            {t('nav.board_of_directors')}
                        </h1>
                        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                    </motion.div>

                    {/* Direct Photo Gallery Section */}
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        {/* Enhanced Photo Display with Advanced Optimizations */}
                        <div className="mb-8 sm:mb-12">
                            <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-0">
                                {/* Responsive Photo Container with Performance Optimizations */}
                                <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-lg sm:rounded-2xl">
                                    {/* Optimized height for proportional photo display */}
                                    <div className="relative h-64 w-full sm:h-80 md:h-[400px] lg:h-[480px] xl:h-[520px]">
                                        <AnimatePresence mode="wait" custom={slideDirection}>
                                            <motion.div
                                                key={currentPhotoIndex}
                                                ref={imageRef}
                                                custom={slideDirection}
                                                variants={slideTransitionVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                className="absolute inset-0"
                                            >
                                                <OptimizedImage
                                                    src={directorPhotos[currentPhotoIndex]}
                                                    alt={`Director ${currentPhotoIndex + 1}`}
                                                    className="h-full w-full object-cover"
                                                    loading="eager"
                                                    priority={true}
                                                />
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Gradient overlay for better text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                                        {/* Photo Counter - Responsive positioning */}
                                        <div className="absolute right-3 bottom-3 rounded-lg bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm sm:right-4 sm:bottom-4 sm:px-3 sm:text-sm">
                                            {currentPhotoIndex + 1} / {directorPhotos.length}
                                        </div>

                                        {/* Navigation Arrows - Enhanced with smooth animations */}
                                        <motion.button
                                            onClick={goToPrev}
                                            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm sm:left-4 sm:p-2"
                                            aria-label="Previous photo"
                                            whileHover={{
                                                scale: 1.1,
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                transition: { duration: 0.2 },
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={isTransitioning}
                                        >
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </motion.button>
                                        <motion.button
                                            onClick={goToNext}
                                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm sm:right-4 sm:p-2"
                                            aria-label="Next photo"
                                            whileHover={{
                                                scale: 1.1,
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                transition: { duration: 0.2 },
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            disabled={isTransitioning}
                                        >
                                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Enhanced Controls with Smooth Animations */}
                                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                                    <motion.button
                                        onClick={toggleAutoPlay}
                                        className={`rounded-lg px-3 py-2 text-xs font-medium sm:px-4 sm:text-sm ${
                                            isAutoPlay ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700'
                                        }`}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={isTransitioning}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isAutoPlay ? (
                                                <>
                                                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                                    </svg>
                                                    <span>{t('board_of_directors.pause')}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                    <span>{t('board_of_directors.play')}</span>
                                                </>
                                            )}
                                        </div>
                                    </motion.button>
                                    
                                    <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                                        <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                        <span>{t('board_of_directors.auto_change_text')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Thumbnail Gallery with Performance Optimizations */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="mt-8 sm:mt-12"
                        >
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                                {directorPhotos.map((photo, index) => (
                                    <motion.div
                                        key={index}
                                        variants={thumbnailVariants}
                                        className="group relative cursor-pointer overflow-hidden rounded-lg"
                                        onClick={() => goToIndex(index)}
                                    >
                                        <OptimizedImage
                                            src={photo}
                                            alt={`Director ${index + 1} thumbnail`}
                                            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        
                                        {/* Active indicator */}
                                        {index === currentPhotoIndex && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute inset-0 rounded-lg border-2 border-yellow-500 bg-yellow-500/20"
                                            >
                                                <div className="absolute right-1 top-1 rounded-full bg-yellow-500 p-0.5">
                                                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        )}
                                        
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BoardOfDirectors;

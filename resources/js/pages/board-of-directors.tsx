import { useTranslation } from '@/hooks/useTranslation';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Simple Optimized Image Component for thumbnails only
const OptimizedThumbnail = ({
    src,
    alt,
    className,
}: {
    src: string;
    alt: string;
    className: string;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
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
            { threshold: 0.1, rootMargin: '50px' },
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

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
            {/* Loading skeleton */}
            {!isLoaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />}

            {/* Progressive image loading */}
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={handleLoad}
                    style={{
                        willChange: 'opacity',
                        transform: 'translateZ(0)',
                    }}
                />
            )}
        </div>
    );
};



const BoardOfDirectors = () => {
    const { t } = useTranslation();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
    const [isTransitioning, setIsTransitioning] = useState(false);

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

    // Preload first few images immediately
    useEffect(() => {
        // Preload first 3 images immediately
        directorPhotos.slice(0, 3).forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [directorPhotos]);

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

            [nextIndex, prevIndex].forEach((index) => {
                const img = new Image();
                img.src = directorPhotos[index];
            });
        };

        preloadAdjacentImages();
    }, [currentPhotoIndex, directorPhotos]);

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
                    {/* Hero Content */}
                    <motion.div
                        className="mx-auto max-w-4xl text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-sm sm:text-5xl lg:text-6xl">
                            {t('nav.board_of_directors')}
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-700 sm:text-xl">
                            {t('board_of_directors.vision_text')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Gallery Section */}
            <section className="py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Controls */}
                    <motion.div
                        className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.button
                            onClick={toggleAutoPlay}
                            className={`rounded-lg px-4 py-2 text-sm font-medium ${
                                isAutoPlay ? 'bg-yellow-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center gap-2">
                                {isAutoPlay ? (
                                    <>
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                        <span>{t('board_of_directors.pause')}</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span>{t('board_of_directors.play')}</span>
                                    </>
                                )}
                            </div>
                        </motion.button>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>{t('board_of_directors.auto_change_text')}</span>
                        </div>
                    </motion.div>

                    {/* Main Photo Display */}
                    <div className="mx-auto max-w-4xl">
                        <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
                            {/* Main Image - DIRECT LOADING FOR IMMEDIATE DISPLAY */}
                            <AnimatePresence mode="wait" custom={slideDirection}>
                                <motion.div
                                    key={currentPhotoIndex}
                                    custom={slideDirection}
                                    variants={slideTransitionVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="relative h-64 sm:h-80 md:h-[400px] lg:h-[480px] xl:h-[520px]"
                                >
                                    <img
                                        src={directorPhotos[currentPhotoIndex]}
                                        alt={`Director ${currentPhotoIndex + 1}`}
                                        className="h-full w-full object-cover"
                                        loading="eager"
                                        decoding="async"
                                        style={{
                                            willChange: 'transform',
                                            transform: 'translateZ(0)',
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <motion.button
                                onClick={goToPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70 hover:scale-110"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={isTransitioning}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>

                            <motion.button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70 hover:scale-110"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={isTransitioning}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>

                            {/* Photo Counter */}
                            <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
                                {currentPhotoIndex + 1}/{directorPhotos.length}
                            </div>
                        </div>

                        {/* Enhanced Thumbnail Gallery with Performance Optimizations */}
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8 sm:mt-12">
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                                {directorPhotos.map((photo, index) => (
                                    <motion.div
                                        key={index}
                                        variants={thumbnailVariants}
                                        className="group relative cursor-pointer overflow-hidden rounded-lg"
                                        onClick={() => goToIndex(index)}
                                    >
                                        <OptimizedThumbnail
                                            src={photo}
                                            alt={`Director ${index + 1}`}
                                            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />

                                        {/* Active indicator */}
                                        {index === currentPhotoIndex && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute inset-0 rounded-lg border-2 border-yellow-500 bg-yellow-500/20"
                                            >
                                                <div className="absolute top-1 right-1 rounded-full bg-yellow-500 p-0.5">
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

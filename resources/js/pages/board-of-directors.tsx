import { useTranslation } from '@/hooks/useTranslation';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const BoardOfDirectors = () => {
    const { t } = useTranslation();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    // Optimized photo array - smaller selection for better performance
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

    // Optimized auto-play with pause capability
    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % directorPhotos.length);
        }, 4000); // Reduced to 4 seconds

        return () => clearInterval(interval);
    }, [directorPhotos.length, isAutoPlay]);

    // Preload next image for smooth transitions
    useEffect(() => {
        const nextIndex = (currentPhotoIndex + 1) % directorPhotos.length;
        const img = new Image();
        img.src = directorPhotos[nextIndex];
    }, [currentPhotoIndex, directorPhotos]);

    // Enhanced navigation handlers with smooth transitions
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
            setIsAutoPlay(false); // Pause auto-play when user manually selects
            setTimeout(() => setIsTransitioning(false), 300);
        },
        [currentPhotoIndex, isTransitioning],
    );

    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlay((prev) => !prev);
    }, []);

    // Optimized animation variants for smooth transitions
    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
    };

    const slideVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
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

    // Ultra-smooth slide transitions for gallery
    const slideTransitionVariants = {
        enter: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? 500 : -500,
            opacity: 0,
            scale: 0.85,
            rotateY: direction === 'right' ? 20 : -20,
            filter: 'blur(8px)',
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: 'easeInOut',
                scale: {
                    duration: 0.7,
                    ease: 'easeOut',
                },
                rotateY: {
                    duration: 0.6,
                    ease: 'easeInOut',
                },
                filter: {
                    duration: 0.5,
                    ease: 'easeInOut',
                },
            },
        },
        exit: (direction: 'left' | 'right') => ({
            x: direction === 'right' ? -500 : 500,
            opacity: 0,
            scale: 0.85,
            rotateY: direction === 'right' ? -20 : 20,
            filter: 'blur(8px)',
            transition: {
                duration: 0.6,
                ease: 'easeInOut',
            },
        }),
    };

    // Thumbnail animation variants
    const thumbnailVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 },
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Enhanced Gallery Section with Powerful Gradient Title */}
            <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Powerful Gradient Title */}
                    <motion.div
                        className="mb-8 text-center sm:mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <h1 className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-sm sm:text-5xl lg:text-6xl">
                            {t('nav.board_of_directors')}
                        </h1>
                        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                    </motion.div>

                    {/* Direct Photo Gallery Section */}
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        {/* Enhanced Photo Display with Smooth Transitions */}
                        <div className="mb-8 sm:mb-12">
                            <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-0">
                                {/* Responsive Photo Container with Smooth Transitions */}
                                <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-lg sm:rounded-2xl">
                                    {/* Optimized height for proportional photo display */}
                                    <div className="relative h-64 w-full sm:h-80 md:h-[400px] lg:h-[480px] xl:h-[520px]">
                                        <AnimatePresence mode="wait" custom={slideDirection}>
                                            <motion.img
                                                key={currentPhotoIndex}
                                                ref={imageRef}
                                                src={directorPhotos[currentPhotoIndex]}
                                                alt={`Director ${currentPhotoIndex + 1}`}
                                                className="absolute inset-0 h-full w-full object-cover"
                                                loading="lazy"
                                                style={{
                                                    objectPosition: 'center 20%', // Focus on face area
                                                    transformStyle: 'preserve-3d', // Enable 3D transforms
                                                }}
                                                custom={slideDirection}
                                                variants={slideTransitionVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                            />
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
                                        <span className="flex items-center gap-1">
                                            <motion.span animate={{ rotate: isAutoPlay ? 0 : 0 }} transition={{ duration: 0.3 }}>
                                                {isAutoPlay ? '⏸️' : '▶️'}
                                            </motion.span>
                                            <span className="hidden sm:inline">
                                                {isAutoPlay ? t('board_of_directors.pause') : t('board_of_directors.play')}{' '}
                                                {t('board_of_directors.auto')}
                                            </span>
                                            <span className="sm:hidden">
                                                {isAutoPlay ? t('board_of_directors.pause') : t('board_of_directors.play')}
                                            </span>
                                        </span>
                                    </motion.button>
                                    <motion.span
                                        className="text-xs text-gray-500 sm:text-sm"
                                        animate={{ opacity: isTransitioning ? 0.5 : 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {t('board_of_directors.auto_change_text')}
                                    </motion.span>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Thumbnail Grid with Smooth Animations */}
                        <motion.div
                            className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {directorPhotos.map((photo, index) => (
                                <motion.div
                                    key={index}
                                    variants={thumbnailVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`group relative aspect-square cursor-pointer overflow-hidden rounded-lg ${
                                        currentPhotoIndex === index ? 'shadow-lg ring-2 ring-yellow-500 sm:ring-3' : ''
                                    }`}
                                    onClick={() => goToIndex(index)}
                                    style={{
                                        pointerEvents: isTransitioning ? 'none' : 'auto',
                                    }}
                                >
                                    <motion.img
                                        src={photo}
                                        alt={`Director ${index + 1}`}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        style={{
                                            objectPosition: 'center 20%', // Focus on face area
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Enhanced overlay with smooth animations */}
                                    <AnimatePresence>
                                        {currentPhotoIndex !== index && (
                                            <motion.div
                                                className="absolute inset-0 bg-black/20"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* Active indicator with smooth animations */}
                                    <AnimatePresence>
                                        {currentPhotoIndex === index && (
                                            <motion.div
                                                className="absolute top-1 right-1"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                                            >
                                                <div className="rounded-full bg-yellow-500 p-1 shadow-lg">
                                                    <svg className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Hover indicator with smooth animations */}
                                    <AnimatePresence>
                                        {currentPhotoIndex !== index && (
                                            <motion.div
                                                className="absolute inset-0 flex items-center justify-center"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <motion.div
                                                    className="rounded-full bg-black/50 p-1 backdrop-blur-sm"
                                                    initial={{ scale: 0.8 }}
                                                    whileHover={{ scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Simplified Vision Statement Section */}
            <section className="bg-gray-900 py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div variants={fadeVariants} initial="hidden" animate="visible" className="text-center">
                        <h2 className="mb-6 text-3xl font-bold text-white">{t('board_of_directors.vision_title')}</h2>
                        <p className="mx-auto max-w-3xl text-lg text-gray-300">{t('board_of_directors.vision_text')}</p>

                        <div className="mt-8">
                            <div className="inline-flex items-center rounded-full bg-yellow-500 px-6 py-3 font-medium text-white transition-colors hover:bg-yellow-600">
                                <span>{t('board_of_directors.excellence_text')}</span>
                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BoardOfDirectors;

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';

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

// Optimized image arrays - using original files with advanced optimization
const heroImage = '/papua-children.png';

const galeriPoso = [
    '/galeri-poso1.png',
    '/galeri-poso2.png',
    '/galeri-poso3.png',
    '/galeri-poso4.png',
    '/galeri-poso5.png',
];

const galeriPapua = [
    '/galeri-papua1.png',
    '/galeri-papua2.png',
    '/galeri-papua3.png',
    '/galeri-papua4.png',
];

const galeriMenara = [
    '/galeri-menara1.jpeg',
    '/galeri-menara2.jpeg',
    '/galeri-menara3.jpeg',
    '/galeri-menara4.jpeg',
    '/galeri-menara5.jpeg',
    '/galeri-menara6.jpeg',
];

const galeriPapua2 = [
    '/galeri-papua2-1.jpeg',
    '/galeri-papua2-2.jpeg',
    '/galeri-papua2-3.jpeg',
    '/galeri-papua2-4.jpeg',
    '/galeri-papua2-5.jpeg',
];

// Gabungkan data galeri ke satu array dengan optimasi
const gallerySections = [
    {
        title: 'CSR Activities 2025 - Latest Updates',
        description:
            'Latest corporate social responsibility activities by PT Kristalin Ekalestari including food distribution, infrastructure development, and community empowerment programs.',
        images: [
            '/WhatsApp Image 2025-07-20 at 09.57.47 (2).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.47 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.47.jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.46 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.46.jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.45 (2).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.45 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.45.jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.44 (3).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.44 (2).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.44 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 09.57.44.jpeg',
        ],
    },
    {
        title: 'Community Development Programs 2025',
        description:
            "Comprehensive community development programs including computer training, music equipment assistance, organic farming training, and children's playground construction.",
        images: [
            '/WhatsApp Image 2025-07-20 at 10.39.03.jpeg',
            '/WhatsApp Image 2025-07-20 at 10.39.02 (2).jpeg',
            '/WhatsApp Image 2025-07-20 at 10.39.02 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 10.39.02.jpeg',
            '/WhatsApp Image 2025-07-20 at 10.39.01 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 10.39.01.jpeg',
            '/WhatsApp Image 2025-07-20 at 10.39.00 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 10.39.00.jpeg',
            '/WhatsApp Image 2025-07-20 at 10.38.58 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 10.38.58.jpeg',
            '/WhatsApp Image 2025-07-20 at 10.38.57.jpeg',
            '/WhatsApp Image 2025-07-20 at 10.38.56.jpeg',
        ],
    },
    {
        title: '3.000 Groceries for Poso People',
        description:
            'PT Kristalin Ekalestari distributed 3,000 groceries to help Poso people in need, as a form of corporate social responsibility.',
        images: galeriPoso,
    },
    {
        title: 'Papua Community Development',
        description:
            'Sustainable development programs for Papua communities including education, healthcare, and economic empowerment.',
        images: galeriPapua,
    },
    {
        title: 'Office and Infrastructure',
        description:
            'Modern office facilities and infrastructure development supporting our mining operations and community programs.',
        images: galeriMenara,
    },
    {
        title: 'Papua Mining Operations',
        description:
            'Responsible mining operations in Papua with focus on environmental sustainability and community development.',
        images: galeriPapua2,
    },
];

// Testimonial data
const testimonials = [
    {
        name: 'Maria Erari',
        role: 'Community Leader, Papua',
        photo: '/prfl.png',
        quote: 'The support from PT Kristalin Ekalestari has been incredible. Our community now has better access to basic necessities.',
    },
    {
        name: 'Andrian Lubis',
        role: 'Senior Manager, Finance Division',
        photo: '/prfl.png',
        quote: 'We are committed to sustainable development and community empowerment through our CSR programs.',
    },
];

const CSR = () => {
    const { t } = useTranslation();
    const [currentSection, setCurrentSection] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Advanced preloading strategy for critical images
    const allImages = gallerySections.flatMap(section => section.images);
    const preloadedImages = useImagePreloader(allImages, 8);

    // Preload hero image immediately
    useEffect(() => {
        const img = new Image();
        img.src = heroImage;
    }, []);

    // Auto-play testimonials
    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlay]);

    // Auto-play gallery sections
    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentSection((prev) => (prev + 1) % gallerySections.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlay]);

    // Smart preloading of next section images
    useEffect(() => {
        const nextSection = (currentSection + 1) % gallerySections.length;
        const nextImages = gallerySections[nextSection].images.slice(0, 4);

        nextImages.forEach(imgSrc => {
            if (!preloadedImages.has(imgSrc)) {
                const img = new Image();
                img.src = imgSrc;
            }
        });
    }, [currentSection, preloadedImages]);

    const goToSection = useCallback((index: number) => {
        if (isTransitioning || index === currentSection) return;
        setIsTransitioning(true);
        setCurrentSection(index);
        setIsAutoPlay(false);
        setTimeout(() => setIsTransitioning(false), 300);
    }, [currentSection, isTransitioning]);

    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlay((prev) => !prev);
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
                            {t('pages.csr.hero.title')}
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-700 sm:text-xl">
                            {t('pages.csr.hero.description')}
                        </p>
                    </motion.div>

                    {/* Hero Image with Advanced Optimization */}
                    <motion.div
                        className="mx-auto mt-12 max-w-5xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <OptimizedImage
                                src={heroImage}
                                alt={t('pages.csr.hero.alt_text')}
                                className="h-full w-full object-cover"
                                loading="eager"
                                priority={true}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section with Performance Optimizations */}
            <section className="py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Controls */}
                    <motion.div
                        className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
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
                                        <span>Pause Auto</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span>Play Auto</span>
                                    </>
                                )}
                            </div>
                        </motion.button>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>Changes every 6 seconds</span>
                        </div>
                    </motion.div>

                    {/* Gallery Content */}
                    <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-6xl"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                {gallerySections[currentSection].title}
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                {gallerySections[currentSection].description}
                            </p>
                        </div>

                        {/* Optimized Image Grid */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {gallerySections[currentSection].images.map((image, imgIdx) => (
                                <motion.div
                                    key={imgIdx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: imgIdx * 0.1 }}
                                    className="group relative overflow-hidden rounded-lg"
                                >
                                    <OptimizedImage
                                        src={image}
                                        alt={`CSR Activity ${imgIdx + 1}`}
                                        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Section Navigation */}
                    <motion.div
                        className="mt-8 flex justify-center"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex gap-2">
                            {gallerySections.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => goToSection(index)}
                                    className={`h-3 w-3 rounded-full transition-colors ${
                                        index === currentSection ? 'bg-yellow-500' : 'bg-gray-300'
                                    }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.8 }}
                                    disabled={isTransitioning}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-900 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            {t('pages.csr.testimonials.title')}
                        </h2>
                        <p className="mt-4 text-lg text-gray-300">
                            {t('pages.csr.testimonials.subtitle')}
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-12"
                        key={currentTestimonial}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center">
                            <OptimizedImage
                                src={testimonials[currentTestimonial].photo}
                                alt={testimonials[currentTestimonial].name}
                                className="mx-auto h-20 w-20 rounded-full object-cover"
                                loading="eager"
                            />
                            <blockquote className="mt-6 text-xl text-white">
                                "{testimonials[currentTestimonial].quote}"
                            </blockquote>
                            <div className="mt-4">
                                <p className="text-lg font-semibold text-yellow-400">
                                    {testimonials[currentTestimonial].name}
                                </p>
                                <p className="text-gray-400">
                                    {testimonials[currentTestimonial].role}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CSR;

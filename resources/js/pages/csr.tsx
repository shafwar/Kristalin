import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';

// Optimized image arrays with WebP/AVIF support
const heroImage = '/papua-children.png';

const galeriPoso = [
    { original: '/galeri-poso1.png', webp: '/galeri-poso1.webp', avif: '/galeri-poso1.avif', alt: 'Poso Gallery 1' },
    { original: '/galeri-poso2.png', webp: '/galeri-poso2.webp', avif: '/galeri-poso2.avif', alt: 'Poso Gallery 2' },
    { original: '/galeri-poso3.png', webp: '/galeri-poso3.webp', avif: '/galeri-poso3.avif', alt: 'Poso Gallery 3' },
    { original: '/galeri-poso4.png', webp: '/galeri-poso4.webp', avif: '/galeri-poso4.avif', alt: 'Poso Gallery 4' },
    { original: '/galeri-poso5.png', webp: '/galeri-poso5.webp', avif: '/galeri-poso5.avif', alt: 'Poso Gallery 5' },
];

const galeriPapua = [
    { original: '/galeri-papua1.png', webp: '/galeri-papua1.webp', avif: '/galeri-papua1.avif', alt: 'Papua Gallery 1' },
    { original: '/galeri-papua2.png', webp: '/galeri-papua2.webp', avif: '/galeri-papua2.avif', alt: 'Papua Gallery 2' },
    { original: '/galeri-papua3.png', webp: '/galeri-papua3.webp', avif: '/galeri-papua3.avif', alt: 'Papua Gallery 3' },
    { original: '/galeri-papua4.png', webp: '/galeri-papua4.webp', avif: '/galeri-papua4.avif', alt: 'Papua Gallery 4' },
];

const galeriMenara = [
    { original: '/galeri-menara1.jpeg', webp: '/galeri-menara1.webp', avif: '/galeri-menara1.avif', alt: 'Menara Gallery 1' },
    { original: '/galeri-menara2.jpeg', webp: '/galeri-menara2.webp', avif: '/galeri-menara2.avif', alt: 'Menara Gallery 2' },
    { original: '/galeri-menara3.jpeg', webp: '/galeri-menara3.webp', avif: '/galeri-menara3.avif', alt: 'Menara Gallery 3' },
    { original: '/galeri-menara4.jpeg', webp: '/galeri-menara4.webp', avif: '/galeri-menara4.avif', alt: 'Menara Gallery 4' },
    { original: '/galeri-menara5.jpeg', webp: '/galeri-menara5.webp', avif: '/galeri-menara5.avif', alt: 'Menara Gallery 5' },
    { original: '/galeri-menara6.jpeg', webp: '/galeri-menara6.webp', avif: '/galeri-menara6.avif', alt: 'Menara Gallery 6' },
];

const galeriPapua2 = [
    { original: '/galeri-papua2-1.jpeg', webp: '/galeri-papua2-1.webp', avif: '/galeri-papua2-1.avif', alt: 'Papua 2 Gallery 1' },
    { original: '/galeri-papua2-2.jpeg', webp: '/galeri-papua2-2.webp', avif: '/galeri-papua2-2.avif', alt: 'Papua 2 Gallery 2' },
    { original: '/galeri-papua2-3.jpeg', webp: '/galeri-papua2-3.webp', avif: '/galeri-papua2-3.avif', alt: 'Papua 2 Gallery 3' },
    { original: '/galeri-papua2-4.jpeg', webp: '/galeri-papua2-4.webp', avif: '/galeri-papua2-4.avif', alt: 'Papua 2 Gallery 4' },
    { original: '/galeri-papua2-5.jpeg', webp: '/galeri-papua2-5.webp', avif: '/galeri-papua2-5.avif', alt: 'Papua 2 Gallery 5' },
];

// Optimized Picture Component for modern image formats
const OptimizedPicture = ({ photo, className, alt, loading = 'lazy' }: {
    photo: { original: string; webp: string; avif: string; alt: string } | string;
    className: string;
    alt: string;
    loading?: 'lazy' | 'eager';
}) => {
    if (typeof photo === 'string') {
        return (
            <img
                src={photo}
                alt={alt}
                className={className}
                loading={loading}
                decoding="async"
            />
        );
    }
    
    return (
        <picture>
            <source srcSet={photo.avif} type="image/avif" />
            <source srcSet={photo.webp} type="image/webp" />
            <img
                src={photo.original}
                alt={alt}
                className={className}
                loading={loading}
                decoding="async"
            />
        </picture>
    );
};

// Gabungkan data galeri ke satu array
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
            '/WhatsApp Image 2025-07-20 at 10.38.55 (1).jpeg',
            '/WhatsApp Image 2025-07-20 at 10.38.55.jpeg',
            '/WhatsApp Image 2025-07-20 at 10.38.54.jpeg',
        ],
    },
    {
        title: '3.000 Groceries for Poso People',
        description: 'PT Kristalin Ekalestari distributed 3,000 groceries to help Poso people in need, as a form of corporate social responsibility.',
        images: galeriPoso,
    },
    {
        title: 'CSR Activities for Papua',
        description:
            'Various social activities for the people of Papua, ranging from food aid, education, to support for sports and social activities.',
        images: galeriPapua,
    },
    {
        title: "Food Distribution for 'Menara 165' Employees",
        description: 'Distribution of food packages to Menara 165 employees as a form of company support in difficult times.',
        images: galeriMenara,
    },
    {
        title: 'Food Distribution for Papua',
        description: 'Distribution of food aid and basic needs for the Papuan people in various villages and regions.',
        images: galeriPapua2,
    },
];

// Testimonials data
const testimonials = [
    {
        name: 'Maria Wamena',
        role: 'Community Leader, Papua',
        photo: '/prfl.png',
        quote: 'The support from PT Kristalin Ekalestari has been incredible. Our community now has better access to basic necessities.',
    },
    {
        name: 'Ahmad Saputra',
        role: 'Village Head, Poso',
        photo: '/prfl.png',
        quote: "This CSR program has made a real difference in our people's lives. We are grateful for their continuous support.",
    },
    {
        name: 'Sarah Numberi',
        role: 'Teacher, Nabire',
        photo: '/prfl.png',
        quote: 'The educational support and supplies have helped our children learn better. Thank you for believing in our future.',
    },
];

// Removed unused teamMembers to fix ESLint errors

// Video Section Component - MOBILE OPTIMIZED
function VideoSection({ t }: { t: (key: string) => string }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section
            className="relative bg-cover bg-center py-16 sm:py-20"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${heroImage}')` }}
        >
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <motion.div
                    className="mb-8 text-center sm:mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.h2
                        className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl md:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    >
                        {t('pages.csr.video_section.title')}
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-2xl text-sm text-gray-300 sm:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    >
                        {t('pages.csr.video_section.description')}
                    </motion.p>
                </motion.div>

                <div className="relative overflow-hidden rounded-xl bg-black shadow-2xl sm:rounded-2xl">
                    <div className="relative aspect-video">
                        {isPlaying ? (
                            <iframe
                                src="https://www.youtube.com/embed/Lq_nOhXVt4g?autoplay=1"
                                title={t('pages.csr.video_section.video_title')}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                <img
                                    src="https://img.youtube.com/vi/Lq_nOhXVt4g/maxresdefault.jpg"
                                    alt={t('pages.csr.video_section.thumbnail_alt')}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <button
                                        onClick={() => setIsPlaying(true)}
                                        className="flex h-14 w-14 transform items-center justify-center rounded-full bg-amber-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-amber-600 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                                    >
                                        <svg className="ml-1 h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Testimonials Component - MOBILE OPTIMIZED
function TestimonialsCarousel({
    testimonials,
    t,
}: {
    testimonials: Array<{ name: string; role: string; photo: string; quote: string }>;
    t: (key: string) => string;
}) {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <motion.div
                    className="mb-8 text-center sm:mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.h2
                        className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    >
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                            {t('pages.csr.testimonials.title_line1')}
                        </span>
                        <span className="text-black"> {t('pages.csr.testimonials.title_line2')}</span>
                    </motion.h2>
                    <motion.p
                        className="text-sm text-gray-600 sm:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    >
                        {t('pages.csr.testimonials.description')}
                    </motion.p>
                </motion.div>

                <div className="relative">
                    <div className="rounded-xl border-l-4 border-amber-400 bg-white p-6 shadow-xl sm:rounded-2xl sm:p-8">
                        <div className="mb-4 flex items-center sm:mb-6">
                            <img
                                src={testimonials[currentTestimonial].photo}
                                alt={testimonials[currentTestimonial].name}
                                className="mr-3 h-12 w-12 rounded-full border-4 border-amber-200 object-cover sm:mr-4 sm:h-16 sm:w-16"
                                loading="eager"
                                decoding="async"
                            />
                            <div>
                                <div className="text-sm font-semibold text-gray-800 sm:text-base">{testimonials[currentTestimonial].name}</div>
                                <div className="text-xs text-amber-600 sm:text-sm">{testimonials[currentTestimonial].role}</div>
                            </div>
                        </div>

                        <blockquote className="text-base leading-relaxed text-gray-700 italic sm:text-lg">
                            "{testimonials[currentTestimonial].quote}"
                        </blockquote>
                    </div>

                    <div className="mt-4 flex justify-center gap-2 sm:mt-6">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonial(idx)}
                                className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
                                    idx === currentTestimonial ? 'w-6 bg-amber-500 sm:w-8' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Enhanced Gallery Component - MOBILE OPTIMIZED
function GalleryShowcaseCarousel({ sections, t }: { sections: typeof gallerySections; t: (key: string) => string }) {
    const [current, setCurrent] = useState(0);
    const [imgIdx, setImgIdx] = useState(0);

    const next = () => setCurrent((c) => (c + 1) % sections.length);
    const prev = () => setCurrent((c) => (c - 1 + sections.length) % sections.length);

    useEffect(() => {
        setImgIdx(0);
    }, [current]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setImgIdx((i) => (i === sections[current].images.length - 1 ? 0 : i + 1));
        }, 3000);
        return () => clearTimeout(timer);
    }, [imgIdx, current, sections]);

    return (
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-12">
            <div className="flex flex-col items-center gap-8 sm:gap-12 md:flex-row">
                {/* Text Section - MOBILE OPTIMIZED */}
                <div className="flex flex-1 flex-col items-center justify-center text-center md:items-start md:text-left">
                    <div className="mb-2 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-xs font-semibold tracking-wider text-transparent uppercase sm:mb-3 sm:text-sm">
                        {t('pages.csr.csr_activity_label')}
                    </div>
                    <h2 className="mb-3 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-xl leading-tight font-bold text-transparent sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
                        {sections[current].title}
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg lg:text-xl">
                        {sections[current].description}
                    </p>
                </div>

                {/* Image Section - MOBILE OPTIMIZED */}
                <div className="w-full flex-1">
                    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-64 sm:rounded-2xl md:h-72 lg:h-80">
                        <OptimizedPicture
                            photo={sections[current].images[imgIdx]}
                            alt={sections[current].title + ' ' + (imgIdx + 1)}
                            className="h-full w-full object-cover"
                            loading="eager"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Controls - MOBILE OPTIMIZED */}
            <div className="mt-6 flex items-center justify-center gap-3 sm:mt-10 sm:gap-6">
                <button
                    onClick={prev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white/80 shadow transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 sm:h-12 sm:w-12"
                    aria-label="Previous Section"
                    type="button"
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="flex gap-2 sm:gap-3">
                    {sections.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 md:h-4 md:w-4 ${
                                idx === current ? 'w-4 bg-gradient-to-r from-amber-500 to-yellow-600 sm:w-6 md:w-8' : 'bg-gray-300 hover:bg-amber-300'
                            }`}
                            aria-label={`Go to section ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white/80 shadow transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 sm:h-12 sm:w-12"
                    aria-label="Next Section"
                    type="button"
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function CSRPageMobileFix() {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);

    // Preload hero image for faster loading
    useEffect(() => {
        const heroImg = new Image();
        heroImg.src = heroImage;
        heroImg.loading = 'eager';
    }, []);
    const commitmentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLearnMore = () => {
        commitmentRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Get translated gallery sections
    const translatedGallerySections = [
        {
            title: t('pages.csr.gallery_sections.0.title'),
            description: t('pages.csr.gallery_sections.0.description'),
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
            title: t('pages.csr.gallery_sections.1.title'),
            description: t('pages.csr.gallery_sections.1.description'),
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
                '/WhatsApp Image 2025-07-20 at 10.38.55 (1).jpeg',
                '/WhatsApp Image 2025-07-20 at 10.38.55.jpeg',
                '/WhatsApp Image 2025-07-20 at 10.38.54.jpeg',
            ],
        },
        {
            title: t('pages.csr.gallery_sections.2.title'),
            description: t('pages.csr.gallery_sections.2.description'),
            images: galeriPoso,
        },
        {
            title: t('pages.csr.gallery_sections.3.title'),
            description: t('pages.csr.gallery_sections.3.description'),
            images: galeriPapua,
        },
        {
            title: t('pages.csr.gallery_sections.4.title'),
            description: t('pages.csr.gallery_sections.4.description'),
            images: galeriMenara,
        },
        {
            title: t('pages.csr.gallery_sections.5.title'),
            description: t('pages.csr.gallery_sections.5.description'),
            images: galeriPapua2,
        },
    ];

    // Get translated testimonials
    const translatedTestimonials = [
        {
            name: t('pages.csr.testimonials.data.0.name'),
            role: t('pages.csr.testimonials.data.0.role'),
            photo: '/prfl.png',
            quote: t('pages.csr.testimonials.data.0.quote'),
        },
        {
            name: t('pages.csr.testimonials.data.1.name'),
            role: t('pages.csr.testimonials.data.1.role'),
            photo: '/prfl.png',
            quote: t('pages.csr.testimonials.data.1.quote'),
        },
        {
            name: t('pages.csr.testimonials.data.2.name'),
            role: t('pages.csr.testimonials.data.2.role'),
            photo: '/prfl.png',
            quote: t('pages.csr.testimonials.data.2.quote'),
        },
    ];

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
                        src={heroImage} 
                        alt={t('pages.csr.hero.alt_text')} 
                        className="h-full w-full object-cover"
                        loading="eager"
                        decoding="async"
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
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                        {/* MOBILE RESPONSIVE HEADING */}
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
                                {t('pages.csr.hero.title_line1')}
                            </motion.span>
                            <br />
                            <motion.span
                                className="text-white"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
                            >
                                {t('pages.csr.hero.title_line2')}
                            </motion.span>
                        </motion.h1>

                        {/* MOBILE RESPONSIVE DESCRIPTION */}
                        <motion.p
                            className="mx-auto mb-8 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                        >
                            {t('pages.csr.hero.description')}
                        </motion.p>

                        {/* MOBILE RESPONSIVE BUTTON */}
                        <motion.div
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
                        >
                            <motion.button
                                onClick={handleLearnMore}
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 20px 40px rgba(251, 191, 36, 0.4)',
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                    {t('pages.csr.hero.learn_more_btn')}
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

            {/* Commitment Section - MOBILE OPTIMIZED */}
            <section ref={commitmentRef} className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.div
                        className="mb-4 h-1 w-12 rounded-full bg-amber-400 sm:mb-6 sm:w-16"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    />
                    <motion.h2
                        className="mb-4 text-2xl leading-tight font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-6xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                        >
                            {t('pages.csr.commitment.title_line1')}
                        </motion.span>
                        <br />
                        <motion.span
                            className="text-gray-800"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                        >
                            {t('pages.csr.commitment.title_line2')}
                        </motion.span>
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg lg:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
                    >
                        {t('pages.csr.commitment.description')}
                    </motion.p>
                </motion.div>
            </section>

            {/* Main Content */}
            <main className="bg-white py-16 sm:py-20">
                <motion.div
                    className="mb-12 px-4 text-center sm:mb-16 sm:px-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.h2
                        className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    >
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                            {t('pages.csr.programs.title_line1')}
                        </span>
                        <span className="text-black"> {t('pages.csr.programs.title_line2')}</span>
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    >
                        {t('pages.csr.programs.description')}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                >
                    <GalleryShowcaseCarousel sections={translatedGallerySections} t={t} />
                </motion.div>
            </main>

            {/* Video Section - MOBILE OPTIMIZED */}
            <VideoSection t={t} />

            {/* Testimonials - MOBILE OPTIMIZED */}
            <TestimonialsCarousel testimonials={translatedTestimonials} t={t} />

            <Footer />
        </div>
    );
}

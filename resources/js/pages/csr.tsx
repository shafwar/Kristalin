import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

const heroImage = imageUrl('papua-children.png');
const toImage = (path: string) => imageUrl(path);
const toImages = (paths: string[]) => paths.map(toImage);

// Video Section Component - MOBILE OPTIMIZED
function VideoSection({ t }: { t: (key: string) => string }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section
            className="relative bg-cover bg-fixed bg-center py-16 sm:py-20"
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

// CSR News Section Component
function CSRNewsSection({ t }: { t: (key: string) => string }) {
    const csrNews = [
        {
            id: 'feb-7',
            title: t('pages.csr.news.feb_7.title'),
            excerpt: t('pages.csr.news.feb_7.excerpt'),
            date: '4 Feb 2025',
            image: '/506paket1.jpg',
            category: t('pages.csr.categories.food_distribution'),
        },
        {
            id: 'jun-1',
            title: t('pages.csr.news.jun_1.title'),
            excerpt: t('pages.csr.news.jun_1.excerpt'),
            date: '26 Jun 2025',
            image: '/pendanaan1.jpg',
            category: t('pages.csr.categories.education_support'),
        },
        {
            id: 'jul-1',
            title: t('pages.csr.news.jul_1.title'),
            excerpt: t('pages.csr.news.jul_1.excerpt'),
            date: '8 Jul 2025',
            image: '/pembagian3.jpg',
            category: t('pages.csr.categories.food_distribution'),
        },
        {
            id: 'aug-4',
            title: t('pages.csr.news.aug_4.title'),
            excerpt: t('pages.csr.news.aug_4.excerpt'),
            date: '20 Aug 2025',
            image: '/agus1.jpg',
            category: t('pages.csr.categories.food_distribution'),
        },
        {
            id: 'mar-1',
            title: t('pages.csr.news.mar_1.title'),
            excerpt: t('pages.csr.news.mar_1.excerpt'),
            date: '19 Mar 2025',
            image: '/buruharian1.jpg',
            category: t('pages.csr.categories.house_construction'),
        },
        {
            id: 'aug-2',
            title: t('pages.csr.news.aug_2.title'),
            excerpt: t('pages.csr.news.aug_2.excerpt'),
            date: '19 Aug 2025',
            image: '/agus2.jpg',
            category: t('pages.csr.categories.house_construction'),
        },
    ].map((item) => ({ ...item, image: imageUrl(item.image) }));

    return (
        <section className="bg-gradient-to-r from-gray-50 to-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <motion.div
                    className="mb-12 text-center"
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
                            {t('pages.csr.news.title_line1')}
                        </span>
                        <span className="text-black"> {t('pages.csr.news.title_line2')}</span>
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    >
                        {t('pages.csr.news.description')}
                    </motion.p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {csrNews.map((news, index) => (
                        <motion.div
                            key={news.id}
                            className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.1 * index, ease: 'easeOut' }}
                        >
                            <Link href={`/news/${news.id}`} className="block">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">{news.category}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-2 text-xs text-gray-500">{news.date}</div>
                                    <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-600">
                                        {news.title}
                                    </h3>
                                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">{news.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{t('pages.csr.read_more')}</span>
                                        <div className="flex items-center text-amber-600 transition-colors group-hover:text-amber-700">
                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            <span className="text-sm font-medium">{t('pages.csr.read_full')}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
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
    }, [testimonials.length]);

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
function GalleryShowcaseCarousel({
    sections,
    t,
}: {
    sections: Array<{ title: string; description: string; images: string[] }>;
    t: (key: string) => string;
}) {
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
                        <motion.img
                            key={sections[current].images[imgIdx]}
                            src={sections[current].images[imgIdx]}
                            alt={sections[current].title + ' ' + (imgIdx + 1)}
                            className="h-full w-full object-cover"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
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
                    {sections.map((_, idx: number) => (
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
                '/pembangunan1.jpg',
                '/506paket2.jpeg',
                '/506paket3.jpg',
                '/pendanaan1.jpg',
                '/pembagian3.jpg',
                '/pemberitahuan1.jpg',
                '/agus1.jpg',
                '/agus2.jpg',
                '/agus3.jpg',
                '/buruharian1.jpg',
                '/506paket1.jpg',
                '/pembangunan3.jpg',
            ],
        },
        {
            title: t('pages.csr.gallery_sections.1.title'),
            description: t('pages.csr.gallery_sections.1.description'),
            images: [
                '/pendanaan1.jpg',
                '/506paket1.jpg',
                '/pembagian3.jpg',
                '/agus1.jpg',
                '/buruharian1.jpg',
                '/pembangunan1.jpg',
                '/pembangunan3.jpg',
                '/pembangunan5.jpg',
                '/pembangunan6.jpg',
                '/agus2.jpg',
                '/agus3.jpg',
                '/agus6.jpg',
            ],
        },
        {
            title: t('pages.csr.gallery_sections.2.title'),
            description: t('pages.csr.gallery_sections.2.description'),
            images: ['/506paket1.jpg', '/506paket2.jpeg', '/506paket3.jpg'],
        },
        {
            title: t('pages.csr.gallery_sections.3.title'),
            description: t('pages.csr.gallery_sections.3.description'),
            images: ['/pendanaan1.jpg'],
        },
        {
            title: t('pages.csr.gallery_sections.4.title'),
            description: t('pages.csr.gallery_sections.4.description'),
            images: ['/pembagian3.jpg', '/pemberitahuan1.jpg'],
        },
        {
            title: t('pages.csr.gallery_sections.5.title'),
            description: t('pages.csr.gallery_sections.5.description'),
            images: ['/agus1.jpg', '/agus2.jpg', '/agus3.jpg', '/agus6.jpg', '/agus7.jpg', '/agus8.jpg'],
        },
        {
            title: t('pages.csr.gallery_sections.6.title'),
            description: t('pages.csr.gallery_sections.6.description'),
            images: [
                '/buruharian1.jpg',
                '/pembangunan1.jpg',
                '/pembangunan3.jpg',
                '/pembangunan5.jpg',
                '/pembangunan6.jpg',
                '/pembangunandesanifasi2.jpg',
            ],
        },
        {
            title: t('pages.csr.gallery_sections.7.title'),
            description: t('pages.csr.gallery_sections.7.description'),
            images: ['/506paket1.jpg', '/506paket2.jpeg', '/506paket3.jpg'],
        },
        {
            title: t('pages.csr.gallery_sections.8.title'),
            description: t('pages.csr.gallery_sections.8.description'),
            images: ['/pendanaan1.jpg'],
        },
        {
            title: t('pages.csr.gallery_sections.9.title'),
            description: t('pages.csr.gallery_sections.9.description'),
            images: ['/pembagian3.jpg', '/pemberitahuan1.jpg'],
        },
        {
            title: t('pages.csr.gallery_sections.10.title'),
            description: t('pages.csr.gallery_sections.10.description'),
            images: ['/agus1.jpg', '/agus2.jpg', '/agus3.jpg', '/agus6.jpg', '/agus7.jpg', '/agus8.jpg'],
        },
    ].map((section) => ({ ...section, images: toImages(section.images) }));

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
    ].map((testimonial) => ({ ...testimonial, photo: toImage(testimonial.photo) }));

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
                    <img src={heroImage} alt={t('pages.csr.hero.alt_text')} className="h-full w-full object-cover" />
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
                    className="mb-12 flex flex-col items-center px-4 text-center sm:mb-16 sm:px-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    {/* Golden Gradient Line - Centered like Commitment Section */}
                    <motion.div
                        className="mb-4 h-1 w-12 rounded-full bg-amber-400 sm:mb-6 sm:w-16"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    />
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

            {/* CSR News Section */}
            <CSRNewsSection t={t} />

            {/* Testimonials - MOBILE OPTIMIZED */}
            <TestimonialsCarousel testimonials={translatedTestimonials} t={t} />

            <Footer />
        </div>
    );
}

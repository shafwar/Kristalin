import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';

const heroImage = '/papua-children.png';
const videoPlaceholder = 'https://www.youtube.com/watch?v=Lq_nOhXVt4g';

const galeriPoso = ['/galeri-poso1.png', '/galeri-poso2.png', '/galeri-poso3.png', '/galeri-poso4.png', '/galeri-poso5.png'];
const galeriPapua = ['/galeri-papua1.png', '/galeri-papua2.png', '/galeri-papua3.png', '/galeri-papua4.png'];
const galeriMenara = [
    '/galeri-menara1.jpeg',
    '/galeri-menara2.jpeg',
    '/galeri-menara3.jpeg',
    '/galeri-menara4.jpeg',
    '/galeri-menara5.jpeg',
    '/galeri-menara6.jpeg',
];
const galeriPapua2 = ['/galeri-papua2-1.jpeg', '/galeri-papua2-2.jpeg', '/galeri-papua2-3.jpeg', '/galeri-papua2-4.jpeg', '/galeri-papua2-5.jpeg'];

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

// Timeline data
const timelineData = [
    {
        year: '2023',
        title: 'Foundation Year',
        description: 'Started our CSR journey with food distribution programs',
        icon: '🌱',
    },
    {
        year: '2024',
        title: 'Expansion Phase',
        description: 'Extended programs to Papua and Central Sulawesi',
        icon: '🚀',
    },
    {
        year: '2025',
        title: 'Future Vision',
        description: 'Planning healthcare facilities and educational scholarships',
        icon: '🎯',
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

// Team data
const teamMembers = [
    {
        name: 'Dr. Budi Santoso',
        role: 'CSR Director',
        photo: '/prfl.png',
        bio: 'Leading our CSR initiatives with 10+ years experience in community development',
    },
    {
        name: 'Lisa Maharani',
        role: 'Program Coordinator',
        photo: '/prfl.png',
        bio: 'Coordinating field operations and ensuring program effectiveness',
    },
    {
        name: 'Eko Prasetyo',
        role: 'Community Relations',
        photo: '/prfl.png',
        bio: 'Building strong relationships with local communities and stakeholders',
    },
];

// Video Section Component
function VideoSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section
            className="relative bg-cover bg-fixed bg-center py-20"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/papua-children.png')`,
            }}
        >
            <div className="mx-auto max-w-4xl px-4">
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.h2
                        className="mb-4 text-4xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    >
                        See Our Impact in Action
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-2xl text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    >
                        Watch how we're making a difference in communities across Indonesia
                    </motion.p>
                </motion.div>

                <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
                    <div className="relative aspect-video">
                        {isPlaying ? (
                            <iframe
                                src="https://www.youtube.com/embed/Lq_nOhXVt4g?autoplay=1"
                                title="CSR Video"
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                <img
                                    src="https://img.youtube.com/vi/Lq_nOhXVt4g/maxresdefault.jpg"
                                    alt="CSR Video Thumbnail"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <button
                                        onClick={() => setIsPlaying(true)}
                                        className="flex h-20 w-20 transform items-center justify-center rounded-full bg-amber-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-amber-600"
                                    >
                                        <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
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

// Testimonials Component
function TestimonialsCarousel() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 py-20">
            <div className="mx-auto max-w-4xl px-4">
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.h2
                        className="mb-4 text-4xl font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    >
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                            Stories from the Community
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    >
                        Hear from those whose lives we've touched
                    </motion.p>
                </motion.div>

                <div className="relative">
                    <div className="rounded-2xl border-l-4 border-amber-400 bg-white p-8 shadow-xl">
                        <div className="mb-6 flex items-center">
                            <img
                                src={testimonials[currentTestimonial].photo}
                                alt={testimonials[currentTestimonial].name}
                                className="mr-4 h-16 w-16 rounded-full border-4 border-amber-200 object-cover"
                            />
                            <div>
                                <div className="font-semibold text-gray-800">{testimonials[currentTestimonial].name}</div>
                                <div className="text-sm text-amber-600">{testimonials[currentTestimonial].role}</div>
                            </div>
                        </div>

                        <blockquote className="text-lg leading-relaxed text-gray-700 italic">"{testimonials[currentTestimonial].quote}"</blockquote>
                    </div>

                    <div className="mt-6 flex justify-center gap-2">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonial(idx)}
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                    idx === currentTestimonial ? 'w-8 bg-amber-500' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Enhanced Gallery Component
function GalleryShowcaseCarousel({ sections }: { sections: typeof gallerySections }) {
    const [current, setCurrent] = useState(0);
    const next = () => setCurrent((c) => (c + 1) % sections.length);
    const prev = () => setCurrent((c) => (c - 1 + sections.length) % sections.length);
    // Gambar slider per section
    const [imgIdx, setImgIdx] = useState(0);
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
        <div className="relative mx-auto w-full max-w-6xl py-16 md:px-12">
            <div className="flex flex-col items-center gap-12 md:flex-row">
                {/* Teks kiri */}
                <div className="flex flex-1 flex-col items-start justify-center text-left md:items-start">
                    <div className="mb-3 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-sm font-semibold tracking-wider text-transparent uppercase">
                        CSR Activity
                    </div>
                    <h2 className="mb-4 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                        {sections[current].title}
                    </h2>
                    <p className="max-w-xl text-lg leading-relaxed text-gray-700 md:text-xl">{sections[current].description}</p>
                </div>
                {/* Gambar kanan */}
                <div className="w-full flex-1">
                    <div className="relative flex h-[260px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 md:h-[340px]">
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
            {/* Indicator dots & Prev/Next Buttons */}
            <div className="mt-10 flex items-center justify-center gap-6">
                <button
                    onClick={prev}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-white/80 shadow transition-all duration-300 hover:border-amber-400 hover:bg-amber-50"
                    aria-label="Previous Section"
                    type="button"
                >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="flex gap-3">
                    {sections.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-4 w-4 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-gradient-to-r from-amber-500 to-yellow-600' : 'bg-gray-300 hover:bg-amber-300'}`}
                            aria-label={`Go to section ${idx + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-white/80 shadow transition-all duration-300 hover:border-amber-400 hover:bg-amber-50"
                    aria-label="Next Section"
                    type="button"
                >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function CSRPage() {
    const { t } = useTranslation();
    const commitmentRef = useRef<HTMLElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLearnMore = () => {
        if (commitmentRef.current) {
            commitmentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header sticky={true} transparent={true} />

            {/* Hero Section with Parallax */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                >
                    <img src={heroImage} alt="CSR Hero" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                </div>

                <motion.div
                    className="relative z-20 mx-auto w-full max-w-5xl px-4 py-24 text-center"
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
                        <motion.h1
                            className="mb-8 text-5xl leading-tight font-bold md:text-7xl"
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
                                {t('pages.csr.hero.title_line1')}
                            </motion.span>
                            <br />
                            <motion.span
                                className="text-white drop-shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                {t('pages.csr.hero.title_line2')}
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed font-light text-white/95 md:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                        >
                            {t('pages.csr.hero.description')}
                        </motion.p>

                        <motion.div
                            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
                        >
                            <motion.button
                                onClick={handleLearnMore}
                                className="group relative transform overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-12 py-5 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 20px 40px rgba(251, 191, 36, 0.4)',
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {t('pages.csr.hero.learn_more_btn')}
                                    <svg
                                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
                >
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60">
                        <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-white"></div>
                    </div>
                </motion.div>
            </section>

            {/* Commitment Section */}
            <section ref={commitmentRef} className="mx-auto w-full max-w-4xl px-4 py-20 text-center">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.div
                        className="mb-6 h-1 w-16 rounded-full bg-amber-400"
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    />
                    <motion.h2
                        className="mb-6 text-4xl font-bold md:text-6xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                        >
                            {t('pages.csr.commitment.title')}
                        </motion.span>
                        <br />
                        <motion.span
                            className="text-black"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                        >
                            Community & Sustainability
                        </motion.span>
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
                    >
                        PT Kristalin Ekalestari is staying committed to doing corporate social responsibility activities through other development
                        activities such as constructing more clinics, giving scholarship for local children with outstanding academic performance in
                        order to develop Nabire.
                    </motion.p>
                </motion.div>
            </section>

            {/* Our Programs in Action - Gallery Showcase */}
            <main className="bg-white py-20">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    <motion.h2
                        className="mb-6 text-4xl font-bold md:text-5xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    >
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">Our Programs</span>
                        <span className="text-black"> in Action</span>
                    </motion.h2>
                    <motion.p
                        className="mx-auto max-w-2xl text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    >
                        Discover the real impact of our CSR initiatives across Indonesia
                    </motion.p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
                >
                    <GalleryShowcaseCarousel sections={gallerySections} />
                </motion.div>
            </main>

            {/* See Our Impact in Action - Video Section */}
            <VideoSection />

            {/* Stories from the Community - Testimonials */}
            <TestimonialsCarousel />

            <Footer />
        </div>
    );
}

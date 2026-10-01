import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import { imageUrl } from '@/lib/assets';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { PapuaChildrenHeroPicture } from '../components/PapuaChildrenHeroPicture';

const Careers = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'apply'>('overview');
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [scrollY, setScrollY] = useState(0);

    const goToTab = (tab: 'overview' | 'positions' | 'apply') => {
        setActiveTab(tab);
        // Scroll halus ke awal konten dengan offset untuk header sticky
        requestAnimationFrame(() => {
            const target = contentRef.current;
            if (target) {
                const headerOffset = 173; // kira-kira tinggi header
                const rect = target.getBoundingClientRect();
                const top = window.pageYOffset + rect.top - headerOffset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    };

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const benefits = [
        {
            icon: '🏥',
            title: t('pages.careers.overview.benefits.health_insurance.title'),
            description: t('pages.careers.overview.benefits.health_insurance.description'),
        },
        {
            icon: '💰',
            title: t('pages.careers.overview.benefits.competitive_salary.title'),
            description: t('pages.careers.overview.benefits.competitive_salary.description'),
        },
        {
            icon: '📚',
            title: t('pages.careers.overview.benefits.training_development.title'),
            description: t('pages.careers.overview.benefits.training_development.description'),
        },
        {
            icon: '🏠',
            title: t('pages.careers.overview.benefits.housing_allowance.title'),
            description: t('pages.careers.overview.benefits.housing_allowance.description'),
        },
        {
            icon: '🚌',
            title: t('pages.careers.overview.benefits.transportation.title'),
            description: t('pages.careers.overview.benefits.transportation.description'),
        },
        {
            icon: '🎯',
            title: t('pages.careers.overview.benefits.performance_bonus.title'),
            description: t('pages.careers.overview.benefits.performance_bonus.description'),
        },
    ];

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200">
            <Head title="Careers | PT Kristalin Ekalestari">
                <meta name="description" content="Peluang karir dan pengembangan profesional di PT Kristalin Ekalestari. Bergabung bersama kami membangun industri pertambangan yang berkelanjutan dan berdaya saing." />
                <meta property="og:title" content="Careers - PT Kristalin Ekalestari" />
                <meta property="og:description" content="Peluang karir di bidang pertambangan, metalurgi, teknik geologi, dan manajemen di PT Kristalin Ekalestari." />
            </Head>
            <Header sticky={true} transparent={true} />
            <main className="flex-1">
                {/* Hero Section - Premium Style (match board-of-directors) */}
                <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                    {/* Background Image with Overlay + Parallax */}
                    <div
                        className="absolute inset-0 h-full w-full"
                        style={{
                            transform: `translateY(${scrollY * 0.5}px)`,
                        }}
                    >
                        <img src={imageUrl('kristalincareerhero.jpg')} alt="Careers background" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
                    </div>

                    <motion.div
                        className="relative z-20 mx-auto w-full max-w-5xl px-4 py-16 text-center sm:py-24"
                        style={{
                            transform: `translateY(${scrollY * 0.2}px)`,
                            opacity: Math.max(0, 1 - scrollY / 600),
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="mb-8 sm:mb-12"
                        >
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xl ring-2 ring-yellow-400/50 drop-shadow-lg backdrop-blur-sm sm:px-8 sm:py-3 sm:text-base">
                                <svg className="mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                {t('pages.careers.hero.badge')}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="mb-6 text-3xl leading-tight font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl"
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        >
                            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                                {t('pages.careers.hero.title')}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="mx-auto mb-8 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
                        >
                            {t('pages.careers.hero.subtitle')}
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                        >
                            <button
                                onClick={() => goToTab('positions')}
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg"
                            >
                                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                    {t('pages.careers.hero.view_positions')}
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
                            </button>
                            <button
                                onClick={() => goToTab('apply')}
                                className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-yellow-600 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg"
                            >
                                {t('pages.careers.hero.apply_now')}
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Scroll Indicator */}
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

                {/* Navigation Tabs */}
                <section className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-4 py-6">
                            {[
                                { id: 'overview' as 'overview' | 'positions' | 'apply', label: t('pages.careers.tabs.overview') },
                                { id: 'positions' as 'overview' | 'positions' | 'apply', label: t('pages.careers.tabs.positions') },
                                { id: 'apply' as 'overview' | 'positions' | 'apply', label: t('pages.careers.tabs.apply') },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => goToTab(tab.id)}
                                    className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-900 shadow-md ring-1 ring-amber-400/50'
                                            : 'text-stone-600 hover:bg-amber-50/60 hover:text-stone-900'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <div ref={contentRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-16"
                        >
                            {/* Why Join Us */}
                            <section>
                                <div className="mb-12 text-center">
                                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                        {t('pages.careers.overview.why_join.title')}
                                    </h2>
                                    <p className="mx-auto max-w-3xl text-lg text-gray-600">{t('pages.careers.overview.why_join.subtitle')}</p>
                                </div>

                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {benefits.map((benefit, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
                                        >
                                            <div className="mb-4 text-4xl">{benefit.icon}</div>
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900">{benefit.title}</h3>
                                            <p className="text-gray-600">{benefit.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Company Culture */}
                            <section className="rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 p-8 lg:p-12">
                                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                                    <div>
                                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                            {t('pages.careers.overview.culture.title')}
                                        </h2>
                                        <p className="mb-6 text-lg text-gray-600">{t('pages.careers.overview.culture.description')}</p>
                                        <ul className="space-y-3">
                                            {[
                                                t('pages.careers.overview.culture.values.1'),
                                                t('pages.careers.overview.culture.values.2'),
                                                t('pages.careers.overview.culture.values.3'),
                                                t('pages.careers.overview.culture.values.4'),
                                            ].map((value, index) => (
                                                <li key={index} className="flex items-center text-gray-700">
                                                    <span className="mr-3 text-yellow-500">✓</span>
                                                    {value}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="relative">
                                        <PapuaChildrenHeroPicture
                                            pictureClassName="block w-full"
                                            className="h-auto w-full rounded-lg object-cover shadow-lg"
                                            alt="Company Culture"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            loading="lazy"
                                            fetchPriority="low"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Work Environment */}
                            <section>
                                <div className="mb-12 text-center">
                                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                        {t('pages.careers.overview.environment.title')}
                                    </h2>
                                    <p className="mx-auto max-w-3xl text-lg text-gray-600">{t('pages.careers.overview.environment.description')}</p>
                                </div>

                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="rounded-xl bg-white p-6 shadow-lg">
                                        <h3 className="mb-4 text-xl font-semibold text-gray-900">
                                            {t('pages.careers.overview.environment.safety.title')}
                                        </h3>
                                        <p className="text-gray-600">{t('pages.careers.overview.environment.safety.description')}</p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 shadow-lg">
                                        <h3 className="mb-4 text-xl font-semibold text-gray-900">
                                            {t('pages.careers.overview.environment.growth.title')}
                                        </h3>
                                        <p className="text-gray-600">{t('pages.careers.overview.environment.growth.description')}</p>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}

                    {/* Positions Tab */}
                    {activeTab === 'positions' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-10"
                        >
                            {/* Main Announcement Card with Gold-White styling */}
                            <div className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/20 p-8 sm:p-12 shadow-[0_10px_35px_-10px_rgba(245,158,11,0.12)]">
                                {/* Ambient Background Glow */}
                                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true" />
                                <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" aria-hidden="true" />

                                <div className="relative z-10 mx-auto max-w-3xl text-center">
                                    {/* Status Pill */}
                                    <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber-300 bg-amber-100/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-950 sm:text-sm shadow-sm">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                                        </span>
                                        {t('pages.careers.positions.status_badge')}
                                    </div>

                                    {/* Title */}
                                    <h2 className="mb-4 text-2xl font-bold text-stone-900 sm:text-3xl lg:text-4xl">
                                        {t('pages.careers.positions.stay_tuned_title')}
                                    </h2>

                                    {/* Subtitle / Description */}
                                    <p className="mx-auto text-base leading-relaxed text-stone-600 sm:text-lg">
                                        {t('pages.careers.positions.stay_tuned_desc')}
                                    </p>
                                </div>

                                {/* 3 Official Channels Cards */}
                                <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-3">
                                    {/* 1. Official Instagram */}
                                    <div className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                                        <div>
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-900 shadow-md">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                            </div>
                                            <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase">
                                                {t('pages.careers.positions.channels.social_tag')}
                                            </span>
                                            <h3 className="mt-1 text-lg font-bold text-stone-900">
                                                {t('pages.careers.positions.channels.instagram_title')}
                                            </h3>
                                            <p className="mt-0.5 text-xs font-semibold text-amber-600">
                                                {t('pages.careers.positions.channels.instagram_handle')}
                                            </p>
                                            <p className="mt-3 text-sm leading-relaxed text-stone-600">
                                                {t('pages.careers.positions.channels.instagram_desc')}
                                            </p>
                                        </div>
                                        <div className="mt-6 border-t border-stone-100 pt-4">
                                            <a
                                                href="https://www.instagram.com/kristalin_ekalestari/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-3 text-sm font-semibold text-stone-900 shadow-sm transition-all hover:from-amber-500 hover:to-yellow-600 hover:shadow-md"
                                            >
                                                <span>{t('pages.careers.positions.channels.instagram_cta')}</span>
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    {/* 2. Professional Job Portals */}
                                    <div className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                                        <div>
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-900 text-amber-400 shadow-md">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase">
                                                {t('pages.careers.positions.channels.portal_tag')}
                                            </span>
                                            <h3 className="mt-1 text-lg font-bold text-stone-900">
                                                {t('pages.careers.positions.channels.portal_title')}
                                            </h3>
                                            <p className="mt-0.5 text-xs font-semibold text-amber-600">
                                                {t('pages.careers.positions.channels.portal_handle')}
                                            </p>
                                            <p className="mt-3 text-sm leading-relaxed text-stone-600">
                                                {t('pages.careers.positions.channels.portal_desc')}
                                            </p>
                                        </div>
                                        <div className="mt-6 border-t border-stone-100 pt-4">
                                            <a
                                                href="https://www.instagram.com/kristalin_ekalestari/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-amber-400/80 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:border-amber-500 hover:bg-amber-50 hover:text-stone-950"
                                            >
                                                <span>{t('pages.careers.positions.channels.portal_cta')}</span>
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    {/* 3. General Talent Pool */}
                                    <div className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
                                        <div>
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-md">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase">
                                                {t('pages.careers.positions.channels.talent_tag')}
                                            </span>
                                            <h3 className="mt-1 text-lg font-bold text-stone-900">
                                                {t('pages.careers.positions.channels.talent_title')}
                                            </h3>
                                            <p className="mt-0.5 text-xs font-semibold text-amber-600">
                                                {t('pages.careers.positions.channels.talent_handle')}
                                            </p>
                                            <p className="mt-3 text-sm leading-relaxed text-stone-600">
                                                {t('pages.careers.positions.channels.talent_desc')}
                                            </p>
                                        </div>
                                        <div className="mt-6 border-t border-stone-100 pt-4">
                                            <button
                                                onClick={() => goToTab('apply')}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-800 hover:shadow-md"
                                            >
                                                <span>{t('pages.careers.positions.channels.talent_cta')}</span>
                                                <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Anti-Fraud Notice Banner */}
                                <div className="relative z-10 mt-10 rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-yellow-50/60 to-white p-6 sm:p-7 shadow-sm">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className="text-base font-bold text-stone-900">
                                                {t('pages.careers.positions.fraud_notice.title')}
                                            </h4>
                                            <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                                                <p>• <strong>{t('pages.careers.positions.fraud_notice.point1_label')}</strong>{t('pages.careers.positions.fraud_notice.point1')}</p>
                                                <p>• <strong>{t('pages.careers.positions.fraud_notice.point2_label')}</strong>{t('pages.careers.positions.fraud_notice.point2')}</p>
                                                <p>• <strong>{t('pages.careers.positions.fraud_notice.point3_label')}</strong>{t('pages.careers.positions.fraud_notice.point3')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Apply Tab */}
                    {activeTab === 'apply' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-stone-900 sm:text-4xl">{t('pages.careers.apply.title')}</h2>
                                <p className="mx-auto max-w-3xl text-lg text-stone-600">{t('pages.careers.apply.subtitle')}</p>
                            </div>

                            {/* Centered Google Form Integration with Gold-White Styling */}
                            <div className="flex justify-center">
                                <div className="w-full max-w-2xl">
                                    <div className="overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-yellow-50/20 p-8 sm:p-10 shadow-lg">
                                        <div className="mb-6 text-center">
                                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-900 shadow-md">
                                                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="mb-2 text-2xl font-bold text-stone-900">
                                                {t('pages.careers.apply.google_form.title')}
                                            </h3>
                                            <p className="text-stone-600">{t('pages.careers.apply.google_form.description')}</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm">
                                                <h4 className="mb-3 font-bold text-stone-900">
                                                    {t('pages.careers.apply.google_form.features.title')}
                                                </h4>
                                                <ul className="space-y-2.5 text-sm text-stone-600">
                                                    <li className="flex items-center">
                                                        <span className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">✓</span>
                                                        {t('pages.careers.apply.google_form.features.1')}
                                                    </li>
                                                    <li className="flex items-center">
                                                        <span className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">✓</span>
                                                        {t('pages.careers.apply.google_form.features.2')}
                                                    </li>
                                                    <li className="flex items-center">
                                                        <span className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">✓</span>
                                                        {t('pages.careers.apply.google_form.features.3')}
                                                    </li>
                                                    <li className="flex items-center">
                                                        <span className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">✓</span>
                                                        {t('pages.careers.apply.google_form.features.4')}
                                                    </li>
                                                </ul>
                                            </div>

                                            <button
                                                onClick={() => window.open('https://forms.gle/Qzi2TpTjC5GhQMMV8', '_blank')}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-base font-bold text-stone-900 shadow-md transition-all duration-300 hover:from-amber-500 hover:to-yellow-600 hover:shadow-xl"
                                            >
                                                <span>{t('pages.careers.apply.google_form.open_form')}</span>
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </button>

                                            <div className="text-center text-xs text-stone-500">{t('pages.careers.apply.google_form.note')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Careers;

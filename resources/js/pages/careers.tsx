import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Careers = () => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'apply'>('overview');
    const contentRef = useRef<HTMLDivElement | null>(null);

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
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const jobPositions = [
        {
            id: 1,
            title: t('pages.careers.job_positions.mining_engineer.title'),
            department: t('pages.careers.job_positions.mining_engineer.department'),
            location: t('pages.careers.job_positions.mining_engineer.location'),
            type: t('pages.careers.job_positions.mining_engineer.type'),
            experience: t('pages.careers.job_positions.mining_engineer.experience'),
            description: t('pages.careers.job_positions.mining_engineer.description'),
            requirements: [
                t('pages.careers.job_positions.mining_engineer.requirements.1'),
                t('pages.careers.job_positions.mining_engineer.requirements.2'),
                t('pages.careers.job_positions.mining_engineer.requirements.3'),
                t('pages.careers.job_positions.mining_engineer.requirements.4'),
                t('pages.careers.job_positions.mining_engineer.requirements.5'),
            ],
        },
        {
            id: 2,
            title: t('pages.careers.job_positions.geologist.title'),
            department: t('pages.careers.job_positions.geologist.department'),
            location: t('pages.careers.job_positions.geologist.location'),
            type: t('pages.careers.job_positions.geologist.type'),
            experience: t('pages.careers.job_positions.geologist.experience'),
            description: t('pages.careers.job_positions.geologist.description'),
            requirements: [
                t('pages.careers.job_positions.geologist.requirements.1'),
                t('pages.careers.job_positions.geologist.requirements.2'),
                t('pages.careers.job_positions.geologist.requirements.3'),
                t('pages.careers.job_positions.geologist.requirements.4'),
                t('pages.careers.job_positions.geologist.requirements.5'),
            ],
        },
        {
            id: 3,
            title: t('pages.careers.job_positions.environmental_specialist.title'),
            department: t('pages.careers.job_positions.environmental_specialist.department'),
            location: t('pages.careers.job_positions.environmental_specialist.location'),
            type: t('pages.careers.job_positions.environmental_specialist.type'),
            experience: t('pages.careers.job_positions.environmental_specialist.experience'),
            description: t('pages.careers.job_positions.environmental_specialist.description'),
            requirements: [
                t('pages.careers.job_positions.environmental_specialist.requirements.1'),
                t('pages.careers.job_positions.environmental_specialist.requirements.2'),
                t('pages.careers.job_positions.environmental_specialist.requirements.3'),
                t('pages.careers.job_positions.environmental_specialist.requirements.4'),
                t('pages.careers.job_positions.environmental_specialist.requirements.5'),
            ],
        },
        {
            id: 4,
            title: t('pages.careers.job_positions.safety_officer.title'),
            department: t('pages.careers.job_positions.safety_officer.department'),
            location: t('pages.careers.job_positions.safety_officer.location'),
            type: t('pages.careers.job_positions.safety_officer.type'),
            experience: t('pages.careers.job_positions.safety_officer.experience'),
            description: t('pages.careers.job_positions.safety_officer.description'),
            requirements: [
                t('pages.careers.job_positions.safety_officer.requirements.1'),
                t('pages.careers.job_positions.safety_officer.requirements.2'),
                t('pages.careers.job_positions.safety_officer.requirements.3'),
                t('pages.careers.job_positions.safety_officer.requirements.4'),
                t('pages.careers.job_positions.safety_officer.requirements.5'),
            ],
        },
        {
            id: 5,
            title: t('pages.careers.job_positions.community_relations_officer.title'),
            department: t('pages.careers.job_positions.community_relations_officer.department'),
            location: t('pages.careers.job_positions.community_relations_officer.location'),
            type: t('pages.careers.job_positions.community_relations_officer.type'),
            experience: t('pages.careers.job_positions.community_relations_officer.experience'),
            description: t('pages.careers.job_positions.community_relations_officer.description'),
            requirements: [
                t('pages.careers.job_positions.community_relations_officer.requirements.1'),
                t('pages.careers.job_positions.community_relations_officer.requirements.2'),
                t('pages.careers.job_positions.community_relations_officer.requirements.3'),
                t('pages.careers.job_positions.community_relations_officer.requirements.4'),
                t('pages.careers.job_positions.community_relations_officer.requirements.5'),
            ],
        },
        {
            id: 6,
            title: t('pages.careers.job_positions.administrative_assistant.title'),
            department: t('pages.careers.job_positions.administrative_assistant.department'),
            location: t('pages.careers.job_positions.administrative_assistant.location'),
            type: t('pages.careers.job_positions.administrative_assistant.type'),
            experience: t('pages.careers.job_positions.administrative_assistant.experience'),
            description: t('pages.careers.job_positions.administrative_assistant.description'),
            requirements: [
                t('pages.careers.job_positions.administrative_assistant.requirements.1'),
                t('pages.careers.job_positions.administrative_assistant.requirements.2'),
                t('pages.careers.job_positions.administrative_assistant.requirements.3'),
                t('pages.careers.job_positions.administrative_assistant.requirements.4'),
                t('pages.careers.job_positions.administrative_assistant.requirements.5'),
            ],
        },
    ];

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
        <div className="flex min-h-screen flex-col bg-white">
            <Header sticky={true} transparent={false} />
            <main className="flex-1">
                {/* Hero Section - More refined and better spacing */}
                <section className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 pt-32 pb-24">
                    {/* Subtle overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/5"></div>

                    {/* Decorative elements for visual interest */}
                    <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl"></div>
                    </div>

                    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-center"
                        >
                            <h1 className="mb-8 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">{t('pages.careers.hero.title')}</h1>
                            <p className="mx-auto mb-12 max-w-3xl text-xl text-yellow-100 sm:text-2xl">{t('pages.careers.hero.subtitle')}</p>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <button
                                    onClick={() => goToTab('positions')}
                                    className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-yellow-600 transition-all duration-300 hover:bg-yellow-50 hover:shadow-lg"
                                >
                                    {t('pages.careers.hero.view_positions')}
                                </button>
                                <button
                                    onClick={() => goToTab('apply')}
                                    className="rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-yellow-600"
                                >
                                    {t('pages.careers.hero.apply_now')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Navigation Tabs */}
                <section className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-4 py-6">
                            {[
                                { id: 'overview', label: t('pages.careers.tabs.overview') },
                                { id: 'positions', label: t('pages.careers.tabs.positions') },
                                { id: 'apply', label: t('pages.careers.tabs.apply') },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => goToTab(tab.id as any)}
                                    className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                                        activeTab === tab.id
                                            ? 'bg-yellow-500 text-white shadow-lg'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
                                        <img src="/papua-children.jpg" alt="Company Culture" className="rounded-lg shadow-lg" />
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
                            className="space-y-8"
                        >
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t('pages.careers.positions.title')}</h2>
                                <p className="mx-auto max-w-3xl text-lg text-gray-600">{t('pages.careers.positions.subtitle')}</p>
                            </div>

                            <div className="grid gap-6">
                                {jobPositions.map((position, index) => (
                                    <motion.div
                                        key={position.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                            <div className="flex-1">
                                                <div className="mb-4">
                                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{position.title}</h3>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center">
                                                            <span className="mr-2">🏢</span>
                                                            {position.department}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <span className="mr-2">📍</span>
                                                            {position.location}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <span className="mr-2">⏰</span>
                                                            {position.type}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <span className="mr-2">📅</span>
                                                            {position.experience}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="mb-4 text-gray-600">{position.description}</p>
                                                <div>
                                                    <h4 className="mb-2 font-semibold text-gray-900">{t('pages.careers.positions.requirements')}:</h4>
                                                    <ul className="space-y-1">
                                                        {position.requirements.map((req, reqIndex) => (
                                                            <li key={reqIndex} className="flex items-start text-sm text-gray-600">
                                                                <span className="mt-1 mr-2 text-yellow-500">•</span>
                                                                {req}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 lg:ml-6">
                                                <button
                                                    onClick={() => goToTab('apply')}
                                                    className="rounded-lg bg-yellow-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg"
                                                >
                                                    {t('pages.careers.positions.apply')}
                                                </button>
                                                <button className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50">
                                                    {t('pages.careers.positions.save')}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
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
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t('pages.careers.apply.title')}</h2>
                                <p className="mx-auto max-w-3xl text-lg text-gray-600">{t('pages.careers.apply.subtitle')}</p>
                            </div>

                            {/* Google Form Application - Centered and Enhanced */}
                            <div className="mx-auto max-w-2xl">
                                <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 p-8 shadow-lg">
                                    <div className="mb-6 text-center">
                                        <div className="mb-4 text-4xl">📝</div>
                                        <h3 className="mb-2 text-2xl font-semibold text-gray-900">{t('pages.careers.apply.google_form.title')}</h3>
                                        <p className="text-gray-600">{t('pages.careers.apply.google_form.description')}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded-lg bg-white p-4 shadow-sm">
                                            <h4 className="mb-2 font-semibold text-gray-900">
                                                {t('pages.careers.apply.google_form.features.title')}
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="flex items-center">
                                                    <span className="mr-2 text-yellow-500">✓</span>
                                                    {t('pages.careers.apply.google_form.features.1')}
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="mr-2 text-yellow-500">✓</span>
                                                    {t('pages.careers.apply.google_form.features.2')}
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="mr-2 text-yellow-500">✓</span>
                                                    {t('pages.careers.apply.google_form.features.3')}
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="mr-2 text-yellow-500">✓</span>
                                                    {t('pages.careers.apply.google_form.features.4')}
                                                </li>
                                            </ul>
                                        </div>

                                        <button
                                            onClick={() => window.open('https://forms.gle/Qzi2TpTjC5GhQMMV8', '_blank')}
                                            className="w-full rounded-lg bg-yellow-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg"
                                        >
                                            {t('pages.careers.apply.google_form.open_form')}
                                        </button>

                                        <div className="text-center text-sm text-gray-500">{t('pages.careers.apply.google_form.note')}</div>
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

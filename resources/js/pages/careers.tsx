import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

const Careers = () => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'apply'>('overview');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const jobPositions = [
        {
            id: 1,
            title: 'Mining Engineer',
            department: 'Engineering',
            location: 'Nabire, Papua',
            type: 'Full-time',
            experience: '3-5 years',
            description: 'Responsible for planning and supervising mining operations, ensuring safety and efficiency in gold extraction processes.',
            requirements: [
                "Bachelor's degree in Mining Engineering",
                'Experience in open-pit mining operations',
                'Knowledge of mining software and equipment',
                'Strong analytical and problem-solving skills',
                'Safety certification preferred',
            ],
        },
        {
            id: 2,
            title: 'Geologist',
            department: 'Exploration',
            location: 'Nabire, Papua',
            type: 'Full-time',
            experience: '2-4 years',
            description: 'Conduct geological surveys and analysis to identify potential gold deposits and assess mining feasibility.',
            requirements: [
                "Bachelor's degree in Geology or related field",
                'Experience in mineral exploration',
                'Proficiency in geological mapping software',
                'Field work experience in remote locations',
                'Knowledge of gold deposit geology',
            ],
        },
        {
            id: 3,
            title: 'Environmental Specialist',
            department: 'Environmental',
            location: 'Nabire, Papua',
            type: 'Full-time',
            experience: '2-3 years',
            description: 'Ensure compliance with environmental regulations and implement sustainable mining practices.',
            requirements: [
                "Bachelor's degree in Environmental Science",
                'Experience in environmental impact assessment',
                'Knowledge of environmental regulations',
                'Experience in mining industry preferred',
                'Strong communication skills',
            ],
        },
        {
            id: 4,
            title: 'Safety Officer',
            department: 'Health & Safety',
            location: 'Nabire, Papua',
            type: 'Full-time',
            experience: '3-5 years',
            description: 'Develop and implement safety protocols to ensure workplace safety and compliance with regulations.',
            requirements: [
                "Bachelor's degree in Occupational Safety or related field",
                'Safety certification (K3, NEBOSH, or equivalent)',
                'Experience in mining safety management',
                'Knowledge of safety regulations and standards',
                'Strong leadership and training skills',
            ],
        },
        {
            id: 5,
            title: 'Community Relations Officer',
            department: 'CSR',
            location: 'Nabire, Papua',
            type: 'Full-time',
            experience: '2-4 years',
            description: 'Build and maintain positive relationships with local communities and stakeholders.',
            requirements: [
                "Bachelor's degree in Social Sciences or related field",
                'Experience in community development',
                'Strong interpersonal and communication skills',
                'Knowledge of local culture and customs',
                'Experience in stakeholder engagement',
            ],
        },
        {
            id: 6,
            title: 'Administrative Assistant',
            department: 'Administration',
            location: 'Nabire, Papua',
            type: 'Full-time',
            experience: '1-2 years',
            description: 'Provide administrative support to various departments and ensure smooth office operations.',
            requirements: [
                'High school diploma or equivalent',
                'Proficiency in Microsoft Office',
                'Strong organizational skills',
                'Good communication skills',
                'Experience in office administration preferred',
            ],
        },
    ];

    const benefits = [
        {
            icon: '🏥',
            title: 'Health Insurance',
            description: 'Comprehensive health coverage for you and your family',
        },
        {
            icon: '💰',
            title: 'Competitive Salary',
            description: 'Attractive compensation package with performance bonuses',
        },
        {
            icon: '📚',
            title: 'Training & Development',
            description: 'Continuous learning opportunities and career growth',
        },
        {
            icon: '🏠',
            title: 'Housing Allowance',
            description: 'Housing support for employees working in remote locations',
        },
        {
            icon: '🚌',
            title: 'Transportation',
            description: 'Transportation facilities for work-related travel',
        },
        {
            icon: '🎯',
            title: 'Performance Bonus',
            description: 'Annual performance-based bonuses and incentives',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header sticky={true} transparent={false} />

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
                                onClick={() => setActiveTab('positions')}
                                className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-yellow-600 transition-all duration-300 hover:bg-yellow-50 hover:shadow-lg"
                            >
                                {t('pages.careers.hero.view_positions')}
                            </button>
                            <button
                                onClick={() => setActiveTab('apply')}
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
                                onClick={() => setActiveTab(tab.id as any)}
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
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-16">
                        {/* Why Join Us */}
                        <section>
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t('pages.careers.overview.why_join.title')}</h2>
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
                                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t('pages.careers.overview.culture.title')}</h2>
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
                                    <img src="/papua-children.png" alt="Company Culture" className="rounded-lg shadow-lg" />
                                </div>
                            </div>
                        </section>

                        {/* Work Environment */}
                        <section>
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t('pages.careers.overview.environment.title')}</h2>
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
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
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
                                                onClick={() => setActiveTab('apply')}
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
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t('pages.careers.apply.title')}</h2>
                            <p className="mx-auto max-w-3xl text-lg text-gray-600">{t('pages.careers.apply.subtitle')}</p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Application Form */}
                            <div className="rounded-xl bg-white p-8 shadow-lg">
                                <h3 className="mb-6 text-2xl font-semibold text-gray-900">{t('pages.careers.apply.form.title')}</h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.careers.apply.form.position')} <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500">
                                            <option value="">{t('pages.careers.apply.form.select_position')}</option>
                                            {jobPositions.map((position) => (
                                                <option key={position.id} value={position.id}>
                                                    {position.title} - {position.department}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                {t('pages.careers.apply.form.first_name')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                                placeholder={t('pages.careers.apply.form.first_name_placeholder')}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                {t('pages.careers.apply.form.last_name')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                                placeholder={t('pages.careers.apply.form.last_name_placeholder')}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.careers.apply.form.email')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                            placeholder={t('pages.careers.apply.form.email_placeholder')}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.careers.apply.form.phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                            placeholder={t('pages.careers.apply.form.phone_placeholder')}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            {t('pages.careers.apply.form.message')}
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
                                            placeholder={t('pages.careers.apply.form.message_placeholder')}
                                        />
                                    </div>

                                    <button
                                        onClick={() => window.open('https://forms.gle/Qzi2TpTjC5GhQMMV8', '_blank')}
                                        className="w-full rounded-lg bg-yellow-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg"
                                    >
                                        {t('pages.careers.apply.form.submit')}
                                    </button>
                                </div>
                            </div>

                            {/* Google Form Integration */}
                            <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 p-8">
                                <div className="mb-6 text-center">
                                    <div className="mb-4 text-4xl">📝</div>
                                    <h3 className="mb-2 text-2xl font-semibold text-gray-900">{t('pages.careers.apply.google_form.title')}</h3>
                                    <p className="text-gray-600">{t('pages.careers.apply.google_form.description')}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="rounded-lg bg-white p-4 shadow-sm">
                                        <h4 className="mb-2 font-semibold text-gray-900">{t('pages.careers.apply.google_form.features.title')}</h4>
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

            {/* Footer */}
            <footer className="bg-gray-900 px-4 py-8 text-center text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="text-sm">{t('pages.careers.footer.copyright')}</p>
                    <p className="mt-2 text-xs text-gray-400">{t('pages.careers.footer.contact_info')}</p>
                </div>
            </footer>
        </div>
    );
};

export default Careers;

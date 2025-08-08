import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import {
    Building2,
    Target,
    Users,
    Award,
    ArrowRight,
    Quote,
    CheckCircle
} from 'lucide-react';

export default function MessageFromFounder() {
    const { t } = useTranslation();

    const quotes = [
        {
            text: t('message_from_founder.quotes.0.text'),
            focus: t('message_from_founder.quotes.0.focus'),
        },
        {
            text: t('message_from_founder.quotes.1.text'),
            focus: t('message_from_founder.quotes.1.focus'),
        },
        {
            text: t('message_from_founder.quotes.2.text'),
            focus: t('message_from_founder.quotes.2.focus'),
        },
    ];

    const principles = [
        {
            title: t('message_from_founder.principles.items.0.title'),
            description: t('message_from_founder.principles.items.0.description'),
            icon: Building2,
        },
        {
            title: t('message_from_founder.principles.items.1.title'),
            description: t('message_from_founder.principles.items.1.description'),
            icon: Target,
        },
        {
            title: t('message_from_founder.principles.items.2.title'),
            description: t('message_from_founder.principles.items.2.description'),
            icon: Award,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-8">
                            {t('message_from_founder.hero.title_line1')}{' '}
                            <span className="text-yellow-200">
                                {t('message_from_founder.hero.title_line2')}
                            </span>
                        </h1>
                        <p className="text-xl md:text-3xl text-yellow-100 mb-12 max-w-4xl mx-auto">
                            {t('message_from_founder.hero.description')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Header Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-lg text-amber-600 font-semibold mb-4">
                            {t('message_from_founder.header.subtitle')}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                            {t('message_from_founder.header.title_line1')}{' '}
                            <span className="text-amber-600">
                                {t('message_from_founder.header.title_line2')}
                            </span>
                        </h2>
                    </motion.div>
                </div>
            </section>

            {/* Quotes Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12">
                        {quotes.map((quote, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-12 lg:p-16 border border-amber-100">
                                    <Quote className="w-12 h-12 text-amber-500 mb-6" />
                                    <blockquote className="text-2xl md:text-3xl text-gray-800 mb-8 leading-relaxed">
                                        "{quote.text}"
                                    </blockquote>
                                    <div className="flex items-center">
                                        <div className="bg-amber-500 text-white px-6 py-3 rounded-full text-lg font-semibold">
                                            {quote.focus}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Info */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            {t('message_from_founder.founder_info.name')}
                        </h3>
                        <p className="text-xl text-amber-600 font-semibold mb-2">
                            {t('message_from_founder.founder_info.title')}
                        </p>
                        <p className="text-lg text-gray-600">
                            {t('message_from_founder.founder_info.company')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Message Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="prose prose-lg max-w-none"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            {t('message_from_founder.message.greeting')}
                        </h2>

                        <div className="space-y-8 text-lg leading-relaxed text-gray-700">
                            <p dangerouslySetInnerHTML={{
                                __html: t('message_from_founder.message.paragraph1')
                            }} />
                            <p dangerouslySetInnerHTML={{
                                __html: t('message_from_founder.message.paragraph2')
                            }} />
                            <p dangerouslySetInnerHTML={{
                                __html: t('message_from_founder.message.paragraph3')
                            }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Principles Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('message_from_founder.principles.title')}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="bg-gradient-to-br from-amber-500 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <principle.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {principle.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {principle.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-amber-500 to-yellow-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {t('message_from_founder.cta.title')}
                        </h2>
                        <p className="text-xl text-yellow-100 mb-12 max-w-3xl mx-auto">
                            {t('message_from_founder.cta.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="/about"
                                className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-50 transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                                {t('message_from_founder.cta.button_story')}
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="/contact"
                                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-amber-600 transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                                {t('message_from_founder.cta.button_contact')}
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

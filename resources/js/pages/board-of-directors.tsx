import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const BoardOfDirectors = () => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDirector, setSelectedDirector] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const directors = [
        {
            id: 1,
            name: 'Ir. Budi Santoso',
            position: 'President Director',
            image: '/director1.jpg',
            education: 'Master of Engineering, Bandung Institute of Technology',
            experience: '25+ years in mining industry',
            expertise: 'Mining Operations, Strategic Planning, Business Development',
            achievements: [
                'Led successful expansion into Papua region',
                'Implemented sustainable mining practices',
                'Achieved 40% production increase in 3 years',
            ],
            vision: 'To establish Kristalin Eka Lestari as the leading sustainable gold mining company in Indonesia',
        },
        {
            id: 2,
            name: 'Dr. Sarah Wijaya',
            position: 'Vice President Director',
            image: '/director2.jpg',
            education: 'PhD in Geology, University of Indonesia',
            experience: '20+ years in geological exploration',
            expertise: 'Geological Assessment, Resource Management, Environmental Compliance',
            achievements: [
                'Discovered 3 major gold deposits',
                'Developed environmental protection protocols',
                'Received national award for geological innovation',
            ],
            vision: 'To pioneer responsible mining practices that benefit both environment and community',
        },
        {
            id: 3,
            name: 'Ir. Ahmad Rahman',
            position: 'Technical Director',
            image: '/director3.jpg',
            education: 'Master of Mining Engineering, Gadjah Mada University',
            experience: '18+ years in technical operations',
            expertise: 'Mining Technology, Process Optimization, Safety Management',
            achievements: [
                'Reduced operational costs by 25%',
                'Implemented zero-accident safety program',
                'Optimized mining processes for efficiency',
            ],
            vision: 'To drive technological innovation in mining while maintaining highest safety standards',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            rotateX: -15,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Header />

            {/* Hero Section with Premium Design */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>

                {/* Animated Background Elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isLoaded ? { opacity: 0.1, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute top-0 right-0 h-96 w-96 rounded-full bg-yellow-500/20 blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isLoaded ? { opacity: 0.1, scale: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-yellow-500/20 blur-3xl"
                />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-center"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-6 text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
                        >
                            Board of Directors
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-300"
                        >
                            Meet the visionary leadership team guiding Kristalin Eka Lestari towards sustainable excellence in gold mining. Our
                            directors bring decades of combined experience in mining, finance, operations, and sustainable development.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Directors Section with Premium Cards */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">Leadership Excellence</h2>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                            Our Board of Directors combines strategic vision with operational expertise, ensuring sustainable growth while maintaining
                            the highest standards of corporate governance.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isLoaded ? 'visible' : 'hidden'}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {directors.map((director, index) => (
                            <motion.div key={director.id} variants={cardVariants} whileHover="hover" className="group relative">
                                <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl">
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                    <div className="p-8">
                                        {/* Avatar Section */}
                                        <div className="mb-8 text-center">
                                            <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="relative mx-auto mb-6">
                                                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg">
                                                    <span className="text-3xl font-bold text-white">
                                                        {director.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </span>
                                                </div>
                                                <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-green-500">
                                                    <div className="h-3 w-3 rounded-full bg-white"></div>
                                                </div>
                                            </motion.div>

                                            <h3 className="mb-2 text-2xl font-bold text-gray-900">{director.name}</h3>
                                            <p className="mb-4 text-lg font-semibold text-yellow-600">{director.position}</p>
                                        </div>

                                        {/* Details Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-500"></div>
                                                <p className="text-sm leading-relaxed text-gray-600">{director.education}</p>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-500"></div>
                                                <p className="text-sm leading-relaxed text-gray-600">{director.experience}</p>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-500"></div>
                                                <p className="text-sm leading-relaxed text-gray-600">{director.expertise}</p>
                                            </div>
                                        </div>

                                        {/* Achievements Section */}
                                        <div className="mt-6 border-t border-gray-200 pt-6">
                                            <h4 className="mb-3 text-sm font-semibold text-gray-900">Key Achievements</h4>
                                            <div className="space-y-2">
                                                {director.achievements.map((achievement, idx) => (
                                                    <div key={idx} className="flex items-start">
                                                        <div className="mt-2 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-400"></div>
                                                        <p className="text-xs leading-relaxed text-gray-600">{achievement}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Vision Section */}
                                        <div className="mt-6 border-t border-gray-200 pt-6">
                                            <h4 className="mb-3 text-sm font-semibold text-gray-900">Vision</h4>
                                            <p className="text-xs leading-relaxed text-gray-600 italic">"{director.vision}"</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Vision Statement Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-center"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 1.4 }}
                            className="mb-8 text-4xl font-bold text-white sm:text-5xl"
                        >
                            Our Leadership Vision
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 1.6 }}
                            className="mx-auto max-w-5xl text-xl leading-relaxed text-gray-300"
                        >
                            "We are committed to leading Kristalin Eka Lestari towards sustainable excellence in gold mining. Our focus is on
                            innovation, environmental stewardship, community development, and creating lasting value for all stakeholders while
                            maintaining the highest standards of safety and operational efficiency."
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 1.8 }}
                            className="mt-12 flex justify-center"
                        >
                            <div className="inline-flex items-center rounded-full bg-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-yellow-600">
                                <span>Leading with Excellence</span>
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BoardOfDirectors;

import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

// SVG Icon Components
const IconBuilding = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12h4h4" />
        <path d="M6 20h4" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M14 20h4" />
    </svg>
);

const IconGlobe = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const IconLeaf = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <path d="M7 20s4-9 6-13 6-2 6-2-3 14-5 18" />
        <path d="M22 9s-7-6-13-6c-3 0-9 4-9 9 0 1 0 3 0 3s1 1 3 1c6 0 13-6 13-6" />
    </svg>
);

const IconTrendingUp = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const IconMining = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <path d="M6 20h12l-6-10z" />
        <path d="M8 14l8 0" />
        <path d="M2 20h20" />
        <path d="M12 4v6" />
    </svg>
);

export default function AboutPage() {
    const { t } = useTranslation();
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState(0);

    const HEADER_HEIGHT = 80;
    const FOOTER_HEIGHT = 40;

    useEffect(() => {
        if (rightPanelRef.current) {
            rightPanelRef.current.scrollTop = 0;
        }
        // Smooth entrance
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Auto-cycle through sections for demo
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSection((prev) => (prev + 1) % 5);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    const companyStats = {
        founded: '1989',
        location: t('pages.about.company_stats_values.location'),
        operations: t('pages.about.company_stats_values.operations'),
        partnerships: t('pages.about.company_stats_values.partnerships'),
    };

    const sections = [
        {
            title: t('pages.about.sections.company_foundation.title'),
            subtitle: t('pages.about.sections.company_foundation.subtitle'),
            content: t('pages.about.sections.company_foundation.content'),
            icon: <IconBuilding />,
        },
        {
            title: t('pages.about.sections.global_partnerships.title'),
            subtitle: t('pages.about.sections.global_partnerships.subtitle'),
            content: t('pages.about.sections.global_partnerships.content'),
            icon: <IconGlobe />,
        },
        {
            title: t('pages.about.sections.environmental_stewardship.title'),
            subtitle: t('pages.about.sections.environmental_stewardship.subtitle'),
            content: t('pages.about.sections.environmental_stewardship.content'),
            icon: <IconLeaf />,
        },
        {
            title: t('pages.about.sections.continuous_innovation.title'),
            subtitle: t('pages.about.sections.continuous_innovation.subtitle'),
            content: t('pages.about.sections.continuous_innovation.content'),
            icon: <IconTrendingUp />,
        },
        {
            title: t('pages.about.sections.mining_operations.title'),
            subtitle: t('pages.about.sections.mining_operations.subtitle'),
            content: t('pages.about.sections.mining_operations.content'),
            icon: <IconMining />,
        },
    ];

    const additionalContent = [
        {
            title: t('pages.about.additional_content.our_operations.title'),
            content: t('pages.about.additional_content.our_operations.content'),
        },
        {
            title: t('pages.about.additional_content.international_partnerships.title'),
            content: t('pages.about.additional_content.international_partnerships.content'),
        },
        {
            title: t('pages.about.additional_content.commitment_excellence.title'),
            content: t('pages.about.additional_content.commitment_excellence.content'),
        },
        {
            title: t('pages.about.additional_content.environmental_stewardship.title'),
            content: t('pages.about.additional_content.environmental_stewardship.content'),
        },
        {
            title: t('pages.about.additional_content.future_vision.title'),
            content: t('pages.about.additional_content.future_vision.content'),
        },
    ];

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header sticky={true} transparent={false} />
            <div className="z-10 flex flex-1 flex-col pt-16 sm:pt-20">
                {/* Mobile Layout - Stack Vertically */}
                <div className="block lg:hidden">
                    {/* Mobile Hero Section */}
                    <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-black">
                        <img
                            src={imageUrl('about.jpg')}
                            alt={t('pages.about.alt_texts.mining_operations')}
                            className="h-full w-full object-cover opacity-70"
                        />

                        {/* Mobile Title */}
                        <div
                            className={`absolute right-4 bottom-6 left-4 transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <h1 className="text-2xl leading-tight font-light text-white sm:text-3xl">
                                {t('pages.about.page_title').split(' ').slice(0, 2).join(' ')}
                                <br />
                                <span className="font-normal">{t('pages.about.page_title').split(' ').slice(2).join(' ')}</span>
                            </h1>
                            <div className="mt-4 h-1 w-16 bg-yellow-400"></div>
                        </div>

                        {/* Mobile Company Stats */}
                        <div
                            className={`absolute top-4 right-4 transform transition-all delay-500 duration-1500 ${
                                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                            }`}
                        >
                            <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    {Object.entries(companyStats).map(([key, value]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="text-sm font-bold text-yellow-400">{value}</div>
                                            <div className="text-xs tracking-wide text-white/80 uppercase">
                                                {t(`pages.about.company_stats.${key}`)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Content */}
                    <div className="bg-white p-4 sm:p-6">
                        <div className="mx-auto max-w-2xl">
                            {/* Header */}
                            <div
                                className={`mb-8 transform transition-all delay-300 duration-1000 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                            >
                                <div className="mb-3 flex items-center space-x-2">
                                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                    <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">{t('pages.about.page_title')}</span>
                                </div>
                                <h2 className="text-xl leading-relaxed font-light text-gray-900 sm:text-2xl">{t('pages.about.main_heading')}</h2>
                            </div>

                            {/* Company Introduction */}
                            <div
                                className={`mb-8 transform transition-all delay-500 duration-1000 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                            >
                                <p className="mb-6 text-sm leading-relaxed text-gray-700 sm:text-base">{t('pages.about.company_intro')}</p>
                            </div>

                            {/* Dynamic Content Sections */}
                            <div className="mb-8 space-y-4">
                                {sections.map((section, index) => (
                                    <div
                                        key={index}
                                        className={`group transform cursor-pointer transition-all duration-1000 ${
                                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        } ${
                                            activeSection === index
                                                ? 'scale-[1.02] rounded-xl bg-yellow-50 p-4 shadow-lg'
                                                : 'rounded-xl p-4 hover:bg-gray-50'
                                        }`}
                                        style={{
                                            transitionDelay: `${700 + index * 150}ms`,
                                        }}
                                        onClick={() => setActiveSection(index)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            {/* Icon */}
                                            <div
                                                className={`flex-shrink-0 transition-all duration-500 ${
                                                    activeSection === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                                                }`}
                                            >
                                                {section.icon}
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <div className="mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase">
                                                        {section.subtitle}
                                                    </div>
                                                    <h3
                                                        className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
                                                            activeSection === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                                                        }`}
                                                    >
                                                        {section.title}
                                                    </h3>
                                                </div>
                                                <p
                                                    className={`leading-relaxed transition-all duration-500 ${
                                                        activeSection === index
                                                            ? 'text-sm text-gray-800 sm:text-base'
                                                            : 'text-xs text-gray-600 group-hover:text-gray-800 sm:text-sm'
                                                    }`}
                                                >
                                                    {section.content}
                                                </p>
                                                {/* Progress Bar */}
                                                <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                                                    <div
                                                        className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                                            activeSection === index ? 'w-full' : 'w-0'
                                                        }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Detailed Content */}
                            <div
                                className={`transform space-y-6 transition-all delay-1200 duration-1500 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                            >
                                {additionalContent.map((item, index) => (
                                    <div key={index} className="group">
                                        <h3 className="mb-3 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600 sm:text-xl">
                                            {item.title}
                                        </h3>
                                        <div className="mb-3 h-0.5 w-8 bg-yellow-500 transition-all duration-300 group-hover:w-12 sm:w-12 sm:group-hover:w-16"></div>
                                        <p className="text-sm leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-800 sm:text-base">
                                            {item.content}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Call to Action */}
                            <div
                                className={`mt-12 transform border-t border-gray-200 pt-6 transition-all delay-1400 duration-1500 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                            >
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <h4 className="text-base font-medium text-gray-900 sm:text-lg">
                                            {t('pages.about.cta.sustainable_growth_title')}
                                        </h4>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            {t('pages.about.cta.sustainable_growth_desc')}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                        <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                            <span className="relative z-10">{t('pages.about.cta.mining_operations_btn')}</span>
                                            <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100"></div>
                                        </button>
                                        <button className="group rounded-full border-2 border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white">
                                            <a href="/contact">{t('pages.about.cta.contact_us_btn')}</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout - Side by Side */}
                <div className="relative hidden w-full lg:flex" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
                    {/* Left Side - Image and Title with animations */}
                    <div className="relative h-full w-1/2 flex-shrink-0 overflow-hidden bg-black">
                        <img
                            src={imageUrl('about.jpg')}
                            alt={t('pages.about.alt_texts.mining_operations')}
                            className="h-full w-full object-cover opacity-70"
                        />
                        <div
                            className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <h1 className="text-5xl leading-tight font-light text-white">
                                {t('pages.about.page_title').split(' ').slice(0, 2).join(' ')}
                                <br />
                                <span className="font-normal">{t('pages.about.page_title').split(' ').slice(2).join(' ')}</span>
                            </h1>
                            <div className="mt-6 h-1 w-20 bg-yellow-400"></div>
                        </div>
                        {/* Floating Company Stats */}
                        <div
                            className={`absolute top-16 right-16 transform transition-all delay-500 duration-1500 ${
                                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                            }`}
                        >
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    {Object.entries(companyStats).map(([key, value]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="text-lg font-bold text-yellow-400">{value}</div>
                                            <div className="text-xs tracking-wide text-white/80 uppercase">
                                                {t(`pages.about.company_stats.${key}`)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Animated Content Panel */}
                    <div className="relative h-full w-1/2 flex-shrink-0 bg-white">
                        {/* Accent Line */}
                        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>

                        {/* Content Container */}
                        <div ref={rightPanelRef} className="h-full overflow-y-auto" style={{ padding: '3rem 4rem' }}>
                            <div className="max-w-xl">
                                {/* Header */}
                                <div
                                    className={`mb-12 transform transition-all delay-300 duration-1000 ${
                                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                >
                                    <div className="mb-4 flex items-center space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                        <span className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                                            {t('pages.about.page_title')}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl leading-relaxed font-light text-gray-900">{t('pages.about.main_heading')}</h2>
                                </div>

                                {/* Company Introduction */}
                                <div
                                    className={`mb-12 transform transition-all delay-500 duration-1000 ${
                                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                >
                                    <p className="mb-6 text-base leading-relaxed text-gray-700">{t('pages.about.company_intro')}</p>
                                </div>

                                {/* Dynamic Content Sections */}
                                <div className="mb-12 space-y-8">
                                    {sections.map((section, index) => (
                                        <div
                                            key={index}
                                            className={`group transform cursor-pointer transition-all duration-1000 ${
                                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            } ${
                                                activeSection === index
                                                    ? '-mx-2 scale-105 rounded-2xl bg-yellow-50 p-6 shadow-lg'
                                                    : '-mx-2 rounded-2xl p-6 hover:bg-gray-50'
                                            }`}
                                            style={{
                                                transitionDelay: `${700 + index * 150}ms`,
                                            }}
                                            onClick={() => setActiveSection(index)}
                                        >
                                            <div className="flex items-start space-x-4">
                                                {/* Icon */}
                                                <div
                                                    className={`flex-shrink-0 text-2xl transition-all duration-500 ${
                                                        activeSection === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                                                    }`}
                                                >
                                                    {section.icon}
                                                </div>
                                                {/* Content */}
                                                <div className="flex-1 space-y-3">
                                                    <div>
                                                        <div className="mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase">
                                                            {section.subtitle}
                                                        </div>
                                                        <h3
                                                            className={`text-xl font-semibold transition-colors duration-300 ${
                                                                activeSection === index
                                                                    ? 'text-yellow-700'
                                                                    : 'text-gray-900 group-hover:text-yellow-600'
                                                            }`}
                                                        >
                                                            {section.title}
                                                        </h3>
                                                    </div>
                                                    <p
                                                        className={`leading-relaxed transition-all duration-500 ${
                                                            activeSection === index
                                                                ? 'text-base text-gray-800'
                                                                : 'text-sm text-gray-600 group-hover:text-gray-800'
                                                        }`}
                                                    >
                                                        {section.content}
                                                    </p>
                                                    {/* Progress Bar */}
                                                    <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                                                        <div
                                                            className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                                                activeSection === index ? 'w-full' : 'w-0'
                                                            }`}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional Detailed Content */}
                                <div
                                    className={`transform space-y-8 transition-all delay-1200 duration-1500 ${
                                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                >
                                    {additionalContent.map((item, index) => (
                                        <div key={index} className="group">
                                            <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600">
                                                {item.title}
                                            </h3>
                                            <div className="mb-4 h-0.5 w-12 bg-yellow-500 transition-all duration-300 group-hover:w-16"></div>
                                            <p className="leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-800">
                                                {item.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Call to Action */}
                                <div
                                    className={`mt-16 transform border-t border-gray-200 pt-8 transition-all delay-1400 duration-1500 ${
                                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                >
                                    <div className="space-y-6 text-center">
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-medium text-gray-900">{t('pages.about.cta.sustainable_growth_title')}</h4>
                                            <p className="text-sm leading-relaxed text-gray-600">{t('pages.about.cta.sustainable_growth_desc')}</p>
                                        </div>
                                        <div className="flex justify-center space-x-4">
                                            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                <span className="relative z-10">{t('pages.about.cta.mining_operations_btn')}</span>
                                                <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100"></div>
                                            </button>
                                            <button className="group rounded-full border-2 border-yellow-500 px-8 py-3 font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white">
                                                <a href="/contact">{t('pages.about.cta.contact_us_btn')}</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Custom Styles */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
        }
        * { scroll-behavior: smooth; }
      `,
                }}
            />
        </div>
    );
}

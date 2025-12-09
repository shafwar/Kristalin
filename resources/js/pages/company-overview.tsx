import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

// SVG Icon Components
const IconTarget = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);
const IconDiamond = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
        <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
);
const IconHandshake = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <path d="M8 13l-4-4a3 3 0 014-4l4 4" />
        <path d="M16 11l4-4a3 3 0 00-4-4l-4 4" />
        <path d="M12 17v-7" />
        <path d="M7 17h10" />
    </svg>
);
const IconLightning = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 sm:h-7 sm:w-7"
    >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

export default function CompanyOverview() {
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
            setActiveSection((prev) => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const companyData = {
        founded: t('pages.company_overview.company_values.founded_year'),
        operations: t('pages.company_overview.company_values.operations_location'),
        focus: t('pages.company_overview.company_values.focus_area'),
        partnerships: t('pages.company_overview.company_values.partnerships_countries'),
    };

    const sections = [
        {
            title: t('pages.company_overview.sections.company_goals.title'),
            subtitle: t('pages.company_overview.sections.company_goals.subtitle'),
            content: t('pages.company_overview.sections.company_goals.content'),
            icon: <IconTarget />,
        },
        {
            title: t('pages.company_overview.sections.natural_resources.title'),
            subtitle: t('pages.company_overview.sections.natural_resources.subtitle'),
            content: t('pages.company_overview.sections.natural_resources.content'),
            icon: <IconDiamond />,
        },
        {
            title: t('pages.company_overview.sections.strategic_partnerships.title'),
            subtitle: t('pages.company_overview.sections.strategic_partnerships.subtitle'),
            content: t('pages.company_overview.sections.strategic_partnerships.content'),
            icon: <IconHandshake />,
        },
        {
            title: t('pages.company_overview.sections.innovation_excellence.title'),
            subtitle: t('pages.company_overview.sections.innovation_excellence.subtitle'),
            content: t('pages.company_overview.sections.innovation_excellence.content'),
            icon: <IconLightning />,
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
                            src={imageUrl('companyoverview.jpg')}
                            alt={t('pages.company_overview.alt_texts.papua_forest')}
                            className="h-full w-full object-cover opacity-70"
                        />

                        {/* Mobile Title */}
                        <div
                            className={`absolute right-4 bottom-6 left-4 transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <h1 className="text-2xl leading-tight font-light text-white sm:text-3xl">
                                {t('pages.company_overview.page_title').split(' ')[0]}
                                <br />
                                <span className="font-normal">{t('pages.company_overview.page_title').split(' ')[1]}</span>
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
                                    {Object.entries(companyData).map(([key, value]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="text-sm font-bold text-yellow-400">{value}</div>
                                            <div className="text-xs tracking-wide text-white/80 uppercase">
                                                {t(`pages.company_overview.company_data.${key}`)}
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
                                    <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        {t('pages.company_overview.subtitle')}
                                    </span>
                                </div>
                                <h2 className="text-xl leading-relaxed font-light text-gray-900 sm:text-2xl">
                                    {t('pages.company_overview.main_heading')}
                                </h2>
                            </div>

                            {/* Dynamic Content Sections */}
                            <div className="space-y-4">
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
                                            transitionDelay: `${600 + index * 200}ms`,
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

                            {/* Mobile Bottom Section */}
                            <div
                                className={`mt-12 transform pt-6 transition-all delay-1200 duration-1500 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                            >
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <h4 className="text-base font-medium text-gray-900 sm:text-lg">
                                            {t('pages.company_overview.cta.future_title')}
                                        </h4>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            {t('pages.company_overview.cta.future_desc')}
                                        </p>
                                    </div>
                                    <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg sm:w-auto">
                                        <span className="relative z-10">{t('pages.company_overview.cta.learn_more_btn')}</span>
                                        <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout - Side by Side */}
                <div className="relative hidden w-full lg:flex" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
                    {/* Left Side - Your Image and Title, with animation */}
                    <div className="relative h-full w-1/2 flex-shrink-0 overflow-hidden bg-black">
                        <img
                            src={imageUrl('companyoverview.jpg')}
                            alt={t('pages.company_overview.alt_texts.papua_forest')}
                            className="h-full w-full object-cover opacity-70"
                        />
                        <div
                            className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <h1 className="text-5xl leading-tight font-light text-white">
                                {t('pages.company_overview.page_title').split(' ')[0]}
                                <br />
                                <span className="font-normal">{t('pages.company_overview.page_title').split(' ')[1]}</span>
                            </h1>
                            <div className="mt-6 h-1 w-20 bg-yellow-400"></div>
                        </div>
                        {/* Floating Stats */}
                        <div
                            className={`absolute top-16 right-16 transform transition-all delay-500 duration-1500 ${
                                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                            }`}
                        >
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    {Object.entries(companyData).map(([key, value]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="text-lg font-bold text-yellow-400">{value}</div>
                                            <div className="text-xs tracking-wide text-white/80 uppercase">
                                                {t(`pages.company_overview.company_data.${key}`)}
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
                                            {t('pages.company_overview.subtitle')}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl leading-relaxed font-light text-gray-900">{t('pages.company_overview.main_heading')}</h2>
                                </div>
                                {/* Dynamic Content Sections */}
                                <div className="space-y-8">
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
                                                transitionDelay: `${600 + index * 200}ms`,
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
                                {/* Bottom Section */}
                                <div
                                    className={`mt-16 transform pt-8 transition-all delay-1200 duration-1500 ${
                                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                >
                                    <div className="space-y-6 text-center">
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-medium text-gray-900">{t('pages.company_overview.cta.future_title')}</h4>
                                            <p className="text-sm leading-relaxed text-gray-600">{t('pages.company_overview.cta.future_desc')}</p>
                                        </div>
                                        <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                            <span className="relative z-10">{t('pages.company_overview.cta.learn_more_btn')}</span>
                                            <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {/* Elegant Custom Styles */}
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

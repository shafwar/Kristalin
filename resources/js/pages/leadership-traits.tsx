import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

// SVG Icon Components
const IconCompetent = () => (
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
        <path d="M9 11H3a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h6" />
        <path d="M11 11V3a2 2 0 0 1 2-2h3c1.1 0 2 .9 2 2v8" />
        <path d="M21 11H15" />
        <path d="M7 19V11" />
    </svg>
);

const IconVisionary = () => (
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
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const IconInspiring = () => (
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
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const IconSelfActualizing = () => (
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
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const IconHumble = () => (
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
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

export default function LeadershipTraitsPage() {
    const { t } = useTranslation();
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTrait, setActiveTrait] = useState(0);

    const HEADER_HEIGHT = 80;
    const FOOTER_HEIGHT = 40;

    useEffect(() => {
        if (rightPanelRef.current) {
            rightPanelRef.current.scrollTop = 0;
        }
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Auto-cycle through leadership traits
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTrait((prev) => (prev + 1) % 5);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    const leadershipTraits = [
        {
            title: t('pages.leadership_traits.traits.0.title'),
            subtitle: t('pages.leadership_traits.traits.0.subtitle'),
            description: t('pages.leadership_traits.traits.0.description'),
            icon: <IconCompetent />,
        },
        {
            title: t('pages.leadership_traits.traits.1.title'),
            subtitle: t('pages.leadership_traits.traits.1.subtitle'),
            description: t('pages.leadership_traits.traits.1.description'),
            icon: <IconVisionary />,
        },
        {
            title: t('pages.leadership_traits.traits.2.title'),
            subtitle: t('pages.leadership_traits.traits.2.subtitle'),
            description: t('pages.leadership_traits.traits.2.description'),
            icon: <IconInspiring />,
        },
        {
            title: t('pages.leadership_traits.traits.3.title'),
            subtitle: t('pages.leadership_traits.traits.3.subtitle'),
            description: t('pages.leadership_traits.traits.3.description'),
            icon: <IconSelfActualizing />,
        },
        {
            title: t('pages.leadership_traits.traits.4.title'),
            subtitle: t('pages.leadership_traits.traits.4.subtitle'),
            description: t('pages.leadership_traits.traits.4.description'),
            icon: <IconHumble />,
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
                            src={imageUrl('leadership.jpg')}
                            alt={t('pages.leadership_traits.alt_texts.leadership_meeting')}
                            className="h-full w-full object-cover opacity-70"
                        />

                        {/* Mobile Title */}
                        <div
                            className={`absolute right-4 bottom-6 left-4 transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <h1 className="text-2xl leading-tight font-light text-white sm:text-3xl">
                                {t('pages.leadership_traits.hero_title_1')}
                                <br />
                                <span className="font-normal">{t('pages.leadership_traits.hero_title_2')}</span>
                            </h1>
                            <div className="mt-4 h-1 w-16 bg-yellow-400"></div>
                            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{t('pages.leadership_traits.hero_list')}</p>
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
                                        {t('pages.leadership_traits.header')}
                                    </span>
                                </div>
                                <h2 className="mb-3 text-xl leading-relaxed font-light text-gray-900 sm:text-2xl">
                                    {t('pages.leadership_traits.main_heading')}
                                </h2>
                                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{t('pages.leadership_traits.hero_list')}</p>
                            </div>

                            {/* Leadership Traits List */}
                            <div className="space-y-4">
                                {leadershipTraits.map((trait, index) => (
                                    <div
                                        key={index}
                                        className={`group transform cursor-pointer transition-all duration-1000 ${
                                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        } ${
                                            activeTrait === index
                                                ? 'scale-[1.02] rounded-xl bg-yellow-50 p-4 shadow-lg'
                                                : 'rounded-xl p-4 hover:bg-gray-50'
                                        }`}
                                        style={{
                                            transitionDelay: `${500 + index * 150}ms`,
                                        }}
                                        onClick={() => setActiveTrait(index)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            {/* Icon */}
                                            <div
                                                className={`flex-shrink-0 transition-all duration-500 ${
                                                    activeTrait === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                                                }`}
                                            >
                                                {trait.icon}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <div className="mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase">
                                                        {trait.subtitle}
                                                    </div>
                                                    <h3
                                                        className={`text-base leading-tight font-semibold transition-colors duration-300 sm:text-lg ${
                                                            activeTrait === index ? 'text-yellow-700' : 'text-gray-900 group-hover:text-yellow-600'
                                                        }`}
                                                    >
                                                        {trait.title}
                                                    </h3>
                                                </div>
                                                <p
                                                    className={`leading-relaxed transition-all duration-500 ${
                                                        activeTrait === index
                                                            ? 'text-sm text-gray-800 sm:text-base'
                                                            : 'text-xs text-gray-600 group-hover:text-gray-800 sm:text-sm'
                                                    }`}
                                                >
                                                    {trait.description}
                                                </p>

                                                {/* Progress Bar */}
                                                <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                                                    <div
                                                        className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                                            activeTrait === index ? 'w-full' : 'w-0'
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
                                className={`mt-12 transform border-t border-gray-200 pt-6 transition-all delay-1200 duration-1500 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                            >
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <h4 className="text-base font-medium text-gray-900 sm:text-lg">{t('pages.leadership_traits.cta_title')}</h4>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">{t('pages.leadership_traits.cta_desc')}</p>
                                    </div>
                                    <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                        <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                            <span className="relative z-10">{t('pages.leadership_traits.cta_btn_1')}</span>
                                            <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100"></div>
                                        </button>
                                        <button className="group rounded-full border-2 border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white">
                                            {t('pages.leadership_traits.cta_btn_2')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout - Side by Side */}
                <div className="relative hidden w-full lg:flex" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
                    {/* Left Side - Image and Title */}
                    <div className="relative h-full w-1/2 flex-shrink-0 overflow-hidden bg-black">
                        <img
                            src={imageUrl('leadership.jpg')}
                            alt={t('pages.leadership_traits.alt_texts.leadership_meeting')}
                            className="h-full w-full object-cover opacity-70"
                        />
                        <div
                            className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <h1 className="text-5xl leading-tight font-light text-white">
                                {t('pages.leadership_traits.hero_title_1')}
                                <br />
                                <span className="font-normal">{t('pages.leadership_traits.hero_title_2')}</span>
                            </h1>
                            <div className="mt-6 h-1 w-20 bg-yellow-400"></div>
                            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">{t('pages.leadership_traits.hero_list')}</p>
                        </div>
                    </div>

                    {/* Right Side - Leadership Traits Content */}
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
                                            {t('pages.leadership_traits.header')}
                                        </span>
                                    </div>
                                    <h2 className="mb-4 text-3xl leading-relaxed font-light text-gray-900">
                                        {t('pages.leadership_traits.main_heading')}
                                    </h2>
                                    <p className="text-base leading-relaxed text-gray-600">{t('pages.leadership_traits.hero_list')}</p>
                                </div>

                                {/* Leadership Traits List */}
                                <div className="space-y-8">
                                    {leadershipTraits.map((trait, index) => (
                                        <div
                                            key={index}
                                            className={`group transform cursor-pointer transition-all duration-1000 ${
                                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            } ${
                                                activeTrait === index
                                                    ? '-mx-2 scale-105 rounded-2xl bg-yellow-50 p-6 shadow-lg'
                                                    : '-mx-2 rounded-2xl p-6 hover:bg-gray-50'
                                            }`}
                                            style={{
                                                transitionDelay: `${500 + index * 150}ms`,
                                            }}
                                            onClick={() => setActiveTrait(index)}
                                        >
                                            <div className="flex items-start space-x-4">
                                                {/* Icon */}
                                                <div
                                                    className={`flex-shrink-0 text-2xl transition-all duration-500 ${
                                                        activeTrait === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                                                    }`}
                                                >
                                                    {trait.icon}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 space-y-3">
                                                    <div>
                                                        <div className="mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase">
                                                            {trait.subtitle}
                                                        </div>
                                                        <h3
                                                            className={`text-xl leading-tight font-semibold transition-colors duration-300 ${
                                                                activeTrait === index
                                                                    ? 'text-yellow-700'
                                                                    : 'text-gray-900 group-hover:text-yellow-600'
                                                            }`}
                                                        >
                                                            {trait.title}
                                                        </h3>
                                                    </div>
                                                    <p
                                                        className={`leading-relaxed transition-all duration-500 ${
                                                            activeTrait === index
                                                                ? 'text-base text-gray-800'
                                                                : 'text-sm text-gray-600 group-hover:text-gray-800'
                                                        }`}
                                                    >
                                                        {trait.description}
                                                    </p>

                                                    {/* Progress Bar */}
                                                    <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                                                        <div
                                                            className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${
                                                                activeTrait === index ? 'w-full' : 'w-0'
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
                                    className={`mt-16 transform border-t border-gray-200 pt-8 transition-all delay-1200 duration-1500 ${
                                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                >
                                    <div className="space-y-6 text-center">
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-medium text-gray-900">{t('pages.leadership_traits.cta_title')}</h4>
                                            <p className="text-sm leading-relaxed text-gray-600">{t('pages.leadership_traits.cta_desc')}</p>
                                        </div>
                                        <div className="flex justify-center space-x-4">
                                            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                <span className="relative z-10">{t('pages.leadership_traits.cta_btn_1')}</span>
                                                <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100"></div>
                                            </button>
                                            <button className="group rounded-full border-2 border-yellow-500 px-8 py-3 font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white">
                                                {t('pages.leadership_traits.cta_btn_2')}
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

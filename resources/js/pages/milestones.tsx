import { MilestoneTimelinePanel, resolveMilestoneFilterGroup, type MilestoneItem } from '@/components/MilestoneTimelinePanel';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useIsLargeScreen } from '../hooks/use-large-screen';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

export default function MilestonesPage() {
    const { t } = useTranslation();
    const isLargeScreen = useIsLargeScreen();
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeYear, setActiveYear] = useState<string>('2024');

    const HEADER_HEIGHT = 80;
    const FOOTER_HEIGHT = 40;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const resolveFilterGroup = useCallback((category: string) => resolveMilestoneFilterGroup(category, t), [t]);
    const handleYearChange = useCallback((year: string) => setActiveYear(year), []);

    const filterLabels = {
        all: t('pages.milestones.filters.all'),
        legal: t('pages.milestones.filters.legal'),
        production: t('pages.milestones.filters.production'),
        csr: t('pages.milestones.filters.csr'),
        investment: t('pages.milestones.filters.investment'),
        foundation: t('pages.milestones.filters.foundation'),
    };

    const companyStats: Record<string, string> = {
        established: t('pages.milestones.company_values.established_year'),
        milestones: t('pages.milestones.company_values.milestones_count'),
        location: t('pages.milestones.company_values.location_area'),
        growth: t('pages.milestones.company_values.growth_status'),
    };

    // Single unified timeline - All milestones from 1989 to 2025
    const allMilestones: MilestoneItem[] = [
        // 2024-Now: Full Production
        {
            year: '2024',
            month: t('pages.milestones.months.December'),
            title: t('pages.milestones.milestones_data.2020-2025.0.title'),
            description: t('pages.milestones.milestones_data.2020-2025.0.description'),
            category: t('pages.milestones.categories.Operational Growth'),
        },
        // 2024: MODI & MOMI Registration
        {
            year: '2024',
            month: t('pages.milestones.months.October'),
            title: t('pages.milestones.milestones_data.2020-2025.1.title'),
            description: t('pages.milestones.milestones_data.2020-2025.1.description'),
            category: t('pages.milestones.categories.Legal Milestone'),
        },
        // 2020: Production IUP 108 & 112
        {
            year: '2020',
            month: t('pages.milestones.months.January'),
            title: t('pages.milestones.milestones_data.2020-2025.2.title'),
            description: t('pages.milestones.milestones_data.2020-2025.2.description'),
            category: t('pages.milestones.categories.Production Milestone'),
        },
        // 2016-2019: Exploration & Trial Production
        {
            year: '2019',
            month: t('pages.milestones.months.March'),
            title: t('pages.milestones.milestones_data.2015-2019.0.title'),
            description: t('pages.milestones.milestones_data.2015-2019.0.description'),
            category: t('pages.milestones.categories.Operational Growth'),
        },
        // 2016-2020: CSR - Sembako
        {
            year: '2018',
            month: t('pages.milestones.months.June'),
            title: t('pages.milestones.milestones_data.2015-2019.1.title'),
            description: t('pages.milestones.milestones_data.2015-2019.1.description'),
            category: t('pages.milestones.categories.Social Responsibility'),
        },
        // 2016-2020: CSR - Housing
        {
            year: '2017',
            month: t('pages.milestones.months.April'),
            title: t('pages.milestones.milestones_data.2015-2019.2.title'),
            description: t('pages.milestones.milestones_data.2015-2019.2.description'),
            category: t('pages.milestones.categories.Social Responsibility'),
        },
        // 2016-2020: CSR - Health & Education
        {
            year: '2017',
            month: t('pages.milestones.months.February'),
            title: t('pages.milestones.milestones_data.2015-2019.3.title'),
            description: t('pages.milestones.milestones_data.2015-2019.3.description'),
            category: t('pages.milestones.categories.Social Responsibility'),
        },
        // 2016-2020: CSR - Water Irrigation
        {
            year: '2016',
            month: t('pages.milestones.months.August'),
            title: t('pages.milestones.milestones_data.2015-2019.4.title'),
            description: t('pages.milestones.milestones_data.2015-2019.4.description'),
            category: t('pages.milestones.categories.Social Responsibility'),
        },
        // 2013: External Investment
        {
            year: '2013',
            month: t('pages.milestones.months.June'),
            title: t('pages.milestones.milestones_data.2010-2014.0.title'),
            description: t('pages.milestones.milestones_data.2010-2014.0.description'),
            category: t('pages.milestones.categories.Investment & Growth'),
        },
        // 2010: IUP Exploration
        {
            year: '2010',
            month: t('pages.milestones.months.March'),
            title: t('pages.milestones.milestones_data.2010-2014.1.title'),
            description: t('pages.milestones.milestones_data.2010-2014.1.description'),
            category: t('pages.milestones.categories.Legal Milestone'),
        },
        // 2010-2020: Humas Community Contributions
        {
            year: '2010',
            month: t('pages.milestones.months.January'),
            title: t('pages.milestones.milestones_data.2010-2014.2.title'),
            description: t('pages.milestones.milestones_data.2010-2014.2.description'),
            category: t('pages.milestones.categories.Social Responsibility'),
        },
        // 2008: Mining Concession
        {
            year: '2008',
            month: t('pages.milestones.months.January'),
            title: t('pages.milestones.milestones_data.2005-2009.0.title'),
            description: t('pages.milestones.milestones_data.2005-2009.0.description'),
            category: t('pages.milestones.categories.Legal Milestone'),
        },
        // 1989: Company Establishment
        {
            year: '1989',
            month: t('pages.milestones.months.January'),
            title: t('pages.milestones.milestones_data.1989-1999.0.title'),
            description: t('pages.milestones.milestones_data.1989-1999.0.description'),
            category: t('pages.milestones.categories.Company Foundation'),
        },
    ];

    const getCategoryColor = (category: string): string => {
        // Map translated categories to colors by checking against English version
        const englishCategories: Record<string, string> = {
            [t('pages.milestones.categories.Company Foundation')]: 'bg-blue-100 text-blue-800',
            [t('pages.milestones.categories.Technology Innovation')]: 'bg-purple-100 text-purple-800',
            [t('pages.milestones.categories.International Partnership')]: 'bg-green-100 text-green-800',
            [t('pages.milestones.categories.Environmental Excellence')]: 'bg-emerald-100 text-emerald-800',
            [t('pages.milestones.categories.Operational Growth')]: 'bg-orange-100 text-orange-800',
            [t('pages.milestones.categories.Social Responsibility')]: 'bg-pink-100 text-pink-800',
            [t('pages.milestones.categories.Safety Achievement')]: 'bg-red-100 text-red-800',
            [t('pages.milestones.categories.Investment & Growth')]: 'bg-indigo-100 text-indigo-800',
            [t('pages.milestones.categories.Infrastructure Development')]: 'bg-gray-100 text-gray-800',
            [t('pages.milestones.categories.Quality Excellence')]: 'bg-yellow-100 text-yellow-800',
            [t('pages.milestones.categories.Production Excellence')]: 'bg-cyan-100 text-cyan-800',
            [t('pages.milestones.categories.Community Partnership')]: 'bg-teal-100 text-teal-800',
            [t('pages.milestones.categories.Business Expansion')]: 'bg-violet-100 text-violet-800',
            [t('pages.milestones.categories.Production Milestone')]: 'bg-amber-100 text-amber-800',
            [t('pages.milestones.categories.Exploration Achievement')]: 'bg-lime-100 text-lime-800',
            [t('pages.milestones.categories.Legal Milestone')]: 'bg-slate-100 text-slate-800',
            [t('pages.milestones.categories.Human Resource Development')]: 'bg-rose-100 text-rose-800',
            [t('pages.milestones.categories.Technology Advancement')]: 'bg-fuchsia-100 text-fuchsia-800',
            [t('pages.milestones.categories.Operational Excellence')]: 'bg-orange-100 text-orange-800',
            [t('pages.milestones.categories.Environmental Initiative')]: 'bg-green-100 text-green-800',
            [t('pages.milestones.categories.Operational Expansion')]: 'bg-blue-100 text-blue-800',
            [t('pages.milestones.categories.Technology Upgrade')]: 'bg-purple-100 text-purple-800',
            [t('pages.milestones.categories.Exploration Initiative')]: 'bg-lime-100 text-lime-800',
            [t('pages.milestones.categories.Regional Expansion')]: 'bg-blue-100 text-blue-800',
            [t('pages.milestones.categories.Safety Implementation')]: 'bg-red-100 text-red-800',
        };
        return englishCategories[category] || 'bg-gray-100 text-gray-800';
    };

    const timelinePanel = (
        <MilestoneTimelinePanel
            milestones={allMilestones}
            getCategoryColor={getCategoryColor}
            resolveFilterGroup={resolveFilterGroup}
            filterLabels={filterLabels}
            emptyFilterMessage={t('pages.milestones.empty_filter')}
            activeYear={activeYear}
            onYearChange={handleYearChange}
            variant={isLargeScreen ? 'desktop' : 'mobile'}
            isLoaded={isLoaded}
        />
    );

    const activeYearBadge = (
        <div
            key={activeYear}
            className={clsx(
                'transition-all duration-500 motion-reduce:transition-none',
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            )}
        >
            <p className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase sm:text-xs">
                {t('pages.milestones.active_year_label')}
            </p>
            <p className="text-4xl font-light text-yellow-400 tabular-nums sm:text-5xl lg:text-6xl">{activeYear}</p>
        </div>
    );

    if (isLargeScreen === undefined) {
        return (
            <div className="flex min-h-screen flex-col bg-white">
                <Header sticky={true} transparent={false} />
                <div className="flex flex-1 items-center justify-center pt-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
            <Header sticky={true} transparent={false} />
            <div className="z-10 flex flex-1 flex-col pt-16 sm:pt-20">
                {!isLargeScreen ? (
                /* Mobile & tablet */
                <div>
                    <div className="relative min-h-[50vh] overflow-hidden bg-black sm:min-h-[55vh]">
                        <img
                            src={imageUrl('milestone(new).jpg')}
                            alt={t('pages.milestones.alt_texts.mining_history')}
                            className="h-full w-full min-h-[50vh] object-cover opacity-70 sm:min-h-[55vh]"
                        />

                        <div className="absolute top-4 right-4 left-4 flex items-start justify-between gap-3 sm:top-6 sm:right-6 sm:left-6">
                            {activeYearBadge}
                            <div
                                className={clsx(
                                    'shrink-0 rounded-xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md sm:p-3',
                                    isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
                                    'transition-all duration-700 delay-300',
                                )}
                            >
                                <div className="grid grid-cols-2 gap-2 text-center sm:gap-3">
                                    {Object.entries(companyStats).map(([key, value]: [string, string]) => (
                                        <div key={key} className="space-y-0.5">
                                            <div className="text-xs font-bold text-yellow-400 sm:text-sm">{value}</div>
                                            <div className="text-[10px] tracking-wide text-white/80 uppercase sm:text-xs">
                                                {t(`pages.milestones.company_stats.${key}`)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div
                            className={clsx(
                                'absolute right-4 bottom-6 left-4 sm:bottom-8 sm:left-6 sm:right-6',
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                                'transition-all duration-1000 ease-out',
                            )}
                        >
                            <h1 className="text-2xl leading-tight font-light text-white sm:text-3xl">
                                {t('pages.milestones.page_title').split(' ')[0]}
                                <br />
                                <span className="font-normal">{t('pages.milestones.page_title').split(' ')[1]}</span>
                            </h1>
                            <div className="mt-3 h-1 w-14 bg-yellow-400 sm:mt-4 sm:w-16" />
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-3 sm:text-base">
                                {t('pages.milestones.main_description')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white px-4 py-6 sm:px-6 sm:py-8">
                        <div className="mx-auto max-w-2xl">
                            <div className={clsx('mb-4 sm:mb-6', isLoaded ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-700')}>
                                <div className="mb-3 flex items-center gap-2 sm:gap-3">
                                    <span className="text-xs font-medium tracking-wider text-gray-500 uppercase sm:text-sm">
                                        {t('pages.milestones.subtitle')}
                                    </span>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md sm:px-6 sm:py-2">
                                    {t('pages.milestones.timeline_range')}
                                </div>
                            </div>
                            {timelinePanel}
                        </div>
                    </div>
                </div>
                ) : (
                /* Desktop */
                <div className="relative flex w-full" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
                    {/* Left Side - Image and Title with animations */}
                    <div className="relative h-full w-1/2 flex-shrink-0 overflow-hidden bg-black">
                        <img
                            src={imageUrl('milestone(new).jpg')}
                            alt={t('pages.milestones.alt_texts.mining_history')}
                            className="h-full w-full object-cover opacity-70"
                        />
                        <div className="pointer-events-none absolute top-1/2 left-6 z-10 -translate-y-1/2 xl:left-10">
                            {activeYearBadge}
                        </div>
                        <div
                            className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                        >
                            <h1 className="text-5xl leading-tight font-light text-white">
                                {t('pages.milestones.page_title').split(' ')[0]}
                                <br />
                                <span className="font-normal">{t('pages.milestones.page_title').split(' ')[1]}</span>
                            </h1>
                            <div className="mt-6 h-1 w-20 bg-yellow-400"></div>
                            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">{t('pages.milestones.main_description')}</p>
                        </div>
                        {/* Floating Company Stats */}
                        <div
                            className={`absolute top-16 right-16 transform transition-all delay-500 duration-1500 ${
                                isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                            }`}
                        >
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    {Object.entries(companyStats).map(([key, value]: [string, string]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="text-lg font-bold text-yellow-400">{value}</div>
                                            <div className="text-xs tracking-wide text-white/80 uppercase">
                                                {t(`pages.milestones.company_stats.${key}`)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Milestones Content */}
                    <div className="relative h-full w-1/2 flex-shrink-0 bg-white">
                        {/* Accent Line */}
                        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>

                        {/* Content Container */}
                        <div className="flex h-full flex-col" style={{ padding: '2rem' }}>
                            {/* Timeline Header */}
                            <div
                                className={`mb-6 transform transition-all delay-300 duration-1000 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                            >
                                <div className="mb-4 flex items-center space-x-3">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#fbbf24"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                                        {t('pages.milestones.subtitle')}
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    <div className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-2.5 text-white shadow-md">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-[18px] w-[18px]"
                                        >
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <span className="font-semibold tracking-wide">{t('pages.milestones.timeline_range')}</span>
                                    </div>
                                </div>
                            </div>

                            {timelinePanel}
                        </div>
                    </div>
                </div>
                )}
            </div>
            <Footer />
            {/* Custom Styles */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        .milestone-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .milestone-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .milestone-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
        .milestone-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
        }
        .milestone-years-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .milestone-years-scroll::-webkit-scrollbar {
          display: none;
        }
      `,
                }}
            />
        </div>
    );
}

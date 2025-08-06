import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../hooks/useTranslation';

// SVG Icon Components
const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12,5 19,12 12,19"/>
  </svg>
);

// Types
interface Milestone {
  year: string;
  month: string;
  title: string;
  description: string;
  category: string;
}

type MilestonesData = {
  [period: string]: Milestone[];
};

// Enhanced Year Selection Component
interface YearSelectionProps {
  yearPeriods: string[];
  activeYear: string;
  setActiveYear: (year: string) => void;
  setSelectedMilestone: (idx: number) => void;
  isLoaded: boolean;
  t: ReturnType<typeof useTranslation>["t"];
}

const YearSelection = ({ yearPeriods, activeYear, setActiveYear, setSelectedMilestone, isLoaded, t }: YearSelectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll active pill into view when activeYear changes
  useEffect(() => {
    const idx = yearPeriods.indexOf(activeYear);
    const pill = pillRefs.current[idx];
    if (pill && containerRef.current) {
      pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeYear, yearPeriods]);

  // Arrow logic (FIXED: left = -1, right = +1)
  const currentIndex = yearPeriods.indexOf(activeYear);
  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex === yearPeriods.length - 1;

  return (
    <div className={`mb-4 sm:mb-6 transform transition-all duration-1000 delay-300 ${
      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    }`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className="text-gray-500 uppercase tracking-wider text-xs sm:text-sm font-medium">
            {t('pages.milestones.subtitle')}
          </span>
        </div>
      </div>
      {/* Enhanced Year Navigation */}
      <div className="relative">
        {/* Background Track */}
        <div className="absolute inset-0 bg-gray-100 rounded-xl sm:rounded-2xl h-12 sm:h-14"></div>
        {/* Navigation Container */}
        <div className="relative flex items-center h-12 sm:h-14 px-2 sm:px-3">
          {/* Left Arrow */}
          <button
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl transition-all duration-300 z-10 flex-shrink-0 ${
              isLeftDisabled
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-yellow-600 hover:bg-white hover:shadow-md'
            }`}
            onClick={() => {
              if (!isLeftDisabled) {
                setActiveYear(yearPeriods[currentIndex - 1]);
                setSelectedMilestone(0);
              }
            }}
            disabled={isLeftDisabled}
            aria-label={t('pages.milestones.navigation.previous_year')}
            tabIndex={isLeftDisabled ? -1 : 0}
          >
            <IconArrowLeft />
          </button>

          {/* Year Pills Container */}
          <div
            className="flex-1 flex items-center justify-start w-full space-x-1 sm:space-x-2 mx-2 sm:mx-3 overflow-x-auto scrollbar-hide px-3 sm:px-6 pr-4 sm:pr-8"
            ref={containerRef}
            style={{ scrollBehavior: 'smooth', minWidth: 0, scrollPaddingLeft: '16px', scrollPaddingRight: '16px' }}
          >
            {yearPeriods.map((period: string, index: number) => {
              const isActive = activeYear === period;
              const isAdjacent = Math.abs(currentIndex - index) === 1;
              return (
                <button
                  key={period}
                  ref={el => { pillRefs.current[index] = el; }}
                  onClick={() => {
                    setActiveYear(period);
                    setSelectedMilestone(0);
                  }}
                  className={`relative flex-shrink-0 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all duration-500 whitespace-nowrap min-w-[80px] sm:min-w-[100px] max-w-[120px] sm:max-w-[160px] transform focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    isActive
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg scale-105 z-20'
                      : isAdjacent
                      ? 'text-gray-700 hover:text-yellow-600 hover:bg-white hover:shadow-md scale-100 z-10'
                      : 'text-gray-500 hover:text-yellow-600 hover:bg-gray-50 scale-95 z-5'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  role="button"
                  tabIndex={0}
                >
                  {/* Active Glow Effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg sm:rounded-xl blur-sm opacity-30 -z-10 animate-pulse"></div>
                  )}
                  {/* Period Text */}
                  <span className="relative z-10 text-center block w-full">{period}</span>
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl transition-all duration-300 z-10 flex-shrink-0 ${
              isRightDisabled
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-yellow-600 hover:bg-white hover:shadow-md'
            }`}
            onClick={() => {
              if (!isRightDisabled) {
                setActiveYear(yearPeriods[currentIndex + 1]);
                setSelectedMilestone(0);
              }
            }}
            disabled={isRightDisabled}
            aria-label={t('pages.milestones.navigation.next_year')}
            tabIndex={isRightDisabled ? -1 : 0}
          >
            <IconArrowRight />
          </button>
        </div>
        {/* Custom scrollbar-hide style */}
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default function MilestonesPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeYear, setActiveYear] = useState<string>('2020-2025');

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const yearPeriods: string[] = ['2020-2025', '2015-2019', '2010-2014', '2005-2009', '2000-2004', '1989-1999'];

  const companyStats: Record<string, string> = {
    established: t('pages.milestones.company_values.established_year'),
    milestones: t('pages.milestones.company_values.milestones_count'),
    location: t('pages.milestones.company_values.location_area'),
    growth: t('pages.milestones.company_values.growth_status')
  };

  // Simplified milestones data structure with translations
  const milestonesData: MilestonesData = {
    '2020-2025': [
      {
        year: '2025',
        month: t('pages.milestones.months.April'),
        title: t('pages.milestones.milestones_data.2020-2025.0.title'),
        description: t('pages.milestones.milestones_data.2020-2025.0.description'),
        category: t('pages.milestones.categories.Production Excellence')
      },
      {
        year: '2024',
        month: t('pages.milestones.months.December'),
        title: t('pages.milestones.milestones_data.2020-2025.1.title'),
        description: t('pages.milestones.milestones_data.2020-2025.1.description'),
        category: t('pages.milestones.categories.Operational Growth')
      },
      {
        year: '2023',
        month: t('pages.milestones.months.September'),
        title: t('pages.milestones.milestones_data.2020-2025.2.title'),
        description: t('pages.milestones.milestones_data.2020-2025.2.description'),
        category: t('pages.milestones.categories.International Partnership')
      },
      {
        year: '2022',
        month: t('pages.milestones.months.June'),
        title: t('pages.milestones.milestones_data.2020-2025.3.title'),
        description: t('pages.milestones.milestones_data.2020-2025.3.description'),
        category: t('pages.milestones.categories.Environmental Excellence')
      },
      {
        year: '2021',
        month: t('pages.milestones.months.March'),
        title: t('pages.milestones.milestones_data.2020-2025.4.title'),
        description: t('pages.milestones.milestones_data.2020-2025.4.description'),
        category: t('pages.milestones.categories.Operational Growth')
      },
      {
        year: '2020',
        month: t('pages.milestones.months.January'),
        title: t('pages.milestones.milestones_data.2020-2025.5.title'),
        description: t('pages.milestones.milestones_data.2020-2025.5.description'),
        category: t('pages.milestones.categories.Technology Innovation')
      }
    ],
    '2015-2019': [
      {
        year: '2019',
        month: t('pages.milestones.months.November'),
        title: t('pages.milestones.milestones_data.2015-2019.0.title'),
        description: t('pages.milestones.milestones_data.2015-2019.0.description'),
        category: t('pages.milestones.categories.Social Responsibility')
      },
      {
        year: '2018',
        month: t('pages.milestones.months.August'),
        title: t('pages.milestones.milestones_data.2015-2019.1.title'),
        description: t('pages.milestones.milestones_data.2015-2019.1.description'),
        category: t('pages.milestones.categories.International Partnership')
      },
      {
        year: '2017',
        month: t('pages.milestones.months.May'),
        title: t('pages.milestones.milestones_data.2015-2019.2.title'),
        description: t('pages.milestones.milestones_data.2015-2019.2.description'),
        category: t('pages.milestones.categories.Safety Achievement')
      },
      {
        year: '2016',
        month: t('pages.milestones.months.February'),
        title: t('pages.milestones.milestones_data.2015-2019.3.title'),
        description: t('pages.milestones.milestones_data.2015-2019.3.description'),
        category: t('pages.milestones.categories.Environmental Excellence')
      },
      {
        year: '2015',
        month: t('pages.milestones.months.October'),
        title: t('pages.milestones.milestones_data.2015-2019.4.title'),
        description: t('pages.milestones.milestones_data.2015-2019.4.description'),
        category: t('pages.milestones.categories.Investment & Growth')
      }
    ],
    '2010-2014': [
      {
        year: '2014',
        month: t('pages.milestones.months.December'),
        title: t('pages.milestones.milestones_data.2010-2014.0.title'),
        description: t('pages.milestones.milestones_data.2010-2014.0.description'),
        category: t('pages.milestones.categories.Infrastructure Development')
      },
      {
        year: '2013',
        month: t('pages.milestones.months.July'),
        title: t('pages.milestones.milestones_data.2010-2014.1.title'),
        description: t('pages.milestones.milestones_data.2010-2014.1.description'),
        category: t('pages.milestones.categories.Operational Expansion')
      },
      {
        year: '2012',
        month: t('pages.milestones.months.April'),
        title: t('pages.milestones.milestones_data.2010-2014.2.title'),
        description: t('pages.milestones.milestones_data.2010-2014.2.description'),
        category: t('pages.milestones.categories.Quality Excellence')
      },
      {
        year: '2011',
        month: t('pages.milestones.months.September'),
        title: t('pages.milestones.milestones_data.2010-2014.3.title'),
        description: t('pages.milestones.milestones_data.2010-2014.3.description'),
        category: t('pages.milestones.categories.Human Resource Development')
      },
      {
        year: '2010',
        month: t('pages.milestones.months.January'),
        title: t('pages.milestones.milestones_data.2010-2014.4.title'),
        description: t('pages.milestones.milestones_data.2010-2014.4.description'),
        category: t('pages.milestones.categories.Technology Upgrade')
      }
    ],
    '2005-2009': [
      {
        year: '2009',
        month: t('pages.milestones.months.November'),
        title: t('pages.milestones.milestones_data.2005-2009.0.title'),
        description: t('pages.milestones.milestones_data.2005-2009.0.description'),
        category: t('pages.milestones.categories.Environmental Initiative')
      },
      {
        year: '2008',
        month: t('pages.milestones.months.June'),
        title: t('pages.milestones.milestones_data.2005-2009.1.title'),
        description: t('pages.milestones.milestones_data.2005-2009.1.description'),
        category: t('pages.milestones.categories.Production Excellence')
      },
      {
        year: '2007',
        month: t('pages.milestones.months.March'),
        title: t('pages.milestones.milestones_data.2005-2009.2.title'),
        description: t('pages.milestones.milestones_data.2005-2009.2.description'),
        category: t('pages.milestones.categories.Community Partnership')
      },
      {
        year: '2006',
        month: t('pages.milestones.months.August'),
        title: t('pages.milestones.milestones_data.2005-2009.3.title'),
        description: t('pages.milestones.milestones_data.2005-2009.3.description'),
        category: t('pages.milestones.categories.Operational Excellence')
      },
      {
        year: '2005',
        month: t('pages.milestones.months.February'),
        title: t('pages.milestones.milestones_data.2005-2009.4.title'),
        description: t('pages.milestones.milestones_data.2005-2009.4.description'),
        category: t('pages.milestones.categories.Infrastructure Development')
      }
    ],
    '2000-2004': [
      {
        year: '2004',
        month: t('pages.milestones.months.October'),
        title: t('pages.milestones.milestones_data.2000-2004.0.title'),
        description: t('pages.milestones.milestones_data.2000-2004.0.description'),
        category: t('pages.milestones.categories.Business Expansion')
      },
      {
        year: '2003',
        month: t('pages.milestones.months.July'),
        title: t('pages.milestones.milestones_data.2000-2004.1.title'),
        description: t('pages.milestones.milestones_data.2000-2004.1.description'),
        category: t('pages.milestones.categories.Technology Advancement')
      },
      {
        year: '2002',
        month: t('pages.milestones.months.April'),
        title: t('pages.milestones.milestones_data.2000-2004.2.title'),
        description: t('pages.milestones.milestones_data.2000-2004.2.description'),
        category: t('pages.milestones.categories.Safety Implementation')
      },
      {
        year: '2001',
        month: t('pages.milestones.months.December'),
        title: t('pages.milestones.milestones_data.2000-2004.3.title'),
        description: t('pages.milestones.milestones_data.2000-2004.3.description'),
        category: t('pages.milestones.categories.Production Milestone')
      },
      {
        year: '2000',
        month: t('pages.milestones.months.March'),
        title: t('pages.milestones.milestones_data.2000-2004.4.title'),
        description: t('pages.milestones.milestones_data.2000-2004.4.description'),
        category: t('pages.milestones.categories.Exploration Achievement')
      }
    ],
    '1989-1999': [
      {
        year: '1999',
        month: t('pages.milestones.months.September'),
        title: t('pages.milestones.milestones_data.1989-1999.0.title'),
        description: t('pages.milestones.milestones_data.1989-1999.0.description'),
        category: t('pages.milestones.categories.Legal Milestone')
      },
      {
        year: '1995',
        month: t('pages.milestones.months.June'),
        title: t('pages.milestones.milestones_data.1989-1999.1.title'),
        description: t('pages.milestones.milestones_data.1989-1999.1.description'),
        category: t('pages.milestones.categories.Exploration Initiative')
      },
      {
        year: '1992',
        month: t('pages.milestones.months.November'),
        title: t('pages.milestones.milestones_data.1989-1999.2.title'),
        description: t('pages.milestones.milestones_data.1989-1999.2.description'),
        category: t('pages.milestones.categories.Regional Expansion')
      },
      {
        year: '1989',
        month: t('pages.milestones.months.August'),
        title: t('pages.milestones.milestones_data.1989-1999.3.title'),
        description: t('pages.milestones.milestones_data.1989-1999.3.description'),
        category: t('pages.milestones.categories.Company Foundation')
      }
    ]
  };

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

  const currentMilestones: Milestone[] = milestonesData[activeYear] || [];

  return (
    <div className="flex flex-col bg-white relative overflow-x-hidden min-h-screen">
      <Header sticky={true} transparent={false} />
      <div className="flex-1 flex flex-col z-10 pt-16 sm:pt-20">
        
        {/* Mobile Layout - Stack Vertically */}
        <div className="block lg:hidden">
          
          {/* Mobile Hero Section */}
          <div className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/db/f1/e4/dbf1e4748bc5aa40b231dcc9f3519ac0.jpg"
              alt={t('pages.milestones.alt_texts.mining_history')}
              className="w-full h-full object-cover opacity-70"
            />
            
            {/* Mobile Title */}
            <div className={`absolute bottom-6 left-4 right-4 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-2xl sm:text-3xl font-light leading-tight">
                {t('pages.milestones.page_title').split(' ')[0]}<br />
                <span className="font-normal">{t('pages.milestones.page_title').split(' ')[1]}</span>
              </h1>
              <div className="w-16 h-1 bg-yellow-400 mt-4"></div>
              <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
                {t('pages.milestones.main_description')}
              </p>
            </div>
            
            {/* Mobile Company Stats */}
            <div className={`absolute top-4 right-4 transform transition-all duration-1500 delay-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                <div className="grid grid-cols-2 gap-2 text-center">
                  {Object.entries(companyStats).map(([key, value]: [string, string]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-yellow-400 font-bold text-sm">{value}</div>
                      <div className="text-white/80 text-xs uppercase tracking-wide">{t(`pages.milestones.company_stats.${key}`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="bg-white p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
              
              {/* Year Navigation */}
              <YearSelection
                yearPeriods={yearPeriods}
                activeYear={activeYear}
                setActiveYear={setActiveYear}
                setSelectedMilestone={() => {}}
                isLoaded={isLoaded}
                t={t}
              />
              
              {/* Milestones Content */}
              <div className="space-y-4">
                {currentMilestones.map((milestone: Milestone) => (
                  <div
                    key={`${milestone.year}-${milestone.title}`}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } hover:bg-gray-50 rounded-xl p-4`}
                    style={{ 
                      transitionDelay: `${600 + (currentMilestones.indexOf(milestone) * 200)}ms` 
                    }}
                    onClick={() => {}}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Year Badge */}
                      <div className="flex-shrink-0 transition-all duration-500">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-lg px-3 py-2 text-center min-w-[60px] sm:min-w-[70px]">
                          <div className="font-bold text-sm sm:text-base">{milestone.year}</div>
                          <div className="text-xs opacity-90">{milestone.month}</div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(milestone.category)}`}>
                            {milestone.category}
                          </div>
                          <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 leading-tight text-gray-900 group-hover:text-yellow-600`}>
                            {milestone.title}
                          </h3>
                        </div>
                        <p className={`leading-relaxed transition-all duration-500 text-gray-600 text-xs sm:text-sm group-hover:text-gray-800`}>
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex w-full relative" style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}>
          {/* Left Side - Image and Title with animations */}
          <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
            <img 
              src="https://i.pinimg.com/736x/db/f1/e4/dbf1e4748bc5aa40b231dcc9f3519ac0.jpg"
              alt={t('pages.milestones.alt_texts.mining_history')}
              className="w-full h-full object-cover opacity-70"
            />
            <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-white text-5xl font-light leading-tight">
                {t('pages.milestones.page_title').split(' ')[0]}<br />
                <span className="font-normal">{t('pages.milestones.page_title').split(' ')[1]}</span>
              </h1>
              <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
              <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
                {t('pages.milestones.main_description')}
              </p>
            </div>
            {/* Floating Company Stats */}
            <div className={`absolute top-16 right-16 transform transition-all duration-1500 delay-500 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  {Object.entries(companyStats).map(([key, value]: [string, string]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-yellow-400 font-bold text-lg">{value}</div>
                      <div className="text-white/80 text-xs uppercase tracking-wide">{t(`pages.milestones.company_stats.${key}`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Milestones Content */}
          <div className="w-1/2 bg-white relative h-full flex-shrink-0">
            {/* Accent Line */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
            
            {/* Content Container */}
            <div className="h-full flex flex-col" style={{ padding: '2rem' }}>
              {/* Year Navigation */}
              <YearSelection
                yearPeriods={yearPeriods}
                activeYear={activeYear}
                setActiveYear={setActiveYear}
                setSelectedMilestone={() => {}}
                isLoaded={isLoaded}
                t={t}
              />
              {/* Milestones Content */}
              <div
                ref={rightPanelRef}
                className="flex-1 overflow-y-auto space-y-6"
              >
                {currentMilestones.map((milestone: Milestone) => (
                  <div
                    key={`${milestone.year}-${milestone.title}`}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } hover:bg-gray-50 rounded-2xl p-6 -mx-2`}
                    style={{ 
                      transitionDelay: `${600 + (currentMilestones.indexOf(milestone) * 200)}ms` 
                    }}
                    onClick={() => {}}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Year Badge */}
                      <div className="flex-shrink-0 transition-all duration-500">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-xl px-4 py-2 text-center min-w-[80px]">
                          <div className="font-bold text-lg">{milestone.year}</div>
                          <div className="text-xs opacity-90">{milestone.month}</div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(milestone.category)}`}>
                            {milestone.category}
                          </div>
                          <h3 className={`text-xl font-semibold transition-colors duration-300 leading-tight text-gray-900 group-hover:text-yellow-600`}>
                            {milestone.title}
                          </h3>
                        </div>
                        <p className={`leading-relaxed transition-all duration-500 text-gray-600 text-sm group-hover:text-gray-800`}>
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
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
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
        * { scroll-behavior: smooth; }
      `}} />
    </div>
  );
}
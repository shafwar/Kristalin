import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../hooks/useTranslation';
import { imageUrl } from '../lib/assets';

// Types
interface Milestone {
  year: string;
  month: string;
  title: string;
  description: string;
  category: string;
}

export default function MilestonesPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const companyStats: Record<string, string> = {
    established: t('pages.milestones.company_values.established_year'),
    milestones: t('pages.milestones.company_values.milestones_count'),
    location: t('pages.milestones.company_values.location_area'),
    growth: t('pages.milestones.company_values.growth_status')
  };

  // Single unified timeline - All milestones from 1989 to 2025
  const allMilestones: Milestone[] = [
    // 2024-Now: Full Production
    {
      year: '2024',
      month: t('pages.milestones.months.December'),
      title: t('pages.milestones.milestones_data.2020-2025.0.title'),
      description: t('pages.milestones.milestones_data.2020-2025.0.description'),
      category: t('pages.milestones.categories.Operational Growth')
    },
    // 2024: MODI & MOMI Registration
    {
      year: '2024',
      month: t('pages.milestones.months.October'),
      title: t('pages.milestones.milestones_data.2020-2025.1.title'),
      description: t('pages.milestones.milestones_data.2020-2025.1.description'),
      category: t('pages.milestones.categories.Legal Milestone')
    },
    // 2020: Production IUP 108 & 112
    {
      year: '2020',
      month: t('pages.milestones.months.January'),
      title: t('pages.milestones.milestones_data.2020-2025.2.title'),
      description: t('pages.milestones.milestones_data.2020-2025.2.description'),
      category: t('pages.milestones.categories.Production Milestone')
    },
    // 2016-2019: Exploration & Trial Production
    {
      year: '2019',
      month: t('pages.milestones.months.March'),
      title: t('pages.milestones.milestones_data.2015-2019.0.title'),
      description: t('pages.milestones.milestones_data.2015-2019.0.description'),
      category: t('pages.milestones.categories.Operational Growth')
    },
    // 2016-2020: CSR - Sembako
    {
      year: '2018',
      month: t('pages.milestones.months.June'),
      title: t('pages.milestones.milestones_data.2015-2019.1.title'),
      description: t('pages.milestones.milestones_data.2015-2019.1.description'),
      category: t('pages.milestones.categories.Social Responsibility')
    },
    // 2016-2020: CSR - Housing
    {
      year: '2017',
      month: t('pages.milestones.months.April'),
      title: t('pages.milestones.milestones_data.2015-2019.2.title'),
      description: t('pages.milestones.milestones_data.2015-2019.2.description'),
      category: t('pages.milestones.categories.Social Responsibility')
    },
    // 2016-2020: CSR - Health & Education
    {
      year: '2017',
      month: t('pages.milestones.months.February'),
      title: t('pages.milestones.milestones_data.2015-2019.3.title'),
      description: t('pages.milestones.milestones_data.2015-2019.3.description'),
      category: t('pages.milestones.categories.Social Responsibility')
    },
    // 2016-2020: CSR - Water Irrigation
    {
      year: '2016',
      month: t('pages.milestones.months.August'),
      title: t('pages.milestones.milestones_data.2015-2019.4.title'),
      description: t('pages.milestones.milestones_data.2015-2019.4.description'),
      category: t('pages.milestones.categories.Social Responsibility')
    },
    // 2013: External Investment
    {
      year: '2013',
      month: t('pages.milestones.months.June'),
      title: t('pages.milestones.milestones_data.2010-2014.0.title'),
      description: t('pages.milestones.milestones_data.2010-2014.0.description'),
      category: t('pages.milestones.categories.Investment & Growth')
    },
    // 2010: IUP Exploration
    {
      year: '2010',
      month: t('pages.milestones.months.March'),
      title: t('pages.milestones.milestones_data.2010-2014.1.title'),
      description: t('pages.milestones.milestones_data.2010-2014.1.description'),
      category: t('pages.milestones.categories.Legal Milestone')
    },
    // 2010-2020: Humas Community Contributions
    {
      year: '2010',
      month: t('pages.milestones.months.January'),
      title: t('pages.milestones.milestones_data.2010-2014.2.title'),
      description: t('pages.milestones.milestones_data.2010-2014.2.description'),
      category: t('pages.milestones.categories.Social Responsibility')
    },
    // 2008: Mining Concession
    {
      year: '2008',
      month: t('pages.milestones.months.January'),
      title: t('pages.milestones.milestones_data.2005-2009.0.title'),
      description: t('pages.milestones.milestones_data.2005-2009.0.description'),
      category: t('pages.milestones.categories.Legal Milestone')
    },
    // 1989: Company Establishment
    {
      year: '1989',
      month: t('pages.milestones.months.January'),
      title: t('pages.milestones.milestones_data.1989-1999.0.title'),
      description: t('pages.milestones.milestones_data.1989-1999.0.description'),
      category: t('pages.milestones.categories.Company Foundation')
    }
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

  return (
    <div className="flex flex-col bg-white relative overflow-x-hidden min-h-screen">
      <Header sticky={true} transparent={false} />
      <div className="flex-1 flex flex-col z-10 pt-16 sm:pt-20">
        
        {/* Mobile Layout - Stack Vertically */}
        <div className="block lg:hidden">
          
          {/* Mobile Hero Section */}
          <div className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
            <img 
              src={imageUrl('milestone.jpg')}
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
              
              {/* Timeline Header */}
              <div className={`mb-4 sm:mb-6 transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
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
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg px-6 py-2 shadow-md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span className="font-semibold text-sm tracking-wide">1989 - 2025</span>
                  </div>
                </div>
              </div>
              
              {/* Milestones Content */}
              <div className="space-y-4">
                {allMilestones.map((milestone: Milestone, index: number) => (
                  <div
                    key={`${milestone.year}-${milestone.title}`}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } hover:bg-gray-50 rounded-xl p-4`}
                    style={{ 
                      transitionDelay: `${600 + (index * 150)}ms` 
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
              src={imageUrl('milestone.jpg')}
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
              {/* Timeline Header */}
              <div className={`mb-6 transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span className="text-gray-500 uppercase tracking-wider text-sm font-medium">
                    {t('pages.milestones.subtitle')}
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg px-8 py-2.5 shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span className="font-semibold tracking-wide">1989 - 2025</span>
                  </div>
                </div>
              </div>
              
              {/* Milestones Content */}
              <div
                ref={rightPanelRef}
                className="flex-1 overflow-y-auto space-y-6"
              >
                {allMilestones.map((milestone: Milestone, index: number) => (
                  <div
                    key={`${milestone.year}-${milestone.title}`}
                    className={`transform transition-all duration-1000 cursor-pointer group ${
                      isLoaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } hover:bg-gray-50 rounded-2xl p-6 -mx-2`}
                    style={{ 
                      transitionDelay: `${600 + (index * 150)}ms` 
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
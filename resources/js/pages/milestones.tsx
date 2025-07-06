import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// SVG Icon Components
const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconTrophy = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <path d="M5.7 8C6.2 8 6.7 8.1 7.1 8.3L12 2l4.9 6.3c.4-.2.9-.3 1.4-.3 1.7 0 3 1.3 3 3s-1.3 3-3 3c-.5 0-.9-.1-1.4-.3L12 20 7.1 13.7c-.4.2-.9.3-1.4.3-1.7 0-3-1.3-3-3s1.3-3 3-3z"/>
  </svg>
);

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
}

const YearSelection = ({ yearPeriods, activeYear, setActiveYear, setSelectedMilestone, isLoaded }: YearSelectionProps) => {
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
    <div className={`mb-6 transform transition-all duration-1000 delay-300 ${
      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className="text-gray-500 uppercase tracking-wider text-sm font-medium">
            Company Milestones
          </span>
        </div>
      </div>
      {/* Enhanced Year Navigation */}
      <div className="relative">
        {/* Background Track */}
        <div className="absolute inset-0 bg-gray-100 rounded-2xl h-14"></div>
        {/* Navigation Container */}
        <div className="relative flex items-center h-14 px-3">
          {/* Left Arrow */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 z-10 flex-shrink-0 ${
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
            aria-label="Previous year period"
            tabIndex={isLeftDisabled ? -1 : 0}
          >
            <IconArrowLeft />
          </button>

          {/* Year Pills Container */}
          <div
            className="flex-1 flex items-center justify-start w-full space-x-2 mx-3 overflow-x-auto scrollbar-hide px-6 pr-8"
            ref={containerRef}
            style={{ scrollBehavior: 'smooth', minWidth: 0, scrollPaddingLeft: '32px', scrollPaddingRight: '32px' }}
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
                  className={`relative flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-500 whitespace-nowrap min-w-[100px] max-w-[160px] transform focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
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
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl blur-sm opacity-30 -z-10 animate-pulse"></div>
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
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 z-10 flex-shrink-0 ${
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
            aria-label="Next year period"
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
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeYear, setActiveYear] = useState<string>('2020-2025');
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through milestones for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const currentYearData = milestonesData[activeYear];
      if (currentYearData) {
        setSelectedMilestone(prev => (prev + 1) % currentYearData.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeYear]);

  const yearPeriods: string[] = ['2020-2025', '2015-2019', '2010-2014', '2005-2009', '2000-2004', '1989-1999'];

  const companyStats: Record<string, string> = {
    established: "1989",
    milestones: "35+ Years",
    location: "Papua",
    growth: "Continuous"
  };

  const milestonesData: MilestonesData = {
    '2020-2025': [
      {
        year: '2025',
        month: 'April',
        title: 'Record Gold Production Achievement',
        description: "Achieved the highest annual gold production in company history, surpassing 10 tons of refined gold and strengthening Kristalin Eka Lestari's position as a leading gold mining company in Indonesia.",
        category: 'Production Excellence'
      },
      {
        year: '2024',
        month: 'December',
        title: 'Expansion of Sustainable Gold Mining Operations',
        description: 'Completed the expansion of sustainable gold mining operations in Nabire, Papua, increasing production capacity while maintaining strict environmental and community standards.',
        category: 'Operational Growth'
      },
      {
        year: '2023', month: 'September', title: 'Strategic Partnership Expansion', description: 'Signed comprehensive collaboration agreement with leading Chinese mining technology firm, bringing world-class processing capabilities to our Papua operations.', category: 'International Partnership'
      },
      {
        year: '2022', month: 'June', title: 'Environmental Certification Achievement', description: 'Received ISO 14001 Environmental Management certification, reinforcing our commitment to sustainable mining practices and environmental stewardship in Papua.', category: 'Environmental Excellence'
      },
      {
        year: '2021', month: 'March', title: 'Production Capacity Expansion', description: 'Completed major infrastructure expansion project, doubling our gold processing capacity while maintaining strict environmental and safety standards.', category: 'Operational Growth'
      },
      {
        year: '2020', month: 'January', title: 'Digital Transformation Initiative', description: 'Launched comprehensive digital transformation program, implementing IoT sensors and real-time monitoring systems across all mining operations.', category: 'Technology Innovation'
      }
    ],
    '2015-2019': [
      {
        year: '2019', month: 'November', title: 'Community Development Program Launch', description: 'Established comprehensive community development program in Nabire, focusing on education, healthcare, and local economic empowerment initiatives.', category: 'Social Responsibility'
      },
      {
        year: '2018', month: 'August', title: 'Korean Technology Partnership', description: 'Formed strategic alliance with Korean mining equipment manufacturer, bringing advanced automation technology to our gold extraction processes.', category: 'International Partnership'
      },
      {
        year: '2017', month: 'May', title: 'Safety Excellence Recognition', description: 'Achieved zero-accident milestone for 1000+ consecutive working days, establishing new industry safety standards in Indonesian mining sector.', category: 'Safety Achievement'
      },
      {
        year: '2016', month: 'February', title: 'Sustainable Mining Certification', description: 'Became first mining company in Papua to receive sustainable mining certification, setting new environmental benchmarks for the region.', category: 'Environmental Excellence'
      },
      {
        year: '2015', month: 'October', title: 'Chinese Investment Collaboration', description: 'Secured major investment from Chinese partners, enabling significant expansion of mining operations and advanced equipment acquisition.', category: 'Investment & Growth'
      }
    ],
    '2010-2014': [
      {
        year: '2014', month: 'December', title: 'Advanced Processing Facility', description: 'Commissioned state-of-the-art gold processing facility, incorporating international best practices and environmental protection technologies.', category: 'Infrastructure Development'
      },
      {
        year: '2013', month: 'July', title: 'Regional Expansion Initiative', description: 'Extended operations to new mining concessions in Papua, diversifying extraction sites and increasing overall production capacity.', category: 'Operational Expansion'
      },
      {
        year: '2012', month: 'April', title: 'International Quality Standards', description: 'Achieved ISO 9001 quality management certification, demonstrating commitment to international operational excellence standards.', category: 'Quality Excellence'
      },
      {
        year: '2011', month: 'September', title: 'Workforce Development Program', description: 'Launched comprehensive training program for local workforce, creating skilled employment opportunities for Papua communities.', category: 'Human Resource Development'
      },
      {
        year: '2010', month: 'January', title: 'Modern Equipment Acquisition', description: 'Invested in modern mining equipment and machinery, significantly improving operational efficiency and safety standards.', category: 'Technology Upgrade'
      }
    ],
    '2005-2009': [
      {
        year: '2009', month: 'November', title: 'Environmental Management System', description: 'Implemented comprehensive environmental management system, establishing rehabilitation and conservation programs for mining areas.', category: 'Environmental Initiative'
      },
      {
        year: '2008', month: 'June', title: 'Production Milestone Achievement', description: 'Reached significant gold production milestone, establishing PT Kristalin Eka Lestari as major player in Indonesian mining industry.', category: 'Production Excellence'
      },
      {
        year: '2007', month: 'March', title: 'Local Partnership Development', description: 'Strengthened partnerships with local Papua communities, creating mutual benefit programs and sustainable development initiatives.', category: 'Community Partnership'
      },
      {
        year: '2006', month: 'August', title: 'Operational Excellence Program', description: 'Launched operational excellence program focusing on efficiency, safety, and environmental responsibility across all mining operations.', category: 'Operational Excellence'
      },
      {
        year: '2005', month: 'February', title: 'Infrastructure Development Project', description: 'Completed major infrastructure development project, improving access roads and establishing essential facilities for mining operations.', category: 'Infrastructure Development'
      }
    ],
    '2000-2004': [
      {
        year: '2004', month: 'October', title: 'Mining Concession Expansion', description: 'Secured additional mining concessions in Papua region, expanding operational footprint and increasing mineral resource portfolio.', category: 'Business Expansion'
      },
      {
        year: '2003', month: 'July', title: 'Technology Modernization', description: 'Initiated comprehensive technology modernization program, upgrading extraction and processing equipment for improved efficiency.', category: 'Technology Advancement'
      },
      {
        year: '2002', month: 'April', title: 'Safety Protocol Implementation', description: 'Established comprehensive safety protocols and training programs, prioritizing worker safety and operational risk management.', category: 'Safety Implementation'
      },
      {
        year: '2001', month: 'December', title: 'First Gold Production', description: 'Achieved first commercial gold production from Nabire operations, marking significant milestone in company development.', category: 'Production Milestone'
      },
      {
        year: '2000', month: 'March', title: 'Exploration Success', description: 'Completed successful exploration phase, confirming significant gold reserves in Papua region and validating business development strategy.', category: 'Exploration Achievement'
      }
    ],
    '1989-1999': [
      {
        year: '1999', month: 'September', title: 'Mining License Acquisition', description: 'Successfully obtained comprehensive mining licenses for Papua operations, laying foundation for large-scale gold mining activities.', category: 'Legal Milestone'
      },
      {
        year: '1995', month: 'June', title: 'Initial Exploration Phase', description: 'Commenced extensive geological exploration in Papua region, conducting detailed surveys and feasibility studies for gold mining potential.', category: 'Exploration Initiative'
      },
      {
        year: '1992', month: 'November', title: 'Papua Region Entry', description: 'Established operations base in Nabire, Papua, beginning comprehensive assessment of regional mineral resources and mining opportunities.', category: 'Regional Expansion'
      },
      {
        year: '1989', month: 'August', title: 'Company Establishment', description: 'PT Kristalin Eka Lestari was officially established in Jakarta as a mining company focused on exploration and extraction of natural resources in Indonesia.', category: 'Company Foundation'
      }
    ]
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'Company Foundation': 'bg-blue-100 text-blue-800',
      'Technology Innovation': 'bg-purple-100 text-purple-800',
      'International Partnership': 'bg-green-100 text-green-800',
      'Environmental Excellence': 'bg-emerald-100 text-emerald-800',
      'Operational Growth': 'bg-orange-100 text-orange-800',
      'Social Responsibility': 'bg-pink-100 text-pink-800',
      'Safety Achievement': 'bg-red-100 text-red-800',
      'Investment & Growth': 'bg-indigo-100 text-indigo-800',
      'Infrastructure Development': 'bg-gray-100 text-gray-800',
      'Quality Excellence': 'bg-yellow-100 text-yellow-800',
      'Production Excellence': 'bg-cyan-100 text-cyan-800',
      'Community Partnership': 'bg-teal-100 text-teal-800',
      'Business Expansion': 'bg-violet-100 text-violet-800',
      'Production Milestone': 'bg-amber-100 text-amber-800',
      'Exploration Achievement': 'bg-lime-100 text-lime-800',
      'Legal Milestone': 'bg-slate-100 text-slate-800',
      'Equipment Acquisition': 'bg-stone-100 text-stone-800',
      'Survey & Mapping': 'bg-sky-100 text-sky-800',
      'Financial Milestone': 'bg-emerald-100 text-emerald-800',
      'Human Resource Development': 'bg-rose-100 text-rose-800',
      'Technology Advancement': 'bg-fuchsia-100 text-fuchsia-800',
      'Operational Excellence': 'bg-orange-100 text-orange-800',
      'Environmental Initiative': 'bg-green-100 text-green-800',
      'Operational Expansion': 'bg-blue-100 text-blue-800',
      'Technology Upgrade': 'bg-purple-100 text-purple-800',
      'Exploration Initiative': 'bg-lime-100 text-lime-800',
      'Regional Expansion': 'bg-blue-100 text-blue-800',
      'Safety Implementation': 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const currentMilestones: Milestone[] = milestonesData[activeYear] || [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* Main Content */}
      <div
        className="flex w-full relative"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
      >
        {/* Left Side - Image and Title with animations */}
        <div className="w-1/2 relative bg-black h-full flex-shrink-0 overflow-hidden">
          <img 
            src="https://i.pinimg.com/736x/db/f1/e4/dbf1e4748bc5aa40b231dcc9f3519ac0.jpg"
            alt="Mining Operations History"
            className="w-full h-full object-cover opacity-70"
          />
          <div className={`absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-white text-5xl font-light leading-tight">
              Our<br />
              <span className="font-normal">Milestones</span>
            </h1>
            <div className="w-20 h-1 bg-yellow-400 mt-6"></div>
            <p className="text-white/80 text-lg mt-4 max-w-md leading-relaxed">
              This is how we began and embarked on our journey to become great.
            </p>
          </div>
          {/* Floating Company Stats */}
          <div className={`absolute top-16 right-16 transform transition-all duration-1500 delay-500 ${
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 gap-4 text-center">
                {Object.entries(companyStats).map(([key, value]: [string, string], index: number) => (
                  <div key={key} className="space-y-1">
                    <div className="text-yellow-400 font-bold text-lg">{value}</div>
                    <div className="text-white/80 text-xs uppercase tracking-wide">{key}</div>
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
            <YearSelection yearPeriods={yearPeriods} activeYear={activeYear} setActiveYear={setActiveYear} setSelectedMilestone={setSelectedMilestone} isLoaded={isLoaded} />
            {/* Milestones Content */}
            <div
              ref={rightPanelRef}
              className="flex-1 overflow-y-auto space-y-6"
            >
              {currentMilestones.map((milestone: Milestone, index: number) => (
                <div
                  key={`${milestone.year}-${index}`}
                  className={`transform transition-all duration-1000 cursor-pointer group ${
                    isLoaded 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  } hover:bg-gray-50 rounded-2xl p-6 -mx-2`}
                  style={{ 
                    transitionDelay: `${600 + (index * 200)}ms` 
                  }}
                  onClick={() => setSelectedMilestone(index)}
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
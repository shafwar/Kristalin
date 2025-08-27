import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { router, usePage } from '@inertiajs/react';
import { Search as SearchIcon, ChevronLeft, ChevronRight, Clock, ExternalLink } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
  path: string;
}

interface PageProps {
  q?: string;
  results?: SearchResultItem[];
  total?: number;
  perPage?: number;
  currentPage?: number;
  totalPages?: number;
}

export default function SearchPage() {
  const { t } = useTranslation();
  const page = usePage<{ props: PageProps }>();
  const { q = '', results = [], total = 0, currentPage = 1, totalPages = 1, displayQuery } = page.props as unknown as (PageProps & { displayQuery?: string });

  const [query, setQuery] = useState<string>(q);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hoveredResult, setHoveredResult] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [resultsLoaded, setResultsLoaded] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(q || '');
    // Reset dan animasi ulang results ketika query berubah
    if (q !== '') {
      setResultsLoaded(false);
      setTimeout(() => setResultsLoaded(true), 200);
    }
  }, [q, results]);

  useEffect(() => {
    inputRef.current?.focus();
    setTimeout(() => setIsLoaded(true), 100);
    // Set results loaded untuk initial load
    if (results.length > 0) {
      setTimeout(() => setResultsLoaded(true), 800);
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
    router.get(`/search`, { q: query }, { preserveScroll: true, replace: true });
  };

  const onPaginate = (page: number) => {
    router.get(`/search`, { q: query || q, page }, { preserveScroll: true });
  };

  const highlight = (text: string, keyword: string) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => (
          <span 
            key={i} 
            className={part.toLowerCase() === keyword.toLowerCase() ? 
              'bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-900 px-1 py-0.5 rounded-md font-medium' : 
              undefined
            }
          >
            {part}
          </span>
        ))}
      </>
    );
  };

  const formatResultCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-amber-300/10 to-yellow-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-100/5 to-yellow-100/5 rounded-full blur-2xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <Header sticky />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-24 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-8 transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <h1 className="text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                {t('pages.search.title')}
              </span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg">{t('pages.search.subtitle')}</p>
        </div>
        
        {/* Search Form */}
         <div className={`mb-8 max-w-3xl mx-auto transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '0.3s' }}>
          <form onSubmit={onSubmit} className="relative group">
             <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
             <div className="relative flex w-full items-center gap-2 sm:gap-3 rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-3 py-2 sm:px-6 sm:py-4 shadow-lg hover:border-amber-300 focus-within:border-amber-400 focus-within:scale-100 sm:focus-within:scale-105 transition-all duration-300">
               <SearchIcon className={`h-6 w-6 transition-all duration-300 ${
                isSearching ? 'text-amber-500 animate-spin' : 'text-gray-400 group-focus-within:text-amber-500'
              }`} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                 placeholder={t('pages.search.input_placeholder')}
                 className="flex-1 border-none bg-transparent outline-none text-gray-800 text-base sm:text-lg placeholder-gray-400"
              />
                <button
                 type="submit"
                 className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-2 sm:px-6 shadow-md transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg active:scale-95 text-sm sm:text-base max-[360px]:w-10 max-[360px]:h-10 max-[360px]:px-0"
                >
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                 <SearchIcon className="h-5 w-5 inline min-[360px]:hidden" />
                 <span className="relative hidden min-[360px]:inline">{t('pages.search.search_button')}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Info */}
         <div className={`mb-6 flex items-center justify-between transition-all duration-1000 transform ${
          isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        }`} style={{ transitionDelay: '0.5s' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
              <Clock className="h-4 w-4 text-gray-500 group-hover:animate-spin" />
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-amber-600">{formatResultCount(total)}</span> {t('pages.search.articles_found_for')}
                <span className="font-medium text-gray-800 ml-1 truncate inline-block max-w-[50vw] align-bottom">"{displayQuery || q}"</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-6">
          {results.map((item, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredResult(idx)}
              onMouseLeave={() => setHoveredResult(null)}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 transform ${
                isLoaded 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              } ${
                hoveredResult === idx
                  ? 'border-amber-300 bg-gradient-to-r from-white to-amber-50/50 shadow-xl scale-[1.02]'
                  : 'border-gray-200 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg'
              }`}
              style={{ 
                transitionDelay: isLoaded ? `${0.7 + idx * 0.1}s` : '0s'
              }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl opacity-0 transition-all duration-500 ${
                hoveredResult === idx ? 'opacity-10' : ''
              }`}></div>
              
              {/* Shimmer Effect */}
              <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ${
                hoveredResult === idx ? 'translate-x-full' : ''
              }`}></div>
              
              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-all duration-300 flex-1 pr-4">
                    <a href={item.url} className="hover:underline decoration-2 decoration-amber-400">
                      {item.title}
                    </a>
                  </h3>
                  <ExternalLink className={`h-5 w-5 text-gray-400 group-hover:text-amber-500 transition-all duration-300 flex-shrink-0 ${
                    hoveredResult === idx ? 'transform translate-x-1 -translate-y-1 animate-bounce' : ''
                  }`} />
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  {highlight(item.snippet, (displayQuery || q) || '')}
                </p>
                
                <div className="flex items-center justify-between">
                  <a 
                    href={item.url} 
                    className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <span className="truncate max-w-xs">
                      {window.location.origin.replace(/\/$/, '') + item.url}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
           <div className={`mt-12 flex items-center justify-center gap-3 px-2 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '0.7s' }}>
            <button
              onClick={() => onPaginate(Math.max(1, currentPage - 1))}
               className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-amber-400 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group sm:hover:scale-110 active:scale-95"
              disabled={currentPage <= 1}
              aria-label={t('pages.search.prev_page_aria')}
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-all duration-300" />
            </button>
            
            {/* Numeric pagination (hidden on very small screens) */}
            <div className="hidden max-[360px]:hidden sm:flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }
                
                return (
                   <button
                    key={pageNum}
                    onClick={() => onPaginate(pageNum)}
                     className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-semibold transition-all duration-300 sm:hover:scale-110 active:scale-95 ${
                      pageNum === currentPage
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-1'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Compact pagination for very small screens (<=360px) */}
            <div className="flex items-center gap-2 sm:hidden max-[360px]:flex">
              <span className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700">
                {currentPage} / {totalPages}
              </span>
            </div>
            
             <button
              onClick={() => onPaginate(Math.min(totalPages, currentPage + 1))}
               className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-amber-400 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group sm:hover:scale-110 active:scale-95"
              disabled={currentPage >= totalPages}
              aria-label={t('pages.search.next_page_aria')}
            >
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {results.length === 0 && q && (
          <div className={`text-center py-16 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          }`} style={{ transitionDelay: '0.3s' }}>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full mb-6 animate-bounce shadow-lg">
              <SearchIcon className="h-12 w-12 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('pages.search.no_results_title')}</h3>
            <p className="text-gray-600 mb-6">{t('pages.search.no_results_hint')}</p>
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative">{t('pages.search.try_again')}</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
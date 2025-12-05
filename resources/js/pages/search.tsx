import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Clock, ExternalLink, Search as SearchIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
    const {
        q = '',
        results = [],
        total = 0,
        currentPage = 1,
        totalPages = 1,
        displayQuery,
    } = page.props as unknown as PageProps & { displayQuery?: string };

    const [query, setQuery] = useState<string>(q);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [hoveredResult, setHoveredResult] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        setTimeout(() => setIsLoaded(true), 100);
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
                        className={
                            part.toLowerCase() === keyword.toLowerCase()
                                ? 'rounded-md bg-gradient-to-r from-amber-200 to-yellow-200 px-1 py-0.5 font-medium text-amber-900'
                                : undefined
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
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
            {/* Animated Background Elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-3xl"></div>
                <div
                    className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-amber-300/10 to-yellow-300/10 blur-3xl"
                    style={{ animationDelay: '1s' }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full bg-gradient-to-r from-amber-100/5 to-yellow-100/5 blur-2xl"
                    style={{ animationDelay: '0.5s' }}
                ></div>
            </div>

            <Header sticky />

            <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-16">
                {/* Header Section */}
                <div
                    className={`mb-8 transform text-center transition-all duration-1000 ${
                        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                    }`}
                >
                    <div className="mb-4 inline-flex items-center gap-2">
                        <h1 className="text-5xl font-black tracking-tight">
                            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                                {t('pages.search.title')}
                            </span>
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600">{t('pages.search.subtitle')}</p>
                </div>

                {/* Search Form */}
                <div
                    className={`mx-auto mb-8 max-w-3xl transform transition-all duration-1000 ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: '0.3s' }}
                >
                    <form onSubmit={onSubmit} className="group relative">
                        <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"></div>
                        <div className="relative flex w-full items-center gap-2 rounded-2xl border-2 border-gray-200 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 focus-within:scale-100 focus-within:border-amber-400 hover:border-amber-300 sm:gap-3 sm:px-6 sm:py-4 sm:focus-within:scale-105">
                            <SearchIcon
                                className={`h-6 w-6 transition-all duration-300 ${
                                    isSearching ? 'animate-spin text-amber-500' : 'text-gray-400 group-focus-within:text-amber-500'
                                }`}
                            />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t('pages.search.input_placeholder')}
                                className="flex-1 border-none bg-transparent text-base text-gray-800 placeholder-gray-400 outline-none sm:text-lg"
                            />
                            <button
                                type="submit"
                                className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-2 text-sm text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg active:scale-95 max-[360px]:h-10 max-[360px]:w-10 max-[360px]:px-0 sm:px-6 sm:text-base"
                            >
                                <span className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-white/20 transition-transform duration-700 group-hover:translate-x-full"></span>
                                <SearchIcon className="inline h-5 w-5 min-[360px]:hidden" />
                                <span className="relative hidden min-[360px]:inline">{t('pages.search.search_button')}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Info */}
                <div
                    className={`mb-6 flex transform items-center justify-between transition-all duration-1000 ${
                        isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}
                    style={{ transitionDelay: '0.5s' }}
                >
                    <div className="flex items-center gap-3">
                        <div className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                            <Clock className="h-4 w-4 text-gray-500 group-hover:animate-spin" />
                            <span className="text-sm text-gray-600">
                                <span className="font-semibold text-amber-600">{formatResultCount(total)}</span>{' '}
                                {t('pages.search.articles_found_for')}
                                <span className="ml-1 inline-block max-w-[50vw] truncate align-bottom font-medium text-gray-800">
                                    "{displayQuery || q}"
                                </span>
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
                            className={`group relative transform overflow-hidden rounded-2xl border transition-all duration-500 ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            } ${
                                hoveredResult === idx
                                    ? 'scale-[1.02] border-amber-300 bg-gradient-to-r from-white to-amber-50/50 shadow-xl'
                                    : 'border-gray-200 bg-white/70 shadow-md backdrop-blur-sm hover:shadow-lg'
                            }`}
                            style={{
                                transitionDelay: isLoaded ? `${0.7 + idx * 0.1}s` : '0s',
                            }}
                        >
                            {/* Gradient Border Effect */}
                            <div
                                className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 transition-all duration-500 ${
                                    hoveredResult === idx ? 'opacity-10' : ''
                                }`}
                            ></div>

                            {/* Shimmer Effect */}
                            <div
                                className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ${
                                    hoveredResult === idx ? 'translate-x-full' : ''
                                }`}
                            ></div>

                            {/* Content */}
                            <div className="relative p-6">
                                <div className="mb-3 flex items-start justify-between">
                                    <h3 className="flex-1 pr-4 text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-amber-700">
                                        <a href={item.url} className="decoration-amber-400 decoration-2 hover:underline">
                                            {item.title}
                                        </a>
                                    </h3>
                                    <ExternalLink
                                        className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-all duration-300 group-hover:text-amber-500 ${
                                            hoveredResult === idx ? 'translate-x-1 -translate-y-1 transform animate-bounce' : ''
                                        }`}
                                    />
                                </div>

                                <p className="mb-4 text-base leading-relaxed text-gray-700">{highlight(item.snippet, displayQuery || q || '')}</p>

                                <div className="flex items-center justify-between">
                                    <a
                                        href={item.url}
                                        className="inline-flex transform items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-600 transition-all duration-300 hover:scale-105 hover:bg-amber-100 hover:text-amber-700 active:scale-95"
                                    >
                                        <span className="max-w-xs truncate">{window.location.origin.replace(/\/$/, '') + item.url}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div
                        className={`mt-12 flex transform items-center justify-center gap-3 px-2 transition-all duration-1000 ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: '0.7s' }}
                    >
                        <button
                            onClick={() => onPaginate(Math.max(1, currentPage - 1))}
                            className="group flex h-10 w-10 items-center justify-center rounded-xl border-2 border-gray-300 text-gray-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12 sm:hover:scale-110"
                            disabled={currentPage <= 1}
                            aria-label={t('pages.search.prev_page_aria')}
                        >
                            <ChevronLeft className="h-5 w-5 transition-all duration-300 group-hover:-translate-x-1" />
                        </button>

                        {/* Numeric pagination (hidden on very small screens) */}
                        <div className="hidden items-center gap-2 overflow-x-auto whitespace-nowrap max-[360px]:hidden sm:flex">
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
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95 sm:h-12 sm:w-12 sm:hover:scale-110 ${
                                            pageNum === currentPage
                                                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                                                : 'border-2 border-gray-300 text-gray-700 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Compact pagination for very small screens (<=360px) */}
                        <div className="flex items-center gap-2 max-[360px]:flex sm:hidden">
                            <span className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700">
                                {currentPage} / {totalPages}
                            </span>
                        </div>

                        <button
                            onClick={() => onPaginate(Math.min(totalPages, currentPage + 1))}
                            className="group flex h-10 w-10 items-center justify-center rounded-xl border-2 border-gray-300 text-gray-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12 sm:hover:scale-110"
                            disabled={currentPage >= totalPages}
                            aria-label={t('pages.search.next_page_aria')}
                        >
                            <ChevronRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {results.length === 0 && q && (
                    <div
                        className={`transform py-16 text-center transition-all duration-1000 ${
                            isLoaded ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'
                        }`}
                        style={{ transitionDelay: '0.3s' }}
                    >
                        <div className="mb-6 inline-flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 shadow-lg">
                            <SearchIcon className="h-12 w-12 text-amber-500" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-gray-800">{t('pages.search.no_results_title')}</h3>
                        <p className="mb-6 text-gray-600">{t('pages.search.no_results_hint')}</p>
                        <button
                            onClick={() => {
                                setQuery('');
                                inputRef.current?.focus();
                            }}
                            className="group relative transform overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg active:scale-95"
                        >
                            <span className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-white/20 transition-transform duration-700 group-hover:translate-x-full"></span>
                            <span className="relative">{t('pages.search.try_again')}</span>
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

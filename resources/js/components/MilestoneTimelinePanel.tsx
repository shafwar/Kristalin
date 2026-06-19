import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export type MilestoneItem = {
    year: string;
    month: string;
    title: string;
    description: string;
    category: string;
};

export type MilestoneFilterKey = 'all' | 'legal' | 'production' | 'csr' | 'investment' | 'foundation';

type MilestoneTimelinePanelProps = {
    milestones: MilestoneItem[];
    getCategoryColor: (category: string) => string;
    resolveFilterGroup: (category: string) => MilestoneFilterKey;
    filterLabels: Record<MilestoneFilterKey, string>;
    emptyFilterMessage: string;
    onActiveYearChange?: (year: string | null) => void;
    variant: 'mobile' | 'desktop';
    isLoaded: boolean;
};

const FILTER_ORDER: MilestoneFilterKey[] = ['all', 'legal', 'production', 'csr', 'investment', 'foundation'];

function MilestoneCard({
    milestone,
    getCategoryColor,
    isActiveYear,
    dataIndex,
}: {
    milestone: MilestoneItem;
    getCategoryColor: (category: string) => string;
    isActiveYear: boolean;
    dataIndex: number;
}) {
    return (
        <article
            data-milestone-item
            data-milestone-year={milestone.year}
            data-milestone-index={dataIndex}
            className={clsx(
                'group rounded-2xl border border-transparent p-4 transition-colors duration-300 motion-reduce:transition-none md:p-6',
                'hover:border-amber-100 hover:bg-amber-50/40',
                isActiveYear && 'border-amber-200/60 bg-amber-50/30',
            )}
        >
            <div className="flex items-start gap-3 md:gap-4">
                <div className="shrink-0">
                    <div
                        className={clsx(
                            'rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 px-3 py-2 text-center text-white transition-transform duration-500 motion-reduce:transition-none md:min-w-[80px] md:px-4',
                            isActiveYear && 'scale-105 shadow-lg shadow-amber-400/25',
                        )}
                    >
                        <div className="text-sm font-bold md:text-lg">{milestone.year}</div>
                        <div className="text-xs opacity-90">{milestone.month}</div>
                    </div>
                </div>
                <div className="min-w-0 flex-1 space-y-2 md:space-y-3">
                    <div>
                        <span className={`mb-2 inline-block rounded-full px-2 py-1 text-xs font-medium md:px-3 ${getCategoryColor(milestone.category)}`}>
                            {milestone.category}
                        </span>
                        <h3 className="text-base leading-tight font-semibold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600 md:text-xl">
                            {milestone.title}
                        </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-600 md:text-sm">{milestone.description}</p>
                </div>
            </div>
        </article>
    );
}

export function MilestoneTimelinePanel({
    milestones,
    getCategoryColor,
    resolveFilterGroup,
    filterLabels,
    emptyFilterMessage,
    onActiveYearChange,
    variant,
    isLoaded,
}: MilestoneTimelinePanelProps) {
    const [activeFilter, setActiveFilter] = useState<MilestoneFilterKey>('all');
    const [activeYear, setActiveYear] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const animScopeRef = useRef<HTMLDivElement>(null);
    const programmaticScrollRef = useRef(false);
    const programmaticTimerRef = useRef<number | null>(null);

    const isDesktop = variant === 'desktop';

    useEffect(() => {
        onActiveYearChange?.(activeYear);
    }, [activeYear, onActiveYearChange]);

    const filtered = useMemo(() => {
        if (activeFilter === 'all') return milestones;
        return milestones.filter((m) => resolveFilterGroup(m.category) === activeFilter);
    }, [activeFilter, milestones, resolveFilterGroup]);

    const years = useMemo(() => {
        const seen = new Set<string>();
        return filtered.reduce<string[]>((acc, m) => {
            if (!seen.has(m.year)) {
                seen.add(m.year);
                acc.push(m.year);
            }
            return acc;
        }, []);
    }, [filtered]);

    useEffect(() => {
        if (years.length > 0 && (!activeYear || !years.includes(activeYear))) {
            setActiveYear(years[0] ?? null);
        }
    }, [years, activeYear]);

    useEffect(() => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }, [activeFilter]);

    const scrollToYear = useCallback(
        (year: string) => {
            const container = scrollContainerRef.current;
            const target = container?.querySelector<HTMLElement>(`[data-milestone-item][data-milestone-year="${year}"]`);
            if (!target) return;

            if (programmaticTimerRef.current) {
                window.clearTimeout(programmaticTimerRef.current);
            }
            programmaticScrollRef.current = true;
            setActiveYear(year);

            const prefersReduced =
                typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';

            if (isDesktop && container) {
                const top = container.scrollTop + (target.getBoundingClientRect().top - container.getBoundingClientRect().top) - 12;
                container.scrollTo({ top: Math.max(0, top), behavior });
            } else {
                const headerOffset = 88;
                const y = window.scrollY + target.getBoundingClientRect().top - headerOffset;
                window.scrollTo({ top: y, behavior });
            }

            programmaticTimerRef.current = window.setTimeout(() => {
                programmaticScrollRef.current = false;
            }, 700);
        },
        [isDesktop],
    );

    useEffect(() => {
        const container = isDesktop ? scrollContainerRef.current : null;
        const items = (container ?? document).querySelectorAll<HTMLElement>('[data-milestone-item]');
        if (items.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (programmaticScrollRef.current) return;

                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                const top = visible[0];
                if (top?.target instanceof HTMLElement) {
                    const year = top.target.dataset.milestoneYear;
                    if (year) setActiveYear(year);
                }
            },
            {
                root: container,
                rootMargin: isDesktop ? '-8% 0px -62% 0px' : '-20% 0px -55% 0px',
                threshold: 0,
            },
        );

        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [filtered, isDesktop]);

    useLayoutEffect(() => {
        const scope = animScopeRef.current;
        const scroller = isDesktop ? scrollContainerRef.current : undefined;
        if (!scope || !isLoaded) return;

        const prefersReduced =
            typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            const blocks = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-milestone-reveal]'));
            if (blocks.length === 0) return;

            if (prefersReduced) {
                gsap.set(blocks, { opacity: 1, y: 0, clearProps: 'transform' });
                return;
            }

            blocks.forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 14, immediateRender: false },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.55,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 94%',
                            toggleActions: 'play none none none',
                            once: true,
                            scroller: scroller ?? undefined,
                        },
                    },
                );
            });
        }, scope);

        return () => ctx.revert();
    }, [filtered, isLoaded, isDesktop]);

    useEffect(
        () => () => {
            if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
        },
        [],
    );

    return (
        <div ref={animScopeRef} className={clsx('flex min-h-0 flex-1 flex-col', isDesktop && 'overflow-hidden')}>
            <div
                className={clsx(
                    'mb-4 flex flex-wrap gap-2 sm:mb-5',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                )}
            >
                {FILTER_ORDER.map((key) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setActiveFilter(key)}
                        className={clsx(
                            'rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 motion-reduce:transition-none md:text-sm',
                            activeFilter === key
                                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                        )}
                    >
                        {filterLabels[key]}
                    </button>
                ))}
            </div>

            <div className={clsx('flex min-h-0 flex-1 gap-3 md:gap-5', isDesktop && 'overflow-hidden')}>
                {years.length > 0 ? (
                    <nav
                        aria-label="Timeline years"
                        className={clsx(
                            'relative hidden shrink-0 flex-col gap-0.5 self-start sm:flex',
                            isDesktop ? 'sticky top-0 pt-1' : 'sticky top-20',
                        )}
                    >
                        <div className="absolute top-2 bottom-2 left-[3px] w-px bg-gray-200" aria-hidden />
                        {years.map((year) => {
                            const isActive = activeYear === year;
                            return (
                                <button
                                    key={year}
                                    type="button"
                                    onClick={() => scrollToYear(year)}
                                    className={clsx(
                                        'relative z-[1] min-w-[3.25rem] py-1.5 pl-5 text-left text-sm font-bold tabular-nums transition-all duration-300 motion-reduce:transition-none',
                                        isActive ? 'text-yellow-600' : 'text-gray-400 hover:text-gray-600',
                                    )}
                                >
                                    <span
                                        className={clsx(
                                            'absolute top-1/2 left-0 h-2.5 w-2.5 -translate-x-[calc(50%-0.5px)] -translate-y-1/2 rounded-full border-2 transition-all duration-300 motion-reduce:transition-none',
                                            isActive
                                                ? 'scale-110 border-yellow-500 bg-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.55)]'
                                                : 'border-white bg-gray-300',
                                        )}
                                        aria-hidden
                                    />
                                    {year}
                                </button>
                            );
                        })}
                    </nav>
                ) : null}

                <div
                    ref={scrollContainerRef}
                    className={clsx(
                        'min-w-0 flex-1 space-y-4 md:space-y-5',
                        isDesktop && 'overflow-y-auto pr-1 milestone-scroll',
                    )}
                >
                    {filtered.length === 0 ? (
                        <p className="py-8 text-center text-sm text-gray-500">{emptyFilterMessage}</p>
                    ) : (
                        filtered.map((milestone, index) => (
                            <div key={`${milestone.year}-${milestone.title}-${index}`} data-milestone-reveal>
                                <MilestoneCard
                                    milestone={milestone}
                                    getCategoryColor={getCategoryColor}
                                    isActiveYear={activeYear === milestone.year}
                                    dataIndex={index}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export function resolveMilestoneFilterGroup(category: string, t: (key: string) => string): MilestoneFilterKey {
    if (category === t('pages.milestones.categories.Company Foundation')) return 'foundation';

    const legal = [t('pages.milestones.categories.Legal Milestone')];
    const production = [
        t('pages.milestones.categories.Operational Growth'),
        t('pages.milestones.categories.Production Milestone'),
        t('pages.milestones.categories.Production Excellence'),
        t('pages.milestones.categories.Operational Excellence'),
        t('pages.milestones.categories.Operational Expansion'),
        t('pages.milestones.categories.Exploration Achievement'),
        t('pages.milestones.categories.Exploration Initiative'),
    ];
    const csr = [
        t('pages.milestones.categories.Social Responsibility'),
        t('pages.milestones.categories.Community Partnership'),
    ];
    const investment = [t('pages.milestones.categories.Investment & Growth')];

    if (legal.includes(category)) return 'legal';
    if (production.includes(category)) return 'production';
    if (csr.includes(category)) return 'csr';
    if (investment.includes(category)) return 'investment';
    return 'production';
}

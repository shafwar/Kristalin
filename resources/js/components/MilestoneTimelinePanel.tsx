import { MilestoneYearNav } from '@/components/MilestoneYearNav';
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
    activeYear: string | null;
    onYearChange: (year: string) => void;
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
            data-milestone-index={String(dataIndex)}
            className={clsx(
                'group scroll-mt-24 rounded-2xl border border-transparent p-4 transition-colors duration-300 motion-reduce:transition-none sm:p-5 md:p-6',
                'hover:border-amber-100 hover:bg-amber-50/40',
                isActiveYear && 'border-amber-200/60 bg-amber-50/30',
            )}
        >
            <div className="flex items-start gap-3 md:gap-4">
                <div className="shrink-0">
                    <div
                        className={clsx(
                            'rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 px-3 py-2 text-center text-white transition-transform duration-500 motion-reduce:transition-none sm:min-w-[72px] md:min-w-[80px] md:px-4',
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
                        <h3 className="text-sm leading-tight font-semibold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600 sm:text-base md:text-xl">
                            {milestone.title}
                        </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">{milestone.description}</p>
                </div>
            </div>
        </article>
    );
}

function resolveYearFromItems(items: NodeListOf<HTMLElement>, anchorY: number): string | null {
    let best: HTMLElement | null = null;
    let bestDistance = Infinity;

    items.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        const distance = Math.abs(top - anchorY);
        if (distance < bestDistance) {
            bestDistance = distance;
            best = item;
        }
    });

    return best?.dataset.milestoneYear ?? null;
}

export function MilestoneTimelinePanel({
    milestones,
    getCategoryColor,
    resolveFilterGroup,
    filterLabels,
    emptyFilterMessage,
    activeYear,
    onYearChange,
    variant,
    isLoaded,
}: MilestoneTimelinePanelProps) {
    const [activeFilter, setActiveFilter] = useState<MilestoneFilterKey>('all');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const animScopeRef = useRef<HTMLDivElement>(null);
    const programmaticScrollRef = useRef(false);
    const programmaticTimerRef = useRef<number | null>(null);
    const scrollRafRef = useRef<number | null>(null);

    const isDesktop = variant === 'desktop';

    const filteredList = useMemo(() => {
        if (activeFilter === 'all') return milestones;
        return milestones.filter((m) => resolveFilterGroup(m.category) === activeFilter);
    }, [activeFilter, milestones, resolveFilterGroup]);

    const years = useMemo(() => {
        const seen = new Set<string>();
        return filteredList.reduce<string[]>((acc, m) => {
            if (!seen.has(m.year)) {
                seen.add(m.year);
                acc.push(m.year);
            }
            return acc;
        }, []);
    }, [filteredList]);

    useEffect(() => {
        if (years.length > 0 && (!activeYear || !years.includes(activeYear))) {
            onYearChange(years[0]!);
        }
    }, [years, activeYear, onYearChange]);

    useEffect(() => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }, [activeFilter]);

    const scrollToYear = useCallback(
        (year: string) => {
            const scope = animScopeRef.current;
            const container = scrollContainerRef.current;
            const target =
                container?.querySelector<HTMLElement>(`[data-milestone-item][data-milestone-year="${year}"]`) ??
                scope?.querySelector<HTMLElement>(`[data-milestone-item][data-milestone-year="${year}"]`);
            if (!target) return;

            if (programmaticTimerRef.current) {
                window.clearTimeout(programmaticTimerRef.current);
            }

            programmaticScrollRef.current = true;
            onYearChange(year);

            const prefersReduced =
                typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';

            if (isDesktop && container) {
                const top = container.scrollTop + (target.getBoundingClientRect().top - container.getBoundingClientRect().top) - 16;
                container.scrollTo({ top: Math.max(0, top), behavior });

                const unlock = () => {
                    programmaticScrollRef.current = false;
                };
                container.addEventListener('scrollend', unlock, { once: true });
                programmaticTimerRef.current = window.setTimeout(unlock, prefersReduced ? 80 : 1000);
            } else {
                const headerOffset = 96;
                const y = window.scrollY + target.getBoundingClientRect().top - headerOffset;
                window.scrollTo({ top: Math.max(0, y), behavior });
                programmaticTimerRef.current = window.setTimeout(() => {
                    programmaticScrollRef.current = false;
                }, prefersReduced ? 80 : 900);
            }
        },
        [isDesktop, onYearChange],
    );

    const handleScrollUpdate = useCallback(() => {
        if (programmaticScrollRef.current) return;

        if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = requestAnimationFrame(() => {
            const scope = animScopeRef.current;
            if (!scope) return;

            const items = scope.querySelectorAll<HTMLElement>('[data-milestone-item]');
            if (items.length === 0) return;

            let anchorY: number;
            if (isDesktop && scrollContainerRef.current) {
                anchorY = scrollContainerRef.current.getBoundingClientRect().top + 48;
            } else {
                anchorY = 120;
            }

            const year = resolveYearFromItems(items, anchorY);
            if (year && year !== activeYear) {
                onYearChange(year);
            }
        });
    }, [activeYear, isDesktop, onYearChange]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (isDesktop && container) {
            container.addEventListener('scroll', handleScrollUpdate, { passive: true });
            return () => container.removeEventListener('scroll', handleScrollUpdate);
        }

        window.addEventListener('scroll', handleScrollUpdate, { passive: true });
        return () => window.removeEventListener('scroll', handleScrollUpdate);
    }, [handleScrollUpdate, isDesktop, filteredList]);

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
    }, [filteredList, isLoaded, isDesktop]);

    useEffect(
        () => () => {
            if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
            if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
        },
        [],
    );

    return (
        <div ref={animScopeRef} className={clsx('flex min-h-0 flex-1 flex-col', isDesktop && 'overflow-hidden')}>
            <div className={clsx('mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2', isLoaded ? 'opacity-100' : 'opacity-0')}>
                {FILTER_ORDER.map((key) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setActiveFilter(key)}
                        className={clsx(
                            'rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-300 motion-reduce:transition-none sm:px-3 sm:py-1.5 sm:text-xs md:text-sm',
                            activeFilter === key
                                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                        )}
                    >
                        {filterLabels[key]}
                    </button>
                ))}
            </div>

            {!isDesktop ? (
                <MilestoneYearNav years={years} activeYear={activeYear} onYearClick={scrollToYear} layout="horizontal" />
            ) : null}

            <div className={clsx('flex min-h-0 flex-1 gap-3 md:gap-5', isDesktop && 'overflow-hidden')}>
                {isDesktop ? (
                    <MilestoneYearNav years={years} activeYear={activeYear} onYearClick={scrollToYear} layout="vertical" />
                ) : null}

                <div
                    ref={scrollContainerRef}
                    className={clsx(
                        'min-w-0 flex-1 space-y-3 sm:space-y-4 md:space-y-5',
                        isDesktop && 'max-h-full overflow-y-auto pr-1 milestone-scroll',
                    )}
                >
                    {filteredList.length === 0 ? (
                        <p className="py-8 text-center text-sm text-gray-500">{emptyFilterMessage}</p>
                    ) : (
                        filteredList.map((milestone, index) => (
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

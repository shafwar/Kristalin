import clsx from 'clsx';

type MilestoneYearNavProps = {
    years: string[];
    activeYear: string | null;
    onYearClick: (year: string) => void;
    layout: 'vertical' | 'horizontal';
};

export function MilestoneYearNav({ years, activeYear, onYearClick, layout }: MilestoneYearNavProps) {
    if (years.length === 0) return null;

    if (layout === 'horizontal') {
        return (
            <nav aria-label="Timeline years" className="milestone-years-scroll mb-4 -mx-1 overflow-x-auto px-1 pb-1">
                <div className="flex min-w-max gap-2">
                    {years.map((year) => {
                        const isActive = activeYear === year;
                        return (
                            <button
                                key={year}
                                type="button"
                                onClick={() => onYearClick(year)}
                                aria-current={isActive ? 'true' : undefined}
                                className={clsx(
                                    'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold tabular-nums transition-all duration-300 motion-reduce:transition-none sm:text-sm',
                                    isActive
                                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md shadow-amber-500/25'
                                        : 'border border-gray-200 bg-white text-gray-500 hover:border-amber-200 hover:text-amber-700',
                                )}
                            >
                                {year}
                            </button>
                        );
                    })}
                </div>
            </nav>
        );
    }

    return (
        <nav aria-label="Timeline years" className="relative hidden shrink-0 flex-col sm:flex">
            <div className="absolute top-3 bottom-3 left-[7px] w-[2px] rounded-full bg-gradient-to-b from-amber-200 via-gray-200 to-gray-100" aria-hidden />
            <ul className="relative flex flex-col gap-0.5">
                {years.map((year) => {
                    const isActive = activeYear === year;
                    return (
                        <li key={year}>
                            <button
                                type="button"
                                onClick={() => onYearClick(year)}
                                aria-current={isActive ? 'true' : undefined}
                                className={clsx(
                                    'group relative flex items-center gap-3 rounded-lg py-1.5 pr-2 pl-0 text-left transition-all duration-300 motion-reduce:transition-none',
                                    isActive ? 'pl-1' : 'hover:pl-0.5',
                                )}
                            >
                                <span
                                    className={clsx(
                                        'relative z-[1] flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none',
                                        isActive
                                            ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.45)] ring-2 ring-white'
                                            : 'border-2 border-gray-300 bg-white group-hover:border-amber-300',
                                    )}
                                    aria-hidden
                                >
                                    {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                                </span>
                                <span
                                    className={clsx(
                                        'min-w-[2.75rem] text-sm font-bold tabular-nums transition-colors duration-300',
                                        isActive ? 'text-amber-600' : 'text-gray-400 group-hover:text-gray-600',
                                    )}
                                >
                                    {year}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

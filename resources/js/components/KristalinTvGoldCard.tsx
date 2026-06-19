import { useTranslation } from '@/hooks/useTranslation';
import { useJakartaClock } from '@/hooks/useJakartaClock';
import { formatIdr, getBestSell1g, useKristalinTvGold } from '@/hooks/useKristalinTvGold';
import { Link } from '@inertiajs/react';
import { ExternalLink, TrendingUp } from 'lucide-react';

const LIVEGOLD_URL = 'https://livegold-kristalintv.com/';

type Props = {
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    hovered?: boolean;
};

export function KristalinTvGoldCard({ className, onMouseEnter, onMouseLeave, hovered }: Props) {
    const { t, locale } = useTranslation();
    const { market, brandPrices, loading, error, stale, refresh } = useKristalinTvGold(true);
    const { date, time, zone } = useJakartaClock(locale);

    const worldGram = market?.gold_idr_per_gram ?? 0;
    const best = getBestSell1g(brandPrices?.brands);
    const hasData = worldGram > 0 || best !== null;

    return (
        <article
            className={`relative flex aspect-[16/10] w-full flex-col overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 ${className ?? ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#07111f]" />
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    background:
                        'radial-gradient(circle at 20% 0%, rgba(255,211,107,.22), transparent 45%), radial-gradient(circle at 100% 100%, rgba(78,161,255,.12), transparent 40%)',
                }}
                aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" aria-hidden />

            <div className="relative z-10 flex h-full min-h-0 flex-col p-4 sm:p-5 lg:p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-1">
                        <div className="flex min-w-0 items-center gap-2">
                            <span
                                className={`h-2 w-2 shrink-0 rounded-full ${error ? 'bg-red-400' : hasData ? 'animate-pulse bg-emerald-400' : 'bg-amber-400/70'}`}
                                aria-hidden
                            />
                            <span className="truncate text-[10px] font-bold tracking-[0.18em] text-amber-300/95 uppercase sm:text-[11px]">
                                {t('pages.welcome.gold_live.kicker')}
                            </span>
                            {stale && (
                                <span className="shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-medium text-white/70">
                                    {t('pages.welcome.gold_live.stale')}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="shrink-0 text-right leading-tight" aria-live="polite">
                        <p className="max-w-[9.5rem] truncate text-[9px] font-semibold text-amber-100/90 capitalize sm:max-w-none sm:text-[10px]">
                            {date}
                        </p>
                        <p className="mt-0.5 font-mono text-sm font-bold tracking-wide text-white tabular-nums sm:text-base">
                            {time}
                        </p>
                        <p className="mt-0.5 text-[9px] text-slate-400">{zone}</p>
                    </div>
                </div>

                <div className="min-h-0 flex-1">
                    <p className="text-[11px] font-medium text-slate-300/90 sm:text-xs">{t('pages.welcome.gold_live.world_price')}</p>
                    {loading && !hasData ? (
                        <div className="mt-2 space-y-2" aria-hidden>
                            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-white/10" />
                            <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
                        </div>
                    ) : error && !hasData ? (
                        <div className="mt-2">
                            <p className="text-sm text-slate-400">{t('pages.welcome.gold_live.offline')}</p>
                            <button
                                type="button"
                                onClick={() => void refresh()}
                                className="mt-2 text-xs font-semibold text-amber-300 underline-offset-2 hover:underline"
                            >
                                {t('pages.welcome.gold_live.retry')}
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="mt-1 text-xl leading-none font-bold tracking-tight text-white sm:text-2xl lg:text-[1.65rem]">
                                {formatIdr(worldGram, true)}
                            </p>
                            <p className="mt-1 text-[10px] font-medium text-amber-200/80 sm:text-xs">{t('pages.welcome.gold_live.per_gram')}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {market?.usd_idr ? (
                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-200">
                                        USD {new Intl.NumberFormat('id-ID').format(Math.round(market.usd_idr))}
                                    </span>
                                ) : null}
                                {market?.sgd_idr ? (
                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-200">
                                        SGD {new Intl.NumberFormat('id-ID').format(Math.round(market.sgd_idr))}
                                    </span>
                                ) : null}
                            </div>
                        </>
                    )}

                    {best && (
                        <div className="mt-4 rounded-xl border border-amber-400/25 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 p-2.5 sm:p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold tracking-wide text-amber-200/90 uppercase">
                                        {t('pages.welcome.gold_live.best_sell')}
                                    </p>
                                    <p className="mt-0.5 truncate text-xs font-bold text-white">{best.brand}</p>
                                    <p className="text-sm font-bold text-amber-300">{formatIdr(best.sell)}</p>
                                </div>
                                <span className="shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold text-amber-200">
                                    1g
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto space-y-2 pt-3">
                    <Link
                        href="/business-activity"
                        className={`block text-sm font-bold text-white transition-transform duration-200 ${
                            hovered ? 'lg:translate-x-1' : ''
                        }`}
                    >
                        {t('pages.welcome.business_activities.title')}
                        <span className="mt-0.5 block text-xs font-medium text-amber-300/90 underline underline-offset-2">
                            {t('pages.welcome.business_activities.find_out_more')}
                        </span>
                    </Link>
                    <a
                        href={LIVEGOLD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 transition-colors hover:text-amber-300"
                    >
                        <TrendingUp className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {t('pages.welcome.gold_live.view_tv')}
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                    </a>
                </div>
            </div>
        </article>
    );
}

import { useTranslation } from '@/hooks/useTranslation';
import { useJakartaClock } from '@/hooks/useJakartaClock';
import { formatIdrAmount, getBestSell1g, useKristalinTvGold } from '@/hooks/useKristalinTvGold';
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
    
    const isGoldOrg = market?.source === 'gold.org';
    const targetUrl = isGoldOrg ? 'https://goldprice.org/gold-price-indonesia.html' : LIVEGOLD_URL;

    return (
        <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('pages.welcome.gold_live.card_aria')}
            className={`gold-card-root group relative flex w-full cursor-pointer flex-col overflow-hidden no-underline lg:h-auto lg:w-1/4 lg:min-h-0 lg:flex-1 ${className ?? ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#07111f] transition-transform duration-500 ease-out group-hover:scale-[1.02] lg:origin-center" />
            <div
                className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-55"
                style={{
                    background:
                        'radial-gradient(circle at 20% 0%, rgba(255,211,107,.22), transparent 45%), radial-gradient(circle at 100% 100%, rgba(78,161,255,.12), transparent 40%)',
                }}
                aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" aria-hidden />

            <div className="gold-card-inner relative z-10 flex flex-col gap-3 p-4 sm:gap-4 sm:p-5 lg:h-full lg:min-h-0 lg:gap-0 lg:p-6">
                {/* Header */}
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 lg:mb-3">
                    <div className="flex min-w-0 items-center gap-2">
                        <span
                            className={`h-2 w-2 shrink-0 rounded-full ${error ? 'bg-red-400' : hasData ? 'animate-pulse bg-emerald-400' : 'bg-amber-400/70'}`}
                            aria-hidden
                        />
                        <span className="text-[10px] font-bold tracking-[0.18em] text-amber-300/95 uppercase sm:text-[11px]">
                            {isGoldOrg ? 'GOLD.ORG · LIVE' : t('pages.welcome.gold_live.kicker')}
                        </span>
                        {stale && (
                            <span className="shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-medium text-white/70">
                                {t('pages.welcome.gold_live.stale')}
                            </span>
                        )}
                    </div>
                    <div className="shrink-0 leading-tight sm:text-right" aria-live="polite">
                        <p className="text-[9px] font-semibold text-amber-100/90 capitalize sm:text-[10px]">{date}</p>
                        <p className="mt-0.5 font-mono text-sm font-bold tracking-wide text-white tabular-nums sm:text-base">
                            {time}
                        </p>
                        <p className="mt-0.5 text-[9px] text-slate-400">{zone}</p>
                    </div>
                </div>

                {/* Price block */}
                <div className="gold-card-body flex shrink-0 flex-col gap-3 lg:min-h-0 lg:flex-1 lg:gap-0">
                    <div>
                        {loading && !hasData ? (
                            <div className="space-y-2" aria-hidden>
                                <div className="h-5 w-28 animate-pulse rounded-full bg-white/10" />
                                <div className="mt-2 h-8 w-4/5 animate-pulse rounded-lg bg-white/10" />
                                <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
                            </div>
                        ) : error && !hasData ? (
                            <div className="mt-1">
                                <span className="inline-flex rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-slate-900 uppercase sm:text-[10px]">
                                    {t('pages.welcome.gold_live.world_price')}
                                </span>
                                <p className="mt-2 text-sm text-slate-400">{t('pages.welcome.gold_live.offline')}</p>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        void refresh();
                                    }}
                                    className="relative z-20 mt-2 cursor-pointer text-xs font-semibold text-amber-300 underline-offset-2 hover:underline"
                                >
                                    {t('pages.welcome.gold_live.retry')}
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="inline-flex rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-slate-900 uppercase sm:text-[10px]">
                                    {t('pages.welcome.gold_live.world_price')}
                                </span>
                                <div className="gold-card-price-row mt-2 flex min-w-0 max-w-full flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                                    <p className="gold-card-price-main min-w-0 font-bold text-amber-50 tabular-nums">
                                        <span className="mr-1 text-[0.62em] font-semibold text-amber-200/90">Rp</span>
                                        <span>{formatIdrAmount(worldGram, 2)}</span>
                                    </p>
                                    <span className="gold-card-price-unit shrink-0 font-semibold text-amber-200/85 tabular-nums">
                                        {t('pages.welcome.gold_live.per_gram_short')}
                                    </span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3">
                                    {market?.usd_idr ? (
                                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tabular-nums text-slate-200">
                                            USD {new Intl.NumberFormat('id-ID').format(Math.round(market.usd_idr))}
                                        </span>
                                    ) : null}
                                    {market?.sgd_idr ? (
                                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tabular-nums text-slate-200">
                                            SGD {new Intl.NumberFormat('id-ID').format(Math.round(market.sgd_idr))}
                                        </span>
                                    ) : null}
                                </div>
                            </>
                        )}
                    </div>

                    {best && (
                        <div className="shrink-0 rounded-xl border border-amber-400/25 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 p-2.5 sm:p-3 lg:mt-4">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-semibold tracking-wide text-amber-200/90 uppercase">
                                        {t('pages.welcome.gold_live.best_sell')}
                                    </p>
                                    <p className="mt-0.5 truncate text-xs font-bold text-white">{best.brand}</p>
                                    <p className="gold-card-price-sub mt-0.5 min-w-0 max-w-full font-bold text-amber-300 tabular-nums">
                                        <span className="mr-0.5 text-[0.72em] font-semibold text-amber-200/80">Rp</span>
                                        <span>{formatIdrAmount(best.sell, 0)}</span>
                                    </p>
                                </div>
                                <span className="shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold text-amber-200">
                                    1g
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Maintenance Message */}
                {isGoldOrg && (
                    <div className="shrink-0 mt-3 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2.5 lg:mt-4">
                        <div className="flex items-start gap-2">
                            <div className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <p className="text-[10px] sm:text-[11px] leading-snug text-amber-100/90 font-medium">
                                {locale === 'id' 
                                    ? 'Kristalin TV sedang dalam pemeliharaan sistem. Saat ini menampilkan harga emas dari Gold.org.'
                                    : locale === 'zh'
                                    ? 'Kristalin TV 正在进行系统维护。当前显示来自 Gold.org 的黄金价格。'
                                    : 'Kristalin TV is currently under system maintenance. Displaying gold prices from Gold.org.'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer CTA */}
                <div
                    className={`shrink-0 border-t border-white/10 pt-2.5 sm:pt-3 lg:mt-auto lg:pt-3 ${hovered ? 'lg:translate-x-1' : ''} transition-transform duration-200`}
                >
                    <p className="flex items-center gap-1.5 text-xs font-bold text-white sm:text-sm">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden />
                        {isGoldOrg ? 'Gold.org' : t('pages.welcome.gold_live.card_title')}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-300/90 underline underline-offset-2 sm:text-xs">
                        {t('pages.welcome.gold_live.card_cta')}
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                    </span>
                </div>
            </div>
        </a>
    );
}

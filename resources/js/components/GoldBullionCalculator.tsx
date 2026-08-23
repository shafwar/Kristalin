import { useTranslation } from '@/hooks/useTranslation';
import { formatIdr, formatIdrAmount, getBestSell1g, useKristalinTvGold } from '@/hooks/useKristalinTvGold';
import { Link } from '@inertiajs/react';
import { 
    Award, Check, CheckCircle2, ChevronRight, Coins, ExternalLink, 
    Info, Plus, RefreshCw, RotateCcw, ShieldCheck, Sparkles, Truck, X 
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface PresetItem {
    grams: number;
    tag?: string;
}

const PRESETS: PresetItem[] = [
    { grams: 1 },
    { grams: 5 },
    { grams: 10, tag: 'Popular' },
    { grams: 25 },
    { grams: 50 },
    { grams: 100, tag: 'Investment' },
    { grams: 500 },
    { grams: 1000, tag: 'Cast Bar' },
];

export default function GoldBullionCalculator() {
    const { t } = useTranslation();
    const { market, brandPrices, loading, stale, lastUpdatedText, sourceName, refresh } = useKristalinTvGold(true);

    const [selectedGrams, setSelectedGrams] = useState<number>(5);
    const [customGrams, setCustomGrams] = useState<string>('');
    const [isCustom, setIsCustom] = useState<boolean>(false);

    // Determine current active grams
    const activeGrams = useMemo(() => {
        if (isCustom) {
            const cleanStr = customGrams.trim().replace(/\./g, '').replace(',', '.');
            const parsed = parseFloat(cleanStr);
            return isNaN(parsed) || parsed <= 0 ? 1 : parsed;
        }
        return selectedGrams;
    }, [isCustom, customGrams, selectedGrams]);

    // Base price per gram
    const bestBrandPrice = getBestSell1g(brandPrices?.brands)?.sell;
    const basePricePerGram = useMemo(() => {
        if (market?.gold_idr_per_gram && market.gold_idr_per_gram > 0) {
            return market.gold_idr_per_gram;
        }
        if (bestBrandPrice && bestBrandPrice > 0) {
            return bestBrandPrice;
        }
        return 1450000;
    }, [market, bestBrandPrice]);

    // Calculate total
    const estimatedTotal = useMemo(() => {
        return Math.round(activeGrams * basePricePerGram);
    }, [activeGrams, basePricePerGram]);

    const handleSelectPreset = (g: number) => {
        setIsCustom(false);
        setSelectedGrams(g);
        setCustomGrams('');
    };

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCustom(true);
        setCustomGrams(e.target.value);
    };

    const handleQuickAdd = (increment: number) => {
        setIsCustom(true);
        const current = isCustom && customGrams ? (parseFloat(customGrams) || 0) : activeGrams;
        const next = Math.max(1, current + increment);
        setCustomGrams(next.toString());
    };

    const handleResetToPreset = () => {
        setIsCustom(false);
        setSelectedGrams(5);
        setCustomGrams('');
    };

    const unitGram = t('pages.b2c.calculator.gram_unit') || 'Gram';
    const formattedWeightLabel = activeGrams >= 1000 
        ? `${activeGrams / 1000} kg (${formatIdrAmount(activeGrams)} ${unitGram})` 
        : `${formatIdrAmount(activeGrams)} ${unitGram}`;

    const contactUrl = `/contact?subject=b2c&grams=${activeGrams}&est=${estimatedTotal}#contact-form`;

    return (
        <div className="w-full">
            {/* Main Outer Card Container */}
            <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-b from-white via-white to-stone-50/70 p-5 sm:p-8 lg:p-10 shadow-xl shadow-stone-200/60 ring-1 ring-stone-900/5">
                
                {/* Decorative Subtle Background Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" aria-hidden="true" />

                {/* Header Area */}
                <div className="relative z-10 mb-8 sm:mb-10 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-yellow-500/15 border border-amber-400/40 px-3.5 py-1.5 text-xs font-bold text-amber-950 tracking-wide shadow-2xs">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{t('pages.b2c.calculator.refinery_badge') || 'DIRECT REFINERY SUPPLY · KISARA GOLD 24K'}</span>
                    </div>
                    
                    <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                        {t('pages.b2c.calculator.title') || 'Simulasi Pemesanan Emas Batangan 24K'}
                    </h2>
                    
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                        {t('pages.b2c.calculator.subtitle') || 'Akses langsung likuiditas emas murni 99.99% standar bersertifikat resmi dari ekosistem pemurnian PT Kristalin Ekalestari.'}
                    </p>
                </div>

                {/* MOBILE ONLY: Live Price & Total Quick Terminal (< lg) */}
                <div className="block lg:hidden mb-6 relative z-10">
                    <div className="rounded-2xl border border-amber-300/90 bg-gradient-to-br from-amber-500/15 via-white to-amber-500/5 p-4.5 sm:p-5 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30">
                        
                        {/* Live Market Bar */}
                        <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                            <div className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${stale ? 'bg-amber-400' : 'animate-pulse bg-emerald-500'}`} />
                                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                                    {t('pages.b2c.calculator.live_price_per_gram') || 'Harga Acuan'}
                                </span>
                                {lastUpdatedText && (
                                    <span className="rounded-md bg-amber-100/90 border border-amber-300/50 px-1.5 py-0.5 text-[9px] font-bold text-amber-900">
                                        {lastUpdatedText}
                                    </span>
                                )}
                            </div>
                            <p className="font-sans text-sm font-black text-stone-950">
                                {formatIdr(basePricePerGram)} <span className="text-[10px] font-medium text-stone-500">/{unitGram}</span>
                            </p>
                        </div>

                        {/* Prominent Total Display */}
                        <div className="my-3.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                                    {t('pages.b2c.calculator.estimated_total') || 'Estimasi Total Pembelian'}
                                </span>
                                <span className="rounded-full bg-amber-400/25 border border-amber-400/60 px-2.5 py-0.5 text-xs font-black text-amber-950">
                                    {formattedWeightLabel}
                                </span>
                            </div>

                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-xl font-black text-amber-700">Rp</span>
                                <span className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-stone-950">
                                    {formatIdrAmount(estimatedTotal)}
                                </span>
                            </div>
                            <p className="mt-1 text-[11px] text-stone-500">
                                {formatIdrAmount(activeGrams)} {unitGram} × {formatIdr(basePricePerGram)} / {unitGram}
                            </p>
                        </div>

                        {/* Quick Submit CTA for Mobile */}
                        <Link
                            href={contactUrl}
                            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 font-black text-stone-950 shadow-md shadow-amber-500/20 transition-all active:scale-[0.98] text-xs sm:text-sm text-center"
                        >
                            <span>{t('pages.b2c.calculator.cta_btn') || 'Minta Penawaran Resmi'} ({formattedWeightLabel})</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
                        </Link>
                    </div>
                </div>

                {/* Main 2-Column Section Layout */}
                <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
                    
                    {/* Left Column: Minted Bar Presets & Custom Input */}
                    <div className="flex flex-col space-y-6 lg:col-span-7">
                        
                        {/* Weight Preset Selector */}
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Coins className="h-4 w-4 text-amber-600 shrink-0" />
                                    <label className="block text-xs font-bold tracking-wider text-stone-800 uppercase">
                                        {t('pages.b2c.calculator.select_weight') || 'Pilih Gramatur Emas Batangan (Minted Bars)'}
                                    </label>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 px-3 py-0.5 text-xs font-bold text-amber-950 shadow-2xs">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    {t('pages.b2c.calculator.selected_label') || 'Terpilih'}: <strong className="font-extrabold">{formattedWeightLabel}</strong>
                                </span>
                            </div>

                            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
                                {PRESETS.map(({ grams, tag }) => {
                                    const active = !isCustom && selectedGrams === grams;
                                    return (
                                        <button
                                            key={grams}
                                            type="button"
                                            onClick={() => handleSelectPreset(grams)}
                                            className={`group relative flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-4 font-semibold transition-all duration-200 active:scale-95 cursor-pointer text-center ${
                                                active
                                                    ? 'border-2 border-amber-500 bg-gradient-to-b from-amber-500/15 via-amber-400/10 to-white text-stone-950 shadow-md shadow-amber-500/15 ring-2 ring-amber-400/30 scale-[1.02]'
                                                    : 'border-stone-200/90 bg-white hover:bg-amber-50/40 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md text-stone-700 shadow-2xs'
                                            }`}
                                        >
                                            {/* Optional Tag badge */}
                                            {tag && (
                                                <span className={`absolute -top-2.5 rounded-full px-2 py-0.2 text-[9px] font-black uppercase tracking-wider shadow-2xs ${
                                                    active
                                                        ? 'bg-amber-500 text-stone-950 ring-1 ring-amber-600/30'
                                                        : 'bg-stone-800 text-amber-300'
                                                }`}>
                                                    {tag}
                                                </span>
                                            )}

                                            {/* Active Check Indicator */}
                                            {active && (
                                                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-stone-950 shadow-2xs">
                                                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                                                </span>
                                            )}

                                            <span className={`text-base sm:text-xl font-extrabold tracking-tight ${active ? 'text-stone-950' : 'text-stone-900 group-hover:text-amber-950'}`}>
                                                {grams >= 1000 ? `${grams / 1000} kg` : `${grams}g`}
                                            </span>
                                            <span className={`text-[10px] sm:text-xs mt-0.5 font-medium ${active ? 'text-amber-900 font-bold' : 'text-stone-500'}`}>
                                                {grams >= 1000 ? `1.000 ${unitGram}` : `${grams} ${unitGram}`}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Custom Input with Extra Large, Bold Typography Box */}
                        <div className="rounded-2xl border border-stone-200/90 bg-gradient-to-b from-stone-50/70 to-white p-4 sm:p-5 shadow-sm">
                            <div className="mb-2.5 flex items-center justify-between">
                                <label className="block text-xs font-bold tracking-wider text-stone-800 uppercase">
                                    {t('pages.b2c.calculator.custom_weight') || 'Berat Kustom (Custom Grams)'}
                                </label>
                                {isCustom ? (
                                    <button
                                        type="button"
                                        onClick={handleResetToPreset}
                                        className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 border border-amber-300/80 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 uppercase tracking-wide hover:bg-amber-200 transition-colors cursor-pointer"
                                    >
                                        <X className="h-3 w-3" />
                                        <span>Reset ke Preset</span>
                                    </button>
                                ) : (
                                    <span className="text-[11px] text-stone-400">Ketik berat sesuai kebutuhan</span>
                                )}
                            </div>

                            <div className="relative flex items-center">
                                <input
                                    type="number"
                                    min="0.1"
                                    step="any"
                                    placeholder={t('pages.b2c.calculator.custom_placeholder') || 'Ketik gram, contoh: 24'}
                                    value={customGrams}
                                    onChange={handleCustomChange}
                                    className="h-16 w-full rounded-2xl border-2 border-stone-300/90 bg-white px-5 pr-28 text-2xl sm:text-3xl font-black font-sans text-stone-900 placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-inner transition-all"
                                />
                                <div className="absolute right-3 flex items-center pointer-events-none">
                                    <span className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 border border-amber-500/40 px-3 py-1.5 text-xs font-black tracking-wider text-stone-950 uppercase shadow-2xs">
                                        {unitGram}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Increment Chips */}
                            <div className="mt-3.5 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold text-stone-500">
                                    {t('pages.b2c.calculator.quick_add') || 'Tambah Cepat:'}
                                </span>
                                {[1, 5, 10, 25, 100].map((inc) => (
                                    <button
                                        key={inc}
                                        type="button"
                                        onClick={() => handleQuickAdd(inc)}
                                        className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white hover:bg-amber-50 hover:border-amber-300/90 px-3 py-1.5 text-xs font-bold text-stone-700 transition-all cursor-pointer shadow-2xs active:scale-95"
                                    >
                                        <Plus className="h-3 w-3 text-amber-600" />
                                        <span>+{inc}g</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* System Estimation Note */}
                        <div className="flex items-start gap-3 rounded-2xl bg-amber-50/80 border border-amber-200/90 p-3.5 sm:p-4 text-xs text-amber-950 shadow-2xs">
                            <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                            <p className="leading-relaxed text-[11px] sm:text-xs text-amber-950">
                                <strong className="font-bold">{t('pages.b2c.calculator.estimation_note_title') || 'Catatan Estimasi Sistem:'}</strong>{' '}
                                {t('pages.b2c.calculator.estimation_note') || 'Dihitung berdasarkan harga acuan pasar spot terkini. Harga final dan nomor seri segel dikonfirmasi saat penerbitan invoice resmi.'}
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Desktop Live Pricing Terminal (Sticky on Desktop) */}
                    <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
                        <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-b from-amber-500/10 via-white to-white p-6 sm:p-7 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/20">
                            
                            {/* Live Reference Rate Header */}
                            <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2.5 w-2.5 rounded-full ${stale ? 'bg-amber-400' : 'animate-pulse bg-emerald-500'}`} />
                                        <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                                            {t('pages.b2c.calculator.live_price_per_gram') || 'Harga Acuan Pasar Hari Ini'}
                                        </span>
                                    </div>
                                    <p className="mt-1 font-sans text-base sm:text-lg font-black text-stone-900">
                                        {formatIdr(basePricePerGram)} <span className="text-xs font-semibold text-stone-500">/ {unitGram}</span>
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={refresh}
                                    disabled={loading}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-700 transition-all hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 active:scale-95 disabled:opacity-50 cursor-pointer shadow-2xs"
                                    title="Perbarui harga pasar live"
                                    aria-label="Perbarui harga pasar live"
                                >
                                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>

                            {/* Estimated Total Display */}
                            <div className="my-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
                                        {t('pages.b2c.calculator.estimated_total') || 'Estimasi Total Pembelian'}
                                    </span>
                                    <span className="rounded-full bg-amber-400/25 border border-amber-400/60 px-2.5 py-0.5 text-xs font-black text-amber-950">
                                        {formattedWeightLabel}
                                    </span>
                                </div>

                                <div className="mt-3 flex items-baseline gap-1.5 flex-nowrap overflow-hidden">
                                    <span className="shrink-0 text-2xl font-black tracking-tight text-amber-700">
                                        Rp
                                    </span>
                                    <span className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-stone-950 truncate">
                                        {formatIdrAmount(estimatedTotal)}
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-stone-500">
                                    {formatIdrAmount(activeGrams)} {unitGram} × {formatIdr(basePricePerGram)} / {unitGram}
                                </p>
                            </div>

                            {/* Itemized Specification Table */}
                            <div className="space-y-2.5 rounded-2xl bg-stone-50/90 p-4 text-xs border border-stone-200/80">
                                <div className="flex justify-between items-center text-stone-600">
                                    <span className="font-medium">{t('pages.b2c.calculator.breakdown_rate') || 'Harga Acuan'}</span>
                                    <span className="font-bold text-stone-900">{formatIdr(basePricePerGram)}/{unitGram}</span>
                                </div>
                                <div className="flex justify-between items-center text-stone-600">
                                    <span className="font-medium">{t('pages.b2c.calculator.breakdown_purity') || 'Standar Kemurnian'}</span>
                                    <span className="font-bold text-amber-900 bg-amber-100/90 border border-amber-300/60 px-2 py-0.5 rounded-md">
                                        {t('pages.b2c.calculator.breakdown_purity_val') || '24K (99.99% Fine Gold)'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-stone-600">
                                    <span className="font-medium">{t('pages.b2c.calculator.breakdown_cert') || 'Sertifikasi & Segel'}</span>
                                    <span className="font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2 py-0.5 rounded-md">
                                        {t('pages.b2c.calculator.breakdown_cert_val') || 'Termasuk (Official Assay)'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-stone-600">
                                    <span className="font-medium">{t('pages.b2c.calculator.breakdown_shipping') || 'Pengiriman Fisik'}</span>
                                    <span className="font-bold text-blue-800 bg-blue-100/90 border border-blue-300/60 px-2 py-0.5 rounded-md">
                                        {t('pages.b2c.calculator.breakdown_shipping_val') || 'Asuransi Penuh 100%'}
                                    </span>
                                </div>
                            </div>

                            {/* Indicative Note & Source */}
                            <div className="mt-3.5 space-y-1">
                                <p className="text-[10px] leading-relaxed text-stone-500">
                                    {t('pages.b2c.calculator.pricing_note') || '* Nilai bersifat indikatif mengikuti harga acuan pasar harian. Kuotasi final dikunci saat transaksi.'}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] text-stone-500">
                                    <span>Sumber:</span>
                                    <a 
                                        href="https://livegold-kristalintv.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="font-bold text-amber-800 hover:underline inline-flex items-center gap-0.5"
                                    >
                                        Kristalin TV
                                        <ExternalLink className="h-2.5 w-2.5" />
                                    </a>
                                    {lastUpdatedText && <span>· {lastUpdatedText}</span>}
                                </div>
                            </div>

                            {/* Primary CTA Button */}
                            <div className="mt-6">
                                <Link
                                    href={contactUrl}
                                    className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 sm:px-6 font-black text-stone-950 shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.98] cursor-pointer text-xs sm:text-sm text-center"
                                >
                                    <span>{t('pages.b2c.calculator.cta_btn') || 'Minta Penawaran Resmi'} ({formattedWeightLabel})</span>
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
                                </Link>
                            </div>

                            {/* Verified Footnote */}
                            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                <span>{t('pages.b2c.calculator.verified_note') || 'Kuotasi resmi diverifikasi PT Kristalin Ekalestari'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centered 4 Trust & Security Guarantee Badges (Across Full Container Width) */}
                <div className="relative z-10 mt-10 sm:mt-12 pt-8 border-t border-stone-200/80">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            
                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4.5 text-center shadow-2xs transition-all duration-200 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100/90 text-amber-800 border border-amber-200/80 shadow-2xs">
                                    <Award className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.b2c.calculator.trust_purity_title') || 'Kemurnian 99.99%'}
                                </h4>
                                <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                                    {t('pages.b2c.calculator.trust_purity_desc') || 'Fine Gold 24K standar SNI & LBMA.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4.5 text-center shadow-2xs transition-all duration-200 hover:border-emerald-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.b2c.calculator.trust_assay_title') || 'Kemasan Assay'}
                                </h4>
                                <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                                    {t('pages.b2c.calculator.trust_assay_desc') || 'Segel keamanan tinggi ber-seri unik.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4.5 text-center shadow-2xs transition-all duration-200 hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100/90 text-blue-800 border border-blue-200/80 shadow-2xs">
                                    <Truck className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.b2c.calculator.trust_insurance_title') || 'Asuransi 100%'}
                                </h4>
                                <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                                    {t('pages.b2c.calculator.trust_insurance_desc') || 'Pengiriman fisik aman terproteksi.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4.5 text-center shadow-2xs transition-all duration-200 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100/90 text-amber-800 border border-amber-200/80 shadow-2xs">
                                    <RotateCcw className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.b2c.calculator.trust_buyback_title') || 'Jaminan Buyback'}
                                </h4>
                                <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                                    {t('pages.b2c.calculator.trust_buyback_desc') || 'Jaminan likuiditas pembelian kembali.'}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

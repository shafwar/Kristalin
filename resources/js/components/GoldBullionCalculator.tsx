import { useTranslation } from '@/hooks/useTranslation';
import { formatIdr, formatIdrAmount, getBestSell1g, useKristalinTvGold } from '@/hooks/useKristalinTvGold';
import { Link } from '@inertiajs/react';
import { 
    Award, Check, ChevronRight, Coins, ExternalLink, 
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
            <div className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-b from-white via-white to-stone-50/70 p-5 sm:p-8 lg:p-10 shadow-2xl shadow-stone-200/60 ring-1 ring-stone-900/5">
                
                {/* Decorative Subtle Background Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" aria-hidden="true" />

                {/* Header Area */}
                <div className="relative z-10 mb-6 sm:mb-8 lg:mb-10 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-yellow-500/15 border border-amber-400/40 px-3.5 py-1 text-xs font-bold text-amber-950 tracking-wide shadow-2xs">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{t('pages.b2c.calculator.refinery_badge') || 'DIRECT REFINERY SUPPLY · KISARA GOLD 24K'}</span>
                    </div>
                    
                    <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900 leading-tight">
                        {t('pages.b2c.calculator.title') || 'Simulasi Pemesanan Emas Batangan 24K'}
                    </h2>
                    
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                        {t('pages.b2c.calculator.subtitle') || 'Akses langsung likuiditas emas murni 99.99% standar bersertifikat resmi dari ekosistem pemurnian PT Kristalin Ekalestari.'}
                    </p>
                </div>

                {/* ========================================================================= */}
                {/* MOBILE VIEW (< lg): Ultra-Clean, Non-Cluttered, Linear Flow              */}
                {/* [1. Top Output Terminal] -> [2. Presets] -> [3. Custom Input] -> [4. CTA] */}
                {/* ========================================================================= */}
                <div className="block lg:hidden relative z-10 space-y-5 mb-2">
                    
                    {/* 1. Mobile Live Output Card (No premature CTA button) */}
                    <div className="rounded-2xl border border-amber-300/90 bg-gradient-to-br from-amber-500/15 via-white to-amber-500/5 p-4 sm:p-5 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30">
                        {/* Live Rate Header */}
                        <div className="flex items-center justify-between border-b border-amber-200/70 pb-2.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <span className={`h-2 w-2 shrink-0 rounded-full ${stale ? 'bg-amber-400' : 'animate-pulse bg-emerald-500'}`} />
                                <span className="text-[11px] font-bold text-stone-700 truncate">
                                    Kristalin TV Live
                                </span>
                                {lastUpdatedText && (
                                    <span className="shrink-0 rounded bg-amber-100 border border-amber-300/50 px-1.5 py-0.2 text-[9px] font-bold text-amber-900">
                                        {lastUpdatedText}
                                    </span>
                                )}
                            </div>
                            <p className="font-sans text-xs sm:text-sm font-black text-stone-900 shrink-0">
                                {formatIdr(basePricePerGram)}<span className="text-[10px] font-normal text-stone-500">/{unitGram}</span>
                            </p>
                        </div>

                        {/* Prominent Calculation Output */}
                        <div className="pt-3 pb-1">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">
                                    {t('pages.b2c.calculator.estimated_total') || 'Estimasi Total'}
                                </span>
                                <span className="rounded-full bg-amber-400/25 border border-amber-400/60 px-2.5 py-0.5 text-xs font-black text-amber-950">
                                    {formattedWeightLabel}
                                </span>
                            </div>

                            <div className="mt-1.5 flex items-baseline gap-1">
                                <span className="text-xl font-black text-amber-700">Rp</span>
                                <span className="font-sans text-3xl font-black tracking-tight text-stone-950">
                                    {formatIdrAmount(estimatedTotal)}
                                </span>
                            </div>
                            <p className="mt-1 text-[11px] text-stone-500 font-medium">
                                {formatIdrAmount(activeGrams)} {unitGram} × {formatIdr(basePricePerGram)} / {unitGram}
                            </p>
                        </div>
                    </div>

                    {/* 2. Mobile Preset Weight Selector */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-xs font-bold tracking-wider text-stone-700 uppercase">
                                {t('pages.b2c.calculator.select_weight') || 'Pilih Gramatur Emas'}
                            </label>
                            <span className="text-[11px] font-bold text-amber-800">
                                Terpilih: {formattedWeightLabel}
                            </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {PRESETS.map(({ grams, tag }) => {
                                const active = !isCustom && selectedGrams === grams;
                                return (
                                    <button
                                        key={grams}
                                        type="button"
                                        onClick={() => handleSelectPreset(grams)}
                                        className={`group relative flex flex-col items-center justify-center rounded-xl border p-2.5 font-semibold transition-all duration-150 active:scale-95 cursor-pointer text-center ${
                                            active
                                                ? 'border-2 border-amber-500 bg-gradient-to-b from-amber-500/20 to-white text-stone-950 shadow-sm ring-1 ring-amber-400/40'
                                                : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700 shadow-2xs'
                                        }`}
                                    >
                                        {active && (
                                            <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-stone-950">
                                                <Check className="h-2 w-2 stroke-[3]" />
                                            </span>
                                        )}
                                        <span className={`text-base font-extrabold tracking-tight ${active ? 'text-stone-950' : 'text-stone-800'}`}>
                                            {grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`}
                                        </span>
                                        <span className={`text-[9px] ${active ? 'text-amber-900 font-bold' : 'text-stone-500'}`}>
                                            {grams >= 1000 ? '1.000g' : `${grams}g`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Mobile Custom Weight Form (Below Output & Presets) */}
                    <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-2xs">
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-xs font-bold tracking-wider text-stone-700 uppercase">
                                {t('pages.b2c.calculator.custom_weight') || 'Atau Ketik Gram Kustom'}
                            </label>
                            {isCustom && (
                                <button
                                    type="button"
                                    onClick={handleResetToPreset}
                                    className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300/80 px-2 py-0.2 text-[10px] font-bold text-amber-900 hover:bg-amber-200 cursor-pointer"
                                >
                                    <X className="h-2.5 w-2.5" />
                                    <span>{t('pages.b2c.calculator.reset') || 'Reset'}</span>
                                </button>
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
                                className="h-13 w-full rounded-xl border-2 border-stone-300/90 bg-stone-50/50 px-4 pr-24 text-xl font-black font-sans text-stone-900 placeholder:text-stone-400 placeholder:text-xs focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all"
                            />
                            <div className="absolute right-2.5 flex items-center pointer-events-none">
                                <span className="rounded-lg bg-amber-400 border border-amber-500/40 px-2.5 py-1 text-[11px] font-black tracking-wider text-stone-950 uppercase shadow-2xs">
                                    {unitGram}
                                </span>
                            </div>
                        </div>

                        {/* Quick Chips */}
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                            {[1, 5, 10, 25, 100].map((inc) => (
                                <button
                                    key={inc}
                                    type="button"
                                    onClick={() => handleQuickAdd(inc)}
                                    className="inline-flex items-center gap-0.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 px-2.5 py-1 text-xs font-bold text-stone-700 transition-all cursor-pointer shadow-2xs active:scale-95"
                                >
                                    <Plus className="h-2.5 w-2.5 text-amber-600" />
                                    <span>+{inc}g</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4. Mobile Bottom Action & Assurance */}
                    <div className="space-y-3 pt-1">
                        <div className="flex items-center justify-between text-[10px] text-stone-500 px-1 font-medium">
                            <span>✓ {t('pages.b2c.calculator.trust_purity_title') || 'Kemurnian 99.99%'}</span>
                            <span>✓ {t('pages.b2c.calculator.trust_assay_title') || 'Kemasan Segel Assay'}</span>
                            <span>✓ {t('pages.b2c.calculator.trust_insurance_title') || 'Asuransi 100%'}</span>
                        </div>

                        <Link
                            href={contactUrl}
                            className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 font-black text-stone-950 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] text-sm text-center"
                        >
                            <span>{t('pages.b2c.calculator.cta_btn') || 'Minta Penawaran Resmi'} ({formattedWeightLabel})</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
                        </Link>

                        <div className="flex items-center justify-center gap-1 text-[10px] text-stone-400">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{t('pages.b2c.calculator.verified_note') || 'Kuotasi resmi diverifikasi PT Kristalin Ekalestari'}</span>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* DESKTOP VIEW (>= lg): Perfectly Balanced, Large & Symmetrical 2-Column   */}
                {/* ========================================================================= */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-stretch relative z-10">
                    
                    {/* Left Column: Preset Weights + Custom Box + System Note (Balanced Height) */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                        
                        {/* 1. Weight Preset Selector */}
                        <div>
                            <div className="mb-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Coins className="h-4 w-4 text-amber-600 shrink-0" />
                                    <label className="block text-xs font-bold tracking-wider text-stone-800 uppercase">
                                        {t('pages.b2c.calculator.select_weight') || 'Pilih Gramatur Emas Batangan (Minted Bars)'}
                                    </label>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 px-3.5 py-0.5 text-xs font-bold text-amber-950 shadow-2xs">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    {t('pages.b2c.calculator.selected_label') || 'Terpilih'}: <strong className="font-extrabold">{formattedWeightLabel}</strong>
                                </span>
                            </div>

                            <div className="grid grid-cols-4 gap-3 sm:gap-3.5">
                                {PRESETS.map(({ grams, tag }) => {
                                    const active = !isCustom && selectedGrams === grams;
                                    return (
                                        <button
                                            key={grams}
                                            type="button"
                                            onClick={() => handleSelectPreset(grams)}
                                            className={`group relative flex flex-col items-center justify-center rounded-2xl border p-4 font-semibold transition-all duration-200 active:scale-95 cursor-pointer text-center ${
                                                active
                                                    ? 'border-2 border-amber-500 bg-gradient-to-b from-amber-500/15 via-amber-400/10 to-white text-stone-950 shadow-md shadow-amber-500/15 ring-2 ring-amber-400/30 scale-[1.02]'
                                                    : 'border-stone-200/90 bg-white hover:bg-amber-50/40 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md text-stone-700 shadow-2xs'
                                            }`}
                                        >
                                            {/* Tag badge */}
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

                                            <span className={`text-xl font-black tracking-tight ${active ? 'text-stone-950' : 'text-stone-900 group-hover:text-amber-950'}`}>
                                                {grams >= 1000 ? `${grams / 1000} kg` : `${grams}g`}
                                            </span>
                                            <span className={`text-xs mt-0.5 font-medium ${active ? 'text-amber-900 font-bold' : 'text-stone-500'}`}>
                                                {grams >= 1000 ? `1.000 ${unitGram}` : `${grams} ${unitGram}`}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Custom Weight Input Box */}
                        <div className="rounded-2xl border border-stone-200/90 bg-gradient-to-b from-stone-50/70 to-white p-5 shadow-sm">
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
                                        <span>{t('pages.b2c.calculator.reset_preset') || 'Reset ke Preset'}</span>
                                    </button>
                                ) : (
                                    <span className="text-[11px] text-stone-400">{t('pages.b2c.calculator.custom_hint') || 'Ketik berat sesuai kebutuhan'}</span>
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
                                    className="h-16 w-full rounded-2xl border-2 border-stone-300/90 bg-white px-5 pr-28 text-2xl sm:text-3xl font-black font-sans text-stone-900 placeholder:text-stone-400 placeholder:text-base focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-inner transition-all"
                                />
                                <div className="absolute right-3 flex items-center pointer-events-none">
                                    <span className="rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 border border-amber-500/40 px-3.5 py-1.5 text-xs font-black tracking-wider text-stone-950 uppercase shadow-2xs">
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
                                        className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white hover:bg-amber-50 hover:border-amber-300 px-3 py-1.5 text-xs font-bold text-stone-700 transition-all cursor-pointer shadow-2xs active:scale-95"
                                    >
                                        <Plus className="h-3 w-3 text-amber-600" />
                                        <span>+{inc}g</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. System Estimation Note */}
                        <div className="flex items-start gap-3 rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 text-xs text-amber-950 shadow-2xs mt-auto">
                            <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                            <p className="leading-relaxed text-xs text-amber-950">
                                <strong className="font-bold">{t('pages.b2c.calculator.estimation_note_title') || 'Catatan Estimasi Sistem:'}</strong>{' '}
                                {t('pages.b2c.calculator.estimation_note') || 'Dihitung berdasarkan harga acuan pasar spot live. Harga final dan nomor seri segel dikonfirmasi saat penerbitan invoice resmi.'}
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Desktop Live Pricing Terminal (Aligned & Symmetrical) */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="h-full flex flex-col justify-between rounded-3xl border border-amber-300/90 bg-gradient-to-b from-amber-500/10 via-white to-white p-8 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/20">
                            
                            {/* Top Section: Live Rate + Estimated Total + Spec Table + Source */}
                            <div className="flex flex-col">
                                
                                {/* Live Reference Rate Header */}
                                <div className="flex items-center justify-between border-b border-stone-200/90 pb-5">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2.5 w-2.5 rounded-full ${stale ? 'bg-amber-400' : 'animate-pulse bg-emerald-500'}`} />
                                            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                                                {t('pages.b2c.calculator.live_price_per_gram') || 'Harga Acuan Pasar Hari Ini'}
                                            </span>
                                        </div>
                                        <p className="mt-1.5 font-sans text-2xl font-black text-stone-950">
                                            {formatIdr(basePricePerGram)} <span className="text-xs font-semibold text-stone-500">/ {unitGram}</span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={refresh}
                                        disabled={loading}
                                        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-stone-200 text-stone-700 transition-all hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 active:scale-95 disabled:opacity-50 cursor-pointer shadow-2xs"
                                        title={t('pages.b2c.calculator.refresh_label') || 'Perbarui harga pasar live'}
                                        aria-label={t('pages.b2c.calculator.refresh_label') || 'Perbarui harga pasar live'}
                                    >
                                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                    </button>
                                </div>

                                {/* Estimated Total Display */}
                                <div className="my-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                                            {t('pages.b2c.calculator.estimated_total') || 'Estimasi Total Pembelian'}
                                        </span>
                                        <span className="rounded-full bg-amber-400/25 border border-amber-400/60 px-3 py-0.5 text-xs font-black text-amber-950">
                                            {formattedWeightLabel}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-baseline gap-1.5 flex-nowrap overflow-hidden">
                                        <span className="shrink-0 text-2xl lg:text-3xl font-black tracking-tight text-amber-700">
                                            Rp
                                        </span>
                                        <span className="font-sans text-3xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight text-stone-950 truncate">
                                            {formatIdrAmount(estimatedTotal)}
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-xs text-stone-500 font-medium">
                                        {formatIdrAmount(activeGrams)} {unitGram} × {formatIdr(basePricePerGram)} / {unitGram}
                                    </p>
                                </div>

                                {/* Itemized Specification Table */}
                                <div className="space-y-3 rounded-2xl bg-stone-50/95 p-4.5 text-xs border border-stone-200/90 shadow-2xs">
                                    <div className="flex justify-between items-center text-stone-600">
                                        <span className="font-medium">{t('pages.b2c.calculator.breakdown_rate') || 'Harga Acuan'}</span>
                                        <span className="font-bold text-stone-900">{formatIdr(basePricePerGram)}/{unitGram}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-stone-600">
                                        <span className="font-medium">{t('pages.b2c.calculator.breakdown_purity') || 'Standar Kemurnian'}</span>
                                        <span className="font-bold text-amber-900 bg-amber-100/90 border border-amber-300/60 px-2.5 py-0.5 rounded-md">
                                            {t('pages.b2c.calculator.breakdown_purity_val') || '24K (99.99% Emas Murni)'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-stone-600">
                                        <span className="font-medium">{t('pages.b2c.calculator.breakdown_cert') || 'Sertifikasi & Segel'}</span>
                                        <span className="font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2.5 py-0.5 rounded-md">
                                            {t('pages.b2c.calculator.breakdown_cert_val') || 'Termasuk (Official Assay)'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-stone-600">
                                        <span className="font-medium">{t('pages.b2c.calculator.breakdown_shipping') || 'Pengiriman Fisik'}</span>
                                        <span className="font-bold text-blue-800 bg-blue-100/90 border border-blue-300/60 px-2.5 py-0.5 rounded-md">
                                            {t('pages.b2c.calculator.breakdown_shipping_val') || 'Asuransi Penuh 100%'}
                                        </span>
                                    </div>
                                </div>

                                {/* Indicative Note & Source */}
                                <div className="mt-4 space-y-1.5">
                                    <p className="text-[10px] leading-relaxed text-stone-500">
                                        {t('pages.b2c.calculator.pricing_note') || '* Nilai bersifat indikatif mengikuti harga acuan pasar harian. Kuotasi final dikunci saat transaksi.'}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
                                        <span className="font-semibold">{t('pages.b2c.calculator.source_label') || 'Sumber'}:</span>
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
                            </div>

                            {/* Bottom Section: Primary CTA & Verification Footnote */}
                            <div className="mt-6 pt-3 border-t border-stone-200/60">
                                <Link
                                    href={contactUrl}
                                    className="group flex h-14 sm:h-15 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-6 font-black text-stone-950 shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.98] cursor-pointer text-sm sm:text-base text-center"
                                >
                                    <span>{t('pages.b2c.calculator.cta_btn') || 'Minta Penawaran Resmi'} ({formattedWeightLabel})</span>
                                    <ChevronRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1 shrink-0" />
                                </Link>

                                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                    <span>{t('pages.b2c.calculator.verified_note') || 'Kuotasi resmi diverifikasi PT Kristalin Ekalestari'}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Centered 4 Trust & Security Guarantee Badges (Across Full Container Width) */}
                <div className="relative z-10 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-stone-200/80">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            
                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all duration-200 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-amber-100/90 text-amber-800 border border-amber-200/80 shadow-2xs">
                                    <Award className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.b2c.calculator.trust_purity_title') || 'Kemurnian 99.99%'}
                                </h4>
                                <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                                    {t('pages.b2c.calculator.trust_purity_desc') || 'Fine Gold 24K standar SNI & LBMA.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all duration-200 hover:border-emerald-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.b2c.calculator.trust_assay_title') || 'Kemasan Assay'}
                                </h4>
                                <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                                    {t('pages.b2c.calculator.trust_assay_desc') || 'Segel keamanan tinggi ber-seri unik.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all duration-200 hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-blue-100/90 text-blue-800 border border-blue-200/80 shadow-2xs">
                                    <Truck className="h-5 w-5" />
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.b2c.calculator.trust_insurance_title') || 'Asuransi 100%'}
                                </h4>
                                <p className="mt-1 text-[11px] text-stone-500 leading-tight">
                                    {t('pages.b2c.calculator.trust_insurance_desc') || 'Pengiriman fisik aman terproteksi.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all duration-200 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md">
                                <div className="mb-2 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-amber-100/90 text-amber-800 border border-amber-200/80 shadow-2xs">
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

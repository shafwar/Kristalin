import { useTranslation } from '@/hooks/useTranslation';
import { formatIdr, formatIdrAmount, getBestSell1g, useKristalinTvGold } from '@/hooks/useKristalinTvGold';
import { Link } from '@inertiajs/react';
import { 
    Award, ChevronRight, Coins, Info, Plus, 
    RefreshCw, RotateCcw, ShieldCheck, Truck 
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

const GRAM_PRESETS = [1, 5, 10, 25, 50, 100, 500, 1000];

export default function GoldBullionCalculator() {
    const { t } = useTranslation();
    const { market, brandPrices, loading, refresh } = useKristalinTvGold(true);

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
        const current = activeGrams;
        const next = Math.max(1, current + increment);
        setCustomGrams(next.toString());
    };

    const unitGram = t('pages.b2c.calculator.gram_unit') || 'Gram';
    const formattedWeightLabel = activeGrams >= 1000 
        ? `${activeGrams / 1000} kg (${formatIdrAmount(activeGrams)} ${unitGram})` 
        : `${formatIdrAmount(activeGrams)} ${unitGram}`;

    return (
        <div className="w-full">
            {/* Unified 2-Column Section Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
                
                {/* Left Column: Selector, Custom Input & Trust Pillars */}
                <div className="flex flex-col space-y-7 lg:col-span-7">
                    
                    {/* Header */}
                    <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 px-3.5 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider shadow-2xs">
                            <Coins className="h-3.5 w-3.5 text-amber-700" />
                            <span>{t('pages.b2c.calculator.refinery_badge') || 'Direct Refinery Supply · Kisara Gold 24K'}</span>
                        </div>
                        
                        <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                            {t('pages.b2c.calculator.title') || 'Simulasi Pemesanan Emas Batangan 24K'}
                        </h2>
                        
                        <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
                            {t('pages.b2c.calculator.subtitle') || 'Akses langsung likuiditas emas batangan murni 99.99% langsung dari rantai pasok PT Kristalin Ekalestari.'}
                        </p>
                    </div>

                    {/* Weight Preset Selector */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase">
                                {t('pages.b2c.calculator.select_weight') || 'Pilih Gramatur Emas Batangan'}
                            </label>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-900">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                {t('pages.b2c.calculator.selected_label') || 'Terpilih'}: <strong className="font-bold">{formattedWeightLabel}</strong>
                            </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                            {GRAM_PRESETS.map((grams) => {
                                const active = !isCustom && selectedGrams === grams;
                                return (
                                    <button
                                        key={grams}
                                        type="button"
                                        onClick={() => handleSelectPreset(grams)}
                                        className={`group relative flex flex-col items-center justify-center rounded-2xl border p-3 font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                                            active
                                                ? 'border-2 border-amber-500 bg-amber-50/80 text-stone-950 shadow-sm ring-2 ring-amber-400/20'
                                                : 'border-stone-200/90 bg-white hover:bg-stone-50 hover:border-stone-300 text-stone-700 shadow-2xs'
                                        }`}
                                    >
                                        <span className={`text-base font-bold sm:text-lg tracking-tight ${active ? 'text-amber-950 font-extrabold' : 'text-stone-900'}`}>
                                            {grams >= 1000 ? `${grams / 1000} kg` : `${grams}g`}
                                        </span>
                                        <span className={`text-[10px] mt-0.5 ${active ? 'text-amber-800 font-bold' : 'text-stone-500'}`}>
                                            {grams >= 1000 ? `1.000 ${unitGram}` : `${grams} ${unitGram}`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Custom Input with Extra Large, Pleasant Typography */}
                    <div className="rounded-2xl border border-stone-200/90 bg-stone-50/60 p-4 sm:p-5">
                        <div className="mb-2.5 flex items-center justify-between">
                            <label className="block text-xs font-bold tracking-wider text-stone-700 uppercase">
                                {t('pages.b2c.calculator.custom_weight') || 'Berat Kustom'}
                            </label>
                            {isCustom && (
                                <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                                    {t('pages.b2c.calculator.custom_active') || 'Mode Kustom'}
                                </span>
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
                                className="h-16 w-full rounded-2xl border-2 border-stone-300/90 bg-white px-5 pr-28 text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 placeholder:text-stone-400 placeholder:text-base focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-sm transition-all"
                            />
                            <div className="absolute right-3 flex items-center">
                                <span className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-black tracking-wider text-amber-900 uppercase">
                                    {unitGram}
                                </span>
                            </div>
                        </div>

                        {/* Quick Increment Chips */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-stone-500">
                                {t('pages.b2c.calculator.quick_add') || 'Tambah Cepat:'}
                            </span>
                            {[1, 5, 10, 25, 100].map((inc) => (
                                <button
                                    key={inc}
                                    type="button"
                                    onClick={() => handleQuickAdd(inc)}
                                    className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white hover:bg-amber-50 hover:border-amber-300 px-3 py-1.5 text-xs font-bold text-stone-700 transition-colors cursor-pointer shadow-2xs active:scale-95"
                                >
                                    <Plus className="h-3 w-3 text-amber-600" />
                                    <span>+{inc}g</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* System Estimation Note */}
                    <div className="flex items-start gap-3 rounded-2xl bg-amber-50/70 border border-amber-200/90 p-3.5 sm:p-4 text-xs text-amber-950 shadow-2xs">
                        <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                        <p className="leading-relaxed text-[11px] sm:text-xs">
                            <strong>{t('pages.b2c.calculator.estimation_note_title') || 'Catatan Estimasi Sistem:'}</strong>{' '}
                            {t('pages.b2c.calculator.estimation_note') || 'Dihitung berdasarkan harga acuan pasar spot terkini. Harga final dan nomor seri segel dikonfirmasi saat penerbitan invoice resmi.'}
                        </p>
                    </div>

                    {/* 4 Trust & Security Guarantee Badges */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3.5">
                        <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 text-center shadow-2xs transition-all hover:border-amber-200">
                            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                <Award className="h-4 w-4" />
                            </div>
                            <h4 className="text-xs font-bold text-stone-900">{t('pages.b2c.calculator.trust_purity_title') || 'Kemurnian 99.99%'}</h4>
                            <p className="mt-0.5 text-[10px] text-stone-500 leading-tight">{t('pages.b2c.calculator.trust_purity_desc') || 'Fine Gold 24K standar SNI & LBMA.'}</p>
                        </div>
                        <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 text-center shadow-2xs transition-all hover:border-emerald-200">
                            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <h4 className="text-xs font-bold text-stone-900">{t('pages.b2c.calculator.trust_assay_title') || 'Kemasan Assay'}</h4>
                            <p className="mt-0.5 text-[10px] text-stone-500 leading-tight">{t('pages.b2c.calculator.trust_assay_desc') || 'Segel keamanan tinggi ber-seri unik.'}</p>
                        </div>
                        <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 text-center shadow-2xs transition-all hover:border-blue-200">
                            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                <Truck className="h-4 w-4" />
                            </div>
                            <h4 className="text-xs font-bold text-stone-900">{t('pages.b2c.calculator.trust_insurance_title') || 'Asuransi 100%'}</h4>
                            <p className="mt-0.5 text-[10px] text-stone-500 leading-tight">{t('pages.b2c.calculator.trust_insurance_desc') || 'Pengiriman fisik aman terproteksi.'}</p>
                        </div>
                        <div className="rounded-2xl border border-stone-200/90 bg-white p-3.5 text-center shadow-2xs transition-all hover:border-amber-200">
                            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                <RotateCcw className="h-4 w-4" />
                            </div>
                            <h4 className="text-xs font-bold text-stone-900">{t('pages.b2c.calculator.trust_buyback_title') || 'Jaminan Buyback'}</h4>
                            <p className="mt-0.5 text-[10px] text-stone-500 leading-tight">{t('pages.b2c.calculator.trust_buyback_desc') || 'Jaminan likuiditas pembelian kembali.'}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Live Pricing Terminal & Checkout Summary (Sticky on Desktop) */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                    <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xl shadow-stone-200/50 ring-1 ring-stone-900/5">
                        
                        {/* Live Reference Rate Header */}
                        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                                        {t('pages.b2c.calculator.live_price_per_gram') || 'Harga Acuan Pasar Hari Ini'}
                                    </span>
                                </div>
                                <p className="mt-0.5 font-mono text-base sm:text-lg font-bold text-stone-900">
                                    {formatIdr(basePricePerGram)} <span className="text-xs font-medium text-stone-500">/ {t('pages.b2c.calculator.per_gram') || 'gram'}</span>
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={refresh}
                                disabled={loading}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-50 border border-stone-200 text-stone-700 transition-all hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 active:scale-95 disabled:opacity-50 cursor-pointer shadow-2xs"
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
                                <span className="rounded-full bg-amber-100 border border-amber-300/80 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                                    {formattedWeightLabel}
                                </span>
                            </div>

                            <div className="mt-3 flex items-baseline gap-1.5 flex-nowrap overflow-hidden">
                                <span className="shrink-0 text-xl sm:text-2xl font-bold tracking-tight text-amber-800">
                                    Rp
                                </span>
                                <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 truncate">
                                    {formatIdrAmount(estimatedTotal)}
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-stone-500">
                                {formatIdrAmount(activeGrams)} {unitGram} × {formatIdr(basePricePerGram)} / {t('pages.b2c.calculator.per_gram') || 'gram'}
                            </p>
                        </div>

                        {/* Itemized Breakdown */}
                        <div className="space-y-2.5 rounded-2xl bg-stone-50/80 p-4 text-xs border border-stone-200/80">
                            <div className="flex justify-between text-stone-600">
                                <span>{t('pages.b2c.calculator.breakdown_rate') || 'Harga Acuan'}</span>
                                <span className="font-mono font-bold text-stone-900">{formatIdr(basePricePerGram)}/{t('pages.b2c.calculator.per_gram') || 'g'}</span>
                            </div>
                            <div className="flex justify-between text-stone-600">
                                <span>{t('pages.b2c.calculator.breakdown_purity') || 'Standar Kemurnian'}</span>
                                <span className="font-bold text-amber-800">{t('pages.b2c.calculator.breakdown_purity_val') || '24K (99.99% Fine Gold)'}</span>
                            </div>
                            <div className="flex justify-between text-stone-600">
                                <span>{t('pages.b2c.calculator.breakdown_cert') || 'Sertifikasi & Segel'}</span>
                                <span className="font-bold text-emerald-700">{t('pages.b2c.calculator.breakdown_cert_val') || 'Termasuk (Official Assay)'}</span>
                            </div>
                            <div className="flex justify-between text-stone-600">
                                <span>{t('pages.b2c.calculator.breakdown_shipping') || 'Pengiriman Fisik'}</span>
                                <span className="font-bold text-blue-700">{t('pages.b2c.calculator.breakdown_shipping_val') || 'Asuransi Penuh 100%'}</span>
                            </div>
                        </div>

                        {/* Indicative Note */}
                        <p className="mt-3.5 text-[10px] leading-relaxed text-stone-500">
                            {t('pages.b2c.calculator.pricing_note') || '* Nilai bersifat indikatif mengikuti harga acuan pasar harian. Kuotasi final dikunci saat transaksi.'}
                        </p>

                        {/* Primary CTA Button -> Seamlessly routes to /contact with parameters */}
                        <div className="mt-6">
                            <Link
                                href={`/contact?subject=b2c&grams=${activeGrams}&est=${estimatedTotal}#contact-form`}
                                className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 sm:px-6 font-bold text-stone-950 shadow-md transition-all active:scale-[0.98] cursor-pointer text-xs sm:text-sm text-center"
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
        </div>
    );
}

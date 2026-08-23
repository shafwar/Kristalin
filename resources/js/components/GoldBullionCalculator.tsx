import { useTranslation } from '@/hooks/useTranslation';
import { formatIdr, getBestSell1g, useKristalinTvGold } from '@/hooks/useKristalinTvGold';
import { CheckCircle2, ChevronRight, Coins, RefreshCw, Send, ShieldCheck, Sparkles, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const GRAM_PRESETS = [1, 5, 10, 25, 50, 100, 500, 1000];

export default function GoldBullionCalculator() {
    const { t } = useTranslation();
    const { market, brandPrices, loading, refresh } = useKristalinTvGold(true);

    const [selectedGrams, setSelectedGrams] = useState<number>(5);
    const [customGrams, setCustomGrams] = useState<string>('');
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [isRfqModalOpen, setIsRfqModalOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Form submission state
    const [rfqStatus, setRfqStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    // Prevent body scroll when RFQ modal is open
    useEffect(() => {
        if (isRfqModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isRfqModalOpen]);

    // Determine current active grams
    const activeGrams = useMemo(() => {
        if (isCustom) {
            const parsed = parseFloat(customGrams.replace(',', '.'));
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
    };

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCustom(true);
        setCustomGrams(e.target.value);
    };

    const handleSubmitRfq = async (e: React.FormEvent) => {
        e.preventDefault();
        setRfqStatus('submitting');

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        const fd = new FormData();
        fd.append('name', formData.name);
        fd.append('email', formData.email);
        fd.append('subject', `[B2C Gold Quote] Pembelian ${activeGrams} Gram Emas Kisara`);
        fd.append(
            'message',
            `Permintaan Kuotasi Pembelian Emas Fisik:\n` +
            `- Jumlah: ${activeGrams} Gram\n` +
            `- Estimasi Nilai: ${formatIdr(estimatedTotal)}\n` +
            `- Harga Acuan per Gram: ${formatIdr(basePricePerGram)}\n` +
            `- No. WhatsApp / Telp: ${formData.phone || '-'}\n` +
            `- Catatan Pemesan: ${formData.notes || '-'}\n`
        );

        try {
            const res = await fetch('/contact-message', {
                method: 'POST',
                body: fd,
                headers: {
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setRfqStatus('success');
            } else {
                setRfqStatus('error');
            }
        } catch {
            setRfqStatus('error');
        }
    };

    return (
        <div className="relative mx-auto my-6 w-full max-w-5xl overflow-hidden rounded-3xl border border-amber-500/30 bg-[#0c1424] p-6 sm:p-8 lg:p-10 text-white shadow-2xl ring-1 ring-white/10">
            {/* Subtle Brand Accent Light */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-600/10 blur-[80px]" />

            {/* Top Bar / Header */}
            <div className="relative z-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                            <Coins className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-[11px] font-bold tracking-[0.2em] text-amber-400 uppercase">
                            {t('pages.b2c.calculator.kicker') || 'Simulasi & Kalkulator Emas'}
                        </span>
                    </div>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {t('pages.b2c.calculator.title') || 'Kalkulator Investasi Logam Mulia'}
                    </h3>
                    <p className="mt-1 text-xs text-stone-300 sm:text-sm leading-relaxed max-w-2xl">
                        {t('pages.b2c.calculator.subtitle') || 'Hitung estimasi nilai pembelian emas fisik Kisara Gold (99.99% 24K) secara instan berdasarkan data harga pasar hari ini.'}
                    </p>
                </div>

                {/* Live rate badge */}
                <div className="flex shrink-0 items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-stone-900/80 px-4 py-3 shadow-inner backdrop-blur-md">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                                {t('pages.b2c.calculator.live_price_per_gram') || 'Harga Acuan per Gram'}
                            </p>
                        </div>
                        <p className="mt-0.5 font-mono text-base sm:text-lg font-bold text-amber-300">
                            {formatIdr(basePricePerGram)} <span className="text-xs font-normal text-stone-400">/ gram</span>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={refresh}
                        disabled={loading}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-stone-300 transition-colors hover:bg-amber-500 hover:text-stone-950 active:scale-95 disabled:opacity-50 cursor-pointer"
                        title="Perbarui harga live"
                        aria-label="Perbarui harga live"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
                
                {/* Left Column: Denomination & Input */}
                <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
                    <div>
                        <label className="mb-3 block text-xs font-bold tracking-wider text-stone-300 uppercase">
                            {t('pages.b2c.calculator.select_weight') || 'Pilih Gramatur Emas (Minted Bars)'}
                        </label>
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
                                                ? 'border-amber-400 bg-gradient-to-b from-amber-500/25 to-amber-600/10 text-white shadow-lg ring-1 ring-amber-400'
                                                : 'border-white/10 bg-white/[0.04] text-stone-300 hover:border-white/20 hover:bg-white/[0.08]'
                                        }`}
                                    >
                                        <span className="text-base font-bold sm:text-lg tracking-tight">
                                            {grams >= 1000 ? `${grams / 1000} kg` : `${grams}g`}
                                        </span>
                                        <span className={`text-[10px] mt-0.5 ${active ? 'text-amber-300 font-medium' : 'text-stone-400'}`}>
                                            {grams >= 1000 ? '1.000 Gram' : `${grams} Gram`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Custom input */}
                    <div>
                        <label className="mb-2 block text-xs font-bold tracking-wider text-stone-300 uppercase">
                            {t('pages.b2c.calculator.custom_weight') || 'Atau Masukkan Gram Kustom:'}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                min="0.1"
                                step="0.5"
                                placeholder="Contoh: 15"
                                value={customGrams}
                                onChange={handleCustomChange}
                                className="h-12 w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 pr-16 text-sm font-medium text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-bold text-amber-400 uppercase">
                                {t('pages.b2c.calculator.gram_unit') || 'Gram'}
                            </div>
                        </div>
                    </div>

                    {/* Official Certification Seal */}
                    <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-stone-900/60 p-3.5 text-xs text-stone-300">
                        <ShieldCheck className="h-5 w-5 shrink-0 text-amber-400" />
                        <div>
                            <p className="font-bold text-white">
                                {t('pages.b2c.calculator.purity_label') || 'Standar Kemurnian Resmi'}
                            </p>
                            <p className="text-[11px] text-stone-400">
                                {t('pages.b2c.calculator.purity_value') || '99.99% Emas Murni (24 Karat) Bersertifikat Resmi'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Receipt-style Investment Summary */}
                <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-stone-900/90 p-6 shadow-xl backdrop-blur-md lg:col-span-5">
                    <div>
                        {/* Summary Header */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <span className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">
                                {t('pages.b2c.calculator.estimated_total') || 'Estimasi Total Pembelian'}
                            </span>
                            <span className="rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-bold text-amber-300">
                                {activeGrams} Gram
                            </span>
                        </div>

                        {/* Price Hero Display with prominent Rp */}
                        <div className="my-5">
                            <p className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-400">
                                {formatIdr(estimatedTotal)}
                            </p>
                            <p className="mt-1 text-xs text-stone-400">
                                {activeGrams} Gram × {formatIdr(basePricePerGram)} / gram
                            </p>
                        </div>

                        {/* Itemized Breakdown List */}
                        <div className="space-y-2.5 rounded-xl bg-white/[0.03] p-3.5 text-xs border border-white/5">
                            <div className="flex justify-between text-stone-400">
                                <span>{t('pages.b2c.calculator.breakdown_rate') || 'Harga Acuan Hari Ini'}</span>
                                <span className="font-mono font-medium text-white">{formatIdr(basePricePerGram)}/g</span>
                            </div>
                            <div className="flex justify-between text-stone-400">
                                <span>{t('pages.b2c.calculator.breakdown_purity') || 'Standar Kemurnian'}</span>
                                <span className="font-medium text-amber-300">24K (99.99% Fine Gold)</span>
                            </div>
                            <div className="flex justify-between text-stone-400">
                                <span>{t('pages.b2c.calculator.breakdown_cert') || 'Sertifikasi & Segel'}</span>
                                <span className="font-medium text-emerald-400">{t('pages.b2c.calculator.breakdown_cert_val') || 'Termasuk (Official Assay)'}</span>
                            </div>
                        </div>

                        {/* Note */}
                        <p className="mt-4 text-[10px] leading-relaxed text-stone-400">
                            {t('pages.b2c.calculator.pricing_note') || '* Harga bersifat indikatif mengikuti update pasar live. Kuotasi final dikunci saat verifikasi administrasi resmi.'}
                        </p>
                    </div>

                    {/* Primary CTA Button */}
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setRfqStatus('idle');
                                setIsRfqModalOpen(true);
                            }}
                            className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 px-6 font-bold text-stone-950 shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                        >
                            <span>{t('pages.b2c.calculator.cta_rfq') || 'Minta Penawaran Resmi (RFQ)'}</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* RFQ Submission Modal with createPortal */}
            {isRfqModalOpen && mounted && createPortal(
                <div 
                    className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsRfqModalOpen(false);
                    }}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-[#0f172a] p-6 sm:p-8 text-white shadow-2xl ring-1 ring-white/10">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setIsRfqModalOpen(false)}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>

                        {rfqStatus === 'success' ? (
                            <div className="py-6 text-center">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                                    <CheckCircle2 className="h-7 w-7" />
                                </div>
                                <h4 className="text-xl font-bold text-white">
                                    {t('pages.b2c.calculator.success_title') || 'Permintaan Kuotasi Terkirim!'}
                                </h4>
                                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                                    {t('pages.b2c.calculator.success_desc') || 'Terima kasih. Tim penjualan Kristalin Ekalestari akan segera mengirimkan konfirmasi kuotasi resmi ke email Anda.'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsRfqModalOpen(false)}
                                    className="mt-6 rounded-xl bg-amber-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-stone-950 hover:bg-amber-400 transition-colors"
                                >
                                    Selesai
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitRfq} className="space-y-4">
                                <div>
                                    <h4 className="text-lg sm:text-xl font-bold text-white">
                                        {t('pages.b2c.calculator.rfq_modal_title') || 'Permintaan Kuotasi Emas Resmi'}
                                    </h4>
                                    <p className="mt-1 text-xs text-stone-400">
                                        {t('pages.b2c.calculator.rfq_modal_desc') || 'Kirim detail estimasi pembelian Anda langsung ke tim penjualan PT Kristalin Ekalestari.'}
                                    </p>
                                </div>

                                {/* Order Summary Pill */}
                                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{t('pages.b2c.calculator.selected_summary') || 'Ringkasan Pilihan:'}</span>
                                        <span className="font-bold text-amber-400">{activeGrams} Gram Emas 24K</span>
                                    </div>
                                    <p className="mt-1 font-mono text-sm font-bold text-white">
                                        Estimasi: {formatIdr(estimatedTotal)}
                                    </p>
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-stone-300">
                                        {t('pages.b2c.calculator.field_name') || 'Nama Lengkap'} <span className="text-amber-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-10 sm:h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                                        placeholder="Nama Anda / Perusahaan"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-stone-300">
                                        {t('pages.b2c.calculator.field_email') || 'Alamat Email'} <span className="text-amber-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="h-10 sm:h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                                        placeholder="email@domain.com"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-stone-300">
                                        {t('pages.b2c.calculator.field_phone') || 'Nomor WhatsApp / Telepon (Opsional)'}
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="h-10 sm:h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                                        placeholder="+62 812..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-xs font-semibold text-stone-300">
                                        {t('pages.b2c.calculator.field_notes') || 'Catatan Tambahan (Opsional)'}
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                                        placeholder="Kebutuhan khusus atau jadwal temu..."
                                    />
                                </div>

                                {rfqStatus === 'error' && (
                                    <p className="text-xs text-red-400">
                                        Gagal mengirim pesan. Silakan coba kembali atau hubungi info@kristalin.co.id.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={rfqStatus === 'submitting'}
                                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-stone-950 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                                >
                                    <Send className="h-4 w-4" />
                                    <span>
                                        {rfqStatus === 'submitting'
                                            ? t('pages.b2c.calculator.sending_btn') || 'Mengirim Kuotasi...'
                                            : t('pages.b2c.calculator.send_btn') || 'Kirim Permintaan Kuotasi'}
                                    </span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

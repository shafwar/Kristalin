import { useTranslation } from '@/hooks/useTranslation';
import { Award, CheckCircle2, ExternalLink, FileCheck, Landmark, MapPin, Shield, ShieldCheck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type EsmdVerificationModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function EsmdVerificationModal({ isOpen, onClose }: EsmdVerificationModalProps) {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div 
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-stone-950/60 p-3 sm:p-6 backdrop-blur-md overflow-hidden"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="relative my-auto flex max-h-[92dvh] sm:max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/90 bg-white text-stone-900 shadow-2xl ring-1 ring-black/5">
                {/* Subtle warm gold accent line at top */}
                <div className="shrink-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 active:scale-95 focus:outline-none cursor-pointer"
                    aria-label="Close modal"
                >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Scrollable Body Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-7">
                    {/* Corporate Official Header */}
                    <div className="flex items-start gap-3 sm:gap-4 border-b border-stone-100 pb-4 sm:pb-5">
                        <div className="flex h-10 w-10 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 shadow-sm">
                            <Shield className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
                        </div>
                        <div className="pr-6 sm:pr-8">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-800 tracking-wide uppercase">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Verified Clean & Clear
                                </span>
                                <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                                    MODI Minerba ESDM RI
                                </span>
                            </div>
                            <h3 className="mt-1 text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-stone-900 leading-snug">
                                {t('pages.esdm_verification.modal_title') || 'Verifikasi Legalitas & Kepatuhan IUP OP'}
                            </h3>
                            <p className="mt-0.5 text-[11px] sm:text-xs text-stone-500 leading-relaxed">
                                {t('pages.esdm_verification.modal_subtitle') || 'Transparansi Izin Usaha Pertambangan Resmi PT Kristalin Ekalestari'}
                            </p>
                        </div>
                    </div>

                    {/* Corporate Credential Sheet (Tabular Architecture) */}
                    <div className="mt-4 divide-y divide-stone-200/70 rounded-xl sm:rounded-2xl border border-stone-200/80 bg-stone-50/70 overflow-hidden shadow-inner">
                        {/* Row 1: Company & Permit Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/70">
                            <div className="p-3 sm:p-4">
                                <div className="flex items-center gap-1.5 text-stone-500">
                                    <Landmark className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" />
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500">
                                        {t('pages.esdm_verification.company_name_label') || 'Nama Perusahaan'}
                                    </span>
                                </div>
                                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-bold text-stone-900">
                                    {t('pages.esdm_verification.company_name_val') || 'PT Kristalin Ekalestari'}
                                </p>
                            </div>
                            <div className="p-3 sm:p-4 bg-amber-50/30">
                                <div className="flex items-center gap-1.5 text-stone-500">
                                    <FileCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" />
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500">
                                        {t('pages.esdm_verification.permit_type_label') || 'Jenis Izin Usaha'}
                                    </span>
                                </div>
                                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-bold text-amber-800">
                                    {t('pages.esdm_verification.permit_type_val') || 'IUP Operasi Produksi (IUP OP)'}
                                </p>
                            </div>
                        </div>

                        {/* Row 2: Decree Number & Validity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/70">
                            <div className="p-3 sm:p-4">
                                <div className="flex items-center gap-1.5 text-stone-500">
                                    <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" />
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500">
                                        {t('pages.esdm_verification.decree_number_label') || 'Nomor Keputusan SK'}
                                    </span>
                                </div>
                                <p className="mt-0.5 sm:mt-1 font-mono text-xs sm:text-sm font-bold text-stone-900">
                                    <span className="rounded border border-amber-300/80 bg-amber-100/70 px-1.5 py-0.5 text-amber-900">
                                        {t('pages.esdm_verification.decree_number_val') || '561/2021/DESDM'}
                                    </span>
                                </p>
                            </div>
                            <div className="p-3 sm:p-4">
                                <div className="flex items-center gap-1.5 text-stone-500">
                                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600" />
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500">
                                        {t('pages.esdm_verification.validity_label') || 'Masa Berlaku Izin'}
                                    </span>
                                </div>
                                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-stone-900">
                                    {t('pages.esdm_verification.validity_val') || '2020 – 2030 (10 Tahun Operasi)'}
                                </p>
                            </div>
                        </div>

                        {/* Row 3: Commodity & Concession Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/70">
                            <div className="p-3 sm:p-4">
                                <div className="flex items-center gap-1.5 text-stone-500">
                                    <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" />
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500">
                                        {t('pages.esdm_verification.commodity_label') || 'Komoditas Tambang'}
                                    </span>
                                </div>
                                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-stone-900">
                                    {t('pages.esdm_verification.commodity_val') || 'Emas Primer (DMP) & Mineral Ikutan'}
                                </p>
                            </div>
                            <div className="p-3 sm:p-4">
                                <div className="flex items-center gap-1.5 text-stone-500">
                                    <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" />
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500">
                                        {t('pages.esdm_verification.location_label') || 'Lokasi & Luas Konsesi'}
                                    </span>
                                </div>
                                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-stone-900">
                                    {t('pages.esdm_verification.location_val') || 'Distrik Topo, Kab. Nabire, Papua (198 Ha)'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer Note */}
                    <p className="mt-3 text-[10px] sm:text-[11px] leading-relaxed text-stone-500">
                        {t('pages.esdm_verification.disclaimer') || 'Seluruh data legalitas di atas dapat diverifikasi langsung melalui database publik Kementerian Energi dan Sumber Daya Mineral (ESDM) Republik Indonesia.'}
                    </p>
                </div>

                {/* Sticky Action Footer */}
                <div className="shrink-0 border-t border-stone-100 bg-stone-50/90 backdrop-blur-sm p-3.5 sm:p-5 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-2.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 sm:h-11 items-center justify-center rounded-xl border border-stone-300 bg-white hover:bg-stone-100 px-4 sm:px-5 text-xs font-semibold text-stone-700 transition-colors active:scale-95 cursor-pointer"
                    >
                        {t('pages.esdm_verification.close_btn') || 'Tutup'}
                    </button>

                    <a
                        href="https://minerbaone.esdm.go.id/publik/badan-usaha/detail/611426748818660096"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 sm:px-6 text-xs font-bold text-stone-950 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                        <span>{t('pages.esdm_verification.verify_portal_btn') || 'Buka Portal Resmi MODI ESDM RI'}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

type EsmdVerificationBadgeProps = {
    className?: string;
    variant?: 'pill' | 'compact' | 'tag';
    theme?: 'light' | 'dark';
};

export function EsmdVerificationBadge({ className = '', variant = 'pill', theme = 'light' }: EsmdVerificationBadgeProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    if (variant === 'compact') {
        const isDark = theme === 'dark';
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`group inline-flex items-center gap-2 rounded-full border px-3 sm:px-3.5 py-1 text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                        isDark
                            ? 'border-amber-400/40 bg-white/10 hover:bg-white/15 text-amber-300 backdrop-blur-md hover:border-amber-300 shadow-sm'
                            : 'border-amber-400/50 bg-amber-50/90 hover:bg-amber-100 text-stone-900 hover:border-amber-500 shadow-sm'
                    } ${className}`}
                >
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full ${isDark ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-500/20 text-amber-800'}`}>
                        <Shield className="h-2.5 w-2.5" strokeWidth={2.5} />
                    </span>
                    <span className="tracking-wide">IUP OP No. 561/2021/DESDM</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
                <EsmdVerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
        );
    }

    if (variant === 'tag') {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-600 transition-colors cursor-pointer ${className}`}
                >
                    <Shield className="h-3.5 w-3.5 text-amber-700" />
                    <span className="underline underline-offset-2">Verified MODI ESDM</span>
                </button>
                <EsmdVerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
        );
    }

    // Default 'pill' variant
    const isDark = theme === 'dark';
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`group inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${
                    isDark
                        ? 'border-amber-400/40 bg-white/10 hover:bg-white/15 text-stone-100 backdrop-blur-md hover:border-amber-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'border-amber-400/50 bg-amber-50/90 hover:bg-amber-100 text-stone-900 hover:border-amber-500 shadow-sm hover:shadow-md'
                } ${className}`}
            >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                    isDark
                        ? 'bg-amber-400/20 text-amber-300 group-hover:bg-amber-400 group-hover:text-stone-950'
                        : 'bg-amber-500/20 text-amber-800 group-hover:bg-amber-500 group-hover:text-white'
                }`}>
                    <Shield className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="tracking-wide">
                    {t('pages.esdm_verification.badge_label') || 'Kepatuhan Resmi ESDM'} · <span className={`font-mono font-bold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>561/2021/DESDM</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
            <EsmdVerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

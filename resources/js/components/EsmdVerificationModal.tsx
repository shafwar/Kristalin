import { useTranslation } from '@/hooks/useTranslation';
import { Award, CheckCircle, ExternalLink, FileCheck, Landmark, MapPin, Shield, X } from 'lucide-react';
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
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/40 bg-[#0f172a] p-6 sm:p-8 text-white shadow-2xl ring-1 ring-white/10">
                {/* Subtle Brand Ambient Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-[60px]" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-600/10 blur-[60px]" />

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-300 transition-all hover:bg-white/20 hover:text-white active:scale-95 focus:outline-none"
                    aria-label="Close modal"
                >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Header with Verified Badge */}
                <div className="relative z-10 flex items-start gap-3 sm:gap-4 border-b border-white/10 pb-5 sm:pb-6">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 shadow-md">
                        <Shield className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
                    </div>
                    <div className="pr-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Verified Clean & Clear
                            </span>
                            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                                MODI ESDM RI
                            </span>
                        </div>
                        <h3 className="mt-1.5 text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
                            {t('pages.esdm_verification.modal_title') || 'Verifikasi Legalitas & Kepatuhan IUP OP'}
                        </h3>
                        <p className="mt-1 text-xs text-stone-300/90 leading-relaxed">
                            {t('pages.esdm_verification.modal_subtitle') || 'Transparansi Izin Usaha Pertambangan Resmi PT Kristalin Ekalestari'}
                        </p>
                    </div>
                </div>

                {/* Certificate Grid Details */}
                <div className="relative z-10 mt-5 sm:mt-6 grid grid-cols-1 gap-2.5 sm:gap-3.5 sm:grid-cols-2">
                    {/* Company Name */}
                    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 text-stone-400">
                            <Landmark className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.company_name_label') || 'Nama Perusahaan'}
                            </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-bold text-white">
                            {t('pages.esdm_verification.company_name_val') || 'PT Kristalin Ekalestari'}
                        </p>
                    </div>

                    {/* Permit Type */}
                    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 text-stone-400">
                            <FileCheck className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.permit_type_label') || 'Jenis Izin Usaha'}
                            </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-bold text-amber-300">
                            {t('pages.esdm_verification.permit_type_val') || 'IUP Operasi Produksi (IUP OP)'}
                        </p>
                    </div>

                    {/* Decree Number */}
                    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 text-stone-400">
                            <Award className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.decree_number_label') || 'Nomor Keputusan SK'}
                            </span>
                        </div>
                        <p className="mt-1 font-mono text-xs sm:text-sm font-bold text-white">
                            {t('pages.esdm_verification.decree_number_val') || '561/2021/DESDM'}
                        </p>
                    </div>

                    {/* Validity Period */}
                    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 text-stone-400">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.validity_label') || 'Masa Berlaku Izin'}
                            </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-bold text-white">
                            {t('pages.esdm_verification.validity_val') || '2020 – 2030 (10 Tahun Operasi)'}
                        </p>
                    </div>

                    {/* Commodity */}
                    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 text-stone-400">
                            <Shield className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.commodity_label') || 'Komoditas Tambang'}
                            </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-bold text-white">
                            {t('pages.esdm_verification.commodity_val') || 'Emas Primer (DMP) & Mineral Ikutan'}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5 text-stone-400">
                            <MapPin className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.location_label') || 'Lokasi & Luas Wilayah'}
                            </span>
                        </div>
                        <p className="mt-1 text-[11px] sm:text-xs font-semibold text-white">
                            {t('pages.esdm_verification.location_val') || 'Distrik Topo, Kab. Nabire, Papua (198 Ha)'}
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="relative z-10 mt-4 text-[10px] sm:text-[11px] leading-relaxed text-stone-400">
                    {t('pages.esdm_verification.disclaimer') || 'Seluruh data legalitas di atas dapat diverifikasi langsung melalui database publik Kementerian Energi dan Sumber Daya Mineral (ESDM) Republik Indonesia.'}
                </p>

                {/* Action Buttons */}
                <div className="relative z-10 mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-semibold text-stone-300 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
                    >
                        {t('pages.esdm_verification.close_btn') || 'Tutup'}
                    </button>

                    <a
                        href="https://minerbaone.esdm.go.id/publik/badan-usaha/detail/611426748818660096"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 px-5 text-xs font-bold text-stone-950 shadow-md transition-all active:scale-95"
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
                    className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                        isDark
                            ? 'border-amber-400/35 bg-white/10 hover:bg-white/15 text-amber-300 backdrop-blur-md hover:border-amber-300 shadow-sm'
                            : 'border-amber-500/30 bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 hover:border-amber-400 shadow-sm'
                    } ${className}`}
                >
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full ${isDark ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-500/20 text-amber-700'}`}>
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
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-600 transition-colors cursor-pointer ${className}`}
                >
                    <Shield className="h-3.5 w-3.5" />
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
                        : 'border-amber-500/30 bg-amber-50/80 hover:bg-amber-100 text-stone-800 hover:border-amber-400 shadow-sm hover:shadow-md'
                } ${className}`}
            >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                    isDark
                        ? 'bg-amber-400/20 text-amber-300 group-hover:bg-amber-400 group-hover:text-stone-950'
                        : 'bg-amber-500/20 text-amber-700 group-hover:bg-amber-500 group-hover:text-white'
                }`}>
                    <Shield className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="tracking-wide">
                    {t('pages.esdm_verification.badge_label') || 'Kepatuhan Resmi ESDM'} · <span className={`font-mono font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>561/2021/DESDM</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
            <EsmdVerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}


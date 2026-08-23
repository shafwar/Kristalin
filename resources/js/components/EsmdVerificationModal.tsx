import { useTranslation } from '@/hooks/useTranslation';
import { Award, CheckCircle, ExternalLink, FileCheck, Landmark, MapPin, Shield, X } from 'lucide-react';
import React, { useState } from 'react';

type EsmdVerificationModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function EsmdVerificationModal({ isOpen, onClose }: EsmdVerificationModalProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#0e1b2f] via-[#091322] to-[#050b14] p-6 text-white shadow-2xl sm:p-8">
                {/* Glow backdrop */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/15 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" />

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-300 transition-colors hover:bg-white/20 hover:text-white active:scale-95"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Modal Header */}
                <div className="relative z-10 flex items-start gap-4 border-b border-white/10 pb-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Shield className="h-6 w-6" strokeWidth={2.2} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                                Verified Clean & Clear
                            </span>
                        </div>
                        <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                            {t('pages.esdm_verification.modal_title') || 'Verifikasi Legalitas & Kepatuhan IUP OP'}
                        </h3>
                        <p className="mt-0.5 text-xs text-stone-400">
                            {t('pages.esdm_verification.modal_subtitle') || 'Transparansi Izin Usaha Pertambangan Resmi PT Kristalin Ekalestari'}
                        </p>
                    </div>
                </div>

                {/* Certificate Grid Details */}
                <div className="relative z-10 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Company Name */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-stone-400">
                            <Landmark className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.company_name_label') || 'Nama Perusahaan'}
                            </span>
                        </div>
                        <p className="mt-1 text-sm font-bold text-white">
                            {t('pages.esdm_verification.company_name_val') || 'PT Kristalin Ekalestari'}
                        </p>
                    </div>

                    {/* Permit Type */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-stone-400">
                            <FileCheck className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.permit_type_label') || 'Jenis Izin Usaha'}
                            </span>
                        </div>
                        <p className="mt-1 text-sm font-bold text-amber-300">
                            {t('pages.esdm_verification.permit_type_val') || 'IUP Operasi Produksi (IUP OP)'}
                        </p>
                    </div>

                    {/* Decree Number */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-stone-400">
                            <Award className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.decree_number_label') || 'Nomor Keputusan SK'}
                            </span>
                        </div>
                        <p className="mt-1 font-mono text-sm font-bold text-white">
                            {t('pages.esdm_verification.decree_number_val') || '561/2021/DESDM'}
                        </p>
                    </div>

                    {/* Validity Period */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-stone-400">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.validity_label') || 'Masa Berlaku Izin'}
                            </span>
                        </div>
                        <p className="mt-1 text-sm font-bold text-white">
                            {t('pages.esdm_verification.validity_val') || '2020 – 2030 (10 Tahun Operasi)'}
                        </p>
                    </div>

                    {/* Commodity */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-stone-400">
                            <Shield className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.commodity_label') || 'Komoditas Tambang'}
                            </span>
                        </div>
                        <p className="mt-1 text-sm font-bold text-white">
                            {t('pages.esdm_verification.commodity_val') || 'Emas Primer (DMP) & Mineral Ikutan'}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-stone-400">
                            <MapPin className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">
                                {t('pages.esdm_verification.location_label') || 'Lokasi & Luas Wilayah'}
                            </span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-white">
                            {t('pages.esdm_verification.location_val') || 'Distrik Topo, Kab. Nabire, Papua (198 Ha)'}
                        </p>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="relative z-10 mt-4 text-[11px] leading-relaxed text-stone-400">
                    {t('pages.esdm_verification.disclaimer') || 'Seluruh data legalitas di atas dapat diverifikasi langsung melalui database publik Kementerian Energi dan Sumber Daya Mineral (ESDM) Republik Indonesia.'}
                </p>

                {/* Action Buttons */}
                <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <a
                        href="https://modi.esdm.go.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-5 text-xs font-bold text-stone-900 shadow-lg transition-all hover:from-amber-300 hover:to-yellow-400 active:scale-95"
                    >
                        <span>{t('pages.esdm_verification.verify_portal_btn') || 'Buka Portal Resmi MODI ESDM RI'}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-semibold text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        {t('pages.esdm_verification.close_btn') || 'Tutup Verifikasi'}
                    </button>
                </div>
            </div>
        </div>
    );
}

type EsmdVerificationBadgeProps = {
    className?: string;
    variant?: 'pill' | 'banner' | 'compact';
};

export function EsmdVerificationBadge({ className = '', variant = 'pill' }: EsmdVerificationBadgeProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    if (variant === 'banner') {
        return (
            <>
                <div
                    onClick={() => setIsOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true); }}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#0d1c31] via-[#091524] to-[#060e18] p-4 text-white shadow-md transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] ${className}`}
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                                <Shield className="h-5 w-5" strokeWidth={2.2} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white group-hover:text-amber-300">
                                        {t('pages.esdm_verification.badge_label') || 'Kepatuhan Resmi ESDM'}
                                    </span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                </div>
                                <p className="text-[11px] text-stone-400">
                                    {t('pages.esdm_verification.badge_sub') || 'IUP OP No. 561/2021/DESDM · 198 Ha Nabire, Papua'}
                                </p>
                            </div>
                        </div>
                        <span className="hidden text-xs font-semibold text-amber-400 underline underline-offset-2 sm:inline-block">
                            {t('pages.esdm_verification.badge_tooltip') || 'Verifikasi Legalitas →'}
                        </span>
                    </div>
                </div>
                <EsmdVerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
        );
    }

    if (variant === 'compact') {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-stone-900/80 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-md transition-all hover:border-amber-400 hover:bg-stone-900 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)] ${className}`}
                >
                    <Shield className="h-3.5 w-3.5 text-amber-400" />
                    <span>IUP OP No. 561/2021/DESDM</span>
                </button>
                <EsmdVerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
        );
    }

    // Default 'pill' variant
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`group inline-flex items-center gap-2.5 rounded-full border border-amber-500/40 bg-stone-950/80 px-4 py-1.5 text-xs font-semibold text-stone-200 shadow-md backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-stone-900 hover:text-white hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95 ${className}`}
            >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                    <Shield className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="tracking-wide">
                    {t('pages.esdm_verification.badge_label') || 'Kepatuhan Resmi ESDM'} · <span className="font-mono text-amber-300">561/2021/DESDM</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </button>
            <EsmdVerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

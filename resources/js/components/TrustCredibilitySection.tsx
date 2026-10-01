import { useTranslation } from '@/hooks/useTranslation';
import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Award,
    Building2,
    Coins,
    FileCheck2,
    FileText,
    HeartHandshake,
    PhoneCall,
    Scale,
    ShieldAlert,
    ShieldCheck,
    TrendingUp,
    Users,
} from 'lucide-react';

/**
 * Trust & Credibility Section
 *
 * Catatan Arsitektur & Kepatuhan:
 * - Seluruh slot metrik di bawah ini menggunakan placeholder terstandar.
 * - Sesuai aturan: Jangan menampilkan data angka/klaim karangan sebelum ada konfirmasi resmi dari dokumen klien.
 * - Flag SHOW_DATA_SLOTS_IN_PRODUCTION disetel false secara default agar placeholder tidak tampil di production.
 */
// TODO: [VERIFIKASI DOKUMEN KLIEN] Konfirmasi dokumen legalitas (IUP OP), sertifikasi ISO/K3, dan realisasi program CSR ke pemilik bisnis sebelum mengaktifkan flag ini ke true.
const SHOW_DATA_SLOTS_IN_PRODUCTION = false;

export function TrustCredibilitySection() {
    const { t } = useTranslation();

    return (
        <section
            id="trust-credibility"
            aria-labelledby="trust-credibility-heading"
            className="relative border-t border-stone-200/80 bg-gradient-to-b from-stone-50/70 via-white to-amber-50/20 py-12 sm:py-16 lg:py-20"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header & Section Title */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest text-amber-900 uppercase">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                        <span>{t('pages.welcome.trust_credibility.badge')}</span>
                    </div>
                    <h2
                        id="trust-credibility-heading"
                        className="mt-3 text-2xl font-light tracking-tight text-stone-900 sm:text-3xl lg:text-4xl"
                    >
                        {t('pages.welcome.trust_credibility.title')}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                        {t('pages.welcome.trust_credibility.subtitle')}
                    </p>
                </div>

                {/* Data Slots (Guarded by SHOW_DATA_SLOTS_IN_PRODUCTION flag) */}
                {SHOW_DATA_SLOTS_IN_PRODUCTION ? (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Slot 1: Key Metrics */}
                        {/* TODO: Konfirmasi angka produksi, luas konsesi, dan jumlah tenaga kerja */}
                        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-stone-900">
                                    {t('pages.welcome.trust_credibility.metrics.production.label')}
                                </h3>
                            </div>
                            <div className="mt-4 space-y-3 text-sm">
                                <div className="rounded-lg bg-stone-50 p-2.5">
                                    <span className="text-xs text-stone-500">
                                        {t('pages.welcome.trust_credibility.metrics.production.label')}:
                                    </span>
                                    <p className="font-mono text-xs font-medium text-amber-900">
                                        {t('pages.welcome.trust_credibility.metrics.production.placeholder')}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-stone-50 p-2.5">
                                    <span className="text-xs text-stone-500">
                                        {t('pages.welcome.trust_credibility.metrics.concession_area.label')}:
                                    </span>
                                    <p className="font-mono text-xs font-medium text-amber-900">
                                        {t('pages.welcome.trust_credibility.metrics.concession_area.placeholder')}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-stone-50 p-2.5">
                                    <span className="text-xs text-stone-500">
                                        {t('pages.welcome.trust_credibility.metrics.workforce.label')}:
                                    </span>
                                    <p className="font-mono text-xs font-medium text-amber-900">
                                        {t('pages.welcome.trust_credibility.metrics.workforce.placeholder')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slot 2: Legal & Permits */}
                        {/* TODO: Konfirmasi nomor SK IUP OP resmi dan masa berlakunya */}
                        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                                    <Scale className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-stone-900">
                                    {t('pages.welcome.trust_credibility.legality.title')}
                                </h3>
                            </div>
                            <div className="mt-4 space-y-3 text-sm">
                                <div className="rounded-lg bg-stone-50 p-2.5">
                                    <span className="text-xs text-stone-500">
                                        {t('pages.welcome.trust_credibility.legality.iup_number.label')}:
                                    </span>
                                    <p className="font-mono text-xs font-medium text-amber-900">
                                        {t('pages.welcome.trust_credibility.legality.iup_number.placeholder')}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-stone-50 p-2.5">
                                    <span className="text-xs text-stone-500">
                                        {t('pages.welcome.trust_credibility.legality.validity_period.label')}:
                                    </span>
                                    <p className="font-mono text-xs font-medium text-amber-900">
                                        {t('pages.welcome.trust_credibility.legality.validity_period.placeholder')}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-stone-50 p-2.5">
                                    <span className="text-xs text-stone-500">
                                        {t('pages.welcome.trust_credibility.legality.authority.label')}:
                                    </span>
                                    <p className="font-mono text-xs font-medium text-amber-900">
                                        {t('pages.welcome.trust_credibility.legality.authority.placeholder')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slot 3: Certifications */}
                        {/* TODO: Konfirmasi sertifikasi ISO (ISO 9001, 14001, 45001) / K3 / PROPER */}
                        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                                    <Award className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-stone-900">
                                    {t('pages.welcome.trust_credibility.certifications.title')}
                                </h3>
                            </div>
                            <div className="mt-4 rounded-lg bg-stone-50 p-3">
                                <p className="font-mono text-xs font-medium text-amber-900">
                                    {t('pages.welcome.trust_credibility.certifications.placeholder')}
                                </p>
                            </div>
                        </div>

                        {/* Slot 4: CSR Impact */}
                        {/* TODO: Konfirmasi angka realisasi dana CSR dan jumlah penerima manfaat */}
                        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                                    <HeartHandshake className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-stone-900">
                                    {t('pages.welcome.trust_credibility.csr_impact.title')}
                                </h3>
                            </div>
                            <div className="mt-4 rounded-lg bg-stone-50 p-3">
                                <p className="font-mono text-xs font-medium text-amber-900">
                                    {t('pages.welcome.trust_credibility.csr_impact.placeholder')}
                                </p>
                            </div>
                        </div>

                        {/* Slot 5: Sustainability Report */}
                        {/* TODO: Konfirmasi tautan unduhan dokumen PDF Laporan Keberlanjutan */}
                        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-stone-900">
                                    {t('pages.welcome.trust_credibility.reports.title')}
                                </h3>
                            </div>
                            <div className="mt-4 rounded-lg bg-stone-50 p-3">
                                <p className="font-mono text-xs font-medium text-amber-900">
                                    {t('pages.welcome.trust_credibility.reports.placeholder')}
                                </p>
                            </div>
                        </div>

                        {/* Slot 6: Customary & Community Partners */}
                        {/* TODO: Konfirmasi nama lembaga adat / lembaga masyarakat adat resmi yang bermitra */}
                        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                                    <Users className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-stone-900">
                                    {t('pages.welcome.trust_credibility.partners.title')}
                                </h3>
                            </div>
                            <div className="mt-4 rounded-lg bg-stone-50 p-3">
                                <p className="font-mono text-xs font-medium text-amber-900">
                                    {t('pages.welcome.trust_credibility.partners.placeholder')}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Primary Official CTAs to Existing Live Routes */}
                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {/* CTA 1: Investor Relations */}
                    <Link
                        href="/investor"
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-6 no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-800 transition-colors group-hover:bg-amber-500 group-hover:text-stone-900">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-600" />
                        </div>
                        <div className="mt-5">
                            <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
                                {t('pages.welcome.trust_credibility.cta.investor_tag')}
                            </p>
                            <h3 className="mt-1 text-base font-semibold text-stone-900">
                                {t('pages.welcome.trust_credibility.cta.investor')}
                            </h3>
                            <p className="mt-1 text-xs leading-relaxed text-stone-500">
                                {t('pages.welcome.trust_credibility.cta.investor_desc')}
                            </p>
                        </div>
                    </Link>

                    {/* CTA 2: Contact & Headquarters */}
                    <Link
                        href="/contact"
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-6 no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-800 transition-colors group-hover:bg-amber-500 group-hover:text-stone-900">
                                <PhoneCall className="h-5 w-5" />
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-600" />
                        </div>
                        <div className="mt-5">
                            <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
                                {t('pages.welcome.trust_credibility.cta.contact_tag')}
                            </p>
                            <h3 className="mt-1 text-base font-semibold text-stone-900">
                                {t('pages.welcome.trust_credibility.cta.contact')}
                            </h3>
                            <p className="mt-1 text-xs leading-relaxed text-stone-500">
                                {t('pages.welcome.trust_credibility.cta.contact_desc')}
                            </p>
                        </div>
                    </Link>

                    {/* CTA 3: Physical Gold Products (Kisara Gold / ATRINA) */}
                    <Link
                        href="/b2c"
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-500/10 via-white to-amber-50/50 p-6 no-underline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/15"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-stone-950 shadow-md">
                                <Coins className="h-5 w-5" />
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-amber-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-900" />
                        </div>
                        <div className="mt-5">
                            <p className="text-xs font-semibold tracking-wider text-amber-800 uppercase">
                                {t('pages.welcome.trust_credibility.cta.kisara_tag')}
                            </p>
                            <h3 className="mt-1 text-base font-semibold text-stone-900">
                                {t('pages.welcome.trust_credibility.cta.kisara')}
                            </h3>
                            <p className="mt-1 text-xs leading-relaxed text-stone-500">
                                {t('pages.welcome.trust_credibility.cta.kisara_desc')}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

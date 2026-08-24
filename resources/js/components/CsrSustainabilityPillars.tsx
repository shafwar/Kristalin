import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, 
    GraduationCap, 
    Home, 
    ShieldCheck, 
    Sparkles, 
    Trees, 
    Utensils 
} from 'lucide-react';
import React from 'react';

interface PillarData {
    id: string;
    pillarNo: string;
    title: string;
    tag: string;
    description: string;
    tags: string[];
    icon: React.ReactNode;
    accentColor: string;
    badgeBg: string;
    iconBg: string;
    borderHover: string;
}

export default function CsrSustainabilityPillars() {
    const { t } = useTranslation();

    const getTags = (itemKey: string, fallbackTags: string[]): string[] => {
        const raw = t(`pages.csr.pillars.items.${itemKey}.tags`);
        if (Array.isArray(raw) && raw.length > 0) {
            return raw;
        }
        return fallbackTags;
    };

    const pillars: PillarData[] = [
        {
            id: 'food_security',
            pillarNo: t('pages.csr.pillars.items.food_security.pillar_no') || 'Pilar 01',
            title: t('pages.csr.pillars.items.food_security.title') || 'Bantuan Pangan & Sembako',
            tag: t('pages.csr.pillars.items.food_security.tag') || 'Kebutuhan Pokok Warga',
            description: t('pages.csr.pillars.items.food_security.description') || 'Penyaluran sembako secara rutin untuk warga adat, lansia, dan keluarga di sekitar area operasional tambang guna memenuhi kebutuhan pangan harian.',
            tags: getTags('food_security', ['Paket Sembako Bergizi', 'Warga Adat & Lansia', 'Kebutuhan Pokok Harian']),
            icon: <Utensils className="h-6 w-6 text-amber-700" />,
            accentColor: 'from-amber-400 via-yellow-500 to-amber-600',
            badgeBg: 'bg-amber-100/90 text-amber-950 border-amber-300/80',
            iconBg: 'bg-amber-50 border-amber-200/80',
            borderHover: 'hover:border-amber-400/80',
        },
        {
            id: 'infrastructure',
            pillarNo: t('pages.csr.pillars.items.infrastructure.pillar_no') || 'Pilar 02',
            title: t('pages.csr.pillars.items.infrastructure.title') || 'Hunian & Air Bersih',
            tag: t('pages.csr.pillars.items.infrastructure.tag') || 'Fasilitas Desa Nifasi',
            description: t('pages.csr.pillars.items.infrastructure.description') || 'Pembangunan rumah layak huni bagi keluarga warga Nifasi, pembangunan jaringan pipa air bersih ke pemukiman, dan pemeliharaan jalan desa.',
            tags: getTags('infrastructure', ['Bedah Rumah Warga', 'Akses Pipa Air Bersih', 'Fasilitas Pemukiman']),
            icon: <Home className="h-6 w-6 text-blue-700" />,
            accentColor: 'from-blue-400 via-indigo-500 to-blue-600',
            badgeBg: 'bg-blue-100/90 text-blue-950 border-blue-300/80',
            iconBg: 'bg-blue-50 border-blue-200/80',
            borderHover: 'hover:border-blue-400/80',
        },
        {
            id: 'education_health',
            pillarNo: t('pages.csr.pillars.items.education_health.pillar_no') || 'Pilar 03',
            title: t('pages.csr.pillars.items.education_health.title') || 'Pendidikan & Kesehatan',
            tag: t('pages.csr.pillars.items.education_health.tag') || 'Generasi Muda & Medis',
            description: t('pages.csr.pillars.items.education_health.description') || 'Dukungan beasiswa bagi putra-putri berprestasi di Nabire, penyediaan buku dan alat sekolah, serta bantuan layanan kesehatan warga.',
            tags: getTags('education_health', ['Beasiswa Pelajar', 'Perlengkapan Belajar', 'Layanan Posyandu & Medis']),
            icon: <GraduationCap className="h-6 w-6 text-emerald-700" />,
            accentColor: 'from-emerald-400 via-teal-500 to-emerald-600',
            badgeBg: 'bg-emerald-100/90 text-emerald-950 border-emerald-300/80',
            iconBg: 'bg-emerald-50 border-emerald-200/80',
            borderHover: 'hover:border-emerald-400/80',
        },
        {
            id: 'reclamation',
            pillarNo: t('pages.csr.pillars.items.reclamation.pillar_no') || 'Pilar 04',
            title: t('pages.csr.pillars.items.reclamation.title') || 'Pemulihan Alam & Lingkungan',
            tag: t('pages.csr.pillars.items.reclamation.tag') || 'Penghijauan Hutan Papua',
            description: t('pages.csr.pillars.items.reclamation.description') || 'Penataan tanah dan aliran air pasca-tambang, serta penanaman kembali pohon-pohon asli Papua untuk menjaga hutan tetap hijau dan asri.',
            tags: getTags('reclamation', ['Penanaman Pohon Asli', 'Penjagaan Sumber Air', 'Kelestarian Hutan Papua']),
            icon: <Trees className="h-6 w-6 text-green-700" />,
            accentColor: 'from-green-500 via-emerald-600 to-green-700',
            badgeBg: 'bg-green-100/90 text-green-950 border-green-300/80',
            iconBg: 'bg-green-50 border-green-200/80',
            borderHover: 'hover:border-green-400/80',
        },
    ];

    return (
        <section className="relative z-10 bg-gradient-to-b from-stone-50/90 via-white to-stone-50/90 py-16 sm:py-24 border-y border-stone-200/70">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div
                    className="mx-auto max-w-3xl text-center"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-4 py-1.5 shadow-2xs">
                        <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                        <span className="text-[11px] font-bold tracking-wider text-amber-950 uppercase">
                            {t('pages.csr.pillars.kicker') || 'Tanggung Jawab Sosial & Lingkungan (TJSL)'}
                        </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                        <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                            {t('pages.csr.pillars.title_line1') || '4 Pilar Program Sosial &'}
                        </span>{' '}
                        <span className="text-stone-900">
                            {t('pages.csr.pillars.title_line2') || 'Pemberdayaan Masyarakat'}
                        </span>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base md:text-lg max-w-2xl mx-auto">
                        {t('pages.csr.pillars.description') || 'Komitmen nyata PT Kristalin Ekalestari dalam mendampingi masyarakat adat di lingkar tambang Nabire, membangun kemandirian warga, dan menjaga kelestarian alam Papua.'}
                    </p>
                </motion.div>

                {/* 4 Pillars Spacious 2x2 Grid (Natural proportions on desktop & mobile, no squishing) */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/90 bg-gradient-to-b from-white via-white to-stone-50/50 p-6 sm:p-7 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${pillar.borderHover}`}
                        >
                            {/* Top Color Accent Line */}
                            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${pillar.accentColor}`} />

                            <div>
                                {/* Header: Badge, Subtitle & Icon */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1.5">
                                        <span className={`inline-block rounded-full border px-3 py-0.5 text-[11px] font-bold tracking-wider uppercase shadow-2xs ${pillar.badgeBg}`}>
                                            {pillar.pillarNo}
                                        </span>
                                        <div className="text-xs font-bold text-amber-800 tracking-wider uppercase">
                                            {pillar.tag}
                                        </div>
                                    </div>
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-2xs transition-transform duration-300 group-hover:scale-110 ${pillar.iconBg}`}>
                                        {pillar.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                                    {pillar.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-stone-600">
                                    {pillar.description}
                                </p>
                            </div>

                            {/* Key Highlights Tags with subtle icons */}
                            <div className="mt-6 border-t border-stone-100 pt-4">
                                <div className="flex flex-wrap gap-2">
                                    {pillar.tags.map((tag, tagIdx) => (
                                        <span
                                            key={tagIdx}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100/90 border border-stone-200/60 px-3 py-1.5 text-xs font-medium text-stone-700"
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                            <span>{tag}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Corporate ESG Assurance Footer Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                    className="mt-10 sm:mt-12 max-w-6xl mx-auto rounded-2xl sm:rounded-3xl border border-amber-200/90 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/60 p-6 sm:p-7 text-stone-800 shadow-2xs"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-base sm:text-lg font-bold text-stone-900">
                                {t('pages.csr.pillars.assurance_title') || 'Tumbuh Bersama Masyarakat Adat Papua'}
                            </h4>
                            <p className="mt-1 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl">
                                {t('pages.csr.pillars.assurance_desc') || 'Seluruh kegiatan sosial dan operasional tambang dijalankan melalui musyawarah adat yang terbuka, taat aturan lingkungan hidup, dan mengutamakan hubungan baik yang saling menghormati.'}
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

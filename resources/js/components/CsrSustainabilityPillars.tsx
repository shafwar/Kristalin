import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { 
    GraduationCap, 
    HeartHandshake, 
    Home, 
    Leaf, 
    ShieldCheck, 
    Sparkles, 
    Sprout, 
    Trees, 
    Utensils, 
    Wheat 
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
    borderHover: string;
}

export default function CsrSustainabilityPillars() {
    const { t } = useTranslation();

    const getTags = (itemKey: string, fallbackTag: string): string[] => {
        const raw = t(`pages.csr.pillars.items.${itemKey}.tags`);
        if (Array.isArray(raw) && raw.length > 0) {
            return raw;
        }
        return [fallbackTag];
    };

    const pillars: PillarData[] = [
        {
            id: 'food_security',
            pillarNo: t('pages.csr.pillars.items.food_security.pillar_no') || 'Pilar 01',
            title: t('pages.csr.pillars.items.food_security.title') || 'Pilar Ketahanan Pangan',
            tag: t('pages.csr.pillars.items.food_security.tag') || 'Distribusi Sembako Berkala',
            description: t('pages.csr.pillars.items.food_security.description') || 'Program penyaluran paket sembako bergizi secara rutin kepada keluarga masyarakat adat, janda lansia, dan pemuka adat di sekitar area operasional pertambangan untuk memastikan kecukupan gizi harian.',
            tags: getTags('food_security', 'Penyaluran Sembako Rutin'),
            icon: <Wheat className="h-6 w-6 text-amber-700" />,
            accentColor: 'from-amber-400 via-yellow-500 to-amber-600',
            badgeBg: 'bg-amber-100/90 text-amber-900 border-amber-300/80',
            borderHover: 'hover:border-amber-400',
        },
        {
            id: 'infrastructure',
            pillarNo: t('pages.csr.pillars.items.infrastructure.pillar_no') || 'Pilar 02',
            title: t('pages.csr.pillars.items.infrastructure.title') || 'Pilar Infrastruktur & Hunian',
            tag: t('pages.csr.pillars.items.infrastructure.tag') || 'Pemukiman & Fasilitas Air Bersih',
            description: t('pages.csr.pillars.items.infrastructure.description') || 'Bantuan pembangunan unit rumah layak huni bagi warga adat Kampung Nifasi, pembangunan jaringan perpipaan air bersih pedesaan, serta pemeliharaan sarana jalan pemukiman.',
            tags: getTags('infrastructure', 'Rumah Layak Huni'),
            icon: <Home className="h-6 w-6 text-blue-700" />,
            accentColor: 'from-blue-400 via-indigo-500 to-blue-600',
            badgeBg: 'bg-blue-100/90 text-blue-900 border-blue-300/80',
            borderHover: 'hover:border-blue-400',
        },
        {
            id: 'education_health',
            pillarNo: t('pages.csr.pillars.items.education_health.pillar_no') || 'Pilar 03',
            title: t('pages.csr.pillars.items.education_health.title') || 'Pilar Pendidikan & Kesehatan',
            tag: t('pages.csr.pillars.items.education_health.tag') || 'Dukungan Belajar & Sarana Medis',
            description: t('pages.csr.pillars.items.education_health.description') || 'Penyediaan perlengkapan sekolah, beasiswa pendidikan bagi putra-putri berprestasi Nabire hingga jenjang lanjutan, dan dukungan fasilitas operasional pos pelayanan kesehatan masyarakat.',
            tags: getTags('education_health', 'Beasiswa Siswa Berprestasi'),
            icon: <GraduationCap className="h-6 w-6 text-emerald-700" />,
            accentColor: 'from-emerald-400 via-teal-500 to-emerald-600',
            badgeBg: 'bg-emerald-100/90 text-emerald-900 border-emerald-300/80',
            borderHover: 'hover:border-emerald-400',
        },
        {
            id: 'reclamation',
            pillarNo: t('pages.csr.pillars.items.reclamation.pillar_no') || 'Pilar 04',
            title: t('pages.csr.pillars.items.reclamation.title') || 'Pilar Reklamasi Progresif',
            tag: t('pages.csr.pillars.items.reclamation.tag') || 'Konservasi & Revegetasi Lahan',
            description: t('pages.csr.pillars.items.reclamation.description') || 'Komitmen penataan kembali kontur tanah pasca-tambang, pengelolaan sedimen dan kualitas air, serta penanaman vegetasi endemik untuk memulihkan keanekaragaman hayati ekosistem Papua.',
            tags: getTags('reclamation', 'Revegetasi Bertahap'),
            icon: <Trees className="h-6 w-6 text-green-700" />,
            accentColor: 'from-green-500 via-emerald-600 to-green-700',
            badgeBg: 'bg-green-100/90 text-green-900 border-green-300/80',
            borderHover: 'hover:border-green-400',
        },
    ];

    return (
        <section className="relative z-10 bg-gradient-to-b from-stone-50 via-white to-stone-50 py-16 sm:py-24 border-y border-stone-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <motion.div
                    className="mx-auto max-w-3xl text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50 px-4 py-1.5 shadow-xs">
                        <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                        <span className="text-[11px] font-bold tracking-wider text-amber-900 uppercase">
                            {t('pages.csr.pillars.kicker') || 'Framework Tanggung Jawab Sosial & Lingkungan (TJSL)'}
                        </span>
                    </div>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                        <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                            {t('pages.csr.pillars.title_line1') || '4 Pilar Keberlanjutan &'}
                        </span>{' '}
                        <span className="text-stone-900">
                            {t('pages.csr.pillars.title_line2') || 'Pemberdayaan Masyarakat'}
                        </span>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base md:text-lg">
                        {t('pages.csr.pillars.description') || 'Inisiatif keberlanjutan terstruktur PT Kristalin Ekalestari yang dirancang untuk mewujudkan kesejahteraan jangka panjang bagi masyarakat adat di lingkar tambang Nabire serta kelestarian alam Papua.'}
                    </p>
                </motion.div>

                {/* 4 Pillars Grid */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${pillar.borderHover}`}
                        >
                            {/* Top Color Stripe */}
                            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${pillar.accentColor}`} />

                            <div>
                                {/* Header: Badge & Icon */}
                                <div className="flex items-center justify-between">
                                    <span className={`inline-block rounded-full border px-3 py-0.5 text-[11px] font-bold tracking-wider uppercase shadow-xs ${pillar.badgeBg}`}>
                                        {pillar.pillarNo}
                                    </span>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-50 border border-stone-200/80 shadow-xs transition-transform duration-300 group-hover:scale-110">
                                        {pillar.icon}
                                    </div>
                                </div>

                                {/* Title & Tag */}
                                <div className="mt-5">
                                    <span className="text-[11px] font-bold text-amber-800 tracking-wider uppercase">
                                        {pillar.tag}
                                    </span>
                                    <h3 className="mt-1 text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                                        {pillar.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600">
                                    {pillar.description}
                                </p>
                            </div>

                            {/* Key Highlights Tags */}
                            <div className="mt-6 border-t border-stone-100 pt-4">
                                <div className="flex flex-wrap gap-1.5">
                                    {pillar.tags.map((tag, tagIdx) => (
                                        <span
                                            key={tagIdx}
                                            className="rounded-lg bg-stone-100/80 px-2.5 py-1 text-[10px] font-medium text-stone-700"
                                        >
                                            {tag}
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
                    transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                    className="mt-12 rounded-3xl border border-amber-200/90 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 p-6 sm:p-8 text-stone-800 shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                                    {t('pages.csr.pillars.assurance_title') || 'Harmonisasi Berkelanjutan dengan Masyarakat Adat Papua'}
                                </h4>
                                <p className="mt-0.5 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                                    {t('pages.csr.pillars.assurance_desc') || 'Seluruh program TJSL dan operasional tambang PT Kristalin Ekalestari berlandaskan pada persetujuan musyawarah adat, kepatuhan AMDAL lingkungan hidup, serta komitmen kemitraan berkesinambungan.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

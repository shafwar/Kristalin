import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useTranslation } from '@/hooks/useTranslation';
import { Head, Link } from '@inertiajs/react';
import { Building2, ChevronRight, Eye, LineChart, Mail, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function InvestorPage() {
    const { t } = useTranslation();
    const scrollRafRef = useRef(0);
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect for hero
    useEffect(() => {
        const handleScroll = () => {
            if (scrollRafRef.current) return;
            scrollRafRef.current = requestAnimationFrame(() => {
                scrollRafRef.current = 0;
                setScrollY(window.scrollY);
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            cancelAnimationFrame(scrollRafRef.current);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-stone-900">
            <Head>
                <title>{t('pages.investor.page_title') || 'Investor & Partner Pack | Kristalin Ekalestari'}</title>
                <meta name="description" content={t('pages.investor.meta_description') || 'Informasi dan panduan lengkap bagi calon investor dan mitra PT Kristalin Ekalestari.'} />
            </Head>

            {/* Transparent Header */}
            <Header sticky={true} transparent={true} />

            {/* Hero Section */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 h-full w-full will-change-transform"
                    style={{ transform: `translateY(${scrollY * 0.4}px)` }}
                >
                    <img
                        src="/kristalin-assets/public/investmentkristalin-opt.webp"
                        alt="Investment Background"
                        className="h-full w-full object-cover object-center"
                        fetchPriority="high"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                </div>
                
                <div className="relative z-10 mx-auto max-w-5xl px-4 text-center mt-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.p 
                            variants={fadeInUp}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="mb-4 text-sm font-semibold tracking-[0.3em] text-amber-500 uppercase"
                        >
                            {t('pages.investor.hero_subtitle') || 'Partnership & Investment'}
                        </motion.p>
                        
                        <motion.h1 
                            variants={fadeInUp}
                            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            {t('pages.investor.hero_title') || 'Investor & Partner Pack'}
                        </motion.h1>
                        
                        <motion.p 
                            variants={fadeInUp}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-stone-300 sm:text-xl"
                        >
                            {t('pages.investor.hero_description') || 'Bergabunglah bersama kami membangun ekosistem pertambangan emas terintegrasi yang berkelanjutan. Unduh dokumen profil perusahaan dan skema kemitraan kami.'}
                        </motion.p>
                        
                        <motion.div 
                            variants={fadeInUp}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className="flex items-center justify-center"
                        >
                            <Link
                                href="/company-profile-report"
                                className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-amber-500 px-8 text-base font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 transition-opacity duration-300 group-hover:opacity-0"></span>
                                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                                <span className="relative z-10 flex items-center gap-3">
                                    <Eye className="h-5 w-5 text-amber-200 transition-transform duration-300 group-hover:scale-110" />
                                    <span>{t('pages.investor.view_profile_btn') || 'Lihat & Unduh Company Profile'}</span>
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Mouse Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
                >
                    <div className="h-[30px] w-[20px] rounded-full border-2 border-white/30 flex justify-center p-1">
                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="h-1.5 w-1.5 rounded-full bg-amber-500"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Line of Business & Milestones Quick Look */}
            <section className="relative z-10 bg-white px-4 py-24 md:py-32">
                <div className="mx-auto max-w-6xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
                            {t('pages.investor.lob_title') || 'Line of Business & Sorotan Utama'}
                        </h2>
                        <p className="mt-6 text-lg text-stone-500 max-w-2xl mx-auto">
                            {t('pages.investor.lob_subtitle') || 'Ekosistem terpadu dari hulu ke hilir'}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid gap-8 md:grid-cols-3"
                    >
                        {/* Box 1 */}
                        <motion.div 
                            variants={fadeInUp}
                            className="group relative overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative z-10">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform duration-500 group-hover:scale-110">
                                    <Target className="h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-stone-900">{t('pages.investor.lob_1_title') || 'Eksplorasi & Hulu'}</h3>
                                <p className="leading-relaxed text-stone-600">
                                    {t('pages.investor.lob_1_desc') || 'Fokus pada penemuan cadangan emas primer dan sekunder berkualitas tinggi dengan standar operasional yang ketat.'}
                                </p>
                            </div>
                        </motion.div>

                        {/* Box 2 */}
                        <motion.div 
                            variants={fadeInUp}
                            className="group relative overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative z-10">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform duration-500 group-hover:scale-110">
                                    <Building2 className="h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-stone-900">{t('pages.investor.lob_2_title') || 'Pengolahan & Pemurnian'}</h3>
                                <p className="leading-relaxed text-stone-600">
                                    {t('pages.investor.lob_2_desc') || 'Infrastruktur canggih (Smelter & Refinery) untuk memproses bijih emas menjadi logam mulia batangan bersertifikat.'}
                                </p>
                            </div>
                        </motion.div>

                        {/* Box 3 */}
                        <motion.div 
                            variants={fadeInUp}
                            className="group relative overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative z-10">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform duration-500 group-hover:scale-110">
                                    <LineChart className="h-10 w-10" />
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-stone-900">{t('pages.investor.lob_3_title') || 'Perdagangan Hilir'}</h3>
                                <p className="leading-relaxed text-stone-600">
                                    {t('pages.investor.lob_3_desc') || 'Menghubungkan emas fisik langsung ke pasar konsumen (B2C) melalui platform digital dan kemitraan strategis.'}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    {/* Dark CTA Banner */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={slideInLeft}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-16 md:mt-20 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-stone-950 px-6 py-12 text-center text-white sm:px-10 md:px-16 md:py-16 md:text-left relative shadow-2xl"
                    >
                        {/* Decorative elements */}
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-stone-700/40 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-20 flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-10">
                            <div className="max-w-2xl">
                                <h3 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
                                    {t('pages.investor.milestone_title') || 'Pencapaian Milestone Kami'}
                                </h3>
                                <p className="text-base leading-relaxed text-stone-400 md:text-lg">
                                    {t('pages.investor.milestone_desc') || 'Sejak tahun 1989, Kristalin Ekalestari terus berinovasi dan menjaga komitmen CSR di seluruh wilayah operasional, mencetak pertumbuhan yang konsisten dan berkelanjutan.'}
                                </p>
                            </div>
                            <Link 
                                href="/milestones" 
                                className="group relative shrink-0 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-stone-700 bg-stone-900/80 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-200 active:scale-95 hover:border-amber-500 hover:bg-amber-500"
                            >
                                {t('pages.investor.milestone_btn') || 'Lihat Milestones Penuh'}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                                    <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Strengths & Scale */}
            <section className="relative z-10 bg-stone-50 px-4 py-24 md:py-32">
                <div className="mx-auto max-w-6xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
                            {t('pages.investor.strength_title') || 'Skala Operasional & Transparansi'}
                        </h2>
                        <p className="mt-6 text-lg text-stone-500 max-w-2xl mx-auto">
                            {t('pages.investor.strength_subtitle') || 'Lebih dari 3 dekade keunggulan operasional, didukung infrastruktur kelas dunia.'}
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { value: t('pages.investor.strength_1_val') || '12+', label: t('pages.investor.strength_1_label') || 'Armada Excavator', desc: t('pages.investor.strength_1_desc') || 'Sistem operasional tambang dengan alat berat modern secara mandiri.' },
                            { value: t('pages.investor.strength_2_val') || '30+', label: t('pages.investor.strength_2_label') || 'Tahun Pengalaman', desc: t('pages.investor.strength_2_desc') || 'Berdiri sejak 1989, memiliki rekam jejak panjang di industri emas.' },
                            { value: t('pages.investor.strength_3_val') || 'B2B', label: t('pages.investor.strength_3_label') || 'Penawaran Institusional', desc: t('pages.investor.strength_3_desc') || 'Sistem inquiry transparan langsung ke manajemen untuk kebutuhan B2B.' },
                            { value: t('pages.investor.strength_4_val') || 'ESG', label: t('pages.investor.strength_4_label') || 'Komitmen Sosial', desc: t('pages.investor.strength_4_desc') || 'Fokus pada keberlanjutan lingkungan dan pemberdayaan masyarakat Nabire.' },
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-sm border border-stone-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-100"
                            >
                                <span className="text-4xl font-extrabold text-amber-500">{stat.value}</span>
                                <span className="mt-4 text-lg font-bold text-stone-900">{stat.label}</span>
                                <span className="mt-3 text-sm text-stone-500 leading-relaxed">{stat.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership Contact Section */}
            <section className="relative z-10 bg-stone-950 px-4 py-20 md:py-28 overflow-hidden text-white">
                {/* Ambient glow decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-25">
                    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-500 blur-[130px]" />
                    <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-600 blur-[140px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl">
                    <div className="rounded-3xl border border-stone-800 bg-stone-900/90 p-8 sm:p-12 lg:p-16 backdrop-blur-md shadow-2xl">
                        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
                            
                            {/* Left Info Column */}
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="lg:col-span-7 space-y-6"
                            >
                                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    <span>{t('pages.investor.form_badge') || 'Partnership & Institutional Inquiries'}</span>
                                </div>

                                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
                                    {t('pages.investor.form_title') || 'Mulai Kemitraan Strategis'}
                                </h2>

                                <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl">
                                    {t('pages.investor.form_subtitle') || 'Diskusikan peluang kemitraan, aliansi rantai pasok, atau penjadwalan audiensi resmi bersama tim perwakilan institusional PT Kristalin Ekalestari.'}
                                </p>

                                {/* Direct Contact Badges */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-start gap-4 rounded-2xl border border-stone-800 bg-stone-950/60 p-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                                                {t('pages.investor.contact_email_label') || 'Email Institusional'}
                                            </p>
                                            <p className="text-sm font-semibold text-stone-200 mt-0.5">investor@kristalin.co.id</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 rounded-2xl border border-stone-800 bg-stone-950/60 p-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                                                {t('pages.investor.contact_hq_label') || 'Kantor Pusat'}
                                            </p>
                                            <p className="text-sm font-semibold text-stone-200 mt-0.5">
                                                {t('pages.investor.contact_hq_val') || 'Jakarta Selatan, Indonesia'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Action CTA Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                                className="lg:col-span-5 flex flex-col justify-center rounded-2xl border border-amber-500/30 bg-gradient-to-b from-stone-950/90 to-stone-900/90 p-6 sm:p-8 text-center sm:text-left shadow-xl"
                            >
                                <h3 className="text-xl font-bold text-white">
                                    {t('pages.investor.action_cta_title') || 'Siap Mengembangkan Ekosistem?'}
                                </h3>
                                <p className="mt-2 text-sm text-stone-400 leading-relaxed">
                                    {t('pages.investor.action_cta_desc') || 'Kunjungi formulir kontak resmi kami untuk mengajukan proposal atau menjadwalkan diskusi kemitraan bersama manajemen.'}
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href="/contact?subject=partnership"
                                        className="group relative flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 px-6 font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 active:scale-[0.98]"
                                    >
                                        <span>{t('pages.investor.action_cta_btn') || 'Hubungi Tim Kemitraan'}</span>
                                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>

                                <p className="mt-3.5 text-center text-[11px] text-stone-400">
                                    {t('pages.investor.action_cta_note') || '* Kategori form otomatis diatur ke Partnership'}
                                </p>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

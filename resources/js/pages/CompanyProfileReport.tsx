import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Printer, ArrowLeft, Target, Award, HeartHandshake, ShieldCheck, Gem,
    TrendingUp, HandHeart, History, Leaf, Users, GraduationCap, Smartphone,
    Pickaxe, Factory, Store, MapPin, Mail, Phone, Eye, Loader2,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { imageUrl } from '@/lib/assets';

// ---------------------------------------------------------------------------
// Asset Preloader — resolves when every <img> in the document is fully loaded.
// Prevents blank/incomplete PDF pages on slow mobile connections.
// ---------------------------------------------------------------------------
function preloadAllImages(): Promise<void> {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
    const promises = imgs.map(
        (img) =>
            new Promise<void>((resolve) => {
                if (img.complete && img.naturalHeight !== 0) {
                    resolve();
                } else {
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // resolve even on error so print isn't blocked forever
                }
            }),
    );
    return Promise.all(promises).then(() => undefined);
}

// ---------------------------------------------------------------------------
// Print states for loading UX
// ---------------------------------------------------------------------------
type PrintState = 'idle' | 'preparing' | 'rendering' | 'generating';

const PRINT_STATE_LABELS: Record<PrintState, string> = {
    idle: '',
    preparing: 'Preparing document...',
    rendering: 'Rendering pages...',
    generating: 'Generating PDF...',
};

export default function CompanyProfileReport() {
    const { t } = useTranslation();
    const [printState, setPrintState] = useState<PrintState>('idle');
    const printTriggered = useRef(false);

    // Robust print handler: preloads all assets, shows loading steps, then triggers print dialog.
    const handlePrint = useCallback(async () => {
        if (printTriggered.current) return;
        printTriggered.current = true;

        setPrintState('preparing');
        await new Promise((r) => setTimeout(r, 300)); // allow UI to update

        setPrintState('rendering');
        await preloadAllImages();
        await new Promise((r) => setTimeout(r, 400)); // allow final layout reflow

        setPrintState('generating');
        await new Promise((r) => setTimeout(r, 200));

        window.print();

        // Reset state after print dialog closes
        setTimeout(() => {
            setPrintState('idle');
            printTriggered.current = false;
        }, 1000);
    }, []);

    // Also handle browser afterprint event to reset state
    useEffect(() => {
        const handleAfterPrint = () => {
            setPrintState('idle');
            printTriggered.current = false;
        };
        window.addEventListener('afterprint', handleAfterPrint);
        return () => window.removeEventListener('afterprint', handleAfterPrint);
    }, []);

    const isPrinting = printState !== 'idle';
    const printLabel = PRINT_STATE_LABELS[printState];

    return (
        <div className="min-h-screen bg-stone-100 py-8 print:bg-white print:py-0">
            <Head title={t('pages.company_profile.page_title') || 'Company Profile | PT Kristalin Ekalestari'} />

            {/* Loading Overlay — shown during asset preparation, hidden on screen during actual print */}
            {isPrinting && (
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-sm print:hidden">
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-2xl">
                        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                        <p className="text-base font-semibold text-stone-700">{printLabel}</p>
                    </div>
                </div>
            )}

            {/* Floating Action Buttons (Hidden when printing) */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 border-t border-stone-200 bg-white/90 px-4 py-3 backdrop-blur-sm print:hidden md:bottom-auto md:left-auto md:top-8 md:right-8 md:border-0 md:bg-transparent md:backdrop-blur-none md:justify-end md:px-0 md:py-0 md:gap-4">
                <a
                    href="/investor"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-stone-600 shadow-md ring-1 ring-stone-200 transition-all hover:bg-stone-50 hover:text-stone-900 md:h-12 md:w-12 md:shadow-xl"
                    title="Back to Investors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </a>
                <button
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-amber-500 px-5 font-semibold text-white shadow-md transition-all hover:bg-amber-600 disabled:opacity-70 md:h-12 md:flex-none md:px-6 md:shadow-xl"
                >
                    {isPrinting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Printer className="h-5 w-5" />
                    )}
                    <span className="text-sm md:text-base">
                        {isPrinting ? printLabel : (t('pages.company_profile.print_btn') || 'Print / Save as PDF')}
                    </span>
                </button>
            </div>

            {/* Bottom spacer on mobile so content is not hidden behind fixed bar */}
            <div className="h-20 print:hidden md:hidden" />

            {/* A4 Report Container */}
            <div className="mx-auto w-full max-w-[210mm] overflow-hidden bg-white text-stone-800 shadow-2xl print:w-[210mm] print:max-w-none print:shadow-none">

                {/* ==================== PAGE 1: COVER ==================== */}
                <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-stone-950 text-white md:h-[297mm] print:h-[297mm]">
                    {/* Background image */}
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src={imageUrl('KristalinCompanyProfileBackground.webp')}
                            alt=""
                            aria-hidden
                            className="h-full w-full object-cover"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 md:p-16 print:p-16">
                        {/* Header: Logo + Year */}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <img
                                src={imageUrl('Kristalin-New-Logo.webp')}
                                alt="Kristalin Ekalestari"
                                className="h-9 w-auto brightness-0 invert sm:h-12 md:h-16 print:h-16"
                                loading="eager"
                            />
                            <p className="text-[10px] font-bold tracking-[0.18em] text-amber-500 uppercase sm:text-xs md:text-base print:text-base">
                                {t('pages.company_profile.report_year') || '2026 Edition'}
                            </p>
                        </div>

                        {/* Bottom: Title + Tagline */}
                        <div className="mt-auto pb-2">
                            <h1 className="mb-4 text-[clamp(1.75rem,8vw,4.5rem)] font-black uppercase leading-[1.05] tracking-tight print:text-7xl">
                                {t('pages.company_profile.report_title') || 'COMPANY PROFILE REPORT'}
                            </h1>
                            <div className="mb-5 h-1.5 w-20 bg-amber-500 sm:w-28 print:w-32" />
                            <p className="max-w-xl border-l-4 border-amber-500 py-2 pl-4 text-sm font-light italic text-stone-200 sm:text-base md:text-xl print:text-xl">
                                &ldquo;{t('pages.company_profile.tagline') || 'Responsibility is not what we claim, but what we consistently do.'}&rdquo;
                            </p>
                        </div>
                    </div>
                </div>

                {/* ==================== PAGE 2: EXECUTIVE SUMMARY & CORE VALUES ==================== */}
                <div className="flex min-h-[100svh] flex-col p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">

                    {/* Executive Summary */}
                    <div className="mb-8 md:mb-12">
                        <h2 className="mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.exec_summary') || 'Executive Summary'}
                        </h2>
                        <p className="text-sm leading-relaxed text-stone-700 md:text-lg print:text-lg">
                            {t('pages.company_profile.exec_summary_text') || 'PT Kristalin Ekalestari is a premier integrated gold mining and refining company based in Indonesia. Operating since 1989, we manage the entire value chain from exploration in Papua to our state-of-the-art refinery in Jakarta. We are committed to sustainable operations and community development.'}
                        </p>
                    </div>

                    {/* Core Values */}
                    <div className="flex-grow">
                        <h2 className="mb-6 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-8 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.core_values') || 'Core Values'}
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 print:grid-cols-2 print:gap-8">
                            {[
                                { icon: <ShieldCheck className="h-7 w-7 text-amber-500" strokeWidth={1.5} />, title: t('pages.company_profile.cv_integrity') || 'Integrity', text: t('pages.company_profile.cv_integrity_text') || 'Upholding the highest standards of ethics and transparency in all our operations.' },
                                { icon: <HeartHandshake className="h-7 w-7 text-amber-500" strokeWidth={1.5} />, title: t('pages.company_profile.cv_sustainability') || 'Sustainability', text: t('pages.company_profile.cv_sustainability_text') || 'Commitment to environmental stewardship and long-term community development.' },
                                { icon: <Award className="h-7 w-7 text-amber-500" strokeWidth={1.5} />, title: t('pages.company_profile.cv_excellence') || 'Excellence', text: t('pages.company_profile.cv_excellence_text') || 'Delivering world-class quality in gold refining and product certification.' },
                                { icon: <TrendingUp className="h-7 w-7 text-amber-500" strokeWidth={1.5} />, title: t('pages.company_profile.cv_innovation') || 'Innovation', text: t('pages.company_profile.cv_innovation_text') || 'Continuously adopting cutting-edge technologies to optimize the mining value chain.' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-8 print:rounded-2xl print:p-8">
                                    <div className="mb-4">{item.icon}</div>
                                    <h3 className="mb-2 text-lg font-bold text-stone-900 md:text-2xl print:text-2xl">{item.title}</h3>
                                    <p className="text-sm leading-relaxed text-stone-600 md:text-base print:text-base">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PageFooter page="01" t={t} />
                </div>

                {/* ==================== PAGE 3: CHAIRMAN'S MESSAGE ==================== */}
                <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-amber-500/10 md:h-64 md:w-64" />

                    <h2 className="mb-8 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-12 md:text-4xl print:text-4xl">
                        {t('pages.company_profile.chairman_title') || "Message from the Chairman"}
                    </h2>

                    <div className="flex-grow flex flex-col justify-center">
                        <div className="relative rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm sm:p-8 md:rounded-3xl md:p-12 print:rounded-3xl print:p-12">
                            <div className="pointer-events-none absolute -top-4 -left-4 text-amber-500 opacity-20 md:-top-6 md:-left-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="md:w-[80px] md:h-[80px]"><path d="M14.017 21v-7.391c0-5.714 4.195-7.79 7.983-8.83l.004 2.06c-1.636 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21h-8.017zm-14.017 0v-7.391c0-5.714 4.194-7.79 7.983-8.83l.004 2.06c-1.635 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21H0z"/></svg>
                            </div>
                            <p className="relative z-10 text-sm font-medium italic leading-loose text-stone-700 md:text-xl print:text-xl">
                                &ldquo;{t('pages.company_profile.chairman_msg') || 'Welcome to PT Kristalin Ekalestari. Since our inception, we have been driven by a singular vision: to redefine the gold mining industry in Indonesia through unwavering commitment to sustainability, innovation, and community empowerment.'}&rdquo;
                            </p>
                            <div className="mt-8 flex items-center justify-end border-t border-stone-200 pt-6 md:mt-12 md:pt-8 print:mt-12 print:pt-8">
                                <div className="text-right">
                                    <h3 className="text-lg font-bold text-stone-900 md:text-2xl print:text-2xl">{t('pages.company_profile.chairman_name') || 'Arif Budi Setiawan'}</h3>
                                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-600 md:text-sm print:text-sm">{t('pages.company_profile.chairman_position') || 'Chairman'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PageFooter page="02" t={t} />
                </div>

                {/* ==================== PAGE 4: VISION, MISSION & OPERATIONAL EXCELLENCE ==================== */}
                <div className="flex min-h-[100svh] flex-col p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">

                    {/* Vision & Mission */}
                    <div className="mb-6 grid grid-cols-1 gap-4 md:mb-12 md:grid-cols-2 md:gap-8 print:grid-cols-2 print:gap-8">
                        <div className="relative overflow-hidden rounded-2xl bg-stone-900 p-6 text-white shadow-xl md:rounded-3xl md:p-8 print:rounded-3xl print:p-8">
                            <div className="pointer-events-none absolute -right-4 -top-4 opacity-10"><Eye className="h-24 w-24 md:h-32 md:w-32" /></div>
                            <Eye className="mb-4 h-8 w-8 text-amber-500 md:mb-6 md:h-10 md:w-10" />
                            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-3xl print:text-3xl">{t('pages.company_profile.vision_title') || 'Our Vision'}</h2>
                            <p className="relative z-10 text-sm leading-relaxed text-stone-300 md:text-lg print:text-lg">{t('pages.company_profile.vision_text') || 'To become the leading and most trusted integrated gold mining company in Southeast Asia, pioneering sustainable operations and driving socio-economic growth for local communities.'}</p>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl bg-amber-500 p-6 text-white shadow-xl md:rounded-3xl md:p-8 print:rounded-3xl print:p-8">
                            <div className="pointer-events-none absolute -right-4 -top-4 opacity-10 text-black"><Target className="h-24 w-24 md:h-32 md:w-32" /></div>
                            <Target className="mb-4 h-8 w-8 text-stone-900 md:mb-6 md:h-10 md:w-10" />
                            <h2 className="mb-3 text-xl font-bold text-stone-900 md:mb-4 md:text-3xl print:text-3xl">{t('pages.company_profile.mission_title') || 'Our Mission'}</h2>
                            <p className="relative z-10 text-sm font-medium leading-relaxed text-stone-900 md:text-lg print:text-lg">{t('pages.company_profile.mission_text') || 'To operate responsibly across the entire gold value chain—from upstream exploration to downstream trading—by utilizing state-of-the-art technology, adhering to the highest environmental and safety standards, and fostering long-term partnerships.'}</p>
                        </div>
                    </div>

                    {/* Operational Excellence */}
                    <div className="flex-grow">
                        <h2 className="mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-8 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.op_excellence') || 'Operational Excellence'}
                        </h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 print:grid-cols-2 print:gap-6">
                            {[
                                { icon: <History className="h-6 w-6 text-amber-600 md:h-8 md:w-8" />, title: t('pages.company_profile.op_experience') || 'Decades of Experience', text: t('pages.company_profile.op_experience_text') || 'Operating seamlessly since 1989 with a proven track record.' },
                                { icon: <Gem className="h-6 w-6 text-amber-600 md:h-8 md:w-8" />, title: t('pages.company_profile.op_purity') || '99.99% Purity', text: t('pages.company_profile.op_purity_text') || 'Certified high-quality precious metals meeting international standards.' },
                                { icon: <Leaf className="h-6 w-6 text-amber-600 md:h-8 md:w-8" />, title: t('pages.company_profile.op_sustainability') || 'Eco-Friendly', text: t('pages.company_profile.op_sustainability_text') || 'Implementing ISO-certified green mining technologies.' },
                                { icon: <Users className="h-6 w-6 text-amber-600 md:h-8 md:w-8" />, title: t('pages.company_profile.op_community') || 'Local Empowerment', text: t('pages.company_profile.op_community_text') || 'Creating thousands of jobs and supporting local Papuan businesses.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:gap-6 md:rounded-2xl md:p-6 print:gap-6 print:rounded-2xl print:p-6">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-16 md:w-16 print:h-16 print:w-16">{item.icon}</div>
                                    <div>
                                        <h3 className="text-base font-bold text-stone-900 md:text-xl print:text-xl">{item.title}</h3>
                                        <p className="mt-0.5 text-xs leading-relaxed text-stone-600 md:text-base print:text-base">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PageFooter page="03" t={t} />
                </div>

                {/* ==================== PAGE 5: COMPANY MILESTONES ==================== */}
                <div className="flex min-h-[100svh] flex-col p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="flex-grow flex flex-col">
                        <h2 className="mb-8 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-10 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.milestones') || 'Company Milestones'}
                        </h2>

                        <div className="flex-grow flex flex-col justify-center">
                            <div className="relative ml-6 space-y-10 border-l-2 border-stone-200 pb-4 md:ml-8 md:space-y-16 print:ml-8 print:space-y-16">
                                {[
                                    { year: t('pages.company_profile.ms_1989') || '1989', title: t('pages.company_profile.ms_1989_title') || 'Foundation', text: t('pages.company_profile.ms_1989_text') || 'Established in Papua with a focus on sustainable gold exploration and community engagement.', icon: <History className="h-5 w-5 text-amber-500 md:h-7 md:w-7" /> },
                                    { year: t('pages.company_profile.ms_2005') || '2005', title: t('pages.company_profile.ms_2005_title') || 'First Refinery', text: t('pages.company_profile.ms_2005_text') || 'Opened our first state-of-the-art refining facility in Jakarta, enabling end-to-end processing.', icon: <Factory className="h-5 w-5 text-amber-500 md:h-7 md:w-7" /> },
                                    { year: t('pages.company_profile.ms_2015') || '2015', title: t('pages.company_profile.ms_2015_title') || 'LBMA Certification', text: t('pages.company_profile.ms_2015_text') || 'Achieved international LBMA standard for our 99.99% gold bars, recognizing our world-class quality.', icon: <Award className="h-5 w-5 text-amber-500 md:h-7 md:w-7" /> },
                                    { year: t('pages.company_profile.ms_2026') || '2026', title: t('pages.company_profile.ms_2026_title') || 'Digital Transformation', text: t('pages.company_profile.ms_2026_text') || 'Launched B2C digital platform connecting physical gold directly to investors.', icon: <Smartphone className="h-5 w-5 text-amber-500 md:h-7 md:w-7" /> },
                                ].map((ms, i) => (
                                    <div key={i} className="relative pl-10 md:pl-14 print:pl-14">
                                        <div className="absolute -left-5 top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16">
                                            {ms.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-amber-500 mb-1 md:text-4xl md:mb-3 print:text-4xl print:mb-3">{ms.year}</h3>
                                        <h4 className="text-base font-bold text-stone-900 mb-1 md:text-2xl md:mb-3 print:text-2xl print:mb-3">{ms.title}</h4>
                                        <p className="text-xs leading-relaxed text-stone-600 md:text-lg print:text-lg">{ms.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <PageFooter page="04" t={t} />
                </div>

                {/* ==================== PAGE 6: LINE OF BUSINESS ==================== */}
                <div className="flex min-h-[100svh] flex-col p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="flex-grow flex flex-col">
                        <h2 className="mb-6 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-10 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.line_of_business') || 'Line of Business'}
                        </h2>

                        <div className="flex-grow flex flex-col justify-between gap-4 md:gap-6 print:gap-6">
                            {[
                                { icon: <Pickaxe className="h-8 w-8 text-amber-600 md:h-10 md:w-10" strokeWidth={1.5} />, title: t('pages.company_profile.lob_upstream') || 'Exploration & Upstream', text: t('pages.company_profile.lob_upstream_text') || 'Focusing on discovering high-quality primary and secondary gold reserves with strict operational standards in Nabire, Central Papua.', extra: t('pages.company_profile.lob_upstream_extra') || '• 15,000+ Hectares of exploration area<br>• Advanced geophysical surveying<br>• Zero-harm safety protocols' },
                                { icon: <Factory className="h-8 w-8 text-amber-600 md:h-10 md:w-10" strokeWidth={1.5} />, title: t('pages.company_profile.lob_midstream') || 'Processing & Refining', text: t('pages.company_profile.lob_midstream_text') || 'Our advanced Smelter & Refinery infrastructure processes gold ore into certified precious metal bars, achieving 99.99% purity.', extra: t('pages.company_profile.lob_midstream_extra') || '• 2.5+ Tons annual capacity<br>• Advanced smelting technology<br>• 100% Traceable sourcing' },
                                { icon: <Store className="h-8 w-8 text-amber-600 md:h-10 md:w-10" strokeWidth={1.5} />, title: t('pages.company_profile.lob_downstream') || 'Downstream Trading', text: t('pages.company_profile.lob_downstream_text') || 'Connecting physical gold directly to the consumer market (B2C) through our digital platforms and strategic partnerships.', extra: t('pages.company_profile.lob_downstream_extra') || '• Direct B2C digital access<br>• Real-time pricing integration<br>• Insured nationwide delivery' },
                            ].map((lob, i) => (
                                <div key={i} className="flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:gap-8 md:rounded-3xl md:p-8 print:flex-row print:items-center print:gap-8 print:rounded-3xl print:p-8">
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 md:h-20 md:w-20 print:h-20 print:w-20">{lob.icon}</div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="text-base font-bold text-stone-900 mb-1 md:text-2xl md:mb-3 print:text-2xl print:mb-3">{lob.title}</h3>
                                        <p className="text-xs leading-relaxed text-stone-600 mb-2 md:text-lg md:mb-4 print:text-lg print:mb-4">{lob.text}</p>
                                        <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: lob.extra }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PageFooter page="05" t={t} />
                </div>

                {/* ==================== PAGE 7: CSR ==================== */}
                <div className="flex min-h-[100svh] flex-col p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="flex-grow flex flex-col">
                        <h2 className="mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-10 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.csr') || 'Corporate Social Responsibility'}
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-stone-700 md:mb-10 md:text-xl print:text-xl">
                            {t('pages.company_profile.csr_text') || 'We believe that our success is deeply intertwined with the prosperity of the communities where we operate. Through our monthly CSR programs, we provide essential food supplies, build community infrastructure, and fund educational and health initiatives in Nabire.'}
                        </p>

                        <div className="flex-grow flex flex-col justify-between gap-4 md:gap-6 print:gap-6">
                            {[
                                { color: 'emerald', icon: <Leaf className="h-8 w-8 text-emerald-600 md:h-10 md:w-10" strokeWidth={1.5} />, title: t('pages.company_profile.csr_env') || 'Environmental Stewardship', text: t('pages.company_profile.csr_env_text') || 'Implementing ISO 14001 standards, land reclamation, and renewable energy in mining operations.', extra: t('pages.company_profile.csr_env_extra') || '• 100,000+ trees planted for land reclamation<br>• 30% reduction in carbon emissions<br>• Comprehensive water recycling system' },
                                { color: 'blue', icon: <Users className="h-8 w-8 text-blue-600 md:h-10 md:w-10" strokeWidth={1.5} />, title: t('pages.company_profile.csr_com') || 'Community Empowerment', text: t('pages.company_profile.csr_com_text') || 'Building schools, hospitals, and infrastructure for the communities in Nabire, Central Papua.', extra: t('pages.company_profile.csr_com_extra') || '• Built 15+ community centers<br>• Empowering 50+ local MSMEs<br>• Regular cultural preservation events' },
                                { color: 'rose', icon: <GraduationCap className="h-8 w-8 text-rose-600 md:h-10 md:w-10" strokeWidth={1.5} />, title: t('pages.company_profile.csr_edu') || 'Education & Health', text: t('pages.company_profile.csr_edu_text') || 'Providing scholarships and funding local health clinics to improve the quality of life for future generations.', extra: t('pages.company_profile.csr_edu_extra') || '• 500+ Annual student scholarships<br>• Constructed 3 modern health clinics<br>• Monthly free health check-ups' },
                            ].map((csr, i) => (
                                <div key={i} className={`flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-${csr.color}-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:gap-8 md:rounded-3xl md:p-8 print:flex-row print:items-center print:gap-8 print:rounded-3xl print:p-8`}>
                                    <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-${csr.color}-100 bg-${csr.color}-50 md:h-20 md:w-20 print:h-20 print:w-20`}>{csr.icon}</div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="text-base font-bold text-stone-900 mb-1 md:text-2xl md:mb-3 print:text-2xl print:mb-3">{csr.title}</h3>
                                        <p className="text-xs leading-relaxed text-stone-600 mb-2 md:text-lg md:mb-4 print:text-lg print:mb-4">{csr.text}</p>
                                        <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: csr.extra }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PageFooter page="06" t={t} />
                </div>

                {/* ==================== PAGE 8: BACK COVER (CONTACT) ==================== */}
                <div className="relative flex min-h-[100svh] flex-col overflow-hidden md:min-h-[297mm] print:h-[297mm] print:break-before-page">
                    {/* Background — using <img> instead of CSS background for reliable print rendering */}
                    <img
                        src={imageUrl('KristalinCompanyProfileBackground.webp')}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-stone-950/85" />

                    {/* Ambient glows */}
                    <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl md:h-96 md:w-96" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/3 rounded-full bg-amber-500/5 blur-3xl md:h-[500px] md:w-[500px]" />

                    <div className="relative z-10 flex flex-grow flex-col items-center justify-center p-8 text-center md:p-16 print:p-16">

                        {/* Company name */}
                        <div className="mb-10 flex flex-col items-center md:mb-20 print:mb-20">
                            <h1 className="text-3xl font-medium tracking-wide text-stone-300 md:text-5xl print:text-5xl">
                                Kristalin Ekalestari
                            </h1>
                            <p className="mt-1 text-sm font-medium uppercase tracking-widest text-stone-500 md:ml-16 md:text-xl print:ml-16 print:text-xl">
                                Integrated Gold Industries
                            </p>
                        </div>

                        <h2 className="mb-10 text-2xl font-bold uppercase tracking-wider text-amber-500 md:mb-16 md:text-4xl print:mb-16 print:text-4xl">
                            CONTACT US
                        </h2>

                        <div className="inline-block space-y-5 text-left md:space-y-8 print:space-y-8">
                            {[
                                { icon: <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 md:h-7 md:w-7" strokeWidth={2} />, text: 'Jakarta Head Office, Indonesia' },
                                { icon: <Mail className="h-5 w-5 text-amber-500 flex-shrink-0 md:h-7 md:w-7" strokeWidth={2} />, text: 'info@kristalin.co.id' },
                                { icon: <Phone className="h-5 w-5 text-amber-500 flex-shrink-0 md:h-7 md:w-7" strokeWidth={2} />, text: '+62 21 22978900' },
                            ].map((c, i) => (
                                <div key={i} className="flex items-center gap-4 md:gap-6 print:gap-6">
                                    {c.icon}
                                    <span className="text-base font-medium text-stone-200 md:text-xl print:text-xl">{c.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Print CSS — forces exact A4 layout, color printing, and prevents blank pages */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page {
                        margin: 0;
                        size: A4 portrait;
                    }
                    html, body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        background: white !important;
                    }
                    /* Prevent any page element from being split across print pages */
                    .print\\:break-before-page {
                        break-before: page !important;
                        page-break-before: always !important;
                    }
                    /* Ensure images are always rendered in print */
                    img {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}} />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Shared Page Footer component
// ---------------------------------------------------------------------------
function PageFooter({ page, t }: { page: string; t: (key: string) => string }) {
    return (
        <div className="mt-6 flex items-end justify-between border-t border-stone-200 pt-4 md:mt-8 md:pt-6 print:mt-8 print:pt-6">
            <p className="text-xs font-medium text-stone-400 md:text-sm print:text-sm">
                {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
            </p>
            <p className="text-base font-bold text-stone-400 md:text-lg print:text-lg">{page}</p>
        </div>
    );
}

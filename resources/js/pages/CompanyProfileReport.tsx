import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Download, ArrowLeft, Target, Award, HeartHandshake, ShieldCheck, Gem,
    TrendingUp, History, Leaf, Users, GraduationCap, Smartphone,
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
                    img.onerror = () => resolve();
                }
            }),
    );
    return Promise.all(promises).then(() => undefined);
}

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

    const handlePrint = useCallback(async () => {
        if (printTriggered.current) return;
        printTriggered.current = true;

        setPrintState('preparing');
        await new Promise((r) => setTimeout(r, 300));

        setPrintState('rendering');
        await preloadAllImages();
        await new Promise((r) => setTimeout(r, 500));

        setPrintState('generating');
        await new Promise((r) => setTimeout(r, 200));

        window.print();

        setTimeout(() => {
            setPrintState('idle');
            printTriggered.current = false;
        }, 1500);
    }, []);

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
        <div className="min-h-screen bg-stone-100 py-0 md:py-8 print:bg-white print:py-0">
            <Head title={t('pages.company_profile.page_title') || 'Company Profile | PT Kristalin Ekalestari'} />

            {/* Loading Overlay */}
            {isPrinting && (
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-sm print:hidden">
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-2xl">
                        <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                        <p className="text-base font-semibold text-stone-700">{printLabel}</p>
                    </div>
                </div>
            )}

            {/* Floating Action Bar — mobile: bottom bar, desktop: top-right */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 border-t border-stone-200/90 bg-white/95 px-4 py-3 backdrop-blur-md print:hidden md:bottom-auto md:left-auto md:right-8 md:top-8 md:border-0 md:bg-transparent md:backdrop-blur-none md:gap-3 md:justify-end md:px-0 md:py-0">
                <a
                    href="/investor"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-stone-700 shadow-md ring-1 ring-stone-200 transition-all hover:bg-stone-50 hover:text-stone-900 md:h-12 md:w-12 md:shadow-xl cursor-pointer"
                    title="Back to Investors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </a>
                
                <a
                    href="/download-company-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Company-Profile-PT-Kristalin-Ekalestari.pdf"
                    className="group flex h-11 flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-5 sm:px-6 font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] md:h-12 md:shadow-xl text-xs sm:text-sm cursor-pointer"
                >
                    <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    <span>{t('pages.company_profile.download_btn') || 'Unduh PDF'}</span>
                </a>
            </div>

            {/* ============================================================
                A4 REPORT CONTAINER
                On screen: max-w-[210mm] centered card
                In print:  exactly 210mm wide, no shadow
                All page sections have:
                  - pdf-page class (targeted by print CSS below)
                  - overflow-hidden to prevent content bleed between pages
            ============================================================ */}
            <div className="mx-auto w-full max-w-[210mm] @container overflow-hidden bg-white text-stone-800 shadow-2xl print:w-[210mm] print:max-w-none print:shadow-none">

                {/* ==================== PAGE 1: COVER ==================== */}
                <div className="pdf-page relative flex w-full aspect-[210/297] flex-col overflow-hidden bg-stone-950 text-white md:h-[297mm] print:h-[297mm]">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src={imageUrl('KristalinCompanyProfileBackground.webp')}
                            alt="" aria-hidden
                            className="h-full w-full object-cover object-center"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-[7cqw] sm:p-10 md:p-16 print:p-16">
                        {/* Header: Logo + Year */}
                        <div className="flex items-center justify-between gap-4">
                            <img
                                src={imageUrl('Kristalin-New-Logo.webp')}
                                alt="Kristalin Ekalestari"
                                className="h-[7cqw] min-h-[28px] max-h-[64px] w-auto brightness-0 invert"
                                loading="eager"
                            />
                            <p className="text-[2.2cqw] min-text-[10px] font-bold tracking-[0.18em] text-amber-500 uppercase whitespace-nowrap">
                                {t('pages.company_profile.report_year') || '2026 Edition'}
                            </p>
                        </div>

                        {/* Title + Tagline */}
                        <div className="mt-auto pb-[1cqw]">
                            <h1 className="mb-[2cqw] font-black uppercase leading-[1.05] tracking-tight text-[7.5cqw] print:text-7xl">
                                {t('pages.company_profile.report_title') || 'COMPANY PROFILE REPORT'}
                            </h1>
                            <div className="mb-[2.5cqw] h-[0.7cqw] min-h-[3px] w-[14cqw] bg-amber-500 print:w-32" />
                            <p className="max-w-xl border-l-[0.5cqw] border-amber-500 py-[1cqw] pl-[3cqw] text-[2.7cqw] font-light italic text-stone-200 print:text-xl">
                                &ldquo;{t('pages.company_profile.tagline') || 'Responsibility is not what we claim, but what we consistently do.'}&rdquo;
                            </p>
                        </div>
                    </div>
                </div>

                {/* ==================== PAGE 2: EXECUTIVE SUMMARY & CORE VALUES ==================== */}
                <div className="pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">

                    <div className="mb-8 md:mb-10">
                        <h2 className="mb-4 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.exec_summary') || 'Executive Summary'}
                        </h2>
                        <p className="text-sm leading-relaxed text-stone-700 md:text-base print:text-base">
                            {t('pages.company_profile.exec_summary_text') || 'PT Kristalin Ekalestari is a premier integrated gold mining and refining company based in Indonesia. Operating since 1989, we manage the entire value chain from exploration in Papua to our state-of-the-art refinery in Jakarta. We are committed to sustainable operations and community development.'}
                        </p>
                    </div>

                    <div className="flex-grow">
                        <h2 className="mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-8 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.core_values') || 'Core Values'}
                        </h2>
                        {/* NOTE: Uses explicit static classes — no dynamic Tailwind */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 print:grid-cols-2 print:gap-6">
                            <div className="flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6">
                                <ShieldCheck className="mb-3 h-7 w-7 text-amber-500" strokeWidth={1.5} />
                                <h3 className="mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl">{t('pages.company_profile.cv_integrity') || 'Integrity'}</h3>
                                <p className="text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm">{t('pages.company_profile.cv_integrity_text') || 'Upholding the highest standards of ethics and transparency in all our operations.'}</p>
                            </div>
                            <div className="flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6">
                                <HeartHandshake className="mb-3 h-7 w-7 text-amber-500" strokeWidth={1.5} />
                                <h3 className="mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl">{t('pages.company_profile.cv_sustainability') || 'Sustainability'}</h3>
                                <p className="text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm">{t('pages.company_profile.cv_sustainability_text') || 'Commitment to environmental stewardship and long-term community development.'}</p>
                            </div>
                            <div className="flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6">
                                <Award className="mb-3 h-7 w-7 text-amber-500" strokeWidth={1.5} />
                                <h3 className="mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl">{t('pages.company_profile.cv_excellence') || 'Excellence'}</h3>
                                <p className="text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm">{t('pages.company_profile.cv_excellence_text') || 'Delivering world-class quality in gold refining and product certification.'}</p>
                            </div>
                            <div className="flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6">
                                <TrendingUp className="mb-3 h-7 w-7 text-amber-500" strokeWidth={1.5} />
                                <h3 className="mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl">{t('pages.company_profile.cv_innovation') || 'Innovation'}</h3>
                                <p className="text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm">{t('pages.company_profile.cv_innovation_text') || 'Continuously adopting cutting-edge technologies to optimize the mining value chain.'}</p>
                            </div>
                        </div>
                    </div>

                    <PageFooter page="01" t={t} />
                </div>

                {/* ==================== PAGE 3: CHAIRMAN'S MESSAGE ==================== */}
                <div className="pdf-page relative flex min-h-[100svh] flex-col overflow-hidden bg-white p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-amber-500/10 md:h-64 md:w-64" />

                    <h2 className="mb-8 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-10 md:text-4xl print:text-4xl">
                        {t('pages.company_profile.chairman_title') || 'Message from the Chairman'}
                    </h2>

                    <div className="flex flex-grow flex-col justify-center">
                        <div className="relative rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm sm:p-8 md:rounded-3xl md:p-10 print:rounded-3xl print:p-10">
                            <div className="pointer-events-none absolute -left-4 -top-4 text-amber-500 opacity-20 md:-left-6 md:-top-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="currentColor" className="md:h-20 md:w-20 print:h-20 print:w-20"><path d="M14.017 21v-7.391c0-5.714 4.195-7.79 7.983-8.83l.004 2.06c-1.636 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21h-8.017zm-14.017 0v-7.391c0-5.714 4.194-7.79 7.983-8.83l.004 2.06c-1.635 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21H0z"/></svg>
                            </div>
                            <p className="relative z-10 text-sm font-medium italic leading-loose text-stone-700 md:text-lg print:text-lg">
                                &ldquo;{t('pages.company_profile.chairman_msg') || 'Welcome to PT Kristalin Ekalestari. Since our inception, we have been driven by a singular vision: to redefine the gold mining industry in Indonesia through unwavering commitment to sustainability, innovation, and community empowerment. Our journey is not just about extracting precious metals; it is about creating lasting value for our stakeholders, preserving the environment for future generations, and uplifting the communities in Papua and beyond. As we embark on our digital transformation, we remain dedicated to transparency and excellence. Thank you for your continued trust and partnership.'}&rdquo;
                            </p>
                            <div className="mt-8 flex items-center justify-end border-t border-stone-200 pt-6 md:mt-10 md:pt-8 print:mt-10 print:pt-8">
                                <div className="text-right">
                                    <h3 className="text-base font-bold text-stone-900 md:text-2xl print:text-2xl">{t('pages.company_profile.chairman_name') || 'Arif Budi Setiawan'}</h3>
                                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-600 md:text-sm print:text-sm">{t('pages.company_profile.chairman_position') || 'Chairman'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PageFooter page="02" t={t} />
                </div>

                {/* ==================== PAGE 4: VISION, MISSION & OPERATIONAL EXCELLENCE ==================== */}
                <div className="pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">

                    {/* Vision & Mission */}
                    <div className="mb-5 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 md:gap-6 print:grid-cols-2 print:gap-6">
                        <div className="relative overflow-hidden rounded-2xl bg-stone-900 p-5 text-white shadow-xl md:rounded-3xl md:p-8 print:rounded-3xl print:p-8">
                            <div className="pointer-events-none absolute -right-4 -top-4 opacity-10"><Eye className="h-20 w-20 md:h-32 md:w-32" /></div>
                            <Eye className="mb-3 h-8 w-8 text-amber-500 md:mb-4 md:h-10 md:w-10" />
                            <h2 className="mb-2 text-xl font-bold md:mb-3 md:text-3xl print:text-3xl">{t('pages.company_profile.vision_title') || 'Our Vision'}</h2>
                            <p className="relative z-10 text-xs leading-relaxed text-stone-300 md:text-base print:text-base">{t('pages.company_profile.vision_text') || 'To become the leading and most trusted integrated gold mining company in Southeast Asia, pioneering sustainable operations and driving socio-economic growth for local communities.'}</p>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl bg-amber-500 p-5 text-white shadow-xl md:rounded-3xl md:p-8 print:rounded-3xl print:p-8">
                            <div className="pointer-events-none absolute -right-4 -top-4 opacity-10 text-black"><Target className="h-20 w-20 md:h-32 md:w-32" /></div>
                            <Target className="mb-3 h-8 w-8 text-stone-900 md:mb-4 md:h-10 md:w-10" />
                            <h2 className="mb-2 text-xl font-bold text-stone-900 md:mb-3 md:text-3xl print:text-3xl">{t('pages.company_profile.mission_title') || 'Our Mission'}</h2>
                            <p className="relative z-10 text-xs font-medium leading-relaxed text-stone-900 md:text-base print:text-base">{t('pages.company_profile.mission_text') || 'To operate responsibly across the entire gold value chain—from upstream exploration to downstream trading—by utilizing state-of-the-art technology, adhering to the highest environmental and safety standards, and fostering long-term partnerships.'}</p>
                        </div>
                    </div>

                    {/* Operational Excellence */}
                    <div className="flex-grow">
                        <h2 className="mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-6 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.op_excellence') || 'Operational Excellence'}
                        </h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 print:grid-cols-2 print:gap-5">
                            <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14"><History className="h-6 w-6 text-amber-600" /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-stone-900 md:text-lg print:text-lg">{t('pages.company_profile.op_experience') || 'Decades of Experience'}</h3>
                                    <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{t('pages.company_profile.op_experience_text') || 'Operating seamlessly since 1989 with a proven track record.'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14"><Gem className="h-6 w-6 text-amber-600" /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-stone-900 md:text-lg print:text-lg">{t('pages.company_profile.op_purity') || '99.99% Purity'}</h3>
                                    <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{t('pages.company_profile.op_purity_text') || 'Certified high-quality precious metals meeting international standards.'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14"><Leaf className="h-6 w-6 text-amber-600" /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-stone-900 md:text-lg print:text-lg">{t('pages.company_profile.op_sustainability') || 'Eco-Friendly'}</h3>
                                    <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{t('pages.company_profile.op_sustainability_text') || 'Implementing ISO-certified green mining technologies.'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14"><Users className="h-6 w-6 text-amber-600" /></div>
                                <div>
                                    <h3 className="text-sm font-bold text-stone-900 md:text-lg print:text-lg">{t('pages.company_profile.op_community') || 'Local Empowerment'}</h3>
                                    <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{t('pages.company_profile.op_community_text') || 'Creating thousands of jobs and supporting local Papuan businesses.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PageFooter page="03" t={t} />
                </div>

                {/* ==================== PAGE 5: COMPANY MILESTONES ==================== */}
                <div className="pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="flex flex-grow flex-col">
                        <h2 className="mb-6 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-10 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.milestones') || 'Company Milestones'}
                        </h2>

                        <div className="flex flex-grow flex-col justify-center">
                            <div className="relative ml-5 space-y-8 border-l-2 border-stone-200 pb-2 md:ml-8 md:space-y-12 print:ml-8 print:space-y-12">

                                <div className="relative pl-10 md:pl-14 print:pl-14">
                                    <div className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16">
                                        <History className="h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" />
                                    </div>
                                    <h3 className="mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl">{t('pages.company_profile.ms_1989') || '1989'}</h3>
                                    <h4 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.ms_1989_title') || 'Foundation'}</h4>
                                    <p className="text-xs leading-relaxed text-stone-600 md:text-base print:text-base">{t('pages.company_profile.ms_1989_text') || 'Established in Papua with a focus on sustainable gold exploration and community engagement.'}</p>
                                </div>

                                <div className="relative pl-10 md:pl-14 print:pl-14">
                                    <div className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16">
                                        <Factory className="h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" />
                                    </div>
                                    <h3 className="mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl">{t('pages.company_profile.ms_2005') || '2005'}</h3>
                                    <h4 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.ms_2005_title') || 'First Refinery'}</h4>
                                    <p className="text-xs leading-relaxed text-stone-600 md:text-base print:text-base">{t('pages.company_profile.ms_2005_text') || 'Opened our first state-of-the-art refining facility in Jakarta, enabling end-to-end processing.'}</p>
                                </div>

                                <div className="relative pl-10 md:pl-14 print:pl-14">
                                    <div className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16">
                                        <Award className="h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" />
                                    </div>
                                    <h3 className="mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl">{t('pages.company_profile.ms_2015') || '2015'}</h3>
                                    <h4 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.ms_2015_title') || 'LBMA Certification'}</h4>
                                    <p className="text-xs leading-relaxed text-stone-600 md:text-base print:text-base">{t('pages.company_profile.ms_2015_text') || 'Achieved international LBMA standard for our 99.99% gold bars, recognizing our world-class quality.'}</p>
                                </div>

                                <div className="relative pl-10 md:pl-14 print:pl-14">
                                    <div className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16">
                                        <Smartphone className="h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" />
                                    </div>
                                    <h3 className="mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl">{t('pages.company_profile.ms_2026') || '2026'}</h3>
                                    <h4 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.ms_2026_title') || 'Digital Transformation'}</h4>
                                    <p className="text-xs leading-relaxed text-stone-600 md:text-base print:text-base">{t('pages.company_profile.ms_2026_text') || 'Launched B2C digital platform connecting physical gold directly to investors.'}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <PageFooter page="04" t={t} />
                </div>

                {/* ==================== PAGE 6: LINE OF BUSINESS ==================== */}
                <div className="pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="flex flex-grow flex-col">
                        <h2 className="mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-8 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.line_of_business') || 'Line of Business'}
                        </h2>

                        <div className="flex flex-grow flex-col justify-between gap-4 md:gap-5 print:gap-5">

                            <div className="flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 md:h-16 md:w-16 print:h-16 print:w-16"><Pickaxe className="h-7 w-7 text-amber-600" strokeWidth={1.5} /></div>
                                <div className="min-w-0 flex-grow">
                                    <h3 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.lob_upstream') || 'Exploration & Upstream'}</h3>
                                    <p className="mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm">{t('pages.company_profile.lob_upstream_text') || 'Focusing on discovering high-quality primary and secondary gold reserves with strict operational standards in Nabire, Central Papua. We employ advanced geological mapping and responsible extraction methods.'}</p>
                                    <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.lob_upstream_extra') || '• 15,000+ Hectares of exploration area<br>• Advanced geophysical surveying<br>• Zero-harm safety protocols' }} />
                                </div>
                            </div>

                            <div className="flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 md:h-16 md:w-16 print:h-16 print:w-16"><Factory className="h-7 w-7 text-amber-600" strokeWidth={1.5} /></div>
                                <div className="min-w-0 flex-grow">
                                    <h3 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.lob_midstream') || 'Processing & Refining'}</h3>
                                    <p className="mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm">{t('pages.company_profile.lob_midstream_text') || 'Our advanced Smelter & Refinery infrastructure processes gold ore into certified precious metal bars, achieving 99.99% purity. We adhere strictly to international LBMA standards.'}</p>
                                    <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.lob_midstream_extra') || '• 2.5+ Tons annual capacity<br>• Advanced smelting technology<br>• 100% Traceable sourcing' }} />
                                </div>
                            </div>

                            <div className="flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 md:h-16 md:w-16 print:h-16 print:w-16"><Store className="h-7 w-7 text-amber-600" strokeWidth={1.5} /></div>
                                <div className="min-w-0 flex-grow">
                                    <h3 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.lob_downstream') || 'Downstream Trading'}</h3>
                                    <p className="mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm">{t('pages.company_profile.lob_downstream_text') || 'Connecting physical gold directly to the consumer market (B2C) through our digital platforms and strategic partnerships, offering investment-grade gold directly to the public.'}</p>
                                    <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.lob_downstream_extra') || '• Direct B2C digital access<br>• Real-time pricing integration<br>• Insured nationwide delivery' }} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <PageFooter page="05" t={t} />
                </div>

                {/* ==================== PAGE 7: CSR ==================== */}
                {/*
                    IMPORTANT: CSR cards use STATIC class names only.
                    Dynamic Tailwind classes like `border-l-${color}-500` are NOT
                    safe — Tailwind cannot detect them and they won't appear in the
                    production CSS bundle, causing missing styles.
                */}
                <div className="pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16">
                    <div className="flex flex-grow flex-col">
                        <h2 className="mb-4 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-6 md:text-4xl print:text-4xl">
                            {t('pages.company_profile.csr') || 'Corporate Social Responsibility'}
                        </h2>
                        <p className="mb-5 text-xs leading-relaxed text-stone-700 md:mb-6 md:text-sm print:text-sm">
                            {t('pages.company_profile.csr_text') || 'We believe that our success is deeply intertwined with the prosperity of the communities where we operate. Through our monthly CSR programs, we provide essential food supplies, build community infrastructure, and fund educational and health initiatives in Nabire.'}
                        </p>

                        <div className="flex flex-grow flex-col justify-between gap-4 md:gap-5 print:gap-5">

                            {/* Environmental — emerald */}
                            <div className="flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-emerald-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 md:h-16 md:w-16 print:h-16 print:w-16"><Leaf className="h-7 w-7 text-emerald-600" strokeWidth={1.5} /></div>
                                <div className="min-w-0 flex-grow">
                                    <h3 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.csr_env') || 'Environmental Stewardship'}</h3>
                                    <p className="mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm">{t('pages.company_profile.csr_env_text') || 'Implementing ISO 14001 standards, land reclamation, and renewable energy in mining operations to minimize our carbon footprint.'}</p>
                                    <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.csr_env_extra') || '• 100,000+ trees planted for land reclamation<br>• 30% reduction in carbon emissions<br>• Comprehensive water recycling system' }} />
                                </div>
                            </div>

                            {/* Community — blue */}
                            <div className="flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-blue-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 md:h-16 md:w-16 print:h-16 print:w-16"><Users className="h-7 w-7 text-blue-600" strokeWidth={1.5} /></div>
                                <div className="min-w-0 flex-grow">
                                    <h3 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.csr_com') || 'Community Empowerment'}</h3>
                                    <p className="mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm">{t('pages.company_profile.csr_com_text') || 'Building schools, hospitals, and infrastructure for the communities in Nabire, Central Papua, ensuring mutual prosperity.'}</p>
                                    <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.csr_com_extra') || '• Built 15+ community centers<br>• Empowering 50+ local MSMEs<br>• Regular cultural preservation events' }} />
                                </div>
                            </div>

                            {/* Education — rose */}
                            <div className="flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-rose-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-rose-100 bg-rose-50 md:h-16 md:w-16 print:h-16 print:w-16"><GraduationCap className="h-7 w-7 text-rose-600" strokeWidth={1.5} /></div>
                                <div className="min-w-0 flex-grow">
                                    <h3 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl">{t('pages.company_profile.csr_edu') || 'Education & Health'}</h3>
                                    <p className="mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm">{t('pages.company_profile.csr_edu_text') || 'Providing scholarships and funding local health clinics to improve the quality of life for future generations.'}</p>
                                    <p className="text-xs leading-loose text-stone-500" dangerouslySetInnerHTML={{ __html: t('pages.company_profile.csr_edu_extra') || '• 500+ Annual student scholarships<br>• Constructed 3 modern health clinics<br>• Monthly free health check-ups' }} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <PageFooter page="06" t={t} />
                </div>

                {/* ==================== PAGE 8: BACK COVER ==================== */}
                <div className="pdf-page relative flex min-h-[100svh] flex-col overflow-hidden md:min-h-[297mm] print:h-[297mm] print:break-before-page">
                    {/* Background via <img> — more reliable than CSS background-image for print */}
                    <img
                        src={imageUrl('KristalinCompanyProfileBackground.webp')}
                        alt="" aria-hidden
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-stone-950/85" />

                    <div className="pointer-events-none absolute -translate-y-1/2 translate-x-1/2 right-0 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl md:h-96 md:w-96" />
                    <div className="pointer-events-none absolute -translate-x-1/2 translate-y-1/3 bottom-0 left-0 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl md:h-[500px] md:w-[500px]" />

                    <div className="relative z-10 flex flex-grow flex-col items-center justify-center p-8 text-center md:p-16 print:p-16">
                        <div className="mb-10 flex flex-col items-center md:mb-16 print:mb-16">
                            <h1 className="text-3xl font-medium tracking-wide text-stone-300 md:text-5xl print:text-5xl">Kristalin Ekalestari</h1>
                            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-stone-500 md:ml-16 md:text-lg print:ml-16 print:text-lg">Integrated Gold Industries</p>
                        </div>

                        <h2 className="mb-8 text-2xl font-bold uppercase tracking-wider text-amber-500 md:mb-12 md:text-4xl print:mb-12 print:text-4xl">CONTACT US</h2>

                        <div className="inline-block space-y-4 text-left md:space-y-6 print:space-y-6">
                            <div className="flex items-center gap-4 md:gap-6 print:gap-6">
                                <MapPin className="h-5 w-5 flex-shrink-0 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" strokeWidth={2} />
                                <span className="text-base font-medium text-stone-200 md:text-xl print:text-xl">Jakarta Head Office, Indonesia</span>
                            </div>
                            <div className="flex items-center gap-4 md:gap-6 print:gap-6">
                                <Mail className="h-5 w-5 flex-shrink-0 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" strokeWidth={2} />
                                <span className="text-base font-medium text-stone-200 md:text-xl print:text-xl">info@kristalin.co.id</span>
                            </div>
                            <div className="flex items-center gap-4 md:gap-6 print:gap-6">
                                <Phone className="h-5 w-5 flex-shrink-0 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" strokeWidth={2} />
                                <span className="text-base font-medium text-stone-200 md:text-xl print:text-xl">+62 21 22978900</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>{/* end A4 container */}

            {/* Mobile spacer so bottom content isn't hidden behind fixed bottom bar */}
            <div className="h-20 print:hidden md:hidden" />

            {/*
                CRITICAL PRINT CSS
                ==================
                This fixes PDF layout from MOBILE browsers where the viewport
                is ~390px wide and all md: breakpoints are inactive.

                Strategy:
                1. Force the A4 container to exactly 210mm wide
                2. Force each .pdf-page to exactly 297mm tall with overflow hidden
                3. Re-apply "desktop" layout for grids and flex items in print mode
                   using !important so they override the mobile-first base classes
                4. Ensure background graphics and images print correctly
            */}
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
                        width: 210mm !important;
                        margin: 0 !important;
                    }

                    /* Force A4 container dimensions */
                    .pdf-page {
                        width: 210mm !important;
                        height: 297mm !important;
                        min-height: 297mm !important;
                        max-height: 297mm !important;
                        overflow: hidden !important;
                        break-before: page !important;
                        page-break-before: always !important;
                        box-sizing: border-box !important;
                        padding: 64px !important;
                    }

                    /* First page has no break-before */
                    .pdf-page:first-child {
                        break-before: avoid !important;
                        page-break-before: avoid !important;
                        padding: 0 !important;
                    }

                    /* Force 2-column grid layout in print (overrides mobile 1-column) */
                    .pdf-page .grid {
                        display: grid !important;
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }

                    /* Force horizontal card layout in print (overrides mobile flex-col) */
                    .pdf-page .flex-col.sm\\:flex-row,
                    .pdf-page .flex-col.md\\:flex-row {
                        flex-direction: row !important;
                        align-items: center !important;
                    }

                    /* Images always render with color */
                    img {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        max-width: 100% !important;
                    }
                }
            `}} />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Shared Page Footer
// ---------------------------------------------------------------------------
function PageFooter({ page, t }: { page: string; t: (key: string) => string }) {
    return (
        <div className="mt-5 flex items-end justify-between border-t border-stone-200 pt-4 md:mt-6 md:pt-5 print:mt-6 print:pt-5">
            <p className="text-[10px] font-medium text-stone-400 md:text-xs print:text-xs">
                {t('pages.company_profile.footer_note') || 'Generated automatically from Kristalin Ekalestari Digital Platform.'}
            </p>
            <p className="text-sm font-bold text-stone-400 md:text-base print:text-base">{page}</p>
        </div>
    );
}

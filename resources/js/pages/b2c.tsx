import { B2cFaqSection, type B2cFaqItem } from '@/components/B2cFaqSection';
import { B2cHeroPicture } from '@/components/B2cHeroPicture';
import { useLcpSafeMicroMotion } from '@/hooks/useLcpSafeMicroMotion';
import { useTranslation } from '@/hooks/useTranslation';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Award, Building2, FileText, RotateCcw, Scale, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useLayoutEffect, useMemo, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InquiryForm from '../components/InquiryForm';
import GoldBullionCalculator from '@/components/GoldBullionCalculator';
import { EsmdVerificationBadge } from '@/components/EsmdVerificationModal';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function scrollToProcess() {
    document.getElementById('b2c-process')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function B2cPage() {
    const { t } = useTranslation();
    const heroMicroReady = useLcpSafeMicroMotion();
    const scrollAnimScopeRef = useRef<HTMLDivElement>(null);

    /** ScrollTrigger: alternate subtle slide from left/right + fade. GPU-friendly (x, opacity only), once, scoped revert. */
    useLayoutEffect(() => {
        const scope = scrollAnimScopeRef.current;
        if (!scope || typeof window === 'undefined') return;

        const prefersReduced =
            typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            const blocks = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('[data-b2c-reveal]'));
            if (blocks.length === 0) return;

            if (prefersReduced) {
                gsap.set(blocks, { opacity: 1, x: 0, clearProps: 'transform' });
                return;
            }

            const xOffset = window.innerWidth < 768 ? 20 : 32;

            blocks.forEach((el, index) => {
                const fromX = index % 2 === 0 ? -xOffset : xOffset;
                gsap.fromTo(
                    el,
                    { opacity: 0, x: fromX, immediateRender: true },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.78,
                        ease: 'power2.out',
                        overwrite: 'auto',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            toggleActions: 'play none none none',
                            once: true,
                        },
                    },
                );
            });
        }, scope);

        return () => {
            ctx.revert();
        };
    }, []);

    const faqItems: B2cFaqItem[] = useMemo(
        () => [
            { id: 'location', question: t('pages.b2c.faq.location.q'), answer: t('pages.b2c.faq.location.a') },
            { id: 'hours', question: t('pages.b2c.faq.hours.q'), answer: t('pages.b2c.faq.hours.a') },
            { id: 'kyc', question: t('pages.b2c.faq.kyc.q'), answer: t('pages.b2c.faq.kyc.a') },
            { id: 'how_to_start', question: t('pages.b2c.faq.how_to_start.q'), answer: t('pages.b2c.faq.how_to_start.a') },
            { id: 'price_disclaimer', question: t('pages.b2c.faq.price.q'), answer: t('pages.b2c.faq.price.a') },
            { id: 'delivery_schedule', question: t('pages.b2c.faq.delivery.q'), answer: t('pages.b2c.faq.delivery.a') },
        ],
        [t],
    );

    const reveal =
        'data-b2c-reveal rounded-2xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:p-8 motion-reduce:opacity-100';

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-stone-900">
            <Head>
                <title>{t('pages.b2c.page_title')}</title>
                <meta name="description" content={t('pages.b2c.meta_description')} />
            </Head>

            <Header sticky={true} transparent={true} />

            <section className="relative flex min-h-[78vh] flex-col justify-end overflow-hidden md:min-h-[85vh]">
                <div className="absolute inset-0">
                    <B2cHeroPicture
                        pictureClassName="block h-full w-full"
                        className="h-full w-full object-cover object-center"
                        alt={t('pages.b2c.hero_alt')}
                        loading="eager"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-900/35" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-28 md:pb-20 md:pt-32">
                    <div
                        className={clsx(
                            'max-w-3xl transition-transform duration-500 ease-out motion-reduce:transition-none',
                            heroMicroReady ? 'translate-y-0' : 'translate-y-2',
                        )}
                    >
                        <div className="mb-4">
                            <EsmdVerificationBadge variant="compact" theme="dark" />
                        </div>
                        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-300/95 uppercase">
                            {t('pages.b2c.hero_kicker')}
                        </p>
                        <h1 className="mb-4 text-3xl leading-tight font-bold text-white drop-shadow-md sm:text-4xl md:text-5xl">
                            {t('pages.b2c.hero_title')}
                        </h1>
                        <p className="mb-8 max-w-2xl text-base leading-relaxed text-stone-200/95 sm:text-lg">
                            {t('pages.b2c.hero_subtitle')}
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button
                                type="button"
                                onClick={scrollToProcess}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 text-sm font-semibold text-stone-900 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                            >
                                {t('pages.b2c.cta_scroll')}
                                <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden />
                            </button>
                            <Link
                                href="/contact"
                                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
                            >
                                {t('pages.b2c.cta_contact')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div ref={scrollAnimScopeRef}>
            <section id="b2c-process" className="relative z-10 -mt-6 scroll-mt-24 rounded-t-3xl bg-stone-50 px-4 py-14 md:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold tracking-wide text-amber-700/90 uppercase">{t('pages.b2c.section_process_kicker')}</p>
                    <h2 className="mt-2 text-2xl font-bold text-stone-900 md:text-3xl">{t('pages.b2c.section_process_title')}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-stone-600">{t('pages.b2c.bridge_intro')}</p>
                </div>

                <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-8">
                    <article data-b2c-reveal className={reveal}>
                        <div className="mb-4 flex items-center gap-3 text-amber-800">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                <Sparkles className="h-5 w-5" aria-hidden />
                            </span>
                            <h3 className="text-lg font-bold md:text-xl">{t('pages.b2c.step0_title')}</h3>
                        </div>
                        <p className="mb-4 text-stone-600">{t('pages.b2c.step0_lead')}</p>
                        <blockquote className="border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800">
                            {t('pages.b2c.verbatim_program')}
                        </blockquote>
                    </article>

                    <article data-b2c-reveal className={reveal}>
                        <div className="mb-4 flex items-center gap-3 text-amber-800">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                <Building2 className="h-5 w-5" aria-hidden />
                            </span>
                            <h3 className="text-lg font-bold md:text-xl">{t('pages.b2c.step1_title')}</h3>
                        </div>
                        <p className="mb-4 text-stone-600">{t('pages.b2c.step1_lead')}</p>
                        <blockquote className="mb-4 border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800">
                            {t('pages.b2c.verbatim_delivery_50a')}
                        </blockquote>
                        <blockquote className="border-l-4 border-stone-300 bg-white py-3 pr-4 pl-5 text-stone-800">
                            {t('pages.b2c.verbatim_example')}
                        </blockquote>
                    </article>

                    <article data-b2c-reveal className={reveal}>
                        <div className="mb-4 flex items-center gap-3 text-amber-800">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                <FileText className="h-5 w-5" aria-hidden />
                            </span>
                            <h3 className="text-lg font-bold md:text-xl">{t('pages.b2c.step2_title')}</h3>
                        </div>
                        <p className="mb-4 text-stone-600">{t('pages.b2c.step2_lead')}</p>
                        <blockquote className="border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800">
                            {t('pages.b2c.verbatim_delivery_50b')}
                        </blockquote>
                    </article>

                    <article data-b2c-reveal className={reveal}>
                        <div className="mb-4 flex items-center gap-3 text-amber-800">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                <Scale className="h-5 w-5" aria-hidden />
                            </span>
                            <h3 className="text-lg font-bold md:text-xl">{t('pages.b2c.step3_title')}</h3>
                        </div>
                        <p className="mb-4 text-stone-600">{t('pages.b2c.step3_lead')}</p>
                        <blockquote className="border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800">
                            {t('pages.b2c.verbatim_pricing')}
                        </blockquote>
                    </article>

                    <article data-b2c-reveal className={reveal}>
                        <div className="mb-4 flex items-center gap-3 text-amber-800">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                <Sparkles className="h-5 w-5" aria-hidden />
                            </span>
                            <h3 className="text-lg font-bold md:text-xl">{t('pages.b2c.step4_title')}</h3>
                        </div>
                        <p className="mb-4 text-stone-600">{t('pages.b2c.step4_lead')}</p>
                        <blockquote className="border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800">
                            {t('pages.b2c.verbatim_profit')}
                        </blockquote>
                    </article>

                    <p data-b2c-reveal className={clsx(reveal, 'text-center text-sm text-stone-500')}>
                        {t('pages.b2c.footnote')}
                    </p>
                </div>
            </section>

            {/* Interactive Live Gold Bullion Calculator & Trust Guarantee Suite */}
            <section className="relative z-10 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 border-y border-stone-200/90 px-4 py-12 md:py-20">
                <div data-b2c-reveal className="mx-auto max-w-5xl">
                    {/* Section Header */}
                    <div className="mb-8 text-center sm:mb-12">
                        <span className="inline-block rounded-full bg-amber-100 border border-amber-300/80 px-4 py-1 text-xs font-bold text-amber-900 uppercase tracking-widest">
                            Direct Refinery Supply · Kisara Gold 24K
                        </span>
                        <h2 className="mt-3 text-2xl font-extrabold text-stone-900 sm:text-3xl md:text-4xl tracking-tight">
                            Simulasi Investasi & Pemesanan Emas Fisik
                        </h2>
                        <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-stone-600 leading-relaxed">
                            Akses langsung ke likuiditas emas batangan murni 99.99% langsung dari rantai pasok PT Kristalin Ekalestari dengan transparansi kuotasi harga acuan bursa terkini.
                        </p>
                    </div>

                    {/* The Interactive Calculator Terminal */}
                    <GoldBullionCalculator />

                    {/* 4 Trust & Security Guarantee Badges */}
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                        <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-xs transition-transform hover:-translate-y-0.5">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                <Award className="h-5 w-5" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900">Kemurnian 99.99%</h4>
                            <p className="mt-0.5 text-[11px] text-stone-500">Fine Gold 24 Karat terverifikasi standar SNI & LBMA.</p>
                        </div>
                        <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-xs transition-transform hover:-translate-y-0.5">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900">Assay Packaging</h4>
                            <p className="mt-0.5 text-[11px] text-stone-500">Segel keamanan anti-pemalsuan dan nomor seri unik.</p>
                        </div>
                        <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-xs transition-transform hover:-translate-y-0.5">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                <Truck className="h-5 w-5" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900">Asuransi Penuh 100%</h4>
                            <p className="mt-0.5 text-[11px] text-stone-500">Pengiriman fisik aman dengan proteksi asuransi terpadu.</p>
                        </div>
                        <div className="rounded-2xl border border-stone-200 bg-white p-4 text-center shadow-xs transition-transform hover:-translate-y-0.5">
                            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                <RotateCcw className="h-5 w-5" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900">Jaminan Buyback</h4>
                            <p className="mt-0.5 text-[11px] text-stone-500">Likuiditas pembelian kembali dengan harga acuan kompetitif.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 bg-stone-50 px-4 py-8 md:py-12">
                <div data-b2c-reveal>
                    <InquiryForm type="B2C" />
                </div>
            </section>

                <B2cFaqSection
                    kicker={t('pages.b2c.practical.kicker')}
                    title={t('pages.b2c.practical.title')}
                    intro={t('pages.b2c.practical.intro')}
                    items={faqItems}
                    map={{
                        title: t('pages.b2c.practical.map_title'),
                        subtitle: t('pages.b2c.practical.map_subtitle'),
                        address: t('pages.b2c.practical.map_address'),
                    }}
                    openMapsLabel={t('pages.contact.locations.open_maps')}
                    contactCta={t('pages.b2c.cta_contact')}
                    contactLinkLabel={t('pages.b2c.faq.contact_link')}
                    kristalinTvLabel={t('pages.b2c.faq.kristalin_tv_link')}
                    kristalinTvUrl="https://livegold-kristalintv.com/"
                    processAnchorLabel={t('pages.b2c.faq.process_link')}
                    onScrollToProcess={scrollToProcess}
                    footerPrompt={t('pages.b2c.bottom_prompt')}
                    revealClassName={reveal}
                />
            </div>

            <Footer />
        </div>
    );
}

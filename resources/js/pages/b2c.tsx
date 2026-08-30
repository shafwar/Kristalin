import { B2cFaqSection, type B2cFaqItem } from '@/components/B2cFaqSection';
import { B2cHeroPicture } from '@/components/B2cHeroPicture';
import { useLcpSafeMicroMotion } from '@/hooks/useLcpSafeMicroMotion';
import { useTranslation } from '@/hooks/useTranslation';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Building2, FileText, Scale, Sparkles } from 'lucide-react';
import { useLayoutEffect, useMemo, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
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

    /** Auto-scroll to hash target (e.g. #b2c-calculator) on page mount / navigation */
    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        const hash = window.location.hash;
        if (!hash) return;

        const targetId = hash.replace('#', '');
        const performScroll = () => {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        performScroll();
        const t1 = setTimeout(performScroll, 80);
        const t2 = setTimeout(performScroll, 300);
        const t3 = setTimeout(performScroll, 700);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
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
                        <div className="mb-4 flex flex-wrap items-center gap-2.5">
                            <EsmdVerificationBadge variant="compact" theme="dark" />
                            <a
                                href="https://atrina.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur-md transition-all hover:bg-amber-500/30 hover:border-amber-400/70"
                            >
                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                                <span>IUP-OPK No. 760/1/IUP/PMDN/2021 · ATRINA</span>
                                <ArrowDownRight className="h-3 w-3 -rotate-45 text-amber-300 transition-transform group-hover:translate-x-0.5" />
                            </a>
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
                            <a
                                href="https://atrina.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-amber-300/50 bg-amber-500/15 px-6 text-sm font-semibold text-amber-200 backdrop-blur-sm transition-all duration-200 hover:bg-amber-500/25 hover:border-amber-300"
                            >
                                <span>{t('pages.b2c.atrina_portal_cta') || 'Buka Website ATRINA (atrina.id)'}</span>
                                <ArrowDownRight className="h-4 w-4 -rotate-45 shrink-0" aria-hidden />
                            </a>
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
                
                {/* ATRINA Ecosystem Bridge Card */}
                <div data-b2c-reveal className="mx-auto max-w-3xl mb-12 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300/80 px-3 py-0.5 text-xs font-bold text-amber-950">
                                <Building2 className="h-3.5 w-3.5 text-amber-700" />
                                <span>Rantai Pasok Grup Terintegrasi (Upstream to Downstream)</span>
                            </div>
                            <p className="text-sm text-stone-700 leading-relaxed pt-1">
                                <strong className="text-stone-900">PT Kristalin Ekalestari (IUP OP 561/2021/DESDM)</strong> menambang emas murni hulu di Nabire, Papua &rarr; <strong className="text-amber-900">PT Agaro Tri Niaga / ATRINA (IUP-OPK 760/1/IUP/PMDN/2021)</strong> mendistribusikan emas fisik 24K KISA24 berstandar Sucofindo ke pasar konsumen.
                            </p>
                        </div>
                        <a
                            href="https://atrina.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 text-xs font-bold px-4 py-2.5 shadow-sm transition-transform hover:scale-105"
                        >
                            <span>Kunjungi atrina.id</span>
                            <ArrowDownRight className="h-3.5 w-3.5 -rotate-45" />
                        </a>
                    </div>
                </div>

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

            {/* Interactive Live Gold Bullion Calculator & Trust Guarantee Section */}
            <section id="b2c-calculator" className="relative z-10 scroll-mt-20 md:scroll-mt-28 bg-gradient-to-b from-stone-100/90 via-stone-50 to-stone-100/90 border-y border-stone-200/90 px-4 py-14 md:py-20 lg:py-24">
                <div data-b2c-reveal className="mx-auto max-w-6xl">
                    <GoldBullionCalculator />
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

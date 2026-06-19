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

gsap.registerPlugin(ScrollTrigger);

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

import { B2cHeroPicture } from '@/components/B2cHeroPicture';
import { useLcpSafeMicroMotion } from '@/hooks/useLcpSafeMicroMotion';
import { useTranslation } from '@/hooks/useTranslation';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Building2, FileText, Scale, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function scrollToProcess() {
    document.getElementById('b2c-process')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function B2cPage() {
    const { t } = useTranslation();
    const heroMicroReady = useLcpSafeMicroMotion();
    const heroRef = useRef<HTMLElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    /** Raw scroll progress: no spring physics = less main-thread work after scroll stops (INP friendly). */
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    /** Multi-stop maps mimic ease-out curves without extra animation loops. */
    const heroImageY = useTransform(heroScroll, [0, 0.18, 0.48, 0.78, 1], [0, 26, 54, 82, 108]);
    const heroImageScale = useTransform(heroScroll, [0, 0.3, 0.65, 1], [1, 1.018, 1.038, 1.058]);
    const heroOverlayY = useTransform(heroScroll, [0, 0.25, 0.62, 1], [0, 12, 32, 54]);
    const heroOverlayOpacity = useTransform(heroScroll, [0, 0.38, 0.72, 1], [1, 0.94, 0.86, 0.78]);
    const heroContentY = useTransform(heroScroll, [0, 0.28, 0.65, 1], [0, 14, 30, 48]);
    const heroContentOpacity = useTransform(heroScroll, [0, 0.45, 0.75, 1], [1, 0.99, 0.92, 0.84]);
    /** Subtle “recede into the scene” — GPU-friendly with parent perspective. */
    const heroContentScale = useTransform(heroScroll, [0, 0.4, 0.82, 1], [1, 0.995, 0.978, 0.962]);
    const heroContentRotateX = useTransform(heroScroll, [0, 0.35, 0.75, 1], [0, 1.25, 2.75, 3.75]);
    /** White panel eases up into final overlap as the hero scrolls away. */
    const processPanelY = useTransform(heroScroll, [0, 0.38, 0.78, 1], [22, 11, 3, 0]);

    useEffect(() => {
        const els = Array.from(document.querySelectorAll<HTMLElement>('[data-b2c-reveal]'));
        if (els.length === 0) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute('data-b2c-visible', 'true');
                    }
                }
            },
            { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const reveal = 'data-b2c-reveal rounded-2xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none md:p-8 opacity-0 translate-y-5 data-[b2c-visible=true]:opacity-100 data-[b2c-visible=true]:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0';

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-stone-900">
            <Head>
                <title>{t('pages.b2c.page_title')}</title>
                <meta name="description" content={t('pages.b2c.meta_description')} />
            </Head>

            <Header sticky={true} transparent={true} />

            <section
                ref={heroRef}
                className="relative flex min-h-[78vh] flex-col justify-end overflow-hidden perspective-[1100px] md:min-h-[85vh]"
            >
                <motion.div
                    className="absolute inset-0 isolate will-change-transform [transform:translateZ(0)]"
                    style={{
                        y: prefersReducedMotion ? 0 : heroImageY,
                        scale: prefersReducedMotion ? 1 : heroImageScale,
                    }}
                >
                    <B2cHeroPicture
                        pictureClassName="block h-full min-h-full w-full"
                        className="h-full w-full object-cover object-center"
                        alt={t('pages.b2c.hero_alt')}
                        loading="eager"
                        fetchPriority="high"
                    />
                </motion.div>
                <motion.div
                    className="pointer-events-none absolute inset-0 z-[1] will-change-[transform,opacity] [transform:translateZ(0)]"
                    style={{
                        y: prefersReducedMotion ? 0 : heroOverlayY,
                        opacity: prefersReducedMotion ? 1 : heroOverlayOpacity,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-900/35" />
                </motion.div>

                <motion.div
                    className="relative z-10 mx-auto w-full max-w-5xl origin-bottom px-4 pb-16 pt-28 [transform-style:preserve-3d] md:pb-20 md:pt-32"
                    style={{
                        y: prefersReducedMotion ? 0 : heroContentY,
                        opacity: prefersReducedMotion ? 1 : heroContentOpacity,
                        scale: prefersReducedMotion ? 1 : heroContentScale,
                        rotateX: prefersReducedMotion ? 0 : heroContentRotateX,
                    }}
                >
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
                </motion.div>
            </section>

            <motion.section
                id="b2c-process"
                className="relative z-10 -mt-6 scroll-mt-24 rounded-t-3xl bg-stone-50 px-4 py-14 md:py-20"
                style={{ y: prefersReducedMotion ? 0 : processPanelY }}
            >
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
            </motion.section>

            <section className="border-t border-stone-200 bg-white px-4 py-12">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
                    <p className="text-stone-600">{t('pages.b2c.bottom_prompt')}</p>
                    <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-900 px-8 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-800"
                    >
                        {t('pages.b2c.cta_contact')}
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}

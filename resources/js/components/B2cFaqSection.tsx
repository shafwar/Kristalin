import { KristalinMapEmbed } from '@/components/KristalinMapEmbed';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { JAKARTA_HEAD_OFFICE } from '@/lib/kristalinLocations';
import clsx from 'clsx';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export type B2cFaqItem = {
    id: string;
    question: string;
    answer: string;
    /** Render answer with HTML links */
    rich?: boolean;
};

type B2cFaqSectionProps = {
    kicker: string;
    title: string;
    intro: string;
    items: B2cFaqItem[];
    map: {
        title: string;
        subtitle: string;
        address: string;
    };
    openMapsLabel?: string;
    contactCta: string;
    contactLinkLabel: string;
    contactHref?: string;
    kristalinTvLabel: string;
    kristalinTvUrl: string;
    processAnchorLabel: string;
    onScrollToProcess?: () => void;
    /** Optional closing line above the single CTA */
    footerPrompt?: string;
    revealClassName?: string;
};

function FaqAnswer({ item, processAnchorLabel, onScrollToProcess, kristalinTvLabel, kristalinTvUrl, contactHref, contactLinkLabel }: {
    item: B2cFaqItem;
    processAnchorLabel: string;
    onScrollToProcess?: () => void;
    kristalinTvLabel: string;
    kristalinTvUrl: string;
    contactHref: string;
    contactLinkLabel: string;
}) {
    if (item.id === 'delivery_schedule' && onScrollToProcess) {
        return (
            <p className="text-sm leading-relaxed text-stone-600">
                {item.answer}{' '}
                <button
                    type="button"
                    onClick={onScrollToProcess}
                    className="font-medium text-amber-800 underline decoration-amber-400/60 underline-offset-2 transition-colors hover:text-amber-900"
                >
                    {processAnchorLabel}
                </button>
            </p>
        );
    }

    if (item.id === 'how_to_start') {
        return (
            <p className="text-sm leading-relaxed text-stone-600">
                {item.answer}{' '}
                <Link
                    href={`${contactHref}?subject=b2c`}
                    className="font-medium text-amber-800 underline decoration-amber-400/60 underline-offset-2 transition-colors hover:text-amber-900"
                >
                    {contactLinkLabel}
                </Link>
                .
            </p>
        );
    }

    if (item.id === 'price_disclaimer') {
        return (
            <p className="text-sm leading-relaxed text-stone-600">
                {item.answer}{' '}
                <a
                    href={kristalinTvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-amber-800 underline decoration-amber-400/60 underline-offset-2 transition-colors hover:text-amber-900"
                >
                    {kristalinTvLabel}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
                .
            </p>
        );
    }

    return <p className="text-sm leading-relaxed text-stone-600">{item.answer}</p>;
}

export function B2cFaqSection({
    kicker,
    title,
    intro,
    items,
    map,
    openMapsLabel,
    contactCta,
    contactLinkLabel,
    contactHref = '/contact',
    kristalinTvLabel,
    kristalinTvUrl,
    processAnchorLabel,
    onScrollToProcess,
    footerPrompt,
    revealClassName,
}: B2cFaqSectionProps) {
    const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

    return (
        <section id="b2c-practical" className="scroll-mt-24 border-t border-stone-200 bg-white px-4 py-14 md:py-20">
            <div className="mx-auto max-w-3xl">
                <div data-b2c-reveal className={revealClassName}>
                    <p className="text-center text-sm font-semibold tracking-wide text-amber-700/90 uppercase">{kicker}</p>
                    <h2 className="mt-2 text-center text-2xl font-bold text-stone-900 md:text-3xl">{title}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-center text-stone-600">{intro}</p>
                </div>

                <div className="mt-10 space-y-2" data-b2c-reveal>
                    {items.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <Collapsible
                                key={item.id}
                                open={isOpen}
                                onOpenChange={(open) => setOpenId(open ? item.id : null)}
                                className="overflow-hidden rounded-xl border border-stone-200/90 bg-stone-50/50 transition-colors duration-300 data-[state=open]:border-amber-200/80 data-[state=open]:bg-white"
                            >
                                <CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/80">
                                    <span className="text-sm font-semibold text-stone-900 md:text-base">{item.question}</span>
                                    <ChevronDown
                                        className={clsx(
                                            'h-5 w-5 shrink-0 text-amber-700 transition-transform duration-300 ease-out motion-reduce:transition-none',
                                            isOpen && 'rotate-180',
                                        )}
                                        aria-hidden
                                    />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="overflow-hidden transition-opacity duration-300 ease-out data-[state=closed]:opacity-80 data-[state=open]:opacity-100">
                                    <div className="border-t border-stone-100 px-5 pt-3 pb-5">
                                        <FaqAnswer
                                            item={item}
                                            processAnchorLabel={processAnchorLabel}
                                            onScrollToProcess={onScrollToProcess}
                                            kristalinTvLabel={kristalinTvLabel}
                                            kristalinTvUrl={kristalinTvUrl}
                                            contactHref={contactHref}
                                            contactLinkLabel={contactLinkLabel}
                                        />
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        );
                    })}
                </div>

                <div className="mt-12" data-b2c-reveal>
                    <KristalinMapEmbed
                        location={JAKARTA_HEAD_OFFICE}
                        title={map.title}
                        subtitle={map.subtitle}
                        address={map.address}
                        openMapsLabel={openMapsLabel}
                        tone="light"
                    />
                </div>

                {footerPrompt || contactCta ? (
                    <div className="mt-10 flex flex-col items-center gap-4 text-center" data-b2c-reveal>
                        {footerPrompt ? <p className="max-w-lg text-sm text-stone-600">{footerPrompt}</p> : null}
                        <Link
                            href={`${contactHref}?subject=b2c`}
                            className="inline-flex h-12 items-center justify-center rounded-xl bg-stone-900 px-8 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-800 motion-reduce:hover:translate-y-0"
                        >
                            {contactCta}
                        </Link>
                    </div>
                ) : null}
            </div>
        </section>
    );
}

import { KristalinMapEmbed } from '@/components/KristalinMapEmbed';
import { JAKARTA_HEAD_OFFICE, NABIRE_OPERATIONS, type KristalinLocationId } from '@/lib/kristalinLocations';
import clsx from 'clsx';
import { Building2, Mountain } from 'lucide-react';
import { useState } from 'react';

type KristalinLocationTabsProps = {
    labels: {
        section_kicker: string;
        section_title: string;
        jakarta_tab: string;
        jakarta_title: string;
        jakarta_subtitle: string;
        jakarta_address: string;
        nabire_tab: string;
        nabire_title: string;
        nabire_subtitle: string;
        nabire_address: string;
        nabire_note: string;
        open_maps: string;
    };
    variant?: 'light' | 'dark';
};

const tabs: { id: KristalinLocationId; icon: typeof Building2 }[] = [
    { id: 'jakarta', icon: Building2 },
    { id: 'nabire', icon: Mountain },
];

export function KristalinLocationTabs({ labels, variant = 'dark' }: KristalinLocationTabsProps) {
    const [active, setActive] = useState<KristalinLocationId>('jakarta');
    const isDark = variant === 'dark';

    const tabLabel = (id: KristalinLocationId) => (id === 'jakarta' ? labels.jakarta_tab : labels.nabire_tab);

    return (
        <section className={clsx(isDark ? 'bg-stone-950 py-16 md:py-20' : 'bg-stone-50 py-14 md:py-16')}>
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-10 text-center">
                    <p
                        className={clsx(
                            'mb-3 text-xs font-semibold tracking-[0.2em] uppercase',
                            isDark ? 'text-amber-400/90' : 'text-amber-700/90',
                        )}
                    >
                        {labels.section_kicker}
                    </p>
                    <h2 className={clsx('text-2xl font-bold md:text-3xl', isDark ? 'text-white' : 'text-stone-900')}>{labels.section_title}</h2>
                </div>

                <div
                    className="mb-6 flex flex-wrap justify-center gap-2"
                    role="tablist"
                    aria-label={labels.section_title}
                >
                    {tabs.map(({ id, icon: Icon }) => {
                        const selected = active === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                role="tab"
                                aria-selected={selected}
                                onClick={() => setActive(id)}
                                className={clsx(
                                    'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 motion-reduce:transition-none',
                                    selected
                                        ? isDark
                                            ? 'bg-amber-400 text-stone-900 shadow-lg shadow-amber-400/20'
                                            : 'bg-stone-900 text-white shadow-md'
                                        : isDark
                                          ? 'border border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
                                          : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900',
                                )}
                            >
                                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                                {tabLabel(id)}
                            </button>
                        );
                    })}
                </div>

                <div role="tabpanel" className="mx-auto max-w-4xl">
                    {active === 'jakarta' ? (
                        <KristalinMapEmbed
                            location={JAKARTA_HEAD_OFFICE}
                            title={labels.jakarta_title}
                            subtitle={labels.jakarta_subtitle}
                            address={labels.jakarta_address}
                            openMapsLabel={labels.open_maps}
                            tone="dark"
                        />
                    ) : (
                        <KristalinMapEmbed
                            location={NABIRE_OPERATIONS}
                            title={labels.nabire_title}
                            subtitle={labels.nabire_subtitle}
                            address={labels.nabire_address}
                            note={labels.nabire_note}
                            openMapsLabel={labels.open_maps}
                            tone="dark"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

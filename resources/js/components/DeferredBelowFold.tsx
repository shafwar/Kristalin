import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    /** When false, children render immediately */
    enabled: boolean;
    /** Reserve space to limit CLS while waiting */
    className?: string;
    rootMargin?: string;
};

/**
 * Mounts children only after near-viewport intersection when `enabled`.
 * Used on homepage to avoid competing image requests on slow connections.
 */
export function DeferredBelowFold({ children, enabled, className, rootMargin = '280px' }: Props) {
    const [show, setShow] = useState(!enabled);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enabled) {
            setShow(true);
            return;
        }
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setShow(true);
                }
            },
            { rootMargin },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [enabled, rootMargin]);

    return (
        <div ref={ref} className={className}>
            {show ? children : (
                <div
                    className="min-h-[min(72vh,520px)] w-full animate-pulse bg-gradient-to-b from-slate-100 to-slate-200/90 lg:min-h-[min(50vh,420px)]"
                    aria-hidden
                />
            )}
        </div>
    );
}

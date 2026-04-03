import { useEffect, useLayoutEffect, useState } from 'react';

function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fires `true` after two animation frames so first paint / LCP can complete
 * before CSS transitions on transform run. Skips delay when user prefers reduced motion.
 */
export function useLcpSafeMicroMotion(): boolean {
    const [ready, setReady] = useState(false);

    useLayoutEffect(() => {
        if (prefersReducedMotion()) {
            setReady(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || prefersReducedMotion()) {
            return;
        }
        let raf1 = 0;
        let raf2 = 0;
        raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
                setReady(true);
            });
        });
        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
        };
    }, []);

    return ready;
}

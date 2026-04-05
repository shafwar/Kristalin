import { useEffect, useRef, useState } from 'react';

const OVERLAY = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))';

/**
 * Defers loading a heavy CSS background image until the section is near the viewport.
 * Keeps the same dark overlay immediately (no layout shift); photo fades in when loaded.
 */
export function useLazySectionBackground(imageUrl: string, rootMargin = '450px') {
    const ref = useRef<HTMLElement | null>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || active) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActive(true);
                    io.disconnect();
                }
            },
            { rootMargin, threshold: 0 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [imageUrl, active, rootMargin]);

    return {
        ref,
        backgroundImage: active ? `${OVERLAY}, url('${imageUrl}')` : OVERLAY,
    };
}

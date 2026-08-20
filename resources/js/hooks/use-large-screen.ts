import { useEffect, useState } from 'react';

const LG_BREAKPOINT = 1024;

/** Matches Tailwind `lg:` — desktop split layout for milestones etc. */
export function useIsLargeScreen() {
    const [isLarge, setIsLarge] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= LG_BREAKPOINT;
        }
        return true;
    });

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
        const onChange = () => setIsLarge(mql.matches);
        mql.addEventListener('change', onChange);
        setIsLarge(mql.matches);
        return () => mql.removeEventListener('change', onChange);
    }, []);

    return isLarge;
}

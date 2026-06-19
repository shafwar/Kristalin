import { useEffect, useState } from 'react';

const LG_BREAKPOINT = 1024;

/** Matches Tailwind `lg:` — desktop split layout for milestones etc. */
export function useIsLargeScreen() {
    const [isLarge, setIsLarge] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
        const onChange = () => setIsLarge(mql.matches);
        mql.addEventListener('change', onChange);
        onChange();
        return () => mql.removeEventListener('change', onChange);
    }, []);

    return isLarge;
}

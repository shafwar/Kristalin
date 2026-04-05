import { useEffect, useState } from 'react';

export type NetworkImageTier = 'full' | 'conserve' | 'minimal';

type NetworkInformation = EventTarget & {
    saveData?: boolean;
    effectiveType?: string;
    /** Megabits per second (when supported). */
    downlink?: number;
    addEventListener(type: 'change', listener: () => void): void;
    removeEventListener(type: 'change', listener: () => void): void;
};

function readNetworkHints(): { imageTier: NetworkImageTier; deferWelcomeBelowFold: boolean } {
    if (typeof window === 'undefined') {
        return { imageTier: 'full', deferWelcomeBelowFold: false };
    }
    if (window.matchMedia?.('(prefers-reduced-data: reduce)').matches) {
        return { imageTier: 'minimal', deferWelcomeBelowFold: true };
    }
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (!conn) {
        return { imageTier: 'full', deferWelcomeBelowFold: false };
    }
    const saveData = conn.saveData === true;
    const et = conn.effectiveType ?? '4g';
    if (saveData || et === 'slow-2g' || et === '2g') {
        return { imageTier: 'minimal', deferWelcomeBelowFold: true };
    }
    if (et === '3g') {
        return { imageTier: 'conserve', deferWelcomeBelowFold: true };
    }
    // Downlink = Mbps (when exposed). Catches some slow Wi‑Fi / tethering; DevTools throttling may not update this.
    const downlink = typeof conn.downlink === 'number' ? conn.downlink : undefined;
    if (downlink !== undefined) {
        if (downlink < 0.45) {
            return { imageTier: 'minimal', deferWelcomeBelowFold: true };
        }
        if (downlink < 1.6) {
            return { imageTier: 'conserve', deferWelcomeBelowFold: true };
        }
    }
    return { imageTier: 'full', deferWelcomeBelowFold: false };
}

/**
 * Client-side network hint for adaptive images & deferred work.
 * iOS Safari often omits Network Information API → defaults to `full`.
 */
export function useNetworkProfile(): {
    imageTier: NetworkImageTier;
    deferWelcomeBelowFold: boolean;
} {
    const [state, setState] = useState(readNetworkHints);

    useEffect(() => {
        const compute = () => setState(readNetworkHints());

        compute();
        const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
        conn?.addEventListener('change', compute);
        const mq = window.matchMedia?.('(prefers-reduced-data: reduce)');
        mq?.addEventListener('change', compute);

        return () => {
            conn?.removeEventListener('change', compute);
            mq?.removeEventListener('change', compute);
        };
    }, []);

    return state;
}

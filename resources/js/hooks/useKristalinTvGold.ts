import { useCallback, useEffect, useRef, useState } from 'react';

export type KristalinTvMarket = {
    success?: boolean;
    gold_idr_per_gram?: number;
    usd_idr?: number;
    sgd_idr?: number;
    updated_at?: string;
};

export type KristalinTvBrandRow = {
    sell: number;
    buy: number;
};

export type KristalinTvBrand = {
    brand: string;
    rows: Record<string, KristalinTvBrandRow>;
};

export type KristalinTvBrandPrices = {
    success?: boolean;
    updated_at?: string;
    brands?: KristalinTvBrand[];
};

export type KristalinTvGoldState = {
    market: KristalinTvMarket | null;
    brandPrices: KristalinTvBrandPrices | null;
    loading: boolean;
    error: boolean;
    stale: boolean;
    refresh: () => void;
};

const POLL_MS = 20_000;

async function fetchJson<T>(url: string): Promise<{ data: T; stale: boolean }> {
    const res = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    const data = (await res.json()) as T;
    return { data, stale: res.headers.get('X-Kristalin-TV-Stale') === '1' };
}

export function getBestSell1g(brands: KristalinTvBrand[] | undefined): { brand: string; sell: number } | null {
    if (!brands?.length) return null;
    let best: { brand: string; sell: number } | null = null;
    for (const entry of brands) {
        const sell = entry.rows?.['1']?.sell ?? 0;
        if (sell > 0 && (!best || sell < best.sell)) {
            best = { brand: entry.brand, sell };
        }
    }
    return best;
}

export function formatIdr(value: number, compact = false): string {
    if (!Number.isFinite(value) || value <= 0) return '—';
    if (compact && value >= 1_000_000) {
        const jt = value / 1_000_000;
        const formatted = jt >= 10 ? jt.toFixed(1) : jt.toFixed(2);
        return `Rp ${formatted.replace('.', ',')} jt`;
    }
    const amount = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value);
    return `Rp ${amount}`;
}

/** Numeric amount only (Indonesian grouping) — for stacked Rp + value layouts */
export function formatIdrAmount(value: number): string {
    if (!Number.isFinite(value) || value <= 0) return '—';
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value);
}

export function useKristalinTvGold(enabled = true): KristalinTvGoldState {
    const [market, setMarket] = useState<KristalinTvMarket | null>(null);
    const [brandPrices, setBrandPrices] = useState<KristalinTvBrandPrices | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [stale, setStale] = useState(false);
    const mountedRef = useRef(true);

    const load = useCallback(async () => {
        if (!enabled) return;
        try {
            const [marketRes, brandsRes] = await Promise.all([
                fetchJson<KristalinTvMarket>('/api/kristalin-tv/gold'),
                fetchJson<KristalinTvBrandPrices>('/api/kristalin-tv/gold-prices'),
            ]);
            if (!mountedRef.current) return;
            setMarket(marketRes.data);
            setBrandPrices(brandsRes.data);
            setStale(marketRes.stale || brandsRes.stale);
            setError(false);
        } catch {
            if (!mountedRef.current) return;
            setError(true);
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, [enabled]);

    useEffect(() => {
        mountedRef.current = true;
        if (!enabled) {
            setLoading(false);
            return;
        }
        void load();
        const id = window.setInterval(() => void load(), POLL_MS);
        return () => {
            mountedRef.current = false;
            window.clearInterval(id);
        };
    }, [enabled, load]);

    return { market, brandPrices, loading, error, stale, refresh: load };
}

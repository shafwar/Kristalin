import { useState, useLayoutEffect, useEffect, useRef, useCallback } from "react";
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useLcpSafeMicroMotion() {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      setReady(true);
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) {
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
const POLL_MS = 6e4;
async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  return { data, stale: res.headers.get("X-Kristalin-TV-Stale") === "1" };
}
function getBestSell1g(brands) {
  var _a, _b;
  if (!(brands == null ? void 0 : brands.length)) return null;
  let best = null;
  for (const entry of brands) {
    const sell = ((_b = (_a = entry.rows) == null ? void 0 : _a["1"]) == null ? void 0 : _b.sell) ?? 0;
    if (sell > 0 && (!best || sell < best.sell)) {
      best = { brand: entry.brand, sell };
    }
  }
  return best;
}
function formatIdr(value, compact = false) {
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (compact && value >= 1e6) {
    const jt = value / 1e6;
    const formatted = jt >= 10 ? jt.toFixed(1) : jt.toFixed(2);
    return `Rp ${formatted.replace(".", ",")} jt`;
  }
  const amount = formatIdrAmount(value, 0);
  return `Rp ${amount}`;
}
function formatIdrAmount(value, fractionDigits = 0) {
  if (!Number.isFinite(value) || value <= 0) return "—";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
}
function useKristalinTvGold(enabled = true) {
  const [market, setMarket] = useState(null);
  const [brandPrices, setBrandPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stale, setStale] = useState(false);
  const mountedRef = useRef(true);
  const load = useCallback(async () => {
    if (!enabled) return;
    try {
      const [marketRes, brandsRes] = await Promise.all([
        fetchJson("/api/kristalin-tv/gold"),
        fetchJson("/api/kristalin-tv/gold-prices")
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
export {
  formatIdr as a,
  useLcpSafeMicroMotion as b,
  formatIdrAmount as f,
  getBestSell1g as g,
  useKristalinTvGold as u
};

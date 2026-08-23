import { useState, useLayoutEffect, useEffect, useRef, useCallback, useMemo } from "react";
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
const LS_MARKET_KEY = "kristalin_gold_market_cache_v1";
const LS_BRANDS_KEY = "kristalin_gold_brands_cache_v1";
async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  return { data, stale: res.headers.get("X-Kristalin-TV-Stale") === "1" || (data == null ? void 0 : data.stale) === true };
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
function formatRelativeTime(isoString) {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const diffSec = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1e3));
    if (diffSec < 60) return "beberapa detik lalu";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} menit lalu`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " WIB";
  } catch {
    return "";
  }
}
function useKristalinTvGold(enabled = true) {
  const [market, setMarket] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(LS_MARKET_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [brandPrices, setBrandPrices] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(LS_BRANDS_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(!market);
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
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(LS_MARKET_KEY, JSON.stringify(marketRes.data));
          localStorage.setItem(LS_BRANDS_KEY, JSON.stringify(brandsRes.data));
        } catch {
        }
      }
    } catch {
      if (!mountedRef.current) return;
      if (market || brandPrices) {
        setStale(true);
        setError(false);
      } else {
        setError(true);
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [enabled, market, brandPrices]);
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
  const sourceName = useMemo(() => {
    return (market == null ? void 0 : market.source) || (brandPrices == null ? void 0 : brandPrices.source) || "Kristalin TV (Live Reference)";
  }, [market, brandPrices]);
  const lastUpdatedText = useMemo(() => {
    const timeStr = (market == null ? void 0 : market.updated_at) || (brandPrices == null ? void 0 : brandPrices.updated_at);
    return formatRelativeTime(timeStr);
  }, [market, brandPrices]);
  return {
    market,
    brandPrices,
    loading: loading && !market,
    error: error && !market,
    stale: stale || (market == null ? void 0 : market.stale) === true,
    lastUpdatedText,
    sourceName,
    refresh: load
  };
}
export {
  formatIdr as a,
  useLcpSafeMicroMotion as b,
  formatIdrAmount as f,
  getBestSell1g as g,
  useKristalinTvGold as u
};

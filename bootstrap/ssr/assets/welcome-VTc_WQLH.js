import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useKristalinTvGold, g as getBestSell1g, f as formatIdrAmount, b as useLcpSafeMicroMotion } from "./useKristalinTvGold-BKHryome.js";
import { u as useNetworkProfile } from "./useNetworkProfile-BaMceDYv.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { Head, Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, ExternalLink, Coins, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { P as PapuaChildrenHeroPicture } from "./PapuaChildrenHeroPicture-D2Fa_1ZV.js";
import gsap from "gsap";
import { W as WelcomeGridPicture } from "./WelcomeGridPicture-BBBlV399.js";
import { E as EsmdVerificationBadge } from "./EsmdVerificationModal-MI5BXMrn.js";
import "react-dom";
function DeferredBelowFold({ children, enabled, className, rootMargin = "280px" }) {
  const [show, setShow] = useState(!enabled);
  const ref = useRef(null);
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
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, rootMargin]);
  return /* @__PURE__ */ jsx("div", { ref, className, children: show ? children : /* @__PURE__ */ jsx(
    "div",
    {
      className: "min-h-[min(72vh,520px)] w-full animate-pulse bg-gradient-to-b from-slate-100 to-slate-200/90 lg:min-h-[min(50vh,420px)]",
      "aria-hidden": true
    }
  ) });
}
const JAKARTA_TZ = "Asia/Jakarta";
function localeTag(siteLocale) {
  if (siteLocale === "id") return "id-ID";
  if (siteLocale === "zh") return "zh-CN";
  return "en-GB";
}
function useJakartaClock(siteLocale) {
  const [now, setNow] = useState(() => /* @__PURE__ */ new Date());
  useEffect(() => {
    const tick = () => setNow(/* @__PURE__ */ new Date());
    tick();
    const id = window.setInterval(tick, 1e3);
    return () => window.clearInterval(id);
  }, []);
  const tag = localeTag(siteLocale);
  const date = new Intl.DateTimeFormat(tag, {
    timeZone: JAKARTA_TZ,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(now);
  const timeRaw = new Intl.DateTimeFormat("id-ID", {
    timeZone: JAKARTA_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);
  return {
    date,
    time: `${timeRaw} WIB`,
    zone: JAKARTA_TZ
  };
}
const LIVEGOLD_URL = "https://livegold-kristalintv.com/";
function KristalinTvGoldCard({ className, onMouseEnter, onMouseLeave, hovered }) {
  const { t, locale } = useTranslation();
  const { market, brandPrices, loading, error, stale, refresh } = useKristalinTvGold(true);
  const { date, time, zone } = useJakartaClock(locale);
  const worldGram = (market == null ? void 0 : market.gold_idr_per_gram) ?? 0;
  const best = getBestSell1g(brandPrices == null ? void 0 : brandPrices.brands);
  const hasData = worldGram > 0 || best !== null;
  const isGoldOrg = (market == null ? void 0 : market.source) === "gold.org";
  const targetUrl = isGoldOrg ? "https://goldprice.org/gold-price-indonesia.html" : LIVEGOLD_URL;
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: targetUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": t("pages.welcome.gold_live.card_aria"),
      className: `gold-card-root group relative flex w-full cursor-pointer flex-col overflow-hidden no-underline lg:h-auto lg:w-1/4 lg:min-h-0 lg:flex-1 ${className ?? ""}`,
      onMouseEnter,
      onMouseLeave,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#07111f] transition-transform duration-500 ease-out group-hover:scale-[1.02] lg:origin-center" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-55",
            style: {
              background: "radial-gradient(circle at 20% 0%, rgba(255,211,107,.22), transparent 45%), radial-gradient(circle at 100% 100%, rgba(78,161,255,.12), transparent 40%)"
            },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent", "aria-hidden": true }),
        /* @__PURE__ */ jsxs("div", { className: "gold-card-inner relative z-10 flex flex-col gap-3 p-4 sm:gap-4 sm:p-5 lg:h-full lg:min-h-0 lg:gap-0 lg:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 lg:mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `h-2 w-2 shrink-0 rounded-full ${error ? "bg-red-400" : hasData ? "animate-pulse bg-emerald-400" : "bg-amber-400/70"}`,
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.18em] text-amber-300/95 uppercase sm:text-[11px]", children: isGoldOrg ? "GOLD.ORG · LIVE" : t("pages.welcome.gold_live.kicker") }),
              stale && /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-medium text-white/70", children: t("pages.welcome.gold_live.stale") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "shrink-0 leading-tight sm:text-right", "aria-live": "polite", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-semibold text-amber-100/90 capitalize sm:text-[10px]", children: date }),
              /* @__PURE__ */ jsx("p", { className: "mt-0.5 font-mono text-sm font-bold tracking-wide text-white tabular-nums sm:text-base", children: time }),
              /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[9px] text-slate-400", children: zone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "gold-card-body flex shrink-0 flex-col gap-3 lg:min-h-0 lg:flex-1 lg:gap-0", children: [
            /* @__PURE__ */ jsx("div", { children: loading && !hasData ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx("div", { className: "h-5 w-28 animate-pulse rounded-full bg-white/10" }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-8 w-4/5 animate-pulse rounded-lg bg-white/10" }),
              /* @__PURE__ */ jsx("div", { className: "h-4 w-1/2 animate-pulse rounded bg-white/10" })
            ] }) : error && !hasData ? /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-slate-900 uppercase sm:text-[10px]", children: t("pages.welcome.gold_live.world_price") }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-400", children: t("pages.welcome.gold_live.offline") }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void refresh();
                  },
                  className: "relative z-20 mt-2 cursor-pointer text-xs font-semibold text-amber-300 underline-offset-2 hover:underline",
                  children: t("pages.welcome.gold_live.retry")
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-slate-900 uppercase sm:text-[10px]", children: t("pages.welcome.gold_live.world_price") }),
              /* @__PURE__ */ jsxs("div", { className: "gold-card-price-row mt-2 flex min-w-0 max-w-full flex-wrap items-baseline gap-x-1.5 gap-y-0.5", children: [
                /* @__PURE__ */ jsxs("p", { className: "gold-card-price-main min-w-0 font-bold text-amber-50 tabular-nums", children: [
                  /* @__PURE__ */ jsx("span", { className: "mr-1 text-[0.62em] font-semibold text-amber-200/90", children: "Rp" }),
                  /* @__PURE__ */ jsx("span", { children: formatIdrAmount(worldGram, 2) })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "gold-card-price-unit shrink-0 font-semibold text-amber-200/85 tabular-nums", children: t("pages.welcome.gold_live.per_gram_short") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5 sm:mt-3", children: [
                (market == null ? void 0 : market.usd_idr) ? /* @__PURE__ */ jsxs("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tabular-nums text-slate-200", children: [
                  "USD ",
                  new Intl.NumberFormat("id-ID").format(Math.round(market.usd_idr))
                ] }) : null,
                (market == null ? void 0 : market.sgd_idr) ? /* @__PURE__ */ jsxs("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tabular-nums text-slate-200", children: [
                  "SGD ",
                  new Intl.NumberFormat("id-ID").format(Math.round(market.sgd_idr))
                ] }) : null
              ] })
            ] }) }),
            best && /* @__PURE__ */ jsx("div", { className: "shrink-0 rounded-xl border border-amber-400/25 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 p-2.5 sm:p-3 lg:mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold tracking-wide text-amber-200/90 uppercase", children: t("pages.welcome.gold_live.best_sell") }),
                /* @__PURE__ */ jsx("p", { className: "mt-0.5 truncate text-xs font-bold text-white", children: best.brand }),
                /* @__PURE__ */ jsxs("p", { className: "gold-card-price-sub mt-0.5 min-w-0 max-w-full font-bold text-amber-300 tabular-nums", children: [
                  /* @__PURE__ */ jsx("span", { className: "mr-0.5 text-[0.72em] font-semibold text-amber-200/80", children: "Rp" }),
                  /* @__PURE__ */ jsx("span", { children: formatIdrAmount(best.sell, 0) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold text-amber-200", children: "1g" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `shrink-0 border-t border-white/10 pt-2.5 sm:pt-3 lg:mt-auto lg:pt-3 ${hovered ? "lg:translate-x-1" : ""} transition-transform duration-200`,
              children: [
                /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs font-bold text-white sm:text-sm", children: [
                  /* @__PURE__ */ jsx(TrendingUp, { className: "h-3.5 w-3.5 shrink-0 text-amber-300", "aria-hidden": true }),
                  isGoldOrg ? "Gold.org" : t("pages.welcome.gold_live.card_title")
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-300/90 underline underline-offset-2 sm:text-xs", children: [
                  t("pages.welcome.gold_live.card_cta"),
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 shrink-0 opacity-70", "aria-hidden": true })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function SplashScreen({
  minDurationMs = 2e3,
  fadeDurationMs = 900,
  onDone
}) {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("splash_played");
    }
    return false;
  });
  const containerRef = useRef(null);
  const baseLogoRef = useRef(null);
  const colorLogoWrapperRef = useRef(null);
  useEffect(() => {
    if (!visible) {
      onDone == null ? void 0 : onDone();
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(baseLogoRef.current, { opacity: 0, scale: 0.96, filter: "blur(8px)" });
      gsap.set(colorLogoWrapperRef.current, { clipPath: "inset(0% 100% 0% 0%)" });
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: fadeDurationMs / 1e3,
            ease: "power4.inOut",
            delay: 0.4,
            onComplete: () => {
              if (typeof window !== "undefined") {
                sessionStorage.setItem("splash_played", "true");
              }
              setVisible(false);
              onDone == null ? void 0 : onDone();
            }
          });
        }
      });
      tl.to(baseLogoRef.current, {
        opacity: 0.15,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out"
      }).to(colorLogoWrapperRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "power3.inOut"
      }, "-=0.4");
    }, containerRef);
    return () => ctx.revert();
  }, [fadeDurationMs, onDone]);
  if (!visible) return null;
  const logoSrc = imageUrl("Kristalin-New-Logo.webp");
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: "fixed inset-0 z-[99999] flex items-center justify-center bg-[#FCFCFC]",
      children: /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center", style: { transform: "translateY(-5vh)" }, children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            ref: baseLogoRef,
            src: logoSrc,
            alt: "Kristalin Ekalestari",
            className: "w-auto h-auto max-w-[85vw] max-h-16 sm:max-h-none sm:h-24 md:h-28 object-contain grayscale opacity-20",
            style: { willChange: "transform, opacity, filter" }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: colorLogoWrapperRef,
            className: "absolute inset-0 z-10 flex items-center justify-center",
            style: { willChange: "clip-path" },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: logoSrc,
                alt: "Kristalin Full Color",
                className: "w-auto h-auto max-w-[85vw] max-h-16 sm:max-h-none sm:h-24 md:h-28 object-contain drop-shadow-sm"
              }
            )
          }
        )
      ] })
    }
  );
}
const Welcome = () => {
  const { t } = useTranslation();
  const { deferWelcomeBelowFold } = useNetworkProfile();
  const heroMicroReady = useLcpSafeMicroMotion();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentContent, setCurrentContent] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 768 : false);
  const newsItems = [
    {
      id: "feb26-1",
      date: "10 Feb 2026",
      title: t("pages.welcome.news.items.feb26-1.title"),
      excerpt: t("pages.welcome.news.items.feb26-1.excerpt"),
      image: imageUrl("/february-news-01.jpg"),
      url: "/news/feb26-1",
      priority: "high"
    },
    {
      id: "feb26-2",
      date: "4 Feb 2026",
      title: t("pages.welcome.news.items.feb26-2.title"),
      excerpt: t("pages.welcome.news.items.feb26-2.excerpt"),
      image: imageUrl("/News-february-2.jpg"),
      url: "/news/feb26-2",
      priority: "high"
    },
    {
      id: "feb26-3",
      date: "22 Feb 2026",
      title: t("pages.welcome.news.items.feb26-3.title"),
      excerpt: t("pages.welcome.news.items.feb26-3.excerpt"),
      image: imageUrl("/news-3-february.jpg"),
      url: "/news/feb26-3",
      priority: "high"
    },
    {
      id: "feb26-4",
      date: "24 Feb 2026",
      title: t("pages.welcome.news.items.feb26-4.title"),
      excerpt: t("pages.welcome.news.items.feb26-4.excerpt"),
      image: imageUrl("/news-4-february.jpg"),
      url: "/news/feb26-4",
      priority: "high"
    },
    {
      id: "mar26-1",
      date: "6 Mar 2026",
      title: t("pages.welcome.news.items.mar26-1.title"),
      excerpt: t("pages.welcome.news.items.mar26-1.excerpt"),
      image: imageUrl("/maret-news-1.jpeg"),
      url: "/news/mar26-1",
      priority: "high"
    },
    {
      id: "apr26-1",
      date: "11 Apr 2026",
      title: t("pages.welcome.news.items.apr26-1.title"),
      excerpt: t("pages.welcome.news.items.apr26-1.excerpt"),
      image: imageUrl("/kristalin-news-april-1.jpeg"),
      url: "/news/apr26-1",
      priority: "high"
    },
    {
      id: "dec-3",
      date: "10 Dec 2025",
      title: t("pages.welcome.news.items.dec-3.title"),
      excerpt: t("pages.welcome.news.items.dec-3.excerpt"),
      image: imageUrl("metronews_desember.jpeg"),
      url: "/news/dec-3",
      priority: "high"
    },
    {
      id: "sept-1",
      date: "1 Sep 2025",
      title: t("pages.welcome.news.items.sept-1.title"),
      excerpt: t("pages.welcome.news.items.sept-1.excerpt"),
      image: imageUrl("sept1.jpg"),
      url: "/news/sept-1",
      priority: "high"
    },
    {
      id: "jul-1",
      date: "15 Jul 2025",
      title: t("pages.welcome.news.items.jul-1.title"),
      excerpt: t("pages.welcome.news.items.jul-1.excerpt"),
      image: imageUrl("sembako.jpg"),
      url: "/news/jul-1",
      priority: "medium"
    },
    {
      id: "aug-2",
      date: "19 Aug 2025",
      title: t("pages.welcome.news.items.aug-2.title"),
      excerpt: t("pages.welcome.news.items.aug-2.excerpt"),
      image: imageUrl("agus2.jpg"),
      url: "/news/aug-2",
      priority: "medium"
    },
    {
      id: "feb-4",
      date: "3 Feb 2025",
      title: t("pages.welcome.news.items.feb-4.title"),
      excerpt: t("pages.welcome.news.items.feb-4.excerpt"),
      image: imageUrl("buruharian2.webp"),
      url: "/news/feb-4",
      priority: "medium"
    }
  ];
  const carouselSlides = [
    {
      id: 1,
      gridId: "directorshero",
      category: t("pages.welcome.board.category"),
      title: t("pages.welcome.board.title"),
      link: "/board-of-directors"
    },
    {
      id: 0,
      gridId: "portofolio",
      category: t("pages.welcome.portfolio.category"),
      title: t("pages.welcome.portfolio.title"),
      link: "/line-of-business"
    }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 14e3);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 8e3);
    return () => clearInterval(interval);
  }, [newsItems.length]);
  const contentSets = useMemo(
    () => [
      {
        title1: t("pages.welcome.content_set_1.title1"),
        title2: t("pages.welcome.content_set_1.title2"),
        subtitle: t("pages.welcome.content_set_1.subtitle"),
        kicker: t("pages.welcome.content_set_1.kicker"),
        description: t("pages.welcome.content_set_1.description")
      },
      {
        title1: t("pages.welcome.content_set_2.title1"),
        title2: t("pages.welcome.content_set_2.title2"),
        subtitle: t("pages.welcome.content_set_2.subtitle"),
        kicker: t("pages.welcome.content_set_2.kicker"),
        description: t("pages.welcome.content_set_2.description")
      }
    ],
    [t]
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContent((prev) => (prev + 1) % contentSets.length);
    }, 14e3);
    return () => clearInterval(interval);
  }, [contentSets.length]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { title: "PT Kristalin Ekalestari | Sustainable Gold Mining & Mineral Refining", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "PT Kristalin Ekalestari adalah perusahaan pertambangan emas dan pengolahan mineral terkemuka di Indonesia sejak 1989. Beroperasi dengan izin resmi IUP Operasi Produksi No. 561/2021/DESDM di Nabire, Papua Barat." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "PT Kristalin Ekalestari | Sustainable Gold Mining & Mineral Refining" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "PT Kristalin Ekalestari adalah perusahaan pertambangan emas dan pengolahan mineral terkemuka di Indonesia sejak 1989. Beroperasi dengan izin resmi IUP Operasi Produksi No. 561/2021/DESDM di Nabire, Papua Barat." })
    ] }),
    /* @__PURE__ */ jsx(SplashScreen, {}),
    /* @__PURE__ */ jsxs("div", { className: "welcome-page relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
      /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col overflow-hidden pt-16 sm:pt-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsxs("section", { className: "flex h-auto flex-col lg:h-[48vh] lg:flex-row", children: [
          /* @__PURE__ */ jsx("div", { className: "relative flex h-full w-full min-w-0 flex-col justify-center overflow-hidden bg-white p-6 sm:p-8 lg:w-1/2 lg:p-8 xl:p-12 2xl:p-16", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: `relative z-10 min-w-0 welcome-hero-micro ${heroMicroReady ? "welcome-hero-micro--ready" : ""}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "relative", children: isMobile ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "welcome-hero-nudge welcome-hero-nudge--a", children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-3 flex justify-center lg:justify-start", children: /* @__PURE__ */ jsx(EsmdVerificationBadge, { variant: "compact" }) }),
                  /* @__PURE__ */ jsx("p", { className: "mb-3 text-center text-[11px] font-semibold tracking-[0.2em] text-amber-600/90 uppercase sm:text-xs lg:mb-3 lg:text-left", children: contentSets[currentContent].kicker }),
                  /* @__PURE__ */ jsxs("h1", { className: "mb-4 text-center text-2xl leading-tight font-bold sm:mb-5 sm:text-center sm:text-3xl lg:mb-4 lg:text-left lg:text-3xl xl:text-4xl 2xl:text-5xl", children: [
                    /* @__PURE__ */ jsx("div", { className: "inline-block text-gray-800", children: contentSets[currentContent].title1 }),
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "inline-block",
                        style: {
                          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text"
                        },
                        children: contentSets[currentContent].title2
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mb-3 text-center text-sm font-medium text-gray-700 sm:mb-4 sm:text-center sm:text-base lg:mb-3 lg:text-left lg:text-base xl:text-lg", children: contentSets[currentContent].subtitle }),
                  /* @__PURE__ */ jsx("p", { className: "mx-auto mb-5 max-w-md text-center text-sm leading-relaxed text-gray-500 sm:mb-6 lg:mx-0 lg:max-w-lg lg:text-left lg:text-[0.9375rem]", children: contentSets[currentContent].description })
                ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-3.5 flex justify-start", children: /* @__PURE__ */ jsx(EsmdVerificationBadge, { variant: "compact" }) }),
                  /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 1, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -6 },
                      transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
                      children: [
                        /* @__PURE__ */ jsx("p", { className: "mb-3 text-center text-[11px] font-semibold tracking-[0.2em] text-amber-600/90 uppercase sm:text-xs lg:mb-3 lg:text-left", children: contentSets[currentContent].kicker }),
                        /* @__PURE__ */ jsxs("h1", { className: "mb-4 text-center text-2xl leading-tight font-bold sm:mb-5 sm:text-center sm:text-3xl lg:mb-4 lg:text-left lg:text-3xl xl:text-4xl 2xl:text-5xl", children: [
                          /* @__PURE__ */ jsx("div", { className: "inline-block text-gray-800", children: contentSets[currentContent].title1 }),
                          /* @__PURE__ */ jsx("br", {}),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "inline-block",
                              style: {
                                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text"
                              },
                              children: contentSets[currentContent].title2
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "mb-3 text-center text-sm font-medium text-gray-700 sm:mb-4 sm:text-center sm:text-base lg:mb-3 lg:text-left lg:text-base xl:text-lg", children: contentSets[currentContent].subtitle }),
                        /* @__PURE__ */ jsx("p", { className: "mx-auto mb-5 max-w-md text-center text-sm leading-relaxed text-gray-500 sm:mb-6 lg:mx-0 lg:max-w-lg lg:text-left lg:text-[0.9375rem]", children: contentSets[currentContent].description })
                      ]
                    },
                    currentContent
                  ) })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "mt-5 w-full min-w-0 sm:mt-6", children: /* @__PURE__ */ jsxs("div", { className: "button-container flex w-full min-w-0 flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: "/about#about-kristalin",
                      prefetch: false,
                      className: "hero-cta-btn hero-cta-btn--primary inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border-2 border-transparent bg-gradient-to-r from-yellow-400 to-amber-500 px-5 text-sm font-semibold text-gray-900 shadow-lg sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-6 sm:text-base",
                      children: t("pages.welcome.buttons.learn_more")
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: "/milestones",
                      prefetch: false,
                      className: "hero-cta-btn hero-cta-btn--outline md:hidden inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border-2 border-yellow-400 bg-white px-5 text-sm font-semibold text-gray-800 sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-6 sm:text-base",
                      children: t("pages.welcome.buttons.see_milestones")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: "/b2c",
                      prefetch: false,
                      className: "hero-cta-btn hero-cta-btn--outline hidden md:inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border-2 border-yellow-400 bg-white px-5 text-sm font-semibold text-gray-800 sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-6 sm:text-base",
                      children: [
                        /* @__PURE__ */ jsx(Coins, { className: "mr-2 h-4 w-4 sm:h-5 sm:w-5 text-amber-500", strokeWidth: 2 }),
                        "B2C Gold Program"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "https://www.instagram.com/kristalin_ekalestari/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": t("common.follow_us"),
                      className: "hero-cta-btn hero-cta-btn--ghost inline-flex h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 shadow-md sm:h-12 sm:w-auto sm:min-w-[180px] sm:px-5 sm:text-base",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 shrink-0 sm:h-5 sm:w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) }),
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: t("common.follow_us") })
                      ]
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "relative" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/csr",
              className: `relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-full lg:w-1/2 lg:p-12 ${heroMicroReady ? "welcome-csr-hover-ready" : ""}`,
              onMouseEnter: () => setHoveredCard(4),
              onMouseLeave: () => setHoveredCard(null),
              children: [
                /* @__PURE__ */ jsx(
                  PapuaChildrenHeroPicture,
                  {
                    pictureClassName: "absolute inset-0 block h-full w-full",
                    className: `welcome-lcp-hero h-full w-full object-cover transform will-change-auto lg:origin-center ${hoveredCard === 4 ? "lg:scale-105" : "scale-100"}`,
                    style: {
                      objectPosition: "center center",
                      backfaceVisibility: "hidden"
                    },
                    alt: "CSR Impact in Papua",
                    loading: "eager",
                    fetchPriority: "high",
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                    }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm", children: t("pages.welcome.csr.category") }),
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      className: `mb-4 text-2xl leading-tight font-bold transition-transform duration-200 sm:text-3xl lg:text-4xl ${hoveredCard === 4 ? "lg:translate-x-2" : "translate-x-0"}`,
                      children: t("pages.welcome.csr.title")
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `text-base font-medium underline transition-colors duration-200 ${hoveredCard === 4 ? "text-yellow-400" : "text-white"}`,
                      children: t("pages.welcome.buttons.discover_more")
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(DeferredBelowFold, { enabled: deferWelcomeBelowFold, className: "flex min-h-0 flex-1 flex-col", children: /* @__PURE__ */ jsxs("section", { className: "flex flex-1 flex-col bg-white", children: [
          /* @__PURE__ */ jsx("div", { className: "flex w-full md:hidden shrink-0 justify-center border-b border-stone-100/90 bg-gradient-to-b from-stone-50/60 to-white px-4 py-4 sm:px-6 sm:py-5 lg:py-7", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/b2c",
              className: "group relative flex w-full max-w-4xl flex-col gap-4 overflow-hidden rounded-2xl border border-stone-200/75 bg-gradient-to-br from-white via-white to-amber-50/[0.35] px-5 py-5 no-underline shadow-[0_1px_0_rgba(15,23,42,0.04),0_14px_44px_-18px_rgba(15,23,42,0.13)] ring-1 ring-stone-900/[0.03] transition-all duration-300 max-sm:from-white max-sm:via-white max-sm:to-white max-sm:border-stone-200/65 max-sm:shadow-sm max-sm:hover:border-stone-300/80 max-sm:hover:shadow-md hover:border-amber-200/70 hover:shadow-[0_1px_0_rgba(15,23,42,0.04),0_20px_50px_-18px_rgba(15,23,42,0.16)] sm:gap-5 sm:px-7 sm:py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-6",
              "aria-labelledby": "welcome-b2c-teaser-heading",
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "pointer-events-none absolute top-0 right-0 left-0 hidden h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-400 sm:block",
                    "aria-hidden": true
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "pointer-events-none absolute top-0 bottom-0 left-0 hidden w-[3px] bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-500/90 opacity-95 sm:block",
                    "aria-hidden": true
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-start gap-4 max-sm:pl-0 pl-2.5 md:items-center md:gap-5 md:pl-1", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-stone-900 shadow-md ring-1 ring-amber-200/50 max-sm:ring-0 sm:h-14 sm:w-14",
                      "aria-hidden": true,
                      children: /* @__PURE__ */ jsx(Coins, { className: "h-6 w-6 sm:h-7 sm:w-7", strokeWidth: 2 })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold tracking-[0.22em] text-amber-800 uppercase sm:text-xs", children: t("pages.welcome.b2c_teaser.badge") }),
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        id: "welcome-b2c-teaser-heading",
                        className: "mt-1 text-base font-semibold leading-snug tracking-tight text-stone-900 sm:text-lg md:text-xl",
                        children: t("pages.welcome.b2c_teaser.title")
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "mt-1.5 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-[0.9375rem]", children: t("pages.welcome.b2c_teaser.body") })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex w-full shrink-0 justify-stretch md:w-auto md:justify-end", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-6 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition-all duration-200 max-sm:group-hover:border-stone-300 max-sm:group-hover:bg-stone-50 max-sm:group-hover:shadow-sm group-hover:border-amber-300/90 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-400 group-hover:text-stone-900 group-hover:shadow md:w-auto md:px-7 md:py-3", children: [
                  /* @__PURE__ */ jsx("span", { children: t("pages.welcome.b2c_teaser.cta") }),
                  /* @__PURE__ */ jsx(
                    ChevronRight,
                    {
                      className: "h-4 w-4 shrink-0 text-stone-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-stone-900",
                      "aria-hidden": true
                    }
                  )
                ] }) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex min-h-0 flex-1 flex-col lg:flex-row", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-black sm:aspect-[16/9] lg:aspect-auto lg:h-auto lg:w-1/2 lg:flex-1", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8",
                  onClick: () => window.location.href = carouselSlides[currentSlide].link,
                  onMouseEnter: () => !isMobile && setHoveredCard(0),
                  onMouseLeave: () => !isMobile && setHoveredCard(null),
                  role: "presentation",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 min-h-0 min-w-0", children: carouselSlides.map((slide, idx) => /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `absolute inset-0 min-h-0 min-w-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${idx === currentSlide ? "z-[2] opacity-100" : "pointer-events-none z-[1] opacity-0"}`,
                        "aria-hidden": idx !== currentSlide,
                        children: /* @__PURE__ */ jsx(
                          WelcomeGridPicture,
                          {
                            imageId: slide.gridId,
                            alt: slide.title,
                            pictureClassName: "absolute inset-0 block h-full w-full min-h-0",
                            className: "h-full min-h-0 w-full object-cover",
                            sizes: "(max-width: 1023px) 100vw, 50vw",
                            bundleOptions: { lcpHero: true },
                            style: {
                              objectPosition: "center center",
                              transform: "translateZ(0)",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden"
                            },
                            loading: "eager",
                            fetchPriority: idx === 0 ? "high" : "low",
                            decoding: "async"
                          }
                        )
                      },
                      slide.gridId
                    )) }),
                    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm", children: carouselSlides[currentSlide].category }),
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: `mb-4 text-xl font-bold transition-transform duration-300 sm:text-2xl lg:text-3xl ${!isMobile && hoveredCard === 0 ? "lg:translate-x-2" : "translate-x-0"}`,
                          children: carouselSlides[currentSlide].title
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-6 z-20 flex gap-2 sm:bottom-8 sm:left-8 lg:bottom-8 lg:left-8", children: carouselSlides.map((slide, idx) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  },
                  className: `rounded-full transition-all duration-200 ${idx === currentSlide ? "h-2.5 w-8 bg-yellow-400" : "h-2.5 w-2.5 bg-white/50 hover:bg-white/80"}`,
                  "aria-label": `Go to slide ${idx + 1}`
                },
                slide.id
              )) })
            ] }),
            /* @__PURE__ */ jsx(
              KristalinTvGoldCard,
              {
                onMouseEnter: () => setHoveredCard(1),
                onMouseLeave: () => setHoveredCard(null),
                hovered: hoveredCard === 1
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                id: "news-update",
                "data-news-section": "true",
                href: newsItems[currentNews].url,
                className: "relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-between overflow-hidden bg-yellow-400 p-6 no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8",
                onMouseEnter: () => setHoveredCard(2),
                onMouseLeave: () => setHoveredCard(null),
                children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `absolute top-0 right-0 bottom-0 left-0 overflow-hidden transition-all duration-400 ease-out lg:duration-600 ${hoveredCard === 2 ? "scale-100 opacity-100" : "scale-105 opacity-0"}`,
                      children: [
                        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
                          motion.div,
                          {
                            className: "h-full w-full",
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            exit: { opacity: 0 },
                            transition: {
                              duration: 0.9,
                              ease: [0.16, 1, 0.3, 1]
                            },
                            style: { transform: "translateZ(0)" },
                            children: /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: newsItems[currentNews].image,
                                alt: newsItems[currentNews].title,
                                className: "h-full w-full object-cover",
                                style: {
                                  objectPosition: "center center",
                                  transform: "translateZ(0)",
                                  backfaceVisibility: "hidden"
                                },
                                onError: (e) => {
                                  const target = e.currentTarget;
                                  const tried = parseInt(target.dataset.fallbackTried || "0", 10);
                                  try {
                                    const u = new URL(target.src);
                                    let pathPart = u.pathname.replace(/^\//, "");
                                    if (pathPart.startsWith("public/")) pathPart = pathPart.slice(7);
                                    if (pathPart.startsWith("images/")) pathPart = pathPart.slice(7);
                                    const filename = pathPart.replace(/^kristalin-assets\/public\//, "");
                                    if (tried === 0) {
                                      target.dataset.fallbackTried = "1";
                                      target.src = `${window.location.origin}/images/${filename}`;
                                    } else if (tried === 1) {
                                      target.dataset.fallbackTried = "2";
                                      target.src = `${window.location.origin}/kristalin-assets/public/${filename}`;
                                    } else {
                                      target.style.display = "none";
                                    }
                                  } catch {
                                    target.style.display = "none";
                                  }
                                },
                                loading: "lazy",
                                decoding: "async",
                                fetchPriority: "low"
                              }
                            )
                          },
                          currentNews
                        ) }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `text-xl font-bold transition-all duration-300 sm:text-2xl lg:text-3xl ${hoveredCard === 2 ? "text-white lg:scale-110" : "scale-100 text-gray-800"}`,
                        children: /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: "/news",
                            onClick: (e) => {
                              e.stopPropagation();
                            },
                            className: `${hoveredCard === 2 ? "text-white hover:text-yellow-200" : "text-gray-800 hover:text-yellow-700"} underline-offset-4 hover:underline`,
                            children: t("pages.welcome.news.title_short")
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      newsItems.length > 1 && /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
                            },
                            className: `flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${hoveredCard === 2 ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-gray-200"}`,
                            children: /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                              "path",
                              {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M15 19l-7-7 7-7"
                              }
                            ) })
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setCurrentNews((prev) => (prev + 1) % newsItems.length);
                            },
                            className: `flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${hoveredCard === 2 ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-gray-200"}`,
                            children: /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                              "path",
                              {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M9 5l7 7-7 7"
                              }
                            ) })
                          }
                        )
                      ] }),
                      newsItems[currentNews].priority === "high" && /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: `flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 ${hoveredCard === 2 ? "bg-white/20 text-white" : "bg-red-100 text-red-700"}`,
                          children: [
                            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-current" }),
                            /* @__PURE__ */ jsx("span", { children: t("pages.welcome.news.highlight_badge") })
                          ]
                        }
                      )
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-1 flex-col justify-center", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      transition: {
                        duration: 0.4,
                        ease: "easeInOut"
                      },
                      className: "mb-4",
                      children: newsItems.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `h-1 w-1 rounded-full transition-colors duration-300 ${hoveredCard === 2 ? "bg-white" : "bg-gray-500"}`
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `text-xs font-medium transition-colors duration-300 ${hoveredCard === 2 ? "text-gray-200" : "text-gray-600"}`,
                              children: newsItems[currentNews].date
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `mb-3 line-clamp-2 text-sm leading-tight font-bold transition-colors duration-300 sm:text-base lg:text-lg ${hoveredCard === 2 ? "text-white" : "text-gray-800"}`,
                            children: newsItems[currentNews].title
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `line-clamp-3 text-xs leading-relaxed transition-colors duration-300 sm:text-sm ${hoveredCard === 2 ? "text-gray-100" : "text-gray-700"}`,
                            children: newsItems[currentNews].excerpt
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "mb-2 text-4xl", children: "📰" }),
                        /* @__PURE__ */ jsx(
                          "p",
                          {
                            className: `text-sm font-medium transition-colors duration-300 ${hoveredCard === 2 ? "text-white" : "text-gray-800"}`,
                            children: t("pages.welcome.news.no_news_available")
                          }
                        )
                      ] })
                    },
                    currentNews
                  ) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `mb-3 flex items-center justify-between transition-colors duration-300 ${hoveredCard === 2 ? "border-white/20" : "border-black/10"}`,
                        children: /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: `flex items-center text-sm font-semibold transition-all duration-300 sm:text-base ${hoveredCard === 2 ? "text-white" : "text-gray-800"}`,
                            children: [
                              /* @__PURE__ */ jsx("span", { children: t("pages.welcome.news.view_button") }),
                              /* @__PURE__ */ jsx(
                                "div",
                                {
                                  className: `ml-2 transition-transform duration-300 ${hoveredCard === 2 ? "translate-x-1" : "translate-x-0"}`,
                                  children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                                    "path",
                                    {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: 2,
                                      d: "M17 8l4 4m0 0l-4 4m4-4H3"
                                    }
                                  ) })
                                }
                              )
                            ]
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1.5", children: newsItems.map((_, index) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentNews(index);
                        },
                        className: `transition-all duration-300 ${index === currentNews ? `h-1.5 w-6 rounded-full ${hoveredCard === 2 ? "bg-white" : "bg-gray-800"}` : `h-1.5 w-1.5 rounded-full ${hoveredCard === 2 ? "bg-white/40 hover:bg-white/60" : "bg-gray-400 hover:bg-gray-600"}`}`
                      },
                      index
                    )) })
                  ] })
                ]
              }
            )
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, { minimal: true }),
      /* @__PURE__ */ jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `
          @keyframes containerFade {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes staggeredFadeScale {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
              filter: blur(2px);
            }
            60% {
              opacity: 0.8;
              transform: translateY(5px) scale(0.98);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }

          @keyframes premiumFadeIn {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes newsSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }

          .animate-containerFade {
            animation: containerFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-staggeredFadeScale {
            opacity: 0;
            animation: staggeredFadeScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-premiumFadeIn {
            animation: premiumFadeIn 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Delay Classes for Staggered Effect */
          .delay-0 {
            animation-delay: 0ms;
          }

          .delay-200 {
            animation-delay: 200ms;
          }

          .delay-400 {
            animation-delay: 400ms;
          }

          .delay-600 {
            animation-delay: 600ms;
          }

          .delay-800 {
            animation-delay: 800ms;
          }

          /* Hover Enhancement */
          .hover-enhance {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .hover-enhance:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          /* Custom scrollbar styling */
          .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }

          /* Enhanced input focus states */
          input:focus, select:focus, textarea:focus {
            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
          }

          /* File upload hover effects */
          .border-dashed:hover {
            border-color: #f59e0b;
            background-color: #fef3c7;
          }

          /* Hero CTA — GPU-friendly hover (no transition-all / gradient morph) */
          .hero-cta-btn {
            transition:
              transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateZ(0);
          }

          @media (prefers-reduced-motion: no-preference) {
            .hero-cta-btn:hover {
              transform: translate3d(0, -2px, 0);
            }

            .hero-cta-btn:active {
              transform: translate3d(0, 0, 0);
            }
          }

          .hero-cta-btn--primary:hover {
            box-shadow: 0 12px 28px -8px rgba(245, 158, 11, 0.45);
          }

          .hero-cta-btn--outline:hover {
            background-color: #fde047;
            border-color: #f59e0b;
            color: #111827;
            box-shadow: 0 10px 24px -10px rgba(245, 158, 11, 0.35);
          }

          .hero-cta-btn--ghost:hover {
            border-color: #fbbf24;
            background-color: #fffbeb;
            color: #b45309;
            box-shadow: 0 10px 24px -12px rgba(15, 23, 42, 0.18);
          }

          /* Tab animation */
          .border-b-3 {
            border-bottom-width: 3px;
          }

          /* Modal backdrop */
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }

          /* Mobile responsive improvements */
          @media (max-width: 640px) {
            .line-clamp-2 {
              -webkit-line-clamp: 2;
            }

            .line-clamp-3 {
              -webkit-line-clamp: 2;
            }
          }

          /* Additional responsive utilities */
          @media (max-width: 1024px) {
            .lg\\:h-\\[400px\\] {
              height: auto;
              min-height: 400px;
            }

            .lg\\:h-\\[300px\\] {
              height: auto;
              min-height: 300px;
            }
          }

          @media (max-width: 768px) {
            .md\\:h-\\[350px\\] {
              height: auto;
              min-height: 350px;
            }

            .md\\:h-\\[250px\\] {
              height: auto;
              min-height: 250px;
            }
          }

          /* Responsive section heights */
          @media (max-width: 1023px) {
            section {
              height: auto !important;
            }

            section > div {
              min-height: 300px;
            }
          }

          /* Custom responsive button layout - Desktop left, mobile center */
          @media (max-width: 639px) {
            /* Mobile phones - buttons stacked vertically, centered */
            .button-container {
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
            }
          }

          @media (min-width: 640px) and (max-width: 1023px) {
            /* Tablets (iPad, iPad Air, etc.) - buttons horizontal, centered */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 1rem !important;
            }
          }

          @media (min-width: 1024px) {
            /* Desktop - buttons horizontal, left-aligned */
            .button-container {
              flex-direction: row !important;
              align-items: center !important;
              justify-content: flex-start !important;
              gap: 1rem !important;
            }
          }

          /* Responsive button alignment */
          .button-container {
            align-items: center !important;
          }

          @media (min-width: 1024px) {
            .button-container {
              justify-content: flex-start !important;
            }
          }

          @media (max-width: 640px) {
            section > div {
              min-height: 250px;
            }

            .text-2xl {
              font-size: 1.75rem;
            }

            .text-3xl {
              font-size: 2rem;
            }

            .text-4xl {
              font-size: 2.25rem;
            }
          }

          /* Transitions: omit transform on universal selector — hero CTAs manage their own */
          .welcome-page :where(input, select, textarea, label) {
            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }

          /* LCP-safe hero motion: text block only (buttons excluded from transform nudge) */
          @media (prefers-reduced-motion: no-preference) {
            .welcome-hero-micro .welcome-hero-nudge--a {
              transform: translate3d(0, 14px, 0);
              opacity: 1;
              transition: transform 0.52s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .welcome-hero-micro--ready .welcome-hero-nudge--a {
              transform: translate3d(0, 0, 0);
            }
          }

          .welcome-lcp-hero {
            transition: none;
            transform: translateZ(0);
          }

          @media (prefers-reduced-motion: no-preference) {
            .welcome-csr-hover-ready .welcome-lcp-hero {
              transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
          }

          /* Enhanced hover states for cards */
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          /* Hero/LCP images: smooth scaling; crisp-edges avoided for photos */
          .welcome-page img:not(.welcome-lcp-hero) {
            image-rendering: -webkit-optimize-contrast;
          }

          /* Typography responsive scaling */
          @media (max-width: 480px) {
            h1 {
              line-height: 1.1;
            }

            h2, h3 {
              line-height: 1.2;
            }

            p {
              line-height: 1.5;
            }
          }

          /* Loading states */
          .loading {
            opacity: 0.7;
            pointer-events: none;
          }

          /* Focus states for accessibility */
          *:focus {
            outline: 2px solid #fbbf24;
            outline-offset: 2px;
          }

          /* Print styles */
          @media print {
            .no-print {
              display: none !important;
            }

            * {
              color: black !important;
              background: white !important;
            }
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .text-gray-600 {
              color: #000000 !important;
            }

            .text-gray-800 {
              color: #000000 !important;
            }

            .bg-yellow-400 {
              background-color: #000000 !important;
              color: #ffffff !important;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          /* Dark mode support (if needed in future) */
          @media (prefers-color-scheme: dark) {
            .dark-mode-ready {
              background-color: #1f2937;
              color: #f9fafb;
            }
          }

          /* Performance optimizations */
          .will-change-transform {
            will-change: transform;
          }

          .will-change-opacity {
            will-change: opacity;
          }

          /* GPU acceleration for smooth animations */
          .gpu-accelerated {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000;
          }

          /* Perspective utilities for 3D effects */
          .perspective-1000 {
            perspective: 1000px;
          }

          .perspective-500 {
            perspective: 500px;
          }

          /* Enhanced drop shadow for premium feel */
          .drop-shadow-premium {
            filter: drop-shadow(0 25px 50px rgba(251, 191, 36, 0.2));
          }

          /* Smooth blur transitions */
          .blur-transition {
            transition: filter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* Shift floating feedback button when mobile menu is open */
          .floating-feedback-button { transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          body.mobile-menu-open .floating-feedback-button { right: 21rem !important; }
          @media (min-width: 640px) { /* match drawer sm:w-96 */
            body.mobile-menu-open .floating-feedback-button { right: 25rem !important; }
          }

          /* Floating animation keyframes */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          /* Instagram Link Responsive Styles */
          @media (max-width: 640px) {
            .instagram-link {
              padding: 0.75rem !important;
              gap: 0.5rem !important;
            }

            .instagram-link .icon-container {
              width: 2.5rem !important;
              height: 2.5rem !important;
            }

            .instagram-link .icon-container svg {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }

            .instagram-link .text-content span:first-child {
              font-size: 0.75rem !important;
            }

            .instagram-link .text-content span:last-child {
              font-size: 0.625rem !important;
            }
          }

          @media (min-width: 641px) and (max-width: 1024px) {
            .instagram-link {
              padding: 1rem !important;
              gap: 0.75rem !important;
            }
          }

          /* Instagram Link Hover Effects */
          .instagram-link {
            position: relative;
            overflow: hidden;
          }

          .instagram-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
          }

          .instagram-link:hover::before {
            left: 100%;
          }

          /* Instagram Icon Pulse Animation */


          /* Particle animation keyframes */
          @keyframes particle-float {
            0% {
              transform: translateY(0px) scale(0);
              opacity: 0;
            }
            50% {
              transform: translateY(-20px) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-40px) scale(0);
              opacity: 0;
            }
          }

          .animate-particle {
            animation: particle-float 4s ease-in-out infinite;
          }

          /* Gradient text animation */
          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient-text {
            animation: gradient-shift 3s ease infinite;
          }

          /* Enhanced logo rotation */
          @keyframes logo-float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-5px) rotate(180deg);
            }
          }

          .animate-logo-float {
            animation: logo-float 8s ease-in-out infinite;
          }

          /* Premium glow animation */
          @keyframes premium-glow {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }

          .animate-premium-glow {
            animation: premium-glow 4s ease-in-out infinite;
          }

          /* Loading bar animation */
          @keyframes loading-pulse {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 1;
            }
          }

          .animate-loading-pulse {
            animation: loading-pulse 2s ease-in-out infinite;
          }
        `
          }
        }
      )
    ] })
  ] });
};
export {
  Welcome as default
};

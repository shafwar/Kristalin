import { jsx, jsxs } from "react/jsx-runtime";
import { K as KristalinMapEmbed, J as JAKARTA_HEAD_OFFICE } from "./KristalinMapEmbed-yENem0OM.js";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { ChevronDown, ExternalLink, Coins, RefreshCw, ShieldCheck, ChevronRight, X, CheckCircle2, Send, ArrowDownRight, Sparkles, Building2, FileText, Scale } from "lucide-react";
import { Link, Head } from "@inertiajs/react";
import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { u as useNetworkProfile } from "./useNetworkProfile-BaMceDYv.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { u as useKristalinTvGold, g as getBestSell1g, f as formatIdr, a as useLcpSafeMicroMotion } from "./useKristalinTvGold-D0hJyzUY.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { I as InquiryForm } from "./InquiryForm-4NUO8kae.js";
import { createPortal } from "react-dom";
import { E as EsmdVerificationBadge } from "./EsmdVerificationModal-BOYeZnc5.js";
import "./label-B_m42RSr.js";
import "./utils-H80jjgLf.js";
import "tailwind-merge";
import "@radix-ui/react-label";
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsx(CollapsiblePrimitive.Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleTrigger,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleContent,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
function FaqAnswer({ item, processAnchorLabel, onScrollToProcess, kristalinTvLabel, kristalinTvUrl, contactHref, contactLinkLabel }) {
  if (item.id === "delivery_schedule" && onScrollToProcess) {
    return /* @__PURE__ */ jsxs("p", { className: "text-sm leading-relaxed text-stone-600", children: [
      item.answer,
      " ",
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onScrollToProcess,
          className: "font-medium text-amber-800 underline decoration-amber-400/60 underline-offset-2 transition-colors hover:text-amber-900",
          children: processAnchorLabel
        }
      )
    ] });
  }
  if (item.id === "how_to_start") {
    return /* @__PURE__ */ jsxs("p", { className: "text-sm leading-relaxed text-stone-600", children: [
      item.answer,
      " ",
      /* @__PURE__ */ jsx(
        Link,
        {
          href: `${contactHref}?subject=b2c`,
          className: "font-medium text-amber-800 underline decoration-amber-400/60 underline-offset-2 transition-colors hover:text-amber-900",
          children: contactLinkLabel
        }
      ),
      "."
    ] });
  }
  if (item.id === "price_disclaimer") {
    return /* @__PURE__ */ jsxs("p", { className: "text-sm leading-relaxed text-stone-600", children: [
      item.answer,
      " ",
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: kristalinTvUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1 font-medium text-amber-800 underline decoration-amber-400/60 underline-offset-2 transition-colors hover:text-amber-900",
          children: [
            kristalinTvLabel,
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3", "aria-hidden": true })
          ]
        }
      ),
      "."
    ] });
  }
  return /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-stone-600", children: item.answer });
}
function B2cFaqSection({
  kicker,
  title,
  intro,
  items,
  map,
  openMapsLabel,
  contactCta,
  contactLinkLabel,
  contactHref = "/contact",
  kristalinTvLabel,
  kristalinTvUrl,
  processAnchorLabel,
  onScrollToProcess,
  footerPrompt,
  revealClassName
}) {
  var _a;
  const [openId, setOpenId] = useState(((_a = items[0]) == null ? void 0 : _a.id) ?? null);
  return /* @__PURE__ */ jsx("section", { id: "b2c-practical", className: "scroll-mt-24 border-t border-stone-200 bg-white px-4 py-14 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxs("div", { "data-b2c-reveal": true, className: revealClassName, children: [
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm font-semibold tracking-wide text-amber-700/90 uppercase", children: kicker }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 text-center text-2xl font-bold text-stone-900 md:text-3xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-center text-stone-600", children: intro })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 space-y-2", "data-b2c-reveal": true, children: items.map((item) => {
      const isOpen = openId === item.id;
      return /* @__PURE__ */ jsxs(
        Collapsible,
        {
          open: isOpen,
          onOpenChange: (open) => setOpenId(open ? item.id : null),
          className: "overflow-hidden rounded-xl border border-stone-200/90 bg-stone-50/50 transition-colors duration-300 data-[state=open]:border-amber-200/80 data-[state=open]:bg-white",
          children: [
            /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/80", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-stone-900 md:text-base", children: item.question }),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  className: clsx(
                    "h-5 w-5 shrink-0 text-amber-700 transition-transform duration-300 ease-out motion-reduce:transition-none",
                    isOpen && "rotate-180"
                  ),
                  "aria-hidden": true
                }
              )
            ] }),
            /* @__PURE__ */ jsx(CollapsibleContent, { className: "overflow-hidden transition-opacity duration-300 ease-out data-[state=closed]:opacity-80 data-[state=open]:opacity-100", children: /* @__PURE__ */ jsx("div", { className: "border-t border-stone-100 px-5 pt-3 pb-5", children: /* @__PURE__ */ jsx(
              FaqAnswer,
              {
                item,
                processAnchorLabel,
                onScrollToProcess,
                kristalinTvLabel,
                kristalinTvUrl,
                contactHref,
                contactLinkLabel
              }
            ) }) })
          ]
        },
        item.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-12", "data-b2c-reveal": true, children: /* @__PURE__ */ jsx(
      KristalinMapEmbed,
      {
        location: JAKARTA_HEAD_OFFICE,
        title: map.title,
        subtitle: map.subtitle,
        address: map.address,
        openMapsLabel,
        tone: "light"
      }
    ) }),
    footerPrompt || contactCta ? /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col items-center gap-4 text-center", "data-b2c-reveal": true, children: [
      footerPrompt ? /* @__PURE__ */ jsx("p", { className: "max-w-lg text-sm text-stone-600", children: footerPrompt }) : null,
      /* @__PURE__ */ jsx(
        Link,
        {
          href: `${contactHref}?subject=b2c`,
          className: "inline-flex h-12 items-center justify-center rounded-xl bg-stone-900 px-8 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-800 motion-reduce:hover:translate-y-0",
          children: contactCta
        }
      )
    ] }) : null
  ] }) });
}
const DIR = "/kristalin-assets/public";
function b2cHeroFile(name) {
  return `${DIR}/${name}`;
}
const B2C_HERO_WIDTH = 1280;
const B2C_HERO_HEIGHT = 853;
const responsive = {
  avifSrcSet: `${b2cHeroFile("b2c-kristalin-hero-640w.avif")} 640w, ${b2cHeroFile("b2c-kristalin-hero-960w.avif")} 960w, ${b2cHeroFile("b2c-kristalin-hero-1280w.avif")} 1280w`,
  webpSrcSet: `${b2cHeroFile("b2c-kristalin-hero-640w.webp")} 640w, ${b2cHeroFile("b2c-kristalin-hero-960w.webp")} 960w, ${b2cHeroFile("b2c-kristalin-hero-1280w.webp")} 1280w`,
  jpgSrcSet: `${b2cHeroFile("b2c-kristalin-hero-640w.jpg")} 640w, ${b2cHeroFile("b2c-kristalin-hero-960w.jpg")} 960w, ${b2cHeroFile("b2c-kristalin-hero-1280w.jpg")} 1280w`,
  jpgFallback: b2cHeroFile("b2c-kristalin-hero-1280w.jpg")
};
function getB2cHeroBundle(tier) {
  const f = b2cHeroFile;
  if (tier === "minimal") {
    return {
      avifSrcSet: `${f("b2c-kristalin-hero-640w.avif")} 640w`,
      webpSrcSet: `${f("b2c-kristalin-hero-640w.webp")} 640w`,
      jpgSrcSet: `${f("b2c-kristalin-hero-640w.jpg")} 640w`,
      jpgFallback: f("b2c-kristalin-hero-640w.jpg"),
      sizes: "100vw"
    };
  }
  if (tier === "conserve") {
    return {
      avifSrcSet: `${f("b2c-kristalin-hero-640w.avif")} 640w, ${f("b2c-kristalin-hero-960w.avif")} 960w`,
      webpSrcSet: `${f("b2c-kristalin-hero-640w.webp")} 640w, ${f("b2c-kristalin-hero-960w.webp")} 960w`,
      jpgSrcSet: `${f("b2c-kristalin-hero-640w.jpg")} 640w, ${f("b2c-kristalin-hero-960w.jpg")} 960w`,
      jpgFallback: f("b2c-kristalin-hero-960w.jpg"),
      sizes: "100vw"
    };
  }
  return {
    avifSrcSet: responsive.avifSrcSet,
    webpSrcSet: responsive.webpSrcSet,
    jpgSrcSet: responsive.jpgSrcSet,
    jpgFallback: responsive.jpgFallback,
    sizes: "100vw"
  };
}
const b2cHeroLegacyJpg = () => imageUrl("kristalin-assets/public/b2c kristalin image.jpg");
function B2cHeroPicture({
  alt,
  className,
  pictureClassName,
  style,
  sizes: sizesProp,
  loading = "eager",
  fetchPriority = "high"
}) {
  const { imageTier } = useNetworkProfile();
  const bundle = getB2cHeroBundle(imageTier);
  const sizes = sizesProp ?? bundle.sizes;
  const handleError = (e) => {
    const el = e.currentTarget;
    if (!el.dataset.fallbackTried) {
      el.dataset.fallbackTried = "1";
      el.removeAttribute("srcset");
      el.src = b2cHeroLegacyJpg();
      return;
    }
    el.style.display = "none";
  };
  return /* @__PURE__ */ jsxs("picture", { className: pictureClassName, children: [
    /* @__PURE__ */ jsx("source", { type: "image/avif", srcSet: bundle.avifSrcSet, sizes }),
    /* @__PURE__ */ jsx("source", { type: "image/webp", srcSet: bundle.webpSrcSet, sizes }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: bundle.jpgFallback,
        srcSet: bundle.jpgSrcSet,
        sizes,
        width: B2C_HERO_WIDTH,
        height: B2C_HERO_HEIGHT,
        alt,
        className: className ?? "h-full w-full object-cover",
        style,
        loading,
        decoding: "async",
        fetchPriority,
        onError: handleError
      }
    )
  ] });
}
const GRAM_PRESETS = [1, 5, 10, 25, 50, 100, 500, 1e3];
function GoldBullionCalculator() {
  var _a;
  const { t } = useTranslation();
  const { market, brandPrices, loading, refresh } = useKristalinTvGold(true);
  const [selectedGrams, setSelectedGrams] = useState(5);
  const [customGrams, setCustomGrams] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [rfqStatus, setRfqStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  useEffect(() => {
    if (isRfqModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isRfqModalOpen]);
  const activeGrams = useMemo(() => {
    if (isCustom) {
      const parsed = parseFloat(customGrams.replace(",", "."));
      return isNaN(parsed) || parsed <= 0 ? 1 : parsed;
    }
    return selectedGrams;
  }, [isCustom, customGrams, selectedGrams]);
  const bestBrandPrice = (_a = getBestSell1g(brandPrices == null ? void 0 : brandPrices.brands)) == null ? void 0 : _a.sell;
  const basePricePerGram = useMemo(() => {
    if ((market == null ? void 0 : market.gold_idr_per_gram) && market.gold_idr_per_gram > 0) {
      return market.gold_idr_per_gram;
    }
    if (bestBrandPrice && bestBrandPrice > 0) {
      return bestBrandPrice;
    }
    return 145e4;
  }, [market, bestBrandPrice]);
  const estimatedTotal = useMemo(() => {
    return Math.round(activeGrams * basePricePerGram);
  }, [activeGrams, basePricePerGram]);
  const handleSelectPreset = (g) => {
    setIsCustom(false);
    setSelectedGrams(g);
  };
  const handleCustomChange = (e) => {
    setIsCustom(true);
    setCustomGrams(e.target.value);
  };
  const handleSubmitRfq = async (e) => {
    var _a2;
    e.preventDefault();
    setRfqStatus("submitting");
    const csrfToken = (_a2 = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a2.getAttribute("content");
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("subject", `[B2C Gold Quote] Pembelian ${activeGrams} Gram Emas Kisara`);
    fd.append(
      "message",
      `Permintaan Kuotasi Pembelian Emas Fisik:
- Jumlah: ${activeGrams} Gram
- Estimasi Nilai: ${formatIdr(estimatedTotal)}
- Harga Acuan per Gram: ${formatIdr(basePricePerGram)}
- No. WhatsApp / Telp: ${formData.phone || "-"}
- Catatan Pemesan: ${formData.notes || "-"}
`
    );
    try {
      const res = await fetch("/contact-message", {
        method: "POST",
        body: fd,
        headers: {
          "X-CSRF-TOKEN": csrfToken || ""
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRfqStatus("success");
      } else {
        setRfqStatus("error");
      }
    } catch {
      setRfqStatus("error");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative mx-auto my-6 w-full max-w-5xl overflow-hidden rounded-3xl border border-amber-500/30 bg-[#0c1424] p-6 sm:p-8 lg:p-10 text-white shadow-2xl ring-1 ring-white/10", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-600/10 blur-[80px]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400", children: /* @__PURE__ */ jsx(Coins, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-[0.2em] text-amber-400 uppercase", children: t("pages.b2c.calculator.kicker") || "Simulasi & Kalkulator Emas" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl", children: t("pages.b2c.calculator.title") || "Kalkulator Investasi Logam Mulia" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-stone-300 sm:text-sm leading-relaxed max-w-2xl", children: t("pages.b2c.calculator.subtitle") || "Hitung estimasi nilai pembelian emas fisik Kisara Gold (99.99% 24K) secara instan berdasarkan data harga pasar hari ini." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-stone-900/80 px-4 py-3 shadow-inner backdrop-blur-md", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-pulse rounded-full bg-emerald-400" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-stone-400 uppercase tracking-wider", children: t("pages.b2c.calculator.live_price_per_gram") || "Harga Acuan per Gram" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-0.5 font-mono text-base sm:text-lg font-bold text-amber-300", children: [
            formatIdr(basePricePerGram),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-stone-400", children: "/ gram" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: refresh,
            disabled: loading,
            className: "flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-stone-300 transition-colors hover:bg-amber-500 hover:text-stone-950 active:scale-95 disabled:opacity-50 cursor-pointer",
            title: "Perbarui harga live",
            "aria-label": "Perbarui harga live",
            children: /* @__PURE__ */ jsx(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between space-y-6 lg:col-span-7", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-3 block text-xs font-bold tracking-wider text-stone-300 uppercase", children: t("pages.b2c.calculator.select_weight") || "Pilih Gramatur Emas (Minted Bars)" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2.5 sm:gap-3", children: GRAM_PRESETS.map((grams) => {
            const active = !isCustom && selectedGrams === grams;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSelectPreset(grams),
                className: `group relative flex flex-col items-center justify-center rounded-2xl border p-3 font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${active ? "border-amber-400 bg-gradient-to-b from-amber-500/25 to-amber-600/10 text-white shadow-lg ring-1 ring-amber-400" : "border-white/10 bg-white/[0.04] text-stone-300 hover:border-white/20 hover:bg-white/[0.08]"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base font-bold sm:text-lg tracking-tight", children: grams >= 1e3 ? `${grams / 1e3} kg` : `${grams}g` }),
                  /* @__PURE__ */ jsx("span", { className: `text-[10px] mt-0.5 ${active ? "text-amber-300 font-medium" : "text-stone-400"}`, children: grams >= 1e3 ? "1.000 Gram" : `${grams} Gram` })
                ]
              },
              grams
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-2 block text-xs font-bold tracking-wider text-stone-300 uppercase", children: t("pages.b2c.calculator.custom_weight") || "Atau Masukkan Gram Kustom:" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: "0.1",
                step: "0.5",
                placeholder: "Contoh: 15",
                value: customGrams,
                onChange: handleCustomChange,
                className: "h-12 w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 pr-16 text-sm font-medium text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-bold text-amber-400 uppercase", children: t("pages.b2c.calculator.gram_unit") || "Gram" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-stone-900/60 p-3.5 text-xs text-stone-300", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5 shrink-0 text-amber-400" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-white", children: t("pages.b2c.calculator.purity_label") || "Standar Kemurnian Resmi" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-stone-400", children: t("pages.b2c.calculator.purity_value") || "99.99% Emas Murni (24 Karat) Bersertifikat Resmi" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between rounded-2xl border border-white/15 bg-stone-900/90 p-6 shadow-xl backdrop-blur-md lg:col-span-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-wider text-stone-400 uppercase", children: t("pages.b2c.calculator.estimated_total") || "Estimasi Total Pembelian" }),
            /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-bold text-amber-300", children: [
              activeGrams,
              " Gram"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "my-5", children: [
            /* @__PURE__ */ jsx("p", { className: "font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-400", children: formatIdr(estimatedTotal) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-stone-400", children: [
              activeGrams,
              " Gram × ",
              formatIdr(basePricePerGram),
              " / gram"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 rounded-xl bg-white/[0.03] p-3.5 text-xs border border-white/5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-stone-400", children: [
              /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.breakdown_rate") || "Harga Acuan Hari Ini" }),
              /* @__PURE__ */ jsxs("span", { className: "font-mono font-medium text-white", children: [
                formatIdr(basePricePerGram),
                "/g"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-stone-400", children: [
              /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.breakdown_purity") || "Standar Kemurnian" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-amber-300", children: "24K (99.99% Fine Gold)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-stone-400", children: [
              /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.breakdown_cert") || "Sertifikasi & Segel" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-emerald-400", children: t("pages.b2c.calculator.breakdown_cert_val") || "Termasuk (Official Assay)" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-[10px] leading-relaxed text-stone-400", children: t("pages.b2c.calculator.pricing_note") || "* Harga bersifat indikatif mengikuti update pasar live. Kuotasi final dikunci saat verifikasi administrasi resmi." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setRfqStatus("idle");
              setIsRfqModalOpen(true);
            },
            className: "group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 px-6 font-bold text-stone-950 shadow-lg transition-all active:scale-[0.98] cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.cta_rfq") || "Minta Penawaran Resmi (RFQ)" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
            ]
          }
        ) })
      ] })
    ] }),
    isRfqModalOpen && mounted && createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto",
          onClick: (e) => {
            if (e.target === e.currentTarget) setIsRfqModalOpen(false);
          },
          role: "dialog",
          "aria-modal": "true",
          children: /* @__PURE__ */ jsxs("div", { className: "relative my-auto w-full max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-[#0f172a] p-6 sm:p-8 text-white shadow-2xl ring-1 ring-white/10", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsRfqModalOpen(false),
                className: "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 sm:h-5 sm:w-5" })
              }
            ),
            rfqStatus === "success" ? /* @__PURE__ */ jsxs("div", { className: "py-6 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-7 w-7" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-white", children: t("pages.b2c.calculator.success_title") || "Permintaan Kuotasi Terkirim!" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed", children: t("pages.b2c.calculator.success_desc") || "Terima kasih. Tim penjualan Kristalin Ekalestari akan segera mengirimkan konfirmasi kuotasi resmi ke email Anda." }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsRfqModalOpen(false),
                  className: "mt-6 rounded-xl bg-amber-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-stone-950 hover:bg-amber-400 transition-colors",
                  children: "Selesai"
                }
              )
            ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitRfq, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-lg sm:text-xl font-bold text-white", children: t("pages.b2c.calculator.rfq_modal_title") || "Permintaan Kuotasi Emas Resmi" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-stone-400", children: t("pages.b2c.calculator.rfq_modal_desc") || "Kirim detail estimasi pembelian Anda langsung ke tim penjualan PT Kristalin Ekalestari." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold", children: t("pages.b2c.calculator.selected_summary") || "Ringkasan Pilihan:" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-bold text-amber-400", children: [
                    activeGrams,
                    " Gram Emas 24K"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mt-1 font-mono text-sm font-bold text-white", children: [
                  "Estimasi: ",
                  formatIdr(estimatedTotal)
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "mb-1 block text-xs font-semibold text-stone-300", children: [
                  t("pages.b2c.calculator.field_name") || "Nama Lengkap",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-amber-400", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    required: true,
                    value: formData.name,
                    onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                    className: "h-10 sm:h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none",
                    placeholder: "Nama Anda / Perusahaan"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "mb-1 block text-xs font-semibold text-stone-300", children: [
                  t("pages.b2c.calculator.field_email") || "Alamat Email",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-amber-400", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    required: true,
                    value: formData.email,
                    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                    className: "h-10 sm:h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none",
                    placeholder: "email@domain.com"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-semibold text-stone-300", children: t("pages.b2c.calculator.field_phone") || "Nomor WhatsApp / Telepon (Opsional)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                    className: "h-10 sm:h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none",
                    placeholder: "+62 812..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-semibold text-stone-300", children: t("pages.b2c.calculator.field_notes") || "Catatan Tambahan (Opsional)" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 2,
                    value: formData.notes,
                    onChange: (e) => setFormData({ ...formData, notes: e.target.value }),
                    className: "w-full rounded-xl border border-white/15 bg-white/5 p-3 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none",
                    placeholder: "Kebutuhan khusus atau jadwal temu..."
                  }
                )
              ] }),
              rfqStatus === "error" && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-400", children: "Gagal mengirim pesan. Silakan coba kembali atau hubungi info@kristalin.co.id." }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "submit",
                  disabled: rfqStatus === "submitting",
                  className: "flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-stone-950 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 transition-all cursor-pointer shadow-md",
                  children: [
                    /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { children: rfqStatus === "submitting" ? t("pages.b2c.calculator.sending_btn") || "Mengirim Kuotasi..." : t("pages.b2c.calculator.send_btn") || "Kirim Permintaan Kuotasi" })
                  ]
                }
              )
            ] })
          ] })
        }
      ),
      document.body
    )
  ] });
}
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
function scrollToProcess() {
  var _a;
  (_a = document.getElementById("b2c-process")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
}
function B2cPage() {
  const { t } = useTranslation();
  const heroMicroReady = useLcpSafeMicroMotion();
  const scrollAnimScopeRef = useRef(null);
  useLayoutEffect(() => {
    const scope = scrollAnimScopeRef.current;
    if (!scope || typeof window === "undefined") return;
    const prefersReduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray(scope.querySelectorAll("[data-b2c-reveal]"));
      if (blocks.length === 0) return;
      if (prefersReduced) {
        gsap.set(blocks, { opacity: 1, x: 0, clearProps: "transform" });
        return;
      }
      const xOffset = window.innerWidth < 768 ? 20 : 32;
      blocks.forEach((el, index) => {
        const fromX = index % 2 === 0 ? -xOffset : xOffset;
        gsap.fromTo(
          el,
          { opacity: 0, x: fromX, immediateRender: true },
          {
            opacity: 1,
            x: 0,
            duration: 0.78,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      });
    }, scope);
    return () => {
      ctx.revert();
    };
  }, []);
  const faqItems = useMemo(
    () => [
      { id: "location", question: t("pages.b2c.faq.location.q"), answer: t("pages.b2c.faq.location.a") },
      { id: "hours", question: t("pages.b2c.faq.hours.q"), answer: t("pages.b2c.faq.hours.a") },
      { id: "kyc", question: t("pages.b2c.faq.kyc.q"), answer: t("pages.b2c.faq.kyc.a") },
      { id: "how_to_start", question: t("pages.b2c.faq.how_to_start.q"), answer: t("pages.b2c.faq.how_to_start.a") },
      { id: "price_disclaimer", question: t("pages.b2c.faq.price.q"), answer: t("pages.b2c.faq.price.a") },
      { id: "delivery_schedule", question: t("pages.b2c.faq.delivery.q"), answer: t("pages.b2c.faq.delivery.a") }
    ],
    [t]
  );
  const reveal = "data-b2c-reveal rounded-2xl border border-stone-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:p-8 motion-reduce:opacity-100";
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-stone-50 text-stone-900", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: t("pages.b2c.page_title") }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: t("pages.b2c.meta_description") })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: true }),
    /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-[78vh] flex-col justify-end overflow-hidden md:min-h-[85vh]", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx(
          B2cHeroPicture,
          {
            pictureClassName: "block h-full w-full",
            className: "h-full w-full object-cover object-center",
            alt: t("pages.b2c.hero_alt"),
            loading: "eager",
            fetchPriority: "high"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-900/35" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-28 md:pb-20 md:pt-32", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "max-w-3xl transition-transform duration-500 ease-out motion-reduce:transition-none",
            heroMicroReady ? "translate-y-0" : "translate-y-2"
          ),
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(EsmdVerificationBadge, { variant: "compact", theme: "dark" }) }),
            /* @__PURE__ */ jsx("p", { className: "mb-3 text-xs font-semibold tracking-[0.2em] text-amber-300/95 uppercase", children: t("pages.b2c.hero_kicker") }),
            /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl leading-tight font-bold text-white drop-shadow-md sm:text-4xl md:text-5xl", children: t("pages.b2c.hero_title") }),
            /* @__PURE__ */ jsx("p", { className: "mb-8 max-w-2xl text-base leading-relaxed text-stone-200/95 sm:text-lg", children: t("pages.b2c.hero_subtitle") }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: scrollToProcess,
                  className: "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 text-sm font-semibold text-stone-900 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0",
                  children: [
                    t("pages.b2c.cta_scroll"),
                    /* @__PURE__ */ jsx(ArrowDownRight, { className: "h-4 w-4 shrink-0", "aria-hidden": true })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/contact",
                  className: "inline-flex h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20",
                  children: t("pages.b2c.cta_contact")
                }
              )
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: scrollAnimScopeRef, children: [
      /* @__PURE__ */ jsxs("section", { id: "b2c-process", className: "relative z-10 -mt-6 scroll-mt-24 rounded-t-3xl bg-stone-50 px-4 py-14 md:py-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold tracking-wide text-amber-700/90 uppercase", children: t("pages.b2c.section_process_kicker") }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl font-bold text-stone-900 md:text-3xl", children: t("pages.b2c.section_process_title") }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-stone-600", children: t("pages.b2c.bridge_intro") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-12 flex max-w-3xl flex-col gap-8", children: [
          /* @__PURE__ */ jsxs("article", { "data-b2c-reveal": true, className: reveal, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3 text-amber-800", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-amber-100", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5", "aria-hidden": true }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold md:text-xl", children: t("pages.b2c.step0_title") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-stone-600", children: t("pages.b2c.step0_lead") }),
            /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800", children: t("pages.b2c.verbatim_program") })
          ] }),
          /* @__PURE__ */ jsxs("article", { "data-b2c-reveal": true, className: reveal, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3 text-amber-800", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-amber-100", children: /* @__PURE__ */ jsx(Building2, { className: "h-5 w-5", "aria-hidden": true }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold md:text-xl", children: t("pages.b2c.step1_title") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-stone-600", children: t("pages.b2c.step1_lead") }),
            /* @__PURE__ */ jsx("blockquote", { className: "mb-4 border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800", children: t("pages.b2c.verbatim_delivery_50a") }),
            /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-stone-300 bg-white py-3 pr-4 pl-5 text-stone-800", children: t("pages.b2c.verbatim_example") })
          ] }),
          /* @__PURE__ */ jsxs("article", { "data-b2c-reveal": true, className: reveal, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3 text-amber-800", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-amber-100", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5", "aria-hidden": true }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold md:text-xl", children: t("pages.b2c.step2_title") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-stone-600", children: t("pages.b2c.step2_lead") }),
            /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800", children: t("pages.b2c.verbatim_delivery_50b") })
          ] }),
          /* @__PURE__ */ jsxs("article", { "data-b2c-reveal": true, className: reveal, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3 text-amber-800", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-amber-100", children: /* @__PURE__ */ jsx(Scale, { className: "h-5 w-5", "aria-hidden": true }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold md:text-xl", children: t("pages.b2c.step3_title") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-stone-600", children: t("pages.b2c.step3_lead") }),
            /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800", children: t("pages.b2c.verbatim_pricing") })
          ] }),
          /* @__PURE__ */ jsxs("article", { "data-b2c-reveal": true, className: reveal, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3 text-amber-800", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-amber-100", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5", "aria-hidden": true }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold md:text-xl", children: t("pages.b2c.step4_title") })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 text-stone-600", children: t("pages.b2c.step4_lead") }),
            /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-amber-400 bg-stone-50/80 py-3 pr-4 pl-5 text-stone-800", children: t("pages.b2c.verbatim_profit") })
          ] }),
          /* @__PURE__ */ jsx("p", { "data-b2c-reveal": true, className: clsx(reveal, "text-center text-sm text-stone-500"), children: t("pages.b2c.footnote") })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "relative z-10 bg-stone-100/70 border-y border-stone-200/80 px-4 py-10 md:py-16", children: /* @__PURE__ */ jsx("div", { "data-b2c-reveal": true, className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsx(GoldBullionCalculator, {}) }) }),
      /* @__PURE__ */ jsx("section", { className: "relative z-10 bg-stone-50 px-4 py-8 md:py-12", children: /* @__PURE__ */ jsx("div", { "data-b2c-reveal": true, children: /* @__PURE__ */ jsx(InquiryForm, { type: "B2C" }) }) }),
      /* @__PURE__ */ jsx(
        B2cFaqSection,
        {
          kicker: t("pages.b2c.practical.kicker"),
          title: t("pages.b2c.practical.title"),
          intro: t("pages.b2c.practical.intro"),
          items: faqItems,
          map: {
            title: t("pages.b2c.practical.map_title"),
            subtitle: t("pages.b2c.practical.map_subtitle"),
            address: t("pages.b2c.practical.map_address")
          },
          openMapsLabel: t("pages.contact.locations.open_maps"),
          contactCta: t("pages.b2c.cta_contact"),
          contactLinkLabel: t("pages.b2c.faq.contact_link"),
          kristalinTvLabel: t("pages.b2c.faq.kristalin_tv_link"),
          kristalinTvUrl: "https://livegold-kristalintv.com/",
          processAnchorLabel: t("pages.b2c.faq.process_link"),
          onScrollToProcess: scrollToProcess,
          footerPrompt: t("pages.b2c.bottom_prompt"),
          revealClassName: reveal
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  B2cPage as default
};

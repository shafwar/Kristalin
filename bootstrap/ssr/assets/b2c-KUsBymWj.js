import { jsx, jsxs } from "react/jsx-runtime";
import { K as KristalinMapEmbed, J as JAKARTA_HEAD_OFFICE } from "./KristalinMapEmbed-yENem0OM.js";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { ChevronDown, ExternalLink, Coins, ChevronRight, Plus, Info, RefreshCw, ShieldCheck, Award, Truck, RotateCcw, ArrowDownRight, Sparkles, Building2, FileText, Scale } from "lucide-react";
import { Link, Head } from "@inertiajs/react";
import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { u as useNetworkProfile } from "./useNetworkProfile-BaMceDYv.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { u as useKristalinTvGold, g as getBestSell1g, f as formatIdrAmount, a as formatIdr, b as useLcpSafeMicroMotion } from "./useKristalinTvGold-BJzELv25.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { E as EsmdVerificationBadge } from "./EsmdVerificationModal-MI5BXMrn.js";
import "react-dom";
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
  const { market, brandPrices, loading, stale, lastUpdatedText, refresh } = useKristalinTvGold(true);
  const [selectedGrams, setSelectedGrams] = useState(5);
  const [customGrams, setCustomGrams] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const activeGrams = useMemo(() => {
    if (isCustom) {
      const cleanStr = customGrams.trim().replace(/\./g, "").replace(",", ".");
      const parsed = parseFloat(cleanStr);
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
    setCustomGrams("");
  };
  const handleCustomChange = (e) => {
    setIsCustom(true);
    setCustomGrams(e.target.value);
  };
  const handleQuickAdd = (increment) => {
    setIsCustom(true);
    const current = activeGrams;
    const next = Math.max(1, current + increment);
    setCustomGrams(next.toString());
  };
  const unitGram = t("pages.b2c.calculator.gram_unit") || "Gram";
  const formattedWeightLabel = activeGrams >= 1e3 ? `${activeGrams / 1e3} kg (${formatIdrAmount(activeGrams)} ${unitGram})` : `${formatIdrAmount(activeGrams)} ${unitGram}`;
  const contactUrl = `/contact?subject=b2c&grams=${activeGrams}&est=${estimatedTotal}#contact-form`;
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 sm:mb-8 text-center sm:text-left", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-amber-100/90 border border-amber-300/80 px-3.5 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider shadow-2xs", children: [
        /* @__PURE__ */ jsx(Coins, { className: "h-3.5 w-3.5 text-amber-700 shrink-0" }),
        /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.refinery_badge") || "Direct Refinery Supply · Kisara Gold 24K" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight", children: t("pages.b2c.calculator.title") || "Simulasi Pemesanan Emas Batangan 24K" }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm text-stone-600", children: /* @__PURE__ */ jsx("p", { className: "max-w-2xl leading-relaxed", children: t("pages.b2c.calculator.subtitle") || "Akses langsung likuiditas emas murni 99.99% langsung dari ekosistem pemurnian PT Kristalin Ekalestari." }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "block lg:hidden mb-6", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-amber-300/80 bg-gradient-to-b from-amber-500/10 via-white to-amber-500/5 p-5 shadow-xl ring-1 ring-amber-400/20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-amber-200/70 pb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: `h-2 w-2 rounded-full ${stale ? "bg-amber-400" : "animate-pulse bg-emerald-500"}` }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-stone-600 uppercase tracking-wider", children: t("pages.b2c.calculator.live_price_per_gram") || "Harga Acuan Pasar" }),
          lastUpdatedText && /* @__PURE__ */ jsx("span", { className: "rounded bg-amber-100 px-1.5 py-0.2 text-[9px] font-semibold text-amber-800", children: lastUpdatedText })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "font-mono text-sm font-bold text-stone-900", children: [
          formatIdr(basePricePerGram),
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-normal text-stone-500", children: [
            "/",
            unitGram
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-stone-500 uppercase tracking-wider", children: t("pages.b2c.calculator.estimated_total") || "Estimasi Total Pembelian" }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-amber-500/20 border border-amber-400/50 px-2.5 py-0.5 text-xs font-extrabold text-amber-950", children: formattedWeightLabel })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl font-black text-amber-700", children: "Rp" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-3xl font-black tracking-tight text-stone-950", children: formatIdrAmount(estimatedTotal) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[11px] text-stone-500", children: [
          formatIdrAmount(activeGrams),
          " ",
          unitGram,
          " × ",
          formatIdr(basePricePerGram),
          " / ",
          unitGram
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: contactUrl,
          className: "group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 font-bold text-stone-950 shadow-md transition-all active:scale-[0.98] text-sm text-center",
          children: [
            /* @__PURE__ */ jsxs("span", { children: [
              t("pages.b2c.calculator.cta_btn") || "Minta Penawaran Resmi",
              " (",
              formattedWeightLabel,
              ")"
            ] }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-6 lg:col-span-7", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2.5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold tracking-wider text-stone-700 uppercase", children: t("pages.b2c.calculator.select_weight") || "Pilih Gramatur Emas Batangan (Minted Bars)" }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-900", children: [
              /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500" }),
              t("pages.b2c.calculator.selected_label") || "Terpilih",
              ": ",
              /* @__PURE__ */ jsx("strong", { className: "font-bold", children: formattedWeightLabel })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2.5 sm:gap-3", children: GRAM_PRESETS.map((grams) => {
            const active = !isCustom && selectedGrams === grams;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSelectPreset(grams),
                className: `group relative flex flex-col items-center justify-center rounded-2xl border p-3 font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${active ? "border-2 border-amber-500 bg-amber-50/90 text-stone-950 shadow-sm ring-2 ring-amber-400/20" : "border-stone-200/90 bg-white hover:bg-stone-50 hover:border-stone-300 text-stone-700 shadow-2xs"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: `text-base font-bold sm:text-lg tracking-tight ${active ? "text-amber-950 font-extrabold" : "text-stone-900"}`, children: grams >= 1e3 ? `${grams / 1e3} kg` : `${grams}g` }),
                  /* @__PURE__ */ jsx("span", { className: `text-[10px] mt-0.5 ${active ? "text-amber-800 font-bold" : "text-stone-500"}`, children: grams >= 1e3 ? `1.000 ${unitGram}` : `${grams} ${unitGram}` })
                ]
              },
              grams
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 shadow-2xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2.5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold tracking-wider text-stone-700 uppercase", children: t("pages.b2c.calculator.custom_weight") || "Berat Kustom" }),
            isCustom && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 uppercase tracking-wide", children: t("pages.b2c.calculator.custom_active") || "Mode Kustom" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: "0.1",
                step: "any",
                placeholder: t("pages.b2c.calculator.custom_placeholder") || "Ketik gram, contoh: 24",
                value: customGrams,
                onChange: handleCustomChange,
                className: "h-16 w-full rounded-2xl border-2 border-stone-300/90 bg-stone-50/50 px-5 pr-28 text-2xl sm:text-3xl font-black font-mono text-stone-900 placeholder:text-stone-400 placeholder:text-base focus:bg-white focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-inner transition-all"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute right-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "rounded-xl bg-amber-100 border border-amber-300/80 px-3 py-1.5 text-xs font-black tracking-wider text-amber-900 uppercase shadow-2xs", children: unitGram }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3.5 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-stone-500", children: t("pages.b2c.calculator.quick_add") || "Tambah Cepat:" }),
            [1, 5, 10, 25, 100].map((inc) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleQuickAdd(inc),
                className: "inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 px-3 py-1.5 text-xs font-bold text-stone-700 transition-all cursor-pointer shadow-2xs active:scale-95",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3 text-amber-600" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "+",
                    inc,
                    "g"
                  ] })
                ]
              },
              inc
            ))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 rounded-2xl bg-amber-50/70 border border-amber-200/90 p-3.5 sm:p-4 text-xs text-amber-950 shadow-2xs", children: [
          /* @__PURE__ */ jsx(Info, { className: "h-4 w-4 shrink-0 text-amber-700 mt-0.5" }),
          /* @__PURE__ */ jsxs("p", { className: "leading-relaxed text-[11px] sm:text-xs", children: [
            /* @__PURE__ */ jsx("strong", { children: t("pages.b2c.calculator.estimation_note_title") || "Catatan Estimasi Sistem:" }),
            " ",
            t("pages.b2c.calculator.estimation_note") || "Dihitung berdasarkan harga acuan pasar spot terkini. Harga final dan nomor seri segel dikonfirmasi saat penerbitan invoice resmi."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block lg:col-span-5 lg:sticky lg:top-24", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xl shadow-stone-200/50 ring-1 ring-stone-900/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-stone-100 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: `h-2 w-2 rounded-full ${stale ? "bg-amber-400" : "animate-pulse bg-emerald-500"}` }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-stone-500 uppercase tracking-wider", children: t("pages.b2c.calculator.live_price_per_gram") || "Harga Acuan Pasar Hari Ini" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-0.5 font-mono text-base sm:text-lg font-bold text-stone-900", children: [
              formatIdr(basePricePerGram),
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-stone-500", children: [
                "/ ",
                unitGram
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: refresh,
              disabled: loading,
              className: "flex h-9 w-9 items-center justify-center rounded-xl bg-stone-50 border border-stone-200 text-stone-700 transition-all hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 active:scale-95 disabled:opacity-50 cursor-pointer shadow-2xs",
              title: "Perbarui harga pasar live",
              "aria-label": "Perbarui harga pasar live",
              children: /* @__PURE__ */ jsx(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-wider text-stone-500 uppercase", children: t("pages.b2c.calculator.estimated_total") || "Estimasi Total Pembelian" }),
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-amber-100 border border-amber-300/80 px-2.5 py-0.5 text-xs font-bold text-amber-900", children: formattedWeightLabel })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-baseline gap-1.5 flex-nowrap overflow-hidden", children: [
            /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xl sm:text-2xl font-bold tracking-tight text-amber-800", children: "Rp" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-3xl sm:text-4xl font-black tracking-tight text-stone-950 truncate", children: formatIdrAmount(estimatedTotal) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-stone-500", children: [
            formatIdrAmount(activeGrams),
            " ",
            unitGram,
            " × ",
            formatIdr(basePricePerGram),
            " / ",
            unitGram
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 rounded-2xl bg-stone-50/80 p-4 text-xs border border-stone-200/80", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-stone-600", children: [
            /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.breakdown_rate") || "Harga Acuan" }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono font-bold text-stone-900", children: [
              formatIdr(basePricePerGram),
              "/",
              unitGram
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-stone-600", children: [
            /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.breakdown_purity") || "Standar Kemurnian" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-amber-800", children: t("pages.b2c.calculator.breakdown_purity_val") || "24K (99.99% Fine Gold)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-stone-600", children: [
            /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.breakdown_cert") || "Sertifikasi & Segel" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-emerald-700", children: t("pages.b2c.calculator.breakdown_cert_val") || "Termasuk (Official Assay)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-stone-600", children: [
            /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.breakdown_shipping") || "Pengiriman Fisik" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-blue-700", children: t("pages.b2c.calculator.breakdown_shipping_val") || "Asuransi Penuh 100%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3.5 space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] leading-relaxed text-stone-500", children: t("pages.b2c.calculator.pricing_note") || "* Nilai bersifat indikatif mengikuti harga acuan pasar harian. Kuotasi final dikunci saat transaksi." }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[10px] text-stone-400", children: [
            /* @__PURE__ */ jsx("span", { children: "Sumber:" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://livegold-kristalintv.com/",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "font-semibold text-amber-700 hover:underline inline-flex items-center gap-0.5",
                children: [
                  "Kristalin TV",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-2.5 w-2.5" })
                ]
              }
            ),
            lastUpdatedText && /* @__PURE__ */ jsxs("span", { children: [
              "· ",
              lastUpdatedText
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: contactUrl,
            className: "group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 sm:px-6 font-bold text-stone-950 shadow-md transition-all active:scale-[0.98] cursor-pointer text-xs sm:text-sm text-center",
            children: [
              /* @__PURE__ */ jsxs("span", { children: [
                t("pages.b2c.calculator.cta_btn") || "Minta Penawaran Resmi",
                " (",
                formattedWeightLabel,
                ")"
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-500", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-600 shrink-0" }),
          /* @__PURE__ */ jsx("span", { children: t("pages.b2c.calculator.verified_note") || "Kuotasi resmi diverifikasi PT Kristalin Ekalestari" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 sm:mt-12 pt-8 border-t border-stone-200/80", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all hover:border-amber-300 hover:shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60", children: /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-xs sm:text-sm font-bold text-stone-900", children: t("pages.b2c.calculator.trust_purity_title") || "Kemurnian 99.99%" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-stone-500 leading-tight", children: t("pages.b2c.calculator.trust_purity_desc") || "Fine Gold 24K standar SNI & LBMA." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all hover:border-emerald-300 hover:shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-xs sm:text-sm font-bold text-stone-900", children: t("pages.b2c.calculator.trust_assay_title") || "Kemasan Assay" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-stone-500 leading-tight", children: t("pages.b2c.calculator.trust_assay_desc") || "Segel keamanan tinggi ber-seri unik." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all hover:border-blue-300 hover:shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60", children: /* @__PURE__ */ jsx(Truck, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-xs sm:text-sm font-bold text-stone-900", children: t("pages.b2c.calculator.trust_insurance_title") || "Asuransi 100%" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-stone-500 leading-tight", children: t("pages.b2c.calculator.trust_insurance_desc") || "Pengiriman fisik aman terproteksi." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-4 text-center shadow-2xs transition-all hover:border-amber-300 hover:shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60", children: /* @__PURE__ */ jsx(RotateCcw, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-xs sm:text-sm font-bold text-stone-900", children: t("pages.b2c.calculator.trust_buyback_title") || "Jaminan Buyback" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-stone-500 leading-tight", children: t("pages.b2c.calculator.trust_buyback_desc") || "Jaminan likuiditas pembelian kembali." })
      ] })
    ] }) }) })
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
      /* @__PURE__ */ jsx("section", { id: "b2c-calculator", className: "relative z-10 bg-gradient-to-b from-stone-100/90 via-stone-50 to-stone-100/90 border-y border-stone-200/90 px-4 py-14 md:py-20 lg:py-24", children: /* @__PURE__ */ jsx("div", { "data-b2c-reveal": true, className: "mx-auto max-w-6xl", children: /* @__PURE__ */ jsx(GoldBullionCalculator, {}) }) }),
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

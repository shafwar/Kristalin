import { jsx, jsxs } from "react/jsx-runtime";
import { K as KristalinMapEmbed, J as JAKARTA_HEAD_OFFICE } from "./KristalinMapEmbed-yENem0OM.js";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { ChevronDown, ExternalLink, ArrowDownRight, Sparkles, Building2, FileText, Scale } from "lucide-react";
import { Link, Head } from "@inertiajs/react";
import { useState, useRef, useLayoutEffect, useMemo } from "react";
import { u as useNetworkProfile } from "./useNetworkProfile-BaMceDYv.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { u as useLcpSafeMicroMotion } from "./useLcpSafeMicroMotion-BFiIYE58.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { I as InquiryForm } from "./InquiryForm-4NUO8kae.js";
import "react-dom";
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

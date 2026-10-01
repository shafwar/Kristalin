import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { u as useTranslation } from "./useTranslation-BoZt_nCq.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-DQ09yxGd.js";
import { P as PapuaChildrenHeroPicture } from "./PapuaChildrenHeroPicture-D2Fa_1ZV.js";
import "lucide-react";
import "react-dom";
import "./useNetworkProfile-BaMceDYv.js";
const Careers = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const contentRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const goToTab = (tab) => {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      const target = contentRef.current;
      if (target) {
        const headerOffset = 173;
        const rect = target.getBoundingClientRect();
        const top = window.pageYOffset + rect.top - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const benefits = [
    {
      icon: "🏥",
      title: t("pages.careers.overview.benefits.health_insurance.title"),
      description: t("pages.careers.overview.benefits.health_insurance.description")
    },
    {
      icon: "💰",
      title: t("pages.careers.overview.benefits.competitive_salary.title"),
      description: t("pages.careers.overview.benefits.competitive_salary.description")
    },
    {
      icon: "📚",
      title: t("pages.careers.overview.benefits.training_development.title"),
      description: t("pages.careers.overview.benefits.training_development.description")
    },
    {
      icon: "🏠",
      title: t("pages.careers.overview.benefits.housing_allowance.title"),
      description: t("pages.careers.overview.benefits.housing_allowance.description")
    },
    {
      icon: "🚌",
      title: t("pages.careers.overview.benefits.transportation.title"),
      description: t("pages.careers.overview.benefits.transportation.description")
    },
    {
      icon: "🎯",
      title: t("pages.careers.overview.benefits.performance_bonus.title"),
      description: t("pages.careers.overview.benefits.performance_bonus.description")
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200", children: [
    /* @__PURE__ */ jsxs(Head, { title: t("pages.careers.meta_title") || "Careers | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: t("pages.careers.meta_description") || "Career and professional development opportunities at PT Kristalin Ekalestari. Join us in building a sustainable and competitive mining industry in Indonesia." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: t("pages.careers.og_title") || "Careers — PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: t("pages.careers.og_description") || "Career opportunities in mining, metallurgy, geological engineering, and corporate management at PT Kristalin Ekalestari." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: true }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0 h-full w-full",
            style: {
              transform: `translateY(${scrollY * 0.5}px)`
            },
            children: [
              /* @__PURE__ */ jsx("img", { src: imageUrl("kristalincareerhero.jpg"), alt: "Careers background", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "relative z-20 mx-auto w-full max-w-5xl px-4 py-16 text-center sm:py-24",
            style: {
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 600)
            },
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 30, scale: 0.95 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 1, ease: "easeOut" },
                  className: "mb-8 sm:mb-12",
                  children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xl ring-2 ring-yellow-400/50 drop-shadow-lg backdrop-blur-sm sm:px-8 sm:py-3 sm:text-base", children: [
                    /* @__PURE__ */ jsx("svg", { className: "mr-2 h-4 w-4 sm:mr-3 sm:h-5 sm:w-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
                    t("pages.careers.hero.badge")
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.h1,
                {
                  className: "mb-6 text-3xl leading-tight font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl",
                  initial: { opacity: 0, y: 50, scale: 0.9 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0.8, delay: 0.6, ease: "easeOut" },
                  children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent", children: t("pages.careers.hero.title") })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  className: "mx-auto mb-8 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 1, ease: "easeOut" },
                  children: t("pages.careers.hero.subtitle")
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6",
                  initial: { opacity: 0, y: 30, scale: 0.8 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0.8, delay: 1.2, ease: "easeOut" },
                  children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => goToTab("positions"),
                        className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg",
                        children: [
                          /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2 sm:gap-3", children: [
                            t("pages.careers.hero.view_positions"),
                            /* @__PURE__ */ jsx(
                              "svg",
                              {
                                className: "h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => goToTab("apply"),
                        className: "rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-yellow-600 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg",
                        children: t("pages.careers.hero.apply_now")
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute bottom-4 left-1/2 -translate-x-1/2 transform sm:bottom-6 lg:bottom-8",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 1.4, ease: "easeOut" },
            children: /* @__PURE__ */ jsx("div", { className: "flex h-8 w-5 justify-center rounded-full border-2 border-white/60 sm:h-10 sm:w-6", children: /* @__PURE__ */ jsx("div", { className: "mt-1 h-2 w-1 animate-bounce rounded-full bg-white sm:mt-2 sm:h-3" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-gray-200 bg-white", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 py-6", children: [
        { id: "overview", label: t("pages.careers.tabs.overview") },
        { id: "positions", label: t("pages.careers.tabs.positions") },
        { id: "apply", label: t("pages.careers.tabs.apply") }
      ].map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => goToTab(tab.id),
          className: `rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === tab.id ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-900 shadow-md ring-1 ring-amber-400/50" : "text-stone-600 hover:bg-amber-50/60 hover:text-stone-900"}`,
          children: tab.label
        },
        tab.id
      )) }) }) }),
      /* @__PURE__ */ jsxs("div", { ref: contentRef, className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
        activeTab === "overview" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "space-y-16",
            children: [
              /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
                  /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-gray-900 sm:text-4xl", children: t("pages.careers.overview.why_join.title") }),
                  /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-gray-600", children: t("pages.careers.overview.why_join.subtitle") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: benefits.map((benefit, index) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: index * 0.1 },
                    className: "rounded-xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-4 text-4xl", children: benefit.icon }),
                      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-semibold text-gray-900", children: benefit.title }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: benefit.description })
                    ]
                  },
                  index
                )) })
              ] }),
              /* @__PURE__ */ jsx("section", { className: "rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 p-8 lg:p-12", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-2 lg:items-center", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-gray-900 sm:text-4xl", children: t("pages.careers.overview.culture.title") }),
                  /* @__PURE__ */ jsx("p", { className: "mb-6 text-lg text-gray-600", children: t("pages.careers.overview.culture.description") }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
                    t("pages.careers.overview.culture.values.1"),
                    t("pages.careers.overview.culture.values.2"),
                    t("pages.careers.overview.culture.values.3"),
                    t("pages.careers.overview.culture.values.4")
                  ].map((value, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center text-gray-700", children: [
                    /* @__PURE__ */ jsx("span", { className: "mr-3 text-yellow-500", children: "✓" }),
                    value
                  ] }, index)) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                  PapuaChildrenHeroPicture,
                  {
                    pictureClassName: "block w-full",
                    className: "h-auto w-full rounded-lg object-cover shadow-lg",
                    alt: "Company Culture",
                    sizes: "(max-width: 768px) 100vw, 50vw",
                    loading: "lazy",
                    fetchPriority: "low"
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
                  /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-gray-900 sm:text-4xl", children: t("pages.careers.overview.environment.title") }),
                  /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-gray-600", children: t("pages.careers.overview.environment.description") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white p-6 shadow-lg", children: [
                    /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold text-gray-900", children: t("pages.careers.overview.environment.safety.title") }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: t("pages.careers.overview.environment.safety.description") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white p-6 shadow-lg", children: [
                    /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold text-gray-900", children: t("pages.careers.overview.environment.growth.title") }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: t("pages.careers.overview.environment.growth.description") })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        activeTab === "positions" && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "space-y-10",
            children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/20 p-8 sm:p-12 shadow-[0_10px_35px_-10px_rgba(245,158,11,0.12)]", children: [
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-3xl text-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber-300 bg-amber-100/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-950 sm:text-sm shadow-sm", children: [
                  /* @__PURE__ */ jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" }),
                    /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" })
                  ] }),
                  t("pages.careers.positions.status_badge")
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-bold text-stone-900 sm:text-3xl lg:text-4xl", children: t("pages.careers.positions.stay_tuned_title") }),
                /* @__PURE__ */ jsx("p", { className: "mx-auto text-base leading-relaxed text-stone-600 sm:text-lg", children: t("pages.careers.positions.stay_tuned_desc") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-10 grid gap-6 md:grid-cols-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-900 shadow-md", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-widest text-amber-700 uppercase", children: t("pages.careers.positions.channels.social_tag") }),
                    /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-bold text-stone-900", children: t("pages.careers.positions.channels.instagram_title") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs font-semibold text-amber-600", children: t("pages.careers.positions.channels.instagram_handle") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-stone-600", children: t("pages.careers.positions.channels.instagram_desc") })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-6 border-t border-stone-100 pt-4", children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "https://www.instagram.com/kristalin_ekalestari/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-3 text-sm font-semibold text-stone-900 shadow-sm transition-all hover:from-amber-500 hover:to-yellow-600 hover:shadow-md",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: t("pages.careers.positions.channels.instagram_cta") }),
                        /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-900 text-amber-400 shadow-md", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-widest text-amber-700 uppercase", children: t("pages.careers.positions.channels.portal_tag") }),
                    /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-bold text-stone-900", children: t("pages.careers.positions.channels.portal_title") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs font-semibold text-amber-600", children: t("pages.careers.positions.channels.portal_handle") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-stone-600", children: t("pages.careers.positions.channels.portal_desc") })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-6 border-t border-stone-100 pt-4", children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "https://www.instagram.com/kristalin_ekalestari/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-amber-400/80 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:border-amber-500 hover:bg-amber-50 hover:text-stone-950",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: t("pages.careers.positions.channels.portal_cta") }),
                        /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-md", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-widest text-amber-700 uppercase", children: t("pages.careers.positions.channels.talent_tag") }),
                    /* @__PURE__ */ jsx("h3", { className: "mt-1 text-lg font-bold text-stone-900", children: t("pages.careers.positions.channels.talent_title") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs font-semibold text-amber-600", children: t("pages.careers.positions.channels.talent_handle") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-stone-600", children: t("pages.careers.positions.channels.talent_desc") })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-6 border-t border-stone-100 pt-4", children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => goToTab("apply"),
                      className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-800 hover:shadow-md",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: t("pages.careers.positions.channels.talent_cta") }),
                        /* @__PURE__ */ jsx("svg", { className: "h-4 w-4 text-amber-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                      ]
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 mt-10 rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-yellow-50/60 to-white p-6 sm:p-7 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-stone-900", children: t("pages.careers.positions.fraud_notice.title") }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed", children: [
                    /* @__PURE__ */ jsxs("p", { children: [
                      "• ",
                      /* @__PURE__ */ jsx("strong", { children: t("pages.careers.positions.fraud_notice.point1_label") }),
                      t("pages.careers.positions.fraud_notice.point1")
                    ] }),
                    /* @__PURE__ */ jsxs("p", { children: [
                      "• ",
                      /* @__PURE__ */ jsx("strong", { children: t("pages.careers.positions.fraud_notice.point2_label") }),
                      t("pages.careers.positions.fraud_notice.point2")
                    ] }),
                    /* @__PURE__ */ jsxs("p", { children: [
                      "• ",
                      /* @__PURE__ */ jsx("strong", { children: t("pages.careers.positions.fraud_notice.point3_label") }),
                      t("pages.careers.positions.fraud_notice.point3")
                    ] })
                  ] })
                ] })
              ] }) })
            ] })
          }
        ),
        activeTab === "apply" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "space-y-8",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
                /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-stone-900 sm:text-4xl", children: t("pages.careers.apply.title") }),
                /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-stone-600", children: t("pages.careers.apply.subtitle") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-white via-amber-50/40 to-yellow-50/20 p-8 sm:p-10 shadow-lg", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-900 shadow-md", children: /* @__PURE__ */ jsx("svg", { className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
                  /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl font-bold text-stone-900", children: t("pages.careers.apply.google_form.title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-stone-600", children: t("pages.careers.apply.google_form.description") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm", children: [
                    /* @__PURE__ */ jsx("h4", { className: "mb-3 font-bold text-stone-900", children: t("pages.careers.apply.google_form.features.title") }),
                    /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-sm text-stone-600", children: [
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700", children: "✓" }),
                        t("pages.careers.apply.google_form.features.1")
                      ] }),
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700", children: "✓" }),
                        t("pages.careers.apply.google_form.features.2")
                      ] }),
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700", children: "✓" }),
                        t("pages.careers.apply.google_form.features.3")
                      ] }),
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700", children: "✓" }),
                        t("pages.careers.apply.google_form.features.4")
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => window.open("https://forms.gle/Qzi2TpTjC5GhQMMV8", "_blank"),
                      className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-4 text-base font-bold text-stone-900 shadow-md transition-all duration-300 hover:from-amber-500 hover:to-yellow-600 hover:shadow-xl",
                      children: [
                        /* @__PURE__ */ jsx("span", { children: t("pages.careers.apply.google_form.open_form") }),
                        /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-stone-500", children: t("pages.careers.apply.google_form.note") })
                ] })
              ] }) }) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Careers as default
};

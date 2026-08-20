import { jsx, jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { useState, useRef, useMemo, useEffect, useCallback, useLayoutEffect } from "react";
import { Head } from "@inertiajs/react";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import "lucide-react";
import "react-dom";
function MilestoneYearNav({ years, activeYear, onYearClick, layout }) {
  if (years.length === 0) return null;
  if (layout === "horizontal") {
    return /* @__PURE__ */ jsx("nav", { "aria-label": "Timeline years", className: "milestone-years-scroll mb-4 -mx-1 overflow-x-auto px-1 pb-1", children: /* @__PURE__ */ jsx("div", { className: "flex min-w-max gap-2", children: years.map((year) => {
      const isActive = activeYear === year;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onYearClick(year),
          "aria-current": isActive ? "true" : void 0,
          className: clsx(
            "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold tabular-nums transition-all duration-300 motion-reduce:transition-none sm:text-sm",
            isActive ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md shadow-amber-500/25" : "border border-gray-200 bg-white text-gray-500 hover:border-amber-200 hover:text-amber-700"
          ),
          children: year
        },
        year
      );
    }) }) });
  }
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Timeline years", className: "relative hidden shrink-0 flex-col sm:flex", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-3 bottom-3 left-[7px] w-[2px] rounded-full bg-gradient-to-b from-amber-200 via-gray-200 to-gray-100", "aria-hidden": true }),
    /* @__PURE__ */ jsx("ul", { className: "relative flex flex-col gap-0.5", children: years.map((year) => {
      const isActive = activeYear === year;
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onYearClick(year),
          "aria-current": isActive ? "true" : void 0,
          className: clsx(
            "group relative flex items-center gap-3 rounded-lg py-1.5 pr-2 pl-0 text-left transition-all duration-300 motion-reduce:transition-none",
            isActive ? "pl-1" : "hover:pl-0.5"
          ),
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: clsx(
                  "relative z-[1] flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none",
                  isActive ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.45)] ring-2 ring-white" : "border-2 border-gray-300 bg-white group-hover:border-amber-300"
                ),
                "aria-hidden": true,
                children: isActive ? /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white" }) : null
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: clsx(
                  "min-w-[2.75rem] text-sm font-bold tabular-nums transition-colors duration-300",
                  isActive ? "text-amber-600" : "text-gray-400 group-hover:text-gray-600"
                ),
                children: year
              }
            )
          ]
        }
      ) }, year);
    }) })
  ] });
}
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const FILTER_ORDER = ["all", "legal", "production", "csr", "investment", "foundation"];
function MilestoneCard({
  milestone,
  getCategoryColor,
  isActiveYear,
  dataIndex
}) {
  return /* @__PURE__ */ jsx(
    "article",
    {
      "data-milestone-item": true,
      "data-milestone-year": milestone.year,
      "data-milestone-index": String(dataIndex),
      className: clsx(
        "group scroll-mt-24 rounded-2xl border border-transparent p-4 transition-colors duration-300 motion-reduce:transition-none sm:p-5 md:p-6",
        "hover:border-amber-100 hover:bg-amber-50/40",
        isActiveYear && "border-amber-200/60 bg-amber-50/30"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 md:gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 px-3 py-2 text-center text-white transition-transform duration-500 motion-reduce:transition-none sm:min-w-[72px] md:min-w-[80px] md:px-4",
              isActiveYear && "scale-105 shadow-lg shadow-amber-400/25"
            ),
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold md:text-lg", children: milestone.year }),
              /* @__PURE__ */ jsx("div", { className: "text-xs opacity-90", children: milestone.month })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-2 md:space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: `mb-2 inline-block rounded-full px-2 py-1 text-xs font-medium md:px-3 ${getCategoryColor(milestone.category)}`, children: milestone.category }),
            /* @__PURE__ */ jsx("h3", { className: "text-sm leading-tight font-semibold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600 sm:text-base md:text-xl", children: milestone.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-gray-600 sm:text-sm", children: milestone.description })
        ] })
      ] })
    }
  );
}
function resolveYearFromItems(items, anchorY) {
  let best = null;
  let bestDistance = Infinity;
  items.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    const distance = Math.abs(top - anchorY);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = item;
    }
  });
  return (best == null ? void 0 : best.dataset.milestoneYear) ?? null;
}
function MilestoneTimelinePanel({
  milestones,
  getCategoryColor,
  resolveFilterGroup,
  filterLabels,
  emptyFilterMessage,
  activeYear,
  onYearChange,
  variant,
  isLoaded
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const scrollContainerRef = useRef(null);
  const animScopeRef = useRef(null);
  const programmaticScrollRef = useRef(false);
  const programmaticTimerRef = useRef(null);
  const scrollRafRef = useRef(null);
  const isDesktop = variant === "desktop";
  const filteredList = useMemo(() => {
    if (activeFilter === "all") return milestones;
    return milestones.filter((m) => resolveFilterGroup(m.category) === activeFilter);
  }, [activeFilter, milestones, resolveFilterGroup]);
  const years = useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    return filteredList.reduce((acc, m) => {
      if (!seen.has(m.year)) {
        seen.add(m.year);
        acc.push(m.year);
      }
      return acc;
    }, []);
  }, [filteredList]);
  useEffect(() => {
    if (years.length > 0 && (!activeYear || !years.includes(activeYear))) {
      onYearChange(years[0]);
    }
  }, [years, activeYear, onYearChange]);
  useEffect(() => {
    var _a;
    (_a = scrollContainerRef.current) == null ? void 0 : _a.scrollTo({ top: 0, behavior: "auto" });
  }, [activeFilter]);
  const scrollToYear = useCallback(
    (year) => {
      const scope = animScopeRef.current;
      const container = scrollContainerRef.current;
      const target = (container == null ? void 0 : container.querySelector(`[data-milestone-item][data-milestone-year="${year}"]`)) ?? (scope == null ? void 0 : scope.querySelector(`[data-milestone-item][data-milestone-year="${year}"]`));
      if (!target) return;
      if (programmaticTimerRef.current) {
        window.clearTimeout(programmaticTimerRef.current);
      }
      programmaticScrollRef.current = true;
      onYearChange(year);
      const prefersReduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = prefersReduced ? "auto" : "smooth";
      if (isDesktop && container) {
        const top = container.scrollTop + (target.getBoundingClientRect().top - container.getBoundingClientRect().top) - 16;
        container.scrollTo({ top: Math.max(0, top), behavior });
        const unlock = () => {
          programmaticScrollRef.current = false;
        };
        container.addEventListener("scrollend", unlock, { once: true });
        programmaticTimerRef.current = window.setTimeout(unlock, prefersReduced ? 80 : 1e3);
      } else {
        const headerOffset = 96;
        const y = window.scrollY + target.getBoundingClientRect().top - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior });
        programmaticTimerRef.current = window.setTimeout(() => {
          programmaticScrollRef.current = false;
        }, prefersReduced ? 80 : 900);
      }
    },
    [isDesktop, onYearChange]
  );
  const handleScrollUpdate = useCallback(() => {
    if (programmaticScrollRef.current) return;
    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = requestAnimationFrame(() => {
      const scope = animScopeRef.current;
      if (!scope) return;
      const items = scope.querySelectorAll("[data-milestone-item]");
      if (items.length === 0) return;
      let anchorY;
      if (isDesktop && scrollContainerRef.current) {
        anchorY = scrollContainerRef.current.getBoundingClientRect().top + 48;
      } else {
        anchorY = 120;
      }
      const year = resolveYearFromItems(items, anchorY);
      if (year && year !== activeYear) {
        onYearChange(year);
      }
    });
  }, [activeYear, isDesktop, onYearChange]);
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (isDesktop && container) {
      container.addEventListener("scroll", handleScrollUpdate, { passive: true });
      return () => container.removeEventListener("scroll", handleScrollUpdate);
    }
    window.addEventListener("scroll", handleScrollUpdate, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollUpdate);
  }, [handleScrollUpdate, isDesktop, filteredList]);
  useLayoutEffect(() => {
    const scope = animScopeRef.current;
    const scroller = isDesktop ? scrollContainerRef.current : void 0;
    if (!scope || !isLoaded) return;
    const prefersReduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray(scope.querySelectorAll("[data-milestone-reveal]"));
      if (blocks.length === 0) return;
      if (prefersReduced) {
        gsap.set(blocks, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }
      blocks.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 14, immediateRender: false },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              toggleActions: "play none none none",
              once: true,
              scroller: scroller ?? void 0
            }
          }
        );
      });
    }, scope);
    return () => ctx.revert();
  }, [filteredList, isLoaded, isDesktop]);
  useEffect(
    () => () => {
      if (programmaticTimerRef.current) window.clearTimeout(programmaticTimerRef.current);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    },
    []
  );
  return /* @__PURE__ */ jsxs("div", { ref: animScopeRef, className: clsx("flex min-h-0 flex-1 flex-col", isDesktop && "overflow-hidden"), children: [
    /* @__PURE__ */ jsx("div", { className: clsx("mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2", isLoaded ? "opacity-100" : "opacity-0"), children: FILTER_ORDER.map((key) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveFilter(key),
        className: clsx(
          "rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-300 motion-reduce:transition-none sm:px-3 sm:py-1.5 sm:text-xs md:text-sm",
          activeFilter === key ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        ),
        children: filterLabels[key]
      },
      key
    )) }),
    !isDesktop ? /* @__PURE__ */ jsx(MilestoneYearNav, { years, activeYear, onYearClick: scrollToYear, layout: "horizontal" }) : null,
    /* @__PURE__ */ jsxs("div", { className: clsx("flex min-h-0 flex-1 gap-3 md:gap-5", isDesktop && "overflow-hidden"), children: [
      isDesktop ? /* @__PURE__ */ jsx(MilestoneYearNav, { years, activeYear, onYearClick: scrollToYear, layout: "vertical" }) : null,
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollContainerRef,
          className: clsx(
            "min-w-0 flex-1 space-y-3 sm:space-y-4 md:space-y-5",
            isDesktop && "max-h-full overflow-y-auto pr-1 milestone-scroll"
          ),
          children: filteredList.length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-8 text-center text-sm text-gray-500", children: emptyFilterMessage }) : filteredList.map((milestone, index) => /* @__PURE__ */ jsx("div", { "data-milestone-reveal": true, children: /* @__PURE__ */ jsx(
            MilestoneCard,
            {
              milestone,
              getCategoryColor,
              isActiveYear: activeYear === milestone.year,
              dataIndex: index
            }
          ) }, `${milestone.year}-${milestone.title}-${index}`))
        }
      )
    ] })
  ] });
}
function resolveMilestoneFilterGroup(category, t) {
  if (category === t("pages.milestones.categories.Company Foundation")) return "foundation";
  const legal = [t("pages.milestones.categories.Legal Milestone")];
  const production = [
    t("pages.milestones.categories.Operational Growth"),
    t("pages.milestones.categories.Production Milestone"),
    t("pages.milestones.categories.Production Excellence"),
    t("pages.milestones.categories.Operational Excellence"),
    t("pages.milestones.categories.Operational Expansion"),
    t("pages.milestones.categories.Exploration Achievement"),
    t("pages.milestones.categories.Exploration Initiative")
  ];
  const csr = [
    t("pages.milestones.categories.Social Responsibility"),
    t("pages.milestones.categories.Community Partnership")
  ];
  const investment = [t("pages.milestones.categories.Investment & Growth")];
  if (legal.includes(category)) return "legal";
  if (production.includes(category)) return "production";
  if (csr.includes(category)) return "csr";
  if (investment.includes(category)) return "investment";
  return "production";
}
const LG_BREAKPOINT = 1024;
function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= LG_BREAKPOINT;
    }
    return true;
  });
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
    const onChange = () => setIsLarge(mql.matches);
    mql.addEventListener("change", onChange);
    setIsLarge(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isLarge;
}
function MilestonesPage() {
  const { t } = useTranslation();
  const isLargeScreen = useIsLargeScreen();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeYear, setActiveYear] = useState("2024");
  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  const resolveFilterGroup = useCallback((category) => resolveMilestoneFilterGroup(category, t), [t]);
  const handleYearChange = useCallback((year) => setActiveYear(year), []);
  const filterLabels = {
    all: t("pages.milestones.filters.all"),
    legal: t("pages.milestones.filters.legal"),
    production: t("pages.milestones.filters.production"),
    csr: t("pages.milestones.filters.csr"),
    investment: t("pages.milestones.filters.investment"),
    foundation: t("pages.milestones.filters.foundation")
  };
  const companyStats = {
    established: t("pages.milestones.company_values.established_year"),
    milestones: t("pages.milestones.company_values.milestones_count"),
    location: t("pages.milestones.company_values.location_area"),
    growth: t("pages.milestones.company_values.growth_status")
  };
  const allMilestones = [
    // 2024-Now: Full Production
    {
      year: "2024",
      month: t("pages.milestones.months.December"),
      title: t("pages.milestones.milestones_data.2020-2025.0.title"),
      description: t("pages.milestones.milestones_data.2020-2025.0.description"),
      category: t("pages.milestones.categories.Operational Growth")
    },
    // 2024: MODI & MOMI Registration
    {
      year: "2024",
      month: t("pages.milestones.months.October"),
      title: t("pages.milestones.milestones_data.2020-2025.1.title"),
      description: t("pages.milestones.milestones_data.2020-2025.1.description"),
      category: t("pages.milestones.categories.Legal Milestone")
    },
    // 2020: Production IUP 108 & 112
    {
      year: "2020",
      month: t("pages.milestones.months.January"),
      title: t("pages.milestones.milestones_data.2020-2025.2.title"),
      description: t("pages.milestones.milestones_data.2020-2025.2.description"),
      category: t("pages.milestones.categories.Production Milestone")
    },
    // 2016-2019: Exploration & Trial Production
    {
      year: "2019",
      month: t("pages.milestones.months.March"),
      title: t("pages.milestones.milestones_data.2015-2019.0.title"),
      description: t("pages.milestones.milestones_data.2015-2019.0.description"),
      category: t("pages.milestones.categories.Operational Growth")
    },
    // 2016-2020: CSR - Sembako
    {
      year: "2018",
      month: t("pages.milestones.months.June"),
      title: t("pages.milestones.milestones_data.2015-2019.1.title"),
      description: t("pages.milestones.milestones_data.2015-2019.1.description"),
      category: t("pages.milestones.categories.Social Responsibility")
    },
    // 2016-2020: CSR - Housing
    {
      year: "2017",
      month: t("pages.milestones.months.April"),
      title: t("pages.milestones.milestones_data.2015-2019.2.title"),
      description: t("pages.milestones.milestones_data.2015-2019.2.description"),
      category: t("pages.milestones.categories.Social Responsibility")
    },
    // 2016-2020: CSR - Health & Education
    {
      year: "2017",
      month: t("pages.milestones.months.February"),
      title: t("pages.milestones.milestones_data.2015-2019.3.title"),
      description: t("pages.milestones.milestones_data.2015-2019.3.description"),
      category: t("pages.milestones.categories.Social Responsibility")
    },
    // 2016-2020: CSR - Water Irrigation
    {
      year: "2016",
      month: t("pages.milestones.months.August"),
      title: t("pages.milestones.milestones_data.2015-2019.4.title"),
      description: t("pages.milestones.milestones_data.2015-2019.4.description"),
      category: t("pages.milestones.categories.Social Responsibility")
    },
    // 2013: External Investment
    {
      year: "2013",
      month: t("pages.milestones.months.June"),
      title: t("pages.milestones.milestones_data.2010-2014.0.title"),
      description: t("pages.milestones.milestones_data.2010-2014.0.description"),
      category: t("pages.milestones.categories.Investment & Growth")
    },
    // 2010: IUP Exploration
    {
      year: "2010",
      month: t("pages.milestones.months.March"),
      title: t("pages.milestones.milestones_data.2010-2014.1.title"),
      description: t("pages.milestones.milestones_data.2010-2014.1.description"),
      category: t("pages.milestones.categories.Legal Milestone")
    },
    // 2010-2020: Humas Community Contributions
    {
      year: "2010",
      month: t("pages.milestones.months.January"),
      title: t("pages.milestones.milestones_data.2010-2014.2.title"),
      description: t("pages.milestones.milestones_data.2010-2014.2.description"),
      category: t("pages.milestones.categories.Social Responsibility")
    },
    // 2008: Mining Concession
    {
      year: "2008",
      month: t("pages.milestones.months.January"),
      title: t("pages.milestones.milestones_data.2005-2009.0.title"),
      description: t("pages.milestones.milestones_data.2005-2009.0.description"),
      category: t("pages.milestones.categories.Legal Milestone")
    },
    // 1989: Company Establishment
    {
      year: "1989",
      month: t("pages.milestones.months.January"),
      title: t("pages.milestones.milestones_data.1989-1999.0.title"),
      description: t("pages.milestones.milestones_data.1989-1999.0.description"),
      category: t("pages.milestones.categories.Company Foundation")
    }
  ];
  const getCategoryColor = (category) => {
    const englishCategories = {
      [t("pages.milestones.categories.Company Foundation")]: "bg-blue-100 text-blue-800",
      [t("pages.milestones.categories.Technology Innovation")]: "bg-purple-100 text-purple-800",
      [t("pages.milestones.categories.International Partnership")]: "bg-green-100 text-green-800",
      [t("pages.milestones.categories.Environmental Excellence")]: "bg-emerald-100 text-emerald-800",
      [t("pages.milestones.categories.Operational Growth")]: "bg-orange-100 text-orange-800",
      [t("pages.milestones.categories.Social Responsibility")]: "bg-pink-100 text-pink-800",
      [t("pages.milestones.categories.Safety Achievement")]: "bg-red-100 text-red-800",
      [t("pages.milestones.categories.Investment & Growth")]: "bg-indigo-100 text-indigo-800",
      [t("pages.milestones.categories.Infrastructure Development")]: "bg-gray-100 text-gray-800",
      [t("pages.milestones.categories.Quality Excellence")]: "bg-yellow-100 text-yellow-800",
      [t("pages.milestones.categories.Production Excellence")]: "bg-cyan-100 text-cyan-800",
      [t("pages.milestones.categories.Community Partnership")]: "bg-teal-100 text-teal-800",
      [t("pages.milestones.categories.Business Expansion")]: "bg-violet-100 text-violet-800",
      [t("pages.milestones.categories.Production Milestone")]: "bg-amber-100 text-amber-800",
      [t("pages.milestones.categories.Exploration Achievement")]: "bg-lime-100 text-lime-800",
      [t("pages.milestones.categories.Legal Milestone")]: "bg-slate-100 text-slate-800",
      [t("pages.milestones.categories.Human Resource Development")]: "bg-rose-100 text-rose-800",
      [t("pages.milestones.categories.Technology Advancement")]: "bg-fuchsia-100 text-fuchsia-800",
      [t("pages.milestones.categories.Operational Excellence")]: "bg-orange-100 text-orange-800",
      [t("pages.milestones.categories.Environmental Initiative")]: "bg-green-100 text-green-800",
      [t("pages.milestones.categories.Operational Expansion")]: "bg-blue-100 text-blue-800",
      [t("pages.milestones.categories.Technology Upgrade")]: "bg-purple-100 text-purple-800",
      [t("pages.milestones.categories.Exploration Initiative")]: "bg-lime-100 text-lime-800",
      [t("pages.milestones.categories.Regional Expansion")]: "bg-blue-100 text-blue-800",
      [t("pages.milestones.categories.Safety Implementation")]: "bg-red-100 text-red-800"
    };
    return englishCategories[category] || "bg-gray-100 text-gray-800";
  };
  const timelinePanel = /* @__PURE__ */ jsx(
    MilestoneTimelinePanel,
    {
      milestones: allMilestones,
      getCategoryColor,
      resolveFilterGroup,
      filterLabels,
      emptyFilterMessage: t("pages.milestones.empty_filter"),
      activeYear,
      onYearChange: handleYearChange,
      variant: isLargeScreen ? "desktop" : "mobile",
      isLoaded
    }
  );
  const activeYearBadge = /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "transition-all duration-500 motion-reduce:transition-none",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      ),
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase sm:text-xs", children: t("pages.milestones.active_year_label") }),
        /* @__PURE__ */ jsx("p", { className: "text-4xl font-light text-yellow-400 tabular-nums sm:text-5xl lg:text-6xl", children: activeYear })
      ]
    },
    activeYear
  );
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsxs(Head, { title: "Milestones & History | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Perjalanan dan sejarah PT Kristalin Ekalestari sejak didirikan pada 1989, eksplorasi tambang emas, perolehan IUP Operasi Produksi 2020-2030 (198 Ha di Nabire Papua), hingga ekspansi pengolahan logam mulia dan kemitraan masyarakat." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Milestones & History - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Perjalanan dan sejarah PT Kristalin Ekalestari sejak didirikan pada 1989 hingga era pertambangan modern berkelanjutan." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
    /* @__PURE__ */ jsx("div", { className: "z-10 flex flex-1 flex-col pt-16 sm:pt-20", children: !isLargeScreen ? (
      /* Mobile & tablet */
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "relative min-h-[50vh] overflow-hidden bg-black sm:min-h-[55vh]", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl("milestone(new).jpg"),
              alt: t("pages.milestones.alt_texts.mining_history"),
              className: "h-full w-full min-h-[50vh] object-cover opacity-70 sm:min-h-[55vh]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 left-4 flex items-start justify-between gap-3 sm:top-6 sm:right-6 sm:left-6", children: [
            activeYearBadge,
            /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "shrink-0 rounded-xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md sm:p-3",
                  isLoaded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                  "transition-all duration-700 delay-300"
                ),
                children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 text-center sm:gap-3", children: Object.entries(companyStats).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-yellow-400 sm:text-sm", children: value }),
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] tracking-wide text-white/80 uppercase sm:text-xs", children: t(`pages.milestones.company_stats.${key}`) })
                ] }, key)) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: clsx(
                "absolute right-4 bottom-6 left-4 sm:bottom-8 sm:left-6 sm:right-6",
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                "transition-all duration-1000 ease-out"
              ),
              children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-2xl leading-tight font-light text-white sm:text-3xl", children: [
                  t("pages.milestones.page_title").split(" ")[0],
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "font-normal", children: t("pages.milestones.page_title").split(" ")[1] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 h-1 w-14 bg-yellow-400 sm:mt-4 sm:w-16" }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-3 sm:text-base", children: t("pages.milestones.main_description") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white px-4 py-6 sm:px-6 sm:py-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: clsx("mb-4 sm:mb-6", isLoaded ? "opacity-100" : "opacity-0", "transition-opacity duration-700"), children: [
            /* @__PURE__ */ jsx("div", { className: "mb-3 flex items-center gap-2 sm:gap-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wider text-gray-500 uppercase sm:text-sm", children: t("pages.milestones.subtitle") }) }),
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md sm:px-6 sm:py-2", children: t("pages.milestones.timeline_range") })
          ] }),
          timelinePanel
        ] }) })
      ] })
    ) : (
      /* Desktop */
      /* @__PURE__ */ jsxs("div", { className: "relative flex w-full", style: { height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }, children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-full w-1/2 flex-shrink-0 overflow-hidden bg-black", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl("milestone(new).jpg"),
              alt: t("pages.milestones.alt_texts.mining_history"),
              className: "h-full w-full object-cover opacity-70"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-1/2 left-6 z-10 -translate-y-1/2 xl:left-10", children: activeYearBadge }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-5xl leading-tight font-light text-white", children: [
                  t("pages.milestones.page_title").split(" ")[0],
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "font-normal", children: t("pages.milestones.page_title").split(" ")[1] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-6 h-1 w-20 bg-yellow-400" }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-lg leading-relaxed text-white/80", children: t("pages.milestones.main_description") })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute top-16 right-16 transform transition-all delay-500 duration-1500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 text-center", children: Object.entries(companyStats).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-yellow-400", children: value }),
                /* @__PURE__ */ jsx("div", { className: "text-xs tracking-wide text-white/80 uppercase", children: t(`pages.milestones.company_stats.${key}`) })
              ] }, key)) }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative h-full w-1/2 flex-shrink-0 bg-white", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-yellow-600" }),
          /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col", style: { padding: "2rem" }, children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `mb-6 transform transition-all delay-300 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center space-x-3", children: [
                    /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#fbbf24",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                          /* @__PURE__ */ jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
                          /* @__PURE__ */ jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
                          /* @__PURE__ */ jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
                          /* @__PURE__ */ jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium tracking-wider text-gray-500 uppercase", children: t("pages.milestones.subtitle") })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-2.5 text-white shadow-md", children: [
                    /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        className: "h-[18px] w-[18px]",
                        children: [
                          /* @__PURE__ */ jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
                          /* @__PURE__ */ jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
                          /* @__PURE__ */ jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
                          /* @__PURE__ */ jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "font-semibold tracking-wide", children: t("pages.milestones.timeline_range") })
                  ] }) })
                ]
              }
            ),
            timelinePanel
          ] })
        ] })
      ] })
    ) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: `
        .milestone-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .milestone-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .milestone-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
        .milestone-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
        }
        .milestone-years-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .milestone-years-scroll::-webkit-scrollbar {
          display: none;
        }
      `
        }
      }
    )
  ] });
}
export {
  MilestonesPage as default
};

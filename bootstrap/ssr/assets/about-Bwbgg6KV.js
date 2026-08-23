import { jsx, jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { E as EsmdVerificationBadge } from "./EsmdVerificationModal-BOYeZnc5.js";
import "lucide-react";
import "react-dom";
const IconBuilding = () => /* @__PURE__ */ jsxs(
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
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }),
      /* @__PURE__ */ jsx("path", { d: "M6 12h4h4" }),
      /* @__PURE__ */ jsx("path", { d: "M6 20h4" }),
      /* @__PURE__ */ jsx("path", { d: "M10 6h4" }),
      /* @__PURE__ */ jsx("path", { d: "M10 10h4" }),
      /* @__PURE__ */ jsx("path", { d: "M10 14h4" }),
      /* @__PURE__ */ jsx("path", { d: "M14 20h4" })
    ]
  }
);
const IconGlobe = () => /* @__PURE__ */ jsxs(
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
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
      /* @__PURE__ */ jsx("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
    ]
  }
);
const IconLeaf = () => /* @__PURE__ */ jsxs(
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
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M7 20s4-9 6-13 6-2 6-2-3 14-5 18" }),
      /* @__PURE__ */ jsx("path", { d: "M22 9s-7-6-13-6c-3 0-9 4-9 9 0 1 0 3 0 3s1 1 3 1c6 0 13-6 13-6" })
    ]
  }
);
const IconTrendingUp = () => /* @__PURE__ */ jsxs(
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
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
      /* @__PURE__ */ jsx("polyline", { points: "17 6 23 6 23 12" })
    ]
  }
);
const IconMining = () => /* @__PURE__ */ jsxs(
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
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M6 20h12l-6-10z" }),
      /* @__PURE__ */ jsx("path", { d: "M8 14l8 0" }),
      /* @__PURE__ */ jsx("path", { d: "M2 20h20" }),
      /* @__PURE__ */ jsx("path", { d: "M12 4v6" })
    ]
  }
);
function AboutPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const HEADER_HEIGHT = 80;
  const FOOTER_HEIGHT = 40;
  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  const companyStats = {
    founded: "1989",
    location: t("pages.about.company_stats_values.location"),
    operations: t("pages.about.company_stats_values.operations"),
    partnerships: t("pages.about.company_stats_values.partnerships")
  };
  const sections = [
    {
      title: t("pages.about.sections.company_foundation.title"),
      subtitle: t("pages.about.sections.company_foundation.subtitle"),
      content: t("pages.about.sections.company_foundation.content"),
      icon: /* @__PURE__ */ jsx(IconBuilding, {})
    },
    {
      title: t("pages.about.sections.global_partnerships.title"),
      subtitle: t("pages.about.sections.global_partnerships.subtitle"),
      content: t("pages.about.sections.global_partnerships.content"),
      icon: /* @__PURE__ */ jsx(IconGlobe, {})
    },
    {
      title: t("pages.about.sections.environmental_stewardship.title"),
      subtitle: t("pages.about.sections.environmental_stewardship.subtitle"),
      content: t("pages.about.sections.environmental_stewardship.content"),
      icon: /* @__PURE__ */ jsx(IconLeaf, {})
    },
    {
      title: t("pages.about.sections.continuous_innovation.title"),
      subtitle: t("pages.about.sections.continuous_innovation.subtitle"),
      content: t("pages.about.sections.continuous_innovation.content"),
      icon: /* @__PURE__ */ jsx(IconTrendingUp, {})
    },
    {
      title: t("pages.about.sections.mining_operations.title"),
      subtitle: t("pages.about.sections.mining_operations.subtitle"),
      content: t("pages.about.sections.mining_operations.content"),
      icon: /* @__PURE__ */ jsx(IconMining, {})
    }
  ];
  const additionalContent = [
    {
      title: t("pages.about.additional_content.our_operations.title"),
      content: t("pages.about.additional_content.our_operations.content")
    },
    {
      title: t("pages.about.additional_content.international_partnerships.title"),
      content: t("pages.about.additional_content.international_partnerships.content")
    },
    {
      title: t("pages.about.additional_content.commitment_excellence.title"),
      content: t("pages.about.additional_content.commitment_excellence.content")
    },
    {
      title: t("pages.about.additional_content.environmental_stewardship.title"),
      content: t("pages.about.additional_content.environmental_stewardship.content")
    },
    {
      title: t("pages.about.additional_content.future_vision.title"),
      content: t("pages.about.additional_content.future_vision.content")
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsxs(Head, { title: "About Us | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Profil lengkap PT Kristalin Ekalestari, pelopor pertambangan emas dan mineral berkelanjutan sejak 1989 di Papua Barat dengan izin IUP OP resmi No. 561/2021/DESDM dan kemitraan masyarakat adat." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "About Us - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Profil lengkap PT Kristalin Ekalestari, pelopor pertambangan emas dan mineral berkelanjutan sejak 1989 di Papua Barat." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
    /* @__PURE__ */ jsxs("div", { className: "z-10 flex flex-1 flex-col pt-16 sm:pt-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "block lg:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-[60vh] min-h-[400px] overflow-hidden bg-black", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl("about.jpg"),
              alt: t("pages.about.alt_texts.mining_operations"),
              className: "h-full w-full object-cover opacity-70"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `absolute right-4 bottom-6 left-4 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-2xl leading-tight font-light text-white sm:text-3xl", children: [
                  t("pages.about.page_title").split(" ").slice(0, 2).join(" "),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "font-normal", children: t("pages.about.page_title").split(" ").slice(2).join(" ") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 h-1 w-16 bg-yellow-400" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute top-4 right-4 transform transition-all delay-500 duration-1500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 text-center", children: Object.entries(companyStats).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-yellow-400", children: value }),
                /* @__PURE__ */ jsx("div", { className: "text-xs tracking-wide text-white/80 uppercase", children: t(`pages.about.company_stats.${key}`) })
              ] }, key)) }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white p-4 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `mb-8 transform transition-all delay-300 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(EsmdVerificationBadge, { variant: "compact" }) }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-yellow-500" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wider text-gray-500 uppercase", children: t("pages.about.page_title") })
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-xl leading-relaxed font-light text-gray-900 sm:text-2xl", children: t("pages.about.main_heading") })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `mb-8 transform transition-all delay-500 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm leading-relaxed text-gray-700 sm:text-base", children: t("pages.about.company_intro") })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mb-8 space-y-4", children: sections.map((section, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `group transform cursor-pointer transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${activeSection === index ? "scale-[1.02] rounded-xl bg-yellow-50 p-4 shadow-lg" : "rounded-xl p-4 hover:bg-gray-50"}`,
              style: {
                transitionDelay: `${700 + index * 150}ms`
              },
              onClick: () => setActiveSection(index),
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `flex-shrink-0 transition-all duration-500 ${activeSection === index ? "scale-125 rotate-12" : "group-hover:scale-110"}`,
                    children: section.icon
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: section.subtitle }),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-base font-semibold transition-colors duration-300 sm:text-lg ${activeSection === index ? "text-yellow-700" : "text-gray-900 group-hover:text-yellow-600"}`,
                        children: section.title
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `leading-relaxed transition-all duration-500 ${activeSection === index ? "text-sm text-gray-800 sm:text-base" : "text-xs text-gray-600 group-hover:text-gray-800 sm:text-sm"}`,
                      children: section.content
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "h-1 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${activeSection === index ? "w-full" : "w-0"}`
                    }
                  ) })
                ] })
              ] })
            },
            index
          )) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transform space-y-6 transition-all delay-1200 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: additionalContent.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "group", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600 sm:text-xl", children: item.title }),
                /* @__PURE__ */ jsx("div", { className: "mb-3 h-0.5 w-8 bg-yellow-500 transition-all duration-300 group-hover:w-12 sm:w-12 sm:group-hover:w-16" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-800 sm:text-base", children: item.content })
              ] }, index))
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `mt-12 transform border-t border-gray-200 pt-6 transition-all delay-1400 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-medium text-gray-900 sm:text-lg", children: t("pages.about.cta.sustainable_growth_title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-gray-600 sm:text-sm", children: t("pages.about.cta.sustainable_growth_desc") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4", children: [
                  /* @__PURE__ */ jsxs("button", { className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg", children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t("pages.about.cta.mining_operations_btn") }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100" })
                  ] }),
                  /* @__PURE__ */ jsx("button", { className: "group rounded-full border-2 border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white", children: /* @__PURE__ */ jsx("a", { href: "/contact", children: t("pages.about.cta.contact_us_btn") }) })
                ] })
              ] })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative hidden w-full lg:flex", style: { height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }, children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-full w-1/2 flex-shrink-0 overflow-hidden bg-black", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl("about.jpg"),
              alt: t("pages.about.alt_texts.mining_operations"),
              className: "h-full w-full object-cover opacity-70"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-5xl leading-tight font-light text-white", children: [
                  t("pages.about.page_title").split(" ").slice(0, 2).join(" "),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "font-normal", children: t("pages.about.page_title").split(" ").slice(2).join(" ") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-6 h-1 w-20 bg-yellow-400" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute top-16 right-16 transform transition-all delay-500 duration-1500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 text-center", children: Object.entries(companyStats).map(([key, value]) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-yellow-400", children: value }),
                /* @__PURE__ */ jsx("div", { className: "text-xs tracking-wide text-white/80 uppercase", children: t(`pages.about.company_stats.${key}`) })
              ] }, key)) }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative h-full w-1/2 flex-shrink-0 bg-white", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-yellow-600" }),
          /* @__PURE__ */ jsx("div", { ref: rightPanelRef, className: "h-full overflow-y-auto", style: { padding: "3rem 4rem" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `mb-12 transform transition-all delay-300 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(EsmdVerificationBadge, { variant: "compact" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center space-x-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-yellow-500" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium tracking-wider text-gray-500 uppercase", children: t("pages.about.page_title") })
                  ] }),
                  /* @__PURE__ */ jsx("h2", { className: "text-3xl leading-relaxed font-light text-gray-900", children: t("pages.about.main_heading") })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `mb-12 transform transition-all delay-500 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: /* @__PURE__ */ jsx("p", { className: "mb-6 text-base leading-relaxed text-gray-700", children: t("pages.about.company_intro") })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mb-12 space-y-8", children: sections.map((section, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `group transform cursor-pointer transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${activeSection === index ? "-mx-2 scale-105 rounded-2xl bg-yellow-50 p-6 shadow-lg" : "-mx-2 rounded-2xl p-6 hover:bg-gray-50"}`,
                style: {
                  transitionDelay: `${700 + index * 150}ms`
                },
                onClick: () => setActiveSection(index),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `flex-shrink-0 text-2xl transition-all duration-500 ${activeSection === index ? "scale-125 rotate-12" : "group-hover:scale-110"}`,
                      children: section.icon
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: section.subtitle }),
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: `text-xl font-semibold transition-colors duration-300 ${activeSection === index ? "text-yellow-700" : "text-gray-900 group-hover:text-yellow-600"}`,
                          children: section.title
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `leading-relaxed transition-all duration-500 ${activeSection === index ? "text-base text-gray-800" : "text-sm text-gray-600 group-hover:text-gray-800"}`,
                        children: section.content
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "h-1 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${activeSection === index ? "w-full" : "w-0"}`
                      }
                    ) })
                  ] })
                ] })
              },
              index
            )) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `transform space-y-8 transition-all delay-1200 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: additionalContent.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "group", children: [
                  /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-yellow-600", children: item.title }),
                  /* @__PURE__ */ jsx("div", { className: "mb-4 h-0.5 w-12 bg-yellow-500 transition-all duration-300 group-hover:w-16" }),
                  /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-800", children: item.content })
                ] }, index))
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `mt-16 transform border-t border-gray-200 pt-8 transition-all delay-1400 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-center", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: t("pages.about.cta.sustainable_growth_title") }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-600", children: t("pages.about.cta.sustainable_growth_desc") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-4", children: [
                    /* @__PURE__ */ jsxs("button", { className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg", children: [
                      /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t("pages.about.cta.mining_operations_btn") }),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100" })
                    ] }),
                    /* @__PURE__ */ jsx("button", { className: "group rounded-full border-2 border-yellow-500 px-8 py-3 font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white", children: /* @__PURE__ */ jsx("a", { href: "/contact", children: t("pages.about.cta.contact_us_btn") }) })
                  ] })
                ] })
              }
            )
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: `
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f59e0b, #d97706);
        }
        * { scroll-behavior: smooth; }
      `
        }
      }
    )
  ] });
}
export {
  AboutPage as default
};

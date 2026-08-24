import { jsx, jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-B2-5It5j.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import "lucide-react";
import "react-dom";
const IconCompetent = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M9 11H3a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h6" }),
      /* @__PURE__ */ jsx("path", { d: "M11 11V3a2 2 0 0 1 2-2h3c1.1 0 2 .9 2 2v8" }),
      /* @__PURE__ */ jsx("path", { d: "M21 11H15" }),
      /* @__PURE__ */ jsx("path", { d: "M7 19V11" })
    ]
  }
);
const IconVisionary = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
    ]
  }
);
const IconInspiring = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
      /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" }),
      /* @__PURE__ */ jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
      /* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
    ]
  }
);
const IconSelfActualizing = () => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
  }
);
const IconHumble = () => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6 sm:h-7 sm:w-7",
    children: /* @__PURE__ */ jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
  }
);
function LeadershipTraitsPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTrait, setActiveTrait] = useState(0);
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
      setActiveTrait((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  const leadershipTraits = [
    {
      title: t("pages.leadership_traits.traits.0.title"),
      subtitle: t("pages.leadership_traits.traits.0.subtitle"),
      description: t("pages.leadership_traits.traits.0.description"),
      icon: /* @__PURE__ */ jsx(IconCompetent, {})
    },
    {
      title: t("pages.leadership_traits.traits.1.title"),
      subtitle: t("pages.leadership_traits.traits.1.subtitle"),
      description: t("pages.leadership_traits.traits.1.description"),
      icon: /* @__PURE__ */ jsx(IconVisionary, {})
    },
    {
      title: t("pages.leadership_traits.traits.2.title"),
      subtitle: t("pages.leadership_traits.traits.2.subtitle"),
      description: t("pages.leadership_traits.traits.2.description"),
      icon: /* @__PURE__ */ jsx(IconInspiring, {})
    },
    {
      title: t("pages.leadership_traits.traits.3.title"),
      subtitle: t("pages.leadership_traits.traits.3.subtitle"),
      description: t("pages.leadership_traits.traits.3.description"),
      icon: /* @__PURE__ */ jsx(IconSelfActualizing, {})
    },
    {
      title: t("pages.leadership_traits.traits.4.title"),
      subtitle: t("pages.leadership_traits.traits.4.subtitle"),
      description: t("pages.leadership_traits.traits.4.description"),
      icon: /* @__PURE__ */ jsx(IconHumble, {})
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsxs(Head, { title: "Leadership Traits | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Karakter kepemimpinan dan budaya kerja di PT Kristalin Ekalestari: Kompeten, Visioner, Menginspirasi, Adaptif, dan Mengutamakan Keselamatan serta Etika." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Leadership Traits - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Karakteristik dan prinsip kepemimpinan profesional di PT Kristalin Ekalestari." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
    /* @__PURE__ */ jsxs("div", { className: "z-10 flex flex-1 flex-col pt-16 sm:pt-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "block lg:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-[60vh] min-h-[400px] overflow-hidden bg-black", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl("leadership.jpg"),
              alt: t("pages.leadership_traits.alt_texts.leadership_meeting"),
              className: "h-full w-full object-cover opacity-70"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `absolute right-4 bottom-6 left-4 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-2xl leading-tight font-light text-white sm:text-3xl", children: [
                  t("pages.leadership_traits.hero_title_1"),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "font-normal", children: t("pages.leadership_traits.hero_title_2") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 h-1 w-16 bg-yellow-400" }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/80 sm:text-base", children: t("pages.leadership_traits.hero_list") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white p-4 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `mb-8 transform transition-all delay-300 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-yellow-500" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wider text-gray-500 uppercase", children: t("pages.leadership_traits.header") })
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "mb-3 text-xl leading-relaxed font-light text-gray-900 sm:text-2xl", children: t("pages.leadership_traits.main_heading") }),
                /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-600 sm:text-base", children: t("pages.leadership_traits.hero_list") })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: leadershipTraits.map((trait, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `group transform cursor-pointer transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${activeTrait === index ? "scale-[1.02] rounded-xl bg-yellow-50 p-4 shadow-lg" : "rounded-xl p-4 hover:bg-gray-50"}`,
              style: {
                transitionDelay: `${500 + index * 150}ms`
              },
              onClick: () => setActiveTrait(index),
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `flex-shrink-0 transition-all duration-500 ${activeTrait === index ? "scale-125 rotate-12" : "group-hover:scale-110"}`,
                    children: trait.icon
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: trait.subtitle }),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `text-base leading-tight font-semibold transition-colors duration-300 sm:text-lg ${activeTrait === index ? "text-yellow-700" : "text-gray-900 group-hover:text-yellow-600"}`,
                        children: trait.title
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `leading-relaxed transition-all duration-500 ${activeTrait === index ? "text-sm text-gray-800 sm:text-base" : "text-xs text-gray-600 group-hover:text-gray-800 sm:text-sm"}`,
                      children: trait.description
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "h-1 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${activeTrait === index ? "w-full" : "w-0"}`
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
              className: `mt-12 transform border-t border-gray-200 pt-6 transition-all delay-1200 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-medium text-gray-900 sm:text-lg", children: t("pages.leadership_traits.cta_title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-gray-600 sm:text-sm", children: t("pages.leadership_traits.cta_desc") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4", children: [
                  /* @__PURE__ */ jsxs("button", { className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg", children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t("pages.leadership_traits.cta_btn_1") }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100" })
                  ] }),
                  /* @__PURE__ */ jsx("button", { className: "group rounded-full border-2 border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white", children: t("pages.leadership_traits.cta_btn_2") })
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
              src: imageUrl("leadership.jpg"),
              alt: t("pages.leadership_traits.alt_texts.leadership_meeting"),
              className: "h-full w-full object-cover opacity-70"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-5xl leading-tight font-light text-white", children: [
                  t("pages.leadership_traits.hero_title_1"),
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { className: "font-normal", children: t("pages.leadership_traits.hero_title_2") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-6 h-1 w-20 bg-yellow-400" }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-lg leading-relaxed text-white/80", children: t("pages.leadership_traits.hero_list") })
              ]
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
                  /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center space-x-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-yellow-500" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium tracking-wider text-gray-500 uppercase", children: t("pages.leadership_traits.header") })
                  ] }),
                  /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl leading-relaxed font-light text-gray-900", children: t("pages.leadership_traits.main_heading") }),
                  /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed text-gray-600", children: t("pages.leadership_traits.hero_list") })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "space-y-8", children: leadershipTraits.map((trait, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `group transform cursor-pointer transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${activeTrait === index ? "-mx-2 scale-105 rounded-2xl bg-yellow-50 p-6 shadow-lg" : "-mx-2 rounded-2xl p-6 hover:bg-gray-50"}`,
                style: {
                  transitionDelay: `${500 + index * 150}ms`
                },
                onClick: () => setActiveTrait(index),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `flex-shrink-0 text-2xl transition-all duration-500 ${activeTrait === index ? "scale-125 rotate-12" : "group-hover:scale-110"}`,
                      children: trait.icon
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: trait.subtitle }),
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: `text-xl leading-tight font-semibold transition-colors duration-300 ${activeTrait === index ? "text-yellow-700" : "text-gray-900 group-hover:text-yellow-600"}`,
                          children: trait.title
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `leading-relaxed transition-all duration-500 ${activeTrait === index ? "text-base text-gray-800" : "text-sm text-gray-600 group-hover:text-gray-800"}`,
                        children: trait.description
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "h-1 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${activeTrait === index ? "w-full" : "w-0"}`
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
                className: `mt-16 transform border-t border-gray-200 pt-8 transition-all delay-1200 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-center", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: t("pages.leadership_traits.cta_title") }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-600", children: t("pages.leadership_traits.cta_desc") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-4", children: [
                    /* @__PURE__ */ jsxs("button", { className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg", children: [
                      /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t("pages.leadership_traits.cta_btn_1") }),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100" })
                    ] }),
                    /* @__PURE__ */ jsx("button", { className: "group rounded-full border-2 border-yellow-500 px-8 py-3 font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white", children: t("pages.leadership_traits.cta_btn_2") })
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
  LeadershipTraitsPage as default
};

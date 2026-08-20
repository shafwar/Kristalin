import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import "lucide-react";
import "react-dom";
const IconEye = () => /* @__PURE__ */ jsxs(
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
const IconTrendingUp = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-6 sm:w-6",
    children: [
      /* @__PURE__ */ jsx("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
      /* @__PURE__ */ jsx("polyline", { points: "17 6 23 6 23 12" })
    ]
  }
);
const IconUsers = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-6 sm:w-6",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
      /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" }),
      /* @__PURE__ */ jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
      /* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
    ]
  }
);
const IconSettings = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-6 sm:w-6",
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" }),
      /* @__PURE__ */ jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
    ]
  }
);
const IconTarget = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-6 sm:w-6",
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "6" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "2" })
    ]
  }
);
const IconLeaf = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-6 sm:w-6",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M7 20s4-9 6-13 6-2 6-2-3 14-5 18" }),
      /* @__PURE__ */ jsx("path", { d: "M22 9s-7-6-13-6c-3 0-9 4-9 9 0 1 0 3 0 3s1 1 3 1c6 0 13-6 13-6" })
    ]
  }
);
const IconHeart = () => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fbbf24",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-6 sm:w-6",
    children: /* @__PURE__ */ jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })
  }
);
function VisionMissionPage() {
  const { t } = useTranslation();
  const rightPanelRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMission, setActiveMission] = useState(0);
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
      setActiveMission((prev) => (prev + 1) % 6);
    }, 4e3);
    return () => clearInterval(interval);
  }, []);
  const missionPillars = [
    {
      title: t("pages.vision_mission.mission.pillars.growth_development.title"),
      subtitle: t("pages.vision_mission.mission.pillars.growth_development.subtitle"),
      description: t("pages.vision_mission.mission.pillars.growth_development.description"),
      icon: /* @__PURE__ */ jsx(IconTrendingUp, {})
    },
    {
      title: t("pages.vision_mission.mission.pillars.professional_entity.title"),
      subtitle: t("pages.vision_mission.mission.pillars.professional_entity.subtitle"),
      description: t("pages.vision_mission.mission.pillars.professional_entity.description"),
      icon: /* @__PURE__ */ jsx(IconUsers, {})
    },
    {
      title: t("pages.vision_mission.mission.pillars.managerial_principles.title"),
      subtitle: t("pages.vision_mission.mission.pillars.managerial_principles.subtitle"),
      description: t("pages.vision_mission.mission.pillars.managerial_principles.description"),
      icon: /* @__PURE__ */ jsx(IconSettings, {})
    },
    {
      title: t("pages.vision_mission.mission.pillars.technology_integration.title"),
      subtitle: t("pages.vision_mission.mission.pillars.technology_integration.subtitle"),
      description: t("pages.vision_mission.mission.pillars.technology_integration.description"),
      icon: /* @__PURE__ */ jsx(IconTarget, {})
    },
    {
      title: t("pages.vision_mission.mission.pillars.environmental_stewardship.title"),
      subtitle: t("pages.vision_mission.mission.pillars.environmental_stewardship.subtitle"),
      description: t("pages.vision_mission.mission.pillars.environmental_stewardship.description"),
      icon: /* @__PURE__ */ jsx(IconLeaf, {})
    },
    {
      title: t("pages.vision_mission.mission.pillars.community_empowerment.title"),
      subtitle: t("pages.vision_mission.mission.pillars.community_empowerment.subtitle"),
      description: t("pages.vision_mission.mission.pillars.community_empowerment.description"),
      icon: /* @__PURE__ */ jsx(IconHeart, {})
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsxs(Head, { title: "Vision & Mission | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Visi dan misi PT Kristalin Ekalestari: Menjadi pemimpin pertambangan emas berkelanjutan, terintegrasi, berorientasi ESG, dan berdaya saing global di Indonesia." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Vision & Mission - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Visi dan misi PT Kristalin Ekalestari: Menjadi pemimpin pertambangan emas berkelanjutan di Indonesia." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
    /* @__PURE__ */ jsxs("div", { className: "z-10 flex flex-1 flex-col pt-16 sm:pt-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "block lg:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-[60vh] min-h-[400px] overflow-hidden bg-black", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl("visionmission.jpg"),
              alt: t("pages.vision_mission.alt_texts.gold_bars"),
              className: "h-full w-full object-cover opacity-80"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `absolute right-4 bottom-6 left-4 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsx("h1", { className: "text-2xl leading-tight font-light text-white sm:text-3xl", children: (() => {
                  const title = t("pages.vision_mission.page_title");
                  if (title.includes(" & ")) {
                    const parts = title.split(" & ");
                    return /* @__PURE__ */ jsxs(Fragment, { children: [
                      parts[0],
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsxs("span", { className: "font-normal", children: [
                        "& ",
                        parts[1]
                      ] })
                    ] });
                  } else {
                    return /* @__PURE__ */ jsx("span", { className: "font-normal", children: title });
                  }
                })() }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 h-1 w-16 bg-yellow-400" }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/80 sm:text-base", children: t("pages.vision_mission.description") })
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
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wider text-gray-500 uppercase", children: t("pages.vision_mission.subtitle") })
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-xl leading-relaxed font-light text-gray-900 sm:text-2xl", children: t("pages.vision_mission.main_heading") })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `mb-12 transform transition-all delay-500 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-yellow-200 bg-yellow-50 p-4 sm:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3 sm:space-x-4", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-1 flex-shrink-0", children: /* @__PURE__ */ jsx(IconEye, {}) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: t("pages.vision_mission.vision.label") }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg leading-tight font-semibold text-yellow-800 sm:text-xl", children: t("pages.vision_mission.vision.title") })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-yellow-700 sm:text-base", children: t("pages.vision_mission.vision.content") })
                ] })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `mb-6 transform transition-all delay-700 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-yellow-500" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium tracking-wider text-gray-500 uppercase", children: t("pages.vision_mission.mission.label") })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg leading-relaxed font-light text-gray-900 sm:text-xl", children: t("pages.vision_mission.mission.title") })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: missionPillars.map((pillar, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `group transform cursor-pointer transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${activeMission === index ? "scale-[1.02] rounded-xl bg-yellow-50 p-4 shadow-lg" : "rounded-xl p-4 hover:bg-gray-50"}`,
              style: {
                transitionDelay: `${900 + index * 150}ms`
              },
              onClick: () => setActiveMission(index),
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `flex-shrink-0 transition-all duration-500 ${activeMission === index ? "scale-125 rotate-12" : "group-hover:scale-110"}`,
                    children: pillar.icon
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: pillar.subtitle }),
                    /* @__PURE__ */ jsx(
                      "h4",
                      {
                        className: `text-sm leading-tight font-semibold transition-colors duration-300 sm:text-base ${activeMission === index ? "text-yellow-700" : "text-gray-900 group-hover:text-yellow-600"}`,
                        children: pillar.title
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `leading-relaxed transition-all duration-500 ${activeMission === index ? "text-xs text-gray-800 sm:text-sm" : "text-xs text-gray-600 group-hover:text-gray-800"}`,
                      children: pillar.description
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "h-1 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${activeMission === index ? "w-full" : "w-0"}`
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
              className: `mt-12 transform border-t border-gray-200 pt-6 transition-all delay-1400 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-medium text-gray-900 sm:text-lg", children: t("pages.vision_mission.cta.prosperity_title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-gray-600 sm:text-sm", children: t("pages.vision_mission.cta.prosperity_desc") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4", children: [
                  /* @__PURE__ */ jsxs("button", { className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg", children: [
                    /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t("pages.vision_mission.cta.impact_stories_btn") }),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100" })
                  ] }),
                  /* @__PURE__ */ jsx("button", { className: "group rounded-full border-2 border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white", children: t("pages.vision_mission.cta.learn_more_btn") })
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
              src: imageUrl("visionmission.jpg"),
              alt: t("pages.vision_mission.alt_texts.gold_bars"),
              className: "h-full w-full object-cover opacity-80"
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `absolute bottom-16 left-16 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsx("h1", { className: "text-5xl leading-tight font-light text-white", children: (() => {
                  const title = t("pages.vision_mission.page_title");
                  if (title.includes(" & ")) {
                    const parts = title.split(" & ");
                    return /* @__PURE__ */ jsxs(Fragment, { children: [
                      parts[0],
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsxs("span", { className: "font-normal", children: [
                        "& ",
                        parts[1]
                      ] })
                    ] });
                  } else {
                    return /* @__PURE__ */ jsx("span", { className: "font-normal", children: title });
                  }
                })() }),
                /* @__PURE__ */ jsx("div", { className: "mt-6 h-1 w-20 bg-yellow-400" }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-lg leading-relaxed text-white/80", children: t("pages.vision_mission.description") })
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
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium tracking-wider text-gray-500 uppercase", children: t("pages.vision_mission.subtitle") })
                  ] }),
                  /* @__PURE__ */ jsx("h2", { className: "text-3xl leading-relaxed font-light text-gray-900", children: t("pages.vision_mission.main_heading") })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `mb-16 transform transition-all delay-500 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-yellow-200 bg-yellow-50 p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-6", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 text-3xl", children: /* @__PURE__ */ jsx(IconEye, {}) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: t("pages.vision_mission.vision.label") }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl leading-tight font-semibold text-yellow-800", children: t("pages.vision_mission.vision.title") })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-yellow-700", children: t("pages.vision_mission.vision.content") })
                  ] })
                ] }) })
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `mb-8 transform transition-all delay-700 duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center space-x-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-yellow-500" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium tracking-wider text-gray-500 uppercase", children: t("pages.vision_mission.mission.label") })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl leading-relaxed font-light text-gray-900", children: t("pages.vision_mission.mission.title") })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "space-y-6", children: missionPillars.map((pillar, index) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `group transform cursor-pointer transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${activeMission === index ? "-mx-2 scale-105 rounded-2xl bg-yellow-50 p-6 shadow-lg" : "-mx-2 rounded-2xl p-6 hover:bg-gray-50"}`,
                style: {
                  transitionDelay: `${900 + index * 150}ms`
                },
                onClick: () => setActiveMission(index),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `flex-shrink-0 text-2xl transition-all duration-500 ${activeMission === index ? "scale-125 rotate-12" : "group-hover:scale-110"}`,
                      children: pillar.icon
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-1 text-xs font-semibold tracking-wider text-yellow-600 uppercase", children: pillar.subtitle }),
                      /* @__PURE__ */ jsx(
                        "h4",
                        {
                          className: `text-lg leading-tight font-semibold transition-colors duration-300 ${activeMission === index ? "text-yellow-700" : "text-gray-900 group-hover:text-yellow-600"}`,
                          children: pillar.title
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: `leading-relaxed transition-all duration-500 ${activeMission === index ? "text-sm text-gray-800" : "text-xs text-gray-600 group-hover:text-gray-800"}`,
                        children: pillar.description
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "h-1 w-full overflow-hidden rounded-full bg-gray-200", children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ${activeMission === index ? "w-full" : "w-0"}`
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
                className: `mt-16 transform border-t border-gray-200 pt-8 transition-all delay-1400 duration-1500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
                children: /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-center", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: t("pages.vision_mission.cta.prosperity_title") }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-600", children: t("pages.vision_mission.cta.prosperity_desc") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-4", children: [
                    /* @__PURE__ */ jsxs("button", { className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg", children: [
                      /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t("pages.vision_mission.cta.impact_stories_btn") }),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-yellow-600 to-yellow-700 transition-transform duration-300 group-hover:scale-x-100" })
                    ] }),
                    /* @__PURE__ */ jsx("button", { className: "group rounded-full border-2 border-yellow-500 px-8 py-3 font-medium text-yellow-600 transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-white", children: t("pages.vision_mission.cta.learn_more_btn") })
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
  VisionMissionPage as default
};

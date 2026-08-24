import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-0QpcYAMD.js";
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
  const jobPositions = [
    {
      id: 1,
      title: t("pages.careers.job_positions.mining_engineer.title"),
      department: t("pages.careers.job_positions.mining_engineer.department"),
      location: t("pages.careers.job_positions.mining_engineer.location"),
      type: t("pages.careers.job_positions.mining_engineer.type"),
      experience: t("pages.careers.job_positions.mining_engineer.experience"),
      description: t("pages.careers.job_positions.mining_engineer.description"),
      requirements: [
        t("pages.careers.job_positions.mining_engineer.requirements.1"),
        t("pages.careers.job_positions.mining_engineer.requirements.2"),
        t("pages.careers.job_positions.mining_engineer.requirements.3"),
        t("pages.careers.job_positions.mining_engineer.requirements.4"),
        t("pages.careers.job_positions.mining_engineer.requirements.5")
      ]
    },
    {
      id: 2,
      title: t("pages.careers.job_positions.geologist.title"),
      department: t("pages.careers.job_positions.geologist.department"),
      location: t("pages.careers.job_positions.geologist.location"),
      type: t("pages.careers.job_positions.geologist.type"),
      experience: t("pages.careers.job_positions.geologist.experience"),
      description: t("pages.careers.job_positions.geologist.description"),
      requirements: [
        t("pages.careers.job_positions.geologist.requirements.1"),
        t("pages.careers.job_positions.geologist.requirements.2"),
        t("pages.careers.job_positions.geologist.requirements.3"),
        t("pages.careers.job_positions.geologist.requirements.4"),
        t("pages.careers.job_positions.geologist.requirements.5")
      ]
    },
    {
      id: 3,
      title: t("pages.careers.job_positions.environmental_specialist.title"),
      department: t("pages.careers.job_positions.environmental_specialist.department"),
      location: t("pages.careers.job_positions.environmental_specialist.location"),
      type: t("pages.careers.job_positions.environmental_specialist.type"),
      experience: t("pages.careers.job_positions.environmental_specialist.experience"),
      description: t("pages.careers.job_positions.environmental_specialist.description"),
      requirements: [
        t("pages.careers.job_positions.environmental_specialist.requirements.1"),
        t("pages.careers.job_positions.environmental_specialist.requirements.2"),
        t("pages.careers.job_positions.environmental_specialist.requirements.3"),
        t("pages.careers.job_positions.environmental_specialist.requirements.4"),
        t("pages.careers.job_positions.environmental_specialist.requirements.5")
      ]
    },
    {
      id: 4,
      title: t("pages.careers.job_positions.safety_officer.title"),
      department: t("pages.careers.job_positions.safety_officer.department"),
      location: t("pages.careers.job_positions.safety_officer.location"),
      type: t("pages.careers.job_positions.safety_officer.type"),
      experience: t("pages.careers.job_positions.safety_officer.experience"),
      description: t("pages.careers.job_positions.safety_officer.description"),
      requirements: [
        t("pages.careers.job_positions.safety_officer.requirements.1"),
        t("pages.careers.job_positions.safety_officer.requirements.2"),
        t("pages.careers.job_positions.safety_officer.requirements.3"),
        t("pages.careers.job_positions.safety_officer.requirements.4"),
        t("pages.careers.job_positions.safety_officer.requirements.5")
      ]
    },
    {
      id: 5,
      title: t("pages.careers.job_positions.community_relations_officer.title"),
      department: t("pages.careers.job_positions.community_relations_officer.department"),
      location: t("pages.careers.job_positions.community_relations_officer.location"),
      type: t("pages.careers.job_positions.community_relations_officer.type"),
      experience: t("pages.careers.job_positions.community_relations_officer.experience"),
      description: t("pages.careers.job_positions.community_relations_officer.description"),
      requirements: [
        t("pages.careers.job_positions.community_relations_officer.requirements.1"),
        t("pages.careers.job_positions.community_relations_officer.requirements.2"),
        t("pages.careers.job_positions.community_relations_officer.requirements.3"),
        t("pages.careers.job_positions.community_relations_officer.requirements.4"),
        t("pages.careers.job_positions.community_relations_officer.requirements.5")
      ]
    },
    {
      id: 6,
      title: t("pages.careers.job_positions.administrative_assistant.title"),
      department: t("pages.careers.job_positions.administrative_assistant.department"),
      location: t("pages.careers.job_positions.administrative_assistant.location"),
      type: t("pages.careers.job_positions.administrative_assistant.type"),
      experience: t("pages.careers.job_positions.administrative_assistant.experience"),
      description: t("pages.careers.job_positions.administrative_assistant.description"),
      requirements: [
        t("pages.careers.job_positions.administrative_assistant.requirements.1"),
        t("pages.careers.job_positions.administrative_assistant.requirements.2"),
        t("pages.careers.job_positions.administrative_assistant.requirements.3"),
        t("pages.careers.job_positions.administrative_assistant.requirements.4"),
        t("pages.careers.job_positions.administrative_assistant.requirements.5")
      ]
    }
  ];
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
    /* @__PURE__ */ jsxs(Head, { title: "Careers | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Peluang karir dan pengembangan profesional di PT Kristalin Ekalestari. Bergabung bersama kami membangun industri pertambangan yang berkelanjutan dan berdaya saing." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Careers - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Peluang karir di bidang pertambangan, metalurgi, teknik geologi, dan manajemen di PT Kristalin Ekalestari." })
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
          className: `rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ${activeTab === tab.id ? "bg-yellow-500 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`,
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
        activeTab === "positions" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "space-y-8",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center", children: [
                /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-gray-900 sm:text-4xl", children: t("pages.careers.positions.title") }),
                /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-gray-600", children: t("pages.careers.positions.subtitle") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: jobPositions.map((position, index) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: index * 0.1 },
                  className: "rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg",
                  children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-semibold text-gray-900", children: position.title }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-gray-600", children: [
                          /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                            /* @__PURE__ */ jsx("span", { className: "mr-2", children: "🏢" }),
                            position.department
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                            /* @__PURE__ */ jsx("span", { className: "mr-2", children: "📍" }),
                            position.location
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                            /* @__PURE__ */ jsx("span", { className: "mr-2", children: "⏰" }),
                            position.type
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                            /* @__PURE__ */ jsx("span", { className: "mr-2", children: "📅" }),
                            position.experience
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "mb-4 text-gray-600", children: position.description }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("h4", { className: "mb-2 font-semibold text-gray-900", children: [
                          t("pages.careers.positions.requirements"),
                          ":"
                        ] }),
                        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: position.requirements.map((req, reqIndex) => /* @__PURE__ */ jsxs("li", { className: "flex items-start text-sm text-gray-600", children: [
                          /* @__PURE__ */ jsx("span", { className: "mt-1 mr-2 text-yellow-500", children: "•" }),
                          req
                        ] }, reqIndex)) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 lg:ml-6", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => goToTab("apply"),
                          className: "rounded-lg bg-yellow-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg",
                          children: t("pages.careers.positions.apply")
                        }
                      ),
                      /* @__PURE__ */ jsx("button", { className: "rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50", children: t("pages.careers.positions.save") })
                    ] })
                  ] })
                },
                position.id
              )) })
            ]
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
                /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-gray-900 sm:text-4xl", children: t("pages.careers.apply.title") }),
                /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-lg text-gray-600", children: t("pages.careers.apply.subtitle") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 p-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-4 text-4xl", children: "📝" }),
                  /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl font-semibold text-gray-900", children: t("pages.careers.apply.google_form.title") }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: t("pages.careers.apply.google_form.description") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm", children: [
                    /* @__PURE__ */ jsx("h4", { className: "mb-2 font-semibold text-gray-900", children: t("pages.careers.apply.google_form.features.title") }),
                    /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-2 text-yellow-500", children: "✓" }),
                        t("pages.careers.apply.google_form.features.1")
                      ] }),
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-2 text-yellow-500", children: "✓" }),
                        t("pages.careers.apply.google_form.features.2")
                      ] }),
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-2 text-yellow-500", children: "✓" }),
                        t("pages.careers.apply.google_form.features.3")
                      ] }),
                      /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "mr-2 text-yellow-500", children: "✓" }),
                        t("pages.careers.apply.google_form.features.4")
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => window.open("https://forms.gle/Qzi2TpTjC5GhQMMV8", "_blank"),
                      className: "w-full rounded-lg bg-yellow-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg",
                      children: t("pages.careers.apply.google_form.open_form")
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "text-center text-sm text-gray-500", children: t("pages.careers.apply.google_form.note") })
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

import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";
import React__default, { useRef, useState, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-0QpcYAMD.js";
import { W as WelcomeGridPicture } from "./WelcomeGridPicture-BBBlV399.js";
import { u as useLazySectionBackground } from "./useLazySectionBackground-B142Bpn2.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import "lucide-react";
import "react-dom";
import "./useNetworkProfile-BaMceDYv.js";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
};
const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};
const CounterAnimation = ({ target, duration = 1e3 }) => {
  const [count, setCount] = useState(target);
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    if (hasStarted) {
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        setCount((prevCount) => {
          const nextCount = prevCount + increment;
          if (nextCount >= target) {
            clearInterval(timer);
            return target;
          }
          return nextCount;
        });
      }, 16);
      return () => clearInterval(timer);
    }
  }, [hasStarted, target, duration]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.5, rotateY: -180 },
      whileInView: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
          scale: { duration: 0.4 },
          rotateY: { duration: 0.7 }
        }
      },
      viewport: { once: true },
      onViewportEnter: () => setHasStarted(true),
      className: "mb-6 text-6xl font-bold text-white md:text-8xl",
      children: [
        Math.floor(count),
        "+"
      ]
    }
  );
};
function KristalinPortfolio() {
  const { t } = useTranslation();
  const companyProfileRef = React__default.useRef(null);
  const scrollRafRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const [isLgViewport, setIsLgViewport] = useState(null);
  const whyChooseUsBg = useLazySectionBackground(imageUrl("hero-linebusiness.jpg"));
  const heroParallaxOn = isLgViewport === true;
  const heroBundleOptions = isLgViewport === false ? { lcpHero: true } : { maxWidth: 960 };
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const syncViewport = () => setIsLgViewport(mq.matches);
    syncViewport();
    mq.addEventListener("change", syncViewport);
    return () => mq.removeEventListener("change", syncViewport);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(scrollRafRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScrollToCompanyProfile = () => {
    if (companyProfileRef.current) {
      companyProfileRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsx(Head, { title: t("pages.line_of_business.page_title") }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: true }),
    /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `absolute inset-0 h-full w-full ${heroParallaxOn ? "will-change-transform" : ""}`,
          style: heroParallaxOn ? { transform: `translateY(${scrollY * 0.5}px)` } : { transform: "none" },
          children: [
            /* @__PURE__ */ jsx(
              WelcomeGridPicture,
              {
                imageId: "portofolio",
                alt: t("pages.line_of_business.alt_texts.mining_future"),
                pictureClassName: "block h-full min-h-full w-full",
                className: "h-full min-h-full w-full object-cover object-center",
                sizes: "(max-width: 1023px) 100vw, 100vw",
                loading: "eager",
                fetchPriority: "high",
                decoding: "async",
                bundleOptions: heroBundleOptions
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "relative z-20 mx-auto w-full max-w-5xl px-4 pt-16 pb-4 text-center",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.45, ease: "easeOut" },
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "transform transition-all duration-700 ease-out",
              style: {
                transform: heroParallaxOn ? `translateY(${scrollY * 0.2}px)` : "none",
                opacity: Math.max(0, 1 - scrollY / 600)
              },
              initial: { opacity: 0, y: 80 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    className: "mb-4 text-3xl leading-tight font-bold sm:mb-6 sm:text-4xl md:text-5xl lg:text-7xl",
                    initial: { opacity: 0, y: 50, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.55, delay: 0.2, ease: "easeOut" },
                    children: [
                      /* @__PURE__ */ jsxs(
                        motion.span,
                        {
                          className: "text-white drop-shadow-lg",
                          initial: { opacity: 0, x: -30 },
                          animate: { opacity: 1, x: 0 },
                          transition: { duration: 0.5, delay: 0.3 },
                          children: [
                            t("pages.line_of_business.hero_title_1"),
                            " "
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg",
                          initial: { opacity: 0, x: 30 },
                          animate: { opacity: 1, x: 0 },
                          transition: { duration: 0.5, delay: 0.38 },
                          children: t("pages.line_of_business.hero_title_2")
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.h2,
                  {
                    className: "mb-4 text-xl font-bold text-white drop-shadow-lg sm:mb-6 sm:text-2xl md:text-3xl lg:text-5xl",
                    style: { letterSpacing: "-1px" },
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.55, delay: 0.48, ease: "easeOut" },
                    children: t("pages.line_of_business.hero_subtitle")
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    className: "mx-auto mb-4 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:text-lg md:text-xl lg:text-2xl",
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.55, delay: 0.58, ease: "easeOut" },
                    children: t("pages.line_of_business.hero_description")
                  }
                )
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "relative z-20 -mt-2 mb-4 w-full px-3 sm:mb-6 sm:px-4",
          style: {
            transform: heroParallaxOn ? `translateY(${scrollY * 0.15}px)` : "none",
            opacity: Math.max(0.3, 1 - scrollY / 800)
          },
          initial: { opacity: 0, y: 60 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay: 0.72, ease: "easeOut" },
          children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.6, ease: "easeOut" },
              className: "grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -50, scale: 0.9 },
                    whileInView: { opacity: 1, x: 0, scale: 1 },
                    viewport: { once: true, amount: 0.2 },
                    transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                    whileHover: {
                      scale: 1.02,
                      y: -2,
                      boxShadow: "0 15px 30px rgba(251, 191, 36, 0.2)"
                    },
                    className: "rounded-xl border border-white/20 bg-black/85 p-4 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-amber-400/30 hover:bg-black/90 sm:rounded-2xl sm:p-6 lg:p-8",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 sm:gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "flex flex-shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          className: "h-8 w-8 text-white sm:h-10 sm:w-10 lg:h-12 lg:w-12",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          viewBox: "0 0 24 24",
                          children: [
                            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "white", strokeWidth: "2" }),
                            /* @__PURE__ */ jsx("ellipse", { cx: "12", cy: "12", rx: "10", ry: "4", stroke: "white", strokeWidth: "2" }),
                            /* @__PURE__ */ jsx("path", { d: "M2 12a10 10 0 0 0 20 0", stroke: "white", strokeWidth: "2" }),
                            /* @__PURE__ */ jsx("path", { d: "M12 2a15 15 0 0 1 0 20", stroke: "white", strokeWidth: "2" }),
                            /* @__PURE__ */ jsx("path", { d: "M12 2a15 15 0 0 0 0 20", stroke: "white", strokeWidth: "2" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl lg:text-2xl", children: t("pages.line_of_business.values.integrity.title") }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed font-light text-white/85 sm:text-sm lg:text-base", children: t("pages.line_of_business.values.integrity.description") })
                      ] })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 50, scale: 0.9 },
                    whileInView: { opacity: 1, x: 0, scale: 1 },
                    viewport: { once: true, amount: 0.2 },
                    transition: { duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                    whileHover: {
                      scale: 1.02,
                      y: -2,
                      boxShadow: "0 15px 30px rgba(251, 191, 36, 0.2)"
                    },
                    className: "rounded-xl border border-white/20 bg-black/85 p-4 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-amber-400/30 hover:bg-black/90 sm:rounded-2xl sm:p-6 lg:p-8",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 sm:gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "flex flex-shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          className: "h-8 w-8 text-white sm:h-10 sm:w-10 lg:h-12 lg:w-12",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          viewBox: "0 0 24 24",
                          children: [
                            /* @__PURE__ */ jsx("circle", { cx: "9", cy: "10", r: "4", stroke: "white", strokeWidth: "2" }),
                            /* @__PURE__ */ jsx("circle", { cx: "17", cy: "13", r: "3", stroke: "white", strokeWidth: "2" }),
                            /* @__PURE__ */ jsx("path", { d: "M2 20c0-2.5 3.5-4.5 7-4.5s7 2 7 4.5", stroke: "white", strokeWidth: "2" }),
                            /* @__PURE__ */ jsx("path", { d: "M14 20c0-1.5 2-2.5 4-2.5s4 1 4 2.5", stroke: "white", strokeWidth: "2" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl lg:text-2xl", children: t("pages.line_of_business.values.commitment.title") }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed font-light text-white/85 sm:text-sm lg:text-base", children: t("pages.line_of_business.values.commitment.description") })
                      ] })
                    ] })
                  }
                )
              ]
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "relative z-20 mb-6 w-full px-4 sm:mb-8",
          style: {
            transform: heroParallaxOn ? `translateY(${scrollY * 0.1}px)` : "none",
            opacity: Math.max(0.4, 1 - scrollY / 700)
          },
          initial: { opacity: 0, y: 40, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.65, delay: 0.95, ease: "easeOut" },
          children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
            motion.button,
            {
              initial: { opacity: 0, y: 30, scale: 0.9 },
              whileInView: { opacity: 1, y: 0, scale: 1 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              whileHover: {
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
              },
              whileTap: { scale: 0.95 },
              onClick: handleScrollToCompanyProfile,
              className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg",
              children: [
                /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2 sm:gap-3", children: [
                  t("pages.line_of_business.explore_operations_btn"),
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
          ) })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute bottom-4 left-1/2 -translate-x-1/2 transform sm:bottom-6 lg:bottom-8",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 1.15, ease: "easeOut" },
          children: /* @__PURE__ */ jsx("div", { className: "flex h-8 w-5 justify-center rounded-full border-2 border-white/60 sm:h-10 sm:w-6", children: /* @__PURE__ */ jsx("div", { className: "mt-1 h-2 w-1 animate-bounce rounded-full bg-white sm:mt-2 sm:h-3" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      motion.section,
      {
        ref: companyProfileRef,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
        className: "mx-auto max-w-6xl px-4 py-20",
        children: [
          /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, transition: { duration: 0.4, ease: "easeInOut" }, className: "mb-16 text-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-sm font-semibold tracking-[0.25em] text-gray-700", children: t("pages.line_of_business.company_profile.header") }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-12 h-0.5 w-20 bg-yellow-600" }),
            /* @__PURE__ */ jsxs("h3", { className: "text-4xl font-normal text-gray-800 md:text-5xl lg:text-6xl", children: [
              t("pages.line_of_business.company_profile.title_line1"),
              /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
              t("pages.line_of_business.company_profile.title_line2")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-center gap-16 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxs(motion.div, { variants: slideInLeft, transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" }, className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { delay: 0.1, duration: 0.4 },
                    className: "flex items-start space-x-4",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-600" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-800", children: [
                          t("pages.line_of_business.company_info.company_name_label"),
                          ":"
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: t("pages.line_of_business.company_info.company_name_value") })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { delay: 0.2, duration: 0.4 },
                    className: "flex items-start space-x-4",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-600" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-800", children: [
                          t("pages.line_of_business.company_info.business_field_label"),
                          ":"
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: t("pages.line_of_business.company_info.business_field_value") })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { delay: 0.3, duration: 0.4 },
                    className: "flex items-start space-x-4",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-600" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-800", children: [
                          t("pages.line_of_business.company_info.established_label"),
                          ":"
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: t("pages.line_of_business.company_info.established_value") })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { delay: 0.4, duration: 0.4 },
                    className: "flex items-start space-x-4",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-600" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-800", children: [
                          t("pages.line_of_business.company_info.head_office_label"),
                          ":"
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: t("pages.line_of_business.company_info.head_office_value") })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { delay: 0.5, duration: 0.4 },
                    className: "flex items-start space-x-4",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-600" }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("span", { className: "font-semibold text-gray-800", children: [
                          t("pages.line_of_business.company_info.business_license_label"),
                          ":"
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: t("pages.line_of_business.company_info.business_license_value") })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { delay: 0.6, duration: 0.4, ease: "easeInOut" },
                  className: "mt-8 text-lg leading-relaxed text-gray-600",
                  children: t("pages.line_of_business.company_description")
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                variants: scaleIn,
                transition: { delay: 0.4, duration: 0.4, ease: "easeInOut" },
                className: "flex items-center justify-center",
                children: /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.05 }, transition: { duration: 0.4 }, className: "mx-auto w-full max-w-lg text-center", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: imageUrl("kristalin-logo-v2.png"),
                    alt: "Kristalin Logo",
                    className: "mx-auto mb-6 h-56 w-56 object-contain md:h-80 md:w-80 lg:h-96 lg:w-96",
                    loading: "lazy",
                    decoding: "async",
                    fetchPriority: "low"
                  }
                ) })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(motion.section, { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 }, className: "bg-gray-50 py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, transition: { duration: 0.4, ease: "easeInOut" }, className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-sm font-semibold tracking-[0.25em] text-gray-700", children: t("pages.line_of_business.services.header") }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-12 h-0.5 w-20 bg-yellow-600" }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-normal text-gray-800 md:text-5xl lg:text-6xl", children: t("pages.line_of_business.services.title") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20", children: [
        /* @__PURE__ */ jsxs(motion.div, { variants: slideInLeft, transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" }, className: "text-center", children: [
          /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.1, rotate: 5 }, transition: { duration: 0.4 }, className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-yellow-600 shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2L13.09 8.26L19 4L14.74 9.91L21 12L14.74 14.09L19 20L13.09 15.74L12 22L10.91 15.74L5 20L9.26 14.09L3 12L9.26 9.91L5 4L10.91 8.26L12 2Z" }) }) }) }),
          /* @__PURE__ */ jsx("h4", { className: "mb-6 text-xl font-semibold tracking-wide text-gray-800", children: t("pages.line_of_business.services.gold_mining.title") }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed font-normal text-gray-600", children: t("pages.line_of_business.services.gold_mining.description") })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { variants: slideInRight, transition: { delay: 0.5, duration: 0.4, ease: "easeInOut" }, className: "text-center", children: [
          /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.1, rotate: -5 }, transition: { duration: 0.4 }, className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-yellow-600 shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L11.92 12.25L18.5 5.67L21 7V9ZM3.5 4L2 5.5L10.84 14.34L7.07 18.11C6.68 18.5 6.68 19.13 7.07 19.52C7.46 19.91 8.09 19.91 8.48 19.52L13 15L14.5 16.5L16 15L15 14L14 13L12 11L8.5 7.5L3.5 4Z" }) }) }) }),
          /* @__PURE__ */ jsx("h4", { className: "mb-6 text-xl font-semibold tracking-wide text-gray-800", children: t("pages.line_of_business.services.environmental.title") }),
          /* @__PURE__ */ jsx("p", { className: "leading-relaxed font-normal text-gray-600", children: t("pages.line_of_business.services.environmental.description") })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(motion.section, { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 }, className: "bg-black py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 text-center", children: /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, transition: { duration: 0.4, ease: "easeInOut" }, children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.5, rotate: -180 },
          whileInView: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
              duration: 0.7,
              ease: "easeInOut",
              rotate: { duration: 0.7 }
            }
          },
          viewport: { once: true },
          whileHover: {
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.4 }
          },
          className: "mb-8 flex justify-center",
          children: /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-black", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" }) }) })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.h3,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" },
          className: "mb-4 text-2xl font-normal text-white md:text-3xl",
          children: t("pages.line_of_business.projects.title")
        }
      ),
      /* @__PURE__ */ jsx(CounterAnimation, { target: 15, duration: 1e3 }),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.8, duration: 0.4, ease: "easeInOut" },
          className: "mx-auto max-w-3xl text-lg leading-relaxed text-white/80",
          children: t("pages.line_of_business.projects.description")
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(motion.section, { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 }, className: "bg-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, transition: { duration: 0.4, ease: "easeInOut" }, className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-sm font-semibold tracking-[0.25em] text-gray-700", children: t("pages.line_of_business.how_we_work.header") }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-12 h-0.5 w-20 bg-yellow-600" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-4xl font-normal text-gray-800 md:text-5xl lg:text-6xl", children: [
          t("pages.line_of_business.how_we_work.title_line1"),
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          t("pages.line_of_business.how_we_work.title_line2")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.1, duration: 0.4, ease: "easeInOut" },
            className: "group text-center",
            children: [
              /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.1, rotateY: 180 }, transition: { duration: 0.4 }, className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-800 transition-all duration-300 group-hover:bg-yellow-600", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" }) }) }) }),
              /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xl font-semibold text-gray-800", children: t("pages.line_of_business.how_we_work.steps.step1.title") }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-600", children: t("pages.line_of_business.how_we_work.steps.step1.description") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" },
            className: "group text-center",
            children: [
              /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.1, rotateY: 180 }, transition: { duration: 0.4 }, className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-800 transition-all duration-300 group-hover:bg-yellow-600", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 6C13.1 6 14 6.9 14 8S13.1 10 12 10 10 9.1 10 8 10.9 6 12 6ZM18 18H6V16.5C6 14.6 9.8 13.5 12 13.5S18 14.6 18 16.5V18Z" }) }) }) }),
              /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xl font-semibold text-gray-800", children: t("pages.line_of_business.how_we_work.steps.step2.title") }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-600", children: t("pages.line_of_business.how_we_work.steps.step2.description") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
            className: "group text-center",
            children: [
              /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.1, rotateY: 180 }, transition: { duration: 0.4 }, className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-800 transition-all duration-300 group-hover:bg-yellow-600", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" }) }) }) }),
              /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xl font-semibold text-gray-800", children: t("pages.line_of_business.how_we_work.steps.step3.title") }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-600", children: t("pages.line_of_business.how_we_work.steps.step3.description") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.4, duration: 0.4, ease: "easeInOut" },
            className: "group text-center",
            children: [
              /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.1, rotateY: 180 }, transition: { duration: 0.4 }, className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-800 transition-all duration-300 group-hover:bg-yellow-600", children: /* @__PURE__ */ jsx("svg", { className: "h-10 w-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H11.81L14,23L16.19,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5ZM7.5,6H16.5V7.5H7.5V6ZM7.5,9H13.5V10.5H7.5V9ZM7.5,12H16.5V13.5H7.5V12ZM7.5,15H13.5V16.5H7.5V15Z" }) }) }) }),
              /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xl font-semibold text-gray-800", children: t("pages.line_of_business.how_we_work.steps.step4.title") }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-600", children: t("pages.line_of_business.how_we_work.steps.step4.description") })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(motion.section, { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 }, className: "bg-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, transition: { duration: 0.4, ease: "easeInOut" }, className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-sm font-semibold tracking-[0.25em] text-gray-700", children: t("pages.line_of_business.gold_price.header") }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-12 h-0.5 w-20 bg-yellow-600" }),
        /* @__PURE__ */ jsxs("h3", { className: "text-4xl font-normal text-gray-800 md:text-5xl lg:text-6xl", children: [
          t("pages.line_of_business.gold_price.title_line1"),
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          t("pages.line_of_business.gold_price.title_line2")
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-center gap-12 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsx(motion.div, { variants: slideInLeft, transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" }, whileHover: { scale: 1.05 }, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: imageUrl("gold-bars.jpg"),
            alt: t("pages.line_of_business.gold_price.alt_text"),
            className: "h-96 w-full rounded-2xl object-cover shadow-lg",
            loading: "lazy",
            decoding: "async",
            fetchPriority: "low"
          }
        ) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: slideInRight,
            transition: { delay: 0.4, duration: 0.4, ease: "easeInOut" },
            className: "flex flex-col items-center justify-center text-center",
            children: [
              /* @__PURE__ */ jsx("p", { className: "mb-8 max-w-lg text-lg font-light text-gray-700 md:text-xl", children: t("pages.line_of_business.gold_price.description") }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://goldprice.org/gold-price-indonesia.html",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex w-full max-w-xs items-center justify-center space-x-2 rounded-lg bg-yellow-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-600",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.svg,
                      {
                        whileHover: { rotate: 180 },
                        transition: { duration: 0.4 },
                        className: "h-6 w-6",
                        fill: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" })
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: t("pages.line_of_business.gold_price.button") })
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      motion.section,
      {
        ref: whyChooseUsBg.ref,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
        className: "relative bg-cover bg-local bg-center py-20 md:bg-fixed",
        style: { backgroundImage: whyChooseUsBg.backgroundImage },
        children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-center gap-12 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(motion.div, { variants: slideInLeft, transition: { duration: 0.4, ease: "easeInOut" }, children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-sm font-semibold tracking-[0.25em] text-white", children: t("pages.line_of_business.why_choose_us.header") }),
            /* @__PURE__ */ jsx("div", { className: "mb-8 h-0.5 w-20 bg-yellow-600" }),
            /* @__PURE__ */ jsx("h3", { className: "mb-6 text-4xl leading-tight font-normal text-white md:text-5xl", children: t("pages.line_of_business.why_choose_us.title") }),
            /* @__PURE__ */ jsx("p", { className: "mb-8 text-xl text-white/90", children: t("pages.line_of_business.why_choose_us.subtitle") }),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
                whileHover: { scale: 1.05, backgroundColor: "white", color: "black" },
                whileTap: { scale: 0.95 },
                className: "border-2 border-white px-8 py-4 font-semibold tracking-wide text-white transition-all duration-300",
                children: /* @__PURE__ */ jsx("a", { href: "/contact", children: t("pages.line_of_business.why_choose_us.contact_button") })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(motion.div, { variants: slideInRight, transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" }, className: "space-y-6", children: [
            t("pages.line_of_business.why_choose_us.features.professional"),
            t("pages.line_of_business.why_choose_us.features.on_time"),
            t("pages.line_of_business.why_choose_us.features.friendly"),
            t("pages.line_of_business.why_choose_us.features.best_fair")
          ].map((feature, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 50 },
              whileInView: { opacity: 1, x: 0 },
              transition: { delay: 0.05 * index, duration: 0.4, ease: "easeInOut" },
              className: "group flex items-center space-x-4",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    whileHover: { scale: 1.2, rotate: 360 },
                    transition: { duration: 0.4 },
                    className: "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-600",
                    children: /* @__PURE__ */ jsx("svg", { className: "h-3 w-3 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" }) })
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-lg text-white transition-colors duration-300 group-hover:text-yellow-300", children: feature })
              ]
            },
            index
          )) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  KristalinPortfolio as default
};

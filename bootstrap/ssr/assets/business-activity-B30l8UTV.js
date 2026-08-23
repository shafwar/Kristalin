import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { Head } from "@inertiajs/react";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { W as WelcomeGridPicture } from "./WelcomeGridPicture-BBBlV399.js";
import { u as useLazySectionBackground } from "./useLazySectionBackground-B142Bpn2.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import "lucide-react";
import "react-dom";
import "./useNetworkProfile-BaMceDYv.js";
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
const CounterAnimation = ({ target, suffix = "", duration = 1800, delay = 0, isDecimal = false }) => {
  const [count, setCount] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const startCounting = () => {
    if (hasAnimated || isAnimating) return;
    setHasAnimated(true);
    setIsAnimating(true);
    setCount(0);
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        setIsAnimating(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        setCount(isDecimal ? Number(current.toFixed(2)) : Math.floor(current));
      }
    }, stepTime);
  };
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.8, y: 20 },
      whileInView: { opacity: 1, scale: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      onViewportEnter: () => {
        setTimeout(startCounting, delay);
      },
      transition: {
        duration: 0.8,
        delay: delay / 1e3,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
      className: "relative mb-2 overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl",
      style: {
        backgroundImage: "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)",
        WebkitBackgroundClip: "text",
        color: "transparent"
      },
      children: [
        /* @__PURE__ */ jsxs(
          motion.span,
          {
            animate: {
              scale: isAnimating ? [1, 1.05, 1] : 1,
              color: isAnimating ? ["#fbbf24", "#f59e0b", "#fbbf24"] : "#fbbf24"
            },
            transition: {
              duration: 0.5,
              repeat: isAnimating ? Infinity : 0,
              repeatType: "reverse"
            },
            children: [
              isDecimal ? count.toFixed(2) : count.toLocaleString(),
              suffix
            ]
          }
        ),
        !isAnimating && count === target && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent",
            animate: { x: ["-100%", "100%"] },
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }
          }
        )
      ]
    }
  );
};
const icons = {
  mining: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19.428 15.341A8 8 0 116.343 2.257M22 22l-5-5" }) }),
  processing: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h8" })
  ] }),
  search: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65", strokeWidth: 2 })
  ] }),
  truck: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("rect", { x: "1", y: "3", width: "15", height: "13", rx: "2", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 8h3l4 4v4a2 2 0 01-2 2h-1" })
  ] }),
  users: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }),
    /* @__PURE__ */ jsx("circle", { cx: "17", cy: "7", r: "4", strokeWidth: 2 })
  ] }),
  education: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 14l9-5-9-5-9 5 9 5z" }),
    /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5c0-.638.214-1.24.584-1.922L12 14z"
      }
    )
  ] }),
  environment: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 22c4.418 0 8-4.03 8-9 0-3.866-3.134-7-7-7S4 9.134 4 13c0 4.97 3.582 9 8 9z"
    }
  ) }),
  health: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v8m-4-4h8" })
  ] }),
  analytics: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 17v-6m4 6V7m4 10v-3" })
  ] }),
  drone: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
    /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      }
    )
  ] }),
  network: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    }
  ) }),
  location: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("circle", { cx: "17.657", cy: "16.657", r: "4", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
  ] }),
  trophy: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    }
  ) }),
  phone: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.7 2.8a2 2 0 01-.45 1.95l-1.35 1.35a16.001 16.001 0 006.586 6.586l1.35-1.35a2 2 0 011.95-.45l2.8.7A2 2 0 0121 17.72V21a2 2 0 01-2 2h-1C7.163 23 1 16.837 1 9V8a2 2 0 012-2z"
    }
  ) }),
  handshake: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 17l6 6m0 0l6-6m-6 6V10" }) }),
  globe: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10", strokeWidth: 2 }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" })
  ] })
};
const Icon = ({ type, className = "w-6 h-6" }) => {
  const icon = icons[type] || icons.processing;
  if (React.isValidElement(icon) && icon.type === "svg") {
    return React.cloneElement(icon, { className });
  }
  return icon;
};
const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
};
const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 }
};
function EnhancedMiningSectors({ t }) {
  const sectors = [
    {
      name: t("pages.business_activity.mining_sectors.sectors.gold.name"),
      description: t("pages.business_activity.mining_sectors.sectors.gold.description"),
      highlight: t("pages.business_activity.mining_sectors.sectors.gold.highlight")
    },
    {
      name: t("pages.business_activity.mining_sectors.sectors.silver.name"),
      description: t("pages.business_activity.mining_sectors.sectors.silver.description"),
      highlight: t("pages.business_activity.mining_sectors.sectors.silver.highlight")
    },
    {
      name: t("pages.business_activity.mining_sectors.sectors.other_metals.name"),
      description: t("pages.business_activity.mining_sectors.sectors.other_metals.description"),
      highlight: t("pages.business_activity.mining_sectors.sectors.other_metals.highlight")
    }
  ];
  const images = [
    { src: imageUrl("gold1.jpg"), alt: t("pages.business_activity.mining_sectors.images.gold_alt") },
    { src: imageUrl("silver.jpg"), alt: t("pages.business_activity.mining_sectors.images.silver_alt") }
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGoldDetail, setShowGoldDetail] = useState(false);
  const [showSilverDetail, setShowSilverDetail] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);
  useEffect(() => {
    if (showGoldDetail || showSilverDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showGoldDetail, showSilverDetail]);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowGoldDetail(false);
        setShowSilverDetail(false);
      }
    };
    if (showGoldDetail || showSilverDetail) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showGoldDetail, showSilverDetail]);
  return /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "mb-12 text-center sm:mb-16",
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { width: 0 },
              whileInView: { width: "5rem" },
              transition: { duration: 0.8, delay: 0.2 },
              className: "mx-auto mb-4 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 sm:mb-6"
            }
          ),
          /* @__PURE__ */ jsxs("h1", { className: "mb-4 text-3xl font-bold text-gray-800 sm:mb-6 sm:text-4xl md:text-5xl", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent", children: t("pages.business_activity.mining_sectors.title_line1") }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: t("pages.business_activity.mining_sectors.title_line2") })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-4xl px-2 text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl", children: t("pages.business_activity.mining_sectors.description") })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-start gap-8 sm:gap-12 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7, ease: "easeOut" },
          className: "space-y-6 sm:space-y-8 xl:col-span-3",
          children: sectors.map((sector, index) => /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: {
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut"
              },
              whileHover: {
                x: 4,
                transition: { duration: 0.3 }
              },
              className: "group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-lg sm:p-6 lg:p-8",
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 sm:gap-4 lg:gap-6", children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    whileHover: { scale: 1.1, rotate: 180 },
                    transition: { duration: 0.5 },
                    className: "mt-0 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg sm:mt-1 sm:h-10 sm:w-10 lg:h-12 lg:w-12",
                    children: /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-white sm:h-3 sm:w-3 lg:h-4 lg:w-4" })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-amber-600 sm:text-xl lg:text-2xl", children: sector.name }),
                    /* @__PURE__ */ jsx("span", { className: "w-fit rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 sm:px-3", children: sector.highlight })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700 sm:mb-4 sm:text-base", children: sector.description }),
                  index === 0 && /* @__PURE__ */ jsx(motion.div, { className: "opacity-100", whileHover: { x: 3 }, children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowGoldDetail(true),
                      className: "inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 focus:underline focus:outline-none sm:gap-2 sm:text-sm",
                      children: [
                        t("pages.business_activity.mining_sectors.learn_more_gold"),
                        /* @__PURE__ */ jsx("svg", { className: "h-3 w-3 sm:h-4 sm:w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                      ]
                    }
                  ) }),
                  index === 1 && /* @__PURE__ */ jsx(motion.div, { className: "opacity-100", whileHover: { x: 3 }, children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowSilverDetail(true),
                      className: "inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 focus:underline focus:outline-none sm:gap-2 sm:text-sm",
                      children: [
                        t("pages.business_activity.mining_sectors.learn_more_silver"),
                        /* @__PURE__ */ jsx("svg", { className: "h-3 w-3 sm:h-4 sm:w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                      ]
                    }
                  ) }),
                  index === 2 && /* @__PURE__ */ jsx(motion.div, { className: "opacity-100", whileHover: { x: 3 }, children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: "inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 focus:underline focus:outline-none sm:gap-2 sm:text-sm",
                      children: [
                        t("pages.business_activity.mining_sectors.learn_more_other_metals"),
                        /* @__PURE__ */ jsx("svg", { className: "h-3 w-3 sm:h-4 sm:w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                      ]
                    }
                  ) })
                ] })
              ] })
            },
            sector.name
          ))
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative overflow-visible xl:col-span-2", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.7, ease: "easeOut" },
          children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center justify-center overflow-visible rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-12", children: [
            /* @__PURE__ */ jsx("div", { className: "relative h-[220px] w-full overflow-hidden rounded-lg bg-slate-200 sm:h-[260px]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
              motion.img,
              {
                src: images[activeIndex].src,
                alt: images[activeIndex].alt,
                width: 800,
                height: 600,
                className: "absolute inset-0 h-full w-full object-cover",
                loading: "lazy",
                decoding: "async",
                fetchPriority: "low",
                initial: { x: 100, opacity: 0, scale: 0.98, filter: "blur(6px)" },
                animate: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
                exit: { x: -100, opacity: 0, scale: 0.98, filter: "blur(6px)" },
                transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
              },
              images[activeIndex].src
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center", children: [
              /* @__PURE__ */ jsx("h4", { className: "mb-2 text-base font-semibold text-gray-800 sm:text-lg", children: t("pages.business_activity.modern_operations.title") }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 sm:text-sm", children: t("pages.business_activity.modern_operations.subtitle") })
            ] })
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(AnimatePresence, { children: [
      showGoldDetail && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
            initial: { opacity: 0, scale: 0.92, y: 40 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.92, y: 40 },
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            children: /* @__PURE__ */ jsxs("div", { className: "relative mx-4 flex max-h-[90vh] w-full max-w-lg flex-col items-center overflow-y-auto rounded-2xl border border-amber-200 bg-white px-4 py-6 shadow-2xl sm:px-6 sm:py-8 pointer-events-auto", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute top-3 right-3 z-20 sm:top-4 sm:right-4",
                  onClick: () => setShowGoldDetail(false),
                  type: "button",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-100/80 text-gray-500 shadow transition-colors duration-200 hover:bg-red-100 hover:text-red-500 sm:h-10 sm:w-10", children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 22 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M7 7L15 15M15 7L7 15", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }) })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: imageUrl("gold1.jpg"),
                  alt: "Gold Operation",
                  width: 400,
                  height: 300,
                  className: "mb-4 aspect-[4/3] w-full max-w-xs rounded-xl bg-white object-cover sm:mb-6",
                  loading: "lazy",
                  decoding: "async"
                }
              ) }),
              /* @__PURE__ */ jsx("h2", { className: "mb-3 text-center text-xl font-bold text-amber-600 sm:mb-4 sm:text-2xl", children: "Gold Operations" }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 max-w-md text-center text-sm leading-relaxed text-gray-700 sm:mb-5 sm:text-base", children: "Operasi pertambangan emas kami memanfaatkan teknologi aluvial modern di daerah aliran Sungai Musairo, Papua. Kami berkomitmen pada penambangan yang berkelanjutan, menjaga kelestarian lingkungan, dan memaksimalkan hasil dengan peralatan canggih." }),
              /* @__PURE__ */ jsxs("ul", { className: "mx-auto mb-2 max-w-md list-disc space-y-1 pl-4 text-sm text-gray-600 sm:space-y-2 sm:pl-5 sm:text-base", children: [
                /* @__PURE__ */ jsx("li", { children: "Teknologi aluvial modern dan efisien" }),
                /* @__PURE__ */ jsx("li", { children: "Pengelolaan lingkungan yang ketat" }),
                /* @__PURE__ */ jsx("li", { children: "Program pemberdayaan masyarakat sekitar" }),
                /* @__PURE__ */ jsx("li", { children: "Produksi emas berkadar tinggi" })
              ] })
            ] })
          }
        )
      ] }),
      showSilverDetail && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
            initial: { opacity: 0, scale: 0.92, y: 40 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.92, y: 40 },
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            children: /* @__PURE__ */ jsxs("div", { className: "relative mx-4 flex max-h-[90vh] w-full max-w-lg flex-col items-center overflow-y-auto rounded-2xl border border-amber-200 bg-white px-4 py-6 shadow-2xl sm:px-6 sm:py-8 pointer-events-auto", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute top-3 right-3 z-20 sm:top-4 sm:right-4",
                  onClick: () => setShowSilverDetail(false),
                  type: "button",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-100/80 text-gray-500 shadow transition-colors duration-200 hover:bg-red-100 hover:text-red-500 sm:h-10 sm:w-10", children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 22 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M7 7L15 15M15 7L7 15", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }) })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: imageUrl("silver.jpg"),
                  alt: "Silver Operation",
                  width: 400,
                  height: 300,
                  className: "mb-4 aspect-[4/3] w-full max-w-xs rounded-xl bg-white object-cover sm:mb-6",
                  loading: "lazy",
                  decoding: "async"
                }
              ) }),
              /* @__PURE__ */ jsx("h2", { className: "mb-3 text-center text-xl font-bold text-amber-600 sm:mb-4 sm:text-2xl", children: "Silver Operations" }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 max-w-md text-center text-sm leading-relaxed text-gray-700 sm:mb-5 sm:text-base", children: "Operasi pemrosesan perak kami menggunakan teknologi pemurnian canggih untuk menghasilkan perak berkadar tinggi dengan standar kualitas ekspor. Proses terintegrasi kami memastikan efisiensi, ramah lingkungan, dan konsistensi hasil." }),
              /* @__PURE__ */ jsxs("ul", { className: "mx-auto mb-2 max-w-md list-disc space-y-1 pl-4 text-sm text-gray-600 sm:space-y-2 sm:pl-5 sm:text-base", children: [
                /* @__PURE__ */ jsx("li", { children: "Teknologi pemurnian canggih" }),
                /* @__PURE__ */ jsx("li", { children: "Kadar kemurnian tinggi" }),
                /* @__PURE__ */ jsx("li", { children: "Proses ramah lingkungan" }),
                /* @__PURE__ */ jsx("li", { children: "Produk perak berkualitas ekspor" })
              ] })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, delay: 0.5 },
        className: "mt-12 rounded-2xl bg-gray-800 p-6 text-center text-white sm:mt-16 sm:p-8",
        children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-3 text-lg font-semibold sm:mb-4 sm:text-xl", children: t("pages.business_activity.sustainable_excellence.title") }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base", children: t("pages.business_activity.sustainable_excellence.description") })
        ]
      }
    )
  ] }) });
}
function AlluvialGoldMiningSection({ t }) {
  return /* @__PURE__ */ jsx("section", { className: "bg-white py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "mb-16 text-center",
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { width: 0 },
              whileInView: { width: "4rem" },
              transition: { duration: 0.8, delay: 0.2 },
              className: "mx-auto mb-6 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-600"
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold text-gray-800 md:text-4xl", children: t("pages.business_activity.alluvial_mining.title") }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg text-gray-600", children: t("pages.business_activity.alluvial_mining.subtitle") }),
          /* @__PURE__ */ jsxs("div", { className: "mb-10 flex flex-col items-center justify-center rounded-2xl border border-amber-300 bg-gradient-to-br from-yellow-50 via-amber-50 to-white p-8 shadow-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-amber-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1m4 0h-1v-4h-1"
                }
              ) }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold tracking-tight text-amber-700", children: t("pages.business_activity.alluvial_mining.torindo.title") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "max-w-2xl text-center", children: /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-base leading-relaxed text-gray-800 md:text-lg",
                dangerouslySetInnerHTML: { __html: t("pages.business_activity.alluvial_mining.torindo.description") }
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "space-y-8 lg:col-span-2",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-6 leading-relaxed text-gray-700", children: t("pages.business_activity.alluvial_mining.content.paragraph1") }),
              /* @__PURE__ */ jsx("p", { className: "mb-6 leading-relaxed text-gray-700", children: t("pages.business_activity.alluvial_mining.content.paragraph2") }),
              /* @__PURE__ */ jsx("p", { className: "mb-8 leading-relaxed text-gray-700", children: t("pages.business_activity.alluvial_mining.content.paragraph3") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-gray-50 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-6 text-xl font-semibold text-gray-800", children: t("pages.business_activity.alluvial_mining.current_operations.title") }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-amber-500" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: t("pages.business_activity.alluvial_mining.current_operations.exploration") })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-amber-600", children: t("pages.business_activity.alluvial_mining.current_operations.exploration_area") })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-amber-500" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: t("pages.business_activity.alluvial_mining.current_operations.processing") })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-amber-600", children: t("pages.business_activity.alluvial_mining.current_operations.processing_area") })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold text-gray-800", children: t("pages.business_activity.alluvial_mining.economic_impact.title") }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-gray-700", children: t("pages.business_activity.alluvial_mining.economic_impact.description") })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.2 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative h-64 w-full overflow-hidden rounded-xl bg-slate-200 shadow-lg", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: imageUrl("tracktor.png"),
                  alt: "Gold mining operations",
                  width: 800,
                  height: 256,
                  className: "h-full w-full object-cover",
                  loading: "lazy",
                  decoding: "async",
                  fetchPriority: "low"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" }),
              /* @__PURE__ */ jsxs("div", { className: "absolute right-4 bottom-4 left-4 text-white", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: t("pages.business_activity.modern_operations.title") }),
                /* @__PURE__ */ jsx("p", { className: "text-xs opacity-90", children: t("pages.business_activity.modern_operations.location") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 text-2xl font-bold text-amber-600", children: "2007" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: t("pages.business_activity.alluvial_mining.stats.est_year") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 text-2xl font-bold text-amber-600", children: "17+" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: t("pages.business_activity.alluvial_mining.stats.years_exp") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-6 shadow-sm", children: [
              /* @__PURE__ */ jsx("h4", { className: "mb-4 font-semibold text-gray-800", children: t("pages.business_activity.alluvial_mining.timeline.title") }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-amber-500" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800", children: "2007" }),
                    /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: t("pages.business_activity.alluvial_mining.timeline.mining_authority") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-amber-500" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800", children: "2010" }),
                    /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: t("pages.business_activity.alluvial_mining.timeline.exploration_license") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-amber-500" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800", children: "2011" }),
                    /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: t("pages.business_activity.alluvial_mining.timeline.production_license") })
                  ] })
                ] })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
function BusinessActivityPage() {
  const { t } = useTranslation();
  const miningSectorsRef = useRef(null);
  const scrollRafRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const whyChooseUsBg = useLazySectionBackground(imageUrl("hero-linebusiness.jpg"));
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
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsxs(Head, { title: `${t("pages.business_activity.page_title") || "Business Activities"} | PT Kristalin Ekalestari`, children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Kegiatan usaha PT Kristalin Ekalestari: Eksplorasi, penambangan emas ramah lingkungan, pemurnian logam mulia Kisara Gold di Nabire Papua (IUP OP No. 561/2021/DESDM, 198 Ha, 2020-2030), pengadaan alat berat PT Torindo, dan agribisnis PT ABS." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Business Activities - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Operasi penambangan emas terintegrasi, pemurnian logam mulia, dan portofolio bisnis berkelanjutan PT Kristalin Ekalestari di Nabire, Papua." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: true }),
    /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute inset-0 h-full w-full will-change-transform",
          style: {
            transform: `translateY(${scrollY * 0.5}px)`
          },
          children: [
            /* @__PURE__ */ jsx(
              WelcomeGridPicture,
              {
                imageId: "businessactivity",
                alt: t("pages.business_activity.hero.alt_text"),
                pictureClassName: "block h-full min-h-full w-full",
                className: "h-full min-h-full w-full object-cover",
                sizes: "100vw",
                loading: "eager",
                fetchPriority: "high",
                decoding: "async",
                bundleOptions: { maxWidth: 960 }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "relative z-20 mx-auto w-full max-w-5xl px-4 py-16 text-center sm:py-24",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.45, ease: "easeOut" },
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "transform transition-all duration-700 ease-out",
              style: {
                transform: `translateY(${scrollY * 0.2}px)`,
                opacity: Math.max(0, 1 - scrollY / 600)
              },
              initial: { opacity: 0, y: 80 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    className: "mb-6 text-3xl leading-tight font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl",
                    initial: { opacity: 0, y: 50, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.55, delay: 0.2, ease: "easeOut" },
                    children: [
                      /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg",
                          initial: { opacity: 0, y: 30 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.5, delay: 0.3 },
                          children: t("pages.business_activity.hero.title_line1")
                        }
                      ),
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "text-white drop-shadow-lg",
                          initial: { opacity: 0, y: 30 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.5, delay: 0.38 },
                          children: t("pages.business_activity.hero.title_line2")
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    className: "mx-auto mb-8 max-w-4xl px-2 text-base leading-relaxed font-light text-white/95 sm:mb-12 sm:text-lg md:text-xl lg:text-2xl",
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.55, delay: 0.48, ease: "easeOut" },
                    children: t("pages.business_activity.hero.description")
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6",
                    initial: { opacity: 0, y: 30, scale: 0.8 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.65, delay: 0.6, ease: "easeOut" },
                    children: /* @__PURE__ */ jsxs(
                      motion.button,
                      {
                        onClick: () => {
                          if (miningSectorsRef.current) {
                            miningSectorsRef.current.scrollIntoView({ behavior: "smooth" });
                          }
                        },
                        className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg",
                        whileHover: {
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
                        },
                        whileTap: { scale: 0.95 },
                        children: [
                          /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2 sm:gap-3", children: [
                            t("pages.business_activity.hero.explore_button"),
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
                    )
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
          className: "absolute bottom-4 left-1/2 -translate-x-1/2 transform sm:bottom-6 lg:bottom-8",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.85, ease: "easeOut" },
          children: /* @__PURE__ */ jsx("div", { className: "flex h-8 w-5 justify-center rounded-full border-2 border-white/60 sm:h-10 sm:w-6", children: /* @__PURE__ */ jsx("div", { className: "mt-1 h-2 w-1 animate-bounce rounded-full bg-white sm:mt-2 sm:h-3" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { ref: miningSectorsRef, children: /* @__PURE__ */ jsx(EnhancedMiningSectors, { t }) }),
    /* @__PURE__ */ jsx(
      motion.section,
      {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
        className: "relative bg-cover bg-local bg-center py-20 md:bg-fixed",
        style: {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${imageUrl("nabire.jpg")}')`
        },
        children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
          /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, transition: { duration: 0.4, ease: "easeInOut" }, className: "mb-16 text-center", children: [
            /* @__PURE__ */ jsx(
              motion.span,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6 },
                className: "text-sm font-medium tracking-wider text-amber-400 uppercase",
                children: t("pages.business_activity.location.header")
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { width: 0 },
                whileInView: { width: "4rem" },
                transition: { duration: 0.8, delay: 0.2 },
                className: "mx-auto mt-2 mb-8 h-0.5 bg-amber-400"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.3 },
                className: "mb-6 text-3xl leading-tight font-bold text-white md:text-4xl",
                children: t("pages.business_activity.location.title")
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.4 },
                className: "mx-auto mb-12 max-w-5xl text-base leading-relaxed font-normal text-gray-200 md:text-lg",
                children: t("pages.business_activity.location.description_part1")
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 items-center gap-16 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsx(motion.div, { variants: slideInLeft, whileHover: { scale: 1.02 }, transition: { duration: 0.3 }, className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40", children: [
              /* @__PURE__ */ jsx("div", { className: "relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full bg-gradient-to-br from-gray-700 to-gray-800", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-4 rotate-12 transform rounded-lg bg-gradient-to-br from-green-700 to-green-800 opacity-80" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-6 rotate-6 transform rounded-lg bg-gradient-to-br from-green-600 to-green-700 opacity-90" }),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { scale: 0, opacity: 0 },
                    whileInView: { scale: 1, opacity: 1 },
                    transition: { duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 },
                    className: "absolute top-1/2 right-1/3 z-10 -translate-x-1/2 -translate-y-1/2 transform",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          animate: {
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(251, 191, 36, 0.7)",
                              "0 0 0 10px rgba(251, 191, 36, 0)",
                              "0 0 0 0 rgba(251, 191, 36, 0)"
                            ]
                          },
                          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          className: "h-5 w-5 rounded-full bg-amber-400 shadow-lg"
                        }
                      ) }),
                      /* @__PURE__ */ jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 10 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { duration: 0.6, delay: 1 },
                          className: "absolute -top-10 left-1/2 -translate-x-1/2 transform rounded bg-amber-400 px-3 py-1 text-xs font-medium whitespace-nowrap text-black",
                          children: [
                            "PT Kristalin Ekalestari",
                            /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-amber-400" })
                          ]
                        }
                      )
                    ]
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  transition: { duration: 0.6, delay: 0.8 },
                  className: "mt-6 text-center",
                  children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-300", children: t("pages.business_activity.location.map_caption") })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs(motion.div, { variants: slideInRight, className: "space-y-8", children: [
              /* @__PURE__ */ jsx(motion.div, { variants: fadeInUp, whileHover: { y: -5 }, transition: { duration: 0.3 }, children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40", children: [
                /* @__PURE__ */ jsx(
                  motion.h3,
                  {
                    initial: { opacity: 0, x: -20 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { duration: 0.6 },
                    className: "mb-6 text-xl font-semibold text-white",
                    children: t("pages.business_activity.location.mining_area_details.title")
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
                  {
                    label: t("pages.business_activity.location.mining_area_details.total_area_label"),
                    value: t("pages.business_activity.location.mining_area_details.total_area_value"),
                    icon: "location"
                  },
                  {
                    label: t("pages.business_activity.location.mining_area_details.distance_label"),
                    value: t("pages.business_activity.location.mining_area_details.distance_value"),
                    icon: "truck"
                  },
                  {
                    label: t("pages.business_activity.location.mining_area_details.land_transport_label"),
                    value: t("pages.business_activity.location.mining_area_details.land_transport_value"),
                    icon: "truck"
                  },
                  {
                    label: t("pages.business_activity.location.mining_area_details.river_access_label"),
                    value: t("pages.business_activity.location.mining_area_details.river_access_value"),
                    icon: "location"
                  }
                ].map((detail) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { duration: 0.5, delay: 0.1 },
                    whileHover: { x: 8, scale: 1.02 },
                    className: "group flex cursor-pointer items-center justify-between rounded-lg bg-white/5 p-4 transition-all duration-300 hover:bg-white/10",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(
                          motion.div,
                          {
                            whileHover: { rotate: 360 },
                            transition: { duration: 0.6 },
                            className: "flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 transition-colors duration-300 group-hover:bg-amber-400",
                            children: /* @__PURE__ */ jsx(Icon, { type: detail.icon, className: "h-4 w-4 text-white" })
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-300 transition-colors duration-300 group-hover:text-white", children: detail.label })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-white transition-colors duration-300 group-hover:text-amber-400", children: detail.value })
                    ]
                  },
                  detail.label
                )) })
              ] }) }),
              /* @__PURE__ */ jsx(motion.div, { variants: fadeInUp, whileHover: { y: -5 }, transition: { duration: 0.3 }, children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40", children: [
                /* @__PURE__ */ jsx(
                  motion.h3,
                  {
                    initial: { opacity: 0, x: -20 },
                    whileInView: { opacity: 1, x: 0 },
                    transition: { duration: 0.6 },
                    className: "mb-6 text-xl font-semibold text-white",
                    children: t("pages.business_activity.location.mineral_resources.title")
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    whileInView: { opacity: 1 },
                    transition: { duration: 0.8, delay: 0.2 },
                    className: "mb-6 text-sm leading-relaxed font-normal text-gray-400",
                    children: t("pages.business_activity.location.mineral_resources.description")
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: [
                  { value: "32.7", label: t("pages.business_activity.location.mineral_resources.total_resources") },
                  { value: "13.7", label: t("pages.business_activity.location.mineral_resources.ready_to_mine") }
                ].map((stat) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    whileInView: { opacity: 1, scale: 1 },
                    transition: { duration: 0.6, delay: 0.2 },
                    whileHover: { scale: 1.05 },
                    className: "group cursor-pointer rounded-lg bg-amber-500/10 p-4 text-center transition-all duration-300 hover:bg-amber-500/20",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-1 text-2xl font-bold text-amber-400 transition-colors duration-300 group-hover:text-amber-300", children: stat.value }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300", children: stat.label })
                    ]
                  },
                  stat.label
                )) })
              ] }) })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AlluvialGoldMiningSection, { t }),
    /* @__PURE__ */ jsx(
      motion.section,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.35, ease: "easeOut" },
        className: "bg-black py-20",
        children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
          /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, className: "mb-16 text-center", children: [
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                initial: { opacity: 0, scale: 0.95 },
                whileInView: { opacity: 1, scale: 1, color: "#fbbf24" },
                transition: { duration: 0.5, ease: "easeOut" },
                className: "mb-6 text-3xl leading-tight font-bold md:text-4xl",
                children: t("pages.business_activity.achievements.title")
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 h-0.5 w-16 bg-gradient-to-r from-amber-400 to-yellow-500" }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-4xl text-base leading-relaxed font-normal text-gray-400 md:text-lg", children: t("pages.business_activity.achievements.subtitle") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-4", children: [
            {
              number: 35,
              label: t("pages.business_activity.achievements.years_experience.label") || "Tahun Warisan Industri",
              description: t("pages.business_activity.achievements.years_experience.description") || "Eksplorasi dan pemurnian emas terintegrasi di Indonesia sejak 1989.",
              icon: "trophy",
              suffix: "+",
              isDecimal: false
            },
            {
              number: 198,
              label: t("pages.business_activity.achievements.mining_sites.label") || "Ha IUP Operasi Produksi",
              description: t("pages.business_activity.achievements.mining_sites.description") || "IUP OP No. 561/2021/DESDM (2020–2030) resmi di Nabire, Papua Tengah.",
              icon: "location",
              suffix: " Ha",
              isDecimal: false
            },
            {
              number: 99.99,
              label: t("pages.business_activity.achievements.gold_reserves.label") || "Kemurnian Fine Gold",
              description: t("pages.business_activity.achievements.gold_reserves.description") || "Emas murni batangan 24K berstandar internasional LBMA dan sertifikasi resmi.",
              icon: "mining",
              suffix: "%",
              isDecimal: true
            },
            {
              number: 2.5,
              label: t("pages.business_activity.achievements.success_rate.label") || "Ton Kapasitas Smelter",
              description: t("pages.business_activity.achievements.success_rate.description") || "Kapasitas pengolahan tahunan terpadu dengan 100% kepatuhan ESG & zero mercury.",
              icon: "analytics",
              suffix: "+ Ton",
              isDecimal: true
            }
          ].map((stat, index) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30, scale: 0.9 },
              whileInView: { opacity: 1, y: 0, scale: 1 },
              viewport: { once: true, amount: 0.2 },
              transition: {
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              },
              whileHover: {
                y: -12,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(251, 191, 36, 0.25)",
                borderColor: "rgba(251, 191, 36, 0.6)"
              },
              className: "group relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gray-900/50 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-amber-400/40",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      whileHover: { scale: 1.1, rotate: 360 },
                      transition: { duration: 0.8, ease: "easeInOut" },
                      className: "mx-auto mb-6 w-fit rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 p-4",
                      children: /* @__PURE__ */ jsx(Icon, { type: stat.icon, className: "h-8 w-8 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsx(CounterAnimation, { target: stat.number, suffix: stat.suffix, duration: 1800, delay: index * 200, isDecimal: stat.isDecimal }),
                  /* @__PURE__ */ jsx("h4", { className: "mb-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-amber-400", children: stat.label }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed font-normal text-gray-400 transition-colors duration-300 group-hover:text-gray-300", children: stat.description })
                ] })
              ]
            },
            stat.label
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.section,
      {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-50px" },
        className: "relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-amber-50/30 py-24",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-[0.03]", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 h-72 w-72 rounded-full bg-amber-400 blur-3xl" }),
            /* @__PURE__ */ jsx("div", { className: "absolute right-10 bottom-20 h-96 w-96 rounded-full bg-yellow-400 blur-3xl" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-amber-300 opacity-20 blur-3xl" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.02]", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full w-full",
              style: {
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.3'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "40px 40px"
              }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-5xl px-4", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, ease: "easeOut" },
                className: "mb-20 text-center",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-medium text-amber-700 backdrop-blur-sm", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-2 w-2 animate-pulse rounded-full bg-amber-500" }),
                    t("pages.business_activity.community_impact.community_development_tag")
                  ] }),
                  /* @__PURE__ */ jsx("h2", { className: "mb-6 text-4xl font-bold text-gray-900", children: t("pages.business_activity.community_impact.title") }),
                  /* @__PURE__ */ jsx("div", { className: "mx-auto mb-8 h-0.5 w-16 bg-amber-600" }),
                  /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-2xl text-lg leading-relaxed text-gray-600", children: t("pages.business_activity.community_impact.subtitle") })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, ease: "easeOut" },
                className: "mb-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-75 blur-xl transition duration-1000 group-hover:opacity-100" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl", children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: imageUrl("comdevelop.jpg"),
                          alt: "Community Development",
                          width: 1280,
                          height: 854,
                          className: "h-80 w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-105",
                          loading: "lazy",
                          decoding: "async",
                          fetchPriority: "low"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-2 rounded-xl bg-gradient-to-t from-black/20 to-transparent" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute -inset-6 rounded-2xl border border-gray-200/50 bg-white/50 backdrop-blur-sm" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative space-y-8 p-6", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("div", { className: "mb-4 inline-block rounded-full border border-amber-200 bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 text-sm font-medium text-amber-700", children: t("pages.business_activity.community_impact.community_development_tag") }),
                        /* @__PURE__ */ jsx("h3", { className: "mb-6 text-3xl font-bold text-gray-900", children: t("pages.business_activity.community_impact.empowering_title") }),
                        /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-gray-600", children: t("pages.business_activity.community_impact.empowering_description") })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md", children: [
                          /* @__PURE__ */ jsx("div", { className: "mb-1 text-2xl font-bold text-amber-600", children: t("pages.business_activity.community_impact.stats.miners_trained.value") }),
                          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: t("pages.business_activity.community_impact.stats.miners_trained.label") })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md", children: [
                          /* @__PURE__ */ jsx("div", { className: "mb-1 text-2xl font-bold text-amber-600", children: t("pages.business_activity.community_impact.stats.success_rate.value") }),
                          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: t("pages.business_activity.community_impact.stats.success_rate.label") })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md", children: [
                          /* @__PURE__ */ jsx("div", { className: "mb-1 text-2xl font-bold text-amber-600", children: t("pages.business_activity.community_impact.stats.villages.value") }),
                          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: t("pages.business_activity.community_impact.stats.villages.label") })
                        ] })
                      ] })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4", children: [
              {
                icon: "users",
                title: t("pages.business_activity.community_impact.stats.employment.label"),
                value: t("pages.business_activity.community_impact.stats.employment.value"),
                description: t("pages.business_activity.community_impact.stats.employment.description")
              },
              {
                icon: "education",
                title: t("pages.business_activity.community_impact.stats.training.label"),
                value: t("pages.business_activity.community_impact.stats.training.value"),
                description: t("pages.business_activity.community_impact.stats.training.description")
              },
              {
                icon: "environment",
                title: t("pages.business_activity.community_impact.stats.environment.label"),
                value: t("pages.business_activity.community_impact.stats.environment.value"),
                description: t("pages.business_activity.community_impact.stats.environment.description")
              },
              {
                icon: "health",
                title: t("pages.business_activity.community_impact.stats.healthcare.label"),
                value: t("pages.business_activity.community_impact.stats.healthcare.value"),
                description: t("pages.business_activity.community_impact.stats.healthcare.description")
              }
            ].map((item, index) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
                whileHover: { y: -5 },
                className: "group relative",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-400/20 to-yellow-400/20 opacity-75 blur transition duration-1000 group-hover:opacity-100" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative rounded-xl border border-gray-200 bg-white/90 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg", children: [
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        whileHover: { scale: 1.1 },
                        className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-gradient-to-br from-amber-100 to-yellow-100",
                        children: /* @__PURE__ */ jsx(Icon, { type: item.icon, className: "h-7 w-7 text-amber-600" })
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "mb-2 text-3xl font-bold text-gray-900", children: item.value }),
                    /* @__PURE__ */ jsx("div", { className: "mb-2 text-lg font-semibold text-gray-800", children: item.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-gray-600", children: item.description })
                  ] })
                ]
              },
              item.title
            )) }),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, ease: "easeOut" },
                className: "relative",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-400/10 to-yellow-400/10 blur-2xl" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl border border-gray-200 bg-white/90 p-8 text-center backdrop-blur-sm md:p-12", children: [
                    /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold text-gray-900", children: t("pages.business_activity.community_impact.sustainable_communities.title") }),
                    /* @__PURE__ */ jsx("p", { className: "mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600", children: t("pages.business_activity.community_impact.sustainable_communities.description") }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-8 md:grid-cols-4", children: [
                      {
                        value: t("pages.business_activity.community_impact.sustainable_communities.partner_villages.value"),
                        label: t("pages.business_activity.community_impact.sustainable_communities.partner_villages.label")
                      },
                      {
                        value: t("pages.business_activity.community_impact.sustainable_communities.active_programs.value"),
                        label: t("pages.business_activity.community_impact.sustainable_communities.active_programs.label")
                      },
                      {
                        value: t("pages.business_activity.community_impact.sustainable_communities.annual_investment.value"),
                        label: t("pages.business_activity.community_impact.sustainable_communities.annual_investment.label")
                      },
                      {
                        value: t("pages.business_activity.community_impact.sustainable_communities.lives_improved.value"),
                        label: t("pages.business_activity.community_impact.sustainable_communities.lives_improved.label")
                      }
                    ].map((stat, index) => /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.8 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport: { once: true },
                        transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
                        whileHover: { scale: 1.05 },
                        className: "rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 text-center transition-all duration-300 hover:shadow-md",
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "mb-2 text-3xl font-bold text-amber-600", children: stat.value }),
                          /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: stat.label })
                        ]
                      },
                      stat.label
                    )) })
                  ] })
                ]
              }
            )
          ] })
        ]
      }
    ),
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
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-sm font-semibold tracking-[0.25em] text-white", children: t("pages.business_activity.why_choose_us.header") }),
            /* @__PURE__ */ jsx("div", { className: "mb-8 h-0.5 w-20 bg-yellow-600" }),
            /* @__PURE__ */ jsx("h3", { className: "mb-6 text-4xl leading-tight font-normal text-white md:text-5xl", children: t("pages.business_activity.why_choose_us.title") }),
            /* @__PURE__ */ jsx("p", { className: "mb-8 text-xl text-white/90", children: t("pages.business_activity.why_choose_us.subtitle") }),
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
                children: /* @__PURE__ */ jsx("a", { href: "/contact", children: t("pages.business_activity.why_choose_us.contact_button") })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(motion.div, { variants: slideInRight, transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" }, className: "space-y-6", children: [
            t("pages.business_activity.why_choose_us.features.professional"),
            t("pages.business_activity.why_choose_us.features.on_time"),
            t("pages.business_activity.why_choose_us.features.friendly"),
            t("pages.business_activity.why_choose_us.features.best_fair")
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
  BusinessActivityPage as default
};

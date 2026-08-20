import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
const welcomeBelowFoldCss = "\n          @keyframes containerFade {\n            0% {\n              opacity: 0;\n            }\n            100% {\n              opacity: 1;\n            }\n          }\n\n          @keyframes staggeredFadeScale {\n            0% {\n              opacity: 0;\n              transform: translateY(20px) scale(0.95);\n              filter: blur(2px);\n            }\n            60% {\n              opacity: 0.8;\n              transform: translateY(5px) scale(0.98);\n              filter: blur(1px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0) scale(1);\n              filter: blur(0px);\n            }\n          }\n\n          @keyframes premiumFadeIn {\n            0% {\n              opacity: 0;\n              transform: translateY(15px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n\n          @keyframes newsSlideIn {\n            from {\n              opacity: 0;\n              transform: translateY(20px) scale(0.95);\n            }\n            to {\n              opacity: 1;\n              transform: translateY(0) scale(1);\n            }\n          }\n\n          @keyframes gradientShift {\n            0% { background-position: 0% 50%; }\n            50% { background-position: 100% 50%; }\n            100% { background-position: 0% 50%; }\n          }\n\n          .line-clamp-2 {\n            display: -webkit-box;\n            -webkit-line-clamp: 2;\n            -webkit-box-orient: vertical;\n            overflow: hidden;\n          }\n\n          .line-clamp-3 {\n            display: -webkit-box;\n            -webkit-line-clamp: 3;\n            -webkit-box-orient: vertical;\n            overflow: hidden;\n          }\n\n          .line-clamp-4 {\n            display: -webkit-box;\n            -webkit-line-clamp: 4;\n            -webkit-box-orient: vertical;\n            overflow: hidden;\n          }\n\n          .animate-gradient {\n            background-size: 200% 200%;\n            animation: gradientShift 3s ease infinite;\n          }\n\n          .animate-containerFade {\n            animation: containerFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n          }\n\n          .animate-staggeredFadeScale {\n            opacity: 0;\n            animation: staggeredFadeScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n          }\n\n          .animate-premiumFadeIn {\n            animation: premiumFadeIn 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n          }\n\n          /* Delay Classes for Staggered Effect */\n          .delay-0 {\n            animation-delay: 0ms;\n          }\n\n          .delay-200 {\n            animation-delay: 200ms;\n          }\n\n          .delay-400 {\n            animation-delay: 400ms;\n          }\n\n          .delay-600 {\n            animation-delay: 600ms;\n          }\n\n          .delay-800 {\n            animation-delay: 800ms;\n          }\n\n          /* Hover Enhancement */\n          .hover-enhance {\n            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n\n          .hover-enhance:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n          }\n\n          /* Custom scrollbar styling */\n          .overflow-y-auto::-webkit-scrollbar {\n            width: 8px;\n          }\n\n          .overflow-y-auto::-webkit-scrollbar-track {\n            background: #f1f5f9;\n            border-radius: 4px;\n          }\n\n          .overflow-y-auto::-webkit-scrollbar-thumb {\n            background: #cbd5e1;\n            border-radius: 4px;\n          }\n\n          .overflow-y-auto::-webkit-scrollbar-thumb:hover {\n            background: #94a3b8;\n          }\n\n          /* Enhanced input focus states */\n          input:focus, select:focus, textarea:focus {\n            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);\n          }\n\n          /* File upload hover effects */\n          .border-dashed:hover {\n            border-color: #f59e0b;\n            background-color: #fef3c7;\n          }\n\n          .welcome-below-fold button:hover {\n            transform: translateY(-1px);\n          }\n\n          .welcome-below-fold button:active {\n            transform: translateY(0);\n          }\n\n          /* Tab animation */\n          .border-b-3 {\n            border-bottom-width: 3px;\n          }\n\n          /* Modal backdrop */\n          .backdrop-blur-sm {\n            backdrop-filter: blur(4px);\n          }\n\n          /* Mobile responsive improvements */\n          @media (max-width: 640px) {\n            .line-clamp-2 {\n              -webkit-line-clamp: 2;\n            }\n\n            .line-clamp-3 {\n              -webkit-line-clamp: 2;\n            }\n          }\n\n          /* Additional responsive utilities */\n          @media (max-width: 1024px) {\n            .lg\\\\:h-\\\\[400px\\\\] {\n              height: auto;\n              min-height: 400px;\n            }\n\n            .lg\\\\:h-\\\\[300px\\\\] {\n              height: auto;\n              min-height: 300px;\n            }\n          }\n\n          @media (max-width: 768px) {\n            .md\\\\:h-\\\\[350px\\\\] {\n              height: auto;\n              min-height: 350px;\n            }\n\n            .md\\\\:h-\\\\[250px\\\\] {\n              height: auto;\n              min-height: 250px;\n            }\n          }\n\n          /* Responsive section heights */\n          @media (max-width: 1023px) {\n            .welcome-below-fold {\n              height: auto !important;\n            }\n\n            .welcome-below-fold > div {\n              min-height: 300px;\n            }\n          }\n\n          /* Custom responsive button layout - Desktop left, mobile center */\n          @media (max-width: 639px) {\n            /* Mobile phones - buttons stacked vertically, centered */\n            .button-container {\n              flex-direction: column !important;\n              align-items: center !important;\n              justify-content: center !important;\n            }\n          }\n\n          @media (min-width: 640px) and (max-width: 1023px) {\n            /* Tablets (iPad, iPad Air, etc.) - buttons horizontal, centered */\n            .button-container {\n              flex-direction: row !important;\n              align-items: center !important;\n              justify-content: center !important;\n              gap: 1rem !important;\n            }\n          }\n\n          @media (min-width: 1024px) {\n            /* Desktop - buttons horizontal, left-aligned */\n            .button-container {\n              flex-direction: row !important;\n              align-items: center !important;\n              justify-content: flex-start !important;\n              gap: 1rem !important;\n            }\n          }\n\n          /* Responsive button alignment */\n          .button-container {\n            align-items: center !important;\n          }\n\n          @media (min-width: 1024px) {\n            .button-container {\n              justify-content: flex-start !important;\n            }\n          }\n\n          @media (max-width: 640px) {\n            .welcome-below-fold > div {\n              min-height: 250px;\n            }\n\n            .welcome-below-fold .text-2xl {\n              font-size: 1.75rem;\n            }\n\n            .welcome-below-fold .text-3xl {\n              font-size: 2rem;\n            }\n\n            .welcome-below-fold .text-4xl {\n              font-size: 2.25rem;\n            }\n          }\n\n          /* Scoped transitions (below-fold only; avoids main-thread cost on hero) */\n          .welcome-below-fold * {\n            transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            transition-duration: 150ms;\n          }\n\n          /* Enhanced hover states for cards */\n          .card-hover {\n            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n          }\n\n          .card-hover:hover {\n            transform: translateY(-4px);\n            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n          }\n\n          .welcome-below-fold img {\n            image-rendering: -webkit-optimize-contrast;\n            image-rendering: crisp-edges;\n          }\n\n          /* Typography responsive scaling */\n          @media (max-width: 480px) {\n            h1 {\n              line-height: 1.1;\n            }\n\n            h2, h3 {\n              line-height: 1.2;\n            }\n\n            p {\n              line-height: 1.5;\n            }\n          }\n\n          /* Loading states */\n          .loading {\n            opacity: 0.7;\n            pointer-events: none;\n          }\n\n          .welcome-below-fold *:focus {\n            outline: 2px solid #fbbf24;\n            outline-offset: 2px;\n          }\n\n          /* Print styles */\n          @media print {\n            .no-print {\n              display: none !important;\n            }\n\n            * {\n              color: black !important;\n              background: white !important;\n            }\n          }\n\n          /* High contrast mode support */\n          @media (prefers-contrast: high) {\n            .text-gray-600 {\n              color: #000000 !important;\n            }\n\n            .text-gray-800 {\n              color: #000000 !important;\n            }\n\n            .bg-yellow-400 {\n              background-color: #000000 !important;\n              color: #ffffff !important;\n            }\n          }\n\n          /* Reduced motion support */\n          @media (prefers-reduced-motion: reduce) {\n            .welcome-below-fold * {\n              animation-duration: 0.01ms !important;\n              animation-iteration-count: 1 !important;\n              transition-duration: 0.01ms !important;\n            }\n          }\n\n          /* Dark mode support (if needed in future) */\n          @media (prefers-color-scheme: dark) {\n            .dark-mode-ready {\n              background-color: #1f2937;\n              color: #f9fafb;\n            }\n          }\n\n          /* Performance optimizations */\n          .will-change-transform {\n            will-change: transform;\n          }\n\n          .will-change-opacity {\n            will-change: opacity;\n          }\n\n          /* GPU acceleration for smooth animations */\n          .gpu-accelerated {\n            transform: translateZ(0);\n            backface-visibility: hidden;\n            perspective: 1000;\n          }\n\n          /* Perspective utilities for 3D effects */\n          .perspective-1000 {\n            perspective: 1000px;\n          }\n\n          .perspective-500 {\n            perspective: 500px;\n          }\n\n          /* Enhanced drop shadow for premium feel */\n          .drop-shadow-premium {\n            filter: drop-shadow(0 25px 50px rgba(251, 191, 36, 0.2));\n          }\n\n          /* Smooth blur transitions */\n          .blur-transition {\n            transition: filter 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n\n          /* Shift floating feedback button when mobile menu is open */\n          .floating-feedback-button { transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n          body.mobile-menu-open .floating-feedback-button { right: 21rem !important; }\n          @media (min-width: 640px) { /* match drawer sm:w-96 */\n            body.mobile-menu-open .floating-feedback-button { right: 25rem !important; }\n          }\n\n          /* Floating animation keyframes */\n          @keyframes float {\n            0%, 100% {\n              transform: translateY(0px);\n            }\n            50% {\n              transform: translateY(-10px);\n            }\n          }\n\n          .animate-float {\n            animation: float 3s ease-in-out infinite;\n          }\n\n          /* Instagram Link Responsive Styles */\n          @media (max-width: 640px) {\n            .instagram-link {\n              padding: 0.75rem !important;\n              gap: 0.5rem !important;\n            }\n\n            .instagram-link .icon-container {\n              width: 2.5rem !important;\n              height: 2.5rem !important;\n            }\n\n            .instagram-link .icon-container svg {\n              width: 1.25rem !important;\n              height: 1.25rem !important;\n            }\n\n            .instagram-link .text-content span:first-child {\n              font-size: 0.75rem !important;\n            }\n\n            .instagram-link .text-content span:last-child {\n              font-size: 0.625rem !important;\n            }\n          }\n\n          @media (min-width: 641px) and (max-width: 1024px) {\n            .instagram-link {\n              padding: 1rem !important;\n              gap: 0.75rem !important;\n            }\n          }\n\n          /* Instagram Link Hover Effects */\n          .instagram-link {\n            position: relative;\n            overflow: hidden;\n          }\n\n          .instagram-link::before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: -100%;\n            width: 100%;\n            height: 100%;\n            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n            transition: left 0.5s;\n          }\n\n          .instagram-link:hover::before {\n            left: 100%;\n          }\n\n          /* Instagram Icon Pulse Animation */\n\n\n          /* Particle animation keyframes */\n          @keyframes particle-float {\n            0% {\n              transform: translateY(0px) scale(0);\n              opacity: 0;\n            }\n            50% {\n              transform: translateY(-20px) scale(1);\n              opacity: 1;\n            }\n            100% {\n              transform: translateY(-40px) scale(0);\n              opacity: 0;\n            }\n          }\n\n          .animate-particle {\n            animation: particle-float 4s ease-in-out infinite;\n          }\n\n          /* Gradient text animation */\n          @keyframes gradient-shift {\n            0% {\n              background-position: 0% 50%;\n            }\n            50% {\n              background-position: 100% 50%;\n            }\n            100% {\n              background-position: 0% 50%;\n            }\n          }\n\n          .animate-gradient-text {\n            animation: gradient-shift 3s ease infinite;\n          }\n\n          /* Enhanced logo rotation */\n          @keyframes logo-float {\n            0%, 100% {\n              transform: translateY(0px) rotate(0deg);\n            }\n            50% {\n              transform: translateY(-5px) rotate(180deg);\n            }\n          }\n\n          .animate-logo-float {\n            animation: logo-float 8s ease-in-out infinite;\n          }\n\n          /* Premium glow animation */\n          @keyframes premium-glow {\n            0%, 100% {\n              opacity: 0.4;\n              transform: scale(1);\n            }\n            50% {\n              opacity: 0.6;\n              transform: scale(1.1);\n            }\n          }\n\n          .animate-premium-glow {\n            animation: premium-glow 4s ease-in-out infinite;\n          }\n\n          /* Loading bar animation */\n          @keyframes loading-pulse {\n            0%, 100% {\n              opacity: 0.7;\n            }\n            50% {\n              opacity: 1;\n            }\n          }\n\n          .animate-loading-pulse {\n            animation: loading-pulse 2s ease-in-out infinite;\n          }\n        ";
function WelcomeBelowFold() {
  const { t } = useTranslation();
  const newsItems = [
    {
      id: "feb26-1",
      date: "10 Feb 2026",
      title: t("pages.welcome.news.items.feb26-1.title"),
      excerpt: t("pages.welcome.news.items.feb26-1.excerpt"),
      image: imageUrl("/february-news-01.jpg"),
      url: "/news/feb26-1",
      priority: "high"
    },
    {
      id: "feb26-2",
      date: "4 Feb 2026",
      title: t("pages.welcome.news.items.feb26-2.title"),
      excerpt: t("pages.welcome.news.items.feb26-2.excerpt"),
      image: imageUrl("/News-february-2.jpg"),
      url: "/news/feb26-2",
      priority: "high"
    },
    {
      id: "feb26-3",
      date: "22 Feb 2026",
      title: t("pages.welcome.news.items.feb26-3.title"),
      excerpt: t("pages.welcome.news.items.feb26-3.excerpt"),
      image: imageUrl("/news-3-february.jpg"),
      url: "/news/feb26-3",
      priority: "high"
    },
    {
      id: "feb26-4",
      date: "24 Feb 2026",
      title: t("pages.welcome.news.items.feb26-4.title"),
      excerpt: t("pages.welcome.news.items.feb26-4.excerpt"),
      image: imageUrl("/news-4-february.jpg"),
      url: "/news/feb26-4",
      priority: "high"
    },
    {
      id: "mar26-1",
      date: "6 Mar 2026",
      title: t("pages.welcome.news.items.mar26-1.title"),
      excerpt: t("pages.welcome.news.items.mar26-1.excerpt"),
      image: imageUrl("/maret-news-1.jpeg"),
      url: "/news/mar26-1",
      priority: "high"
    },
    {
      id: "dec-3",
      date: "10 Dec 2025",
      title: t("pages.welcome.news.items.dec-3.title"),
      excerpt: t("pages.welcome.news.items.dec-3.excerpt"),
      image: imageUrl("metronews_desember.jpeg"),
      url: "/news/dec-3",
      priority: "high"
    },
    {
      id: "sept-1",
      date: "1 Sep 2025",
      title: t("pages.welcome.news.items.sept-1.title"),
      excerpt: t("pages.welcome.news.items.sept-1.excerpt"),
      image: imageUrl("sept1.jpg"),
      url: "/news/sept-1",
      priority: "high"
    },
    {
      id: "jul-1",
      date: "15 Jul 2025",
      title: t("pages.welcome.news.items.jul-1.title"),
      excerpt: t("pages.welcome.news.items.jul-1.excerpt"),
      image: imageUrl("sembako.jpg"),
      url: "/news/jul-1",
      priority: "medium"
    },
    {
      id: "aug-2",
      date: "19 Aug 2025",
      title: t("pages.welcome.news.items.aug-2.title"),
      excerpt: t("pages.welcome.news.items.aug-2.excerpt"),
      image: imageUrl("agus2.jpg"),
      url: "/news/aug-2",
      priority: "medium"
    },
    {
      id: "feb-4",
      date: "3 Feb 2025",
      title: t("pages.welcome.news.items.feb-4.title"),
      excerpt: t("pages.welcome.news.items.feb-4.excerpt"),
      image: imageUrl("buruharian2.webp"),
      url: "/news/feb-4",
      priority: "medium"
    }
  ];
  const carouselSlides = [
    {
      id: 1,
      image: imageUrl("directorshero.jpg"),
      category: t("pages.welcome.board.category"),
      title: t("pages.welcome.board.title"),
      link: "/board-of-directors"
    },
    {
      id: 0,
      image: imageUrl("portofolio.jpg"),
      category: t("pages.welcome.portfolio.category"),
      title: t("pages.welcome.portfolio.title"),
      link: "/line-of-business"
    }
  ];
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= 768 : false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 14e3);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 8e3);
    return () => clearInterval(interval);
  }, [newsItems.length]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "welcome-below-fold flex flex-1 flex-col bg-white lg:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-black sm:aspect-[16/9] lg:aspect-auto lg:h-auto lg:w-1/2 lg:flex-1", children: [
        isMobile ? (
          // Mobile: no framer-motion to avoid flicker, still updates with currentSlide
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8",
              onClick: () => window.location.href = carouselSlides[currentSlide].link,
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 h-full w-full", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: carouselSlides[currentSlide].image,
                    alt: carouselSlides[currentSlide].title,
                    className: "h-full w-full object-cover",
                    style: {
                      objectPosition: "center center",
                      transform: "translate3d(0, 0, 0)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    },
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                    },
                    loading: "eager",
                    decoding: "async",
                    fetchPriority: "low"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm", children: carouselSlides[currentSlide].category }),
                  /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-bold sm:text-2xl lg:text-3xl", children: carouselSlides[currentSlide].title })
                ] })
              ]
            }
          )
        ) : /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: {
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1]
            },
            className: "absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 lg:p-8",
            style: {
              transform: "translate3d(0, 0, 0)",
              willChange: "opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            },
            onMouseEnter: () => setHoveredCard(0),
            onMouseLeave: () => setHoveredCard(null),
            onClick: () => window.location.href = carouselSlides[currentSlide].link,
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: {
                    duration: 1.05,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  className: "absolute inset-0 h-full w-full",
                  style: {
                    transform: "translate3d(0, 0, 0)",
                    willChange: "opacity"
                  },
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: carouselSlides[currentSlide].image,
                      alt: carouselSlides[currentSlide].title,
                      className: "h-full w-full object-cover",
                      style: {
                        objectPosition: "center center",
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        imageRendering: "-webkit-optimize-contrast"
                      },
                      onError: (e) => {
                        e.currentTarget.style.display = "none";
                      },
                      loading: "eager",
                      decoding: "async",
                      fetchPriority: "low"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: {
                    duration: 1,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1]
                  },
                  className: "relative z-10",
                  style: {
                    transform: "translate3d(0, 0, 0)",
                    willChange: "opacity"
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs font-semibold tracking-widest text-yellow-400 sm:text-sm", children: carouselSlides[currentSlide].category }),
                    /* @__PURE__ */ jsx(
                      "h3",
                      {
                        className: `mb-4 text-xl font-bold transition-transform duration-300 sm:text-2xl lg:text-3xl ${hoveredCard === 0 ? "lg:translate-x-2" : "translate-x-0"}`,
                        children: carouselSlides[currentSlide].title
                      }
                    )
                  ]
                }
              )
            ]
          },
          currentSlide
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-6 z-20 flex gap-2 sm:bottom-8 sm:left-8 lg:bottom-8 lg:left-8", children: carouselSlides.map((slide, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setCurrentSlide(idx);
            },
            className: `rounded-full transition-all duration-200 ${idx === currentSlide ? "h-2.5 w-8 bg-yellow-400" : "h-2.5 w-2.5 bg-white/50 hover:bg-white/80"}`,
            "aria-label": `Go to slide ${idx + 1}`
          },
          slide.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/business-activity",
          className: "relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-end overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8",
          onMouseEnter: () => setHoveredCard(1),
          onMouseLeave: () => setHoveredCard(null),
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl("businessactivity.jpg"),
                alt: t("pages.welcome.business_activities_alt"),
                className: `absolute top-0 left-0 h-full w-full object-cover transition-transform duration-300 will-change-auto lg:duration-500 ${hoveredCard === 1 ? "lg:scale-105" : "scale-100"}`,
                style: {
                  objectPosition: "center center",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                },
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                },
                loading: "eager"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 z-1 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: `mb-4 text-lg leading-tight font-bold transition-transform duration-200 sm:text-xl lg:text-2xl ${hoveredCard === 1 ? "lg:translate-x-2" : "translate-x-0"}`,
                  children: t("pages.welcome.business_activities.title")
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-sm font-medium underline transition-colors duration-200 ${hoveredCard === 1 ? "text-yellow-400" : "text-white"}`,
                  children: t("pages.welcome.business_activities.find_out_more")
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          id: "news-update",
          "data-news-section": "true",
          href: newsItems[currentNews].url,
          className: "relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-between overflow-hidden bg-yellow-400 p-6 no-underline sm:aspect-[16/9] sm:p-8 lg:aspect-auto lg:h-auto lg:w-1/4 lg:flex-1 lg:p-8",
          onMouseEnter: () => setHoveredCard(2),
          onMouseLeave: () => setHoveredCard(null),
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `absolute top-0 right-0 bottom-0 left-0 overflow-hidden transition-all duration-400 ease-out lg:duration-600 ${hoveredCard === 2 ? "scale-100 opacity-100" : "scale-105 opacity-0"}`,
                children: [
                  /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      className: "h-full w-full",
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      transition: {
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1]
                      },
                      style: { transform: "translateZ(0)" },
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: newsItems[currentNews].image,
                          alt: newsItems[currentNews].title,
                          className: "h-full w-full object-cover",
                          style: {
                            objectPosition: "center center",
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden"
                          },
                          onError: (e) => {
                            const target = e.currentTarget;
                            const tried = parseInt(target.dataset.fallbackTried || "0", 10);
                            try {
                              const u = new URL(target.src);
                              let pathPart = u.pathname.replace(/^\//, "");
                              if (pathPart.startsWith("public/")) pathPart = pathPart.slice(7);
                              if (pathPart.startsWith("images/")) pathPart = pathPart.slice(7);
                              const filename = pathPart.replace(/^kristalin-assets\/public\//, "");
                              if (tried === 0) {
                                target.dataset.fallbackTried = "1";
                                target.src = `${window.location.origin}/images/${filename}`;
                              } else if (tried === 1) {
                                target.dataset.fallbackTried = "2";
                                target.src = `${window.location.origin}/kristalin-assets/public/${filename}`;
                              } else {
                                target.style.display = "none";
                              }
                            } catch {
                              target.style.display = "none";
                            }
                          },
                          loading: "eager"
                        }
                      )
                    },
                    currentNews
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative z-10 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `text-xl font-bold transition-all duration-300 sm:text-2xl lg:text-3xl ${hoveredCard === 2 ? "text-white lg:scale-110" : "scale-100 text-gray-800"}`,
                  children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "/news",
                      onClick: (e) => {
                        e.stopPropagation();
                      },
                      className: `${hoveredCard === 2 ? "text-white hover:text-yellow-200" : "text-gray-800 hover:text-yellow-700"} underline-offset-4 hover:underline`,
                      children: t("pages.welcome.news.title_short")
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                newsItems.length > 1 && /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
                      },
                      className: `flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${hoveredCard === 2 ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-gray-200"}`,
                      children: /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentNews((prev) => (prev + 1) % newsItems.length);
                      },
                      className: `flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-200 lg:hover:scale-110 ${hoveredCard === 2 ? "text-white hover:bg-white/20" : "text-gray-700 hover:bg-gray-200"}`,
                      children: /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                    }
                  )
                ] }),
                newsItems[currentNews].priority === "high" && /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 ${hoveredCard === 2 ? "bg-white/20 text-white" : "bg-red-100 text-red-700"}`,
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-current" }),
                      /* @__PURE__ */ jsx("span", { children: t("pages.welcome.news.highlight_badge") })
                    ]
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-1 flex-col justify-center", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: {
                  duration: 0.4,
                  ease: "easeInOut"
                },
                className: "mb-4",
                children: newsItems.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `h-1 w-1 rounded-full transition-colors duration-300 ${hoveredCard === 2 ? "bg-white" : "bg-gray-500"}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `text-xs font-medium transition-colors duration-300 ${hoveredCard === 2 ? "text-gray-200" : "text-gray-600"}`,
                        children: newsItems[currentNews].date
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `mb-3 line-clamp-2 text-sm leading-tight font-bold transition-colors duration-300 sm:text-base lg:text-lg ${hoveredCard === 2 ? "text-white" : "text-gray-800"}`,
                      children: newsItems[currentNews].title
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `line-clamp-3 text-xs leading-relaxed transition-colors duration-300 sm:text-sm ${hoveredCard === 2 ? "text-gray-100" : "text-gray-700"}`,
                      children: newsItems[currentNews].excerpt
                    }
                  )
                ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-2 text-4xl", children: "📰" }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: `text-sm font-medium transition-colors duration-300 ${hoveredCard === 2 ? "text-white" : "text-gray-800"}`,
                      children: t("pages.welcome.news.no_news_available")
                    }
                  )
                ] })
              },
              currentNews
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `mb-3 flex items-center justify-between transition-colors duration-300 ${hoveredCard === 2 ? "border-white/20" : "border-black/10"}`,
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `flex items-center text-sm font-semibold transition-all duration-300 sm:text-base ${hoveredCard === 2 ? "text-white" : "text-gray-800"}`,
                      children: [
                        /* @__PURE__ */ jsx("span", { children: t("pages.welcome.news.view_button") }),
                        /* @__PURE__ */ jsx("div", { className: `ml-2 transition-transform duration-300 ${hoveredCard === 2 ? "translate-x-1" : "translate-x-0"}`, children: /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }) }) })
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1.5", children: newsItems.map((_, index) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentNews(index);
                  },
                  className: `transition-all duration-300 ${index === currentNews ? `h-1.5 w-6 rounded-full ${hoveredCard === 2 ? "bg-white" : "bg-gray-800"}` : `h-1.5 w-1.5 rounded-full ${hoveredCard === 2 ? "bg-white/40 hover:bg-white/60" : "bg-gray-400 hover:bg-gray-600"}`}`
                },
                index
              )) })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: welcomeBelowFoldCss } })
  ] });
}
export {
  WelcomeBelowFold as default
};

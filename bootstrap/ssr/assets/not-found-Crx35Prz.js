import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { H as Header, F as Footer } from "./Header-B2-5It5j.js";
import "lucide-react";
import "react";
import "react-dom";
import "./assets-CvOUY0DF.js";
function NotFound() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50", children: [
    /* @__PURE__ */ jsx(Head, { title: "404" }),
    /* @__PURE__ */ jsx(Header, { sticky: false, transparent: false }),
    /* @__PURE__ */ jsx("main", { className: "flex flex-1 items-center justify-center px-6 py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex items-center justify-center opacity-20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-32 h-48 border-8 border-gray-400 rounded-t-lg" }),
          /* @__PURE__ */ jsx("div", { className: "w-40 h-32 bg-gray-300 ml-8 rounded" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[220px] md:text-[320px] font-black leading-none text-white select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] animate-404-float", children: "404" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-1/2 left-0 right-0 h-20 md:h-15 bg-gradient-to-r from-transparent via-black to-transparent transform -translate-y-1/2 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-yellow-400 transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-black transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-yellow-400 transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-black transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-yellow-400 transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-black transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-yellow-400 transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-black transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-yellow-400 transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-black transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-yellow-400 transform -skew-x-12" }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-full bg-black transform -skew-x-12" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -inset-10 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-404-shine rotate-6" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 animate-404-bob", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-16 md:w-16 md:h-20 bg-gradient-to-b from-orange-500 to-orange-600 clip-triangle mx-auto" }),
            /* @__PURE__ */ jsx("div", { className: "w-3 h-2 md:w-4 md:h-3 bg-white absolute top-1/4 left-1/2 transform -translate-x-1/2" }),
            /* @__PURE__ */ jsx("div", { className: "w-3 h-2 md:w-4 md:h-3 bg-white absolute top-2/4 left-1/2 transform -translate-x-1/2" }),
            /* @__PURE__ */ jsx("div", { className: "w-16 h-3 md:w-20 md:h-4 bg-orange-700 absolute -bottom-1 left-1/2 transform -translate-x-1/2" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute -right-4 md:right-8 bottom-0 text-5xl md:text-7xl origin-bottom-left animate-404-swing", children: "⛏️" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 mt-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-bold tracking-tight text-gray-900", children: t("pages.notFound.title") || "Ooops... Halaman Tidak Ditemukan" }),
        /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-gray-600 max-w-md mx-auto", children: t("pages.notFound.subtitle") || "Area ini sedang dalam tahap penggalian. Silakan kembali ke halaman utama." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/",
          className: "inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-4 text-gray-900 font-bold text-lg transition-all hover:bg-yellow-500 hover:scale-105 hover:shadow-xl",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
            t("pages.notFound.backToHome") || "Kembali ke Beranda"
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                .clip-triangle {
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                }
                 @keyframes notFoundFloat {
                     0%, 100% { transform: translateY(0); }
                     50% { transform: translateY(-10px); }
                 }
                 @keyframes notFoundBob {
                     0%, 100% { transform: translate(-50%, 0) translateY(8px); }
                     50% { transform: translate(-50%, 0) translateY(2px); }
                 }
                 @keyframes notFoundSwing {
                     0% { transform: rotate(-6deg); }
                     50% { transform: rotate(6deg); }
                     100% { transform: rotate(-6deg); }
                 }
                 @keyframes notFoundShine {
                     0% { transform: translateX(-120%) skewX(-10deg); }
                     100% { transform: translateX(120%) skewX(-10deg); }
                 }
                 .animate-404-float { animation: notFoundFloat 4s ease-in-out infinite; }
                 .animate-404-bob { animation: notFoundBob 3.2s ease-in-out infinite; }
                 .animate-404-swing { animation: notFoundSwing 2.8s ease-in-out infinite; }
                 .animate-404-shine { animation: notFoundShine 2.4s linear infinite; }
            ` } })
  ] });
}
export {
  NotFound as default
};

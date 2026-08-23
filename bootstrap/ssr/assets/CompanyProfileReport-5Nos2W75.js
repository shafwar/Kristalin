import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { Loader2, ArrowLeft, Download, ShieldCheck, HeartHandshake, Award, TrendingUp, Eye, Target, History, Gem, Leaf, Users, Factory, Smartphone, Pickaxe, Store, GraduationCap, MapPin, Mail, Phone } from "lucide-react";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
function preloadAllImages() {
  const imgs = Array.from(document.querySelectorAll("img"));
  const promises = imgs.map(
    (img) => new Promise((resolve) => {
      if (img.complete && img.naturalHeight !== 0) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    })
  );
  return Promise.all(promises).then(() => void 0);
}
const PRINT_STATE_LABELS = {
  idle: "",
  preparing: "Preparing document...",
  rendering: "Rendering pages...",
  generating: "Generating PDF..."
};
function CompanyProfileReport() {
  const { t } = useTranslation();
  const [printState, setPrintState] = useState("idle");
  const printTriggered = useRef(false);
  useCallback(async () => {
    if (printTriggered.current) return;
    printTriggered.current = true;
    setPrintState("preparing");
    await new Promise((r) => setTimeout(r, 300));
    setPrintState("rendering");
    await preloadAllImages();
    await new Promise((r) => setTimeout(r, 500));
    setPrintState("generating");
    await new Promise((r) => setTimeout(r, 200));
    window.print();
    setTimeout(() => {
      setPrintState("idle");
      printTriggered.current = false;
    }, 1500);
  }, []);
  useEffect(() => {
    const handleAfterPrint = () => {
      setPrintState("idle");
      printTriggered.current = false;
    };
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);
  const isPrinting = printState !== "idle";
  const printLabel = PRINT_STATE_LABELS[printState];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-stone-100 py-0 md:py-8 print:bg-white print:py-0", children: [
    /* @__PURE__ */ jsx(Head, { title: t("pages.company_profile.page_title") || "Company Profile | PT Kristalin Ekalestari" }),
    isPrinting && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-sm print:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 shadow-2xl", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-amber-500" }),
      /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-stone-700", children: printLabel })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 border-t border-stone-200/90 bg-white/95 px-4 py-3 backdrop-blur-md print:hidden md:bottom-auto md:left-auto md:right-8 md:top-8 md:border-0 md:bg-transparent md:backdrop-blur-none md:gap-3 md:justify-end md:px-0 md:py-0", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/investor",
          className: "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-stone-700 shadow-md ring-1 ring-stone-200 transition-all hover:bg-stone-50 hover:text-stone-900 md:h-12 md:w-12 md:shadow-xl cursor-pointer",
          title: "Back to Investors",
          children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/download-company-profile",
          target: "_blank",
          rel: "noopener noreferrer",
          download: "Company-Profile-PT-Kristalin-Ekalestari.pdf",
          className: "group flex h-11 flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-5 sm:px-6 font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] md:h-12 md:shadow-xl text-xs sm:text-sm cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5" }),
            /* @__PURE__ */ jsx("span", { children: t("pages.company_profile.download_btn") || "Unduh PDF" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-[210mm] @container overflow-hidden bg-white text-stone-800 shadow-2xl print:w-[210mm] print:max-w-none print:shadow-none", children: [
      /* @__PURE__ */ jsxs("div", { className: "pdf-page relative flex w-full aspect-[210/297] flex-col overflow-hidden bg-stone-950 text-white md:h-[297mm] print:h-[297mm]", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-40", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: imageUrl("KristalinCompanyProfileBackground.webp"),
              alt: "",
              "aria-hidden": true,
              className: "h-full w-full object-cover object-center",
              loading: "eager"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col justify-between p-[7cqw] sm:p-10 md:p-16 print:p-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl("Kristalin-New-Logo.webp"),
                alt: "Kristalin Ekalestari",
                className: "h-[7cqw] min-h-[28px] max-h-[64px] w-auto brightness-0 invert",
                loading: "eager"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[2.2cqw] min-text-[10px] font-bold tracking-[0.18em] text-amber-500 uppercase whitespace-nowrap", children: t("pages.company_profile.report_year") || "2026 Edition" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto pb-[1cqw]", children: [
            /* @__PURE__ */ jsx("h1", { className: "mb-[2cqw] font-black uppercase leading-[1.05] tracking-tight text-[7.5cqw] print:text-7xl", children: t("pages.company_profile.report_title") || "COMPANY PROFILE REPORT" }),
            /* @__PURE__ */ jsx("div", { className: "mb-[2.5cqw] h-[0.7cqw] min-h-[3px] w-[14cqw] bg-amber-500 print:w-32" }),
            /* @__PURE__ */ jsxs("p", { className: "max-w-xl border-l-[0.5cqw] border-amber-500 py-[1cqw] pl-[3cqw] text-[2.7cqw] font-light italic text-stone-200 print:text-xl", children: [
              "“",
              t("pages.company_profile.tagline") || "Responsibility is not what we claim, but what we consistently do.",
              "”"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 md:mb-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:text-4xl print:text-4xl", children: t("pages.company_profile.exec_summary") || "Executive Summary" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-stone-700 md:text-base print:text-base", children: t("pages.company_profile.exec_summary_text") || "PT Kristalin Ekalestari is a premier integrated gold mining and refining company based in Indonesia. Operating since 1989, we manage the entire value chain from exploration in Papua to our state-of-the-art refinery in Jakarta. We are committed to sustainable operations and community development." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-8 md:text-4xl print:text-4xl", children: t("pages.company_profile.core_values") || "Core Values" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 print:grid-cols-2 print:gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "mb-3 h-7 w-7 text-amber-500", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl", children: t("pages.company_profile.cv_integrity") || "Integrity" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm", children: t("pages.company_profile.cv_integrity_text") || "Upholding the highest standards of ethics and transparency in all our operations." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6", children: [
              /* @__PURE__ */ jsx(HeartHandshake, { className: "mb-3 h-7 w-7 text-amber-500", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl", children: t("pages.company_profile.cv_sustainability") || "Sustainability" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm", children: t("pages.company_profile.cv_sustainability_text") || "Commitment to environmental stewardship and long-term community development." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6", children: [
              /* @__PURE__ */ jsx(Award, { className: "mb-3 h-7 w-7 text-amber-500", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl", children: t("pages.company_profile.cv_excellence") || "Excellence" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm", children: t("pages.company_profile.cv_excellence_text") || "Delivering world-class quality in gold refining and product certification." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded-xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm md:rounded-2xl md:p-6 print:rounded-2xl print:p-6", children: [
              /* @__PURE__ */ jsx(TrendingUp, { className: "mb-3 h-7 w-7 text-amber-500", strokeWidth: 1.5 }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-bold text-stone-900 md:text-xl print:text-xl", children: t("pages.company_profile.cv_innovation") || "Innovation" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-sm print:text-sm", children: t("pages.company_profile.cv_innovation_text") || "Continuously adopting cutting-edge technologies to optimize the mining value chain." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PageFooter, { page: "01", t })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pdf-page relative flex min-h-[100svh] flex-col overflow-hidden bg-white p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-amber-500/10 md:h-64 md:w-64" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-8 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-10 md:text-4xl print:text-4xl", children: t("pages.company_profile.chairman_title") || "Message from the Chairman" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-grow flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm sm:p-8 md:rounded-3xl md:p-10 print:rounded-3xl print:p-10", children: [
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -left-4 -top-4 text-amber-500 opacity-20 md:-left-6 md:-top-6", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "56", height: "56", viewBox: "0 0 24 24", fill: "currentColor", className: "md:h-20 md:w-20 print:h-20 print:w-20", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21v-7.391c0-5.714 4.195-7.79 7.983-8.83l.004 2.06c-1.636 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21h-8.017zm-14.017 0v-7.391c0-5.714 4.194-7.79 7.983-8.83l.004 2.06c-1.635 1.111-3.693 2.923-3.693 4.957v1.204h3.689V21H0z" }) }) }),
          /* @__PURE__ */ jsxs("p", { className: "relative z-10 text-sm font-medium italic leading-loose text-stone-700 md:text-lg print:text-lg", children: [
            "“",
            t("pages.company_profile.chairman_msg") || "Welcome to PT Kristalin Ekalestari. Since our inception, we have been driven by a singular vision: to redefine the gold mining industry in Indonesia through unwavering commitment to sustainability, innovation, and community empowerment. Our journey is not just about extracting precious metals; it is about creating lasting value for our stakeholders, preserving the environment for future generations, and uplifting the communities in Papua and beyond. As we embark on our digital transformation, we remain dedicated to transparency and excellence. Thank you for your continued trust and partnership.",
            "”"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 flex items-center justify-end border-t border-stone-200 pt-6 md:mt-10 md:pt-8 print:mt-10 print:pt-8", children: /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-stone-900 md:text-2xl print:text-2xl", children: t("pages.company_profile.chairman_name") || "Arif Budi Setiawan" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-semibold uppercase tracking-widest text-amber-600 md:text-sm print:text-sm", children: t("pages.company_profile.chairman_position") || "Chairman" })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx(PageFooter, { page: "02", t })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 md:gap-6 print:grid-cols-2 print:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-stone-900 p-5 text-white shadow-xl md:rounded-3xl md:p-8 print:rounded-3xl print:p-8", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-4 -top-4 opacity-10", children: /* @__PURE__ */ jsx(Eye, { className: "h-20 w-20 md:h-32 md:w-32" }) }),
            /* @__PURE__ */ jsx(Eye, { className: "mb-3 h-8 w-8 text-amber-500 md:mb-4 md:h-10 md:w-10" }),
            /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-bold md:mb-3 md:text-3xl print:text-3xl", children: t("pages.company_profile.vision_title") || "Our Vision" }),
            /* @__PURE__ */ jsx("p", { className: "relative z-10 text-xs leading-relaxed text-stone-300 md:text-base print:text-base", children: t("pages.company_profile.vision_text") || "To become the leading and most trusted integrated gold mining company in Southeast Asia, pioneering sustainable operations and driving socio-economic growth for local communities." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-amber-500 p-5 text-white shadow-xl md:rounded-3xl md:p-8 print:rounded-3xl print:p-8", children: [
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-4 -top-4 opacity-10 text-black", children: /* @__PURE__ */ jsx(Target, { className: "h-20 w-20 md:h-32 md:w-32" }) }),
            /* @__PURE__ */ jsx(Target, { className: "mb-3 h-8 w-8 text-stone-900 md:mb-4 md:h-10 md:w-10" }),
            /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-bold text-stone-900 md:mb-3 md:text-3xl print:text-3xl", children: t("pages.company_profile.mission_title") || "Our Mission" }),
            /* @__PURE__ */ jsx("p", { className: "relative z-10 text-xs font-medium leading-relaxed text-stone-900 md:text-base print:text-base", children: t("pages.company_profile.mission_text") || "To operate responsibly across the entire gold value chain—from upstream exploration to downstream trading—by utilizing state-of-the-art technology, adhering to the highest environmental and safety standards, and fostering long-term partnerships." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-6 md:text-4xl print:text-4xl", children: t("pages.company_profile.op_excellence") || "Operational Excellence" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 print:grid-cols-2 print:gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14", children: /* @__PURE__ */ jsx(History, { className: "h-6 w-6 text-amber-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-stone-900 md:text-lg print:text-lg", children: t("pages.company_profile.op_experience") || "Decades of Experience" }),
                /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs leading-relaxed text-stone-600", children: t("pages.company_profile.op_experience_text") || "Operating seamlessly since 1989 with a proven track record." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14", children: /* @__PURE__ */ jsx(Gem, { className: "h-6 w-6 text-amber-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-stone-900 md:text-lg print:text-lg", children: t("pages.company_profile.op_purity") || "99.99% Purity" }),
                /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs leading-relaxed text-stone-600", children: t("pages.company_profile.op_purity_text") || "Certified high-quality precious metals meeting international standards." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14", children: /* @__PURE__ */ jsx(Leaf, { className: "h-6 w-6 text-amber-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-stone-900 md:text-lg print:text-lg", children: t("pages.company_profile.op_sustainability") || "Eco-Friendly" }),
                /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs leading-relaxed text-stone-600", children: t("pages.company_profile.op_sustainability_text") || "Implementing ISO-certified green mining technologies." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 md:rounded-2xl md:p-5 print:rounded-2xl print:p-5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 md:h-14 md:w-14 print:h-14 print:w-14", children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6 text-amber-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-stone-900 md:text-lg print:text-lg", children: t("pages.company_profile.op_community") || "Local Empowerment" }),
                /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs leading-relaxed text-stone-600", children: t("pages.company_profile.op_community_text") || "Creating thousands of jobs and supporting local Papuan businesses." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PageFooter, { page: "03", t })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-10 md:text-4xl print:text-4xl", children: t("pages.company_profile.milestones") || "Company Milestones" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-grow flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative ml-5 space-y-8 border-l-2 border-stone-200 pb-2 md:ml-8 md:space-y-12 print:ml-8 print:space-y-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative pl-10 md:pl-14 print:pl-14", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16", children: /* @__PURE__ */ jsx(History, { className: "h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" }) }),
              /* @__PURE__ */ jsx("h3", { className: "mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl", children: t("pages.company_profile.ms_1989") || "1989" }),
              /* @__PURE__ */ jsx("h4", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.ms_1989_title") || "Foundation" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-base print:text-base", children: t("pages.company_profile.ms_1989_text") || "Established in Papua with a focus on sustainable gold exploration and community engagement." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative pl-10 md:pl-14 print:pl-14", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Factory, { className: "h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" }) }),
              /* @__PURE__ */ jsx("h3", { className: "mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl", children: t("pages.company_profile.ms_2005") || "2005" }),
              /* @__PURE__ */ jsx("h4", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.ms_2005_title") || "First Refinery" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-base print:text-base", children: t("pages.company_profile.ms_2005_text") || "Opened our first state-of-the-art refining facility in Jakarta, enabling end-to-end processing." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative pl-10 md:pl-14 print:pl-14", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Award, { className: "h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" }) }),
              /* @__PURE__ */ jsx("h3", { className: "mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl", children: t("pages.company_profile.ms_2015") || "2015" }),
              /* @__PURE__ */ jsx("h4", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.ms_2015_title") || "LBMA Certification" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-base print:text-base", children: t("pages.company_profile.ms_2015_text") || "Achieved international LBMA standard for our 99.99% gold bars, recognizing our world-class quality." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative pl-10 md:pl-14 print:pl-14", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-amber-50 shadow-sm md:-left-[33px] md:h-16 md:w-16 print:-left-[33px] print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Smartphone, { className: "h-5 w-5 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7" }) }),
              /* @__PURE__ */ jsx("h3", { className: "mb-1 text-xl font-bold text-amber-500 md:mb-2 md:text-4xl print:text-4xl", children: t("pages.company_profile.ms_2026") || "2026" }),
              /* @__PURE__ */ jsx("h4", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.ms_2026_title") || "Digital Transformation" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-stone-600 md:text-base print:text-base", children: t("pages.company_profile.ms_2026_text") || "Launched B2C digital platform connecting physical gold directly to investors." })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(PageFooter, { page: "04", t })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-5 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-8 md:text-4xl print:text-4xl", children: t("pages.company_profile.line_of_business") || "Line of Business" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col justify-between gap-4 md:gap-5 print:gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 md:h-16 md:w-16 print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Pickaxe, { className: "h-7 w-7 text-amber-600", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-grow", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.lob_upstream") || "Exploration & Upstream" }),
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm", children: t("pages.company_profile.lob_upstream_text") || "Focusing on discovering high-quality primary and secondary gold reserves with strict operational standards in Nabire, Central Papua. We employ advanced geological mapping and responsible extraction methods." }),
                /* @__PURE__ */ jsx("p", { className: "text-xs leading-loose text-stone-500", dangerouslySetInnerHTML: { __html: t("pages.company_profile.lob_upstream_extra") || "• 15,000+ Hectares of exploration area<br>• Advanced geophysical surveying<br>• Zero-harm safety protocols" } })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 md:h-16 md:w-16 print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Factory, { className: "h-7 w-7 text-amber-600", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-grow", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.lob_midstream") || "Processing & Refining" }),
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm", children: t("pages.company_profile.lob_midstream_text") || "Our advanced Smelter & Refinery infrastructure processes gold ore into certified precious metal bars, achieving 99.99% purity. We adhere strictly to international LBMA standards." }),
                /* @__PURE__ */ jsx("p", { className: "text-xs leading-loose text-stone-500", dangerouslySetInnerHTML: { __html: t("pages.company_profile.lob_midstream_extra") || "• 2.5+ Tons annual capacity<br>• Advanced smelting technology<br>• 100% Traceable sourcing" } })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-amber-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-amber-100 bg-amber-50 md:h-16 md:w-16 print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Store, { className: "h-7 w-7 text-amber-600", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-grow", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.lob_downstream") || "Downstream Trading" }),
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm", children: t("pages.company_profile.lob_downstream_text") || "Connecting physical gold directly to the consumer market (B2C) through our digital platforms and strategic partnerships, offering investment-grade gold directly to the public." }),
                /* @__PURE__ */ jsx("p", { className: "text-xs leading-loose text-stone-500", dangerouslySetInnerHTML: { __html: t("pages.company_profile.lob_downstream_extra") || "• Direct B2C digital access<br>• Real-time pricing integration<br>• Insured nationwide delivery" } })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PageFooter, { page: "05", t })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pdf-page flex min-h-[100svh] flex-col overflow-hidden p-6 sm:p-10 md:min-h-[297mm] md:p-16 print:h-[297mm] print:break-before-page print:p-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 border-b-4 border-amber-500 pb-2 text-2xl font-bold text-stone-900 md:mb-6 md:text-4xl print:text-4xl", children: t("pages.company_profile.csr") || "Corporate Social Responsibility" }),
          /* @__PURE__ */ jsx("p", { className: "mb-5 text-xs leading-relaxed text-stone-700 md:mb-6 md:text-sm print:text-sm", children: t("pages.company_profile.csr_text") || "We believe that our success is deeply intertwined with the prosperity of the communities where we operate. Through our monthly CSR programs, we provide essential food supplies, build community infrastructure, and fund educational and health initiatives in Nabire." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col justify-between gap-4 md:gap-5 print:gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-emerald-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 md:h-16 md:w-16 print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Leaf, { className: "h-7 w-7 text-emerald-600", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-grow", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.csr_env") || "Environmental Stewardship" }),
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm", children: t("pages.company_profile.csr_env_text") || "Implementing ISO 14001 standards, land reclamation, and renewable energy in mining operations to minimize our carbon footprint." }),
                /* @__PURE__ */ jsx("p", { className: "text-xs leading-loose text-stone-500", dangerouslySetInnerHTML: { __html: t("pages.company_profile.csr_env_extra") || "• 100,000+ trees planted for land reclamation<br>• 30% reduction in carbon emissions<br>• Comprehensive water recycling system" } })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-blue-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 md:h-16 md:w-16 print:h-16 print:w-16", children: /* @__PURE__ */ jsx(Users, { className: "h-7 w-7 text-blue-600", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-grow", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.csr_com") || "Community Empowerment" }),
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm", children: t("pages.company_profile.csr_com_text") || "Building schools, hospitals, and infrastructure for the communities in Nabire, Central Papua, ensuring mutual prosperity." }),
                /* @__PURE__ */ jsx("p", { className: "text-xs leading-loose text-stone-500", dangerouslySetInnerHTML: { __html: t("pages.company_profile.csr_com_extra") || "• Built 15+ community centers<br>• Empowering 50+ local MSMEs<br>• Regular cultural preservation events" } })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-grow flex-col items-start gap-4 rounded-2xl border border-stone-100 border-l-4 border-l-rose-500 bg-white p-5 shadow-sm sm:flex-row sm:items-center md:flex-row md:items-center md:gap-6 md:rounded-3xl md:p-6 print:flex-row print:items-center print:gap-6 print:rounded-3xl print:p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-rose-100 bg-rose-50 md:h-16 md:w-16 print:h-16 print:w-16", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-7 w-7 text-rose-600", strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-grow", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-xl print:text-xl", children: t("pages.company_profile.csr_edu") || "Education & Health" }),
                /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs leading-relaxed text-stone-600 md:mb-2 md:text-sm print:text-sm", children: t("pages.company_profile.csr_edu_text") || "Providing scholarships and funding local health clinics to improve the quality of life for future generations." }),
                /* @__PURE__ */ jsx("p", { className: "text-xs leading-loose text-stone-500", dangerouslySetInnerHTML: { __html: t("pages.company_profile.csr_edu_extra") || "• 500+ Annual student scholarships<br>• Constructed 3 modern health clinics<br>• Monthly free health check-ups" } })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PageFooter, { page: "06", t })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pdf-page relative flex min-h-[100svh] flex-col overflow-hidden md:min-h-[297mm] print:h-[297mm] print:break-before-page", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: imageUrl("KristalinCompanyProfileBackground.webp"),
            alt: "",
            "aria-hidden": true,
            className: "absolute inset-0 h-full w-full object-cover",
            loading: "eager"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-stone-950/85" }),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -translate-y-1/2 translate-x-1/2 right-0 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl md:h-96 md:w-96" }),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -translate-x-1/2 translate-y-1/3 bottom-0 left-0 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl md:h-[500px] md:w-[500px]" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-grow flex-col items-center justify-center p-8 text-center md:p-16 print:p-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-10 flex flex-col items-center md:mb-16 print:mb-16", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-medium tracking-wide text-stone-300 md:text-5xl print:text-5xl", children: "Kristalin Ekalestari" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-medium uppercase tracking-widest text-stone-500 md:ml-16 md:text-lg print:ml-16 print:text-lg", children: "Integrated Gold Industries" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mb-8 text-2xl font-bold uppercase tracking-wider text-amber-500 md:mb-12 md:text-4xl print:mb-12 print:text-4xl", children: "CONTACT US" }),
          /* @__PURE__ */ jsxs("div", { className: "inline-block space-y-4 text-left md:space-y-6 print:space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:gap-6 print:gap-6", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 flex-shrink-0 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7", strokeWidth: 2 }),
              /* @__PURE__ */ jsx("span", { className: "text-base font-medium text-stone-200 md:text-xl print:text-xl", children: "Jakarta Head Office, Indonesia" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:gap-6 print:gap-6", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 flex-shrink-0 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7", strokeWidth: 2 }),
              /* @__PURE__ */ jsx("span", { className: "text-base font-medium text-stone-200 md:text-xl print:text-xl", children: "info@kristalin.co.id" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:gap-6 print:gap-6", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 flex-shrink-0 text-amber-500 md:h-7 md:w-7 print:h-7 print:w-7", strokeWidth: 2 }),
              /* @__PURE__ */ jsx("span", { className: "text-base font-medium text-stone-200 md:text-xl print:text-xl", children: "+62 21 22978900" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-20 print:hidden md:hidden" }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
                @media print {
                    @page {
                        margin: 0;
                        size: A4 portrait;
                    }

                    html, body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        background: white !important;
                        width: 210mm !important;
                        margin: 0 !important;
                    }

                    /* Force A4 container dimensions */
                    .pdf-page {
                        width: 210mm !important;
                        height: 297mm !important;
                        min-height: 297mm !important;
                        max-height: 297mm !important;
                        overflow: hidden !important;
                        break-before: page !important;
                        page-break-before: always !important;
                        box-sizing: border-box !important;
                        padding: 64px !important;
                    }

                    /* First page has no break-before */
                    .pdf-page:first-child {
                        break-before: avoid !important;
                        page-break-before: avoid !important;
                        padding: 0 !important;
                    }

                    /* Force 2-column grid layout in print (overrides mobile 1-column) */
                    .pdf-page .grid {
                        display: grid !important;
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }

                    /* Force horizontal card layout in print (overrides mobile flex-col) */
                    .pdf-page .flex-col.sm\\:flex-row,
                    .pdf-page .flex-col.md\\:flex-row {
                        flex-direction: row !important;
                        align-items: center !important;
                    }

                    /* Images always render with color */
                    img {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        max-width: 100% !important;
                    }
                }
            ` } })
  ] });
}
function PageFooter({ page, t }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-end justify-between border-t border-stone-200 pt-4 md:mt-6 md:pt-5 print:mt-6 print:pt-5", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-medium text-stone-400 md:text-xs print:text-xs", children: t("pages.company_profile.footer_note") || "Generated automatically from Kristalin Ekalestari Digital Platform." }),
    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-stone-400 md:text-base print:text-base", children: page })
  ] });
}
export {
  CompanyProfileReport as default
};

import { jsxs, jsx } from "react/jsx-runtime";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { I as InquiryForm } from "./InquiryForm-4NUO8kae.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { Head, Link } from "@inertiajs/react";
import { Download, Eye, Target, Building2, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "react-dom";
import "./assets-CvOUY0DF.js";
import "./label-B_m42RSr.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
function InvestorPage() {
  const { t } = useTranslation();
  const scrollRafRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);
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
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white text-stone-900", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: t("pages.investor.page_title") || "Investor & Partner Pack | Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: t("pages.investor.meta_description") || "Informasi dan panduan lengkap bagi calon investor dan mitra PT Kristalin Ekalestari." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: true }),
    /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute inset-0 h-full w-full will-change-transform",
          style: { transform: `translateY(${scrollY * 0.4}px)` },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/kristalin-assets/public/investmentkristalin-opt.webp",
                alt: "Investment Background",
                className: "h-full w-full object-cover object-center",
                fetchPriority: "high",
                loading: "eager"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto max-w-5xl px-4 text-center mt-20", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          animate: "visible",
          variants: staggerContainer,
          children: [
            /* @__PURE__ */ jsx(
              motion.p,
              {
                variants: fadeInUp,
                transition: { duration: 0.8, ease: "easeOut" },
                className: "mb-4 text-sm font-semibold tracking-[0.3em] text-amber-500 uppercase",
                children: t("pages.investor.hero_subtitle") || "Partnership & Investment"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.h1,
              {
                variants: fadeInUp,
                transition: { duration: 0.8, delay: 0.1, ease: "easeOut" },
                className: "mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl",
                children: t("pages.investor.hero_title") || "Investor & Partner Pack"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                variants: fadeInUp,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
                className: "mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-stone-300 sm:text-xl",
                children: t("pages.investor.hero_description") || "Bergabunglah bersama kami membangun ekosistem pertambangan emas terintegrasi yang berkelanjutan. Unduh dokumen profil perusahaan dan skema kemitraan kami."
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: fadeInUp,
                transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                className: "flex flex-col sm:flex-row items-center justify-center gap-4",
                children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "/download-company-profile",
                      download: "Company Profile _ PT Kristalin Ekalestari.pdf",
                      className: "group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-amber-500 px-8 text-base font-semibold text-white shadow-xl transition-all duration-200 hover:scale-105",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 transition-opacity duration-300 group-hover:opacity-0" }),
                        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                        /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-3", children: [
                          /* @__PURE__ */ jsx(Download, { className: "h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" }),
                          t("pages.investor.download_btn") || "Download Company Profile (PDF)"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: "/company-profile-report",
                      className: "inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 text-base font-semibold shadow-xl transition-all hover:scale-105 active:scale-95",
                      children: [
                        /* @__PURE__ */ jsx(Eye, { className: "h-5 w-5 text-amber-400" }),
                        /* @__PURE__ */ jsx("span", { children: t("pages.investor.preview_btn") || "Preview Dokumen Online" })
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.5, duration: 1 },
          className: "absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2",
          children: /* @__PURE__ */ jsx("div", { className: "h-[30px] w-[20px] rounded-full border-2 border-white/30 flex justify-center p-1", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { y: [0, 10, 0] },
              transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
              className: "h-1.5 w-1.5 rounded-full bg-amber-500"
            }
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 bg-white px-4 py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-100px" },
          variants: fadeInUp,
          transition: { duration: 0.6 },
          className: "mb-16 text-center",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight text-stone-900 md:text-5xl", children: t("pages.investor.lob_title") || "Line of Business & Sorotan Utama" }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-stone-500 max-w-2xl mx-auto", children: t("pages.investor.lob_subtitle") || "Ekosistem terpadu dari hulu ke hilir" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-50px" },
          variants: staggerContainer,
          className: "grid gap-8 md:grid-cols-3",
          children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: fadeInUp,
                className: "group relative overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform duration-500 group-hover:scale-110", children: /* @__PURE__ */ jsx(Target, { className: "h-10 w-10" }) }),
                    /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold text-stone-900", children: t("pages.investor.lob_1_title") || "Eksplorasi & Hulu" }),
                    /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-stone-600", children: t("pages.investor.lob_1_desc") || "Fokus pada penemuan cadangan emas primer dan sekunder berkualitas tinggi dengan standar operasional yang ketat." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: fadeInUp,
                className: "group relative overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform duration-500 group-hover:scale-110", children: /* @__PURE__ */ jsx(Building2, { className: "h-10 w-10" }) }),
                    /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold text-stone-900", children: t("pages.investor.lob_2_title") || "Pengolahan & Pemurnian" }),
                    /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-stone-600", children: t("pages.investor.lob_2_desc") || "Infrastruktur canggih (Smelter & Refinery) untuk memproses bijih emas menjadi logam mulia batangan bersertifikat." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: fadeInUp,
                className: "group relative overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform duration-500 group-hover:scale-110", children: /* @__PURE__ */ jsx(LineChart, { className: "h-10 w-10" }) }),
                    /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold text-stone-900", children: t("pages.investor.lob_3_title") || "Perdagangan Hilir" }),
                    /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-stone-600", children: t("pages.investor.lob_3_desc") || "Menghubungkan emas fisik langsung ke pasar konsumen (B2C) melalui platform digital dan kemitraan strategis." })
                  ] })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-50px" },
          variants: slideInLeft,
          transition: { duration: 0.8, ease: "easeOut" },
          className: "mt-16 md:mt-20 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-stone-950 px-6 py-12 text-center text-white sm:px-10 md:px-16 md:py-16 md:text-left relative shadow-2xl",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-40 -left-20 w-80 h-80 bg-stone-700/40 rounded-full blur-[100px] pointer-events-none" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-4 text-2xl font-bold md:mb-6 md:text-4xl", children: t("pages.investor.milestone_title") || "Pencapaian Milestone Kami" }),
                /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed text-stone-400 md:text-lg", children: t("pages.investor.milestone_desc") || "Sejak tahun 1989, Kristalin Ekalestari terus berinovasi dan menjaga komitmen CSR di seluruh wilayah operasional, mencetak pertumbuhan yang konsisten dan berkelanjutan." })
              ] }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/milestones",
                  className: "group relative shrink-0 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-stone-700 bg-stone-900/80 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-200 active:scale-95 hover:border-amber-500 hover:bg-amber-500",
                  children: [
                    t("pages.investor.milestone_btn") || "Lihat Milestones Penuh",
                    /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", className: "transition-transform duration-300 group-hover:translate-x-1", children: /* @__PURE__ */ jsx("path", { d: "M1 6H11M11 6L6 1M11 6L6 11", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 bg-stone-50 px-4 py-24 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-100px" },
          variants: fadeInUp,
          transition: { duration: 0.6 },
          className: "mb-16 text-center",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight text-stone-900 md:text-5xl", children: t("pages.investor.strength_title") || "Skala Operasional & Transparansi" }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-stone-500 max-w-2xl mx-auto", children: t("pages.investor.strength_subtitle") || "Lebih dari 3 dekade keunggulan operasional, didukung infrastruktur kelas dunia." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
        { value: t("pages.investor.strength_1_val") || "12+", label: t("pages.investor.strength_1_label") || "Armada Excavator", desc: t("pages.investor.strength_1_desc") || "Sistem operasional tambang dengan alat berat modern secara mandiri." },
        { value: t("pages.investor.strength_2_val") || "30+", label: t("pages.investor.strength_2_label") || "Tahun Pengalaman", desc: t("pages.investor.strength_2_desc") || "Berdiri sejak 1989, memiliki rekam jejak panjang di industri emas." },
        { value: t("pages.investor.strength_3_val") || "B2B", label: t("pages.investor.strength_3_label") || "Penawaran Institusional", desc: t("pages.investor.strength_3_desc") || "Sistem inquiry transparan langsung ke manajemen untuk kebutuhan B2B." },
        { value: t("pages.investor.strength_4_val") || "ESG", label: t("pages.investor.strength_4_label") || "Komitmen Sosial", desc: t("pages.investor.strength_4_desc") || "Fokus pada keberlanjutan lingkungan dan pemberdayaan masyarakat Nabire." }
      ].map((stat, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1, duration: 0.6 },
          className: "flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-sm border border-stone-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-100",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-amber-500", children: stat.value }),
            /* @__PURE__ */ jsx("span", { className: "mt-4 text-lg font-bold text-stone-900", children: stat.label }),
            /* @__PURE__ */ jsx("span", { className: "mt-3 text-sm text-stone-500 leading-relaxed", children: stat.desc })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative z-10 bg-stone-950 px-4 py-24 md:py-32 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none opacity-20", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-500 blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-500 blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('/img/grid.svg')] bg-center bg-repeat opacity-10" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto max-w-6xl", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2 lg:gap-16 items-center", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "text-left",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl", children: t("pages.investor.form_title") || "Initiate Partnership" }),
              /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-stone-400 leading-relaxed max-w-lg", children: t("pages.investor.form_subtitle") || "Fill out the form below to discuss with our institutional representative team." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-12 space-y-8 hidden md:block", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-900 border border-stone-800 shadow-inner", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-amber-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-stone-500", children: t("pages.investor.contact_email_label") || "Institutional Email" }),
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-stone-200 mt-1", children: "investor@kristalin.co.id" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-900 border border-stone-800 shadow-inner", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-amber-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-wider text-stone-500", children: t("pages.investor.contact_hq_label") || "Headquarters" }),
                    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-stone-200 mt-1", children: t("pages.investor.contact_hq_val") || "Jakarta Selatan, Indonesia" })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
            className: "relative",
            children: /* @__PURE__ */ jsx(
              InquiryForm,
              {
                type: "Investor",
                hideHeader: true,
                variant: "dark"
              }
            )
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  InvestorPage as default
};

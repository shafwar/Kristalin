import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-B2-5It5j.js";
import { P as PapuaChildrenHeroPicture, p as papuaBackgroundForTier } from "./PapuaChildrenHeroPicture-D2Fa_1ZV.js";
import { u as useNetworkProfile } from "./useNetworkProfile-BaMceDYv.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { Utensils, Home, GraduationCap, Trees, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import "react-dom";
function CsrSustainabilityPillars() {
  const { t } = useTranslation();
  const getTags = (itemKey, fallbackTags) => {
    const raw = t(`pages.csr.pillars.items.${itemKey}.tags`);
    if (Array.isArray(raw) && raw.length > 0) {
      return raw;
    }
    return fallbackTags;
  };
  const pillars = [
    {
      id: "food_security",
      pillarNo: t("pages.csr.pillars.items.food_security.pillar_no") || "Pilar 01",
      title: t("pages.csr.pillars.items.food_security.title") || "Bantuan Pangan & Sembako",
      tag: t("pages.csr.pillars.items.food_security.tag") || "Kebutuhan Pokok Warga",
      description: t("pages.csr.pillars.items.food_security.description") || "Penyaluran sembako secara rutin untuk warga adat, lansia, dan keluarga di sekitar area operasional tambang guna memenuhi kebutuhan pangan harian.",
      tags: getTags("food_security", ["Paket Sembako Bergizi", "Warga Adat & Lansia", "Kebutuhan Pokok Harian"]),
      icon: /* @__PURE__ */ jsx(Utensils, { className: "h-6 w-6 text-amber-700" }),
      accentColor: "from-amber-400 via-yellow-500 to-amber-600",
      badgeBg: "bg-amber-100/90 text-amber-950 border-amber-300/80",
      iconBg: "bg-amber-50 border-amber-200/80",
      borderHover: "hover:border-amber-400/80"
    },
    {
      id: "infrastructure",
      pillarNo: t("pages.csr.pillars.items.infrastructure.pillar_no") || "Pilar 02",
      title: t("pages.csr.pillars.items.infrastructure.title") || "Hunian & Air Bersih",
      tag: t("pages.csr.pillars.items.infrastructure.tag") || "Fasilitas Desa Nifasi",
      description: t("pages.csr.pillars.items.infrastructure.description") || "Pembangunan rumah layak huni bagi keluarga warga Nifasi, pembangunan jaringan pipa air bersih ke pemukiman, dan pemeliharaan jalan desa.",
      tags: getTags("infrastructure", ["Bedah Rumah Warga", "Akses Pipa Air Bersih", "Fasilitas Pemukiman"]),
      icon: /* @__PURE__ */ jsx(Home, { className: "h-6 w-6 text-blue-700" }),
      accentColor: "from-blue-400 via-indigo-500 to-blue-600",
      badgeBg: "bg-blue-100/90 text-blue-950 border-blue-300/80",
      iconBg: "bg-blue-50 border-blue-200/80",
      borderHover: "hover:border-blue-400/80"
    },
    {
      id: "education_health",
      pillarNo: t("pages.csr.pillars.items.education_health.pillar_no") || "Pilar 03",
      title: t("pages.csr.pillars.items.education_health.title") || "Pendidikan & Kesehatan",
      tag: t("pages.csr.pillars.items.education_health.tag") || "Generasi Muda & Medis",
      description: t("pages.csr.pillars.items.education_health.description") || "Dukungan beasiswa bagi putra-putri berprestasi di Nabire, penyediaan buku dan alat sekolah, serta bantuan layanan kesehatan warga.",
      tags: getTags("education_health", ["Beasiswa Pelajar", "Perlengkapan Belajar", "Layanan Posyandu & Medis"]),
      icon: /* @__PURE__ */ jsx(GraduationCap, { className: "h-6 w-6 text-emerald-700" }),
      accentColor: "from-emerald-400 via-teal-500 to-emerald-600",
      badgeBg: "bg-emerald-100/90 text-emerald-950 border-emerald-300/80",
      iconBg: "bg-emerald-50 border-emerald-200/80",
      borderHover: "hover:border-emerald-400/80"
    },
    {
      id: "reclamation",
      pillarNo: t("pages.csr.pillars.items.reclamation.pillar_no") || "Pilar 04",
      title: t("pages.csr.pillars.items.reclamation.title") || "Pemulihan Alam & Lingkungan",
      tag: t("pages.csr.pillars.items.reclamation.tag") || "Penghijauan Hutan Papua",
      description: t("pages.csr.pillars.items.reclamation.description") || "Penataan tanah dan aliran air pasca-tambang, serta penanaman kembali pohon-pohon asli Papua untuk menjaga hutan tetap hijau dan asri.",
      tags: getTags("reclamation", ["Penanaman Pohon Asli", "Penjagaan Sumber Air", "Kelestarian Hutan Papua"]),
      icon: /* @__PURE__ */ jsx(Trees, { className: "h-6 w-6 text-green-700" }),
      accentColor: "from-green-500 via-emerald-600 to-green-700",
      badgeBg: "bg-green-100/90 text-green-950 border-green-300/80",
      iconBg: "bg-green-50 border-green-200/80",
      borderHover: "hover:border-green-400/80"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "relative z-10 bg-gradient-to-b from-stone-50/90 via-white to-stone-50/90 py-16 sm:py-24 border-y border-stone-200/70", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mx-auto max-w-3xl text-center",
        initial: { opacity: 0, y: 25 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-4 py-1.5 shadow-2xs", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-amber-700" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-wider text-amber-950 uppercase", children: t("pages.csr.pillars.kicker") || "Tanggung Jawab Sosial & Lingkungan (TJSL)" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "mt-4 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl", children: [
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent", children: t("pages.csr.pillars.title_line1") || "4 Pilar Program Sosial &" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-stone-900", children: t("pages.csr.pillars.title_line2") || "Pemberdayaan Masyarakat" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-stone-600 sm:text-base md:text-lg max-w-2xl mx-auto", children: t("pages.csr.pillars.description") || "Komitmen nyata PT Kristalin Ekalestari dalam mendampingi masyarakat adat di lingkar tambang Nabire, membangun kemandirian warga, dan menjaga kelestarian alam Papua." })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto", children: pillars.map((pillar, idx) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 25 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, delay: idx * 0.1, ease: "easeOut" },
        className: `group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-stone-200/90 bg-gradient-to-b from-white via-white to-stone-50/50 p-6 sm:p-7 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${pillar.borderHover}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${pillar.accentColor}` }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: `inline-block rounded-full border px-3 py-0.5 text-[11px] font-bold tracking-wider uppercase shadow-2xs ${pillar.badgeBg}`, children: pillar.pillarNo }),
                /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-amber-800 tracking-wider uppercase", children: pillar.tag })
              ] }),
              /* @__PURE__ */ jsx("div", { className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-2xs transition-transform duration-300 group-hover:scale-110 ${pillar.iconBg}`, children: pillar.icon })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 text-xl sm:text-2xl font-bold tracking-tight text-stone-900", children: pillar.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2.5 text-sm sm:text-base leading-relaxed text-stone-600", children: pillar.description })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 border-t border-stone-100 pt-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: pillar.tags.map((tag, tagIdx) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 rounded-lg bg-stone-100/90 border border-stone-200/60 px-3 py-1.5 text-xs font-medium text-stone-700",
              children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5 text-amber-600 shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: tag })
              ]
            },
            tagIdx
          )) }) })
        ]
      },
      pillar.id
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
        className: "mt-10 sm:mt-12 max-w-6xl mx-auto rounded-2xl sm:rounded-3xl border border-amber-200/90 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/60 p-6 sm:p-7 text-stone-800 shadow-2xs",
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-base sm:text-lg font-bold text-stone-900", children: t("pages.csr.pillars.assurance_title") || "Tumbuh Bersama Masyarakat Adat Papua" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-4xl", children: t("pages.csr.pillars.assurance_desc") || "Seluruh kegiatan sosial dan operasional tambang dijalankan melalui musyawarah adat yang terbuka, taat aturan lingkungan hidup, dan mengutamakan hubungan baik yang saling menghormati." })
          ] })
        ] })
      }
    )
  ] }) });
}
const toImage = (path) => imageUrl(path);
const toImages = (paths) => paths.map(toImage);
function VideoSection({ t, videoHeroBg }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: "relative bg-cover bg-fixed bg-center py-16 sm:py-20",
      style: { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${videoHeroBg}')` },
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "mb-8 text-center sm:mb-12",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.2 },
            transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  className: "mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl md:text-4xl",
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
                  children: t("pages.csr.video_section.title")
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  className: "mx-auto max-w-2xl text-sm text-gray-300 sm:text-base",
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
                  children: t("pages.csr.video_section.description")
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-xl bg-black shadow-2xl sm:rounded-2xl", children: /* @__PURE__ */ jsx("div", { className: "relative aspect-video", children: isPlaying ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://www.youtube.com/embed/Lq_nOhXVt4g?autoplay=1",
            title: t("pages.csr.video_section.video_title"),
            className: "h-full w-full",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true
          }
        ) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://img.youtube.com/vi/Lq_nOhXVt4g/maxresdefault.jpg",
              alt: t("pages.csr.video_section.thumbnail_alt"),
              className: "h-full w-full object-cover"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPlaying(true),
              className: "flex h-14 w-14 transform items-center justify-center rounded-full bg-amber-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-amber-600 sm:h-16 sm:w-16 lg:h-20 lg:w-20",
              children: /* @__PURE__ */ jsx("svg", { className: "ml-1 h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) })
            }
          ) })
        ] }) }) })
      ] })
    }
  );
}
function CSRNewsSection({ t }) {
  const csrNews = [
    {
      id: "jul26-1",
      title: t("pages.csr.news.jul26_1.title"),
      excerpt: t("pages.csr.news.jul26_1.excerpt"),
      date: "8 Jul 2026",
      image: "/july26-arasvara-nifasi.webp",
      category: t("pages.csr.categories.community_support")
    },
    {
      id: "feb26-1",
      title: t("pages.csr.news.feb26_1.title"),
      excerpt: t("pages.csr.news.feb26_1.excerpt"),
      date: "10 Feb 2026",
      image: "/february-news-01.jpg",
      category: t("pages.csr.categories.community_support")
    },
    {
      id: "feb26-2",
      title: t("pages.csr.news.feb26_2.title"),
      excerpt: t("pages.csr.news.feb26_2.excerpt"),
      date: "4 Feb 2026",
      image: "/News-february-2.jpg",
      category: t("pages.csr.categories.community_support")
    },
    {
      id: "feb26-3",
      title: t("pages.csr.news.feb26_3.title"),
      excerpt: t("pages.csr.news.feb26_3.excerpt"),
      date: "22 Feb 2026",
      image: "/news-3-february.jpg",
      category: t("pages.csr.categories.community_support")
    },
    {
      id: "feb26-4",
      title: t("pages.csr.news.feb26_4.title"),
      excerpt: t("pages.csr.news.feb26_4.excerpt"),
      date: "24 Feb 2026",
      image: "/news-4-february.jpg",
      category: t("pages.csr.categories.community_support")
    },
    {
      id: "mar26-1",
      title: t("pages.csr.news.mar26_1.title"),
      excerpt: t("pages.csr.news.mar26_1.excerpt"),
      date: "6 Mar 2026",
      image: "/maret-news-1.jpeg",
      category: t("pages.csr.categories.community_support")
    },
    {
      id: "apr26-1",
      title: t("pages.csr.news.apr26_1.title"),
      excerpt: t("pages.csr.news.apr26_1.excerpt"),
      date: "11 Apr 2026",
      image: "/kristalin-news-april-1.jpeg",
      category: t("pages.csr.categories.community_support")
    },
    {
      id: "feb-7",
      title: t("pages.csr.news.feb_7.title"),
      excerpt: t("pages.csr.news.feb_7.excerpt"),
      date: "4 Feb 2025",
      image: "/506paket1.jpg",
      category: t("pages.csr.categories.food_distribution")
    },
    {
      id: "jun-1",
      title: t("pages.csr.news.jun_1.title"),
      excerpt: t("pages.csr.news.jun_1.excerpt"),
      date: "26 Jun 2025",
      image: "/pendanaan1.jpg",
      category: t("pages.csr.categories.education_support")
    },
    {
      id: "jul-1",
      title: t("pages.csr.news.jul_1.title"),
      excerpt: t("pages.csr.news.jul_1.excerpt"),
      date: "8 Jul 2025",
      image: "/pembagian3.jpg",
      category: t("pages.csr.categories.food_distribution")
    },
    {
      id: "aug-4",
      title: t("pages.csr.news.aug_4.title"),
      excerpt: t("pages.csr.news.aug_4.excerpt"),
      date: "20 Aug 2025",
      image: "/agus1.jpg",
      category: t("pages.csr.categories.food_distribution")
    },
    {
      id: "mar-1",
      title: t("pages.csr.news.mar_1.title"),
      excerpt: t("pages.csr.news.mar_1.excerpt"),
      date: "19 Mar 2025",
      image: "/buruharian1.jpg",
      category: t("pages.csr.categories.house_construction")
    },
    {
      id: "aug-2",
      title: t("pages.csr.news.aug_2.title"),
      excerpt: t("pages.csr.news.aug_2.excerpt"),
      date: "19 Aug 2025",
      image: "/agus2.jpg",
      category: t("pages.csr.categories.house_construction")
    }
  ].map((item) => ({ ...item, image: imageUrl(item.image) }));
  return /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-r from-gray-50 to-slate-50 py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mb-12 text-center",
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              className: "mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent", children: t("pages.csr.news.title_line1") }),
                /* @__PURE__ */ jsxs("span", { className: "text-black", children: [
                  " ",
                  t("pages.csr.news.title_line2")
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
              children: t("pages.csr.news.description")
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: csrNews.map((news, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay: 0.1 * index, ease: "easeOut" },
        children: /* @__PURE__ */ jsxs(Link, { href: `/news/${news.id}`, className: "block", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: news.image,
                alt: news.title,
                className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
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
                    }
                  } catch {
                  }
                }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsx("span", { className: "rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white", children: news.category }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs text-gray-500", children: news.date }),
            /* @__PURE__ */ jsx("h3", { className: "mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-600", children: news.title }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 line-clamp-3 text-sm text-gray-600", children: news.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: t("pages.csr.read_more") }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-amber-600 transition-colors group-hover:text-amber-700", children: [
                /* @__PURE__ */ jsx("svg", { className: "mr-1 h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: t("pages.csr.read_full") })
              ] })
            ] })
          ] })
        ] })
      },
      news.id
    )) })
  ] }) });
}
function TestimonialsCarousel({
  testimonials,
  t
}) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5e3);
    return () => clearInterval(timer);
  }, [testimonials.length]);
  return /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-r from-amber-50 to-yellow-50 py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mb-8 text-center sm:mb-12",
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              className: "mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent", children: t("pages.csr.testimonials.title_line1") }),
                /* @__PURE__ */ jsxs("span", { className: "text-black", children: [
                  " ",
                  t("pages.csr.testimonials.title_line2")
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "text-sm text-gray-600 sm:text-base",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
              children: t("pages.csr.testimonials.description")
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border-l-4 border-amber-400 bg-white p-6 shadow-xl sm:rounded-2xl sm:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center sm:mb-6", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: testimonials[currentTestimonial].photo,
              alt: testimonials[currentTestimonial].name,
              className: "mr-3 h-12 w-12 rounded-full border-4 border-amber-200 object-cover sm:mr-4 sm:h-16 sm:w-16"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-800 sm:text-base", children: testimonials[currentTestimonial].name }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-amber-600 sm:text-sm", children: testimonials[currentTestimonial].role })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("blockquote", { className: "text-base leading-relaxed text-gray-700 italic sm:text-lg", children: [
          '"',
          testimonials[currentTestimonial].quote,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center gap-2 sm:mt-6", children: testimonials.map((_, idx) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentTestimonial(idx),
          className: `h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${idx === currentTestimonial ? "w-6 bg-amber-500 sm:w-8" : "bg-gray-300"}`
        },
        idx
      )) })
    ] })
  ] }) });
}
function GalleryShowcaseCarousel({
  sections,
  t
}) {
  const [current, setCurrent] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const next = () => setCurrent((c) => (c + 1) % sections.length);
  const prev = () => setCurrent((c) => (c - 1 + sections.length) % sections.length);
  useEffect(() => {
    setImgIdx(0);
  }, [current]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setImgIdx((i) => i === sections[current].images.length - 1 ? 0 : i + 1);
    }, 3e3);
    return () => clearTimeout(timer);
  }, [imgIdx, current, sections]);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    if (lightboxOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [lightboxOpen]);
  return /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 sm:gap-12 md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col items-center justify-center text-center md:items-start md:text-left", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-xs font-semibold tracking-wider text-transparent uppercase sm:mb-3 sm:text-sm", children: t("pages.csr.csr_activity_label") }),
        /* @__PURE__ */ jsx("h2", { className: "mb-3 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-xl leading-tight font-bold text-transparent sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl", children: sections[current].title }),
        /* @__PURE__ */ jsx("p", { className: "max-w-xl text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg lg:text-xl", children: sections[current].description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex-1", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setLightboxOpen(true),
          className: "relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-64 sm:rounded-2xl md:h-72 lg:h-80 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
          "aria-label": sections[current].title,
          children: /* @__PURE__ */ jsx(
            motion.img,
            {
              src: sections[current].images[imgIdx],
              alt: sections[current].title + " " + (imgIdx + 1),
              className: "h-full w-full object-cover",
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5 }
            },
            sections[current].images[imgIdx]
          )
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: lightboxOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto relative max-h-[90vh] max-w-4xl", onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setLightboxOpen(false),
                className: "absolute -top-2 -right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:bg-red-50 hover:text-red-600 sm:-top-3 sm:-right-3 sm:h-12 sm:w-12",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M18 6L6 18M6 6l12 12" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: sections[current].images[imgIdx],
                alt: sections[current].title + " " + (imgIdx + 1),
                className: "max-h-[90vh] w-full rounded-lg object-contain shadow-2xl"
              }
            )
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3 sm:mt-10 sm:gap-6", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: prev,
          className: "flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white/80 shadow transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 sm:h-12 sm:w-12",
          "aria-label": "Previous Section",
          type: "button",
          children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M15 19l-7-7 7-7", stroke: "#d97706", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 sm:gap-3", children: sections.map((_, idx) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrent(idx),
          className: `h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 md:h-4 md:w-4 ${idx === current ? "w-4 bg-gradient-to-r from-amber-500 to-yellow-600 sm:w-6 md:w-8" : "bg-gray-300 hover:bg-amber-300"}`,
          "aria-label": `Go to section ${idx + 1}`
        },
        idx
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: next,
          className: "flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white/80 shadow transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 sm:h-12 sm:w-12",
          "aria-label": "Next Section",
          type: "button",
          children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 5l7 7-7 7", stroke: "#d97706", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      )
    ] })
  ] });
}
function CSRPageMobileFix() {
  const { t } = useTranslation();
  const { imageTier } = useNetworkProfile();
  const videoHeroBg = papuaBackgroundForTier(imageTier);
  const [scrollY, setScrollY] = useState(0);
  const commitmentRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLearnMore = () => {
    var _a;
    (_a = commitmentRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  const translatedGallerySections = [
    {
      title: t("pages.csr.gallery_sections.0.title"),
      description: t("pages.csr.gallery_sections.0.description"),
      images: [
        "/pembangunan1.jpg",
        "/506paket2.jpeg",
        "/506paket3.jpg",
        "/pendanaan1.jpg",
        "/pembagian3.jpg",
        "/pemberitahuan1.jpg",
        "/agus1.jpg",
        "/agus2.jpg",
        "/agus3.jpg",
        "/buruharian1.jpg",
        "/506paket1.jpg",
        "/pembangunan3.jpg"
      ]
    },
    {
      title: t("pages.csr.gallery_sections.1.title"),
      description: t("pages.csr.gallery_sections.1.description"),
      images: [
        "/pendanaan1.jpg",
        "/506paket1.jpg",
        "/pembagian3.jpg",
        "/agus1.jpg",
        "/buruharian1.jpg",
        "/pembangunan1.jpg",
        "/pembangunan3.jpg",
        "/pembangunan5.jpg",
        "/pembangunan6.jpg",
        "/agus2.jpg",
        "/agus3.jpg",
        "/agus6.jpg"
      ]
    },
    {
      title: t("pages.csr.gallery_sections.2.title"),
      description: t("pages.csr.gallery_sections.2.description"),
      images: ["/506paket1.jpg", "/506paket2.jpeg", "/506paket3.jpg"]
    },
    {
      title: t("pages.csr.gallery_sections.3.title"),
      description: t("pages.csr.gallery_sections.3.description"),
      images: ["/pendanaan1.jpg"]
    },
    {
      title: t("pages.csr.gallery_sections.4.title"),
      description: t("pages.csr.gallery_sections.4.description"),
      images: ["/pembagian3.jpg", "/pemberitahuan1.jpg"]
    },
    {
      title: t("pages.csr.gallery_sections.5.title"),
      description: t("pages.csr.gallery_sections.5.description"),
      images: ["/agus1.jpg", "/agus2.jpg", "/agus3.jpg", "/agus6.jpg", "/agus7.jpg", "/agus8.jpg"]
    },
    {
      title: t("pages.csr.gallery_sections.6.title"),
      description: t("pages.csr.gallery_sections.6.description"),
      images: [
        "/buruharian1.jpg",
        "/pembangunan1.jpg",
        "/pembangunan3.jpg",
        "/pembangunan5.jpg",
        "/pembangunan6.jpg",
        "/pembangunandesanifasi2.jpg"
      ]
    },
    {
      title: t("pages.csr.gallery_sections.7.title"),
      description: t("pages.csr.gallery_sections.7.description"),
      images: ["/506paket1.jpg", "/506paket2.jpeg", "/506paket3.jpg"]
    },
    {
      title: t("pages.csr.gallery_sections.8.title"),
      description: t("pages.csr.gallery_sections.8.description"),
      images: ["/pendanaan1.jpg"]
    },
    {
      title: t("pages.csr.gallery_sections.9.title"),
      description: t("pages.csr.gallery_sections.9.description"),
      images: ["/pembagian3.jpg", "/pemberitahuan1.jpg"]
    },
    {
      title: t("pages.csr.gallery_sections.10.title"),
      description: t("pages.csr.gallery_sections.10.description"),
      images: ["/agus1.jpg", "/agus2.jpg", "/agus3.jpg", "/agus6.jpg", "/agus7.jpg", "/agus8.jpg"]
    }
  ].map((section) => ({ ...section, images: toImages(section.images) }));
  const translatedTestimonials = [
    {
      name: t("pages.csr.testimonials.data.0.name"),
      role: t("pages.csr.testimonials.data.0.role"),
      photo: "/prfl.png",
      quote: t("pages.csr.testimonials.data.0.quote")
    },
    {
      name: t("pages.csr.testimonials.data.1.name"),
      role: t("pages.csr.testimonials.data.1.role"),
      photo: "/prfl.png",
      quote: t("pages.csr.testimonials.data.1.quote")
    },
    {
      name: t("pages.csr.testimonials.data.2.name"),
      role: t("pages.csr.testimonials.data.2.role"),
      photo: "/prfl.png",
      quote: t("pages.csr.testimonials.data.2.quote")
    }
  ].map((testimonial) => ({ ...testimonial, photo: toImage(testimonial.photo) }));
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsxs(Head, { title: "Corporate Social Responsibility (CSR) | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Program Tanggung Jawab Sosial dan Lingkungan (CSR) PT Kristalin Ekalestari: Pembangunan rumah warga adat Nifasi & Meyah, beasiswa pendidikan, penyaluran pangan sembako, dan fasilitas kesehatan masyarakat di Nabire, Papua." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Corporate Social Responsibility (CSR) - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Komitmen pemberdayaan masyarakat adat, konservasi alam, dan program sosial berkelanjutan PT Kristalin Ekalestari di Nabire, Papua." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: true }),
    /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-screen flex-col items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute inset-0 h-full w-full",
          style: {
            transform: `translateY(${scrollY * 0.5}px)`
          },
          children: [
            /* @__PURE__ */ jsx(
              PapuaChildrenHeroPicture,
              {
                pictureClassName: "block h-full w-full",
                className: "h-full w-full object-cover",
                alt: t("pages.csr.hero.alt_text"),
                sizes: "100vw",
                loading: "eager",
                fetchPriority: "high"
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
          transition: { duration: 1, ease: "easeOut" },
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "transform transition-all duration-1000 ease-out",
              style: {
                transform: `translateY(${scrollY * 0.2}px)`,
                opacity: Math.max(0, 1 - scrollY / 600)
              },
              initial: { opacity: 0, y: 80 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1.2, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    className: "mb-6 text-3xl leading-tight font-bold sm:mb-8 sm:text-4xl md:text-5xl lg:text-7xl",
                    initial: { opacity: 0, y: 50, scale: 0.9 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.8, delay: 0.6, ease: "easeOut" },
                    children: [
                      /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent",
                          initial: { opacity: 0, y: 30 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.8, delay: 0.8, ease: "easeOut" },
                          children: t("pages.csr.hero.title_line1")
                        }
                      ),
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "text-white",
                          initial: { opacity: 0, y: 30 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.8, delay: 1, ease: "easeOut" },
                          children: t("pages.csr.hero.title_line2")
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
                    transition: { duration: 0.8, delay: 1.2, ease: "easeOut" },
                    children: t("pages.csr.hero.description")
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6",
                    initial: { opacity: 0, y: 30, scale: 0.8 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.8, delay: 1.4, ease: "easeOut" },
                    children: /* @__PURE__ */ jsxs(
                      motion.button,
                      {
                        onClick: handleLearnMore,
                        className: "group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-lg",
                        whileHover: {
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
                        },
                        whileTap: { scale: 0.95 },
                        children: [
                          /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2 sm:gap-3", children: [
                            t("pages.csr.hero.learn_more_btn"),
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
          transition: { duration: 0.6, delay: 1.8, ease: "easeOut" },
          children: /* @__PURE__ */ jsx("div", { className: "flex h-8 w-5 justify-center rounded-full border-2 border-white/60 sm:h-10 sm:w-6", children: /* @__PURE__ */ jsx("div", { className: "mt-1 h-2 w-1 animate-bounce rounded-full bg-white sm:mt-2 sm:h-3" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("section", { ref: commitmentRef, className: "mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "flex flex-col items-center",
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "mb-4 h-1 w-12 rounded-full bg-amber-400 sm:mb-6 sm:w-16",
              initial: { opacity: 0, scaleX: 0 },
              whileInView: { opacity: 1, scaleX: 1 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h2,
            {
              className: "mb-4 text-2xl leading-tight font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-6xl",
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.7, delay: 0.5, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent",
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.2 },
                    transition: { duration: 0.6, delay: 0.7, ease: "easeOut" },
                    children: t("pages.csr.commitment.title_line1")
                  }
                ),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "text-gray-800",
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.2 },
                    transition: { duration: 0.6, delay: 0.9, ease: "easeOut" },
                    children: t("pages.csr.commitment.title_line2")
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "mx-auto max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg lg:text-xl",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.7, delay: 1.1, ease: "easeOut" },
              children: t("pages.csr.commitment.description")
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(CsrSustainabilityPillars, {}),
    /* @__PURE__ */ jsxs("main", { className: "bg-white py-16 sm:py-20", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "mb-12 flex flex-col items-center px-4 text-center sm:mb-16 sm:px-6",
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "mb-4 h-1 w-12 rounded-full bg-amber-400 sm:mb-6 sm:w-16",
                initial: { opacity: 0, scaleX: 0 },
                whileInView: { opacity: 1, scaleX: 1 },
                viewport: { once: true, amount: 0.2 },
                transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.h2,
              {
                className: "mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl",
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.2 },
                transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent", children: t("pages.csr.programs.title_line1") }),
                  /* @__PURE__ */ jsxs("span", { className: "text-black", children: [
                    " ",
                    t("pages.csr.programs.title_line2")
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                className: "mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg",
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.2 },
                transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
                children: t("pages.csr.programs.description")
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, delay: 0.8, ease: "easeOut" },
          children: /* @__PURE__ */ jsx(GalleryShowcaseCarousel, { sections: translatedGallerySections, t })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(VideoSection, { t, videoHeroBg }),
    /* @__PURE__ */ jsx(CSRNewsSection, { t }),
    /* @__PURE__ */ jsx(TestimonialsCarousel, { testimonials: translatedTestimonials, t }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  CSRPageMobileFix as default
};

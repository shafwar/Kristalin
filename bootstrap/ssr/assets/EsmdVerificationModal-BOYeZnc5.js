import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { Shield, X, Landmark, FileCheck, Award, CheckCircle2, ShieldCheck, MapPin, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
function EsmdVerificationModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!mounted || !isOpen) return null;
  const modalContent = /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-[999999] flex items-center justify-center bg-stone-950/60 p-4 sm:p-6 backdrop-blur-md overflow-y-auto",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxs("div", { className: "relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 text-stone-900 shadow-2xl ring-1 ring-black/5", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 active:scale-95 focus:outline-none cursor-pointer",
            "aria-label": "Close modal",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 sm:h-5 sm:w-5" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-start gap-4 border-b border-stone-100 pb-5 pt-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 shadow-sm", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6 sm:h-7 sm:w-7", strokeWidth: 2.2 }) }),
          /* @__PURE__ */ jsxs("div", { className: "pr-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 tracking-wide uppercase", children: [
                /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }),
                "Verified Clean & Clear"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-stone-500 uppercase tracking-wider", children: "MODI Minerba ESDM RI" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-stone-900 leading-tight", children: t("pages.esdm_verification.modal_title") || "Verifikasi Legalitas & Kepatuhan IUP OP" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs sm:text-sm text-stone-500 leading-relaxed", children: t("pages.esdm_verification.modal_subtitle") || "Transparansi Izin Usaha Pertambangan Resmi PT Kristalin Ekalestari" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-5 divide-y divide-stone-200/70 rounded-2xl border border-stone-200/80 bg-stone-50/70 overflow-hidden shadow-inner", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/70", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-500", children: [
                /* @__PURE__ */ jsx(Landmark, { className: "h-3.5 w-3.5 text-amber-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500", children: t("pages.esdm_verification.company_name_label") || "Nama Perusahaan" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-stone-900", children: t("pages.esdm_verification.company_name_val") || "PT Kristalin Ekalestari" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-amber-50/30", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-500", children: [
                /* @__PURE__ */ jsx(FileCheck, { className: "h-3.5 w-3.5 text-amber-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500", children: t("pages.esdm_verification.permit_type_label") || "Jenis Izin Usaha" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-amber-800", children: t("pages.esdm_verification.permit_type_val") || "IUP Operasi Produksi (IUP OP)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/70", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-500", children: [
                /* @__PURE__ */ jsx(Award, { className: "h-3.5 w-3.5 text-amber-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500", children: t("pages.esdm_verification.decree_number_label") || "Nomor Keputusan SK" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 font-mono text-sm font-bold text-stone-900", children: /* @__PURE__ */ jsx("span", { className: "rounded-md border border-amber-300/80 bg-amber-100/70 px-2 py-0.5 text-amber-900", children: t("pages.esdm_verification.decree_number_val") || "561/2021/DESDM" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-500", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5 text-emerald-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500", children: t("pages.esdm_verification.validity_label") || "Masa Berlaku Izin" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-stone-900", children: t("pages.esdm_verification.validity_val") || "2020 – 2030 (10 Tahun Operasi)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/70", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-500", children: [
                /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500", children: t("pages.esdm_verification.commodity_label") || "Komoditas Tambang" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-stone-900", children: t("pages.esdm_verification.commodity_val") || "Emas Primer (DMP) & Mineral Ikutan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-500", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-amber-600" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500", children: t("pages.esdm_verification.location_label") || "Lokasi & Luas Konsesi" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold text-stone-900", children: t("pages.esdm_verification.location_val") || "Distrik Topo, Kab. Nabire, Papua (198 Ha)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "relative z-10 mt-4 text-[11px] leading-relaxed text-stone-500", children: t("pages.esdm_verification.disclaimer") || "Seluruh data legalitas di atas dapat diverifikasi langsung melalui database publik Kementerian Energi dan Sumber Daya Mineral (ESDM) Republik Indonesia." }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "inline-flex h-11 items-center justify-center rounded-xl border border-stone-300 bg-white hover:bg-stone-50 px-5 text-xs font-semibold text-stone-700 transition-colors active:scale-95 cursor-pointer",
              children: t("pages.esdm_verification.close_btn") || "Tutup"
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://minerbaone.esdm.go.id/publik/badan-usaha/detail/611426748818660096",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-6 text-xs font-bold text-stone-950 shadow-md transition-all active:scale-95 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("span", { children: t("pages.esdm_verification.verify_portal_btn") || "Buka Portal Resmi MODI ESDM RI" }),
                /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })
              ]
            }
          )
        ] })
      ] })
    }
  );
  return createPortal(modalContent, document.body);
}
function EsmdVerificationBadge({ className = "", variant = "pill", theme = "light" }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  if (variant === "compact") {
    const isDark2 = theme === "dark";
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen(true),
          className: `group inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${isDark2 ? "border-amber-400/40 bg-white/10 hover:bg-white/15 text-amber-300 backdrop-blur-md hover:border-amber-300 shadow-sm" : "border-amber-400/50 bg-amber-50/90 hover:bg-amber-100 text-stone-900 hover:border-amber-500 shadow-sm"} ${className}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: `flex h-4 w-4 items-center justify-center rounded-full ${isDark2 ? "bg-amber-400/20 text-amber-300" : "bg-amber-500/20 text-amber-800"}`, children: /* @__PURE__ */ jsx(Shield, { className: "h-2.5 w-2.5", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: "IUP OP No. 561/2021/DESDM" }),
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(EsmdVerificationModal, { isOpen, onClose: () => setIsOpen(false) })
    ] });
  }
  if (variant === "tag") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen(true),
          className: `inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-600 transition-colors cursor-pointer ${className}`,
          children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5 text-amber-700" }),
            /* @__PURE__ */ jsx("span", { className: "underline underline-offset-2", children: "Verified MODI ESDM" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(EsmdVerificationModal, { isOpen, onClose: () => setIsOpen(false) })
    ] });
  }
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(true),
        className: `group inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${isDark ? "border-amber-400/40 bg-white/10 hover:bg-white/15 text-stone-100 backdrop-blur-md hover:border-amber-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]" : "border-amber-400/50 bg-amber-50/90 hover:bg-amber-100 text-stone-900 hover:border-amber-500 shadow-sm hover:shadow-md"} ${className}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: `flex h-5 w-5 items-center justify-center rounded-full transition-colors ${isDark ? "bg-amber-400/20 text-amber-300 group-hover:bg-amber-400 group-hover:text-stone-950" : "bg-amber-500/20 text-amber-800 group-hover:bg-amber-500 group-hover:text-white"}`, children: /* @__PURE__ */ jsx(Shield, { className: "h-3 w-3", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxs("span", { className: "tracking-wide", children: [
            t("pages.esdm_verification.badge_label") || "Kepatuhan Resmi ESDM",
            " · ",
            /* @__PURE__ */ jsx("span", { className: `font-mono font-bold ${isDark ? "text-amber-300" : "text-amber-800"}`, children: "561/2021/DESDM" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(EsmdVerificationModal, { isOpen, onClose: () => setIsOpen(false) })
  ] });
}
export {
  EsmdVerificationBadge as E
};

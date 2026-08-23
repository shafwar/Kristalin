import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { Shield, X, Landmark, FileCheck, Award, CheckCircle, MapPin, ExternalLink } from "lucide-react";
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
      className: "fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxs("div", { className: "relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/40 bg-[#0f172a] p-6 sm:p-8 text-white shadow-2xl ring-1 ring-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-[60px]" }),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-600/10 blur-[60px]" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-300 transition-all hover:bg-white/20 hover:text-white active:scale-95 focus:outline-none",
            "aria-label": "Close modal",
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 sm:h-5 sm:w-5" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-start gap-3 sm:gap-4 border-b border-white/10 pb-5 sm:pb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-400 shadow-md", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6 sm:h-7 sm:w-7", strokeWidth: 2.2 }) }),
          /* @__PURE__ */ jsxs("div", { className: "pr-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400 uppercase", children: [
                /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                "Verified Clean & Clear"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-stone-400 uppercase tracking-wider", children: "MODI ESDM RI" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-1.5 text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight", children: t("pages.esdm_verification.modal_title") || "Verifikasi Legalitas & Kepatuhan IUP OP" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-stone-300/90 leading-relaxed", children: t("pages.esdm_verification.modal_subtitle") || "Transparansi Izin Usaha Pertambangan Resmi PT Kristalin Ekalestari" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-5 sm:mt-6 grid grid-cols-1 gap-2.5 sm:gap-3.5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-400", children: [
              /* @__PURE__ */ jsx(Landmark, { className: "h-3.5 w-3.5 text-amber-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.company_name_label") || "Nama Perusahaan" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm font-bold text-white", children: t("pages.esdm_verification.company_name_val") || "PT Kristalin Ekalestari" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-400", children: [
              /* @__PURE__ */ jsx(FileCheck, { className: "h-3.5 w-3.5 text-amber-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.permit_type_label") || "Jenis Izin Usaha" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm font-bold text-amber-300", children: t("pages.esdm_verification.permit_type_val") || "IUP Operasi Produksi (IUP OP)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-400", children: [
              /* @__PURE__ */ jsx(Award, { className: "h-3.5 w-3.5 text-amber-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.decree_number_label") || "Nomor Keputusan SK" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-mono text-xs sm:text-sm font-bold text-white", children: t("pages.esdm_verification.decree_number_val") || "561/2021/DESDM" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-400", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-emerald-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.validity_label") || "Masa Berlaku Izin" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm font-bold text-white", children: t("pages.esdm_verification.validity_val") || "2020 – 2030 (10 Tahun Operasi)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-400", children: [
              /* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5 text-amber-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.commodity_label") || "Komoditas Tambang" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm font-bold text-white", children: t("pages.esdm_verification.commodity_val") || "Emas Primer (DMP) & Mineral Ikutan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-stone-400", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-amber-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.location_label") || "Lokasi & Luas Wilayah" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] sm:text-xs font-semibold text-white", children: t("pages.esdm_verification.location_val") || "Distrik Topo, Kab. Nabire, Papua (198 Ha)" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "relative z-10 mt-4 text-[10px] sm:text-[11px] leading-relaxed text-stone-400", children: t("pages.esdm_verification.disclaimer") || "Seluruh data legalitas di atas dapat diverifikasi langsung melalui database publik Kementerian Energi dan Sumber Daya Mineral (ESDM) Republik Indonesia." }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-semibold text-stone-300 transition-colors hover:bg-white/10 hover:text-white active:scale-95",
              children: t("pages.esdm_verification.close_btn") || "Tutup"
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://minerbaone.esdm.go.id/publik/badan-usaha/detail/611426748818660096",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 px-5 text-xs font-bold text-stone-950 shadow-md transition-all active:scale-95",
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
function EsmdVerificationBadge({ className = "", variant = "pill" }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  if (variant === "compact") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen(true),
          className: `group inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-stone-900/90 hover:bg-stone-800 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-sm backdrop-blur-md transition-all hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95 cursor-pointer ${className}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-amber-400", children: /* @__PURE__ */ jsx(Shield, { className: "h-2.5 w-2.5", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: "IUP OP No. 561/2021/DESDM" }),
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400" })
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
          className: `inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-500 transition-colors cursor-pointer ${className}`,
          children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx("span", { className: "underline underline-offset-2", children: "Verified MODI ESDM" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(EsmdVerificationModal, { isOpen, onClose: () => setIsOpen(false) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(true),
        className: `group inline-flex items-center gap-2.5 rounded-full border border-amber-500/40 bg-stone-950/90 hover:bg-stone-900 px-4 py-1.5 text-xs font-semibold text-stone-200 shadow-md backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:text-white hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] active:scale-95 cursor-pointer ${className}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400", children: /* @__PURE__ */ jsx(Shield, { className: "h-3 w-3", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxs("span", { className: "tracking-wide", children: [
            t("pages.esdm_verification.badge_label") || "Kepatuhan Resmi ESDM",
            " · ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-amber-300", children: "561/2021/DESDM" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(EsmdVerificationModal, { isOpen, onClose: () => setIsOpen(false) })
  ] });
}
export {
  EsmdVerificationBadge as E
};

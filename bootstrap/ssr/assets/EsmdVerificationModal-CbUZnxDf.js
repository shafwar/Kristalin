import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { Shield, X, Landmark, FileCheck, Award, CheckCircle, MapPin, ExternalLink } from "lucide-react";
import { useState } from "react";
function EsmdVerificationModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#0e1b2f] via-[#091322] to-[#050b14] p-6 text-white shadow-2xl sm:p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/15 blur-[90px]" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onClose,
        className: "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-stone-300 transition-colors hover:bg-white/20 hover:text-white active:scale-95",
        "aria-label": "Close modal",
        children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-start gap-4 border-b border-white/10 pb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]", children: /* @__PURE__ */ jsx(Shield, { className: "h-6 w-6", strokeWidth: 2.2 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-300 uppercase", children: "Verified Clean & Clear" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-1 text-xl font-extrabold text-white sm:text-2xl", children: t("pages.esdm_verification.modal_title") || "Verifikasi Legalitas & Kepatuhan IUP OP" }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-stone-400", children: t("pages.esdm_verification.modal_subtitle") || "Transparansi Izin Usaha Pertambangan Resmi PT Kristalin Ekalestari" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-stone-400", children: [
          /* @__PURE__ */ jsx(Landmark, { className: "h-3.5 w-3.5 text-amber-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.company_name_label") || "Nama Perusahaan" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-white", children: t("pages.esdm_verification.company_name_val") || "PT Kristalin Ekalestari" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-stone-400", children: [
          /* @__PURE__ */ jsx(FileCheck, { className: "h-3.5 w-3.5 text-amber-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.permit_type_label") || "Jenis Izin Usaha" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-amber-300", children: t("pages.esdm_verification.permit_type_val") || "IUP Operasi Produksi (IUP OP)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-stone-400", children: [
          /* @__PURE__ */ jsx(Award, { className: "h-3.5 w-3.5 text-amber-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.decree_number_label") || "Nomor Keputusan SK" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 font-mono text-sm font-bold text-white", children: t("pages.esdm_verification.decree_number_val") || "561/2021/DESDM" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-stone-400", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "h-3.5 w-3.5 text-emerald-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.validity_label") || "Masa Berlaku Izin" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-white", children: t("pages.esdm_verification.validity_val") || "2020 – 2030 (10 Tahun Operasi)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-stone-400", children: [
          /* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5 text-amber-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.commodity_label") || "Komoditas Tambang" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-white", children: t("pages.esdm_verification.commodity_val") || "Emas Primer (DMP) & Mineral Ikutan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-stone-400", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-amber-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider", children: t("pages.esdm_verification.location_label") || "Lokasi & Luas Wilayah" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-semibold text-white", children: t("pages.esdm_verification.location_val") || "Distrik Topo, Kab. Nabire, Papua (198 Ha)" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "relative z-10 mt-4 text-[11px] leading-relaxed text-stone-400", children: t("pages.esdm_verification.disclaimer") || "Seluruh data legalitas di atas dapat diverifikasi langsung melalui database publik Kementerian Energi dan Sumber Daya Mineral (ESDM) Republik Indonesia." }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://modi.esdm.go.id/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-5 text-xs font-bold text-stone-900 shadow-lg transition-all hover:from-amber-300 hover:to-yellow-400 active:scale-95",
          children: [
            /* @__PURE__ */ jsx("span", { children: t("pages.esdm_verification.verify_portal_btn") || "Buka Portal Resmi MODI ESDM RI" }),
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-semibold text-stone-300 transition-colors hover:bg-white/10 hover:text-white",
          children: t("pages.esdm_verification.close_btn") || "Tutup Verifikasi"
        }
      )
    ] })
  ] }) });
}
function EsmdVerificationBadge({ className = "", variant = "pill" }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  if (variant === "banner") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => setIsOpen(true),
          role: "button",
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") setIsOpen(true);
          },
          className: `group relative cursor-pointer overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#0d1c31] via-[#091524] to-[#060e18] p-4 text-white shadow-md transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] ${className}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400", children: /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5", strokeWidth: 2.2 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white group-hover:text-amber-300", children: t("pages.esdm_verification.badge_label") || "Kepatuhan Resmi ESDM" }),
                  /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-stone-400", children: t("pages.esdm_verification.badge_sub") || "IUP OP No. 561/2021/DESDM · 198 Ha Nabire, Papua" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "hidden text-xs font-semibold text-amber-400 underline underline-offset-2 sm:inline-block", children: t("pages.esdm_verification.badge_tooltip") || "Verifikasi Legalitas →" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(EsmdVerificationModal, { isOpen, onClose: () => setIsOpen(false) })
    ] });
  }
  if (variant === "compact") {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen(true),
          className: `inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-stone-900/80 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-md transition-all hover:border-amber-400 hover:bg-stone-900 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)] ${className}`,
          children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5 text-amber-400" }),
            /* @__PURE__ */ jsx("span", { children: "IUP OP No. 561/2021/DESDM" })
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
        className: `group inline-flex items-center gap-2.5 rounded-full border border-amber-500/40 bg-stone-950/80 px-4 py-1.5 text-xs font-semibold text-stone-200 shadow-md backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:bg-stone-900 hover:text-white hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95 ${className}`,
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

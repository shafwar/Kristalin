import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { Send } from "lucide-react";
import { useState } from "react";
import { L as Label, I as Input } from "./label-B_m42RSr.js";
function InquiryForm({ type, title, subtitle, hideHeader, variant = "light" }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle");
  async function handleSubmit(e) {
    var _a;
    e.preventDefault();
    setStatus("submitting");
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const interest = fd.get("interest");
    const phone = fd.get("phone");
    const originalMessage = fd.get("message");
    const form = new FormData();
    form.append("name", fd.get("name"));
    form.append("email", fd.get("email"));
    form.append("subject", `[${type} Inquiry] ${interest}`);
    form.append("message", `Nomor WA/Telepon: ${phone}
Ketertarikan: ${interest}

Pesan Tambahan:
${originalMessage}`);
    const csrfToken = (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content");
    fetch("/contact-message", {
      method: "POST",
      body: form,
      headers: {
        "X-CSRF-TOKEN": csrfToken || ""
      }
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus("error");
      }
    }).catch(() => {
      setStatus("error");
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: `mx-auto w-full max-w-3xl rounded-3xl border p-6 shadow-lg sm:p-8 transition-colors ${variant === "dark" ? "border-stone-800 bg-stone-900/60 backdrop-blur-md" : "border-gray-200 bg-white"}`, children: [
    !hideHeader && /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold tracking-tight ${variant === "dark" ? "text-white" : "text-gray-900"}`, children: title || `Tanya Program ${type}` }),
      /* @__PURE__ */ jsx("p", { className: `mt-2 ${variant === "dark" ? "text-stone-400" : "text-gray-600"}`, children: subtitle || "Isi form di bawah ini dan tim kami akan segera menghubungi Anda." })
    ] }),
    status === "success" ? /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-green-50 p-6 text-center text-green-800", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 text-green-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }),
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-green-900", children: t("pages.inquiry_form.success_title") || "Pesan Berhasil Terkirim!" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", children: t("pages.inquiry_form.success_desc") || "Terima kasih atas ketertarikan Anda. Tim kami akan merespons melalui Email atau WhatsApp." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setStatus("idle"),
          className: "mt-4 text-sm font-medium text-green-700 hover:text-green-800 underline",
          children: t("pages.inquiry_form.success_retry") || "Kirim pesan lain"
        }
      )
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "name", className: `text-sm font-medium ${variant === "dark" ? "text-stone-300" : "text-gray-700"}`, children: [
            t("pages.inquiry_form.name_label") || "Nama Lengkap",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-amber-600", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "name",
              name: "name",
              required: true,
              className: `mt-1.5 focus:ring-amber-500 transition-colors ${variant === "dark" ? "border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500 focus:border-amber-500" : "border-gray-300 bg-white text-gray-900"}`,
              placeholder: t("pages.inquiry_form.name_placeholder") || "Nama Anda"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "phone", className: `text-sm font-medium ${variant === "dark" ? "text-stone-300" : "text-gray-700"}`, children: [
            t("pages.inquiry_form.phone_label") || "Nomor WhatsApp",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-amber-600", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "tel",
              id: "phone",
              name: "phone",
              required: true,
              className: `mt-1.5 focus:ring-amber-500 transition-colors ${variant === "dark" ? "border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500 focus:border-amber-500" : "border-gray-300 bg-white text-gray-900"}`,
              placeholder: t("pages.inquiry_form.phone_placeholder") || "081234567890"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "email", className: `text-sm font-medium ${variant === "dark" ? "text-stone-300" : "text-gray-700"}`, children: [
          t("pages.inquiry_form.email_label") || "Email Utama",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-amber-600", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "email",
            id: "email",
            name: "email",
            required: true,
            className: `mt-1.5 focus:ring-amber-500 transition-colors ${variant === "dark" ? "border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500 focus:border-amber-500" : "border-gray-300 bg-white text-gray-900"}`,
            placeholder: t("pages.inquiry_form.email_placeholder") || "nama@email.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "interest", className: `text-sm font-medium ${variant === "dark" ? "text-stone-300" : "text-gray-700"}`, children: [
          t("pages.inquiry_form.interest_label") || "Tujuan / Ketertarikan",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-amber-600", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "interest",
            name: "interest",
            required: true,
            className: `mt-1.5 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${variant === "dark" ? "border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500" : "border-gray-300 bg-white text-gray-900"}`,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: t("pages.inquiry_form.interest_placeholder") || "Pilih salah satu..." }),
              type === "B2C" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("option", { value: "Program Emas 6 Bulan", children: t("pages.inquiry_form.opt_b2c_6m") || "Program Beli Emas 6 Bulan" }),
                /* @__PURE__ */ jsx("option", { value: "Program Emas 12 Bulan", children: t("pages.inquiry_form.opt_b2c_12m") || "Program Beli Emas 12 Bulan" }),
                /* @__PURE__ */ jsx("option", { value: "Program Emas 24 Bulan", children: t("pages.inquiry_form.opt_b2c_24m") || "Program Beli Emas 24 Bulan" }),
                /* @__PURE__ */ jsx("option", { value: "Pertanyaan Umum Program", children: t("pages.inquiry_form.opt_b2c_general") || "Pertanyaan Umum B2C" })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("option", { value: "Partnership & Kerjasama", children: t("pages.inquiry_form.opt_inv_partnership") || "Partnership & Kerjasama" }),
                /* @__PURE__ */ jsx("option", { value: "Institutional Investor", children: t("pages.inquiry_form.opt_inv_investor") || "Institutional Investor" }),
                /* @__PURE__ */ jsx("option", { value: "Permintaan Alat Berat (Excavator)", children: t("pages.inquiry_form.opt_inv_excavator") || "Permintaan Alat Berat (Excavator)" }),
                /* @__PURE__ */ jsx("option", { value: "Permintaan Data / Dokumen Ekstra", children: t("pages.inquiry_form.opt_inv_data") || "Permintaan Data / Dokumen Ekstra" }),
                /* @__PURE__ */ jsx("option", { value: "Lainnya", children: t("pages.inquiry_form.opt_inv_other") || "Lainnya" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: "message", className: `text-sm font-medium ${variant === "dark" ? "text-stone-300" : "text-gray-700"}`, children: [
          t("pages.inquiry_form.message_label") || "Pesan",
          " ",
          /* @__PURE__ */ jsx("span", { className: variant === "dark" ? "text-stone-500" : "text-gray-400", children: t("pages.inquiry_form.message_optional") || "(Opsional)" })
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "message",
            name: "message",
            rows: 4,
            className: `mt-1.5 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500 ${variant === "dark" ? "border-stone-700 bg-stone-950/60 text-stone-100 placeholder:text-stone-500" : "border-gray-300 bg-white text-gray-900"}`,
            placeholder: t("pages.inquiry_form.message_placeholder") || "Tuliskan pertanyaan atau kebutuhan detail Anda di sini..."
          }
        )
      ] }),
      status === "error" && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: t("pages.inquiry_form.error_msg") || "Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp." }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: status === "submitting",
          className: "inline-flex w-full sm:w-auto sm:px-8 items-center justify-center gap-2 rounded-md bg-amber-500 px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed",
          children: [
            status === "submitting" ? t("pages.inquiry_form.submitting") || "Mengirim..." : t("pages.inquiry_form.submit_btn") || "Kirim Pesan",
            !status && /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  InquiryForm as I
};

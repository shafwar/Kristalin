import { jsx, jsxs } from "react/jsx-runtime";
import { K as KristalinMapEmbed, J as JAKARTA_HEAD_OFFICE, N as NABIRE_OPERATIONS } from "./KristalinMapEmbed-yENem0OM.js";
import clsx from "clsx";
import { Building2, Mountain } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { H as Header, F as Footer } from "./Header-0QpcYAMD.js";
import { B as Button } from "./button-hAi0Fg-Q.js";
import { L as Label, I as Input } from "./label-qls5No9M.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import "react-dom";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "tailwind-merge";
import "@radix-ui/react-label";
const tabs = [
  { id: "jakarta", icon: Building2 },
  { id: "nabire", icon: Mountain }
];
function KristalinLocationTabs({ labels, variant = "dark" }) {
  const [active, setActive] = useState("jakarta");
  const isDark = variant === "dark";
  const tabLabel = (id) => id === "jakarta" ? labels.jakarta_tab : labels.nabire_tab;
  return /* @__PURE__ */ jsx("section", { className: clsx(isDark ? "bg-stone-950 py-16 md:py-20" : "bg-stone-50 py-14 md:py-16"), children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsx(
        "p",
        {
          className: clsx(
            "mb-3 text-xs font-semibold tracking-[0.2em] uppercase",
            isDark ? "text-amber-400/90" : "text-amber-700/90"
          ),
          children: labels.section_kicker
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: clsx("text-2xl font-bold md:text-3xl", isDark ? "text-white" : "text-stone-900"), children: labels.section_title })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "mb-6 flex flex-wrap justify-center gap-2",
        role: "tablist",
        "aria-label": labels.section_title,
        children: tabs.map(({ id, icon: Icon }) => {
          const selected = active === id;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": selected,
              onClick: () => setActive(id),
              className: clsx(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 motion-reduce:transition-none",
                selected ? isDark ? "bg-amber-400 text-stone-900 shadow-lg shadow-amber-400/20" : "bg-stone-900 text-white shadow-md" : isDark ? "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10" : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900"
              ),
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0", "aria-hidden": true }),
                tabLabel(id)
              ]
            },
            id
          );
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { role: "tabpanel", className: "mx-auto max-w-4xl", children: active === "jakarta" ? /* @__PURE__ */ jsx(
      KristalinMapEmbed,
      {
        location: JAKARTA_HEAD_OFFICE,
        title: labels.jakarta_title,
        subtitle: labels.jakarta_subtitle,
        address: labels.jakarta_address,
        openMapsLabel: labels.open_maps,
        tone: "dark"
      }
    ) : /* @__PURE__ */ jsx(
      KristalinMapEmbed,
      {
        location: NABIRE_OPERATIONS,
        title: labels.nabire_title,
        subtitle: labels.nabire_subtitle,
        address: labels.nabire_address,
        note: labels.nabire_note,
        openMapsLabel: labels.open_maps,
        tone: "dark"
      }
    ) })
  ] }) });
}
const contact = {
  phone: "(021) 22978900",
  email: "info@kristalin.co.id",
  location: "ESQ Leadership Centre - 165 Tower",
  address: "Menara 165 Lantai 21 A~C, Jl. TB Simatupang No.Kav 1, RT.3/RW.3, Cilandak Tim., Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12560"
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};
function ContactPage() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry: "",
    attachment: null
  });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    var _a;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const subject = (_a = params.get("subject")) == null ? void 0 : _a.toLowerCase();
    const grams = params.get("grams");
    const est = params.get("est");
    const formattedEst = est ? parseInt(est).toLocaleString("id-ID") : "";
    if (subject === "b2c" || subject === "gold") {
      const defaultMsg = grams ? `Permintaan Kuotasi Pembelian Emas Fisik 24K:
- Gramatur: ${grams} Gram
${formattedEst ? `- Estimasi Nilai: Rp ${formattedEst}
` : ""}
Mohon informasi prosedur pemesanan resmi dan konfirmasi nomor seri segel assay.` : "";
      setFormData((prev) => ({
        ...prev,
        subject: "B2C",
        inquiry: defaultMsg || prev.inquiry
      }));
      setTimeout(() => {
        var _a2;
        (_a2 = document.getElementById("contact-form")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } else if (subject === "partnership" || subject === "investor" || subject === "investment") {
      setFormData((prev) => ({
        ...prev,
        subject: "Partnership",
        inquiry: prev.inquiry || "Permintaan diskusi peluang kemitraan strategis / investasi institusional bersama PT Kristalin Ekalestari."
      }));
      setTimeout(() => {
        var _a2;
        (_a2 = document.getElementById("contact-form")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } else if (subject === "csr") {
      setFormData((prev) => ({ ...prev, subject: "CSR" }));
    } else if (subject === "career") {
      setFormData((prev) => ({ ...prev, subject: "Career" }));
    }
  }, []);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("pages.contact.form.validation.name_required");
    if (!formData.email.trim()) newErrors.email = t("pages.contact.form.validation.email_required");
    else if (!emailRegex.test(formData.email)) newErrors.email = t("pages.contact.form.validation.email_valid");
    if (!formData.subject) newErrors.subject = t("pages.contact.form.validation.subject_required");
    if (!formData.inquiry.trim()) newErrors.inquiry = t("pages.contact.form.validation.inquiry_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleFileChange = (file) => {
    setFileError("");
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ];
      if (!allowedTypes.includes(file.type)) {
        setFileError(t("pages.contact.form.validation.file_type_error"));
        setFileName("");
        setFormData((prev) => ({ ...prev, attachment: null }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setFileError(t("pages.contact.form.validation.file_size_error"));
        setFileName("");
        setFormData((prev) => ({ ...prev, attachment: null }));
        return;
      }
      setFileName(file.name);
      setFormData((prev) => ({ ...prev, attachment: file }));
    } else {
      setFileName("");
      setFormData((prev) => ({ ...prev, attachment: null }));
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };
  const handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setAlert(null);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.inquiry);
    if (formData.attachment) form.append("file", formData.attachment);
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
        setAlert({ type: "success", message: t("pages.contact.form.messages.success") });
        setFormData({ name: "", email: "", phone: "", subject: "", inquiry: "", attachment: null });
        setFileName("");
        setFileError("");
        setErrors({});
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setAlert({ type: "error", message: data.error || t("pages.contact.form.messages.error") });
      }
      setLoading(false);
    }).catch(() => {
      setAlert({ type: "error", message: t("pages.contact.form.messages.error") });
      setLoading(false);
    });
  };
  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", subject: "", inquiry: "", attachment: null });
    setFileName("");
    setFileError("");
    setErrors({});
    setAlert(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsxs(Head, { title: "Contact Us | PT Kristalin Ekalestari", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Hubungi kantor pusat PT Kristalin Ekalestari di Menara 165 Jakarta Selatan atau kantor operasional tambang di Nabire, Papua. Layanan komunikasi korporat dan kemitraan resmi." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Contact Us - PT Kristalin Ekalestari" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Hubungi kantor pusat PT Kristalin Ekalestari di Menara 165 Jakarta Selatan atau kantor operasional tambang di Nabire, Papua." })
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
    /* @__PURE__ */ jsx("div", { className: "z-10 flex flex-1 flex-col pt-20", children: /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen w-full max-w-none flex-1 flex-col lg:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex w-full flex-col justify-start bg-white px-6 py-2 md:px-12 md:py-4 lg:flex-1", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: "easeOut" },
            className: "mb-2 text-left",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-2 h-1 w-20 bg-gradient-to-r from-amber-400 to-yellow-500" }),
              /* @__PURE__ */ jsxs("h1", { className: "mb-1 text-4xl font-bold md:text-5xl", children: [
                /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent", children: t("pages.contact.hero.title_line1") }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: t("pages.contact.hero.title_line2") })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
            className: "mt-0 mb-1 text-left font-medium text-black/90",
            children: t("pages.contact.hero.description")
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.form,
          {
            id: "contact-form",
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: "easeOut" },
            className: "z-10 mb-4 w-full max-w-none rounded-2xl bg-white p-3 shadow-2xl md:p-5 scroll-mt-28",
            onSubmit: handleSubmit,
            autoComplete: "off",
            noValidate: true,
            style: { minWidth: "100%", boxSizing: "border-box" },
            children: [
              /* @__PURE__ */ jsx(AnimatePresence, { children: alert && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  className: `mb-4 w-full max-w-full rounded-lg px-3 py-2 text-center text-sm font-semibold shadow transition-all duration-300 ${alert.type === "success" ? "border border-green-300 bg-green-100 text-green-700" : "border border-red-300 bg-red-100 text-red-700"}`,
                  style: { wordWrap: "break-word", boxSizing: "border-box" },
                  role: "alert",
                  children: alert.message
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-1 gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "name", className: "text-base font-semibold text-gray-900", children: [
                    t("pages.contact.form.labels.full_name"),
                    " ",
                    t("pages.contact.form.labels.required")
                  ] }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "name",
                      name: "name",
                      type: "text",
                      required: true,
                      placeholder: t("pages.contact.form.placeholders.name"),
                      className: `mt-2 w-full bg-white text-gray-900 placeholder:text-gray-500 ${errors.name ? "border-red-400" : ""}`,
                      value: formData.name,
                      onChange: handleInputChange,
                      "aria-invalid": !!errors.name,
                      "aria-describedby": "name-error",
                      style: { boxSizing: "border-box" }
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsx("div", { id: "name-error", className: "mt-1 text-xs text-red-500", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                  /* @__PURE__ */ jsxs(Label, { htmlFor: "email", className: "text-base font-semibold text-gray-900", children: [
                    t("pages.contact.form.labels.email"),
                    " ",
                    t("pages.contact.form.labels.required")
                  ] }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "email",
                      name: "email",
                      type: "email",
                      required: true,
                      placeholder: t("pages.contact.form.placeholders.email"),
                      className: `mt-2 w-full bg-white text-gray-900 placeholder:text-gray-500 ${errors.email ? "border-red-400" : ""}`,
                      value: formData.email,
                      onChange: handleInputChange,
                      "aria-invalid": !!errors.email,
                      "aria-describedby": "email-error",
                      style: { boxSizing: "border-box" }
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsx("div", { id: "email-error", className: "mt-1 text-xs text-red-500", children: errors.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 w-full", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "phone", className: "text-base font-semibold text-gray-900", children: t("pages.contact.form.labels.phone") }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "phone",
                    name: "phone",
                    type: "tel",
                    placeholder: t("pages.contact.form.placeholders.phone"),
                    className: "mt-2 w-full bg-white text-gray-900 placeholder:text-gray-500",
                    value: formData.phone,
                    onChange: handleInputChange,
                    style: { boxSizing: "border-box" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 w-full", children: [
                /* @__PURE__ */ jsxs(Label, { htmlFor: "subject", className: "text-base font-semibold text-gray-900", children: [
                  t("pages.contact.form.labels.subject"),
                  " ",
                  t("pages.contact.form.labels.required")
                ] }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "subject",
                    name: "subject",
                    required: true,
                    className: `mt-2 w-full rounded-md border bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300 ${errors.subject ? "border-red-400" : "border-gray-300"}`,
                    value: formData.subject,
                    onChange: handleInputChange,
                    "aria-invalid": !!errors.subject,
                    "aria-describedby": "subject-error",
                    style: { boxSizing: "border-box" },
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: t("pages.contact.form.subject_options.select") }),
                      /* @__PURE__ */ jsx("option", { value: "General", children: t("pages.contact.form.subject_options.general") }),
                      /* @__PURE__ */ jsx("option", { value: "B2C", children: t("pages.contact.form.subject_options.b2c") }),
                      /* @__PURE__ */ jsx("option", { value: "Partnership", children: t("pages.contact.form.subject_options.partnership") }),
                      /* @__PURE__ */ jsx("option", { value: "CSR", children: t("pages.contact.form.subject_options.csr") }),
                      /* @__PURE__ */ jsx("option", { value: "Career", children: t("pages.contact.form.subject_options.career") })
                    ]
                  }
                ),
                errors.subject && /* @__PURE__ */ jsx("div", { id: "subject-error", className: "mt-1 text-xs text-red-500", children: errors.subject })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 w-full", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "attachment", className: "text-base font-semibold text-gray-900", children: t("pages.contact.form.labels.attachment") }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `mt-2 flex w-full max-w-full cursor-pointer items-center gap-3 rounded-md border-2 p-4 transition-all duration-200 hover:border-amber-300 hover:bg-gray-50 ${dragActive ? "border-amber-400 bg-amber-50" : "border-dashed border-gray-300"}`,
                    onDragEnter: handleDrag,
                    onDragLeave: handleDrag,
                    onDragOver: handleDrag,
                    onDrop: handleDrop,
                    onClick: () => {
                      var _a;
                      return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                    },
                    tabIndex: 0,
                    role: "button",
                    "aria-label": t("pages.contact.form.file_upload.upload_label"),
                    style: { boxSizing: "border-box" },
                    children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          ref: fileInputRef,
                          id: "attachment",
                          name: "attachment",
                          type: "file",
                          accept: ".pdf,.jpg,.jpeg,.png,.ppt,.pptx",
                          className: "hidden",
                          onChange: (e) => {
                            var _a;
                            return handleFileChange(((_a = e.target.files) == null ? void 0 : _a[0]) || null);
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: fileName ? /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      ) }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        }
                      ) }) }),
                      /* @__PURE__ */ jsx("div", { className: "flex-1", children: fileName ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-green-600", children: fileName }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            className: "ml-2 text-xs text-red-500 hover:text-red-700 hover:underline",
                            onClick: (e) => {
                              e.stopPropagation();
                              handleFileChange(null);
                            },
                            "aria-label": t("pages.contact.form.file_upload.remove"),
                            children: t("pages.contact.form.file_upload.remove")
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-600", children: t("pages.contact.form.file_upload.drag_text") }),
                        /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-500", children: t("pages.contact.form.file_upload.file_types") })
                      ] }) })
                    ]
                  }
                ),
                fileError && /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-red-500", children: fileError })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
                /* @__PURE__ */ jsxs(Label, { htmlFor: "inquiry", className: "text-base font-semibold text-gray-900", children: [
                  t("pages.contact.form.labels.inquiry"),
                  " ",
                  t("pages.contact.form.labels.required")
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "inquiry",
                    name: "inquiry",
                    required: true,
                    placeholder: t("pages.contact.form.placeholders.inquiry"),
                    rows: 4,
                    className: `mt-2 w-full rounded-md border bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-300 ${errors.inquiry ? "border-red-400" : "border-gray-300"}`,
                    value: formData.inquiry,
                    onChange: handleInputChange,
                    "aria-invalid": !!errors.inquiry,
                    "aria-describedby": "inquiry-error"
                  }
                ),
                errors.inquiry && /* @__PURE__ */ jsx("div", { id: "inquiry-error", className: "mt-1 text-xs text-red-500", children: errors.inquiry })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center", children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", id: "captcha", required: true, className: "mr-2" }),
                /* @__PURE__ */ jsx("label", { htmlFor: "captcha", className: "text-sm font-medium text-gray-900", children: t("pages.contact.form.labels.captcha") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col justify-end gap-4 md:flex-row", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "submit",
                    className: "h-12 w-full rounded-md bg-yellow-400 px-10 text-base font-bold text-black shadow transition-all duration-200 hover:bg-yellow-500 md:w-auto",
                    disabled: loading,
                    children: loading ? /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: t("pages.contact.form.buttons.submitting") }) : t("pages.contact.form.buttons.submit")
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    className: "h-12 w-full rounded-md bg-gray-200 px-10 text-base font-bold text-black shadow transition-all duration-200 hover:bg-gray-300 md:w-auto",
                    onClick: handleReset,
                    disabled: loading,
                    children: t("pages.contact.form.buttons.reset")
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "mt-6 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-4 text-center",
            children: [
              /* @__PURE__ */ jsx("p", { className: "mb-2 text-base font-medium text-gray-700", children: t("pages.internal_feedback.contact_page_intro") }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/internal-feedback",
                  className: "inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-base font-semibold text-gray-900 shadow-sm transition-colors hover:bg-amber-600",
                  children: [
                    t("pages.internal_feedback.page_title"),
                    /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-10 h-64 w-full flex-shrink-0 overflow-hidden bg-black lg:h-auto lg:w-[500px] lg:min-w-[500px]", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute inset-0 h-full w-full",
          style: { transform: `translateY(${scrollY * 0.5}px)`, willChange: "transform" },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl("menara165-sore.webp"),
                alt: t("pages.contact.image_alt"),
                className: "h-full w-full object-cover object-center"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(motion.section, { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 }, className: "bg-black py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxs(motion.div, { variants: fadeInUp, transition: { duration: 0.4, ease: "easeInOut" }, className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-sm font-semibold tracking-[0.25em] text-gray-400", children: t("pages.contact.contact_info.header") }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-12 h-0.5 w-20 bg-yellow-600" }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-normal text-white md:text-5xl lg:text-6xl", children: t("pages.contact.contact_info.title") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.1, duration: 0.4, ease: "easeInOut" },
            whileHover: { scale: 1.05 },
            className: "rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.5, rotate: -180 },
                  whileInView: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.7,
                      ease: "easeInOut",
                      rotate: { duration: 0.7 }
                    }
                  },
                  viewport: { once: true },
                  whileHover: {
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.4 }
                  },
                  className: "mb-4 flex justify-center",
                  children: /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-black", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" }) }) })
                }
              ),
              /* @__PURE__ */ jsx("h4", { className: "mb-4 text-2xl font-normal text-white", children: t("pages.contact.contact_info.phone") }),
              /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-300", children: contact.phone })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" },
            whileHover: { scale: 1.05 },
            className: "rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.5, rotate: -180 },
                  whileInView: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.7,
                      ease: "easeInOut",
                      rotate: { duration: 0.7 }
                    }
                  },
                  viewport: { once: true },
                  whileHover: {
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.4 }
                  },
                  className: "mb-4 flex justify-center",
                  children: /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-black", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" }) }) })
                }
              ),
              /* @__PURE__ */ jsx("h4", { className: "mb-4 text-2xl font-normal text-white", children: t("pages.contact.contact_info.email") }),
              /* @__PURE__ */ jsx("a", { href: `mailto:${contact.email}`, className: "text-lg text-yellow-500 transition-colors hover:text-yellow-400", children: contact.email })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
            whileHover: { scale: 1.05 },
            className: "rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.5, rotate: -180 },
                  whileInView: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      duration: 0.7,
                      ease: "easeInOut",
                      rotate: { duration: 0.7 }
                    }
                  },
                  viewport: { once: true },
                  whileHover: {
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.4 }
                  },
                  className: "mb-4 flex justify-center",
                  children: /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 shadow-lg", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-black", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" }) }) })
                }
              ),
              /* @__PURE__ */ jsx("h4", { className: "mb-4 text-2xl font-normal text-white", children: t("pages.contact.contact_info.address") }),
              /* @__PURE__ */ jsxs("div", { className: "text-gray-300", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-2 font-semibold text-yellow-500", children: contact.location }),
                /* @__PURE__ */ jsx("div", { className: "text-sm leading-relaxed", children: contact.address })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      KristalinLocationTabs,
      {
        variant: "dark",
        labels: {
          section_kicker: t("pages.contact.locations.kicker"),
          section_title: t("pages.contact.locations.title"),
          jakarta_tab: t("pages.contact.locations.jakarta_tab"),
          jakarta_title: t("pages.contact.locations.jakarta_title"),
          jakarta_subtitle: t("pages.contact.locations.jakarta_subtitle"),
          jakarta_address: t("pages.contact.locations.jakarta_address"),
          nabire_tab: t("pages.contact.locations.nabire_tab"),
          nabire_title: t("pages.contact.locations.nabire_title"),
          nabire_subtitle: t("pages.contact.locations.nabire_subtitle"),
          nabire_address: t("pages.contact.locations.nabire_address"),
          nabire_note: t("pages.contact.locations.nabire_note"),
          open_maps: t("pages.contact.locations.open_maps")
        }
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ContactPage as default
};

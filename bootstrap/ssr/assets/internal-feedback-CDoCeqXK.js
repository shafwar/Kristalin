import { jsxs, jsx } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { usePage, Head, router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-0QpcYAMD.js";
import { B as Button } from "./button-hAi0Fg-Q.js";
import { C as Checkbox } from "./checkbox-D07xazED.js";
import { L as Label, I as Input } from "./label-qls5No9M.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import "lucide-react";
import "react-dom";
import "./assets-CvOUY0DF.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-checkbox";
import "@radix-ui/react-label";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
function InternalFeedbackPage() {
  var _a, _b, _c;
  const { t } = useTranslation();
  const { props } = usePage();
  const serverErrors = props.errors ?? {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    is_anonymous: false,
    confirm_accurate: false
  });
  const [attachment, setAttachment] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      description: "",
      is_anonymous: false,
      confirm_accurate: false
    });
    setAttachment(null);
    setFileName("");
    setFileError("");
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  useEffect(() => {
    var _a2;
    if (((_a2 = props.flash) == null ? void 0 : _a2.success) === true) resetForm();
  }, [(_a = props.flash) == null ? void 0 : _a.success]);
  const validate = () => {
    var _a2;
    const newErrors = {};
    if (!formData.category) newErrors.category = t("pages.internal_feedback.form.select_category");
    if (!formData.description.trim()) newErrors.description = t("pages.internal_feedback.form.placeholders.description");
    else if (formData.description.trim().length < 10) newErrors.description = "At least 10 characters.";
    if (!formData.is_anonymous) {
      if (!((_a2 = formData.email) == null ? void 0 : _a2.trim())) newErrors.email = "Email is required when not submitting anonymously.";
      else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email.";
    }
    if (!formData.confirm_accurate) newErrors.confirm_accurate = "Please confirm.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFileChange = (file) => {
    setFileError("");
    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setFileError("PDF, JPG, PNG, DOC only. Max 10MB.");
        setFileName("");
        setAttachment(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size must be under 10MB.");
        setFileName("");
        setAttachment(null);
        return;
      }
      setFileName(file.name);
      setAttachment(file);
    } else {
      setFileName("");
      setAttachment(null);
    }
  };
  const handleSubmit = (e) => {
    var _a2;
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    ({
      ...formData,
      _token: (_a2 = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a2.content
    });
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("is_anonymous", formData.is_anonymous ? "1" : "0");
    form.append("confirm_accurate", formData.confirm_accurate ? "1" : "0");
    if (attachment) {
      form.append("attachment", attachment);
      form.append("has_attachment", "1");
    }
    router.post("/internal-feedback", form, {
      forceFormData: true,
      preserveScroll: true,
      onFinish: () => setLoading(false)
    });
  };
  const handleReset = () => resetForm();
  const success = ((_b = props.flash) == null ? void 0 : _b.success) === true;
  const errorMessage = (_c = props.flash) == null ? void 0 : _c.error;
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsx(Head, { title: t("pages.internal_feedback.page_title") }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
    /* @__PURE__ */ jsx("div", { className: "z-10 flex flex-1 flex-col pt-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "mb-8",
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 h-1 w-20 bg-gradient-to-r from-amber-400 to-amber-500" }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl", children: t("pages.internal_feedback.hero.title") }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg text-gray-600", children: t("pages.internal_feedback.hero.subtitle") }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-base text-gray-500", children: t("pages.internal_feedback.hero.description") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(AnimatePresence, { children: [
        success && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0 },
            className: "mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800",
            children: t("pages.internal_feedback.form.success_message")
          }
        ),
        errorMessage && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0 },
            className: "mb-6 rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800",
            children: errorMessage
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8",
          children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", noValidate: true, children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(Label, { htmlFor: "name", className: "text-sm font-medium text-gray-700", children: [
                  t("pages.internal_feedback.form.full_name"),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: t("pages.internal_feedback.form.optional") })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "name",
                    name: "name",
                    type: "text",
                    placeholder: t("pages.internal_feedback.form.placeholders.name"),
                    className: "mt-1.5 border-gray-300 bg-white text-gray-900 focus:ring-amber-500",
                    value: formData.name,
                    onChange: (e) => {
                      setFormData((p) => ({ ...p, name: e.target.value }));
                      if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                    },
                    disabled: formData.is_anonymous
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs(Label, { htmlFor: "email", className: "text-sm font-medium text-gray-700", children: [
                  t("pages.internal_feedback.form.email"),
                  " ",
                  formData.is_anonymous ? /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: t("pages.internal_feedback.form.optional") }) : /* @__PURE__ */ jsx("span", { className: "text-amber-600", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "email",
                    name: "email",
                    type: "email",
                    placeholder: t("pages.internal_feedback.form.placeholders.email"),
                    className: "mt-1.5 border-gray-300 bg-white text-gray-900 focus:ring-amber-500",
                    value: formData.email,
                    onChange: (e) => {
                      setFormData((p) => ({ ...p, email: e.target.value }));
                      if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                    },
                    disabled: formData.is_anonymous
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-amber-700", children: errors.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(Label, { htmlFor: "phone", className: "text-sm font-medium text-gray-700", children: [
                t("pages.internal_feedback.form.phone"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: t("pages.internal_feedback.form.optional") })
              ] }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "phone",
                  name: "phone",
                  type: "tel",
                  placeholder: t("pages.internal_feedback.form.placeholders.phone"),
                  className: "mt-1.5 border-gray-300 bg-white text-gray-900 focus:ring-amber-500",
                  value: formData.phone,
                  onChange: (e) => setFormData((p) => ({ ...p, phone: e.target.value })),
                  disabled: formData.is_anonymous
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(Label, { htmlFor: "category", className: "text-sm font-medium text-gray-700", children: [
                t("pages.internal_feedback.form.category"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-amber-600", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "category",
                  name: "category",
                  required: true,
                  className: "mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                  value: formData.category,
                  onChange: (e) => {
                    setFormData((p) => ({ ...p, category: e.target.value }));
                    if (errors.category) setErrors((p) => ({ ...p, category: "" }));
                  },
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: t("pages.internal_feedback.form.select_category") }),
                    ["general", "process_improvement", "workplace", "safety", "harassment", "policy", "management", "facilities", "ethics", "suggestion", "other"].map(
                      (key) => /* @__PURE__ */ jsx("option", { value: key, children: t(`pages.internal_feedback.form.categories.${key}`) }, key)
                    )
                  ]
                }
              ),
              errors.category && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-amber-700", children: errors.category })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(Label, { htmlFor: "description", className: "text-sm font-medium text-gray-700", children: [
                t("pages.internal_feedback.form.description"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-amber-600", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "description",
                  name: "description",
                  required: true,
                  rows: 6,
                  placeholder: t("pages.internal_feedback.form.placeholders.description"),
                  className: "mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                  value: formData.description,
                  onChange: (e) => {
                    setFormData((p) => ({ ...p, description: e.target.value }));
                    if (errors.description) setErrors((p) => ({ ...p, description: "" }));
                  }
                }
              ),
              errors.description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-amber-700", children: errors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(Label, { className: "text-sm font-medium text-gray-700", children: [
                t("pages.internal_feedback.form.attachment"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: t("pages.internal_feedback.form.optional") })
              ] }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 px-4 py-3 transition-colors hover:border-amber-300 hover:bg-amber-50/50",
                  onClick: () => {
                    var _a2;
                    return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (e) => {
                    var _a2;
                    return e.key === "Enter" && ((_a2 = fileInputRef.current) == null ? void 0 : _a2.click());
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        ref: fileInputRef,
                        type: "file",
                        accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
                        className: "hidden",
                        onChange: (e) => {
                          var _a2;
                          return handleFileChange(((_a2 = e.target.files) == null ? void 0 : _a2[0]) ?? null);
                        }
                      }
                    ),
                    fileName ? /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: fileName }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "PDF, JPG, PNG, DOC (Max 10MB)" })
                  ]
                }
              ),
              fileError && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-amber-700", children: fileError }),
              serverErrors.attachment && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-amber-700", children: serverErrors.attachment })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 border-t border-gray-200 pt-6", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    checked: formData.confirm_accurate,
                    onCheckedChange: (checked) => setFormData((p) => ({ ...p, confirm_accurate: checked === true })),
                    className: "mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: t("pages.internal_feedback.form.confirm_accurate") })
              ] }),
              errors.confirm_accurate && /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700", children: errors.confirm_accurate }),
              /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    checked: formData.is_anonymous,
                    onCheckedChange: (checked) => setFormData((p) => ({ ...p, is_anonymous: checked === true })),
                    className: "mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: t("pages.internal_feedback.form.submit_anonymously") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:justify-end", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleReset,
                  disabled: loading,
                  className: "border-gray-300 text-gray-700 hover:bg-gray-50",
                  children: t("pages.internal_feedback.form.reset")
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: loading,
                  className: "bg-amber-500 text-gray-900 hover:bg-amber-600",
                  children: loading ? t("pages.internal_feedback.form.submitting") : t("pages.internal_feedback.form.submit")
                }
              )
            ] })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  InternalFeedbackPage as default
};

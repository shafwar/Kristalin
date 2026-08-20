import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { H as Header, F as Footer } from "./Header-PE8OL-v1.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import "lucide-react";
import "react";
import "react-dom";
import "./assets-CvOUY0DF.js";
function TermsOfService() {
  const { t } = useTranslation();
  const currentDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-x-hidden bg-white", children: [
    /* @__PURE__ */ jsx(Head, { title: `${t("pages.terms_of_service.page_title")} - PT Kristalin Ekalestari` }),
    /* @__PURE__ */ jsx(Header, { sticky: true, transparent: false }),
    /* @__PURE__ */ jsx("div", { className: "z-10 flex flex-1 flex-col pt-24 sm:pt-32 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-light text-stone-900 mb-8", children: t("pages.terms_of_service.page_title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-stone max-w-none text-stone-700 space-y-6", children: [
        /* @__PURE__ */ jsx("p", { children: t("pages.terms_of_service.last_updated").replace(":date", currentDate) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-stone-900 mt-10 mb-4", children: t("pages.terms_of_service.sections.1.title") }),
        /* @__PURE__ */ jsx("p", { children: t("pages.terms_of_service.sections.1.content") }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-stone-900 mt-10 mb-4", children: t("pages.terms_of_service.sections.2.title") }),
        /* @__PURE__ */ jsx("p", { children: t("pages.terms_of_service.sections.2.content") }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: t("pages.terms_of_service.sections.2.list.0") }),
          /* @__PURE__ */ jsx("li", { children: t("pages.terms_of_service.sections.2.list.1") }),
          /* @__PURE__ */ jsx("li", { children: t("pages.terms_of_service.sections.2.list.2") })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-stone-900 mt-10 mb-4", children: t("pages.terms_of_service.sections.3.title") }),
        /* @__PURE__ */ jsx("p", { children: t("pages.terms_of_service.sections.3.content") }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-stone-900 mt-10 mb-4", children: t("pages.terms_of_service.sections.4.title") }),
        /* @__PURE__ */ jsx("p", { children: t("pages.terms_of_service.sections.4.content") }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-stone-900 mt-10 mb-4", children: t("pages.terms_of_service.sections.5.title") }),
        /* @__PURE__ */ jsx("p", { children: t("pages.terms_of_service.sections.5.content") }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-medium text-stone-900 mt-10 mb-4", children: t("pages.terms_of_service.sections.6.title") }),
        /* @__PURE__ */ jsxs("p", { children: [
          t("pages.terms_of_service.sections.6.content"),
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:info@kristalin.co.id", className: "text-amber-600 hover:underline", children: "info@kristalin.co.id" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  TermsOfService as default
};

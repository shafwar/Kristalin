import { jsx, jsxs } from "react/jsx-runtime";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
import { Link } from "@inertiajs/react";
function AuthSimpleLayout({ children, title, description }) {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxs(Link, { href: route("home"), className: "flex flex-col items-center gap-2 font-medium", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: imageUrl("kristalin-logo-v2.png"),
            alt: "Kristalin Eka Lestari Logo",
            className: "mb-1 h-9 w-9 rounded-md object-contain"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: title })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-medium", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: description })
      ] })
    ] }),
    children
  ] }) }) });
}
function AuthLayout({ children, title, description, ...props }) {
  return /* @__PURE__ */ jsx(AuthSimpleLayout, { title, description, ...props, children });
}
export {
  AuthLayout as A
};

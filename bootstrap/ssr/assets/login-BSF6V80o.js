import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { I as InputError } from "./input-error-QUUakoix.js";
import { T as TextLink } from "./text-link-EYWQF2VT.js";
import { B as Button } from "./button-hAi0Fg-Q.js";
import { C as Checkbox } from "./checkbox-D07xazED.js";
import { L as Label, I as Input } from "./label-qls5No9M.js";
import { A as AuthLayout } from "./auth-layout-Cah37PdJ.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-checkbox";
import "@radix-ui/react-label";
import "./assets-CvOUY0DF.js";
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Log in to your account", description: "Enter your email and password below to log in", children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              autoFocus: true,
              tabIndex: 1,
              autoComplete: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            canResetPassword && /* @__PURE__ */ jsx(TextLink, { href: route("password.request"), className: "ml-auto text-sm", tabIndex: 5, children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              required: true,
              tabIndex: 2,
              autoComplete: "current-password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              placeholder: "Password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              id: "remember",
              name: "remember",
              checked: data.remember,
              onClick: () => setData("remember", !data.remember),
              tabIndex: 3
            }
          ),
          /* @__PURE__ */ jsx(Label, { htmlFor: "remember", children: "Remember me" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-4 w-full", tabIndex: 4, disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Log in"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(TextLink, { href: route("register"), tabIndex: 5, children: "Sign up" })
      ] })
    ] }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status })
  ] });
}
export {
  Login as default
};

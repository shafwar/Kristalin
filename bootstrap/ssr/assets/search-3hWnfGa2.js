import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { usePage, router } from "@inertiajs/react";
import { Search, Clock, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { H as Header, F as Footer } from "./Header-0QpcYAMD.js";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import "react-dom";
import "./assets-CvOUY0DF.js";
function SearchPage() {
  const { t } = useTranslation();
  const page = usePage();
  const {
    q = "",
    results = [],
    total = 0,
    currentPage = 1,
    totalPages = 1,
    displayQuery
  } = page.props;
  const [query, setQuery] = useState(q);
  const [isSearching, setIsSearching] = useState(false);
  const [hoveredResult, setHoveredResult] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
    setTimeout(() => setIsLoaded(true), 100);
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1e3);
    router.get(`/search`, { q: query }, { preserveScroll: true, replace: true });
  };
  const onPaginate = (page2) => {
    router.get(`/search`, { q: query || q, page: page2 }, { preserveScroll: true });
  };
  const highlight = (text, keyword) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi"));
    return /* @__PURE__ */ jsx(Fragment, { children: parts.map((part, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: part.toLowerCase() === keyword.toLowerCase() ? "rounded-md bg-gradient-to-r from-amber-200 to-yellow-200 px-1 py-0.5 font-medium text-amber-900" : void 0,
        children: part
      },
      i
    )) });
  };
  const formatResultCount = (count) => {
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
    return count.toString();
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30", children: [
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-3xl" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-amber-300/10 to-yellow-300/10 blur-3xl",
          style: { animationDelay: "1s" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full bg-gradient-to-r from-amber-100/5 to-yellow-100/5 blur-2xl",
          style: { animationDelay: "0.5s" }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header, { sticky: true }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-16", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `mb-8 transform text-center transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex items-center gap-2", children: /* @__PURE__ */ jsx("h1", { className: "text-5xl font-black tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent", children: t("pages.search.title") }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: t("pages.search.subtitle") })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `mx-auto mb-8 max-w-3xl transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`,
          style: { transitionDelay: "0.3s" },
          children: /* @__PURE__ */ jsxs("form", { onSubmit, className: "group relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex w-full items-center gap-2 rounded-2xl border-2 border-gray-200 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 focus-within:scale-100 focus-within:border-amber-400 hover:border-amber-300 sm:gap-3 sm:px-6 sm:py-4 sm:focus-within:scale-105", children: [
              /* @__PURE__ */ jsx(
                Search,
                {
                  className: `h-6 w-6 transition-all duration-300 ${isSearching ? "animate-spin text-amber-500" : "text-gray-400 group-focus-within:text-amber-500"}`
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: t("pages.search.input_placeholder"),
                  className: "flex-1 border-none bg-transparent text-base text-gray-800 placeholder-gray-400 outline-none sm:text-lg"
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "submit",
                  className: "group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-2 text-sm text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg active:scale-95 max-[360px]:h-10 max-[360px]:w-10 max-[360px]:px-0 sm:px-6 sm:text-base",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -translate-x-full -skew-x-12 transform bg-white/20 transition-transform duration-700 group-hover:translate-x-full" }),
                    /* @__PURE__ */ jsx(Search, { className: "inline h-5 w-5 min-[360px]:hidden" }),
                    /* @__PURE__ */ jsx("span", { className: "relative hidden min-[360px]:inline", children: t("pages.search.search_button") })
                  ]
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `mb-6 flex transform items-center justify-between transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`,
          style: { transitionDelay: "0.5s" },
          children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-gray-500 group-hover:animate-spin" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-amber-600", children: formatResultCount(total) }),
              " ",
              t("pages.search.articles_found_for"),
              /* @__PURE__ */ jsxs("span", { className: "ml-1 inline-block max-w-[50vw] truncate align-bottom font-medium text-gray-800", children: [
                '"',
                displayQuery || q,
                '"'
              ] })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: results.map((item, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          onMouseEnter: () => setHoveredResult(idx),
          onMouseLeave: () => setHoveredResult(null),
          className: `group relative transform overflow-hidden rounded-2xl border transition-all duration-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${hoveredResult === idx ? "scale-[1.02] border-amber-300 bg-gradient-to-r from-white to-amber-50/50 shadow-xl" : "border-gray-200 bg-white/70 shadow-md backdrop-blur-sm hover:shadow-lg"}`,
          style: {
            transitionDelay: isLoaded ? `${0.7 + idx * 0.1}s` : "0s"
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 transition-all duration-500 ${hoveredResult === idx ? "opacity-10" : ""}`
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ${hoveredResult === idx ? "translate-x-full" : ""}`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start justify-between", children: [
                /* @__PURE__ */ jsx("h3", { className: "flex-1 pr-4 text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-amber-700", children: /* @__PURE__ */ jsx("a", { href: item.url, className: "decoration-amber-400 decoration-2 hover:underline", children: item.title }) }),
                /* @__PURE__ */ jsx(
                  ExternalLink,
                  {
                    className: `h-5 w-5 flex-shrink-0 text-gray-400 transition-all duration-300 group-hover:text-amber-500 ${hoveredResult === idx ? "translate-x-1 -translate-y-1 transform animate-bounce" : ""}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 text-base leading-relaxed text-gray-700", children: highlight(item.snippet, displayQuery || q || "") }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: item.url,
                  className: "inline-flex transform items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-600 transition-all duration-300 hover:scale-105 hover:bg-amber-100 hover:text-amber-700 active:scale-95",
                  children: /* @__PURE__ */ jsx("span", { className: "max-w-xs truncate", children: window.location.origin.replace(/\/$/, "") + item.url })
                }
              ) })
            ] })
          ]
        },
        idx
      )) }),
      totalPages > 1 && /* @__PURE__ */ jsxs(
        "div",
        {
          className: `mt-12 flex transform items-center justify-center gap-3 px-2 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`,
          style: { transitionDelay: "0.7s" },
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onPaginate(Math.max(1, currentPage - 1)),
                className: "group flex h-10 w-10 items-center justify-center rounded-xl border-2 border-gray-300 text-gray-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12 sm:hover:scale-110",
                disabled: currentPage <= 1,
                "aria-label": t("pages.search.prev_page_aria"),
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 transition-all duration-300 group-hover:-translate-x-1" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-2 overflow-x-auto whitespace-nowrap max-[360px]:hidden sm:flex", children: Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (currentPage <= 4) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = currentPage - 3 + i;
              }
              return /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onPaginate(pageNum),
                  className: `flex h-10 w-10 items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95 sm:h-12 sm:w-12 sm:hover:scale-110 ${pageNum === currentPage ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg" : "border-2 border-gray-300 text-gray-700 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-50"}`,
                  children: pageNum
                },
                pageNum
              );
            }) }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 max-[360px]:flex sm:hidden", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700", children: [
              currentPage,
              " / ",
              totalPages
            ] }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onPaginate(Math.min(totalPages, currentPage + 1)),
                className: "group flex h-10 w-10 items-center justify-center rounded-xl border-2 border-gray-300 text-gray-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12 sm:hover:scale-110",
                disabled: currentPage >= totalPages,
                "aria-label": t("pages.search.next_page_aria"),
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5 transition-all duration-300 group-hover:translate-x-1" })
              }
            )
          ]
        }
      ),
      results.length === 0 && q && /* @__PURE__ */ jsxs(
        "div",
        {
          className: `transform py-16 text-center transition-all duration-1000 ${isLoaded ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"}`,
          style: { transitionDelay: "0.3s" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6 inline-flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 shadow-lg", children: /* @__PURE__ */ jsx(Search, { className: "h-12 w-12 text-amber-500" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-2xl font-bold text-gray-800", children: t("pages.search.no_results_title") }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-gray-600", children: t("pages.search.no_results_hint") }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  var _a;
                  setQuery("");
                  (_a = inputRef.current) == null ? void 0 : _a.focus();
                },
                className: "group relative transform overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg active:scale-95",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -translate-x-full -skew-x-12 transform bg-white/20 transition-transform duration-700 group-hover:translate-x-full" }),
                  /* @__PURE__ */ jsx("span", { className: "relative", children: t("pages.search.try_again") })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  SearchPage as default
};

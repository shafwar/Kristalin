import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./useTranslation-DutJeAb2.js";
import { Link, router } from "@inertiajs/react";
import { MessageCircle, X, Shield, Phone, Mail, Instagram, Linkedin, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
function FloatingActionMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const phoneNumber = "+622122978900";
  const phoneUrl = `tel:${phoneNumber}`;
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMobileNavOpen(document.body.classList.contains("mobile-menu-open"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    setMobileNavOpen(document.body.classList.contains("mobile-menu-open"));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    // CRITICAL FIX: The wrapper div ONLY wraps the visible button + popup — it does NOT
    // expand to cover the whole screen. On mobile, a full-width/height fixed container
    // with z-[9999] would silently intercept ALL taps (e.g. hero buttons, sidebar links).
    //
    // Solution: wrapper is `w-fit h-fit` (shrinks to contents only) + `pointer-events-none`
    // on the wrapper itself. Individual interactive children re-enable pointer-events via
    // `pointer-events-auto`. This ensures zero invisible hit-test area outside the FAB itself.
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed z-[9999] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 transition-opacity duration-200 ${mobileNavOpen ? "pointer-events-none opacity-0" : "pointer-events-none opacity-100"}`,
        children: /* @__PURE__ */ jsxs("div", { ref: menuRef, className: "flex flex-col-reverse items-end gap-0", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: toggleMenu,
              className: `pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-2 transition-all duration-300 focus:outline-none focus:ring-offset-2 active:scale-95 ${isOpen ? "bg-stone-800 ring-stone-700 hover:bg-stone-900 shadow-xl" : "bg-amber-500 ring-amber-400/50 hover:bg-amber-600 hover:shadow-xl hover:ring-amber-400"}`,
              "aria-label": "Toggle Contact Menu",
              style: { WebkitTapHighlightColor: "transparent" },
              children: [
                /* @__PURE__ */ jsx("span", { className: `absolute transition-all duration-300 ${isOpen ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"}`, children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6", strokeWidth: 2 }) }),
                /* @__PURE__ */ jsx("span", { className: `absolute transition-all duration-300 ${isOpen ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"}`, children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6", strokeWidth: 2 }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `mb-4 w-[280px] origin-bottom-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? "translate-y-0 scale-100 opacity-100 pointer-events-auto" : "translate-y-4 scale-90 opacity-0 pointer-events-none"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "border-b border-stone-100 px-4 py-3", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-stone-900", children: t("pages.floating_menu.title") || "How can we help?" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-stone-500", children: t("pages.floating_menu.subtitle") || "Choose a way to connect with us" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col space-y-1", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: "/internal-feedback",
                      className: "group flex items-center rounded-xl px-3 py-2.5 transition-colors hover:bg-stone-50 focus:bg-stone-50 focus:outline-none",
                      onClick: () => setIsOpen(false),
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white", children: /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-stone-700 transition-colors group-hover:text-amber-600", children: t("pages.internal_feedback.page_title") || "Internal Feedback" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: phoneUrl,
                      className: "group flex items-center rounded-xl px-3 py-2.5 transition-colors hover:bg-stone-50 focus:bg-stone-50 focus:outline-none",
                      onClick: () => setIsOpen(false),
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-stone-700 transition-colors group-hover:text-blue-600", children: t("pages.floating_menu.call_us") || "Call Us" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: "/contact",
                      className: "group flex items-center rounded-xl px-3 py-2.5 transition-colors hover:bg-stone-50 focus:bg-stone-50 focus:outline-none",
                      onClick: () => setIsOpen(false),
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-800 group-hover:text-white", children: /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-stone-700 transition-colors group-hover:text-stone-900", children: t("pages.floating_menu.contact_page") || "Contact Page" })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      }
    )
  );
}
function Footer({ className = "", minimal = false }) {
  const { t } = useTranslation();
  if (minimal) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(FloatingActionMenu, {}),
      /* @__PURE__ */ jsxs("footer", { className: `relative w-full bg-stone-950 py-3 sm:py-4 text-stone-300 overflow-hidden shrink-0 border-t border-white/5 ${className}`, style: { zIndex: 100 }, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent blur-sm" }),
        /* @__PURE__ */ jsx("div", { className: "w-full px-4 sm:px-6 md:px-8 lg:px-10 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-stone-500 md:text-stone-400 text-[10px] sm:text-sm text-center md:text-left font-medium tracking-wide flex items-center justify-center md:justify-start gap-2 order-2 md:order-1 mt-1 md:mt-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-amber-500 text-[9px] md:text-[10px]", children: "◆" }),
            " ",
            t("pages.footer.copyright")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center md:justify-end items-center gap-x-4 md:gap-x-6 gap-y-2 text-[11px] sm:text-sm text-stone-400 font-medium tracking-wide order-1 md:order-2", children: [
            /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "hover:text-amber-400 transition-all duration-300 hover:-translate-y-0.5 inline-block", children: t("pages.footer.privacy_policy") || "Privacy Policy" }),
            /* @__PURE__ */ jsx("span", { className: "text-stone-700 hidden sm:inline-block", children: "|" }),
            /* @__PURE__ */ jsx(Link, { href: "/terms", className: "hover:text-amber-400 transition-all duration-300 hover:-translate-y-0.5 inline-block", children: t("pages.footer.terms_of_service") || "Terms of Service" }),
            /* @__PURE__ */ jsx("span", { className: "text-stone-700 hidden sm:inline-block", children: "|" }),
            /* @__PURE__ */ jsx(Link, { href: "/internal-feedback", className: "hover:text-amber-400 transition-all duration-300 hover:-translate-y-0.5 inline-block", children: t("pages.footer.whistleblower") || "Whistleblower" })
          ] })
        ] }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(FloatingActionMenu, {}),
    /* @__PURE__ */ jsxs("footer", { className: `relative w-full bg-stone-950 pt-20 pb-8 text-stone-300 overflow-hidden ${className}`, style: { zIndex: 100 }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 -left-20 w-80 h-80 bg-stone-800/40 rounded-full blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 md:px-12 lg:px-16 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 flex flex-col items-start", children: [
            /* @__PURE__ */ jsx(Link, { href: "/", className: "mb-6 inline-block group", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/kristalin-assets/public/Mark-Gold.webp",
                  alt: "Kristalin Mark",
                  className: "h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-transform duration-500 group-hover:scale-105"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold tracking-tight text-white leading-none", children: "Kristalin" }),
                /* @__PURE__ */ jsx("span", { className: "text-lg font-light tracking-[0.2em] text-stone-400 leading-none mt-1.5 uppercase", children: "Ekalestari" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-stone-400 text-sm md:text-base leading-relaxed max-w-md mb-8", children: t("pages.footer.description") || "Trusted partner in integrated gold exploration, refining, and trading since 1989. Committed to sustainable operations and community development across Papua and Indonesia." }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://instagram.com/kristalin_ekalestari",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group flex h-11 w-11 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-400 transition-all duration-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-1",
                  children: /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4", strokeWidth: 2 })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#",
                  className: "group flex h-11 w-11 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-400 transition-all duration-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-1",
                  children: /* @__PURE__ */ jsx(Linkedin, { className: "h-4 w-4", strokeWidth: 2 })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 lg:col-start-7", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-6 uppercase tracking-widest text-xs", children: t("pages.footer.explore") || "Explore" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/about", className: "text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base", children: [
                /* @__PURE__ */ jsx("span", { className: "w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100" }),
                t("pages.welcome.buttons.learn_more") || "About Us"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/business-activity", className: "text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base", children: [
                /* @__PURE__ */ jsx("span", { className: "w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100" }),
                t("pages.footer.business_activities") || "Business Activities"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/investor", className: "text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base", children: [
                /* @__PURE__ */ jsx("span", { className: "w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100" }),
                t("pages.footer.investors_partners") || "Investors & Partners"
              ] }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: "/csr", className: "text-stone-400 hover:text-white transition-colors inline-flex items-center group text-sm md:text-base", children: [
                /* @__PURE__ */ jsx("span", { className: "w-0 h-px bg-amber-400 mr-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:mr-3 opacity-0 group-hover:opacity-100" }),
                t("pages.footer.community_csr") || "Community (CSR)"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-6 uppercase tracking-widest text-xs", children: t("pages.footer.contact_us") || "Contact Us" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4 text-stone-400 text-sm md:text-base", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 border border-stone-800", children: /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 text-amber-500" }) }),
                /* @__PURE__ */ jsxs("span", { className: "leading-relaxed", children: [
                  t("pages.footer.hq_address_line1") || "Jakarta Head Office",
                  /* @__PURE__ */ jsx("br", {}),
                  t("pages.footer.hq_address_line2") || "Indonesia"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-4 text-stone-400 text-sm md:text-base", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 border border-stone-800", children: /* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5 text-amber-500" }) }),
                /* @__PURE__ */ jsx("a", { href: "tel:+622122978900", className: "hover:text-white transition-colors", children: "+62 21 22978900" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-4 text-stone-400 text-sm md:text-base", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 border border-stone-800", children: /* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5 text-amber-500" }) }),
                /* @__PURE__ */ jsx("a", { href: "mailto:info@kristalin.co.id", className: "hover:text-white transition-colors", children: "info@kristalin.co.id" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full border-t border-stone-800/80 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-3 text-[11px] sm:text-sm text-stone-500 font-medium tracking-wide order-1 md:order-2", children: [
            /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "hover:text-amber-400 transition-colors", children: t("pages.footer.privacy_policy") || "Privacy Policy" }),
            /* @__PURE__ */ jsx(Link, { href: "/terms", className: "hover:text-amber-400 transition-colors", children: t("pages.footer.terms_of_service") || "Terms of Service" }),
            /* @__PURE__ */ jsx(Link, { href: "/internal-feedback", className: "hover:text-amber-400 transition-colors", children: t("pages.footer.whistleblower") || "Whistleblower" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-stone-600 md:text-stone-500 text-[10px] sm:text-sm text-center md:text-left font-medium tracking-wide order-2 md:order-1 mt-1 md:mt-0", children: t("pages.footer.copyright") })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none opacity-[0.02]", children: /* @__PURE__ */ jsx("span", { className: "text-[18vw] font-black tracking-tighter whitespace-nowrap leading-none text-white", children: "KRISTALIN" }) })
    ] })
  ] });
}
function Header({ sticky = false, transparent = false }) {
  const { t, locale, switchLanguage, getCurrentLanguageCode } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [mobileOverlayMounted, setMobileOverlayMounted] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
    };
    if (transparent || sticky) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [transparent, sticky]);
  useEffect(() => {
    setMobileOverlayMounted(true);
  }, []);
  useEffect(() => {
    function handlePointerOutside(event) {
      var _a;
      const target = event.target;
      if (!target) return;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(target)) {
        setAboutDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        if (!((_a = mobileMenuToggleRef.current) == null ? void 0 : _a.contains(target))) {
          setMobileMenuOpen(false);
        }
      }
    }
    if (dropdownOpen || aboutDropdownOpen || mobileMenuOpen || searchOpen) {
      document.addEventListener("mousedown", handlePointerOutside);
    } else {
      document.removeEventListener("mousedown", handlePointerOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handlePointerOutside);
    };
  }, [dropdownOpen, aboutDropdownOpen, mobileMenuOpen, searchOpen]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
      if (e.key === "Enter" && searchOpen) {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
          router.get("/search", { q: searchQuery.trim() }, { preserveScroll: true });
          setSearchOpen(false);
        }
      }
    };
    if (searchOpen) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, searchQuery]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.style.paddingRight = "";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.classList.remove("mobile-menu-open");
      return;
    }
    const scrollY2 = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const body = document.body;
    const html = document.documentElement;
    body.style.position = "fixed";
    body.style.top = `-${scrollY2}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
      html.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.classList.add("mobile-menu-open");
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.paddingRight = "";
      html.style.paddingRight = "";
      body.classList.remove("mobile-menu-open");
      window.scrollTo(0, scrollY2);
    };
  }, [mobileMenuOpen]);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);
  const getBackgroundOpacity = () => {
    if (!transparent) return 1;
    if (mobileMenuOpen) return 1;
    const maxScroll = 100;
    const opacity = Math.min(scrollY / maxScroll, 1);
    return opacity;
  };
  const backgroundOpacity = getBackgroundOpacity();
  const shadowOpacity = Math.min(scrollY / 50, 1);
  const blurIntensity = Math.min(scrollY / 80, 1);
  const textOpacity = transparent && !mobileMenuOpen ? Math.max(0.8, 1 - backgroundOpacity * 0.2) : 1;
  const getHeaderClasses = () => {
    const baseClasses = "flex items-center h-16 w-full min-w-0 px-3 sm:px-4 md:px-6 lg:h-[4.5rem] lg:px-8 z-50";
    if (sticky && transparent) {
      return `${baseClasses} fixed top-0 left-0 right-0 transition-all duration-300 ease-out`;
    } else if (sticky) {
      return `${baseClasses} fixed top-0 left-0 right-0 bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow-lg transition-all duration-500 ease-out`;
    } else {
      return `${baseClasses} bg-gradient-to-b from-[#444] via-[#888] to-[#e5e7eb] shadow-lg relative`;
    }
  };
  const getHeaderStyle = () => {
    if (!transparent || mobileMenuOpen) {
      return {
        background: "linear-gradient(to bottom, rgb(68, 68, 68), rgb(136, 136, 136), rgb(229, 231, 235))",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
      };
    }
    return {
      background: `linear-gradient(to bottom,
        rgba(68, 68, 68, ${backgroundOpacity * 0.95}),
        rgba(136, 136, 136, ${backgroundOpacity * 0.95}),
        rgba(229, 231, 235, ${backgroundOpacity * 0.95}))`,
      boxShadow: shadowOpacity > 0 ? `0 10px 25px rgba(0, 0, 0, ${shadowOpacity * 0.15})` : "none",
      backdropFilter: blurIntensity > 0 ? `blur(${blurIntensity * 12}px)` : "none",
      WebkitBackdropFilter: blurIntensity > 0 ? `blur(${blurIntensity * 12}px)` : "none"
    };
  };
  const getLogoSrc = () => {
    return imageUrl("Vertikal-Black-Mark-Gold.webp");
  };
  const getLogoFilter = () => {
    if (!transparent || mobileMenuOpen) return "none";
    return scrollY < 50 ? "brightness(0) invert(1)" : "none";
  };
  const navigationItems = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.about_us"),
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: t("nav.b2c"), href: "/b2c" },
        { label: t("nav.about_kristalin"), href: "/about#about-kristalin" },
        { label: t("nav.board_of_directors"), href: "/board-of-directors" },
        { label: t("nav.vision_mission"), href: "/vision-mission" },
        { label: t("nav.company_overview"), href: "/company-overview" },
        { label: t("nav.milestones"), href: "/milestones" },
        { label: t("nav.core_values"), href: "/core-values" },
        { label: t("nav.leadership_traits"), href: "/leadership-traits" },
        { label: t("nav.news"), href: "/news" },
        { label: t("nav.careers"), href: "/careers" }
      ]
    },
    { label: t("nav.modi"), href: "https://minerbaone.esdm.go.id/publik/badan-usaha/detail/611426748818660096", external: true },
    { label: t("nav.gold_price"), href: "https://goldprice.org/gold-price-indonesia.html", external: true },
    {
      label: t("nav.investor") || "Investor",
      labelDesktop: t("nav.investor") || "Investor",
      href: "/investor"
    },
    { label: t("nav.line_of_business"), labelCompact: t("nav.line_of_business_short"), href: "/line-of-business" },
    { label: t("nav.business_activities"), labelCompact: t("nav.business_activities_short"), href: "/business-activity" },
    { label: t("nav.csr"), href: "/csr" },
    { label: t("nav.contact"), href: "/contact" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: getHeaderClasses(), style: getHeaderStyle(), children: [
    /* @__PURE__ */ jsxs("div", { className: "site-large-shell flex h-full w-full min-w-0 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center pr-2 pl-2 sm:pr-4 sm:pl-3 lg:pr-6 lg:pl-4", children: /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center", "aria-label": "Company Logo", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: getLogoSrc(),
          alt: "Kristalin Eka Lestari Logo",
          className: "h-8 w-auto object-contain py-0.5 transition-all duration-700 ease-out sm:h-9 md:h-10 lg:h-11 xl:h-11",
          style: { filter: getLogoFilter() }
        }
      ) }) }),
      /* @__PURE__ */ jsx("nav", { className: "hidden min-w-0 flex-1 justify-center lg:flex lg:px-2 xl:px-4", children: /* @__PURE__ */ jsx(
        "ul",
        {
          className: "flex items-center gap-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out lg:gap-1.5 xl:gap-2 xl:text-sm",
          style: { opacity: textOpacity },
          children: navigationItems.map((item, index) => {
            var _a;
            return /* @__PURE__ */ jsx("li", { className: item.hasDropdown ? "group relative shrink-0" : "shrink-0", children: item.hasDropdown ? /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative",
                ref: aboutDropdownRef,
                onMouseEnter: () => {
                  setAboutDropdownOpen(true);
                },
                onMouseLeave: () => {
                  setAboutDropdownOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: item.href,
                      className: "flex items-center gap-1 px-2 py-2 transition-all duration-300 ease-out hover:text-yellow-400 lg:px-2.5 xl:px-3",
                      onClick: (e) => e.preventDefault(),
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: item.label }),
                        /* @__PURE__ */ jsx(
                          "svg",
                          {
                            className: `h-3 w-3 transform transition-transform duration-300 ease-out ${aboutDropdownOpen ? "rotate-180" : ""}`,
                            fill: "currentColor",
                            viewBox: "0 0 12 12",
                            children: /* @__PURE__ */ jsx("path", { d: "M6 8L2 4h8l-4 4z" })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `absolute top-full left-0 z-50 mt-1 w-64 transform rounded-lg border border-gray-600 bg-gradient-to-b from-[#444] via-[#666] to-[#888] text-white shadow-2xl backdrop-blur-sm transition-all duration-300 ease-out xl:w-72 ${aboutDropdownOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`,
                      onMouseEnter: () => setAboutDropdownOpen(true),
                      onMouseLeave: () => setAboutDropdownOpen(false),
                      children: /* @__PURE__ */ jsx("div", { className: "px-4 py-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-1", children: (_a = item.dropdownItems) == null ? void 0 : _a.map((dropdownItem, dropdownIndex) => /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: dropdownItem.href,
                          className: "hover:bg-opacity-10 block rounded px-3 py-2.5 text-xs transition-all duration-300 ease-out hover:translate-x-1 hover:scale-105 hover:bg-white hover:text-yellow-300",
                          children: dropdownItem.label
                        },
                        dropdownIndex
                      )) }) })
                    }
                  )
                ]
              }
            ) : item.external ? /* @__PURE__ */ jsxs(
              "a",
              {
                href: item.href,
                target: "_blank",
                rel: "noopener noreferrer",
                title: item.label,
                className: "inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 transition-all duration-300 ease-out hover:text-yellow-400 lg:px-2.5",
                children: [
                  /* @__PURE__ */ jsx("span", { children: item.label }),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "h-2.5 w-2.5 shrink-0 opacity-70",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 2.5,
                      "aria-hidden": true,
                      children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" })
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsx(
              Link,
              {
                href: item.href,
                className: "block whitespace-nowrap px-2 py-2 transition-all duration-300 ease-out hover:text-yellow-400 lg:px-2.5 xl:px-3",
                children: item.label
              }
            ) }, index);
          })
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-end gap-2 lg:hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center", title: "Indonesia", children: /* @__PURE__ */ jsxs("svg", { role: "img", "aria-label": "Flag of Indonesia", viewBox: "0 0 3 2", className: "h-4 w-6 rounded shadow sm:h-5 sm:w-8", children: [
          /* @__PURE__ */ jsx("rect", { width: "3", height: "1", y: "0", fill: "#CE1126" }),
          /* @__PURE__ */ jsx("rect", { width: "3", height: "1", y: "1", fill: "#FFFFFF" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            ref: mobileMenuToggleRef,
            type: "button",
            className: "p-2 text-white transition-all duration-300 ease-out hover:text-yellow-400",
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            "aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
            "aria-expanded": mobileMenuOpen,
            "aria-controls": "mobile-navigation-drawer",
            style: { opacity: textOpacity },
            children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: mobileMenuOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "hidden h-full shrink-0 items-center gap-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out lg:flex xl:gap-2 xl:text-sm",
          style: { opacity: textOpacity },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "flex h-10 min-w-[44px] items-center justify-center px-2 py-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out hover:text-yellow-400 focus:outline-none xl:text-sm",
                  onClick: () => setDropdownOpen(!dropdownOpen),
                  "aria-haspopup": "listbox",
                  "aria-expanded": dropdownOpen,
                  children: [
                    getCurrentLanguageCode(),
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        width: "12",
                        height: "12",
                        fill: "none",
                        className: `ml-1 transform transition-transform duration-300 ease-out ${dropdownOpen ? "rotate-180" : ""}`,
                        children: /* @__PURE__ */ jsx("path", { d: "M3 4.5l3 3 3-3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
                      }
                    )
                  ]
                }
              ),
              dropdownOpen && /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "animate-fadeIn absolute right-0 z-50 mt-2 w-24 transform rounded border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-out",
                  role: "listbox",
                  children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: `block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${locale === "id" ? "text-yellow-600" : "text-gray-800"}`,
                        onClick: () => {
                          switchLanguage("id");
                          setDropdownOpen(false);
                        },
                        role: "option",
                        "aria-selected": locale === "id",
                        children: "ID"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: `block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${locale === "en" ? "text-yellow-600" : "text-gray-800"}`,
                        onClick: () => {
                          switchLanguage("en");
                          setDropdownOpen(false);
                        },
                        role: "option",
                        "aria-selected": locale === "en",
                        children: "EN"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: `block w-full px-4 py-2 text-left text-sm font-semibold uppercase transition-all duration-300 ease-out hover:scale-105 hover:bg-yellow-100 ${locale === "zh" ? "text-yellow-600" : "text-gray-800"}`,
                        onClick: () => {
                          switchLanguage("zh");
                          setDropdownOpen(false);
                        },
                        role: "option",
                        "aria-selected": locale === "zh",
                        children: "ZH"
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", ref: searchRef, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSearchOpen((o) => !o),
                  className: "flex h-10 items-center justify-center px-2 py-1 text-xs font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-out hover:scale-105 hover:text-yellow-400 focus:outline-none xl:text-sm",
                  "aria-label": t("common.search"),
                  children: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8", stroke: "currentColor", strokeWidth: "2" }),
                    /* @__PURE__ */ jsx("path", { d: "M21 21l-4.35-4.35", stroke: "currentColor", strokeWidth: "2" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `absolute top-full right-0 mt-2 w-[320px] max-w-[80vw] transform transition-all duration-300 ${searchOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`,
                  children: /* @__PURE__ */ jsxs(
                    "form",
                    {
                      onSubmit: (e) => {
                        e.preventDefault();
                        if (searchQuery.trim() !== "") {
                          setIsSearching(true);
                          router.get("/search", { q: searchQuery.trim() }, { preserveScroll: true });
                          setTimeout(() => setIsSearching(false), 1e3);
                          setSearchOpen(false);
                        }
                      },
                      className: "group relative",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30" }),
                        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-2 shadow-xl transition-all duration-300 focus-within:scale-[1.02] focus-within:border-amber-400 hover:border-amber-300", children: [
                          /* @__PURE__ */ jsxs(
                            "svg",
                            {
                              width: "18",
                              height: "18",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              className: `transition-all duration-300 ${isSearching ? "animate-spin text-amber-500" : "text-gray-400 group-focus-within:text-amber-500"}`,
                              children: [
                                /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
                                /* @__PURE__ */ jsx("path", { d: "M20 20l-3.5-3.5", stroke: "currentColor", strokeWidth: "2" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              value: searchQuery,
                              onChange: (e) => setSearchQuery(e.target.value),
                              placeholder: `${t("common.search")}...`,
                              className: "w-full border-none bg-white text-gray-800 outline-none placeholder:text-gray-400"
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "submit",
                              className: "relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg",
                              children: [
                                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -translate-x-full -skew-x-12 bg-white transition-transform duration-700 group-hover:translate-x-full" }),
                                /* @__PURE__ */ jsx("span", { className: "relative", children: t("common.search") })
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/internal-feedback",
                className: "flex h-9 w-9 items-center justify-center text-white/70 transition-all duration-300 hover:text-yellow-400 hover:opacity-100 focus:outline-none lg:h-10 lg:w-10",
                title: t("pages.internal_feedback.page_title"),
                "aria-label": t("pages.internal_feedback.page_title"),
                children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "shrink-0", children: /* @__PURE__ */ jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "ml-1 flex items-center lg:ml-2", title: "Indonesia", children: /* @__PURE__ */ jsxs("svg", { role: "img", "aria-label": "Flag of Indonesia", viewBox: "0 0 3 2", className: "h-4 w-6 rounded shadow", children: [
              /* @__PURE__ */ jsx("rect", { width: "3", height: "1", y: "0", fill: "#CE1126" }),
              /* @__PURE__ */ jsx("rect", { width: "3", height: "1", y: "1", fill: "#FFFFFF" })
            ] }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Fragment, { children: mobileOverlayMounted && createPortal(
      /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ease-out motion-reduce:transition-none lg:hidden ${mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`,
            "aria-hidden": !mobileMenuOpen,
            onClick: () => setMobileMenuOpen(false)
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: mobileMenuRef,
            id: "mobile-navigation-drawer",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Main menu",
            className: `fixed top-0 right-0 bottom-0 z-[101] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none sm:max-w-md lg:hidden ${mobileMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"}`,
            style: {
              maxHeight: "100dvh",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              paddingRight: "env(safe-area-inset-right, 0px)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-2", children: [
                /* @__PURE__ */ jsx("img", { src: imageUrl("Vertikal-Black-Mark-Gold.webp"), alt: "Kristalin Logo", className: "h-9 object-contain" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "p-2 text-gray-600 transition-all duration-300 ease-out hover:text-yellow-500",
                    onClick: () => setMobileMenuOpen(false),
                    "aria-label": "Close menu",
                    children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-gray-800 uppercase", children: [
                    t("common.language"),
                    ":"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: `rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${locale === "id" ? "bg-yellow-500 text-white" : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"}`,
                        onClick: () => switchLanguage("id"),
                        children: "ID"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: `rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${locale === "en" ? "bg-yellow-500 text-white" : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"}`,
                        onClick: () => switchLanguage("en"),
                        children: "EN"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: `rounded px-3 py-1 text-sm font-semibold transition-all duration-300 ${locale === "zh" ? "bg-yellow-500 text-white" : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"}`,
                        onClick: () => switchLanguage("zh"),
                        children: "ZH"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-3", children: /* @__PURE__ */ jsxs(
                  "form",
                  {
                    onSubmit: (e) => {
                      e.preventDefault();
                      if (searchQuery.trim() !== "") {
                        router.get("/search", { q: searchQuery.trim() }, { preserveScroll: true });
                        setMobileMenuOpen(false);
                      }
                    },
                    className: "group relative",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-15 blur-[6px] transition-opacity duration-300 group-hover:opacity-25" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm transition-all duration-300 focus-within:border-amber-400 hover:border-amber-300", children: [
                        /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", className: "text-gray-400", children: [
                          /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
                          /* @__PURE__ */ jsx("path", { d: "M20 20l-3.5-3.5", stroke: "currentColor", strokeWidth: "2" })
                        ] }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            value: searchQuery,
                            onChange: (e) => setSearchQuery(e.target.value),
                            placeholder: `${t("common.search")}...`,
                            className: "min-w-0 flex-1 border-none bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            type: "submit",
                            className: "relative inline-flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg min-[380px]:px-5",
                            children: [
                              /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-full" }),
                              /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "mr-0 min-[380px]:mr-2", children: [
                                /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
                                /* @__PURE__ */ jsx("path", { d: "M20 20l-3.5-3.5", stroke: "currentColor", strokeWidth: "2" })
                              ] }),
                              /* @__PURE__ */ jsx("span", { className: "hidden min-[380px]:inline", children: t("common.search") })
                            ]
                          }
                        )
                      ] })
                    ]
                  }
                ) }),
                navigationItems.map((item, index) => {
                  var _a;
                  return /* @__PURE__ */ jsx("div", { className: "mb-2", children: item.hasDropdown ? /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: "group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-semibold text-gray-800 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600",
                        onClick: () => setMobileAboutDropdownOpen(!mobileAboutDropdownOpen),
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                            /* @__PURE__ */ jsx("div", { className: "mr-3 h-2 w-2 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                            /* @__PURE__ */ jsx("span", { children: item.label })
                          ] }),
                          /* @__PURE__ */ jsx(
                            "svg",
                            {
                              className: `h-5 w-5 transition-transform duration-300 ${mobileAboutDropdownOpen ? "rotate-180" : ""}`,
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `mt-2 space-y-1 overflow-hidden transition-all duration-300 ${mobileAboutDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
                        children: (_a = item.dropdownItems) == null ? void 0 : _a.map((dropdownItem, dropdownIndex) => /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: dropdownItem.href,
                            className: "group ml-6 block rounded-lg px-4 py-2 text-sm text-gray-600 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600",
                            onClick: () => setMobileMenuOpen(false),
                            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                              /* @__PURE__ */ jsx("div", { className: "mr-3 h-2 w-2 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                              /* @__PURE__ */ jsx("span", { children: dropdownItem.label })
                            ] })
                          },
                          dropdownIndex
                        ))
                      }
                    )
                  ] }) : item.external ? /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: item.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "group block rounded-lg px-4 py-3 text-base font-semibold text-gray-800 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600",
                      onClick: () => setMobileMenuOpen(false),
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 items-center", children: [
                          /* @__PURE__ */ jsx("div", { className: "mr-3 h-2 w-2 shrink-0 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                          /* @__PURE__ */ jsx("span", { className: "min-w-0 leading-snug", children: item.label })
                        ] }),
                        /* @__PURE__ */ jsx(
                          "svg",
                          {
                            className: "h-4 w-4 shrink-0 text-amber-600/80",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            strokeWidth: 2,
                            "aria-hidden": true,
                            children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" })
                          }
                        )
                      ] })
                    }
                  ) : /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: item.href,
                      className: "group block rounded-lg px-4 py-3 text-base font-semibold text-gray-800 uppercase transition-all duration-300 hover:bg-amber-50 hover:text-amber-600",
                      onClick: () => setMobileMenuOpen(false),
                      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "mr-3 h-2 w-2 rounded-full bg-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                        /* @__PURE__ */ jsx("span", { children: item.label })
                      ] })
                    }
                  ) }, index);
                })
              ] })
            ]
          }
        )
      ] }),
      document.body
    ) })
  ] });
}
export {
  Footer as F,
  Header as H
};

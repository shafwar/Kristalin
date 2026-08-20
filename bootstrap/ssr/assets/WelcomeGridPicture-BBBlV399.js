import { jsxs, jsx } from "react/jsx-runtime";
import { u as useNetworkProfile } from "./useNetworkProfile-BaMceDYv.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
const DIR = "/kristalin-assets/public";
const WELCOME_GRID_INTRINSIC = {
  directorshero: { width: 1280, height: 1280 },
  portofolio: { width: 1280, height: 720 },
  businessactivity: { width: 1280, height: 853 }
};
function f(id, w, ext) {
  return `${DIR}/${id}-${w}w.${ext}`;
}
function bundleFor(id, widths, sizes, jpgFallbackW) {
  const avif = widths.map((w) => `${f(id, w, "avif")} ${w}w`).join(", ");
  const webp = widths.map((w) => `${f(id, w, "webp")} ${w}w`).join(", ");
  const jpg = widths.map((w) => `${f(id, w, "jpg")} ${w}w`).join(", ");
  return {
    avifSrcSet: avif,
    webpSrcSet: webp,
    jpgSrcSet: jpg,
    jpgFallback: f(id, jpgFallbackW, "jpg"),
    sizes
  };
}
function getWelcomeGridBundle(id, tier, options) {
  const cap = options == null ? void 0 : options.maxWidth;
  let widths;
  let sizes;
  let jpgFallbackW;
  if (tier === "minimal") {
    if (options == null ? void 0 : options.lcpHero) {
      widths = [640, 960];
      sizes = "(max-width: 1023px) 100vw, 50vw";
      jpgFallbackW = 960;
    } else {
      widths = [640];
      sizes = "(max-width: 1023px) 96vw, 48vw";
      jpgFallbackW = 640;
    }
  } else if (tier === "conserve") {
    widths = [640, 960];
    sizes = "(max-width: 1023px) 98vw, 50vw";
    jpgFallbackW = 960;
  } else {
    widths = [640, 960, 1280];
    sizes = "(max-width: 1023px) 100vw, 50vw";
    jpgFallbackW = 1280;
  }
  if (cap) {
    widths = widths.filter((w) => w <= cap);
    if (widths.length === 0) widths = [640];
    jpgFallbackW = widths[widths.length - 1];
  }
  return bundleFor(id, widths, sizes, jpgFallbackW);
}
function legacyGridJpg(id) {
  return imageUrl(`${id}.jpg`);
}
function WelcomeGridPicture({
  imageId,
  alt,
  className,
  pictureClassName,
  style,
  sizes: sizesOverride,
  loading = "lazy",
  fetchPriority = "low",
  decoding = "async",
  bundleOptions
}) {
  const { imageTier } = useNetworkProfile();
  const bundle = getWelcomeGridBundle(imageId, imageTier, bundleOptions);
  const sizes = sizesOverride ?? bundle.sizes;
  const { width, height } = WELCOME_GRID_INTRINSIC[imageId];
  const handleError = (e) => {
    const el = e.currentTarget;
    if (!el.dataset.fallbackTried) {
      el.dataset.fallbackTried = "1";
      el.removeAttribute("srcset");
      el.src = legacyGridJpg(imageId);
      return;
    }
    el.style.display = "none";
  };
  return /* @__PURE__ */ jsxs("picture", { className: pictureClassName, children: [
    /* @__PURE__ */ jsx("source", { type: "image/avif", srcSet: bundle.avifSrcSet, sizes }),
    /* @__PURE__ */ jsx("source", { type: "image/webp", srcSet: bundle.webpSrcSet, sizes }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: bundle.jpgFallback,
        srcSet: bundle.jpgSrcSet,
        sizes,
        width,
        height,
        alt,
        className: className ?? "h-full w-full object-cover",
        style,
        loading,
        decoding,
        fetchPriority,
        onError: handleError
      }
    )
  ] });
}
export {
  WelcomeGridPicture as W
};

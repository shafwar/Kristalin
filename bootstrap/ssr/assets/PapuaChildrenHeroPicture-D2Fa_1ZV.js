import { jsxs, jsx } from "react/jsx-runtime";
import { u as useNetworkProfile } from "./useNetworkProfile-BaMceDYv.js";
import { i as imageUrl } from "./assets-CvOUY0DF.js";
const DIR = "/kristalin-assets/public";
function papuaHeroFile(name) {
  return `${DIR}/${name}`;
}
const PAPUA_HERO_WIDTH = 1600;
const PAPUA_HERO_HEIGHT = 1121;
const papuaHeroResponsive = {
  avifSrcSet: `${papuaHeroFile("papua-children-hero-640w.avif")} 640w, ${papuaHeroFile("papua-children-hero-960w.avif")} 960w, ${papuaHeroFile("papua-children-hero-1280w.avif")} 1280w`,
  webpSrcSet: `${papuaHeroFile("papua-children-hero-640w.webp")} 640w, ${papuaHeroFile("papua-children-hero-960w.webp")} 960w, ${papuaHeroFile("papua-children-hero-1280w.webp")} 1280w`,
  jpgSrcSet: `${papuaHeroFile("papua-children-hero-640w.jpg")} 640w, ${papuaHeroFile("papua-children-hero-960w.jpg")} 960w, ${papuaHeroFile("papua-children-hero-1280w.jpg")} 1280w`,
  jpgFallback: papuaHeroFile("papua-children-hero-1280w.jpg"),
  jpgBackground: papuaHeroFile("papua-children-hero-1280w.jpg"),
  legacyPng: imageUrl("papua-children.png")
};
function getPapuaHeroBundle(tier) {
  const f = papuaHeroFile;
  if (tier === "minimal") {
    return {
      avifSrcSet: `${f("papua-children-hero-640w.avif")} 640w`,
      webpSrcSet: `${f("papua-children-hero-640w.webp")} 640w`,
      jpgSrcSet: `${f("papua-children-hero-640w.jpg")} 640w`,
      jpgFallback: f("papua-children-hero-640w.jpg"),
      sizes: "(max-width: 1023px) 92vw, 46vw"
    };
  }
  if (tier === "conserve") {
    return {
      avifSrcSet: `${f("papua-children-hero-640w.avif")} 640w, ${f("papua-children-hero-960w.avif")} 960w`,
      webpSrcSet: `${f("papua-children-hero-640w.webp")} 640w, ${f("papua-children-hero-960w.webp")} 960w`,
      jpgSrcSet: `${f("papua-children-hero-640w.jpg")} 640w, ${f("papua-children-hero-960w.jpg")} 960w`,
      jpgFallback: f("papua-children-hero-960w.jpg"),
      sizes: "(max-width: 1023px) 96vw, 48vw"
    };
  }
  return {
    avifSrcSet: papuaHeroResponsive.avifSrcSet,
    webpSrcSet: papuaHeroResponsive.webpSrcSet,
    jpgSrcSet: papuaHeroResponsive.jpgSrcSet,
    jpgFallback: papuaHeroResponsive.jpgFallback,
    sizes: "(max-width: 1023px) 100vw, 50vw"
  };
}
function papuaBackgroundForTier(tier) {
  if (tier === "minimal") return papuaHeroFile("papua-children-hero-640w.jpg");
  if (tier === "conserve") return papuaHeroFile("papua-children-hero-960w.jpg");
  return papuaHeroResponsive.jpgBackground;
}
function PapuaChildrenHeroPicture({
  alt,
  className,
  pictureClassName,
  style,
  sizes: sizesProp,
  loading = "eager",
  fetchPriority = "high",
  onError
}) {
  const { imageTier } = useNetworkProfile();
  const bundle = getPapuaHeroBundle(imageTier);
  const sizes = sizesProp ?? bundle.sizes;
  const handleError = (e) => {
    const el = e.currentTarget;
    if (!el.dataset.fallbackTried) {
      el.dataset.fallbackTried = "1";
      el.removeAttribute("srcset");
      el.src = papuaHeroResponsive.legacyPng;
      return;
    }
    onError == null ? void 0 : onError(e);
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
        width: PAPUA_HERO_WIDTH,
        height: PAPUA_HERO_HEIGHT,
        alt,
        className: className ?? "h-full w-full object-cover",
        style,
        loading,
        decoding: "async",
        fetchPriority,
        onError: handleError
      }
    )
  ] });
}
export {
  PapuaChildrenHeroPicture as P,
  papuaBackgroundForTier as p
};

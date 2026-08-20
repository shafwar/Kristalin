const CDN_BASE = "https://cdn.kristalin.co.id";
let assetBase = "/images".replace(/\/+$/, "");
if (assetBase.includes("cdn.kristalin.co.id") && assetBase.endsWith("/images")) {
  assetBase = assetBase.replace(/\/images$/i, "");
}
const assetPrefix = "public".replace(/^\/+|\/+$/g, "");
function imageUrl(path) {
  const normalizedPath = path.replace(/^\/+/, "");
  const needsPrefix = assetPrefix !== "" && !normalizedPath.startsWith(`${assetPrefix}/`);
  const objectPath = needsPrefix ? `${assetPrefix}/${normalizedPath}` : normalizedPath;
  const encodedPath = objectPath.split("/").map((segment) => {
    let encoded = encodeURIComponent(segment);
    encoded = encoded.replace(/\(/g, "%28").replace(/\)/g, "%29");
    return encoded;
  }).join("/");
  const useBase = assetBase.startsWith(CDN_BASE) && !assetBase.endsWith("/images") ? assetBase : CDN_BASE;
  return `${useBase}/${encodedPath}`;
}
function getArticleImageUrl(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith(CDN_BASE + "/")) return trimmed;
  if (trimmed.startsWith("http") && trimmed.includes("/images/public/")) {
    try {
      const u = new URL(trimmed);
      const pathPart = u.pathname.replace(/^\//, "").replace(/^images\/public\//, "");
      const filename = pathPart.replace(/^public\//, "");
      return imageUrl("/" + filename);
    } catch {
      return imageUrl(trimmed);
    }
  }
  if (trimmed.startsWith("http")) return trimmed;
  return imageUrl(trimmed);
}
export {
  getArticleImageUrl as g,
  imageUrl as i
};

import { usePage } from "@inertiajs/react";
function useTranslation() {
  const page = usePage();
  const props = (page == null ? void 0 : page.props) || {};
  const locale = (props == null ? void 0 : props.locale) || "en";
  const translations = (props == null ? void 0 : props.translations) || { messages: {}, pages: {} };
  const messages = (translations == null ? void 0 : translations.messages) || {};
  const pageTranslations = (translations == null ? void 0 : translations.pages) ?? messages;
  const t = (key, options) => {
    if (!key) return "";
    const keys = key.split(".");
    let value = messages;
    if (keys[0] === "pages") {
      value = pageTranslations;
      keys.shift();
    }
    for (const k of keys) {
      value = value == null ? void 0 : value[k];
    }
    let result = value !== void 0 && value !== null ? value : key;
    const replaceMap = options && "returnObjects" in options ? options.replace : options;
    if (replaceMap && typeof result === "string") {
      Object.keys(replaceMap).forEach((replaceKey) => {
        result = result.replace(new RegExp(`:${replaceKey}`, "g"), replaceMap[replaceKey]);
      });
    }
    return result;
  };
  const switchLanguage = (newLocale) => {
    if (typeof window !== "undefined") {
      window.location.href = `/language/${newLocale}`;
    }
  };
  const getCurrentLanguageCode = () => {
    switch (locale) {
      case "id":
        return "ID";
      case "en":
        return "EN";
      case "zh":
        return "ZH";
      default:
        return "EN";
    }
  };
  const getAvailableLanguages = () => [
    { code: "id", label: "ID", name: t("languages.id") },
    { code: "en", label: "EN", name: t("languages.en") },
    { code: "zh", label: "ZH", name: t("languages.zh") }
  ];
  return {
    t,
    locale,
    switchLanguage,
    getCurrentLanguageCode,
    getAvailableLanguages,
    translations: translations.messages
  };
}
export {
  useTranslation as u
};

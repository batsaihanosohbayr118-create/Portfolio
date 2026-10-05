import { createContext, useContext, useEffect, useState } from "react";
import translations from "./translations";

const STORAGE_KEY = "portfolio-lang";

const LanguageContext = createContext(null);

const readStoredLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "mn" ? stored : "mn";
  } catch {
    return "mn";
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage may be unavailable (private mode); the choice just won't persist.
    }
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "mn" ? "en" : "mn"));

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);

// Pick the localized field of a data record, e.g. localized(project, "title", "en") -> titleEn.
// eslint-disable-next-line react-refresh/only-export-components
export const localized = (record, field, lang) =>
  lang === "en" ? record[`${field}En`] ?? record[field] : record[field];

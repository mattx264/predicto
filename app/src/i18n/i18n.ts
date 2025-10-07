// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const savedLanguage = localStorage.getItem("language") || "pl";

i18n.use(initReactI18next).init({
  resources: {
    pl: {
      translation: pl,
    },
    en: {
      translation: en,
    },
  },
  lng: savedLanguage,
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

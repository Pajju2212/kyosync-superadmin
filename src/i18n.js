import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
// Ensure these files exist in src/i18n/ folder as implied by your imports
import en from "./i18n/en.json"; 
import kr from "./i18n/kr.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      kr: { translation: kr }
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
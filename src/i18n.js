import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // language detection plugin
import HttpApi from "i18next-http-backend"; // to load translation resources
import AR from "./locale/ar.json";
import EN  from "./locale/en.json"

i18n
  .use(initReactI18next) //passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ], // from where the user language should be detected
      caches: ["cookie"], // where to cache user language
    },
    resources: {
      en: {
        translation: EN
      }, 
      ar: {
        translation: AR
      }
    },
  });


  export default i18n;


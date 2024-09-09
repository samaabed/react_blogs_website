import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // language detection plugin
import HttpApi from "i18next-http-backend"; // to load translation resources

i18n
  .use(initReactI18next) //passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // lng: "ar", // if you're using a language detector, do not define the lng option
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
    //FIX:
    backend: { 
      loadPath: "http://localhost:3000/{{lng}}"
      // loadPath: "/locale/{{lng}}/translation.json", // path to load resources (translations)
    },
    // //FIX
    // ns: ['common', 'home'], // namespaces to load
    // defaultNS: 'common',
  });


  export default i18n;


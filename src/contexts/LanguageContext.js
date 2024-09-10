import { createContext } from "react";
import Cookies from "js-cookie"; 

const cachedLang = Cookies.get("i18next") || "en";

const LanguageContext = createContext(cachedLang);

export default LanguageContext;
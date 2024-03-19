import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json"

const resources = {
    en: {
        translation: en
    },
    ru: {
        translation: ru
    }
};

i18n
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        // fallbackLng: "en",
        debug: true,
        lng: localStorage.language ?? "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
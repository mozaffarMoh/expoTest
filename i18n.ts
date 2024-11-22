import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization';

import translationEN from "./locales/en.json";
import translationAR from "./locales/ar.json";

i18n
  .use(initReactI18next) // Connect i18next with React
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    lng: Localization.locale.split('-')[0], // Set default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React already escapes values
  });


export default i18n;

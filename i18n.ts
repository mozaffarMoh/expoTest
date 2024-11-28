import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Or use SecureStore if preferred

import translationEN from "./locales/en.json";
import translationAR from "./locales/ar.json";
import { I18nManager } from "react-native";

// Load the stored language preference
const getStoredLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem('language');
    return storedLanguage || Localization.locale.split('-')?.[0]; // Default to device locale if no preference is stored
  } catch (error) {
    console.error("Error fetching stored language: ", error);
    return Localization.locale.split('-')?.[0]; // Fallback to device locale
  }
};

// Initialize i18n
getStoredLanguage().then((language) => {
  i18n
    .use(initReactI18next) // Connect i18next with React
    .init({
      resources: {
        en: { translation: translationEN },
        ar: { translation: translationAR },
      },
      lng: language, // Set language dynamically
      fallbackLng: 'ar', // Fallback to Arabic if language detection fails
      interpolation: { escapeValue: false }, // React already escapes values
    });
});

export default i18n;

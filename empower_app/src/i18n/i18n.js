import i18next from 'i18next/index.js';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from './locales/en.json';
import ml from './locales/ml.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    try {
      const storedLang = await AsyncStorage.getItem('appLanguage');
      if (storedLang) {
        callback(storedLang);
      } else {
        const locales = RNLocalize.getLocales();
        callback(locales[0].languageTag.startsWith('ml') ? 'ml' : 'en');
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en'); // Default to English
    }
  },
  init: () => {},
  cacheUserLanguage: async lng => {
    try {
      await AsyncStorage.setItem('appLanguage', lng);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: en},
      ml: {translation: ml},
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18next;

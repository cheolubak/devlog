import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LANGUAGES = ['ko', 'en'] as const;
export const FALLBACK_LANGUAGE = 'en';
export const I18N_STORAGE_KEY = 'i18nextLng';

i18n.use(initReactI18next).init({
  lng: FALLBACK_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: {} },
    ko: { translation: {} },
  },
  supportedLngs: SUPPORTED_LANGUAGES,
});

export default i18n;

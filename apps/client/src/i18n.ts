import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from 'i18n.constants';
import i18n from 'i18next';
import en from 'locales/en.json';
import ko from 'locales/ko.json';
import { initReactI18next } from 'react-i18next';

export {
  FALLBACK_LANGUAGE,
  I18N_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from 'i18n.constants';

i18n.use(initReactI18next).init({
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  lng: FALLBACK_LANGUAGE,
  resources: {
    en: { translation: en },
    ko: { translation: ko },
  },
  supportedLngs: SUPPORTED_LANGUAGES,
});

export default i18n;

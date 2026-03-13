'use client';

import 'i18n';

import type { ReactNode } from 'react';

import i18n, {
  FALLBACK_LANGUAGE,
  I18N_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from 'i18n';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
  initialLang: string;
}

function detectLanguage(): string {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);

  if (stored && (SUPPORTED_LANGUAGES as readonly string[]).includes(stored)) {
    return stored;
  }

  const browserLang = navigator.language?.split('-')[0];

  if (
    browserLang &&
    (SUPPORTED_LANGUAGES as readonly string[]).includes(browserLang)
  ) {
    return browserLang;
  }

  return FALLBACK_LANGUAGE;
}

function setLangCookie(lng: string) {
  document.cookie = `${I18N_STORAGE_KEY}=${lng};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
}

export const I18nProvider = ({ children, initialLang }: I18nProviderProps) => {
  if (i18n.language !== initialLang) {
    i18n.changeLanguage(initialLang);
  }

  useEffect(() => {
    const detected = detectLanguage();

    if (i18n.language !== detected) {
      i18n.changeLanguage(detected);
    }

    setLangCookie(i18n.language);

    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem(I18N_STORAGE_KEY, lng);
      setLangCookie(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

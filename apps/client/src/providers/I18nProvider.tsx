'use client';

import 'i18n';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import i18n, {
  FALLBACK_LANGUAGE,
  I18N_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from 'i18n';
import { I18nextProvider } from 'react-i18next';

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

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {
    const detected = detectLanguage();

    if (i18n.language !== detected) {
      i18n.changeLanguage(detected);
    }

    const handleLanguageChanged = (lng: string) => {
      localStorage.setItem(I18N_STORAGE_KEY, lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

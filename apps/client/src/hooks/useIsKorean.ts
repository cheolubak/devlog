'use client';

import { useTranslation } from 'react-i18next';

export function useIsKorean(): boolean {
  const { i18n } = useTranslation();

  return i18n.language === 'ko';
}

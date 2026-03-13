'use client';

import { useTranslation } from 'react-i18next';

export const useTranslateText = () => {
  const { t } = useTranslation();

  return t;
};

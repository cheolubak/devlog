'use client';

import { Button, Icon } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import styles from './LanguageMenu.module.css';

export const LanguageMenu = () => {
  const pathname = usePathname();
  const { event } = useAnalytics();

  const { i18n } = useTranslation();

  const disabledSearch = pathname === 'mypage' || pathname === '/channels';

  if (disabledSearch) {
    return null;
  }

  const handleToggleLanguage = () => {
    const language = i18n.language === 'en' ? 'ko' : 'en';

    i18n.changeLanguage(language);

    event('language_toggle', {
      language,
    });
  };

  return (
    <Button
      className={styles.languageMenu}
      onClick={handleToggleLanguage}
      variant='outline'
    >
      <Icon
        color='var(--color-white)'
        name='language'
      />
      {i18n.language === 'en' ? 'English' : '한국어'}
    </Button>
  );
};

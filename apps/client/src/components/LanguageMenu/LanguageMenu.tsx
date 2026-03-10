'use client';

import { Button, Icon } from '@devlog/components';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import styles from './LanguageMenu.module.css';

export const LanguageMenu = () => {
  const pathname = usePathname();

  const { i18n } = useTranslation();

  const disabledSearch = pathname === 'mypage' || pathname === '/channels';

  if (disabledSearch) {
    return null;
  }

  return (
    <Button
      className={styles.languageMenu}
      onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en')}
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

'use client';

import { Button, Icon } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import { cn } from '@devlog/utils';
import { LogClick } from 'components/LogClick';
import { useTranslateText } from 'hooks/useTranslateText';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const LanguageMenu = () => {
  const pathname = usePathname();
  const { event } = useAnalytics();

  const { i18n } = useTranslation();
  const translateText = useTranslateText();

  const disabledSearch = pathname === '/mypage' || pathname === '/channels';

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
    <LogClick
      eventName='language_toggle'
      params={{ language: i18n.language }}
    >
      <Button
        className={cn('border-white !text-white w-[120px]')}
        onClick={handleToggleLanguage}
        variant='outline'
      >
        <Icon
          color='var(--color-white)'
          name='language'
        />
        {translateText('common.language')}
      </Button>
    </LogClick>
  );
};

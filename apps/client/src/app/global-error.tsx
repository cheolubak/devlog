'use client';

import { Button, Typography } from '@devlog/components';
import * as Sentry from '@sentry/nextjs';
import { useTranslateText } from 'hooks/useTranslateText';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslateText();

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const handleClick = () => {
    if (pathname === '/') {
      return reset();
    }

    router.replace('/');
  };

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <Typography
        className='text-white'
        variants='display-large'
      >
        {t('error.title')}
      </Typography>
      <Typography className='text-center text-white'>
        {t('error.message')}
      </Typography>
      <Button onClick={handleClick}>
        {pathname === '/' ? t('error.retry') : t('error.toHome')}
      </Button>
    </div>
  );
}

'use client';

import { Button, Typography } from '@devlog/components';
import { useTranslateText } from 'hooks/useTranslateText';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslateText();

  return (
    <div className='flex h-[calc(100dvh-160px)] w-full flex-col items-center justify-center gap-4'>
      <Typography
        className='text-white'
        variants='display-large'
      >
        404
      </Typography>
      <Typography className='text-center text-white'>
        {t('notFound.message')}
      </Typography>
      <Button onClick={() => router.replace('/')}>
        {t('error.toHome')}
      </Button>
    </div>
  );
}

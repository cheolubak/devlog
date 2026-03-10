'use client';

import { Button, Typography } from '@devlog/components';
import * as Sentry from '@sentry/nextjs';
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
        Ooooooooooops!!
      </Typography>
      <Button onClick={handleClick}>
        {pathname === '/' ? 'Try Again' : 'HOME'}
      </Button>
    </div>
  );
}

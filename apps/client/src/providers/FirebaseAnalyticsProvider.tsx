'use client';

import { useAnalytics } from '@devlog/hooks';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const FirebaseAnalyticsProvider = () => {
  const { eventPageView } = useAnalytics();

  const pathname = usePathname();

  useEffect(() => {
    eventPageView(pathname);
  }, [pathname]);

  return null;
};

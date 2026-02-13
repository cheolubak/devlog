'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useAnalytics } from '@/hooks/useAnalytics';

export const FirebaseAnalyticsProvider = () => {
  const { eventPageView } = useAnalytics();

  const pathname = usePathname();

  useEffect(() => {
    eventPageView(pathname);
  }, [pathname]);

  return null;
};

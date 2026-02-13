'use client';

import { type Analytics, getAnalytics, logEvent } from 'firebase/analytics';
import { useEffect, useRef } from 'react';

import type { PostList } from '@/packages/domains';

import firebaseApp from '@/packages/configs/firebase';

export const useAnalytics = () => {
  const analytics = useRef<Analytics | null>(null);

  useEffect(() => {
    analytics.current = getAnalytics(firebaseApp);
  }, []);

  const handlePageView = (pathname: string) => {
    if (!analytics.current) return;
    logEvent(analytics.current, 'page_view', {
      firebase_screen: pathname,
    });
  };

  const handleSelectContent = (post: PostList) => {
    if (!analytics.current) return;
    logEvent(analytics.current, 'select_content', {
      content_type: 'post',
      description: post.description,
      item_id: post.id,
      name: post.title,
    });
  };

  return {
    eventPageView: handlePageView,
    eventSelectContent: handleSelectContent,
  };
};

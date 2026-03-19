'use client';

import type { PostList } from '@devlog/domains';
import type { Analytics, logEvent as LogEventFn } from 'firebase/analytics';

import firebaseApp from '@devlog/firebase-config';
import { fetchApi } from '@devlog/request';
import { useEffect, useRef } from 'react';

const getAnalyticsModule = () => import('firebase/analytics');

export const useAnalytics = () => {
  const analytics = useRef<Analytics | null>(null);
  const logEventFn = useRef<typeof LogEventFn | null>(null);

  useEffect(() => {
    if (!firebaseApp) return;

    getAnalyticsModule()
      .then(({ getAnalytics, logEvent }) => {
        analytics.current = getAnalytics(firebaseApp!);
        logEventFn.current = logEvent;
      })
      .catch(() => {
        // Firebase Analytics unavailable
      });
  }, []);

  const handleLogin = (
    type: 'github' | 'google' | 'kakao' | 'naver',
  ) => {
    if (!analytics.current || !logEventFn.current) return;
    logEventFn.current(analytics.current, 'login', { content_type: type });
  };

  const handlePageView = (pathname: string) => {
    if (!analytics.current || !logEventFn.current) return;
    logEventFn.current(analytics.current, 'page_view', {
      firebase_screen: pathname,
    });
  };

  const handleEvent = (
    eventName: string,
    args?: Record<string, string | number | boolean>,
  ) => {
    if (!analytics.current || !logEventFn.current) return;
    logEventFn.current(analytics.current, eventName, args);
  };

  const handleSelectContent = (post: PostList) => {
    if (!analytics.current || !logEventFn.current) return;
    logEventFn.current(analytics.current, 'select_content', {
      content_type: 'post',
      description: post.description,
      item_id: post.id,
      name: post.title,
    });
  };

  const handleBookmark = (post: PostList) => {
    if (!analytics.current || !logEventFn.current) return;
    logEventFn.current(analytics.current, 'bookmark', {
      description: post.description,
      item_id: post.id,
      name: post.title,
    });
  };

  const handleSetSession = async () => {
    if (!analytics.current) return;

    const [{ setUserProperties }, { session }] = await Promise.all([
      getAnalyticsModule(),
      fetchApi.get<{ session: string }>('/session'),
    ]);

    setUserProperties(analytics.current, {
      session_id: session,
    });
  };

  return {
    event: handleEvent,
    eventBookmark: handleBookmark,
    eventLogin: handleLogin,
    eventPageView: handlePageView,
    eventSelectContent: handleSelectContent,
    setSession: handleSetSession,
  };
};

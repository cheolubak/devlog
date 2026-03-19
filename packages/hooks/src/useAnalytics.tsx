'use client';

import type { PostList } from '@devlog/domains';
import type { Analytics } from 'firebase/analytics';

import firebaseApp from '@devlog/firebase-config';
import { fetchApi } from '@devlog/request';
import { useEffect, useRef } from 'react';

const getAnalyticsModule = () => import('firebase/analytics');

export const useAnalytics = () => {
  const analytics = useRef<Analytics | null>(null);

  useEffect(() => {
    if (!firebaseApp) return;

    getAnalyticsModule()
      .then(({ getAnalytics }) => {
        analytics.current = getAnalytics(firebaseApp!);
      })
      .catch(() => {
        // Firebase Analytics unavailable
      });
  }, []);

  const handleLogin = async (
    type: 'github' | 'google' | 'kakao' | 'naver',
  ) => {
    if (!analytics.current) return;

    const { logEvent } = await getAnalyticsModule();
    logEvent(analytics.current, 'login', { content_type: type });
  };

  const handlePageView = async (pathname: string) => {
    if (!analytics.current) return;

    const { logEvent } = await getAnalyticsModule();
    logEvent(analytics.current, 'page_view', {
      firebase_screen: pathname,
    });
  };

  const handleEvent = async (
    eventName: string,
    args?: Record<string, any>,
  ) => {
    if (!analytics.current) return;

    const { logEvent } = await getAnalyticsModule();
    logEvent(analytics.current, eventName, args);
  };

  const handleSelectContent = async (post: PostList) => {
    if (!analytics.current) return;

    const { logEvent } = await getAnalyticsModule();
    logEvent(analytics.current, 'select_content', {
      content_type: 'post',
      description: post.description,
      item_id: post.id,
      name: post.title,
    });
  };

  const handleBookmark = async (post: PostList) => {
    if (!analytics.current) return;

    const { logEvent } = await getAnalyticsModule();
    logEvent(analytics.current, 'bookmark', {
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

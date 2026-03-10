'use client';

import type { PostList } from '@devlog/domains';

import firebaseApp from '@devlog/firebase-config';
import { fetchApi } from '@devlog/request';
import {
  type Analytics,
  getAnalytics,
  logEvent,
  setUserProperties,
} from 'firebase/analytics';
import { useEffect, useRef } from 'react';

export const useAnalytics = () => {
  const analytics = useRef<Analytics | null>(null);

  useEffect(() => {
    analytics.current = getAnalytics(firebaseApp);
  }, []);

  const handleLogin = (type: 'github' | 'google' | 'kakao' | 'naver') => {
    if (!analytics.current) {
      return;
    }

    logEvent(analytics.current, 'login', {
      content_type: type,
    });
  };

  const handlePageView = (pathname: string) => {
    if (!analytics.current) {
      return;
    }

    logEvent(analytics.current, 'page_view', {
      firebase_screen: pathname,
    });
  };

  const handleSelectContent = (post: PostList) => {
    if (!analytics.current) {
      return;
    }

    logEvent(analytics.current, 'select_content', {
      content_type: 'post',
      description: post.description,
      item_id: post.id,
      name: post.title,
    });
  };

  const handleBookmark = (post: PostList) => {
    if (!analytics.current) {
      return;
    }

    logEvent(analytics.current, 'select_content', {
      content_type: 'bookmark',
      description: post.description,
      item_id: post.id,
      name: post.title,
    });
  };

  const handleSetSession = async () => {
    if (!analytics.current) {
      return;
    }

    const { session } = await fetchApi.get<{ session: string }>('/session');

    setUserProperties(analytics.current, {
      session_id: session,
    });
  };

  return {
    eventBookmark: handleBookmark,
    eventLogin: handleLogin,
    eventPageView: handlePageView,
    eventSelectContent: handleSelectContent,
    setSession: handleSetSession,
  };
};

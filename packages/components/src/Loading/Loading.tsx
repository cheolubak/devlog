'use client';

import { loadingStore } from '@devlog/stores';
import { useAtomValue } from 'jotai';
import lottie from 'lottie-web/build/player/lottie_light';
import { useEffect, useRef } from 'react';

import { Overlay } from '../Overlay';

export const Loading = () => {
  const loadings = useAtomValue(loadingStore);

  const showLoading = loadings.length > 0;

  if (!showLoading) {
    return null;
  }

  return (
    <>
      <Overlay />
      <LoadingIndicator />
    </>
  );
};

export const LoadingIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<ReturnType<(typeof lottie)['loadAnimation']>>(null);

  useEffect(() => {
    if (!indicatorRef.current) {
      return;
    }

    lottieRef.current = lottie.loadAnimation({
      animationData: require('./loading.json'),
      autoplay: true,
      container: indicatorRef.current,
      loop: true,
      renderer: 'svg',
    });

    return () => {
      lottieRef.current?.destroy();
    };
  }, []);

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1000 w-[200px] h-[200px]"
      ref={indicatorRef}
    />
  );
};

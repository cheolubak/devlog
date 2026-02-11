'use client';

import type { PropsWithChildren } from 'react';

import { useEffect, useRef } from 'react';

interface InfiniteScrollProps extends PropsWithChildren {
  fetchNext: () => void;
  hasNext: boolean;
  isFetching: boolean;
}

export const InfiniteScroll = ({
  children,
  fetchNext,
  hasNext,
  isFetching,
}: InfiniteScrollProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((x) => x.isIntersecting) && hasNext && !isFetching) {
        fetchNext();
      }
    });

    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {children}
      <div ref={triggerRef} />
    </>
  );
};

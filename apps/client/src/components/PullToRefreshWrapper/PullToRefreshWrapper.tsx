'use client';

import type { ComponentType, PropsWithChildren } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PullToRefreshWrapperProps extends PropsWithChildren {}

export const PullToRefreshWrapper = ({
  children,
}: PullToRefreshWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [PullToRefreshComponent, setPullToRefreshComponent] =
    useState<ComponentType<any> | null>(null);

  const isPullable =
    pathname === '/' ||
    pathname.includes('/channels') ||
    pathname === '/mypage/bookmarks';

  useEffect(() => {
    if (!isPullable) return;

    import('react-simple-pull-to-refresh').then((mod) => {
      setPullToRefreshComponent(() => mod.default);
    });
  }, [isPullable]);

  if (!isPullable || !PullToRefreshComponent) {
    return <>{children}</>;
  }

  return (
    <PullToRefreshComponent
      isPullable={isPullable}
      onRefresh={async () => router.refresh()}
      pullingContent=''
    >
      {children}
    </PullToRefreshComponent>
  );
};

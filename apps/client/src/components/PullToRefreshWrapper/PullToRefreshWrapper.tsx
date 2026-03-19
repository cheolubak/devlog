'use client';

import type { ComponentType, PropsWithChildren, ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PullToRefreshComponentProps {
  children?: ReactNode;
  isPullable?: boolean;
  onRefresh: () => Promise<void>;
  pullingContent?: ReactNode;
}

interface PullToRefreshWrapperProps extends PropsWithChildren {}

export const PullToRefreshWrapper = ({
  children,
}: PullToRefreshWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [PullToRefreshComponent, setPullToRefreshComponent] =
    useState<ComponentType<PullToRefreshComponentProps> | null>(null);

  const isPullable =
    pathname === '/' ||
    pathname.includes('/channels') ||
    pathname === '/mypage/bookmarks';

  useEffect(() => {
    if (!isPullable) return;

    import('react-simple-pull-to-refresh')
      .then((mod) => {
        setPullToRefreshComponent(
          () => mod.default as ComponentType<PullToRefreshComponentProps>,
        );
      })
      .catch(console.error);
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

'use client';

import type { PropsWithChildren } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import PullToRefresh from 'react-simple-pull-to-refresh';

interface PullToRefreshWrapperProps extends PropsWithChildren {}

export const PullToRefreshWrapper = ({
  children,
}: PullToRefreshWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRefresh = async () => {
    router.refresh();
  };

  const isPullable =
    pathname === '/' ||
    pathname.includes('/channels') ||
    pathname === '/mypage/bookmarks';

  return (
    <PullToRefresh
      isPullable={isPullable}
      onRefresh={handleRefresh}
      pullingContent=''
    >
      {children}
    </PullToRefresh>
  );
};

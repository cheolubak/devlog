'use client';

import type { PropsWithChildren } from 'react';

import { useRouter } from 'next/navigation';
import PullToRefresh from 'react-simple-pull-to-refresh';

interface PullToRefreshWrapperProps extends PropsWithChildren {}

export const PullToRefreshWrapper = ({
  children,
}: PullToRefreshWrapperProps) => {
  const router = useRouter();

  const handleRefresh = async () => {
    router.refresh();
  };

  return <PullToRefresh onRefresh={handleRefresh}>{children}</PullToRefresh>;
};

import type { PropsWithChildren } from 'react';

import { cn } from '@devlog/utils';

interface PolicyLayoutProps extends PropsWithChildren {}

export const PolicyLayout = ({ children }: PolicyLayoutProps) => {
  return (
    <main
      className={cn(
        'py-6 md:py-10 px-4 md:px-10',
        'text-white flex flex-col gap-6',
      )}
    >
      {children}
    </main>
  );
};

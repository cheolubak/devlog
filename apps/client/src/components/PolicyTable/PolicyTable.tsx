import type { PropsWithChildren } from 'react';

import { cn } from '@devlog/utils';

interface PolicyTableProps extends PropsWithChildren {}

export const PolicyTable = ({ children }: PolicyTableProps) => {
  return (
    <div className={cn('overflow-x-auto')}>
      <table
        className={cn(
          'border-collapse border-y-2 border-y-white text-sm',
          '[&_tr_th]:py-3 [&_tr_th]:px-6 [&_tr_th]:whitespace-nowrap',
          '[&_thead_tr]:border-b [&_thead_tr]:border-b-white',
        )}
      >
        {children}
      </table>
    </div>
  );
};

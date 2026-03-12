import { cn } from '@devlog/utils';
import { Suspense } from 'react';

import { HeaderSearch } from '../HeaderSearch';
import { LanguageMenu } from '../LanguageMenu';

export const HeaderMenu = () => {
  return (
    <div
      className={cn(
        'flex flex-1 justify-end items-center gap-2',
        'overflow-hidden transition-transform',
      )}
    >
      <LanguageMenu />
      <Suspense>
        <HeaderSearch />
      </Suspense>
    </div>
  );
};

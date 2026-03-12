import type { ComponentProps } from 'react';

import { cn } from '@devlog/utils';

interface OverlayProps extends ComponentProps<'div'> {}

export const Overlay = ({ className, ...props }: OverlayProps) => {
  return (
    <div
      {...props}
      className={cn(
        'fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-1000',
        className,
      )}
    />
  );
};

import type { ComponentProps } from 'react';

import { cn } from '@devlog/utils';

interface FloatingMenuProps extends ComponentProps<'div'> {
  position: 'center' | 'left' | 'right';
}

const positionClasses = {
  center: 'left-1/2 -translate-x-1/2',
  left: 'left-4 md:left-10',
  right: 'right-4 md:right-10',
} as const;

export const FloatingMenu = ({
  className,
  position = 'center',
  ...props
}: FloatingMenuProps) => {
  return (
    <div
      {...props}
      className={cn(
        'fixed',
        'bottom-[calc(80px+env(safe-area-inset-bottom))]',
        'md:bottom-[calc(120px+env(safe-area-inset-bottom))]',
        'transition-transform',
        'data-[scroll-direction=DOWN]:translate-y-full',
        positionClasses[position],
        className,
      )}
      data-position={position}
    />
  );
};

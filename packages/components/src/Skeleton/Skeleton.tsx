import type { CSSProperties } from 'react';

import { cn } from '@devlog/utils';
import { cva } from 'class-variance-authority';

const skeletonVariants = cva('bg-[#e0e0e0]/30 animate-shimmer', {
  defaultVariants: { variant: 'text' },
  variants: {
    variant: {
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
      text: 'rounded-[4px] h-[1em] w-full',
    },
  },
});

interface SkeletonProps {
  className?: string;
  height?: CSSProperties['height'];
  variant?: 'circular' | 'rectangular' | 'text';
  width?: CSSProperties['width'];
}

export const Skeleton = ({
  className,
  height,
  variant = 'text',
  width,
}: SkeletonProps) => {
  const style: CSSProperties = {
    ...(height != null && { height }),
    ...(width != null && { width }),
  };

  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={style}
    />
  );
};

import type { CSSProperties } from 'react';

import { clsx } from 'clsx';

import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  height?: CSSProperties['height'];
  variant?: SkeletonVariant;
  width?: CSSProperties['width'];
}

type SkeletonVariant = 'circular' | 'rectangular' | 'text';

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
      className={clsx(styles.skeleton, styles[variant], className)}
      style={style}
    />
  );
};

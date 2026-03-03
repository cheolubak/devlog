import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import styles from './FloatingMenu.module.css';

interface FloatingMenuProps extends ComponentProps<'div'> {
  position: 'center' | 'left' | 'right';
}

export const FloatingMenu = ({
  className,
  position = 'center',
  ...props
}: FloatingMenuProps) => {
  return (
    <div
      {...props}
      className={clsx(styles.floatingMenu, className)}
      data-position={position}
    />
  );
};

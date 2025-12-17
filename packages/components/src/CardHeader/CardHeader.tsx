import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import styles from './CardHeader.module.css';

interface CardHeaderProps extends ComponentProps<'header'> {}

export const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <header
      {...props}
      className={clsx(styles.cardHeader, className)}
    />
  );
};

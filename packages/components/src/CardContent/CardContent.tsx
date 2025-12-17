import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import styles from './CardContent.module.css';

interface CardContentProps extends ComponentProps<'main'> {}

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return (
    <main
      {...props}
      className={clsx(styles.cardContent, className)}
    />
  );
};

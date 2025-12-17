import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import styles from './CardFooter.module.css';

interface CardFooterProps extends ComponentProps<'footer'> {}

export const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <footer
      {...props}
      className={clsx(styles.cardFooter, className)}
    />
  );
};

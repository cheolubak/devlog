import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import styles from './Card.module.css';

interface CardProps extends ComponentProps<'article'> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <article
      {...props}
      className={clsx(styles.card, className)}
    ></article>
  );
};

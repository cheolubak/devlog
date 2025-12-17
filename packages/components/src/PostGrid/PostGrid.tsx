import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import styles from './PostGrid.module.css';

interface PostGridProps extends ComponentProps<'article'> {}

export const PostGrid = ({ className, ...props }: PostGridProps) => {
  return (
    <article
      {...props}
      className={clsx(styles.postGrid, className)}
    />
  );
};

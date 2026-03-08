import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { Typography } from '../Typography';
import styles from './Radio.module.css';

interface RadioProps extends Omit<ComponentProps<'input'>, 'name' | 'type'> {
  name: string;
}

export const Radio = ({ children, className, ...props }: RadioProps) => {
  return (
    <label className={clsx(styles.radioContainer, className)}>
      <input
        {...props}
        className={styles.radioInput}
        type='radio'
      />
      <span className={styles.radio} />
      {children && <Typography>{children}</Typography>}
    </label>
  );
};

import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { Typography } from '../Typography';
import styles from './InputGroup.module.css';

interface InputGroupProps extends ComponentProps<'div'> {
  label?: string;
}

export const InputGroup = ({
  children,
  className,
  label,
  ...props
}: InputGroupProps) => {
  return (
    <div
      {...props}
      className={clsx(styles.inputGroup, className)}
    >
      {label && <Typography variants='body-small'>{label}</Typography>}
      {children}
    </div>
  );
};

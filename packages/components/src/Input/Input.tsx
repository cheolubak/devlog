'use client';

import type { ComponentProps, ReactNode } from 'react';

import { clsx } from 'clsx';

import styles from './Input.module.css';

interface InputProps extends Omit<
  ComponentProps<'input'>,
  'prefix' | 'suffix'
> {
  inputClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Input = ({
  className,
  inputClassName,
  prefix,
  suffix,
  ...props
}: InputProps) => {
  return (
    <label className={clsx(styles.inputContainer, className)}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input
        {...props}
        className={clsx(styles.input, inputClassName)}
      />
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </label>
  );
};

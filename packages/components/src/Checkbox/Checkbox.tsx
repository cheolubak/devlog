'use client';

import type { ChangeEvent, ComponentProps, ReactNode } from 'react';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<
  ComponentProps<'input'>,
  'children' | 'onChange' | 'type'
> {
  children?: ReactNode;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  checked,
  children,
  defaultChecked,
  disabled,
  onChange,
  ...props
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || checked);

  useEffect(() => {
    if (typeof checked === 'undefined') {
      return;
    }

    setIsChecked(checked);
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsChecked(checked);

    onChange?.(checked);
  };

  return (
    <label
      className={clsx(styles.checkboxContainer, disabled && styles.disabled)}
    >
      <input
        {...props}
        checked={isChecked}
        className={styles.checkboxInput}
        onChange={handleChange}
        type='checkbox'
      />
      <span className={styles.checkbox}>
        {isChecked && (
          <Icon
            color='var(--color-white)'
            name='check'
            size={20}
          />
        )}
      </span>
      {children && <Typography variants='body-large'>{children}</Typography>}
    </label>
  );
};

'use client';

import type { ChangeEvent, ComponentProps } from 'react';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import styles from './Switch.module.css';

interface SwitchProps extends Omit<
  ComponentProps<'input'>,
  'children' | 'className' | 'onChange' | 'type'
> {
  onChange?: (checked: boolean) => void;
}

export const Switch = ({
  checked,
  defaultChecked,
  onChange,
  ...props
}: SwitchProps) => {
  const [isActive, setIsActive] = useState(defaultChecked || checked);

  useEffect(() => {
    setIsActive(checked);
  }, [checked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    onChange?.(checked);
  };

  return (
    <label
      className={clsx(styles.switch, (checked || isActive) && styles.isActive)}
    >
      <input
        {...props}
        checked={checked || isActive}
        className={styles.input}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        type='checkbox'
      />
      <span className={styles.thumb} />
    </label>
  );
};

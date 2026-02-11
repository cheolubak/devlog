'use client';

import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import { Ripple } from '@/packages/components/src/Ripple';

import styles from './Button.module.css';

type ButtonColor = 'danger' | 'primary' | 'secondary' | 'success';

interface ButtonProps extends ComponentProps<'button'> {
  color?: ButtonColor;
  size?: ButtonSize;
  useRipple?: boolean;
  variant?: ButtonVariant;
}

type ButtonSize = 'lg' | 'md' | 'sm' | 'xl' | 'xs';
type ButtonVariant = 'filled' | 'outline' | 'text';

export const Button = ({
  children,
  className,
  color = 'primary',
  size = 'lg',
  useRipple = true,
  variant = 'filled',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        styles[variant],
        styles[color],
        styles[size],
        className,
      )}
    >
      {children}
      {useRipple && <Ripple />}
    </button>
  );
};

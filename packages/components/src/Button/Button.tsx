'use client';

import type { ComponentProps } from 'react';

import { cn } from '@devlog/utils';
import { cva } from 'class-variance-authority';

import { Ripple } from '../Ripple';

const buttonVariants = cva(
  'relative outline-none inline-flex justify-center items-center border-2 whitespace-nowrap text-white',
  {
    compoundVariants: [
      {
        className: 'bg-gray-900 border-gray-900',
        color: 'primary',
        variant: 'filled',
      },
      {
        className: 'bg-purple-500 border-purple-500',
        color: 'secondary',
        variant: 'filled',
      },
      {
        className: 'bg-cyan-500 border-cyan-500',
        color: 'success',
        variant: 'filled',
      },
      {
        className: 'bg-red-500 border-red-500',
        color: 'danger',
        variant: 'filled',
      },
      {
        className: 'border-gray-900 text-gray-900',
        color: 'primary',
        variant: 'outline',
      },
      {
        className: 'border-purple-500 text-purple-500',
        color: 'secondary',
        variant: 'outline',
      },
      {
        className: 'border-cyan-500 text-cyan-500',
        color: 'success',
        variant: 'outline',
      },
      {
        className: 'border-red-500 text-red-500',
        color: 'danger',
        variant: 'outline',
      },
      {
        className: 'text-white',
        color: 'primary',
        variant: 'text',
      },
      {
        className: 'text-purple-500',
        color: 'secondary',
        variant: 'text',
      },
      {
        className: 'text-cyan-500',
        color: 'success',
        variant: 'text',
      },
      {
        className: 'text-red-500',
        color: 'danger',
        variant: 'text',
      },
    ],
    defaultVariants: {
      color: 'primary',
      size: 'lg',
      variant: 'filled',
    },
    variants: {
      color: {
        danger: '',
        primary: '',
        secondary: '',
        success: '',
      },
      size: {
        lg: 'h-12 px-4 rounded-lg gap-1.5',
        md: 'h-10 px-3 rounded-md gap-1.5',
        sm: 'h-9 px-3 rounded-md gap-1.5',
        xl: 'h-14 px-5 rounded-lg gap-2',
        xs: 'h-8 px-2 rounded-md gap-1',
      },
      variant: {
        filled: '',
        outline: 'bg-transparent',
        text: 'bg-transparent border-transparent',
      },
    },
  },
);

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
      className={cn(
        buttonVariants({ color, size, variant }),
        className,
      )}
      draggable={false}
    >
      {children}
      {useRipple && <Ripple />}
    </button>
  );
};

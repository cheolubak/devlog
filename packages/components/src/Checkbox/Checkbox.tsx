'use client';

import type { ChangeEvent, ComponentProps, ReactNode } from 'react';

import { cn } from '@devlog/utils';
import { useEffect, useState } from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

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
      className={cn(
        'flex',
        'justify-start',
        'items-center',
        'gap-2',
        'cursor-pointer',
        disabled && 'cursor-not-allowed',
      )}
    >
      <input
        {...props}
        checked={isChecked}
        className='peer hidden w-0 h-0'
        onChange={handleChange}
        type='checkbox'
      />
      <span
        className={cn(
          'w-6',
          'h-6',
          'rounded-lg',
          'bg-gray-200',
          'inline-flex',
          'justify-center',
          'items-center',
          'peer-checked:bg-gray-900',
        )}
      >
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

'use client';

import type { ChangeEvent, ComponentProps } from 'react';

import { cn } from '@devlog/utils';
import { useEffect, useState } from 'react';

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
      className={cn(
        'w-10',
        'h-5',
        'rounded-full',
        'bg-gray-400',
        'relative',
        'cursor-pointer',
        (checked || isActive) && 'bg-indigo-500',
      )}
    >
      <input
        {...props}
        checked={checked || isActive}
        className='peer hidden w-0 h-0'
        defaultChecked={defaultChecked}
        onChange={handleChange}
        type='checkbox'
      />
      <span
        className={cn(
          'w-5',
          'h-5',
          'rounded-full',
          'bg-white',
          'absolute',
          'top-0',
          'left-0',
          'peer-checked:translate-x-full',
        )}
      />
    </label>
  );
};

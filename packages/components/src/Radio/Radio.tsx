import type { ComponentProps } from 'react';

import { cn } from '@devlog/utils';

import { Typography } from '../Typography';

interface RadioProps extends Omit<ComponentProps<'input'>, 'name' | 'type'> {
  name: string;
}

export const Radio = ({ children, className, ...props }: RadioProps) => {
  return (
    <label
      className={cn(
        'flex',
        'justify-start',
        'items-center',
        'gap-2',
        'cursor-pointer',
        className,
      )}
    >
      <input
        {...props}
        className='peer hidden w-0 h-0'
        type='radio'
      />
      <span
        className={cn(
          'inline-flex',
          'justify-center',
          'items-center',
          'w-6',
          'h-6',
          'rounded-full',
          'border-2',
          'border-gray-200',
          'peer-checked:border-gray-900',
          "after:content-['']",
          'after:w-3',
          'after:h-3',
          'after:rounded-full',
          'after:bg-gray-200',
          'peer-checked:after:bg-gray-900',
        )}
      />
      {children && <Typography>{children}</Typography>}
    </label>
  );
};

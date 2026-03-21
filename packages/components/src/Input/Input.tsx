'use client';

import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@devlog/utils';

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
    <label className={cn(
      'h-12 inline-flex justify-stretch items-center gap-2 px-4 border border-gray-400 rounded-lg bg-white shadow-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2',
      className,
    )}>
      {prefix && <span className="w-6 h-6 -ml-1">{prefix}</span>}
      <input
        {...props}
        className={cn(
          'outline-none border-none bg-transparent flex-1',
          inputClassName,
        )}
      />
      {suffix && <span className="w-fit h-fit -mr-1">{suffix}</span>}
    </label>
  );
};

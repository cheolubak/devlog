import type { ComponentProps } from 'react';

import { cn } from '@devlog/utils';

import { Typography } from '../Typography';

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
      className={cn(
        'flex flex-col gap-1 justify-start items-stretch',
        className,
      )}
    >
      {label && <Typography variants='body-small'>{label}</Typography>}
      {children}
    </div>
  );
};

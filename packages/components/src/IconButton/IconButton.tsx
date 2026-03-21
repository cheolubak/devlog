'use client';

import type { ComponentProps } from 'react';

import { cn } from '@devlog/utils';

import type { IconProps } from '../Icon';

import { Icon } from '../Icon';
import { Ripple } from '../Ripple';

interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  iconColor?: IconProps['color'];
  iconSize?: number;
  name: IconProps['name'];
  size?: number;
  useRipple?: boolean;
}

export const IconButton = ({
  className,
  iconColor,
  iconSize = 24,
  name,
  size = 32,
  style,
  useRipple = true,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'relative overflow-hidden rounded-full p-0 m-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 inline-flex items-center justify-center',
        className,
      )}
      style={{ height: size, width: size, ...style }}
    >
      <Icon
        color={iconColor}
        name={name}
        size={iconSize}
      />
      {useRipple && <Ripple />}
    </button>
  );
};

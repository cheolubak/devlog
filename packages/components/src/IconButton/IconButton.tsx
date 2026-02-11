'use client';

import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import type { IconProps } from '../Icon';

import { Icon } from '../Icon';
import { Ripple } from '../Ripple';
import styles from './IconButton.module.css';

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
      className={clsx(styles.iconButton, className)}
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

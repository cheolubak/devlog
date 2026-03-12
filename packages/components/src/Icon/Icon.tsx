import { cn } from '@devlog/utils';
import { cva } from 'class-variance-authority';

import type { IconColor, IconName } from './Icon.types';

import { iconMap } from './Icon.types';

const iconVariants = cva(
  'inline-flex justify-center items-center w-[1em] min-w-[1em] max-w-[1em] h-[1em] max-h-[1em] min-h-[1em] **:max-w-full **:min-w-full **:h-full **:max-h-full **:min-h-full',
  {
    variants: {
      color: {
        danger: 'fill-red-500',
        primary: 'fill-white',
        secondary: 'fill-purple-500',
        success: 'fill-cyan-500',
      },
      colorFill: {
        true: '[&_*]:fill-inherit',
      },
    },
  },
);

export interface IconProps {
  className?: string;
  color?: IconColor | string;
  name: IconName;
  size?: number;
}

export const Icon = ({ className, color, name, size = 24 }: IconProps) => {
  const IconComponent = iconMap[name];

  const isSetColor =
    !!color && ['danger', 'primary', 'secondary', 'success'].includes(color);

  return (
    <i
      className={cn(
        iconVariants({
          color: isSetColor ? (color as IconColor) : undefined,
          colorFill: !!color || undefined,
        }),
        className,
      )}
      style={{
        fill: isSetColor ? undefined : color,
        fontSize: size,
      }}
    >
      <IconComponent />
    </i>
  );
};

import { clsx } from 'clsx';

import type { IconColor, IconName } from './Icon.types';

import styles from './Icon.module.css';
import { iconMap } from './Icon.types';

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
      className={clsx(
        styles.icon,
        isSetColor && styles[color],
        !!color && styles.colorFill,
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

import type { ComponentType } from 'react';

import { clsx } from 'clsx';

import styles from './Icon.module.css';
import {
  IconDarkMode,
  IconDelete,
  IconEdit,
  IconEmail,
  IconGithub,
  IconHash,
  IconLightMode,
  IconLink,
  IconMore,
  IconNotification,
  IconPerson,
  IconRss,
  IconSend,
  IconShare,
} from './icons';

export interface IconProps {
  className?: string;
  color?: IconColor | string;
  name: IconName;
  size?: number;
}

type IconColor = 'danger' | 'primary' | 'secondary' | 'success';

type IconName =
  | 'darkMode'
  | 'delete'
  | 'edit'
  | 'email'
  | 'github'
  | 'hash'
  | 'lightMode'
  | 'link'
  | 'more'
  | 'notification'
  | 'person'
  | 'rss'
  | 'send'
  | 'share';

const iconMap: Record<IconName, ComponentType> = {
  darkMode: IconDarkMode,
  delete: IconDelete,
  edit: IconEdit,
  email: IconEmail,
  github: IconGithub,
  hash: IconHash,
  lightMode: IconLightMode,
  link: IconLink,
  more: IconMore,
  notification: IconNotification,
  person: IconPerson,
  rss: IconRss,
  send: IconSend,
  share: IconShare,
};

export const Icon = ({ className, color, name, size = 24 }: IconProps) => {
  const IconComponent = iconMap[name];

  const isSetColor =
    !!color && ['danger', 'primary', 'secondary', 'success'].includes(color);

  return (
    <i
      className={clsx(styles.icon, isSetColor && styles[color], className)}
      style={{
        fill: isSetColor ? undefined : color,
        height: size,
        width: size,
      }}
    >
      <IconComponent />
    </i>
  );
};

import type { ComponentType } from 'react';

import { clsx } from 'clsx';

import styles from './Icon.module.css';
import {
  IconClear,
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
  IconSearch,
  IconSend,
  IconShare,
  IconYoutube,
} from './icons';

export interface IconProps {
  className?: string;
  color?: IconColor | string;
  name: IconName;
  size?: number;
}

type IconColor = 'danger' | 'primary' | 'secondary' | 'success';

type IconName =
  | 'clear'
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
  | 'search'
  | 'send'
  | 'share'
  | 'youtube';

const iconMap: Record<IconName, ComponentType> = {
  clear: IconClear,
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
  search: IconSearch,
  send: IconSend,
  share: IconShare,
  youtube: IconYoutube,
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
        fontSize: size,
      }}
    >
      <IconComponent />
    </i>
  );
};

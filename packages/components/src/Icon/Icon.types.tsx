import type { ComponentType } from 'react';

import {
  IconBookmarkFill,
  IconBookmarkOutline,
  IconChannel,
  IconClear,
  IconDarkMode,
  IconDelete,
  IconEdit,
  IconEmail,
  IconGithub,
  IconGoogle,
  IconHash,
  IconKakao,
  IconLightMode,
  IconLink,
  IconListAlt,
  IconMore,
  IconNaver,
  IconNotification,
  IconPerson,
  IconRss,
  IconSearch,
  IconSend,
  IconShare,
  IconVisibility,
  IconYoutube,
} from './icons';

export type IconColor = 'danger' | 'primary' | 'secondary' | 'success';

export type IconName =
  | 'bookmark-fill'
  | 'bookmark-outline'
  | 'channel'
  | 'clear'
  | 'darkMode'
  | 'delete'
  | 'edit'
  | 'email'
  | 'github'
  | 'google'
  | 'hash'
  | 'kakao'
  | 'lightMode'
  | 'link'
  | 'list-alt'
  | 'more'
  | 'naver'
  | 'notification'
  | 'person'
  | 'rss'
  | 'search'
  | 'send'
  | 'share'
  | 'visibility'
  | 'youtube';

export const iconMap: Record<IconName, ComponentType> = {
  'bookmark-fill': IconBookmarkFill,
  'bookmark-outline': IconBookmarkOutline,
  channel: IconChannel,
  clear: IconClear,
  darkMode: IconDarkMode,
  delete: IconDelete,
  edit: IconEdit,
  email: IconEmail,
  github: IconGithub,
  google: IconGoogle,
  hash: IconHash,
  kakao: IconKakao,
  lightMode: IconLightMode,
  link: IconLink,
  'list-alt': IconListAlt,
  more: IconMore,
  naver: IconNaver,
  notification: IconNotification,
  person: IconPerson,
  rss: IconRss,
  search: IconSearch,
  send: IconSend,
  share: IconShare,
  visibility: IconVisibility,
  youtube: IconYoutube,
};

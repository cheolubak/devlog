import type { ComponentType } from 'react';

import {
  IconBookmarkFill,
  IconBookmarkOutline,
  IconChannel,
  IconCheck,
  IconClear,
  IconDarkMode,
  IconDelete,
  IconEdit,
  IconEmail,
  IconFilter,
  IconGithub,
  IconGoogle,
  IconHash,
  IconKakao,
  IconLanguage,
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
  | 'check'
  | 'clear'
  | 'darkMode'
  | 'delete'
  | 'edit'
  | 'email'
  | 'filter'
  | 'github'
  | 'google'
  | 'hash'
  | 'kakao'
  | 'language'
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
  check: IconCheck,
  clear: IconClear,
  darkMode: IconDarkMode,
  delete: IconDelete,
  edit: IconEdit,
  email: IconEmail,
  filter: IconFilter,
  github: IconGithub,
  google: IconGoogle,
  hash: IconHash,
  kakao: IconKakao,
  language: IconLanguage,
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

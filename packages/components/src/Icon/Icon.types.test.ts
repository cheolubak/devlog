import { describe, expect, it } from 'vitest';

import type { IconName } from './Icon.types';

import { iconMap } from './Icon.types';

const allIconNames: IconName[] = [
  'bookmark-fill',
  'bookmark-outline',
  'channel',
  'check',
  'clear',
  'darkMode',
  'delete',
  'edit',
  'email',
  'filter',
  'github',
  'google',
  'hash',
  'kakao',
  'lightMode',
  'link',
  'list-alt',
  'more',
  'naver',
  'notification',
  'person',
  'rss',
  'search',
  'send',
  'share',
  'visibility',
  'youtube',
  'language',
];

describe('iconMap', () => {
  it.each(allIconNames)('%s 아이콘이 iconMap에 존재한다', (name) => {
    expect(iconMap[name]).toBeDefined();
  });

  it('모든 iconMap 값이 함수(React 컴포넌트)이다', () => {
    Object.values(iconMap).forEach((Component) => {
      expect(typeof Component).toBe('function');
    });
  });

  it('iconMap 키의 수가 예상 아이콘 수와 일치한다', () => {
    expect(Object.keys(iconMap)).toHaveLength(allIconNames.length);
  });
});

'use client';

import type { IconProps } from '@devlog/components';

import { Icon, Ripple } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import { cn } from '@devlog/utils';
import { LogClick } from 'components/LogClick';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollDirection } from 'stores';

const NAV_ITEMS: {
  ariaLabel: string;
  href: string;
  icon: IconProps['name'];
  name: string;
}[] = [
  { ariaLabel: '글 목록', href: '/', icon: 'list-alt', name: 'posts' },
  { ariaLabel: '채널', href: '/channels', icon: 'channel', name: 'channels' },
  {
    ariaLabel: '북마크',
    href: '/mypage/bookmarks',
    icon: 'bookmark-fill',
    name: 'bookmarks',
  },
  { ariaLabel: '마이페이지', href: '/mypage', icon: 'person', name: 'mypage' },
];

export const BottomNavigation = () => {
  const scrollDirection = useScrollDirection((state) => state.direction);
  const pathname = usePathname();

  const { event } = useAnalytics();

  const handleClickNavigation = (name: string) => {
    event('navigation_click', {
      name,
    });
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/mypage') return pathname === '/mypage';
    return pathname.startsWith(href);
  };

  return (
    <footer
      className={cn(
        'fixed',
        'bottom-0',
        'left-0',
        'right-0',
        'h-[calc(64px+env(safe-area-inset-bottom))]',
        'md:h-[80px]',
        'z-50',
        'bg-gray-900',
        'transition-transform',
        'data-[scroll-direction=DOWN]:translate-y-full',
      )}
      data-scroll-direction={scrollDirection}
    >
      <ul
        className={cn(
          'h-full',
          'flex',
          'justify-around',
          'items-center',
          'bg-indigo-900/30',
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.name}>
            <LogClick
              eventName='navigation_click'
              params={{ name: item.name }}
            >
              <Link
                aria-current={isActive(item.href) ? 'page' : undefined}
                aria-label={item.ariaLabel}
                className={cn(
                  'relative',
                  'inline-flex',
                  'justify-center',
                  'items-center',
                  'w-12 md:w-[64px]',
                  'h-12 md:h-[64px]',
                  'rounded-full',
                  'overflow-hidden',
                  isActive(item.href) && 'bg-indigo-500/30',
                )}
                href={item.href}
                onClick={() => handleClickNavigation(item.name)}
                scroll={false}
              >
                <Ripple />
                <Icon
                  color='primary'
                  name={item.icon}
                  size={28}
                />
              </Link>
            </LogClick>
          </li>
        ))}
      </ul>
    </footer>
  );
};

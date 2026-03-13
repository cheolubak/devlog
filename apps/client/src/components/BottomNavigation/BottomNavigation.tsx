'use client';

import { Icon, Ripple } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import { cn } from '@devlog/utils';
import { LogClick } from 'components/LogClick';
import Link from 'next/link';
import { useScrollDirection } from 'stores';

export const BottomNavigation = () => {
  const scrollDirection = useScrollDirection((state) => state.direction);

  const { event } = useAnalytics();

  const handleClickNavigation = (name: string) => {
    event('navigation_click', {
      name,
    });
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
        <li>
          <LogClick
            eventName='navigation_click'
            params={{ name: 'posts' }}
          >
            <Link
              aria-label='글 목록'
              className={cn(
                'relative',
                'inline-flex',
                'justify-center',
                'items-center',
                'w-12 md:w-[64px]',
                'h-12 md:h-[64px]',
                'rounded-full',
                'overflow-hidden',
              )}
              href='/'
              onClick={() => handleClickNavigation('posts')}
              scroll={false}
            >
              <Ripple />
              <Icon
                color='primary'
                name='list-alt'
                size={28}
              />
            </Link>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='navigation_click'
            params={{ name: 'channels' }}
          >
            <Link
              aria-label='채널'
              className={cn(
                'relative',
                'inline-flex',
                'justify-center',
                'items-center',
                'w-12 md:w-[64px]',
                'h-12 md:h-[64px]',
                'rounded-full',
                'overflow-hidden',
              )}
              href='/channels'
              onClick={() => handleClickNavigation('channels')}
              scroll={false}
            >
              <Ripple />
              <Icon
                color='primary'
                name='channel'
                size={28}
              />
            </Link>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='navigation_click'
            params={{ name: 'bookmarks' }}
          >
            <Link
              aria-label='북마크'
              className={cn(
                'relative',
                'inline-flex',
                'justify-center',
                'items-center',
                'w-12 md:w-[64px]',
                'h-12 md:h-[64px]',
                'rounded-full',
                'overflow-hidden',
              )}
              href='/mypage/bookmarks'
              onClick={() => handleClickNavigation('bookmarks')}
              scroll={false}
            >
              <Ripple />
              <Icon
                color='primary'
                name='bookmark-fill'
                size={28}
              />
            </Link>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='navigation_click'
            params={{ name: 'mypage' }}
          >
            <Link
              aria-label='마이페이지'
              className={cn(
                'relative',
                'inline-flex',
                'justify-center',
                'items-center',
                'w-12 md:w-[64px]',
                'h-12 md:h-[64px]',
                'rounded-full',
                'overflow-hidden',
              )}
              href='/mypage'
              onClick={() => handleClickNavigation('mypage')}
              scroll={false}
            >
              <Ripple />
              <Icon
                color='primary'
                name='person'
                size={28}
              />
            </Link>
          </LogClick>
        </li>
      </ul>
    </footer>
  );
};

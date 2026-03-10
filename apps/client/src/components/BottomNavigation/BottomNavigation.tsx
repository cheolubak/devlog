'use client';

import { Icon, Ripple } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import Link from 'next/link';
import { useScrollDirection } from 'stores';

import styles from './BottomNavigation.module.css';

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
      className={styles.bottomNavigation}
      data-scroll-direction={scrollDirection}
    >
      <ul className={styles.bottomNavigationItemList}>
        <li>
          <Link
            className={styles.bottomNavigationItem}
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
        </li>
        <li>
          <Link
            className={styles.bottomNavigationItem}
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
        </li>
        <li>
          <Link
            className={styles.bottomNavigationItem}
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
        </li>
        <li>
          <Link
            className={styles.bottomNavigationItem}
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
        </li>
      </ul>
    </footer>
  );
};

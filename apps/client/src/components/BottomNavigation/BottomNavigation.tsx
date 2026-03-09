'use client';

import { Icon, Ripple } from '@devlog/components';
import Link from 'next/link';
import { useScrollDirection } from 'stores';

import styles from './BottomNavigation.module.css';

export const BottomNavigation = () => {
  const scrollDirection = useScrollDirection((state) => state.direction);

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

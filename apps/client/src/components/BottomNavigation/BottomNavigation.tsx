import { Icon, Ripple } from '@devlog/components';
import Link from 'next/link';

import styles from './BottomNavigation.module.css';

export const BottomNavigation = () => {
  return (
    <footer className={styles.bottomNavigation}>
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
              size={36}
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
              size={36}
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
              size={36}
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
              size={36}
            />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

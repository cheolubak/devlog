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

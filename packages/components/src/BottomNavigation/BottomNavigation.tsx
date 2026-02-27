import Link from 'next/link';

import { Icon } from '../Icon';
import styles from './BottomNavigation.module.css';

export const BottomNavigation = () => {
  return (
    <footer className={styles.bottomNavigation}>
      <ul className={styles.bottomNavigationItemList}>
        <li>
          <Link href='/'>
            <Icon
              color='primary'
              name='list-alt'
              size={36}
            />
          </Link>
        </li>
        <li>
          <Link href='/channels'>
            <Icon
              color='primary'
              name='channel'
              size={36}
            />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

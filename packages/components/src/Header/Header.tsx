import { Suspense } from 'react';

import { Typography } from '../Typography';
import styles from './Header.module.css';
import { HeaderSearch } from './HeaderSearch';
import { HeaderTabs } from './HeaderTabs';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <Typography
          semantic='h1'
          variants='display-small'
        >
          DEVLOG
        </Typography>
        <div className={styles.search}>
          <Suspense>
            <HeaderTabs />
          </Suspense>
        </div>
      </div>
      <Suspense>
        <HeaderSearch />
      </Suspense>
    </header>
  );
};

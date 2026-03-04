import { Typography } from '@devlog/components';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import styles from './Header.module.css';
import { HeaderSearch } from './HeaderSearch';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <Link href='/'>
          <Typography
            semantic='h1'
            variants='display-small'
          >
            <Image
              alt='Dev Curate'
              className={styles.logo}
              height={64}
              src='/logo.svg'
              width={64}
            />
          </Typography>
        </Link>
        <div className={styles.search}>
          <Suspense>
            <HeaderSearch />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

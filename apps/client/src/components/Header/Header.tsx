'use client';

import { Typography } from '@devlog/components';
import { HeaderMenu } from 'components/HeaderMenu';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollDirection } from 'stores';

import styles from './Header.module.css';

export const Header = () => {
  const scrollDirection = useScrollDirection((state) => state.direction);

  return (
    <header
      className={styles.header}
      data-scroll-direction={scrollDirection}
    >
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
        <HeaderMenu />
      </div>
    </header>
  );
};

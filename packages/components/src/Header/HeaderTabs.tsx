'use client';

import { POST_TYPE } from '@devlog/domain';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Icon } from '@/packages/components';

import styles from './HeaderTabs.module.css';

export const HeaderTabs = () => {
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') ?? POST_TYPE.BLOG;

  return (
    <ul className={styles.headerTabs}>
      <li>
        <Link href={`?type=${POST_TYPE.BLOG}`}>
          <Icon
            color={currentType === POST_TYPE.BLOG ? 'success' : 'primary'}
            name='rss'
          />
        </Link>
      </li>
      <li>
        <Link href={`?type=${POST_TYPE.YOUTUBE}`}>
          <Icon
            color={currentType === POST_TYPE.YOUTUBE ? 'success' : 'primary'}
            name='youtube'
          />
        </Link>
      </li>
    </ul>
  );
};

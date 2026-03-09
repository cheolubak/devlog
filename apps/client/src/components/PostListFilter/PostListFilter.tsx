'use client';

import { Button, FloatingMenu, Icon, useModal } from '@devlog/components';
import { PostFilterModal } from 'components';
import { usePathname, useSearchParams } from 'next/navigation';
import { useScrollDirection } from 'stores';

import styles from './PostListFilter.module.css';

export const PostListFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const scrollDirection = useScrollDirection((state) => state.direction);

  const { open } = useModal();

  const isActive = searchParams.get('region') || searchParams.get('type');

  const handleOpenFilter = () => {
    open(<PostFilterModal />);
  };

  if (pathname !== '/') {
    return null;
  }

  return (
    <FloatingMenu
      data-scroll-direction={scrollDirection}
      position='center'
    >
      <Button
        className={styles.filterButton}
        color='success'
        onClick={handleOpenFilter}
        size='sm'
      >
        <div className={styles.filterIcon}>
          <Icon
            color='var(--color-white)'
            name='filter'
            size={20}
          />
          {isActive && <span className={styles.isActive} />}
        </div>
        필터
      </Button>
    </FloatingMenu>
  );
};

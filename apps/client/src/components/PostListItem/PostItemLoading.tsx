import { Skeleton } from '@devlog/components';

import styles from './PostListItem.module.css';

export const PostItemLoading = () => {
  return (
    <div className={styles.postListItem}>
      <div className={styles.postListItemHeader}>
        <Skeleton
          height={26}
          variant='rectangular'
          width={26}
        />
        <Skeleton
          height={28}
          width='100%'
        />
      </div>
      <Skeleton
        className={styles.postListItemDescription}
        height={24}
        width='100%'
      />
      <div className={styles.postListItemFooter}>
        <Skeleton
          height={20}
          width={80}
        />
        <div className={styles.postListItemInfo}>
          <Skeleton
            height={20}
            width={80}
          />
          |
          <div className={styles.postListItemView}>
            <Skeleton
              height={14}
              variant='circular'
              width={14}
            />
            <Skeleton
              height={20}
              width={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

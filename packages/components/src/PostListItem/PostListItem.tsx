import type { PostList } from '@devlog/domain';

import { Typography } from '@devlog/components';
import Link from 'next/link';

import styles from './PostListItem.module.css';

interface PostItemProps {
  post: PostList;
}

export const PostListItem = ({ post }: PostItemProps) => {
  return (
    <Link
      className={styles.postListItem}
      href={post.sourceUrl}
      target='_blank'
    >
      <Typography
        className={styles.postListItemTitle}
        semantic='h2'
        variants='title-large'
      >
        {post.title}
      </Typography>
      <Typography
        className={styles.postListItemDescription}
        maxLines={2}
        semantic='p'
        variants='body-large'
      >
        {post.description}
      </Typography>
      <Typography
        semantic='h3'
        variants='body-medium'
      >
        {post.source.name}
      </Typography>
    </Link>
  );
};

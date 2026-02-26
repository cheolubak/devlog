'use client';

import type { PostList } from '@devlog/domain';
import type { CSSProperties } from 'react';

import { Icon, Typography } from '@devlog/components';
import dayjs from 'dayjs';
import Link from 'next/link';

import { useAnalytics } from '@/hooks/useAnalytics';

import styles from './PostListItem.module.css';

interface PostItemProps {
  post: PostList;
  style?: CSSProperties;
}

export const PostListItem = ({ post, style }: PostItemProps) => {
  const { eventSelectContent } = useAnalytics();

  const handleClickPost = () => {
    eventSelectContent(post);
  };

  let blogUrl = post.sourceUrl;
  if (!post.sourceUrl.startsWith('http')) {
    blogUrl = post.source.blogUrl;

    if (blogUrl.endsWith('/')) {
      blogUrl = blogUrl.slice(0, -1);
    }

    if (!post.sourceUrl.startsWith('/')) {
      blogUrl = `${blogUrl}/`;
    }

    blogUrl = `${blogUrl}${post.sourceUrl}`;
  }

  return (
    <Link
      className={styles.postListItem}
      href={blogUrl}
      onClick={handleClickPost}
      style={style}
      target='_blank'
    >
      <div className={styles.postListItemTitle}>
        <Icon
          color={
            post.source.type === 'YOUTUBE'
              ? 'var(--color-red-500)'
              : 'var(--color-teal-500)'
          }
          name={post.source.type === 'YOUTUBE' ? 'youtube' : 'rss'}
          size={26}
        />
        <Typography
          maxLines={2}
          semantic='h2'
          variants='title-large'
        >
          {post.title}
        </Typography>
      </div>
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
        {post.source.name} |{' '}
        {dayjs(post.originalPublishedAt).format('YYYY.MM.DD')}
      </Typography>
    </Link>
  );
};

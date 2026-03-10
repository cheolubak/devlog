'use client';

import type { PostList } from '@devlog/domains';
import type { CSSProperties, MouseEvent } from 'react';

import { Icon, IconButton, Typography } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import dayjs from 'dayjs';
import { useOpenLink } from 'hooks';
import { usePostBookmark } from 'hooks/usePostBookmark';
import { usePostView } from 'hooks/usePostView';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import styles from './PostListItem.module.css';

interface PostItemProps {
  post: PostList;
  style?: CSSProperties;
}

export const PostListItem = ({ post, style }: PostItemProps) => {
  const { i18n } = useTranslation();
  const { eventSelectContent } = useAnalytics();
  const { parseUrl } = useOpenLink();

  const isEnglish = i18n.language !== 'ko';
  const title = (isEnglish ? post.titleEn : null) ?? post.title;
  const description =
    (isEnglish ? post.descriptionEn : null) ?? post.description;

  const viewPost = usePostView(post);
  const bookmarkPosts = usePostBookmark(post);

  const handleClickPost = () => {
    eventSelectContent(post);

    viewPost();
  };

  let blogUrl = parseUrl({
    blogUrl: post.source.blogUrl,
    sourceUrl: post.sourceUrl,
  });

  const handlePostBookmarks = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    bookmarkPosts();
  };

  return (
    <Link
      className={styles.postListItem}
      draggable={false}
      href={blogUrl}
      onClick={handleClickPost}
      style={style}
      target='_blank'
    >
      <header className={styles.postListItemHeader}>
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
          className={styles.postListItemTitle}
          maxLines={2}
          semantic='h2'
          variants='title-large'
        >
          {title}
        </Typography>
        <IconButton
          iconColor={
            post.isBookmark ? 'var(--color-yellow-500)' : 'var(--color-white)'
          }
          name={post.isBookmark ? 'bookmark-fill' : 'bookmark-outline'}
          onClick={handlePostBookmarks}
        />
      </header>
      <Typography
        className={styles.postListItemDescription}
        maxLines={2}
        semantic='p'
        variants='body-large'
      >
        {description}
      </Typography>
      <footer className={styles.postListItemFooter}>
        <Typography
          semantic='h3'
          variants='body-medium'
        >
          {post.source.name}
        </Typography>
        <div className={styles.postListItemInfo}>
          <Typography variants='body-medium'>
            {dayjs(post.originalPublishedAt).format('YYYY.MM.DD')}
          </Typography>
          <Typography variants='body-medium'>|</Typography>
          <div className={styles.postListItemView}>
            <Icon
              color='var(--color-white)'
              name='visibility'
              size={14}
            />
            {post.viewCount}
          </div>
        </div>
      </footer>
    </Link>
  );
};

'use client';

import type { PostList } from '@devlog/domains';
import type { CSSProperties } from 'react';

import { Icon, IconButton, Typography } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import { cn } from '@devlog/utils';
import { LogClick } from 'components/LogClick';
import dayjs from 'dayjs';
import { useOpenLink } from 'hooks';
import { usePostBookmark } from 'hooks/usePostBookmark';
import { usePostView } from 'hooks/usePostView';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';



interface PostItemProps {
  post: PostList;
  style?: CSSProperties;
}

export const PostListItem = ({ post, style }: PostItemProps) => {
  const { i18n, t } = useTranslation();
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

  const handlePostBookmarks = () => {
    bookmarkPosts();
  };

  const eventPostParams = {
    id: post.id,
    source: post.source.name,
    sourceId: post.source.id,
    title: post.title,
    type: post.source.type ?? '',
  };

  return (
    <article
      className={cn(
        'relative',
        'block',
        'px-4 md:px-10',
        'py-6 md:py-12',
        'text-white',
        'h-[220px]',
      )}
      style={style}
    >
      <LogClick
        eventName='post_click'
        params={eventPostParams}
      >
        <Link
          className={cn(
            'block',
            'cursor-pointer',
            "after:content-['']",
            'after:absolute',
            'after:inset-0',
          )}
          draggable={false}
          href={blogUrl}
          onClick={handleClickPost}
          target='_blank'
        >
          <header
            className={cn(
              'flex',
              'items-center',
              'gap-2',
              'mb-3',
              'pr-10',
            )}
          >
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
              className={cn('flex-1')}
              maxLines={2}
              semantic='h2'
              variants='title-large'
            >
              {title}
            </Typography>
          </header>
          <Typography
            className={cn('mb-6')}
            maxLines={2}
            semantic='p'
            variants='body-large'
          >
            {description}
          </Typography>
          <footer
            className={cn(
              'flex',
              'justify-between',
              'items-center',
              'gap-2',
            )}
          >
            <Typography
              semantic='h3'
              variants='body-medium'
            >
              {post.source.name}
            </Typography>
            <div
              className={cn(
                'flex',
                'justify-end',
                'items-center',
                'gap-3',
              )}
            >
              <Typography variants='body-medium'>
                {dayjs(post.originalPublishedAt).format('YYYY.MM.DD')}
              </Typography>
              <Typography variants='body-medium'>|</Typography>
              <div
                className={cn(
                  'flex',
                  'justify-start',
                  'items-center',
                  'gap-2',
                )}
              >
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
      </LogClick>
      <div className='absolute top-6 right-4 z-10 md:top-12 md:right-10'>
        <LogClick
          eventName='post_bookmark'
          params={eventPostParams}
        >
          <IconButton
            aria-label={t(
              post.isBookmark ? 'post.removeBookmark' : 'post.addBookmark',
            )}
            iconColor={
              post.isBookmark
                ? 'var(--color-yellow-500)'
                : 'var(--color-white)'
            }
            name={post.isBookmark ? 'bookmark-fill' : 'bookmark-outline'}
            onClick={handlePostBookmarks}
          />
        </LogClick>
      </div>
    </article>
  );
};

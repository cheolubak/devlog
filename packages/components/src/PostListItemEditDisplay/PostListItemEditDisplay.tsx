'use client';

import type { PostListAll } from '@devlog/domain';
import type { ChangeEvent } from 'react';

import { useLoading } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Switch } from '../Switch';
import { Typography } from '../Typography';
import styles from './PostListItemEditDisplay.module.css';

interface PostItemProps {
  onChangeDisplay: (isDisplay: boolean) => void;
  onDelete?: () => void;
  post: PostListAll;
}

export const PostListItemEditDisplay = ({
  onChangeDisplay,
  onDelete,
  post,
}: PostItemProps) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(post.isDisplay);

  const keywordRef = useRef(post.searchKeywords?.keywords ?? '');
  const { hide, show } = useLoading();

  const { mutate } = useMutation({
    mutationFn: (variables: { keywords: string }) =>
      fetchApi.put(`/admin/edit/posts/${post.id}/keywords`, {
        keywords: variables.keywords,
      }),
    mutationKey: ['posts', 'keywords', post.id],
    onError: () => {
      alert('키워드 수정 실해');
    },
    onMutate: () => {
      show('changeKeywords');
    },
    onSettled: () => {
      hide('changeKeywords');
    },
    onSuccess: () => {
      alert('키워드 수정 성공');
    },
  });

  const handleOpenLink = () => {
    navigator.clipboard.writeText(post.id);

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
    window.open(blogUrl, '_blank');
  };

  const handleChangeDisplay = (isDisplay: boolean) => {
    setIsDisplay(isDisplay);
    onChangeDisplay(isDisplay);
  };

  const handleDelete = () => {
    const res = confirm('삭제하시겠습니까?');

    if (!res) {
      return;
    }

    onDelete?.();
  };

  const handleChangeKeywordText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    keywordRef.current = e.target.value;
  };

  const handleSaveKeyword = () => {
    if (!keywordRef.current) {
      return alert('Input Keywords');
    }

    mutate({ keywords: keywordRef.current });
  };

  return (
    <div className={styles.postListItemEdit}>
      <div className={styles.postListItemEditDisplay}>
        <div className={styles.postListItemEditDisplayInfo}>
          <Typography variants='label-medium'>{post.id}</Typography>
          <Typography
            className={styles.postListItemTitle}
            semantic='h2'
            variants='title-large'
          >
            {post.title}
          </Typography>
          <Typography variants='label-medium'>
            {dayjs(post.originalPublishedAt).format('YYYY-MM-DD')}
          </Typography>
          <Typography
            semantic='h3'
            variants='body-medium'
          >
            {post.source.name}
          </Typography>
        </div>
        <div className={styles.postListItemEditDisplayMenu}>
          <IconButton
            iconColor='primary'
            name='link'
            onClick={handleOpenLink}
          />
          <Switch
            checked={isDisplay}
            onChange={handleChangeDisplay}
          />
          <IconButton
            iconColor='primary'
            name='delete'
            onClick={handleDelete}
          />
        </div>
      </div>

      <div className={styles.postKeywordMenu}>
        <textarea
          className={styles.postKeywords}
          defaultValue={post.searchKeywords?.keywords ?? ''}
          onChange={handleChangeKeywordText}
          placeholder='keywords'
        />
        <Button
          color='secondary'
          onClick={handleSaveKeyword}
        >
          키워드 수정
        </Button>
      </div>
    </div>
  );
};

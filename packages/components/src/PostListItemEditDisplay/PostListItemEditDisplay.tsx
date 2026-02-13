'use client';

import type { PostListAll } from '@devlog/domain';

import dayjs from 'dayjs';
import { useState } from 'react';

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

  const handleOpenLink = () => {
    navigator.clipboard.writeText(post.id);
    window.open(post.sourceUrl, '_blank');
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

  return (
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
  );
};

'use client';

import type { PostListAll } from '@devlog/domains';
import type { ChangeEvent } from 'react';

import { Button, IconButton, Switch, Typography } from '@devlog/components';
import { useLoading } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import { cn } from '@devlog/utils';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useOpenLink } from 'hooks';
import { useRef, useState } from 'react';

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
  const { openLink } = useOpenLink();
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

    openLink({ blogUrl: post.source.blogUrl, sourceUrl: post.sourceUrl });
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
    <div className='flex flex-col justify-start items-stretch gap-3'>
      <div
        className={cn(
          'flex justify-between items-center',
          'px-4 md:px-10 py-6 md:py-12',
          'text-[var(--color-white)] h-[220px]',
        )}
      >
        <div className='flex flex-col justify-center items-stretch gap-3'>
          <Typography variants='label-medium'>{post.id}</Typography>
          <Typography
            semantic='h2'
            variants='title-large'
          >
            {post.title}
          </Typography>
          {post.titleEn && (
            <Typography
              semantic='h2'
              variants='title-large'
            >
              {post.titleEn}
            </Typography>
          )}
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
        <div className='flex justify-end items-center gap-3'>
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

      <div className='flex justify-stretch items-center gap-4'>
        <textarea
          className={cn(
            'text-white w-full border border-gray-300',
            'rounded-md p-4 h-[150px]',
          )}
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

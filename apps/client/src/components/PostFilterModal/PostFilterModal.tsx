'use client';

import type {
  PostRegionFilter,
  PostTypeFilter,
} from 'components/PostFilterModal/PostFilterModal.type';
import type { ChangeEvent } from 'react';

import { Button, Modal, Radio, Typography, useModal } from '@devlog/components';
import { cn } from '@devlog/utils';
import { LogClick } from 'components/LogClick';
import {
  POST_REGION_FILTERS,
  POST_TYPE_FILTERS,
} from 'components/PostFilterModal/PostFilterModal.type';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PostFilterModalProps {
  modalKey?: string;
}

export const PostFilterModal = ({ modalKey }: PostFilterModalProps) => {
  const searchParams = useSearchParams();

  const { i18n } = useTranslation();

  const { close } = useModal();

  const [region, setRegion] = useState<PostRegionFilter>(
    (searchParams.get('region') as PostRegionFilter) ?? 'ALL',
  );

  const [postType, setPostType] = useState<PostTypeFilter>(
    (searchParams.get('type') as PostTypeFilter) ?? 'ALL',
  );

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'region') {
      setRegion(value as PostRegionFilter);
    } else {
      setPostType(value as PostTypeFilter);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (region === 'ALL') {
      params.delete('region');
    } else {
      params.set('region', region);
    }

    if (postType === 'ALL') {
      params.delete('type');
    } else {
      params.set('type', postType);
    }

    window.history.replaceState({}, '', `?${params.toString()}`);

    close(modalKey);
  };

  const isKorean = i18n.language === 'ko';

  return (
    <Modal
      className={cn(
        'border-none p-0 m-0',
        'rounded-t-2xl',
        'fixed',
        'top-auto bottom-0',
        'left-1/2',
        '-translate-x-1/2 translate-y-0',
        'z-1000',
        'pb-[calc(24px+env(safe-area-inset-bottom))] md:pb-[calc(100px+env(safe-area-inset-bottom))]',
        'bg-white',
        'pt-6',
        'px-4 md:px-10',
        'w-full md:w-[700px]',
        'min-w-0 md:min-w-0',
        'h-fit min-h-0 md:min-h-0 max-h-none lg:max-h-none',
        'shadow-none',
        'flex',
        'flex-col',
        'justify-start',
        'items-stretch',
        'gap-6',
      )}
    >
      <Typography
        semantic='h3'
        variants='title-large'
      >
        {isKorean ? '포스트 필터' : 'Posts Filter'}
      </Typography>
      <hr />
      <ul
        className={cn(
          'flex',
          'flex-col',
          'justify-start',
          'items-stretch',
          'gap-3',
        )}
      >
        {POST_REGION_FILTERS.map((item) => (
          <li key={`region-${item.value}`}>
            <Radio
              checked={region === item.value}
              name='region'
              onChange={handleChangeFilter}
              value={item.value}
            >
              {isKorean ? item.name : item.enName}
            </Radio>
          </li>
        ))}
      </ul>
      <hr />
      <ul
        className={cn(
          'flex',
          'flex-col',
          'justify-start',
          'items-stretch',
          'gap-3',
        )}
      >
        {POST_TYPE_FILTERS.map((item) => (
          <li key={`type-${item.value}`}>
            <Radio
              checked={postType === item.value}
              name='type'
              onChange={handleChangeFilter}
              value={item.value}
            >
              {isKorean ? item.name : item.enName}
            </Radio>
          </li>
        ))}
      </ul>
      <LogClick
        eventName='filter_search'
        params={{ postType, region }}
      >
        <Button onClick={handleSearch}>{isKorean ? '찾기' : 'Search'}</Button>
      </LogClick>
    </Modal>
  );
};

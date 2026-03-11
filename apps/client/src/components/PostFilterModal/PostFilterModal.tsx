'use client';

import type {
  PostRegionFilter,
  PostTypeFilter,
} from 'components/PostFilterModal/PostFilterModal.type';
import type { ChangeEvent } from 'react';

import { Button, Modal, Radio, Typography, useModal } from '@devlog/components';
import { LogClick } from 'components/LogClick';
import {
  POST_REGION_FILTERS,
  POST_TYPE_FILTERS,
} from 'components/PostFilterModal/PostFilterModal.type';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import styles from './PostFilterModal.module.css';

interface PostFilterModalProps {
  modalKey?: string;
}

export const PostFilterModal = ({ modalKey }: PostFilterModalProps) => {
  const searchParams = useSearchParams();

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

  return (
    <Modal className={styles.postFilterModal}>
      <Typography
        semantic='h3'
        variants='title-medium'
      >
        포스트 필터
      </Typography>
      <hr />
      <ul className={styles.postFilterList}>
        {POST_REGION_FILTERS.map((item) => (
          <li key={`region-${item.value}`}>
            <Radio
              checked={region === item.value}
              name='region'
              onChange={handleChangeFilter}
              value={item.value}
            >
              {item.name}
            </Radio>
          </li>
        ))}
      </ul>
      <hr />
      <ul className={styles.postFilterList}>
        {POST_TYPE_FILTERS.map((item) => (
          <li key={`type-${item.value}`}>
            <Radio
              checked={postType === item.value}
              name='type'
              onChange={handleChangeFilter}
              value={item.value}
            >
              {item.name}
            </Radio>
          </li>
        ))}
      </ul>
      <LogClick
        eventName='filter_search'
        params={{ postType, region }}
      >
        <Button onClick={handleSearch}>찾기</Button>
      </LogClick>
    </Modal>
  );
};

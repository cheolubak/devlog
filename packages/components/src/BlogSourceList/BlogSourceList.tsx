'use client';

import type { BlogSource, FeedFetchResult } from '@devlog/domains';

import { getBlogSources } from '@devlog/apis';
import { useLoading } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Tab, Tabs } from '../Tabs';
import { Typography } from '../Typography';
import styles from './BlogSourceList.module.css';

interface BlogSourceListProps {
  blogSources: BlogSource[];
}

export const BlogSourceList = ({ blogSources }: BlogSourceListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get('type') ?? 'YOUTUBE';

  const { data, refetch } = useQuery({
    initialData: blogSources,
    queryFn: () => getBlogSources(type),
    queryKey: ['blogSources', type],
    staleTime: 1000 * 60 * 60,
  });

  const { hide, show } = useLoading();

  const handleFetchBlogSources = async (id: string) => {
    show('handleFetchBlogSources');

    await fetchApi.post<FeedFetchResult>(`/admin/blog-sources/${id}/fetch`);

    await refetch();

    hide('handleFetchBlogSources');
  };

  const handleChangeTab = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('type', value);

    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <>
      <Tabs
        onChange={handleChangeTab}
        value={type}
      >
        <Tab value='YOUTUBE'>YOUTUBE</Tab>
        <Tab value='BLOG'>BLOG</Tab>
      </Tabs>
      <ul className={styles.blogSourceList}>
        {data.map((source) => (
          <li
            className={styles.blogSourceItem}
            key={source.id}
          >
            <div className={styles.blogSourceContent}>
              <Typography
                semantic='h2'
                variants='display-small'
              >
                {source.name} [{source.totalPostsFetched}]
              </Typography>
              <Typography variants='title-medium'>{source.type}</Typography>
              <Typography>
                Last Fetched:{' '}
                {dayjs(source.lastFetchedAt).format('YYYY-MM-DD HH:mm:ss')}(
                {source.lastFetchStatus})
              </Typography>
              <Link
                className={styles.blogLink}
                href={source.blogUrl}
                target='_blank'
              >
                <Icon
                  color='primary'
                  name='link'
                />
                <Typography variants='body-medium'>{source.blogUrl}</Typography>
              </Link>
              <Typography variants='body-medium'>
                Fetch Source URL : {source.url}
              </Typography>
            </div>
            <Button
              color='secondary'
              onClick={() => handleFetchBlogSources(source.id)}
            >
              FETCH
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

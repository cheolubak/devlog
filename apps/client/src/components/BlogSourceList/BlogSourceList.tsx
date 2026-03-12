'use client';

import type { BlogSource, FeedFetchResult } from '@devlog/domains';

import { Button, Icon, Tab, Tabs, Typography } from '@devlog/components';
import { useLoading } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import { cn } from '@devlog/utils';
import { useQuery } from '@tanstack/react-query';
import { getBlogSources } from 'apis';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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
      <ul
        className={cn(
          'flex flex-col justify-start items-stretch gap-6',
        )}
      >
        {data.map((source) => (
          <li
            className={cn(
              'px-4 md:px-10 py-6 md:py-12 text-white',
              'flex justify-between items-center',
            )}
            key={source.id}
          >
            <div
              className={cn(
                'flex flex-col justify-center items-stretch gap-3',
              )}
            >
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
                className={cn('flex justify-start items-center gap-2')}
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

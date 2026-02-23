'use client';

import type { PostList as PostListData, ResponseList } from '@devlog/domain';

import { POST_TYPE } from '@devlog/domain';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { getPostList } from '@/packages/apis';

import { InfiniteScroll } from '../InfiniteScroll';
import { PostListItem } from '../PostListItem';
import { Typography } from '../Typography';

interface PostListProps {
  posts: ResponseList<PostListData>;
}

export const PostList = ({ posts: { data, pagination } }: PostListProps) => {
  'use no memo';

  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? POST_TYPE.BLOG;
  const q = searchParams.get('q') ?? '';

  const isDefaultView = type === POST_TYPE.BLOG && !q;

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.offset + 1 : undefined,
    initialData: isDefaultView
      ? {
          pageParams: [0],
          pages: [{ data, pagination }],
        }
      : undefined,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPostList({ page: pageParam, q, type }),
    queryKey: ['posts', { q, type }],
  });

  const postList = useMemo(
    () => posts?.pages.flatMap((page) => page.data) ?? [],
    [posts],
  );

  const rowVirtualizer = useWindowVirtualizer({
    count: postList.length,
    estimateSize: () => 220,
    overscan: 3,
  });

  if (!isFetching && postList.length === 0) {
    return (
      <div className='p-10 text-center text-white'>
        <Typography variants='title-large'>검색 결과가 없습니다.</Typography>
      </div>
    );
  }

  return (
    <InfiniteScroll
      fetchNext={fetchNextPage}
      hasNext={hasNextPage}
      isFetching={isFetching}
    >
      <article
        style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const post = postList[virtualItem.index];

          return (
            <PostListItem
              key={post.id}
              post={post}
              style={{
                height: virtualItem.size,
                left: 0,
                position: 'absolute',
                top: 0,
                transform: `translateY(${virtualItem.start}px)`,
                width: '100%',
              }}
            />
          );
        })}
      </article>
    </InfiniteScroll>
  );
};

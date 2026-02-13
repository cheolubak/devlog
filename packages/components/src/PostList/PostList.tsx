'use client';

import type { PostList as PostListData, ResponseList } from '@devlog/domain';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useMemo } from 'react';

import { getPostList } from '@/packages/apis';

import { InfiniteScroll } from '../InfiniteScroll';
import { PostListItem } from '../PostListItem';

interface PostListProps {
  posts: ResponseList<PostListData>;
}

export const PostList = ({ posts: { data, pagination } }: PostListProps) => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.offset + 1 : undefined,
    initialData: {
      pageParams: [0],
      pages: [{ data, pagination }],
    },
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPostList({ page: pageParam }),
    queryKey: ['posts'],
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

'use client';

import type { PostList as PostListData, ResponseList } from '@devlog/domains';

import { InfiniteScroll, Typography } from '@devlog/components';
import { getPostList } from 'apis/getPostList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { VirtualPostList } from 'components';
import { useSearchParams } from 'next/navigation';

import { PostListLoading } from './PostListLoading';

interface PostListProps {
  posts: ResponseList<PostListData>;
  sourceId?: string;
}

export const PostList = ({
  posts: { data, pagination },
  sourceId,
}: PostListProps) => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const isDefaultView = !q;

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
    queryFn: ({ pageParam }) => getPostList({ page: pageParam, q, sourceId }),
    queryKey: ['posts-list', { q, sourceId }],
  });

  const postList = posts?.pages.flatMap((page) => page.data) ?? [];

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
      <VirtualPostList postList={postList} />
      {isFetching && <PostListLoading />}
    </InfiniteScroll>
  );
};

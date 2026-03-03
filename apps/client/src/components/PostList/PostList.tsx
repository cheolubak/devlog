'use client';

import type { PostList as PostListData, ResponseList } from '@devlog/domains';

import { getPostList } from '@devlog/apis';
import { InfiniteScroll, Typography } from '@devlog/components';
import { POST_TYPE } from '@devlog/domains';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostItemLoading, VirtualPostList } from 'components';
import { useSearchParams } from 'next/navigation';

interface PostListProps {
  posts: ResponseList<PostListData>;
  sourceId?: string;
}

export const PostList = ({
  posts: { data, pagination },
  sourceId,
}: PostListProps) => {
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
    queryFn: ({ pageParam }) =>
      getPostList({ page: pageParam, q, sourceId, type }),
    queryKey: ['posts', { q, sourceId, type }],
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
      {isFetching &&
        new Array(10)
          .fill(() => null)
          .map((_, idx) => (
            <PostItemLoading key={`post-item-loading-${idx}`} />
          ))}
    </InfiniteScroll>
  );
};

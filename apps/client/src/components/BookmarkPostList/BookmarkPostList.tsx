'use client';

import type { PostList, ResponseList } from '@devlog/domains';

import { Button, InfiniteScroll, Typography } from '@devlog/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBookmarkPosts } from 'apis/getBookmarkPosts';
import { PostListLoading, VirtualPostList } from 'components';
import { useRouter, useSearchParams } from 'next/navigation';

interface BookmarkPostListProps {
  posts: ResponseList<PostList>;
  sourceId?: string;
}

export const BookmarkPostList = ({
  posts: { data, pagination },
  sourceId,
}: BookmarkPostListProps) => {
  const router = useRouter();
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
    queryFn: ({ pageParam }) =>
      getBookmarkPosts({ page: pageParam, q, sourceId }),
    queryKey: ['bookmark-posts-list', { q, sourceId }],
  });

  const postList = posts?.pages.flatMap((page) => page.data) ?? [];

  const handleGoPosts = () => {
    router.push('/');
  };

  if (!isFetching && postList.length === 0) {
    return (
      <div className='flex flex-col items-center gap-5 p-10 text-center text-white'>
        <Typography variants='title-large'>저장된 포스트가 없어요.</Typography>
        <Button
          color='success'
          onClick={handleGoPosts}
        >
          포스트 보러 가기
        </Button>
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

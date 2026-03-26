'use client';

import type { PostList, ResponseList } from '@devlog/domains';

import { Button, InfiniteScroll, Typography } from '@devlog/components';
import { useScrollRestoration } from '@devlog/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBookmarkPosts } from 'apis/getBookmarkPosts';
import { PostListLoading, VirtualPostList } from 'components';
import { useTranslateText } from 'hooks/useTranslateText';
import { useRouter, useSearchParams } from 'next/navigation';

interface BookmarkPostListProps {
  sourceId?: string;
}

export const BookmarkPostList = ({ sourceId }: BookmarkPostListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const translateText = useTranslateText();

  const q = searchParams.get('q') ?? '';

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    getNextPageParam: (lastPage: ResponseList<PostList>) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getBookmarkPosts({ page: pageParam, q, sourceId }),
    queryKey: ['bookmark-posts-list', { q, sourceId }],
  });

  const postList = posts?.pages.flatMap((page) => page.data) ?? [];

  useScrollRestoration({ isReady: postList.length > 0 });

  const handleGoPosts = () => {
    router.push('/');
  };

  if (!isFetching && postList.length === 0) {
    return (
      <div className='flex flex-col items-center gap-5 p-10 text-center text-white'>
        <Typography variants='title-large'>
          {translateText('bookmarkPostList.empty')}
        </Typography>
        <Button
          color='success'
          onClick={handleGoPosts}
        >
          {translateText('bookmarkPostList.goToPosts')}
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

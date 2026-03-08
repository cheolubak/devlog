'use client';

import type { PostList as PostListData, ResponseList } from '@devlog/domains';

import { InfiniteScroll, Typography } from '@devlog/components';
import { useScrollRestoration } from '@devlog/hooks';
import {
  type InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getBookmarkPosts } from 'apis/getBookmarkPosts';
import { getPostList } from 'apis/getPostList';
import { VirtualPostList } from 'components';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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

  const queryClient = useQueryClient();

  const { data: bookmarks } = useQuery({
    queryFn: () =>
      getBookmarkPosts({
        postIdList: data.map((post) => post.id),
      }),
    queryKey: ['first-post-bookmark'],
  });

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

  useEffect(() => {
    if (!bookmarks || !bookmarks.data || bookmarks.data.length === 0) {
      return;
    }

    const bookmarkPostIdList = bookmarks.data.map((post) => post.id);

    queryClient.setQueriesData<InfiniteData<ResponseList<PostListData>>>(
      { queryKey: ['posts-list'] },
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((item) => ({
              ...item,
              isBookmark: bookmarkPostIdList.includes(item.id),
            })),
          })),
        };
      },
    );
  }, [bookmarks]);

  const postList = posts?.pages.flatMap((page) => page.data) ?? [];

  useScrollRestoration({ isReady: postList.length > 0 });

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

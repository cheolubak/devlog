'use client';

import type { PostList as PostListData, ResponseList } from '@devlog/domain';

import { useInfiniteQuery } from '@tanstack/react-query';

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

  return (
    <article>
      <InfiniteScroll
        fetchNext={fetchNextPage}
        hasNext={hasNextPage}
        isFetching={isFetching}
      >
        {posts?.pages
          .flatMap((page) => page.data)
          .map((post) => (
            <PostListItem
              key={post.id}
              post={post}
            />
          ))}
      </InfiniteScroll>
    </article>
  );
};

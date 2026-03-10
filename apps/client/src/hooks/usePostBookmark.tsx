import type { PostList, ResponseList } from '@devlog/domains';

import { useModal } from '@devlog/components';
import { useAnalytics } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { LoginModal } from 'components/LoginModal';
import { useAuth } from 'hooks';
import { useRef } from 'react';

export const usePostBookmark = (post: PostList) => {
  const { open } = useModal();
  const { isLogin } = useAuth();
  const { eventBookmark } = useAnalytics();

  const queryClient = useQueryClient();

  const prevBookmark = useRef(post.isBookmark);

  const { mutate } = useMutation({
    mutationFn: () => fetchApi.post(`/posts/bookmarks/${post.id}`),
    mutationKey: ['posts', 'bookmark', post],
    onError: () => {
      queryClient.setQueriesData<InfiniteData<ResponseList<PostList>>>(
        { queryKey: ['posts-list'] },
        (oldData) => {
          if (!oldData) return oldData;

          return handleBookmarkUpdate({
            data: oldData,
            isBookmark: prevBookmark.current,
          });
        },
      );
    },
    onMutate: () => {
      eventBookmark(post);

      queryClient.setQueriesData<InfiniteData<ResponseList<PostList>>>(
        { queryKey: ['posts-list'] },
        (oldData) => {
          if (!oldData) return oldData;

          return handleBookmarkUpdate({
            data: oldData,
          });
        },
      );
      queryClient.setQueriesData<InfiniteData<ResponseList<PostList>>>(
        {
          queryKey: ['bookmark-posts-list'],
        },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: prevBookmark.current
                ? page.data.filter((item) => item.id !== post.id)
                : [...page.data, post],
            })),
          };
        },
      );
    },
    onSuccess: () => {
      prevBookmark.current = !prevBookmark.current;
    },
  });

  const handleBookmark = () => {
    if (!isLogin) {
      return open(<LoginModal />);
    }

    mutate();
  };

  const handleBookmarkUpdate = ({
    data,
    isBookmark,
  }: {
    data: InfiniteData<ResponseList<PostList>>;
    isBookmark?: boolean;
  }) => {
    return {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: page.data.map((item) =>
          item.id === post.id
            ? {
                ...item,
                isBookmark:
                  typeof isBookmark !== 'undefined'
                    ? isBookmark
                    : !item.isBookmark,
              }
            : item,
        ),
      })),
    };
  };

  return handleBookmark;
};

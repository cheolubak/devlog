import type { PostList, ResponseList } from '@devlog/domains';

import { useModal } from '@devlog/components';
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
      queryClient.setQueriesData<InfiniteData<ResponseList<PostList>>>(
        { queryKey: ['posts-list'] },
        (oldData) => {
          if (!oldData) return oldData;

          return handleBookmarkUpdate({
            data: oldData,
            isBookmark: !prevBookmark.current,
          });
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
    isBookmark: boolean;
  }) => {
    return {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: page.data.map((item) =>
          item.id === post.id ? { ...item, isBookmark } : item,
        ),
      })),
    };
  };

  return handleBookmark;
};

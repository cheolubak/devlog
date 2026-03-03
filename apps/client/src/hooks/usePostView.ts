import type { PostList } from '@devlog/domains';

import { type ResponseList } from '@devlog/domains';
import { fetchApi } from '@devlog/request';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const usePostView = (post: PostList) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => fetchApi.put(`posts/view/${post.id}`),
    mutationKey: ['posts', 'view', post],
    onError: () => {
      queryClient.setQueriesData<InfiniteData<ResponseList<PostList>>>(
        { queryKey: ['posts-list'] },
        (oldData) => {
          if (!oldData) return oldData;

          return handleViewCountUpdate({ count: -1, data: oldData });
        },
      );
    },
    onMutate: () => {
      queryClient.setQueriesData<InfiniteData<ResponseList<PostList>>>(
        { queryKey: ['posts-list'] },
        (oldData) => {
          if (!oldData) return oldData;

          return handleViewCountUpdate({ count: 1, data: oldData });
        },
      );
    },
  });

  const handleViewCountUpdate = ({
    count,
    data,
  }: {
    count: number;
    data: InfiniteData<ResponseList<PostList>>;
  }) => {
    return {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: page.data.map((item) =>
          item.id === post.id
            ? { ...item, viewCount: item.viewCount + count }
            : item,
        ),
      })),
    };
  };

  return mutate;
};

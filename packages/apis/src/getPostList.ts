import { fetchApi } from '@devlog/request';

import type {
  PostList as PostListData,
  ResponseList,
} from '@/packages/domains';

export const getPostList = (info?: { page?: number }) => {
  const { page = 0 } = info ?? {};

  return fetchApi.get<ResponseList<PostListData>>(`/posts/${page}`, {
    next: {
      revalidate: 3600,
      tags: ['posts'],
    },
  });
};

import { fetchApi } from '@devlog/request';

import type {
  PostList as PostListData,
  ResponseList,
} from '@/packages/domains';

export const getPostList = (info?: {
  page?: number;
  q?: string;
  type?: string;
}) => {
  const { page = 0, q, type } = info ?? {};

  const params: Record<string, string> = {};
  if (type) params.type = type;
  if (q) params.q = q;

  const isDefaultView = (!type || type === 'blog') && !q;

  return fetchApi.get<ResponseList<PostListData>>(`/posts/${page}`, {
    next: isDefaultView
      ? { revalidate: 3600, tags: ['posts'] }
      : { revalidate: false },
    params,
  });
};

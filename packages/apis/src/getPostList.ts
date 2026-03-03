import type { PostList as PostListData, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';

export const getPostList = (info?: {
  page?: number;
  q?: string;
  sourceId?: string;
  type?: string;
}) => {
  const { page = 0, q, sourceId, type } = info ?? {};

  const params: Record<string, string> = {};
  if (type) params.type = type;
  if (q) params.q = q;
  if (sourceId) params.sourceId = sourceId;

  const isDefaultView = (!type || type === 'blog') && !q;

  return fetchApi.get<ResponseList<PostListData>>(`/posts/${page}`, {
    next: isDefaultView
      ? { revalidate: 3600, tags: ['posts'] }
      : { revalidate: false },
    params,
  });
};

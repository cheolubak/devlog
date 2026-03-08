import type { PostList as PostListData, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';

export const getPostList = async (info?: {
  page?: number;
  q?: string;
  sourceId?: string;
}) => {
  const { page, q, sourceId } = info ?? {};

  const params: Record<string, string> = {};

  if (page) {
    params.page = page.toString();
  }

  if (q) {
    params.q = q;
  }

  if (sourceId) {
    params.sourceId = sourceId;
  }

  return fetchApi.get<ResponseList<PostListData>>(`/posts`, {
    next: { revalidate: 3600, tags: ['posts'] },
    params,
  });
};

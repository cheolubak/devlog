import type { PostList, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';

export const getBookmarkPosts = async (info?: {
  page?: number;
  postIdList?: string[];
  q?: string;
  sourceId?: string;
}) => {
  const { page, postIdList, q, sourceId } = info ?? {};

  const params: Record<string, string | string[]> = {};

  if (page) {
    params.page = page.toString();
  }

  if (q) {
    params.q = q;
  }

  if (sourceId) {
    params.sourceId = sourceId;
  }

  if (postIdList) {
    params.postIdList = postIdList;
  }

  return fetchApi.get<ResponseList<PostList>>(`/posts/bookmarks`, {
    params,
  });
};

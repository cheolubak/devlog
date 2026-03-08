import type { PostList as PostListData, ResponseList } from '@devlog/domains';
import type {
  PostRegionFilter,
  PostTypeFilter,
} from 'components/PostFilterModal/PostFilterModal.type';

import { fetchApi } from '@devlog/request';

export const getPostList = async (info?: {
  page?: number;
  q?: string;
  region?: PostRegionFilter;
  sourceId?: string;
  type?: PostTypeFilter;
}) => {
  const { page, q, region, sourceId, type } = info ?? {};

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

  if (region) {
    params.region = region;
  }

  if (type) {
    params.type = type;
  }

  return fetchApi.get<ResponseList<PostListData>>(`/posts`, {
    next: { revalidate: 3600, tags: ['posts'] },
    params,
  });
};

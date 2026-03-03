import type { PostList as PostListData, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { ACCESS_TOKEN_KEY, SESSION_ID_KEY } from 'constants/auth';

export const getPostList = async (info?: {
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

  const headers: Record<string, string> = {};

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');

    const cookieStores = await cookies();

    let cookie = `${SESSION_ID_KEY}=${cookieStores.get(SESSION_ID_KEY)?.value}`;

    const accessToken = cookieStores.get(ACCESS_TOKEN_KEY)?.value;
    if (accessToken) {
      cookie += `; ${ACCESS_TOKEN_KEY}=${accessToken}`;
    }

    headers['Cookie'] = cookie;
  }

  return fetchApi.get<ResponseList<PostListData>>(`/posts/${page}`, {
    headers,
    next: isDefaultView
      ? { revalidate: 3600, tags: ['posts'] }
      : { revalidate: false },
    params,
  });
};

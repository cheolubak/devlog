import type { PostList, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { ACCESS_TOKEN_KEY, SESSION_ID_KEY } from 'constants/auth';

export const getBookmarkPosts = async (info?: {
  page?: number;
  q?: string;
  sourceId?: string;
}) => {
  const { page = 0, q, sourceId } = info ?? {};

  const params: Record<string, string> = {};
  if (q) params.q = q;
  if (sourceId) params.sourceId = sourceId;

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

  return fetchApi.get<ResponseList<PostList>>(`/posts/${page}/bookmarks`, {
    headers,
    next: { revalidate: 3600, tags: ['posts'] },
    params,
  });
};

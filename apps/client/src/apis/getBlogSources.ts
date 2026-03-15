import type { BlogSource } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { ADMIN_AUTH_KEY } from 'constants/auth';
import { cookies } from 'next/headers';

export const getBlogSources = async (type: string) => {
  const cookieStore = await cookies();
  const checkAuth = cookieStore.get(ADMIN_AUTH_KEY)?.value;

  return fetchApi.get<BlogSource[]>('/admin/blog-sources', {
    headers: checkAuth
      ? { Cookie: `${ADMIN_AUTH_KEY}=${checkAuth}` }
      : undefined,
    params: { type },
  });
};

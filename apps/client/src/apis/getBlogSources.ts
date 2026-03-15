import type { BlogSource } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { ADMIN_AUTH_KEY } from 'constants/auth';
import { getAdminAuthCookie } from 'helper/getAdminAuthCookie';

export const getBlogSources = async (type: string): Promise<BlogSource[]> => {
  const checkAuth = await getAdminAuthCookie();

  return fetchApi.get<BlogSource[]>('/admin/blog-sources', {
    headers: checkAuth
      ? { Cookie: `${ADMIN_AUTH_KEY}=${checkAuth}` }
      : undefined,
    params: { type },
  });
};

import type { PostListAll, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { PostListEditDisplay } from 'components';
import { ADMIN_AUTH_KEY } from 'constants/auth';
import { getAdminAuthCookie } from 'helper/getAdminAuthCookie';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ isDisplay?: 'false' | 'true' }>;
}) {
  const { page } = await params;
  const { isDisplay = 'false' } = await searchParams;

  const checkAuth = await getAdminAuthCookie();

  const res = await fetchApi.get<ResponseList<PostListAll>>(
    `admin/posts/${page}`,
    {
      headers: checkAuth
        ? { Cookie: `${ADMIN_AUTH_KEY}=${checkAuth}` }
        : undefined,
      next: {
        revalidate: 0,
      },
      params: {
        isDisplay,
      },
    },
  );

  return (
    <PostListEditDisplay
      page={z.coerce.number().parse(page)}
      posts={res}
      type='blogs'
    />
  );
}

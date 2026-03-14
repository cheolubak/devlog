import type { PostListAll, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { PostListEditDisplay } from 'components';
import { ADMIN_AUTH_KEY } from 'constants/auth';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: number }>;
  searchParams: Promise<{ isDisplay?: 'false' | 'true' }>;
}) {
  const { page } = await params;
  const { isDisplay = 'false' } = await searchParams;

  const cookieStore = await cookies();
  const checkAuth = cookieStore.get(ADMIN_AUTH_KEY)?.value;

  const res = await fetchApi.get<ResponseList<PostListAll>>(
    `admin/youtubes/${page}`,
    {
      headers: {
        Cookie: checkAuth ? `${ADMIN_AUTH_KEY}=${checkAuth}` : '',
      },
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
      type='youtubes'
    />
  );
}

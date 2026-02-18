import { z } from 'zod';

import type { PostListAll, ResponseList } from '@/packages/domains';

import { PostListEditDisplay } from '@/packages/components';
import { fetchApi } from '@/packages/request';

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

  const res = await fetchApi.get<ResponseList<PostListAll>>(
    `admin/posts/${page}`,
    {
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

import type { PostListAll, ResponseList } from '@devlog/domains';

import { PostListEditDisplay } from '@devlog/components';
import { fetchApi } from '@devlog/request';
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

  const res = await fetchApi.get<ResponseList<PostListAll>>(
    `admin/youtubes/${page}`,
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
      type='youtubes'
    />
  );
}

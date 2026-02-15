import { z } from 'zod';

import type { PostListAll, ResponseList } from '@/packages/domains';

import { PostListEditDisplay } from '@/packages/components';
import { fetchApi } from '@/packages/request';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  params,
}: {
  params: Promise<{ page: number }>;
}) {
  const { page } = await params;

  const res = await fetchApi.get<ResponseList<PostListAll>>(
    `admin/youtubes/${page}`,
    {
      next: {
        revalidate: 0,
      },
    },
  );

  return (
    <PostListEditDisplay
      page={z.coerce.number().parse(page)}
      posts={res}
    />
  );
}

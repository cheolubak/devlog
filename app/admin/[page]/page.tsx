import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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
  const cookieStore = await cookies();

  const checkAuth = cookieStore.get('auth')?.value;

  if (checkAuth !== 'IKZtsfpbt5vIT60qNrLBsbfymCvBoMQo7NyzLWeaHu7lqwzm') {
    redirect('/');
  }

  const { page } = await params;

  const res = await fetchApi.get<ResponseList<PostListAll>>(
    `admin/posts/${page}`,
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

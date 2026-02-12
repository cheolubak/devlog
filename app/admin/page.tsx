import type { PostListAll, ResponseList } from '@devlog/domain';

import { PostListEditDisplay } from '@devlog/components';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { fetchApi } from '@/packages/request';

export default async function AdminPage() {
  const cookieStore = await cookies();

  const checkAuth = cookieStore.get('auth')?.value;

  if (checkAuth !== 'IKZtsfpbt5vIT60qNrLBsbfymCvBoMQo7NyzLWeaHu7lqwzm') {
    redirect('/');
  }

  const res = await fetchApi.get<ResponseList<PostListAll>>('admin/posts/0', {
    next: {
      revalidate: 0,
    },
  });

  return <PostListEditDisplay posts={res} />;
}

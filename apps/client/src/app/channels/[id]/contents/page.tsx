import type { BlogSource } from '@devlog/domains';

import { getPostList } from '@devlog/apis';
import { ChannelContentHeader, PostList, Typography } from '@devlog/components';
import { fetchApi } from '@devlog/request';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function ChannelContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;

    const [channel, posts] = await Promise.all([
      fetchApi.get<BlogSource>(`/channels/${id}`, {
        next: {
          revalidate: 3600,
        },
      }),
      getPostList({ sourceId: id }),
    ]);

    return (
      <Suspense>
        <ChannelContentHeader channel={channel} />
        <PostList
          posts={posts}
          sourceId={id}
        />
      </Suspense>
    );
  } catch (e) {
    console.error('=======Channel Content Page Error=======');
    if (e instanceof Error) {
      console.error('Message:', e.message);
      console.error('Stack:', e.stack);
    } else {
      console.error('Unknown Error:', e);
    }

    return (
      <div className='p-10 text-center'>
        <Typography variants='title-large'>오류가 발생했습니다.</Typography>
        <Typography>
          {e instanceof Error ? e.message : '알 수 없는 오류'}
        </Typography>
      </div>
    );
  }
}

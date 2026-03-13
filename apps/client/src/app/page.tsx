import type {
  PostRegionFilter,
  PostTypeFilter,
} from 'components/PostFilterModal/PostFilterModal.type';

import { Typography } from '@devlog/components';
import { log } from '@devlog/logger';
import { getPostList } from 'apis';
import { PostList, PostListLoading } from 'components';
import { Suspense } from 'react';

export const revalidate = 3600;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ region?: PostRegionFilter; type?: PostTypeFilter }>;
}) {
  try {
    const { region, type } = await searchParams;
    const posts = await getPostList({ region, type });

    return (
      <Suspense fallback={<PostListLoading />}>
        <PostList posts={posts} />
      </Suspense>
    );
  } catch (e) {
    log.error('Home Page Error', { error: JSON.stringify(e) });

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

import { Typography } from '@devlog/components';
import { log } from '@devlog/logger';
import { PostListLoading } from 'components';
import { BookmarkPostList } from 'components/BookmarkPostList';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default async function MypageBookmarks() {
  try {
    return (
      <Suspense fallback={<PostListLoading />}>
        <BookmarkPostList />
      </Suspense>
    );
  } catch (e) {
    log.error('Bookmark Page Error', { error: JSON.stringify(e) });

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

import { getPostList } from '@devlog/apis';
import { Typography } from '@devlog/components';
import { PostList } from 'components';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function Home() {
  try {
    const posts = await getPostList();

    return (
      <Suspense>
        <PostList posts={posts} />
      </Suspense>
    );
  } catch (e) {
    console.error('=======Home Page Error=======');
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

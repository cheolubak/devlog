import { getPostList } from '@devlog/apis';
import { PostList, Typography } from '@devlog/components';

export const revalidate = 3600;

export default async function Home() {
  try {
    const posts = await getPostList();

    return <PostList posts={posts} />;
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

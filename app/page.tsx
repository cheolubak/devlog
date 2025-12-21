import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardThumbnail,
  IconButton,
  PostGrid,
  Typography,
} from '@devlog/components';
import { fetchApi } from '@devlog/request';
import dayjs from 'dayjs';
import Link from 'next/dist/client/link';

import { PostList } from '@/domains/PostList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const posts = await fetchApi.get<PostList[]>('/posts/1', {
      next: {
        revalidate: 86400,
        tags: ['posts'],
      },
    });

    return (
      <PostGrid>
        {posts.map((post) => (
          <Link
            href={`posts/${post.id}`}
            key={post.id}
          >
            <Card>
              <CardThumbnail
                alt={post.title}
                src={post.thumbnail}
              />
              <CardHeader>
                <Typography variants='title-medium'>{post.title}</Typography>
              </CardHeader>
              <CardContent>
                <Typography
                  maxLines={5}
                  variants='body-large'
                >
                  {post.content}
                </Typography>
              </CardContent>
              <CardFooter className={'flex justify-between items-center'}>
                <Typography>
                  {dayjs(post.created_at).format('YYYY.MM.DD')}
                </Typography>
                <IconButton
                  iconColor='primary'
                  iconSize={20}
                  name='share'
                />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </PostGrid>
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

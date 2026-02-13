'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { PostListAll, ResponseList } from '@/packages/domains';

import { fetchApi } from '@/packages/request';

import { Button } from '../Button';
import { PostListItemEditDisplay } from '../PostListItemEditDisplay';
import styles from './PostListEditDisplay.module.css';

interface PostListEditDisplayProps {
  page: number;
  posts: ResponseList<PostListAll>;
}

export const PostListEditDisplay = ({
  page,
  posts,
}: PostListEditDisplayProps) => {
  const router = useRouter();

  const { mutate: onChangeDisplay } = useMutation({
    mutationFn: ({ id, isDisplay }: { id: string; isDisplay: boolean }) => {
      return fetchApi.patch(`/admin/edit/posts/${id}`, { isDisplay });
    },
    mutationKey: ['posts', 'display'],
    onError: () => {
      alert('변경 실패');
    },
    onSuccess: () => {
      alert('변경 성공');
    },
  });

  const { mutate: onDeletePost } = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return fetchApi.delete(`/admin/edit/posts/${id}`);
    },
    mutationKey: ['posts', 'delete'],
    onError: () => {
      alert('삭제 실패');
    },
    onSuccess: () => {
      alert('삭제 성공');
    },
  });

  const handleChangeDisplay = (id: string, isDisplay: boolean) => {
    onChangeDisplay({ id, isDisplay });
  };

  const handleDelete = (id: string) => {
    onDeletePost({ id });
  };

  const handleNextPage = () => {
    window.scrollTo({ top: 0 });
    router.push(`/admin/${page + 1}`, {
      scroll: false,
    });
  };

  const handlePrevPage = () => {
    window.scrollTo({ top: 0 });
    router.push(`/admin/${page - 1}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <div className={styles.menus}>
        <Button
          color='secondary'
          disabled={page <= 0}
          onClick={handlePrevPage}
          size='sm'
        >
          이전
        </Button>
        <Button
          color='secondary'
          disabled={!posts.pagination.hasMore}
          onClick={handleNextPage}
          size='sm'
        >
          다음
        </Button>
      </div>
      {posts.data.map((post) => (
        <PostListItemEditDisplay
          key={post.id}
          onChangeDisplay={(isDisplay) =>
            handleChangeDisplay(post.id, isDisplay)
          }
          onDelete={() => handleDelete(post.id)}
          post={post}
        />
      ))}
    </div>
  );
};

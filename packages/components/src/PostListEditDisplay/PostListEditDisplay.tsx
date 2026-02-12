'use client';

import { useMutation } from '@tanstack/react-query';

import type { PostListAll, ResponseList } from '@/packages/domains';

import { PostListItemEditDisplay } from '@/packages/components';
import { fetchApi } from '@/packages/request';

interface PostListEditDisplayProps {
  posts: ResponseList<PostListAll>;
}

export const PostListEditDisplay = ({ posts }: PostListEditDisplayProps) => {
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

  return (
    <div>
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

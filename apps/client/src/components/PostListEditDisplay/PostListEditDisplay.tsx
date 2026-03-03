'use client';

import type { PostListAll, ResponseList } from '@devlog/domains';

import { Button, Switch, Typography } from '@devlog/components';
import { useLoading } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import { useMutation } from '@tanstack/react-query';
import { PostListItemEditDisplay } from 'components';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './PostListEditDisplay.module.css';

interface PostListEditDisplayProps {
  page: number;
  posts: ResponseList<PostListAll>;
  type: 'blogs' | 'youtubes';
}

export const PostListEditDisplay = ({
  page,
  posts,
  type,
}: PostListEditDisplayProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { hide, show } = useLoading();

  const isDisplay = searchParams.get('isDisplay') === 'true';

  const { mutate: onChangeDisplay } = useMutation({
    mutationFn: ({ id, isDisplay }: { id: string; isDisplay: boolean }) => {
      return fetchApi.patch(`/admin/edit/posts/${id}`, { isDisplay });
    },
    mutationKey: ['posts', 'display'],
    onError: () => {
      alert('변경 실패');
    },
    onMutate: () => {
      show('changeDisplay');
    },
    onSettled: () => {
      hide('changeDisplay');
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
    onMutate: () => {
      show('deletePost');
    },
    onSettled: () => {
      hide('deletePost');
    },
    onSuccess: () => {
      alert('삭제 성공');
      router.refresh();
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
    router.push(`/admin/${type}/${page + 1}?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  const handlePrevPage = () => {
    window.scrollTo({ top: 0 });
    router.push(`/admin/${type}/${page - 1}?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  const handleChangeShowListDisplay = (isDiaplay: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('isDisplay', isDiaplay ? 'true' : 'false');

    router.replace(`?${newSearchParams.toString()}`);
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
        <div className={styles.displaySwitch}>
          <Switch
            checked={isDisplay}
            onChange={handleChangeShowListDisplay}
          />
          <Typography>노출 콘텐츠 여부</Typography>
        </div>
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

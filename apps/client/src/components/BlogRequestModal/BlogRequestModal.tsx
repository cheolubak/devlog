'use client';

import type { ChangeEvent } from 'react';

import {
  Button,
  Input,
  InputGroup,
  Modal,
  Typography,
  useModal,
} from '@devlog/components';
import { useLoading } from '@devlog/hooks';
import { fetchApi } from '@devlog/request';
import { cn } from '@devlog/utils';
import { useMutation } from '@tanstack/react-query';
import { DefaultModal } from 'components';
import { useAuth } from 'hooks';
import { useRef } from 'react';

interface BlogRequestModalProps {
  modalKey?: string;
}

export const BlogRequestModal = ({ modalKey }: BlogRequestModalProps) => {
  const { close, open } = useModal();
  const { user } = useAuth();
  const { hide, show } = useLoading();

  const requestInfo = useRef<{ email: string; url: string }>({
    email: user?.email ?? '',
    url: '',
  });

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    requestInfo.current[name as keyof typeof requestInfo.current] = value;
  };

  const handleClickClose = () => {
    close(modalKey);
  };

  const { mutate } = useMutation({
    mutationFn: () => {
      const { email, url } = requestInfo.current;
      if (
        !url ||
        url.replace(/\s/g, '').length === 0 ||
        !email ||
        email.replace(/\s/g, '').length === 0
      ) {
        throw new Error('입력하신 요청하신 내용을 다시 확인 해주세요');
      } else {
        return fetchApi.post('/request/blogs', {
          email: email.replace(/\s/g, ''),
          url: url.replace(/\s/g, ''),
        });
      }
    },
    mutationKey: ['blog-request'],
    onError: (e) => {
      let message = '오류가 발생했어요.\n잠시후에 다시 시도해주세요.';

      if (e instanceof Error && !('response' in e)) {
        message = e.message;
      }

      open(
        <DefaultModal
          confirmText='확인'
          description={message}
          title='요청 실패 😭'
        />,
      );
    },
    onMutate: () => {
      show('blog-request');
    },
    onSettled: () => {
      hide('blog-request');
    },
    onSuccess: () => {
      close(modalKey);
      open(
        <DefaultModal
          confirmText='확인'
          description='빠른 확인 후 추가할게요.'
          title='요청 완료! 😍'
        />,
      );
    },
  });

  return (
    <Modal className={cn('px-4 md:px-8 py-6 md:py-10 overflow-y-auto')}>
      <Typography
        className={cn('mb-4 text-center')}
        semantic='h3'
        variants='title-large'
      >
        블로그 요청
      </Typography>
      <Typography
        className={cn('mb-8 text-center')}
        semantic='p'
      >
        {
          '"DEVCURATE"에 등록이 안 된,\n보고 싶은 블로그가 있다면\n아래의 양식을 입력해 요청해주세요.\n확인 후 추가하고 입력하신 이메일로 알려드릴게요.'
        }
      </Typography>

      <form className={cn('flex flex-col gap-4 mb-8')}>
        <InputGroup label='블로그 URL'>
          <Input
            name='url'
            onChange={handleChangeValue}
            placeholder='블로그 URL을 입력해주세요(https:// 포함)'
          />
        </InputGroup>
        <InputGroup label='요청자 이메일'>
          <Input
            defaultValue={user?.email ?? ''}
            name='email'
            onChange={handleChangeValue}
            placeholder='요청하신 분의 이메일을 입력해주세요'
          />
        </InputGroup>
      </form>

      <footer
        className={cn(
          'flex justify-center items-center gap-2',
          '[&>*]:flex-1 [&>*:first-child]:text-gray-900',
        )}
      >
        <Button
          onClick={handleClickClose}
          variant='text'
        >
          그만하기
        </Button>
        <Button onClick={() => mutate()}>요청하기</Button>
      </footer>
    </Modal>
  );
};

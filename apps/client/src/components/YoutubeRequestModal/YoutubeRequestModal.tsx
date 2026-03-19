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
import { useTranslateText } from 'hooks/useTranslateText';
import { useRef } from 'react';

interface YoutubeRequestModalProps {
  modalKey?: string;
}

export const YoutubeRequestModal = ({
  modalKey,
}: YoutubeRequestModalProps) => {
  const { close, open } = useModal();
  const { user } = useAuth();
  const { hide, show } = useLoading();
  const t = useTranslateText();

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
      const normalizedEmail = email.replace(/\s/g, '');
      const normalizedUrl = url.replace(/\s/g, '');
      if (normalizedUrl.length === 0 || normalizedEmail.length === 0) {
        throw new Error(t('request.validationError'));
      }
      if (!/^https?:\/\//i.test(normalizedUrl)) {
        throw new Error(t('request.validationUrl'));
      }
      return fetchApi.post('/request/youtubes', {
        email: normalizedEmail,
        url: normalizedUrl,
      });
    },
    mutationKey: ['youtube-request'],
    onError: (e) => {
      let message = t('request.error');

      if (e instanceof Error && !('response' in e)) {
        message = e.message;
      }

      open(
        <DefaultModal
          confirmText={t('common.confirm')}
          description={message}
          title={t('request.failTitle')}
        />,
      );
    },
    onMutate: () => {
      show('youtube-request');
    },
    onSettled: () => {
      hide('youtube-request');
    },
    onSuccess: () => {
      close(modalKey);
      open(
        <DefaultModal
          confirmText={t('common.confirm')}
          description={t('request.successDescription')}
          title={t('request.successTitle')}
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
        {t('youtubeRequest.title')}
      </Typography>
      <Typography
        className={cn('mb-8 text-center')}
        semantic='p'
      >
        {t('youtubeRequest.description')}
      </Typography>

      <form className={cn('flex flex-col gap-4 mb-8')}>
        <InputGroup label={t('youtubeRequest.urlLabel')}>
          <Input
            name='url'
            onChange={handleChangeValue}
            placeholder={t('youtubeRequest.urlPlaceholder')}
          />
        </InputGroup>
        <InputGroup label={t('blogRequest.emailLabel')}>
          <Input
            defaultValue={user?.email ?? ''}
            name='email'
            onChange={handleChangeValue}
            placeholder={t('blogRequest.emailPlaceholder')}
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
          {t('blogRequest.cancel')}
        </Button>
        <Button onClick={() => mutate()}>{t('blogRequest.submit')}</Button>
      </footer>
    </Modal>
  );
};

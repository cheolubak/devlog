'use client';

import type { User } from '@devlog/domains';
import type { ReactNode } from 'react';

import { Button, Icon, Typography, useModal } from '@devlog/components';
import { cn } from '@devlog/utils';
import { BlogRequestModal, DefaultModal } from 'components';
import { LogClick } from 'components/LogClick';
import { LoginModal } from 'components/LoginModal';
import { YoutubeRequestModal } from 'components/YoutubeRequestModal';
import { useAuth } from 'hooks';
import { useTranslateText } from 'hooks/useTranslateText';
import Image from 'next/image';
import Link from 'next/link';

const SOCIAL_ICON: Record<User['socialType'], ReactNode> = {
  GITHUB: (
    <Icon
      color='var(--color-white)'
      name='github'
      size={24}
    />
  ),
  GOOGLE: (
    <Icon
      name='google'
      size={24}
    />
  ),
  KAKAO: (
    <Icon
      color='#fee500'
      name='kakao'
    />
  ),
  NAVER: (
    <Icon
      color='#03C75A'
      name='naver'
    />
  ),
};

export const MyPage = () => {
  const { isLogin, leave, logout, user } = useAuth();
  const { open } = useModal();

  const translateText = useTranslateText();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    if (isLogin) {
      return;
    }

    open(<LoginModal />);
  };

  const handleLeave = () => {
    open(
      <DefaultModal
        cancelText={translateText('myPage.leaveConfirmNo')}
        confirmText={translateText('myPage.leaveConfirmYes')}
        description={translateText('myPage.leaveConfirmDescription')}
        onConfirm={leave}
        title={translateText('myPage.leaveConfirmTitle')}
      />,
    );
  };

  const handleClickPrivacyPolicy = () => {
    window.open('/policy/privacy', '_blank');
  };

  const handleClickServicePolicy = () => {
    window.open('/policy/services', '_blank');
  };

  const handleRequestBlog = () => {
    open(<BlogRequestModal />);
  };

  const handleRequestYoutube = () => {
    open(<YoutubeRequestModal />);
  };

  return (
    <main
      className={cn(
        'pb-2 md:pb-10',
        'px-4 md:px-10',
        'text-white',
        'h-[calc(100dvh-170px)] md:h-[calc(100dvh-232px)]',
        'box-border',
        'flex',
        'flex-col',
        'items-start',
      )}
    >
      <Typography
        className={cn('mb-10')}
        variants='title-medium'
      >
        {translateText('myPage.title')}
      </Typography>

      {user && (
        <header
          className={cn(
            'flex',
            'justify-between',
            'items-center',
            'gap-4',
            'mb-10',
          )}
        >
          {user.profile ? (
            <Image
              alt={user.nickname}
              className={cn('object-cover', 'rounded-full', 'bg-white')}
              height={48}
              src={user.profile}
              width={48}
            />
          ) : (
            <Image
              alt={user.nickname}
              className={cn('object-cover', 'rounded-full', 'bg-white')}
              height={48}
              src='/logo.svg'
              width={48}
            />
          )}
          <div
            className={cn(
              'flex',
              'flex-col',
              'justify-start',
              'items-start',
              'gap-2',
            )}
          >
            <Typography variants='title-large'>
              {translateText('myPage.greeting', { nickname: user.nickname })}
            </Typography>
            <div
              className={cn('flex', 'justify-start', 'items-center', 'gap-2')}
            >
              {SOCIAL_ICON[user.socialType]}
              {user.email && <Typography>{user.email}</Typography>}
            </div>
          </div>
        </header>
      )}

      <article
        className={cn(
          'w-full',
          'h-full',
          'flex',
          'flex-col',
          'justify-between',
          'items-start',
        )}
      >
        <div
          className={cn(
            'w-full',
            'flex',
            'flex-col',
            'justify-start',
            'items-start',
            'gap-3',
          )}
        >
          {isLogin && (
            <LogClick eventName='mypage_bookmark_click'>
              <Link
                className={cn(
                  'px-4',
                  'h-[44px]',
                  'inline-flex',
                  'justify-center',
                  'items-center',
                  'gap-2',
                )}
                href='/mypage/bookmarks'
              >
                <Icon
                  color='var(--color-white)'
                  name='bookmark-fill'
                />
                <Typography variants='title-medium'>
                  {translateText('myPage.bookmarks')}
                </Typography>
              </Link>
            </LogClick>
          )}
          <LogClick eventName='mypage_blog_request_click'>
            <Button onClick={handleRequestBlog}>
              <Icon
                color='var(--color-white)'
                name='rss'
              />
              <Typography variants='title-medium'>
                {translateText('myPage.rssBlogRequest')}
              </Typography>
            </Button>
          </LogClick>
          <LogClick eventName='mypage_youtube_request_click'>
            <Button onClick={handleRequestYoutube}>
              <Icon
                color='var(--color-white)'
                name='youtube'
              />
              <Typography variants='title-medium'>
                {translateText('myPage.youtubeChannelRequest')}
              </Typography>
            </Button>
          </LogClick>
        </div>

        {!isLogin && (
          <LogClick eventName='mypage_login_click'>
            <Button
              className={cn('w-full')}
              color='success'
              onClick={handleLogin}
            >
              {translateText('common.login')}
            </Button>
          </LogClick>
        )}

        <footer
          className={cn('w-full', 'flex', 'flex-col', 'items-start', 'gap-4')}
        >
          <LogClick eventName='mypage_privacy_policy_click'>
            <Button
              onClick={handleClickPrivacyPolicy}
              size='sm'
              variant='text'
            >
              <Typography variants='body-medium'>
                {translateText('common.privacyPolicy')}
              </Typography>
            </Button>
          </LogClick>
          <LogClick eventName='mypage_service_policy_click'>
            <Button
              onClick={handleClickServicePolicy}
              size='sm'
              variant='text'
            >
              <Typography variants='body-medium'>
                {translateText('common.servicePolicy')}
              </Typography>
            </Button>
          </LogClick>
          {isLogin && (
            <div
              className={cn(
                'w-full',
                'flex',
                'justify-between',
                'items-center',
              )}
            >
              <LogClick eventName='mypage_logout_click'>
                <Button
                  onClick={handleLogout}
                  size='sm'
                  variant='text'
                >
                  <Typography variants='body-medium'>
                    {translateText('myPage.logout')}
                  </Typography>
                </Button>
              </LogClick>

              <LogClick eventName='mypage_leave_click'>
                <Button
                  onClick={handleLeave}
                  size='sm'
                  variant='text'
                >
                  <Typography variants='body-medium'>
                    {translateText('myPage.leave')}
                  </Typography>
                </Button>
              </LogClick>
            </div>
          )}
        </footer>
      </article>
    </main>
  );
};

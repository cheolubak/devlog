'use client';

import type { User } from '@devlog/domains';
import type { ReactNode } from 'react';

import { Button, Icon, Typography, useModal } from '@devlog/components';
import { DefaultModal } from 'components';
import { LoginModal } from 'components/LoginModal';
import { useAuth } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';

import styles from './MyPage.module.css';

const SOCIAL_ICON: Record<User['socialType'], ReactNode> = {
  GITHUB: (
    <Icon
      color='var(--color-white)'
      name='github'
      size={32}
    />
  ),
  GOOGLE: (
    <Icon
      name='google'
      size={32}
    />
  ),
  KAKAO: (
    <Icon
      color='#fee500'
      name='kakao'
      size={32}
    />
  ),
  NAVER: (
    <Icon
      color='#03C75A'
      name='naver'
      size={32}
    />
  ),
};

export const MyPage = () => {
  const { isLogin, leave, logout, user } = useAuth();
  const { open } = useModal();

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
        cancelText='아니요'
        confirmText='예'
        description='정말로 탈퇴하시겠어요?'
        onConfirm={leave}
        title='회원탈퇴'
      />,
    );
    leave();
  };

  const handleClickPrivacyPolicy = () => {
    window.open('/policy/privacy', '_blank');
  };

  const handleClickServicePolicy = () => {
    window.open('/policy/services', '_blank');
  };

  return (
    <main className={styles.mypage}>
      <Typography
        className={styles.mypageTitle}
        variants='title-medium'
      >
        마이페이지
      </Typography>

      {user && (
        <header className={styles.userInfo}>
          {user.profile ? (
            <Image
              alt={user.nickname}
              className={styles.userProfile}
              height={48}
              src={user.profile}
              width={48}
            />
          ) : (
            <Image
              alt={user.nickname}
              className={styles.userProfile}
              height={48}
              src='/logo.svg'
              width={48}
            />
          )}
          <Typography variants='title-large'>
            안녕하세요, {user.nickname}님!
          </Typography>
          {SOCIAL_ICON[user.socialType]}
        </header>
      )}

      <article className={styles.mypageMenus}>
        {isLogin && (
          <Link
            className={styles.mypageFooterMenuItem}
            href='/mypage/bookmarks'
          >
            <Icon
              color='var(--color-white)'
              name='bookmark-fill'
            />
            <Typography variants='title-medium'>북마크</Typography>
          </Link>
        )}
        {!isLogin && (
          <Button
            className={styles.mypageLoginButton}
            color='success'
            onClick={handleLogin}
          >
            로그인
          </Button>
        )}

        <footer className={styles.mypageFooterMenus}>
          <Button
            onClick={handleClickPrivacyPolicy}
            size='sm'
            variant='text'
          >
            <Typography variants='body-medium'>개인정보처리방침</Typography>
          </Button>
          <Button
            onClick={handleClickServicePolicy}
            size='sm'
            variant='text'
          >
            <Typography variants='body-medium'>서비스이용약관</Typography>
          </Button>
          {isLogin && (
            <div className={styles.mypageLeaveMenus}>
              <Button
                onClick={handleLogout}
                size='sm'
                variant='text'
              >
                <Typography variants='body-medium'>로그아웃</Typography>
              </Button>
              <Button
                onClick={handleLeave}
                size='sm'
                variant='text'
              >
                <Typography variants='body-medium'>회원탈퇴</Typography>
              </Button>
            </div>
          )}
        </footer>
      </article>
    </main>
  );
};

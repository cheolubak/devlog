'use client';

import type { User } from '@devlog/domains';
import type { ReactNode } from 'react';

import { Button, Icon, Typography, useModal } from '@devlog/components';
import { BlogRequestModal, DefaultModal } from 'components';
import { LogClick } from 'components/LogClick';
import { LoginModal } from 'components/LoginModal';
import { YoutubeRequestModal } from 'components/YoutubeRequestModal';
import { useAuth } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';

import styles from './MyPage.module.css';

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
    <main className={styles.mypage}>
      <Typography
        className={styles.mypageTitle}
        variants='title-medium'
      >
        마이페이지
      </Typography>

      {user && (
        <header className={styles.userInfoContainer}>
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
          <div className={styles.userInfo}>
            <Typography variants='title-large'>
              안녕하세요, {user.nickname}님!
            </Typography>
            <div className={styles.userInfoContent}>
              {SOCIAL_ICON[user.socialType]}
              {user.email && <Typography>{user.email}</Typography>}
            </div>
          </div>
        </header>
      )}

      <article className={styles.mypageContainer}>
        <div className={styles.mypageMenuList}>
          {isLogin && (
            <LogClick eventName='mypage_bookmark_click'>
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
            </LogClick>
          )}
          <LogClick eventName='mypage_blog_request_click'>
            <Button onClick={handleRequestBlog}>
              <Icon
                color='var(--color-white)'
                name='rss'
              />
              <Typography variants='title-medium'>
                RSS 블로그 추가 요청
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
                유튜브 채널 추가 요청
              </Typography>
            </Button>
          </LogClick>
        </div>

        {!isLogin && (
          <LogClick eventName='mypage_login_click'>
            <Button
              className={styles.mypageLoginButton}
              color='success'
              onClick={handleLogin}
            >
              로그인
            </Button>
          </LogClick>
        )}

        <footer className={styles.mypageFooterMenus}>
          <LogClick eventName='mypage_privacy_policy_click'>
            <Button
              onClick={handleClickPrivacyPolicy}
              size='sm'
              variant='text'
            >
              <Typography variants='body-medium'>개인정보처리방침</Typography>
            </Button>
          </LogClick>
          <LogClick eventName='mypage_service_policy_click'>
            <Button
              onClick={handleClickServicePolicy}
              size='sm'
              variant='text'
            >
              <Typography variants='body-medium'>서비스이용약관</Typography>
            </Button>
          </LogClick>
          {isLogin && (
            <div className={styles.mypageLeaveMenus}>
              <LogClick eventName='mypage_logout_click'>
                <Button
                  onClick={handleLogout}
                  size='sm'
                  variant='text'
                >
                  <Typography variants='body-medium'>로그아웃</Typography>
                </Button>
              </LogClick>

              <LogClick eventName='mypage_leave_click'>
                <Button
                  onClick={handleLeave}
                  size='sm'
                  variant='text'
                >
                  <Typography variants='body-medium'>회원탈퇴</Typography>
                </Button>
              </LogClick>
            </div>
          )}
        </footer>
      </article>
    </main>
  );
};

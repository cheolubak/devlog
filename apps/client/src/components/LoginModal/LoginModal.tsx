import { Button, Icon, Modal, Typography, useModal } from '@devlog/components';
import { useLogin } from '@devlog/hooks';

import styles from './LoginModal.module.css';

interface LoginModalProps {
  modalKey?: string;
}

export const LoginModal = ({ modalKey }: LoginModalProps) => {
  const { loginWithGithub, loginWithGoogle, loginWithKakao, loginWithNaver } =
    useLogin();

  const { close } = useModal();

  return (
    <Modal className={styles.loginModal}>
      <Typography
        className={styles.loginModalTitle}
        variants='title-large'
      >
        로그인
      </Typography>
      <ul className={styles.loginModalButtonList}>
        <li>
          <Button
            className={styles.kakaoLogin}
            onClick={loginWithKakao}
          >
            <Icon name='kakao' />
            카카오 로그인
          </Button>
        </li>
        <li>
          <Button
            className={styles.naverLogin}
            onClick={loginWithNaver}
          >
            <Icon
              color='var(--color-white)'
              name='naver'
            />
            네이버 로그인
          </Button>
        </li>
        <li>
          <Button
            className={styles.googleLogin}
            onClick={loginWithGoogle}
            variant='outline'
          >
            <Icon name='google' />
            구글 로그인
          </Button>
        </li>
        <li>
          <Button
            className={styles.githubLogin}
            onClick={loginWithGithub}
          >
            <Icon
              color='var(--color-white)'
              name='github'
            />
            GitHub 로그인
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

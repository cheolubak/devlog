'use client';

import {
  Button,
  Icon,
  IconButton,
  Modal,
  Typography,
  useModal,
} from '@devlog/components';
import { useLogin } from '@devlog/hooks';
import { LogClick } from 'components/LogClick';

import styles from './LoginModal.module.css';

interface LoginModalProps {
  modalKey?: string;
}

export const LoginModal = ({ modalKey }: LoginModalProps) => {
  const { loginWithGithub, loginWithGoogle, loginWithKakao, loginWithNaver } =
    useLogin();

  const { close } = useModal();

  const handleClickPrivacyPolicy = () => {
    window.open('/policy/privacy', '_blank');
  };

  const handleClickServicePolicy = () => {
    window.open('/policy/services', '_blank');
  };

  return (
    <Modal className={styles.loginModal}>
      <LogClick eventName='login_modal_close_click'>
        <IconButton
          className={styles.closeButton}
          name='clear'
          onClick={() => close(modalKey)}
        />
      </LogClick>
      <Typography
        className={styles.loginModalTitle}
        variants='title-large'
      >
        로그인
      </Typography>
      <ul className={styles.loginModalButtonList}>
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'KAKAO' }}
          >
            <Button
              className={styles.kakaoLogin}
              onClick={loginWithKakao}
            >
              <Icon name='kakao' />
              카카오 로그인
            </Button>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'NAVER' }}
          >
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
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'GOOGLE' }}
          >
            <Button
              className={styles.googleLogin}
              onClick={loginWithGoogle}
              variant='outline'
            >
              <Icon name='google' />
              구글 로그인
            </Button>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'GITHUB' }}
          >
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
          </LogClick>
        </li>
      </ul>
      <div className={styles.loginModalMenus}>
        <LogClick eventName='login_modal_privacy_policy_click'>
          <Button
            onClick={handleClickPrivacyPolicy}
            size='sm'
            variant='text'
          >
            <Typography
              className={styles.loginModalPolicyButton}
              variants='body-medium'
            >
              개인정보처리방침
            </Typography>
          </Button>
        </LogClick>
        |
        <LogClick eventName='login_modal_service_policy_click'>
          <Button
            onClick={handleClickServicePolicy}
            size='sm'
            variant='text'
          >
            <Typography
              className={styles.loginModalPolicyButton}
              variants='body-medium'
            >
              서비스이용약관
            </Typography>
          </Button>
        </LogClick>
      </div>
    </Modal>
  );
};

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
import { cn } from '@devlog/utils';
import { LogClick } from 'components/LogClick';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  modalKey?: string;
}

export const LoginModal = ({ modalKey }: LoginModalProps) => {
  const { loginWithGithub, loginWithGoogle, loginWithKakao, loginWithNaver } =
    useLogin();

  const { i18n } = useTranslation();

  const { close } = useModal();

  const handleClickPrivacyPolicy = () => {
    window.open('/policy/privacy', '_blank');
  };

  const handleClickServicePolicy = () => {
    window.open('/policy/services', '_blank');
  };

  const isKorean = i18n.language === 'ko';

  return (
    <Modal
      className={cn(
        'flex flex-col justify-start items-stretch',
        'px-4 md:px-6 py-8 md:py-10',
        'h-fit min-h-0',
      )}
    >
      <LogClick eventName='login_modal_close_click'>
        <IconButton
          className='absolute top-3 right-3'
          name='clear'
          onClick={() => close(modalKey)}
        />
      </LogClick>
      <Typography
        className='mb-6 text-center'
        variants='title-large'
      >
        {isKorean ? '로그인' : 'LOGIN'}
      </Typography>
      <ul
        className={cn(
          'flex flex-col justify-start items-stretch',
          'gap-3 mb-6',
        )}
      >
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'KAKAO' }}
          >
            <Button
              className='w-full relative bg-[#fee500] border-none text-black'
              onClick={loginWithKakao}
            >
              <Icon name='kakao' />
              {isKorean ? '카카오 로그인' : 'Kakao Login'}
            </Button>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'NAVER' }}
          >
            <Button
              className='w-full relative bg-[#03C75A] border-none text-white'
              onClick={loginWithNaver}
            >
              <Icon
                color='var(--color-white)'
                name='naver'
              />
              {isKorean ? '네이버 로그인' : 'Naver Login'}
            </Button>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'GOOGLE' }}
          >
            <Button
              className='w-full relative bg-white border'
              onClick={loginWithGoogle}
              variant='outline'
            >
              <Icon name='google' />
              {isKorean ? '구글 로그인' : 'Google Login'}
            </Button>
          </LogClick>
        </li>
        <li>
          <LogClick
            eventName='login'
            params={{ socialType: 'GITHUB' }}
          >
            <Button
              className='w-full relative border-none bg-black text-white'
              onClick={loginWithGithub}
            >
              <Icon
                color='var(--color-white)'
                name='github'
              />
              {isKorean ? 'GitHub 로그인' : 'GitHub Login'}
            </Button>
          </LogClick>
        </li>
      </ul>
      <div className='flex justify-center items-center'>
        <LogClick eventName='login_modal_privacy_policy_click'>
          <Button
            onClick={handleClickPrivacyPolicy}
            size='sm'
            variant='text'
          >
            <Typography
              className='text-gray-900'
              variants='body-medium'
            >
              {isKorean ? '개인정보처리방침' : 'Privacy Policy'}
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
              className='text-gray-900'
              variants='body-medium'
            >
              {isKorean ? '서비스이용약관' : 'Service Policy'}
            </Typography>
          </Button>
        </LogClick>
      </div>
    </Modal>
  );
};

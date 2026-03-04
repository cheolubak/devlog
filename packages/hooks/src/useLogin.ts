export const useLogin = () => {
  const handleLoginWithGithub = () => {
    if (!process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID) {
      return;
    }

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    });
    window.location.assign(
      `https://github.com/login/oauth/authorize?${params.toString()}`,
    );
  };

  const handleLoginWithNaver = () => {
    if (
      !process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_NAVER_LOGIN_CALLBACK_URL
    ) {
      return;
    }

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_NAVER_LOGIN_CALLBACK_URL,
      response_type: 'code',
    });

    window.location.assign(
      `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`,
    );
  };

  const handleLoginWithKakao = () => {
    if (
      !process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL
    ) {
      return;
    }

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL,
      response_type: 'code',
    });

    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?${params.toString()}`,
    );
  };

  const handleLoginWithGoogle = () => {
    if (
      !process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL
    ) {
      return;
    }

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL,
      response_type: 'code',
      scope: 'email profile',
    });

    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    );
  };

  return {
    loginWithGithub: handleLoginWithGithub,
    loginWithGoogle: handleLoginWithGoogle,
    loginWithKakao: handleLoginWithKakao,
    loginWithNaver: handleLoginWithNaver,
  };
};

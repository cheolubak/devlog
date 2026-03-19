import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from 'i18n.constants';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export {
  FALLBACK_LANGUAGE,
  I18N_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from 'i18n.constants';

i18n.use(initReactI18next).init({
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  lng: FALLBACK_LANGUAGE,
  resources: {
    en: {
      translation: {
        'blogRequest.cancel': 'Cancel',
        'blogRequest.description':
          'If there is a blog not registered on\n"DEVCURATE" that you want to see,\nplease fill out the form below.\nWe will review and notify you via email.',
        'blogRequest.emailLabel': 'Your Email',
        'blogRequest.emailPlaceholder': 'Enter your email address',
        'blogRequest.submit': 'Request',
        'blogRequest.title': 'Blog Request',
        'blogRequest.urlLabel': 'Blog URL',
        'blogRequest.urlPlaceholder':
          'Enter the blog URL (including https://)',
        'bookmarkPostList.empty': 'No bookmarked posts.',
        'bookmarkPostList.goToPosts': 'Go to posts',
        'channelContent.goToBlog': 'Go to Blog',
        'channelContent.goToService': 'Go to Service',
        'channelContent.goToYoutube': 'Go to YouTube Channel',
        'channelList.blog': 'Blog',
        'channelList.youtube': 'YouTube',

        'common.confirm': 'OK',
        'common.language': 'English',
        'common.login': 'LOGIN',
        'common.privacyPolicy': 'Privacy Policy',
        'common.servicePolicy': 'Service Policy',
        'error.message':
          'A temporary error occurred.\nPlease try again later or go to the home page.',
        'error.retry': 'Try Again',
        'error.title': 'Oops! Something went wrong',
        'error.toHome': 'Home',
        'loginModal.githubLogin': 'GitHub Login',

        'loginModal.googleLogin': 'Google Login',
        'loginModal.kakaoLogin': 'Kakao Login',
        'loginModal.naverLogin': 'Naver Login',
        'loginModal.title': 'LOGIN',
        'myPage.bookmarks': 'Bookmarks',
        'myPage.greeting': 'Hello, {{nickname}}!',
        'myPage.leave': 'LEAVE',
        'myPage.leaveConfirmDescription': 'Are you sure you want to leave?',
        'myPage.leaveConfirmNo': 'No',
        'myPage.leaveConfirmTitle': 'Leave',
        'myPage.leaveConfirmYes': 'Yes',

        'myPage.logout': 'LOGOUT',
        'myPage.rssBlogRequest': 'RSS Blog Request',
        'myPage.title': 'My Page',
        'myPage.youtubeChannelRequest': 'YouTube Channel Request',
        'postFilter.region.ALL': 'All',
        'postFilter.region.FOREIGN': 'English',
        'postFilter.region.KOREA': 'Korean',
        'postFilter.search': 'Search',

        'postFilter.title': 'Post Filter',

        'postFilter.type.ALL': 'All',
        'postFilter.type.BLOG': 'RSS Blog',

        'postFilter.type.YOUTUBE': 'YouTube',
        'postListFilter.filter': 'Filter',
        'request.error':
          'An error occurred.\nPlease try again later.',
        'request.failTitle': 'Request Failed',
        'request.successDescription':
          'We will review and add it shortly.',
        'request.successTitle': 'Request Complete!',
        'request.validationError':
          'Please check your input and try again.',
        'request.validationUrl':
          'URL must include https://',
        'youtubeRequest.description':
          'If there is a YouTube channel not registered on\n"DEVCURATE" that you want to see,\nplease fill out the form below.\nWe will review and notify you via email.',
        'youtubeRequest.title': 'YouTube Channel Request',
        'youtubeRequest.urlLabel': 'YouTube Channel URL',
        'youtubeRequest.urlPlaceholder':
          'Enter the YouTube channel URL (including https://)',
      },
    },
    ko: {
      translation: {
        'blogRequest.cancel': '그만하기',
        'blogRequest.description':
          '"DEVCURATE"에 등록이 안 된,\n보고 싶은 블로그가 있다면\n아래의 양식을 입력해 요청해주세요.\n확인 후 추가하고 입력하신 이메일로 알려드릴게요.',
        'blogRequest.emailLabel': '요청자 이메일',
        'blogRequest.emailPlaceholder': '요청하신 분의 이메일을 입력해주세요',
        'blogRequest.submit': '요청하기',
        'blogRequest.title': '블로그 요청',
        'blogRequest.urlLabel': '블로그 URL',
        'blogRequest.urlPlaceholder':
          '블로그 URL을 입력해주세요 (https:// 포함)',
        'bookmarkPostList.empty': '저장된 포스트가 없어요.',
        'bookmarkPostList.goToPosts': '포스트 보러 가기',
        'channelContent.goToBlog': '블로그 가기',
        'channelContent.goToService': '서비스 가기',
        'channelContent.goToYoutube': '유튜브 채널 가기',
        'channelList.blog': '기술블로그',
        'channelList.youtube': '유튜브',

        'common.confirm': '확인',
        'common.language': '한국어',
        'common.login': '로그인',
        'common.privacyPolicy': '개인정보처리방침',
        'common.servicePolicy': '서비스이용약관',
        'error.message':
          '일시적인 오류가 발생했습니다.\n잠시 후 다시 시도하거나, 홈으로 이동해주세요.',
        'error.retry': '다시 시도',
        'error.title': '오류가 발생했습니다',
        'error.toHome': '홈으로 이동',
        'loginModal.githubLogin': 'GitHub 로그인',

        'loginModal.googleLogin': '구글 로그인',
        'loginModal.kakaoLogin': '카카오 로그인',
        'loginModal.naverLogin': '네이버 로그인',
        'loginModal.title': '로그인',
        'myPage.bookmarks': '북마크',
        'myPage.greeting': '안녕하세요, {{nickname}}님!',
        'myPage.leave': '회원탈퇴',
        'myPage.leaveConfirmDescription': '정말로 탈퇴하시겠어요?',
        'myPage.leaveConfirmNo': '아니요',
        'myPage.leaveConfirmTitle': '회원탈퇴',
        'myPage.leaveConfirmYes': '예',

        'myPage.logout': '로그아웃',
        'myPage.rssBlogRequest': 'RSS 블로그 추가 요청',
        'myPage.title': '마이페이지',
        'myPage.youtubeChannelRequest': '유튜브 채널 추가 요청',
        'postFilter.region.ALL': '전체',
        'postFilter.region.FOREIGN': '국외',
        'postFilter.region.KOREA': '국내',
        'postFilter.search': '찾기',

        'postFilter.title': '포스트 필터',

        'postFilter.type.ALL': '전체',
        'postFilter.type.BLOG': 'RSS 블로그',

        'postFilter.type.YOUTUBE': '유튜브',
        'postListFilter.filter': '필터',
        'request.error':
          '오류가 발생했어요.\n잠시후에 다시 시도해주세요.',
        'request.failTitle': '요청 실패',
        'request.successDescription':
          '빠른 확인 후 추가할게요.',
        'request.successTitle': '요청 완료!',
        'request.validationError':
          '입력하신 내용을 다시 확인 해주세요.',
        'request.validationUrl':
          'URL은 https://를 포함해 입력해주세요',
        'youtubeRequest.description':
          '"DEVCURATE"에 등록이 안 된,\n보고 싶은 유튜브 채널이 있다면\n아래의 양식을 입력해 요청해주세요.\n확인 후 추가하고 입력하신 이메일로 알려드릴게요.',
        'youtubeRequest.title': '유튜브 채널 요청',
        'youtubeRequest.urlLabel': '유튜브 채널 URL',
        'youtubeRequest.urlPlaceholder':
          '유튜브 채널 URL을 입력해주세요 (https:// 포함)',
      },
    },
  },
  supportedLngs: SUPPORTED_LANGUAGES,
});

export default i18n;

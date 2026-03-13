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
        'bookmarkPostList.empty': 'No bookmarked posts.',
        'bookmarkPostList.goToPosts': 'Go to posts',
        'channelList.blog': 'Blog',
        'channelList.youtube': 'YouTube',

        'common.language': 'English',
        'common.login': 'LOGIN',
        'common.privacyPolicy': 'Privacy Policy',
        'common.servicePolicy': 'Service Policy',
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
      },
    },
    ko: {
      translation: {
        'bookmarkPostList.empty': '저장된 포스트가 없어요.',
        'bookmarkPostList.goToPosts': '포스트 보러 가기',
        'channelList.blog': '기술블로그',
        'channelList.youtube': '유튜브',

        'common.language': '한국어',
        'common.login': '로그인',
        'common.privacyPolicy': '개인정보처리방침',
        'common.servicePolicy': '서비스이용약관',
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
      },
    },
  },
  supportedLngs: SUPPORTED_LANGUAGES,
});

export default i18n;

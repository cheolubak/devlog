import { MyPage as MyPageComponent } from 'components/MyPage';

export const dynamic = 'force-dynamic';

export default async function MyPage() {
  return <MyPageComponent />;
}

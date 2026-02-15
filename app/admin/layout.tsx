import type { PropsWithChildren } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface AdminLayoutProps extends PropsWithChildren {}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();

  const checkAuth = cookieStore.get('auth')?.value;

  if (checkAuth !== 'IKZtsfpbt5vIT60qNrLBsbfymCvBoMQo7NyzLWeaHu7lqwzm') {
    redirect('/');
  }

  return children;
}

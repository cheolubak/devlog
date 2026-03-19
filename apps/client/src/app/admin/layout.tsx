import type { PropsWithChildren } from 'react';

import { ADMIN_AUTH_KEY } from 'constants/auth';
import { safeCompare } from 'helper/safeCompare';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface AdminLayoutProps extends PropsWithChildren {}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const checkAuth = cookieStore.get(ADMIN_AUTH_KEY)?.value;

  if (!process.env.AUTH_KEY || !checkAuth) {
    redirect('/');
  }

  if (!safeCompare(checkAuth, process.env.AUTH_KEY)) {
    redirect('/');
  }

  return <>{children}</>;
}

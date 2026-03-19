import type { PropsWithChildren } from 'react';

import { ADMIN_AUTH_KEY } from 'constants/auth';
import { timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface AdminLayoutProps extends PropsWithChildren {}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const checkAuth = cookieStore.get(ADMIN_AUTH_KEY)?.value;

  if (!process.env.AUTH_KEY || !checkAuth) {
    redirect('/');
  }

  const bufA = Buffer.from(checkAuth);
  const bufB = Buffer.from(process.env.AUTH_KEY);

  if (bufA.length !== bufB.length || !timingSafeEqual(bufA, bufB)) {
    redirect('/');
  }

  return <>{children}</>;
}

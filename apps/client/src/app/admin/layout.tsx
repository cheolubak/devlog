import type { PropsWithChildren } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface AdminLayoutProps extends PropsWithChildren {}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();

  const checkAuth = cookieStore.get('auth')?.value;

  if (!process.env.AUTH_KEY || checkAuth !== process.env.AUTH_KEY) {
    redirect('/');
  }

  return <>{children}</>;
}

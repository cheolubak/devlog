'use server';

import { ADMIN_AUTH_KEY } from 'constants/auth';
import { cookies } from 'next/headers';

export const getAdminAuthCookie = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_AUTH_KEY)?.value;
};

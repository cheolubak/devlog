import { getAdminAuthCookie } from 'helper/getAdminAuthCookie';
import { NextResponse } from 'next/server';

export const verifyAdmin = async (): Promise<NextResponse | null> => {
  const authValue = await getAdminAuthCookie();

  if (!process.env.AUTH_KEY || authValue !== process.env.AUTH_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return null;
};

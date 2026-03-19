import { timingSafeEqual } from 'crypto';
import { getAdminAuthCookie } from 'helper/getAdminAuthCookie';
import { NextResponse } from 'next/server';

const safeCompare = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) {
    return false;
  }

  return timingSafeEqual(bufA, bufB);
};

export const verifyAdmin = async (): Promise<NextResponse | null> => {
  const authValue = await getAdminAuthCookie();

  if (
    !process.env.AUTH_KEY ||
    !authValue ||
    !safeCompare(authValue, process.env.AUTH_KEY)
  ) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return null;
};

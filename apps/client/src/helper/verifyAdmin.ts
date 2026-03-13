import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const verifyAdmin = async (): Promise<NextResponse | null> => {
  const cookieStore = await cookies();
  const authValue = cookieStore.get('auth')?.value;

  if (!process.env.AUTH_KEY || authValue !== process.env.AUTH_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return null;
};

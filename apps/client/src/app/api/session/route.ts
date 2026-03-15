import { SESSION_ID_KEY } from 'constants/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const cookieStore = await cookies();

  const session = cookieStore.get(SESSION_ID_KEY)?.value ?? uuidv4();

  cookieStore.set(SESSION_ID_KEY, session, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.json({ session });
}

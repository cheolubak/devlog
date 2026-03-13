import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const cookieStore = await cookies();

  const session = cookieStore.get('sessionId')?.value ?? uuidv4();

  cookieStore.set('sessionId', session, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.json({ session });
}

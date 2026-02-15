import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const cookieStore = await cookies();

  const session = cookieStore.get('sessionId')?.value ?? uuidv4();

  cookieStore.set('sessionId', session, {
    expires: 60 * 60 * 24 * 365,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
  });

  return NextResponse.json({ session });
}

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'constants/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);

  return NextResponse.json({});
}

import type { NextRequest } from 'next/server';

import { ACCESS_TOKEN_KEY } from 'constants/auth';
import { NextResponse } from 'next/server';

const REQUIRE_LOGIN_PATH: Readonly<Record<string, string>> = {
  '/mypage/bookmarks': '/mypage',
};

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get(ACCESS_TOKEN_KEY)?.value;

  if (!accessToken && REQUIRE_LOGIN_PATH[pathname]) {
    return NextResponse.redirect(
      new URL(REQUIRE_LOGIN_PATH[pathname], req.url),
    );
  }

  return NextResponse.next();
}

import type { NextRequest } from 'next/server';

import { bffTemplate } from 'helper/bffTemplace';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken }) => {
    return NextResponse.json({ isLogin: !!accessToken });
  });
}

import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const blogRequestBodySchema = z.object({
  email: z.string().email(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const body = blogRequestBodySchema.parse(await req.json());

    const headers: Record<string, string> = {
      sessionId,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    await externalApi.post('request/blogs', body, {
      headers,
    });

    return NextResponse.json({ message: 'ok' });
  });
}

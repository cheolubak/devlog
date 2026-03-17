import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const youtubeRequestBodySchema = z.object({
  email: z.string().email(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const body = youtubeRequestBodySchema.parse(await req.json());

    const headers: Record<string, string> = {
      sessionId,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    await externalApi.post('request/youtubes', body, {
      headers,
    });

    return NextResponse.json({ message: 'ok' });
  });
}

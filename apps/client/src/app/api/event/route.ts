import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { eventTrackingDataSchema } from 'domains/EventTrackingData';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { eventName, params } = eventTrackingDataSchema.parse(
      await req.json(),
    );

    const info: Record<string, string> = {
      accessToken: accessToken ?? 'unknown',
      eventName,
      sessionId,
    };

    if (params) {
      info.params = JSON.stringify(params);
    }

    log.info('EVENT TRACKING', info);

    return NextResponse.json({});
  });
}

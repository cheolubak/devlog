import { blogSourceSchema } from '@devlog/domains';
import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  try {
    const channels = z.array(blogSourceSchema).parse(
      await externalApi.get('blog-sources'),
    );

    const youtubes = channels.filter((channel) => channel.type === 'YOUTUBE');

    const blogs = channels.filter((channel) => channel.type !== 'YOUTUBE');

    return NextResponse.json({
      blogs: blogs.map((channel) => ({
        ...channel,
        icon: channel.icon
          ? `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${channel.icon}`
          : null,
      })),
      youtubes: youtubes.map((channel) => ({
        ...channel,
        icon: channel.icon
          ? `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${channel.icon}`
          : null,
      })),
    });
  } catch (e) {
    log.error('GET Channels', {
      error: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json(
      { message: 'Failed to fetch channels' },
      { status: 500 },
    );
  }
}

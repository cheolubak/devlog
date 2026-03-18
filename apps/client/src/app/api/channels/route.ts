import { blogSourceSchema } from '@devlog/domains';
import { externalApi } from '@devlog/request';
import { handleRouteError } from 'helper/handleRouteError';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const toIconUrl = (icon: null | string | undefined) =>
  icon
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${icon.startsWith('/') ? icon : `/${icon}`}`
    : null;

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
        icon: toIconUrl(channel.icon),
      })),
      youtubes: youtubes.map((channel) => ({
        ...channel,
        icon: toIconUrl(channel.icon),
      })),
    });
  } catch (e) {
    return handleRouteError(e, 'fetch channels');
  }
}

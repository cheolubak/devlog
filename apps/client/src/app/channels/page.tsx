import type { BlogSource } from '@devlog/domains';

import { Typography } from '@devlog/components';
import { log } from '@devlog/logger';
import { fetchApi } from '@devlog/request';
import { ChannelListContainer } from 'components';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function ChannelsPage() {
  try {
    const { blogs, youtubes } = await fetchApi.get<{
      blogs: BlogSource[];
      youtubes: BlogSource[];
    }>('channels', {
      next: {
        revalidate: 3600,
        tags: ['channels'],
      },
    });

    return (
      <ChannelListContainer
        blogs={blogs}
        youtubes={youtubes}
      />
    );
  } catch (e) {
    log.error('Channel Page Error', { error: JSON.stringify(e) });

    return (
      <div className='p-10 text-center'>
        <Typography variants='title-large'>오류가 발생했습니다.</Typography>
        <Typography>
          {e instanceof Error ? e.message : '알 수 없는 오류'}
        </Typography>
      </div>
    );
  }
}

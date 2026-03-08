'use client';

import type { BlogSource } from '@devlog/domains';

import { useScrollRestoration } from '@devlog/hooks';
import { ChannelList } from 'components';

interface ChannelListContainerProps {
  blogs: BlogSource[];
  youtubes: BlogSource[];
}

export const ChannelListContainer = ({
  blogs,
  youtubes,
}: ChannelListContainerProps) => {
  useScrollRestoration();

  return (
    <article>
      <ChannelList
        channels={blogs}
        type='blog'
      />
      <ChannelList
        channels={youtubes}
        type='youtube'
      />
    </article>
  );
};

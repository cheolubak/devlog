import type { BlogSource } from '@devlog/domains';

import { Icon, Typography } from '@devlog/components';
import { cn } from '@devlog/utils';
import { useIsKorean } from 'hooks/useIsKorean';

import { ChannelItem } from '../ChannelItem';

interface ChannelListProps {
  channels: BlogSource[];
  type: 'blog' | 'youtube';
}

const CHANNEL_LIST_TYPE: Record<
  ChannelListProps['type'],
  { enName: string; name: string }
> = {
  blog: { enName: 'Blog', name: '기술블로그' },
  youtube: { enName: 'YouTube', name: '유튜브' },
};

export const ChannelList = ({ channels, type }: ChannelListProps) => {
  const isKorean = useIsKorean();

  return (
    <section className={cn('px-4 md:px-10 mb-12')}>
      <Typography
        className={cn(
          'flex justify-start items-center gap-2',
          'text-white mb-6',
        )}
        semantic='h2'
        variants='title-large'
      >
        <Icon
          color={
            type === 'blog' ? 'var(--color-teal-500)' : 'var(--color-red-500)'
          }
          name={type === 'blog' ? 'rss' : 'youtube'}
          size={32}
        />
        {isKorean
          ? CHANNEL_LIST_TYPE[type].name
          : CHANNEL_LIST_TYPE[type].enName}
      </Typography>
      <ul
        className={cn(
          'grid justify-between items-start',
          'gap-y-6 md:gap-y-8 gap-x-4 md:gap-x-8',
          '[grid-template-columns:repeat(auto-fill,4rem)]',
        )}
      >
        {channels.map((channel) => (
          <ChannelItem
            channel={channel}
            key={channel.name}
          />
        ))}
      </ul>
    </section>
  );
};

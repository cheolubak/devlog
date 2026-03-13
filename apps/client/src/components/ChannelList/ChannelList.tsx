import type { BlogSource } from '@devlog/domains';

import { Icon, Typography } from '@devlog/components';
import { cn } from '@devlog/utils';
import { useTranslateText } from 'hooks/useTranslateText';

import { ChannelItem } from '../ChannelItem';

interface ChannelListProps {
  channels: BlogSource[];
  type: 'blog' | 'youtube';
}

export const ChannelList = ({ channels, type }: ChannelListProps) => {
  const translateText = useTranslateText();

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
        {translateText(`channelList.${type}`)}
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

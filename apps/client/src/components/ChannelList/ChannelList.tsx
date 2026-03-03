import type { BlogSource } from '@devlog/domains';

import { Icon, Typography } from '@devlog/components';
import { ChannelItem } from 'components';

import styles from './ChannelList.module.css';

interface ChannelListProps {
  channels: BlogSource[];
  type: 'blog' | 'youtube';
}

export const ChannelList = ({ channels, type }: ChannelListProps) => {
  return (
    <section className={styles.channelList}>
      <Typography
        className={styles.channelTypeTitle}
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
        {type === 'blog' ? '기술블로그' : '유튜브'}
      </Typography>
      <ul className={styles.channelItemList}>
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

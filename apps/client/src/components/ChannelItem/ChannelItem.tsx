'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { BlogSource } from '../../../../../packages/domains';

import { Icon } from '../../../../../packages/components/src/Icon';
import { Typography } from '../../../../../packages/components/src/Typography';
import styles from './ChannelItem.module.css';

interface ChannelItemProps {
  channel: BlogSource;
}

export const ChannelItem = ({ channel }: ChannelItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <li>
      <Link
        className={styles.channelItem}
        href={`/channels/${channel.id}/contents`}
      >
        {channel.icon && !imageError ? (
          <Image
            alt={channel.name}
            className={styles.channelImage}
            height={72}
            onError={() => setImageError(true)}
            src={channel.icon}
            width={72}
          />
        ) : channel.type !== 'YOUTUBE' ? (
          <Image
            alt={channel.name}
            className={styles.channelImage}
            height={72}
            src={'/logo.svg'}
            width={72}
          />
        ) : (
          <Icon
            className={styles.channelImage}
            color='var(--color-red-500)'
            name='youtube'
            size={72}
          />
        )}
        <Typography
          className={styles.channelName}
          maxLines={2}
          semantic='h2'
          variants='label-small'
        >
          {channel.name}
        </Typography>
      </Link>
    </li>
  );
};

'use client';

import type { BlogSource } from '@devlog/domain';

import Image from 'next/image';
import { useState } from 'react';

import { Icon, Typography } from '@/packages/components';

import styles from './ChannelContentHeader.module.css';

interface ChannelContentHeaderProps {
  channel: BlogSource;
}

export const ChannelContentHeader = ({
  channel,
}: ChannelContentHeaderProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Typography
      className={styles.channelContentHeader}
      variants='title-large'
    >
      {channel.icon && !imageError ? (
        <Image
          alt={channel.name}
          className={styles.channelImage}
          height={48}
          onError={() => setImageError(true)}
          src={channel.icon}
          width={48}
        />
      ) : channel.type !== 'YOUTUBE' ? (
        <Image
          alt={channel.name}
          className={styles.channelImage}
          height={48}
          src={'/logo.svg'}
          width={48}
        />
      ) : (
        <Icon
          className={styles.channelImage}
          color='var(--color-red-500)'
          name='youtube'
          size={48}
        />
      )}
      {channel.name}
    </Typography>
  );
};

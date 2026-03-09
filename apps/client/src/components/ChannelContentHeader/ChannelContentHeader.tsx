'use client';

import type { BlogSource } from '@devlog/domains';

import { Icon, Typography } from '@devlog/components';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from './ChannelContentHeader.module.css';

interface ChannelContentHeaderProps {
  channel: BlogSource;
}

export const ChannelContentHeader = ({
  channel,
}: ChannelContentHeaderProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <header className={styles.channelContentHeader}>
      <Typography
        className={styles.channelContentHeaderTitle}
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
      <div className={styles.channelContentHeaderMenu}>
        {channel.corpUrl && (
          <Link
            className={styles.channelContentHeaderMenuItem}
            href={channel.corpUrl}
            target='_blank'
          >
            <Typography variants='title-medium'>서비스 가기</Typography>
          </Link>
        )}
        {channel.corpUrl && channel.blogUrl && '|'}
        {channel.blogUrl && (
          <Link
            className={styles.channelContentHeaderMenuItem}
            href={channel.blogUrl}
            target='_blank'
          >
            <Typography variants='title-medium'>
              {channel.type === 'YOUTUBE' ? '유튜브 채널 가기' : '블로그 가기'}
            </Typography>
          </Link>
        )}
      </div>
    </header>
  );
};

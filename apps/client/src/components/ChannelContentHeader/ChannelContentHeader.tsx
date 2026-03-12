'use client';

import type { BlogSource } from '@devlog/domains';

import { Icon, Typography } from '@devlog/components';
import { cn } from '@devlog/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ChannelContentHeaderProps {
  channel: BlogSource;
}

export const ChannelContentHeader = ({
  channel,
}: ChannelContentHeaderProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <header
      className={cn(
        'flex',
        'flex-col md:flex-row',
        'justify-start md:justify-between',
        'items-start md:items-center',
        'gap-8 md:gap-4',
        'px-4 md:px-10',
        'mb-6 md:mb-0',
      )}
    >
      <Typography
        className={cn(
          'text-white',
          'flex',
          'justify-stretch',
          'items-center',
          'gap-4',
        )}
        variants='title-large'
      >
        {channel.icon && !imageError ? (
          <Image
            alt={channel.name}
            className={cn('object-cover', 'rounded-full', 'bg-white')}
            height={48}
            onError={() => setImageError(true)}
            src={channel.icon}
            width={48}
          />
        ) : channel.type !== 'YOUTUBE' ? (
          <Image
            alt={channel.name}
            className={cn('object-cover', 'rounded-full', 'bg-white')}
            height={48}
            src={'/logo.svg'}
            width={48}
          />
        ) : (
          <Icon
            className={cn('object-cover', 'rounded-full', 'bg-white')}
            color='var(--color-red-500)'
            name='youtube'
            size={48}
          />
        )}
        {channel.name}
      </Typography>
      <div
        className={cn(
          'flex',
          'justify-end',
          'items-center',
          'gap-4',
          'text-white',
        )}
      >
        {channel.corpUrl && (
          <Link
            className={cn(
              'cursor-pointer',
              'inline-flex',
              'justify-center',
              'items-center',
              'h-12',
              'px-4 md:px-6',
              'rounded-lg',
              'bg-indigo-500/60',
            )}
            href={channel.corpUrl}
            target='_blank'
          >
            <Typography variants='title-medium'>서비스 가기</Typography>
          </Link>
        )}
        {channel.corpUrl && channel.blogUrl && '|'}
        {channel.blogUrl && (
          <Link
            className={cn(
              'cursor-pointer',
              'inline-flex',
              'justify-center',
              'items-center',
              'h-12',
              'px-4 md:px-6',
              'rounded-lg',
              'bg-indigo-500/60',
            )}
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

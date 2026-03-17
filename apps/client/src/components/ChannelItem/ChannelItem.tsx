'use client';

import type { BlogSource } from '@devlog/domains';

import { Icon, Typography } from '@devlog/components';
import { cn } from '@devlog/utils';
import { LogClick } from 'components/LogClick';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ChannelItemProps {
  channel: BlogSource;
}

const channelImageClass = cn(
  'w-16 min-w-16 max-w-16 h-16 min-h-16 max-h-16',
  'rounded-2xl object-contain',
);

export const ChannelItem = ({ channel }: ChannelItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <li>
      <LogClick
        eventName='channel_click'
        params={{ id: channel.id, name: channel.name, type: channel.type ?? '' }}
      >
        <Link
          className={cn('flex flex-col items-center gap-2 w-16')}
          href={`/channels/${channel.id}/contents`}
        >
          {channel.icon && !imageError ? (
            <Image
              alt={channel.name}
              className={channelImageClass}
              height={72}
              onError={() => setImageError(true)}
              src={channel.icon}
              width={72}
            />
          ) : channel.type !== 'YOUTUBE' ? (
            <Image
              alt={channel.name}
              className={channelImageClass}
              height={72}
              src={'/logo.svg'}
              width={72}
            />
          ) : (
            <Icon
              className={channelImageClass}
              color='var(--color-red-500)'
              name='youtube'
              size={72}
            />
          )}
          <Typography
            className={cn('text-white text-center')}
            maxLines={2}
            semantic='h2'
            variants='label-small'
          >
            {channel.name}
          </Typography>
        </Link>
      </LogClick>
    </li>
  );
};

'use client';

import { Typography } from '@devlog/components';
import { cn } from '@devlog/utils';
import { HeaderMenu } from 'components/HeaderMenu';
import { LogClick } from 'components/LogClick';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollDirection } from 'stores';

export const Header = () => {
  const scrollDirection = useScrollDirection((state) => state.direction);

  return (
    <header
      className={cn(
        'sticky',
        'top-0',
        'w-full',
        'flex',
        'flex-col',
        'gap-6',
        'px-4 md:px-10',
        'py-3 md:py-6',
        'bg-gray-900',
        'text-white',
        'box-border',
        'z-[1000]',
        'transition-transform',
        'data-[scroll-direction=DOWN]:-translate-y-full',
        'md:data-[scroll-direction=DOWN]:translate-y-0',
      )}
      data-scroll-direction={scrollDirection}
    >
      <div
        className={cn(
          'flex',
          'flex-col md:flex-row',
          'justify-between',
          'items-stretch md:items-center',
          'gap-4',
        )}
      >
        <LogClick eventName='logo_click'>
          <Link href='/'>
            <Typography
              semantic='h1'
              variants='display-small'
            >
              <Image
                alt='Dev Curate'
                className='w-16 min-w-16 max-w-16 h-16 min-h-16 max-h-16'
                height={64}
                priority
                src='/logo.svg'
                width={64}
              />
            </Typography>
          </Link>
        </LogClick>
        <HeaderMenu />
      </div>
    </header>
  );
};

'use client';

import { Button, FloatingMenu, Icon, useModal } from '@devlog/components';
import { cn } from '@devlog/utils';
import { PostFilterModal } from 'components';
import { LogClick } from 'components/LogClick';
import { useIsKorean } from 'hooks/useIsKorean';
import { usePathname, useSearchParams } from 'next/navigation';
import { useScrollDirection } from 'stores';

export const PostListFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isKorean = useIsKorean();

  const scrollDirection = useScrollDirection((state) => state.direction);

  const { open } = useModal();

  const isActive = searchParams.get('region') || searchParams.get('type');

  const handleOpenFilter = () => {
    open(<PostFilterModal />);
  };

  if (pathname !== '/') {
    return null;
  }

  return (
    <FloatingMenu
      data-scroll-direction={scrollDirection}
      position='center'
    >
      <LogClick eventName='filter_click'>
        <Button
          className={cn('rounded-full', 'px-6')}
          color='success'
          onClick={handleOpenFilter}
          size='sm'
        >
          <div className={cn('relative', 'w-5', 'h-5')}>
            <Icon
              color='var(--color-white)'
              name='filter'
              size={20}
            />
            {isActive && (
              <span
                className={cn(
                  'inline-block',
                  'absolute',
                  '-top-0.5',
                  '-right-0.5',
                  'w-2',
                  'h-2',
                  'rounded-full',
                  'bg-red-500',
                )}
              />
            )}
          </div>
          {isKorean ? '필터' : 'Filter'}
        </Button>
      </LogClick>
    </FloatingMenu>
  );
};

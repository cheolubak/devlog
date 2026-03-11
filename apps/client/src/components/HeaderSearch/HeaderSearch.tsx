'use client';

import { Icon, Input } from '@devlog/components';
import { useDebounce } from '@devlog/hooks';
import { eventTracking } from 'apis/eventTracking';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './HeaderSearch.module.css';

export const HeaderSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const debouncedQuery = useDebounce(query);

  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const disabledSearch = pathname === 'mypage' || pathname === '/channels';

  useEffect(() => {
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    if (disabledSearch) {
      return;
    }

    const params = new URLSearchParams(searchParamsRef.current);

    if (debouncedQuery && debouncedQuery.length > 0) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }

    const queryString = params.toString();

    if (debouncedQuery.length > 0) {
      eventTracking('search', {
        pathname: pathnameRef.current,
        query: debouncedQuery,
      });
    }

    router.replace(`?${queryString}`, {
      scroll: false,
    });
  }, [debouncedQuery, router]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  if (disabledSearch) {
    return null;
  }

  return (
    <Input
      className={styles.searchInput}
      onChange={(e) => setQuery(e.target.value)}
      placeholder='Search...'
      prefix={
        <Icon
          color='var(--color-white)'
          name='search'
        />
      }
      suffix={
        query && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            type='button'
          >
            <Icon
              color='var(--color-gray-400)'
              name='clear'
            />
          </button>
        )
      }
      type='text'
      value={query}
    />
  );
};

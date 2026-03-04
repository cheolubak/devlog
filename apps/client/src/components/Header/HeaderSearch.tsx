'use client';

import { Icon } from '@devlog/components';
import { useDebounce } from '@devlog/hooks';
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

  useEffect(() => {
    if (pathnameRef.current !== '/') {
      return;
    }

    const params = new URLSearchParams(searchParamsRef.current);

    if (debouncedQuery && debouncedQuery.length > 0) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }

    const queryString = params.toString();

    router.replace(`?${queryString}`, {
      scroll: false,
    });
  }, [debouncedQuery, router]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  if (pathname !== '/' && pathname !== '/mypage/bookmarks') {
    return null;
  }

  return (
    <div className={styles.searchContainer}>
      <Icon
        color='var(--color-white)'
        name='search'
        size={20}
      />
      <input
        className={styles.searchInput}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search...'
        type='text'
        value={query}
      />
      {query && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          type='button'
        >
          <Icon
            color='var(--color-gray-400)'
            name='clear'
            size={18}
          />
        </button>
      )}
    </div>
  );
};

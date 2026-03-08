'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const STORAGE_KEY = 'devlog:scroll-positions';
const MAX_ENTRIES = 50;

interface ScrollPositions {
  [key: string]: number;
}

interface UseScrollRestorationOptions {
  isReady?: boolean;
  timeout?: number;
}

function getSavedScrollPosition(key: string): null | number {
  const positions = getScrollPositions();

  return positions[key] ?? null;
}

function getScrollPositions(): ScrollPositions {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveScrollPosition(key: string, position: number): void {
  try {
    const positions = getScrollPositions();
    positions[key] = position;

    const keys = Object.keys(positions);
    if (keys.length > MAX_ENTRIES) {
      const toRemove = keys.slice(0, keys.length - MAX_ENTRIES);
      for (const k of toRemove) {
        delete positions[k];
      }
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // sessionStorage unavailable
  }
}

export const useScrollRestoration = (
  options: UseScrollRestorationOptions = {},
) => {
  const { isReady = true, timeout = 3000 } = options;

  const pathname = usePathname();
  const hasRestoredRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (
        ticking ||
        !hasRestoredRef.current ||
        pathname !== window.location.pathname
      ) {
        return;
      }

      ticking = true;

      requestAnimationFrame(() => {
        saveScrollPosition(window.location.pathname, window.scrollY);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (hasRestoredRef.current) {
      return;
    }

    const savedPosition = getSavedScrollPosition(window.location.pathname);

    if (savedPosition === null || savedPosition === 0) {
      hasRestoredRef.current = true;
      return;
    }

    if (isReady) {
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition);
      });
      hasRestoredRef.current = true;
      return;
    }

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        hasRestoredRef.current = true;
      }, timeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      hasRestoredRef.current = false;
    };
  }, [pathname, isReady, timeout]);
};

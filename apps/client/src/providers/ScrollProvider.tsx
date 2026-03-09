'use client';

import type { ScrollDirection } from 'types';

import { useEffect, useRef } from 'react';
import { useScrollDirection } from 'stores';

export const ScrollProvider = () => {
  const setScrollDirection = useScrollDirection((state) => state.setDirection);

  const prevScrollPosY = useRef(0);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosY = window.scrollY;

      const scrollDirection: ScrollDirection =
        currentScrollPosY > prevScrollPosY.current ? 'DOWN' : 'UP';

      prevScrollPosY.current = currentScrollPosY;
      setScrollDirection(scrollDirection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

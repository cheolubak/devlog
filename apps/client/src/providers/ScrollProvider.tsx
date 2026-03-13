'use client';

import type { ScrollDirection } from 'types';

import { useEffect, useRef } from 'react';
import { useScrollDirection } from 'stores';

export const ScrollProvider = () => {
  const setScrollDirection = useScrollDirection((state) => state.setDirection);

  const requestAnimationFrameIdRef = useRef<null | number>(null);
  const prevScrollPosY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    prevScrollPosY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) {
        return;
      }

      ticking.current = true;

      requestAnimationFrameIdRef.current = requestAnimationFrame(() => {
        const currentScrollPosY = window.scrollY;
        if (currentScrollPosY === prevScrollPosY.current) {
          ticking.current = false;
          return;
        }

        const scrollDirection: ScrollDirection =
          currentScrollPosY > prevScrollPosY.current ? 'DOWN' : 'UP';

        prevScrollPosY.current = currentScrollPosY;
        setScrollDirection(scrollDirection);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ticking.current = false;
      if (requestAnimationFrameIdRef.current) {
        cancelAnimationFrame(requestAnimationFrameIdRef.current);
      }
    };
  }, []);

  return null;
};

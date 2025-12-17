'use client';

import { useEffect } from 'react';

export const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void,
) => {
  useEffect(() => {
    let bounce: NodeJS.Timeout | null = null;
    if (rippleCount > 0) {
      bounce = setTimeout(() => {
        cleanUpFunction();

        if (bounce) {
          clearTimeout(bounce);
        }
      }, duration * 4);
    }

    return () => {
      if (bounce) {
        clearTimeout(bounce);
      }
    };
  }, [rippleCount, duration, cleanUpFunction]);
};

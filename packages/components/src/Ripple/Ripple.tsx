'use client';

import { clsx } from 'clsx';
import { MouseEvent, useState } from 'react';

import { useDebouncedRippleCleanUp } from '@/packages/components/src/Ripple/useDebouncedRippleCleanUp';

import styles from './Ripple.module.css';

interface RippleProps {
  color?: string;
  duration?: number;
}

export const Ripple = ({ color = '#bdbdbd', duration = 1000 }: RippleProps) => {
  const [rippleArray, setRippleArray] = useState<
    { size: number; x: number; y: number }[]
  >([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    // setRippleArray([]);
  });

  const handleAddRipple = (e: MouseEvent<HTMLElement>) => {
    const rippleContainer = e.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = e.pageX - rippleContainer.x - size / 2;
    const y = e.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      size,
      x,
      y,
    };

    setRippleArray((prev) => [...prev, newRipple]);
  };

  return (
    <div
      className={clsx(styles.ripple)}
      onMouseDown={handleAddRipple}
    >
      {rippleArray.map(({ size, x, y }, idx) => (
        <span
          key={`ripple-${idx}`}
          style={{
            animationDuration: `${duration}ms`,
            backgroundColor: color,
            height: size,
            left: x,
            top: y,
            width: size,
          }}
        />
      ))}
    </div>
  );
};

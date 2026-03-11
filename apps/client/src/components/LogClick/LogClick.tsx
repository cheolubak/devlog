'use client';

import type { PropsWithChildren, ReactElement } from 'react';

import { eventTracking } from 'apis/eventTracking';
import { cloneElement, isValidElement } from 'react';

interface LogClickProps extends PropsWithChildren {
  eventName: string;
  params?: Record<string, string>;
}

export const LogClick = ({ children, eventName, params }: LogClickProps) => {
  const handleClick =
    (originalOnClick?: (...args: unknown[]) => void) =>
    (...args: unknown[]) => {
      eventTracking(eventName, params);

      originalOnClick?.(...args);
    };

  if (!isValidElement<{ onClick?: (...args: unknown[]) => void }>(children)) {
    return children;
  }

  return cloneElement(
    children satisfies ReactElement<{
      onClick?: (...args: unknown[]) => void;
    }>,
    {
      onClick: handleClick(children.props.onClick),
    },
  );
};

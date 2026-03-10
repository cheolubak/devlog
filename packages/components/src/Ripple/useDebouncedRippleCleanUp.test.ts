import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebouncedRippleCleanUp } from './useDebouncedRippleCleanUp';

describe('useDebouncedRippleCleanUp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('rippleCount가 0이면 cleanUpFunction을 호출하지 않는다', () => {
    const cleanUp = vi.fn();
    renderHook(() => useDebouncedRippleCleanUp(0, 1000, cleanUp));

    vi.advanceTimersByTime(5000);
    expect(cleanUp).not.toHaveBeenCalled();
  });

  it('rippleCount > 0이면 duration * 4 후에 cleanUpFunction을 호출한다', () => {
    const cleanUp = vi.fn();
    renderHook(() => useDebouncedRippleCleanUp(1, 1000, cleanUp));

    vi.advanceTimersByTime(3999);
    expect(cleanUp).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(cleanUp).toHaveBeenCalledTimes(1);
  });

  it('duration이 변경되면 새 타이머를 사용한다', () => {
    const cleanUp = vi.fn();
    const { rerender } = renderHook(
      ({ duration }) => useDebouncedRippleCleanUp(1, duration, cleanUp),
      { initialProps: { duration: 500 } },
    );

    rerender({ duration: 2000 });

    vi.advanceTimersByTime(2000 * 4);
    expect(cleanUp).toHaveBeenCalledTimes(1);
  });

  it('언마운트 시 타이머를 정리한다', () => {
    const cleanUp = vi.fn();
    const { unmount } = renderHook(() =>
      useDebouncedRippleCleanUp(1, 1000, cleanUp),
    );

    unmount();

    vi.advanceTimersByTime(5000);
    expect(cleanUp).not.toHaveBeenCalled();
  });
});

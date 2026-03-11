import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ScrollProvider } from './ScrollProvider';

vi.mock('stores', () => {
  const setDirection = vi.fn();

  return {
    useScrollDirection: (
      selector: (state: { setDirection: typeof setDirection }) => unknown,
    ) => selector({ setDirection }),
  };
});

describe('ScrollProvider', () => {
  it('null을 반환한다', () => {
    const { container } = render(<ScrollProvider />);

    expect(container.innerHTML).toBe('');
  });

  it('scrollRestoration을 manual로 설정한다', () => {
    Object.defineProperty(window.history, 'scrollRestoration', {
      configurable: true,
      value: 'auto',
      writable: true,
    });

    render(<ScrollProvider />);

    expect(window.history.scrollRestoration).toBe('manual');
  });

  it('scroll 이벤트 리스너를 등록한다', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    render(<ScrollProvider />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
  });

  it('언마운트 시 scroll 이벤트 리스너를 제거한다', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollProvider />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { InfiniteScroll } from './InfiniteScroll';

let intersectionCallback: ((entries: Partial<IntersectionObserverEntry>[]) => void) | null = null;

beforeEach(() => {
  intersectionCallback = null;

  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn().mockImplementation((callback: typeof intersectionCallback) => {
      intersectionCallback = callback;
      return { disconnect: vi.fn(), observe: vi.fn(), unobserve: vi.fn() };
    }),
  );
});

describe('InfiniteScroll', () => {
  it('children을 렌더링한다', () => {
    render(
      <InfiniteScroll fetchNext={vi.fn()} hasNext isFetching={false}>
        <div>아이템</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText('아이템')).toBeInTheDocument();
  });

  it('교차 감지 시 hasNext=true이고 isFetching=false이면 fetchNext를 호출한다', () => {
    const fetchNext = vi.fn();
    render(
      <InfiniteScroll fetchNext={fetchNext} hasNext isFetching={false}>
        <div>내용</div>
      </InfiniteScroll>,
    );

    intersectionCallback?.([{ isIntersecting: true }]);
    expect(fetchNext).toHaveBeenCalledTimes(1);
  });

  it('hasNext=false이면 교차 감지 시 fetchNext를 호출하지 않는다', () => {
    const fetchNext = vi.fn();
    render(
      <InfiniteScroll fetchNext={fetchNext} hasNext={false} isFetching={false}>
        <div>내용</div>
      </InfiniteScroll>,
    );

    intersectionCallback?.([{ isIntersecting: true }]);
    expect(fetchNext).not.toHaveBeenCalled();
  });

  it('isFetching=true이면 교차 감지 시 fetchNext를 호출하지 않는다', () => {
    const fetchNext = vi.fn();
    render(
      <InfiniteScroll fetchNext={fetchNext} hasNext isFetching>
        <div>내용</div>
      </InfiniteScroll>,
    );

    intersectionCallback?.([{ isIntersecting: true }]);
    expect(fetchNext).not.toHaveBeenCalled();
  });

  it('isIntersecting=false이면 fetchNext를 호출하지 않는다', () => {
    const fetchNext = vi.fn();
    render(
      <InfiniteScroll fetchNext={fetchNext} hasNext isFetching={false}>
        <div>내용</div>
      </InfiniteScroll>,
    );

    intersectionCallback?.([{ isIntersecting: false }]);
    expect(fetchNext).not.toHaveBeenCalled();
  });
});

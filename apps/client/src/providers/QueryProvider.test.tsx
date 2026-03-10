import { useQueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { QueryProvider } from './QueryProvider';

const TestChild = () => {
  const queryClient = useQueryClient();

  return (
    <div data-testid='child'>
      {queryClient ? 'QueryClient 존재' : 'QueryClient 없음'}
    </div>
  );
};

describe('QueryProvider', () => {
  it('children을 렌더링한다', () => {
    render(
      <QueryProvider>
        <p>테스트 내용</p>
      </QueryProvider>,
    );

    expect(screen.getByText('테스트 내용')).toBeInTheDocument();
  });

  it('QueryClientProvider를 제공한다', () => {
    render(
      <QueryProvider>
        <TestChild />
      </QueryProvider>,
    );

    expect(screen.getByText('QueryClient 존재')).toBeInTheDocument();
  });

  it('기본 쿼리 옵션에 retry가 false로 설정되어 있다', () => {
    let retryValue: unknown;

    const InspectChild = () => {
      const queryClient = useQueryClient();
      retryValue = queryClient.getDefaultOptions().queries?.retry;
      return null;
    };

    render(
      <QueryProvider>
        <InspectChild />
      </QueryProvider>,
    );

    expect(retryValue).toBe(false);
  });

  it('기본 쿼리 옵션에 staleTime이 1시간으로 설정되어 있다', () => {
    let staleTimeValue: unknown;

    const InspectChild = () => {
      const queryClient = useQueryClient();
      staleTimeValue = queryClient.getDefaultOptions().queries?.staleTime;
      return null;
    };

    render(
      <QueryProvider>
        <InspectChild />
      </QueryProvider>,
    );

    expect(staleTimeValue).toBe(3600000);
  });
});

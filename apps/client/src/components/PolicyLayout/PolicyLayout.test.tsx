import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PolicyLayout } from './PolicyLayout';

describe('PolicyLayout', () => {
  it('children을 렌더링한다', () => {
    render(
      <PolicyLayout>
        <p>테스트 내용</p>
      </PolicyLayout>,
    );

    expect(screen.getByText('테스트 내용')).toBeInTheDocument();
  });

  it('main 요소로 렌더링된다', () => {
    render(
      <PolicyLayout>
        <p>내용</p>
      </PolicyLayout>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

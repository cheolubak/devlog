import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { I18nProvider } from './I18nProvider';

describe('I18nProvider', () => {
  it('children을 렌더링한다', () => {
    render(
      <I18nProvider>
        <p>테스트 내용</p>
      </I18nProvider>,
    );

    expect(screen.getByText('테스트 내용')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PolicyTable } from './PolicyTable';

describe('PolicyTable', () => {
  it('children을 렌더링한다', () => {
    render(
      <PolicyTable>
        <thead>
          <tr>
            <th>항목</th>
          </tr>
        </thead>
      </PolicyTable>,
    );

    expect(screen.getByText('항목')).toBeInTheDocument();
  });

  it('table 요소를 포함한다', () => {
    render(
      <PolicyTable>
        <tbody>
          <tr>
            <td>데이터</td>
          </tr>
        </tbody>
      </PolicyTable>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { InputGroup } from './InputGroup';

describe('InputGroup', () => {
  it('div 요소로 렌더링된다', () => {
    render(<InputGroup data-testid='group' />);
    expect(screen.getByTestId('group').tagName).toBe('DIV');
  });

  it('label이 있으면 렌더링된다', () => {
    render(<InputGroup label='이메일' />);
    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('label이 없으면 렌더링되지 않는다', () => {
    render(<InputGroup data-testid='group' />);
    expect(screen.queryByRole('generic', { name: /label/ })).toBeNull();
  });

  it('children을 렌더링한다', () => {
    render(
      <InputGroup>
        <input placeholder='입력' />
      </InputGroup>,
    );
    expect(screen.getByPlaceholderText('입력')).toBeInTheDocument();
  });

  it('추가 className을 병합한다', () => {
    render(<InputGroup className='custom' data-testid='group' />);
    expect(screen.getByTestId('group').classList.contains('custom')).toBe(true);
  });

  it('추가 props를 전달한다', () => {
    render(<InputGroup aria-label='폼 그룹' data-testid='group' />);
    expect(screen.getByTestId('group')).toHaveAttribute(
      'aria-label',
      '폼 그룹',
    );
  });
});

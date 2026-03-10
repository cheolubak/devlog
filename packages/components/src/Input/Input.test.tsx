import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('input 요소가 렌더링된다', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('placeholder prop을 전달한다', () => {
    render(<Input placeholder='검색' />);
    expect(screen.getByPlaceholderText('검색')).toBeInTheDocument();
  });

  it('prefix가 있으면 렌더링된다', () => {
    render(<Input prefix={<span>@</span>} />);
    expect(screen.getByText('@')).toBeInTheDocument();
  });

  it('suffix가 있으면 렌더링된다', () => {
    render(<Input suffix={<button>검색</button>} />);
    expect(screen.getByRole('button', { name: '검색' })).toBeInTheDocument();
  });

  it('prefix가 없으면 렌더링되지 않는다', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('[class*="prefix"]')).toBeNull();
  });

  it('suffix가 없으면 렌더링되지 않는다', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('[class*="suffix"]')).toBeNull();
  });

  it('값을 입력할 수 있다', async () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '안녕하세요');
    expect(input).toHaveValue('안녕하세요');
  });

  it('onChange 핸들러가 호출된다', async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('inputClassName이 input에 적용된다', () => {
    render(<Input inputClassName='custom-input' />);
    expect(
      screen.getByRole('textbox').classList.contains('custom-input'),
    ).toBe(true);
  });
});

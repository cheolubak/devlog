import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('button 요소로 렌더링된다', () => {
    render(<IconButton name='search' />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('size prop이 width/height 스타일로 적용된다', () => {
    render(<IconButton name='search' size={48} />);
    const btn = screen.getByRole('button') as HTMLElement;
    expect(btn.style.width).toBe('48px');
    expect(btn.style.height).toBe('48px');
  });

  it('기본 size는 32이다', () => {
    render(<IconButton name='search' />);
    const btn = screen.getByRole('button') as HTMLElement;
    expect(btn.style.width).toBe('32px');
    expect(btn.style.height).toBe('32px');
  });

  it('onClick 이벤트가 호출된다', async () => {
    const onClick = vi.fn();
    render(<IconButton name='search' onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태가 적용된다', async () => {
    const onClick = vi.fn();
    render(<IconButton disabled name='search' onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('추가 className을 병합한다', () => {
    render(<IconButton className='my-btn' name='search' />);
    expect(screen.getByRole('button').classList.contains('my-btn')).toBe(true);
  });

  it('aria-label을 전달한다', () => {
    render(<IconButton aria-label='검색' name='search' />);
    expect(screen.getByRole('button', { name: '검색' })).toBeInTheDocument();
  });
});

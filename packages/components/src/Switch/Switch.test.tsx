import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('checkbox 역할의 input이 렌더링된다', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('defaultChecked=true이면 초기값이 체크된 상태다', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('checked=true로 제어 상태가 체크된다', () => {
    render(<Switch checked onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('checked=false로 제어 상태가 체크 해제된다', () => {
    render(<Switch checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('클릭하면 onChange가 boolean 값으로 호출된다', async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('checked prop이 변경되면 상태가 업데이트된다', () => {
    const { rerender } = render(<Switch checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Switch checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('추가 props를 input에 전달한다', () => {
    render(<Switch aria-label='다크모드' />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-label',
      '다크모드',
    );
  });
});

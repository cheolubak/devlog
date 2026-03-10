import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('checkbox 역할의 input이 렌더링된다', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('defaultChecked=true이면 초기값이 체크된 상태다', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('defaultChecked가 없으면 초기값이 체크 해제 상태다', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('children이 있으면 라벨 텍스트가 렌더링된다', () => {
    render(<Checkbox>동의합니다</Checkbox>);
    expect(screen.getByText('동의합니다')).toBeInTheDocument();
  });

  it('클릭하면 onChange가 boolean 값으로 호출된다', async () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('체크된 상태에서 클릭하면 onChange가 false로 호출된다', async () => {
    const onChange = vi.fn();
    render(<Checkbox defaultChecked onChange={onChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('controlled: checked prop이 변경되면 체크 상태가 업데이트된다', () => {
    const { rerender } = render(<Checkbox checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});

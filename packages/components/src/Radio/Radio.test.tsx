import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from './Radio';

describe('Radio', () => {
  it('radio 역할의 input이 렌더링된다', () => {
    render(<Radio name='group' />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('name prop이 input에 적용된다', () => {
    render(<Radio name='my-group' />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'my-group');
  });

  it('children이 있으면 라벨 텍스트가 렌더링된다', () => {
    render(<Radio name='group'>옵션 1</Radio>);
    expect(screen.getByText('옵션 1')).toBeInTheDocument();
  });

  it('children이 없으면 라벨 텍스트가 없다', () => {
    const { container } = render(<Radio name='group' />);
    const label = container.querySelector('label')!;
    expect(label.textContent).toBe('');
  });

  it('value prop이 input에 적용된다', () => {
    render(<Radio name='group' value='option-a' />);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'option-a');
  });

  it('checked 상태가 적용된다', () => {
    render(<Radio checked name='group' onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('onChange 핸들러가 호출된다', async () => {
    const onChange = vi.fn();
    render(<Radio name='group' onChange={onChange} />);

    await userEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });

  it('disabled 상태가 적용된다', () => {
    render(<Radio disabled name='group' />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });
});

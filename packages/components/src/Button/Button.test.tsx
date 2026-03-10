import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('button 요소로 렌더링된다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('children을 렌더링한다', () => {
    render(<Button>저장</Button>);
    expect(screen.getByText('저장')).toBeInTheDocument();
  });

  it('onClick 이벤트가 호출된다', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서 클릭이 동작하지 않는다', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        클릭
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('draggable이 false로 설정된다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('draggable', 'false');
  });

  it('type prop을 전달한다', () => {
    render(<Button type='submit'>제출</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('추가 className을 병합한다', () => {
    render(<Button className='my-btn'>클릭</Button>);
    expect(screen.getByRole('button').classList.contains('my-btn')).toBe(true);
  });
});

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Overlay } from './Overlay';

describe('Overlay', () => {
  it('div 요소로 렌더링된다', () => {
    render(<Overlay data-testid='overlay' />);
    expect(screen.getByTestId('overlay').tagName).toBe('DIV');
  });

  it('onClick 이벤트가 호출된다', async () => {
    const onClick = vi.fn();
    render(<Overlay data-testid='overlay' onClick={onClick} />);

    await userEvent.click(screen.getByTestId('overlay'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('추가 props를 전달한다', () => {
    render(<Overlay aria-label='오버레이' data-testid='overlay' />);
    expect(screen.getByTestId('overlay')).toHaveAttribute(
      'aria-label',
      '오버레이',
    );
  });
});

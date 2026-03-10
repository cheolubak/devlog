import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FloatingMenu } from './FloatingMenu';

describe('FloatingMenu', () => {
  it('div 요소로 렌더링된다', () => {
    render(<FloatingMenu data-testid='menu' position='center' />);
    expect(screen.getByTestId('menu').tagName).toBe('DIV');
  });

  it('position prop이 data-position 속성으로 설정된다', () => {
    render(<FloatingMenu data-testid='menu' position='left' />);
    expect(screen.getByTestId('menu')).toHaveAttribute('data-position', 'left');
  });

  it.each(['center', 'left', 'right'] as const)(
    'position="%s"이 data-position으로 반영된다',
    (position) => {
      render(
        <FloatingMenu data-testid='menu' position={position} />,
      );
      expect(screen.getByTestId('menu')).toHaveAttribute(
        'data-position',
        position,
      );
    },
  );

  it('children을 렌더링한다', () => {
    render(
      <FloatingMenu position='center'>
        <button>메뉴 아이템</button>
      </FloatingMenu>,
    );
    expect(screen.getByText('메뉴 아이템')).toBeInTheDocument();
  });

  it('추가 className을 병합한다', () => {
    render(
      <FloatingMenu className='extra' data-testid='menu' position='center' />,
    );
    expect(screen.getByTestId('menu').classList.contains('extra')).toBe(true);
  });
});

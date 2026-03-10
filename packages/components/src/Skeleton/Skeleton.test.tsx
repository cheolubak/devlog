import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('div 요소로 렌더링된다', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('width, height 스타일이 적용된다', () => {
    const { container } = render(<Skeleton height={40} width={200} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('40px');
  });

  it('width, height를 문자열로 전달할 수 있다', () => {
    const { container } = render(<Skeleton height='2rem' width='100%' />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('100%');
    expect(el.style.height).toBe('2rem');
  });

  it('width, height가 없으면 스타일에 포함되지 않는다', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('');
    expect(el.style.height).toBe('');
  });

  it('추가 className을 병합한다', () => {
    const { container } = render(<Skeleton className='custom' />);
    const el = container.firstChild as HTMLElement;
    expect(el.classList.contains('custom')).toBe(true);
  });
});

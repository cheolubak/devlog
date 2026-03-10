import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from './Icon';

describe('Icon', () => {
  it('i 요소로 렌더링된다', () => {
    const { container } = render(<Icon name='check' />);
    expect(container.querySelector('i')).toBeInTheDocument();
  });

  it('size prop이 fontSize 스타일로 적용된다', () => {
    const { container } = render(<Icon name='check' size={32} />);
    const el = container.querySelector('i') as HTMLElement;
    expect(el.style.fontSize).toBe('32px');
  });

  it('기본 size는 24이다', () => {
    const { container } = render(<Icon name='check' />);
    const el = container.querySelector('i') as HTMLElement;
    expect(el.style.fontSize).toBe('24px');
  });

  it('커스텀 color가 fill 스타일로 적용된다', () => {
    const { container } = render(
      <Icon color='#ff0000' name='check' />,
    );
    const el = container.querySelector('i') as HTMLElement;
    expect(el.style.fill).toBe('rgb(255, 0, 0)');
  });

  it('IconColor("primary")인 경우 fill 스타일이 설정되지 않는다', () => {
    const { container } = render(<Icon color='primary' name='check' />);
    const el = container.querySelector('i') as HTMLElement;
    expect(el.style.fill).toBe('');
  });

  it('추가 className을 병합한다', () => {
    const { container } = render(
      <Icon className='my-icon' name='check' />,
    );
    const el = container.querySelector('i') as HTMLElement;
    expect(el.classList.contains('my-icon')).toBe(true);
  });

  it('각 아이콘 이름에 대해 아이콘 컴포넌트가 렌더링된다', () => {
    const { container } = render(<Icon name='github' />);
    expect(container.querySelector('i')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

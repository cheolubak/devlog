import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Typography } from './Typography';

describe('Typography', () => {
  it('기본값으로 span 요소를 렌더링한다', () => {
    render(<Typography>텍스트</Typography>);
    expect(screen.getByText('텍스트').tagName).toBe('SPAN');
  });

  it('semantic prop에 따라 다른 태그를 렌더링한다', () => {
    render(<Typography semantic='h1'>제목</Typography>);
    expect(screen.getByText('제목').tagName).toBe('H1');
  });

  it('semantic="p"로 p 태그를 렌더링한다', () => {
    render(<Typography semantic='p'>단락</Typography>);
    expect(screen.getByText('단락').tagName).toBe('P');
  });

  it('children을 렌더링한다', () => {
    render(<Typography>안녕하세요</Typography>);
    expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  });

  it('추가 className을 병합한다', () => {
    render(<Typography className='custom-class'>텍스트</Typography>);
    expect(screen.getByText('텍스트').classList.contains('custom-class')).toBe(
      true,
    );
  });

  it('추가 props를 전달한다', () => {
    render(
      <Typography aria-label='설명' data-testid='typo'>
        텍스트
      </Typography>,
    );
    expect(screen.getByTestId('typo')).toHaveAttribute('aria-label', '설명');
  });
});

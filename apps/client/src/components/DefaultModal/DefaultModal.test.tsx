import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

const mockClose = vi.fn();

vi.mock('@devlog/components', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
  Modal: ({ children, ...props }: { children: React.ReactNode }) => (
    <div
      data-testid='modal'
      {...props}
    >
      {children}
    </div>
  ),
  Typography: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }) => <span {...props}>{children}</span>,
  useModal: () => ({ close: mockClose }),
}));

import { DefaultModal } from './DefaultModal';

describe('DefaultModal', () => {
  it('title을 렌더링한다', () => {
    render(<DefaultModal title='테스트 제목' />);

    expect(screen.getByText('테스트 제목')).toBeInTheDocument();
  });

  it('description을 렌더링한다', () => {
    render(<DefaultModal description='테스트 설명' />);

    expect(screen.getByText('테스트 설명')).toBeInTheDocument();
  });

  it('title이 없으면 렌더링하지 않는다', () => {
    render(<DefaultModal description='설명만' />);

    expect(screen.queryByText('테스트 제목')).not.toBeInTheDocument();
  });

  it('confirmText 버튼을 렌더링한다', () => {
    render(<DefaultModal confirmText='확인' />);

    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  it('cancelText 버튼을 렌더링한다', () => {
    render(<DefaultModal cancelText='취소' />);

    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('확인 버튼 클릭 시 onConfirm과 close가 호출된다', async () => {
    const onConfirm = vi.fn();

    render(
      <DefaultModal
        confirmText='확인'
        modalKey='test'
        onConfirm={onConfirm}
      />,
    );

    await userEvent.click(screen.getByText('확인'));

    expect(mockClose).toHaveBeenCalledWith('test');
    expect(onConfirm).toHaveBeenCalled();
  });

  it('취소 버튼 클릭 시 onCancel과 close가 호출된다', async () => {
    const onCancel = vi.fn();

    render(
      <DefaultModal
        cancelText='취소'
        modalKey='test'
        onCancel={onCancel}
      />,
    );

    await userEvent.click(screen.getByText('취소'));

    expect(mockClose).toHaveBeenCalledWith('test');
    expect(onCancel).toHaveBeenCalled();
  });
});

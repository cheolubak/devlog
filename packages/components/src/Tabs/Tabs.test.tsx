import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tab, Tabs } from './Tabs';

function renderTabs({
  disabled = false,
  onChange = vi.fn(),
  value = 'tab1',
} = {}) {
  return render(
    <Tabs onChange={onChange} value={value}>
      <Tab value='tab1'>탭 1</Tab>
      <Tab value='tab2'>탭 2</Tab>
      <Tab disabled={disabled} value='tab3'>
        탭 3
      </Tab>
    </Tabs>,
  );
}

describe('Tab', () => {
  it('button 역할로 렌더링된다', () => {
    render(
      <Tabs onChange={vi.fn()} value='tab1'>
        <Tab value='tab1'>탭 1</Tab>
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: '탭 1' })).toBeInTheDocument();
  });

  it('선택된 탭은 aria-selected=true이다', () => {
    render(
      <Tabs onChange={vi.fn()} value='tab1'>
        <Tab value='tab1'>탭 1</Tab>
        <Tab value='tab2'>탭 2</Tab>
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: '탭 1' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: '탭 2' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('disabled 탭은 비활성화된다', () => {
    renderTabs({ disabled: true });
    expect(screen.getByRole('tab', { name: '탭 3' })).toBeDisabled();
  });
});

describe('Tabs', () => {
  it('탭 목록이 렌더링된다', () => {
    renderTabs();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('탭 클릭 시 onChange가 해당 value로 호출된다', async () => {
    const onChange = vi.fn();
    renderTabs({ onChange });

    await userEvent.click(screen.getByRole('tab', { name: '탭 2' }));
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('disabled 탭을 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn();
    renderTabs({ disabled: true, onChange });

    await userEvent.click(screen.getByRole('tab', { name: '탭 3' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('ArrowRight 키로 다음 탭으로 이동한다', async () => {
    const onChange = vi.fn();
    renderTabs({ onChange, value: 'tab1' });

    screen.getByRole('tab', { name: '탭 1' }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('ArrowLeft 키로 이전 탭으로 이동한다', async () => {
    const onChange = vi.fn();
    renderTabs({ onChange, value: 'tab2' });

    screen.getByRole('tab', { name: '탭 2' }).focus();
    await userEvent.keyboard('{ArrowLeft}');

    expect(onChange).toHaveBeenCalledWith('tab1');
  });

  it('End 키로 마지막 활성 탭으로 이동한다', async () => {
    const onChange = vi.fn();
    renderTabs({ onChange, value: 'tab1' });

    screen.getByRole('tab', { name: '탭 1' }).focus();
    await userEvent.keyboard('{End}');

    // tab3가 활성화된 상태이므로 마지막 탭은 tab3
    expect(onChange).toHaveBeenCalledWith('tab3');
  });

  it('End 키로 disabled 탭을 제외한 마지막 활성 탭으로 이동한다', async () => {
    const onChange = vi.fn();
    renderTabs({ disabled: true, onChange, value: 'tab1' });

    screen.getByRole('tab', { name: '탭 1' }).focus();
    await userEvent.keyboard('{End}');

    // tab3가 disabled이므로 마지막 활성 탭은 tab2
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('Home 키로 첫 번째 활성 탭으로 이동한다', async () => {
    const onChange = vi.fn();
    renderTabs({ onChange, value: 'tab2' });

    screen.getByRole('tab', { name: '탭 2' }).focus();
    await userEvent.keyboard('{Home}');

    expect(onChange).toHaveBeenCalledWith('tab1');
  });

  it('키보드 이동 시 disabled 탭을 건너뛴다', async () => {
    const onChange = vi.fn();
    renderTabs({ disabled: true, onChange, value: 'tab2' });

    screen.getByRole('tab', { name: '탭 2' }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(onChange).toHaveBeenCalledWith('tab1');
  });

  it('tablist role이 설정된다', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});

import { createElement } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useModal } from './useModal';

describe('useModal', () => {
  beforeEach(() => {
    useModal.setState({ modals: [] });
  });

  it('초기 상태에서 modals는 빈 배열이다', () => {
    expect(useModal.getState().modals).toEqual([]);
  });

  it('open()은 모달을 modals에 추가한다', () => {
    const content = createElement('div', null, '모달 내용');
    useModal.getState().open(content);

    expect(useModal.getState().modals).toHaveLength(1);
    expect(useModal.getState().modals[0]!.content).toBe(content);
  });

  it('open()은 커스텀 modalKey를 사용한다', () => {
    const content = createElement('div');
    useModal.getState().open(content, { modalKey: 'test-modal' });

    expect(useModal.getState().modals[0]!.modalKey).toBe('test-modal');
  });

  it('open()에 modalKey가 없으면 nanoid로 key를 생성한다', () => {
    useModal.getState().open(createElement('div'));

    const key = useModal.getState().modals[0]!.modalKey;
    expect(typeof key).toBe('string');
    expect(key.length).toBeGreaterThan(0);
  });

  it('같은 key로 open()을 다시 호출하면 기존 모달을 교체한다', () => {
    const first = createElement('div', null, 'first');
    const second = createElement('div', null, 'second');
    useModal.getState().open(first, { modalKey: 'my-modal' });
    useModal.getState().open(second, { modalKey: 'my-modal' });

    expect(useModal.getState().modals).toHaveLength(1);
    expect(useModal.getState().modals[0]!.content).toBe(second);
  });

  it('여러 개의 모달을 동시에 열 수 있다', () => {
    useModal.getState().open(createElement('div'), { modalKey: 'modal-1' });
    useModal.getState().open(createElement('div'), { modalKey: 'modal-2' });

    expect(useModal.getState().modals).toHaveLength(2);
  });

  it('close(key)는 해당 모달만 닫는다', () => {
    useModal.getState().open(createElement('div'), { modalKey: 'modal-1' });
    useModal.getState().open(createElement('div'), { modalKey: 'modal-2' });
    useModal.getState().close('modal-1');

    expect(useModal.getState().modals).toHaveLength(1);
    expect(useModal.getState().modals[0]!.modalKey).toBe('modal-2');
  });

  it('close() without key는 모든 모달을 닫는다', () => {
    useModal.getState().open(createElement('div'), { modalKey: 'modal-1' });
    useModal.getState().open(createElement('div'), { modalKey: 'modal-2' });
    useModal.getState().close();

    expect(useModal.getState().modals).toEqual([]);
  });

  it('존재하지 않는 key로 close()를 호출해도 오류가 발생하지 않는다', () => {
    useModal.getState().open(createElement('div'), { modalKey: 'modal-1' });
    expect(() => useModal.getState().close('non-existent')).not.toThrow();
    expect(useModal.getState().modals).toHaveLength(1);
  });
});

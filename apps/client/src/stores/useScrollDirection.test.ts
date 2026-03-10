import { describe, expect, it } from 'vitest';

import { useScrollDirection } from './useScrollDirection';

describe('useScrollDirection', () => {
  it('초기 direction은 UP이다', () => {
    const state = useScrollDirection.getState();

    expect(state.direction).toBe('UP');
  });

  it('setDirection으로 DOWN으로 변경할 수 있다', () => {
    const { setDirection } = useScrollDirection.getState();

    setDirection('DOWN');

    expect(useScrollDirection.getState().direction).toBe('DOWN');
  });

  it('setDirection으로 UP으로 다시 변경할 수 있다', () => {
    const { setDirection } = useScrollDirection.getState();

    setDirection('DOWN');
    setDirection('UP');

    expect(useScrollDirection.getState().direction).toBe('UP');
  });
});

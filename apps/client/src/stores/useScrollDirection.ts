import type { ScrollDirection } from 'types';

import { create } from 'zustand';

interface ScrollDirectionState {
  direction: ScrollDirection;
  setDirection: (direction: ScrollDirection) => void;
}

export const useScrollDirection = create<ScrollDirectionState>((set) => ({
  direction: 'UP',
  setDirection: (direction: ScrollDirection) => set({ direction }),
}));

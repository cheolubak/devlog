import type { ReactElement } from 'react';

import { nanoid } from 'nanoid';
import { create } from 'zustand';

interface ModalState {
  close: (modalKey?: string) => void;
  modals: { content: ReactElement; modalKey: string }[];
  open: (content: ReactElement, options?: { modalKey?: string }) => void;
}

export const useModal = create<ModalState>((set) => ({
  close: (modalKey?: string) => {
    set((state) => {
      if (!modalKey) {
        return { modals: [] };
      }

      return { modals: state.modals.filter((x) => x.modalKey !== modalKey) };
    });
  },
  modals: [],
  open: (content: ReactElement, options?: { modalKey?: string }) => {
    set((state) => {
      const modalKey = options?.modalKey || nanoid();
      return {
        modals: [
          ...state.modals.filter((x) => x.modalKey !== modalKey),
          { content, modalKey },
        ],
      };
    });
  },
}));

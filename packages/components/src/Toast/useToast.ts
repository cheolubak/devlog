import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type ToastType = 'error' | 'info' | 'success';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  dismiss: (id: string) => void;
  show: (message: string, type?: ToastType) => void;
  toasts: ToastItem[];
}

export const useToast = create<ToastState>((set) => ({
  dismiss: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  show: (message: string, type: ToastType = 'error') => {
    const id = nanoid();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
  },
  toasts: [],
}));

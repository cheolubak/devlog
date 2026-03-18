'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { ToastType } from './useToast';

import { useToast } from './useToast';

const TOAST_DURATION = 3000;

const typeStyles: Record<ToastType, string> = {
  error: 'bg-red-600 text-white',
  info: 'bg-gray-800 text-white',
  success: 'bg-green-600 text-white',
};

const ToastItem = ({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: ToastType;
}) => {
  const dismiss = useToast((state) => state.dismiss);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => dismiss(id), 300);
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [dismiss, id]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => dismiss(id), 300);
  }, [dismiss, id]);

  return (
    <div
      aria-live="assertive"
      className={`${typeStyles[type]} px-4 py-3 rounded-lg shadow-lg text-sm max-w-[320px] transition-all duration-300 cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2'
      }`}
      onClick={handleDismiss}
      role="alert"
    >
      {message}
    </div>
  );
};

export const Toast = () => {
  const toasts = useToast((state) => state.toasts);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[1100] flex flex-col-reverse gap-2 items-center">
      {toasts.map((toast) => (
        <ToastItem
          id={toast.id}
          key={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>,
    document.body,
  );
};

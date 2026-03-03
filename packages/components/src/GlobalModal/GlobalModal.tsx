'use client';

import type { ModalProps } from '../Modal';

import { cloneElement, isValidElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useModal } from './useModal';

export const GlobalModal = () => {
  const modals = useModal((state) => state.modals);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return modals.map(
    (modal) =>
      isValidElement<ModalProps>(modal.content) &&
      createPortal(
        cloneElement(modal.content, {
          ...modal.content.props,
          modalKey: modal.modalKey,
        }),
        document.body,
      ),
  );
};

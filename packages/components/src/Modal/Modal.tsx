'use client';

import type { ComponentProps } from 'react';

import { cn } from '@devlog/utils';
import { useEffect, useRef } from 'react';

import { useModal } from '../GlobalModal';
import { Overlay } from '../Overlay';

export interface ModalProps extends ComponentProps<'dialog'> {
  disabledClose?: boolean;
  modalKey?: string;
}

export const Modal = ({
  className,
  disabledClose = false,
  modalKey,
  ...props
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeModal = useModal((state) => state.close);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    const handleCancel = (e: Event) => {
      if (disabledClose) {
        e.preventDefault();
        return;
      }
      closeModal(modalKey);
    };

    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.close();
    };
  }, [closeModal, disabledClose, modalKey]);

  const handleClickOverlay = () => {
    if (disabledClose) {
      return;
    }

    closeModal(modalKey);
  };

  return (
    <>
      <Overlay onClick={handleClickOverlay} />
      <dialog
        {...props}
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg min-w-[90dvw] md:min-w-[500px] max-w-screen lg:max-w-[800px] min-h-[90dvh] md:min-h-[200px] max-h-screen lg:max-h-[80dvh] shadow-lg z-1000 backdrop:bg-transparent',
          className,
        )}
        ref={dialogRef}
      />
    </>
  );
};

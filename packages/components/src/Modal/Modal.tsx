'use client';

import type { ComponentProps } from 'react';

import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

import { useModal } from '../GlobalModal';
import { Overlay } from '../Overlay';

import styles from './Modal.module.css';

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
    dialogRef.current?.show();

    return () => {
      dialogRef.current?.close();
    };
  }, []);

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
        className={clsx(styles.modal, className)}
        open={true}
        ref={dialogRef}
      />
    </>
  );
};

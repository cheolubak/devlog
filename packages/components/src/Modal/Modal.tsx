import type { ReactNode } from 'react';

import { Overlay } from '../Overlay/Overlay';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className={styles.modal}>
      <div
        onClick={onClose}
        role='presentation'
      >
        <Overlay />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

import { Button, Modal, Typography, useModal } from '@devlog/components';
import { clsx } from 'clsx';

import styles from './DefaultModal.module.css';

interface DefaultModalProps {
  cancelText?: string;
  confirmText?: string;
  description?: string;
  modalKey?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  title?: string;
}

export const DefaultModal = ({
  cancelText,
  confirmText,
  description,
  modalKey,
  onCancel,
  onConfirm,
  title,
}: DefaultModalProps) => {
  const { close } = useModal();

  const handleClickCancel = () => {
    close(modalKey);
    onCancel?.();
  };

  const handleClickConfirm = () => {
    close(modalKey);
    onConfirm?.();
  };

  return (
    <Modal className={styles.defaultModal}>
      {title && (
        <Typography className={styles.defaultModalTitle}>{title}</Typography>
      )}
      {description && (
        <Typography className={styles.defaultModalDescription}>
          {description}
        </Typography>
      )}
      <footer className={styles.defaultModalMenu}>
        {cancelText && (
          <Button
            className={clsx(
              styles.defaultModalMenuButton,
              styles.defaultModalCancelButton,
            )}
            onClick={handleClickCancel}
            variant='text'
          >
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button
            className={styles.defaultModalMenuButton}
            onClick={handleClickConfirm}
            variant='filled'
          >
            {confirmText}
          </Button>
        )}
      </footer>
    </Modal>
  );
};

import { Button, Modal, Typography, useModal } from '@devlog/components';
import { cn } from '@devlog/utils';

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
    <Modal
      className={cn(
        'flex flex-col justify-start items-stretch',
        'px-4 md:px-6 py-8 md:py-10 h-fit min-h-0',
      )}
    >
      {title && (
        <Typography className={cn('mb-6 text-center')}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography className={cn('mb-9 text-center')}>
          {description}
        </Typography>
      )}
      <footer className={cn('flex justify-center items-center gap-3')}>
        {cancelText && (
          <Button
            className={cn('flex-1 !text-gray-900')}
            onClick={handleClickCancel}
            variant='text'
          >
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button
            className={cn('flex-1')}
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

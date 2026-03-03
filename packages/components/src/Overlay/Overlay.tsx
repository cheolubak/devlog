import type { ComponentProps } from 'react';

import styles from './Overlay.module.css';

interface OverlayProps extends ComponentProps<'div'> {}

export const Overlay = ({ ...props }: OverlayProps) => {
  return <div {...props} className={styles.overlay} />;
};

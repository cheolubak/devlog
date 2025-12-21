import { clsx } from 'clsx';
import Image, { ImageProps } from 'next/image';

import styles from './CardThumbnail.module.css';

interface CardThumbnailProps extends ImageProps {}

export const CardThumbnail = ({ className, ...props }: CardThumbnailProps) => {
  return (
    <Image
      {...props}
      className={clsx(styles.cardThumbnail, className)}
      height={450}
      width={600}
    />
  );
};

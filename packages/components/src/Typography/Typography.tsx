import type { ComponentProps, ElementType, JSX, PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import styles from './Typography.module.scss';

interface TypographyProps<
  T extends ElementType = TypographySemantic,
> extends PropsWithChildren {
  className?: string;
  maxLines?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  semantic?: T;
  variants?: TypographyVariants;
}

type TypographyPropsWithIntrinsic<T extends ElementType = TypographySemantic> =
  Omit<ComponentProps<T>, keyof TypographyProps<T>> & TypographyProps<T>;

type TypographySemantic = Extract<
  keyof JSX.IntrinsicElements,
  'address' | 'dd' | 'h1' | 'h2' | 'h3' | 'p' | 'pre' | 'span'
>;

type TypographyVariants =
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small';

export const Typography = <T extends ElementType = TypographySemantic>({
  children,
  className,
  maxLines,
  semantic,
  variants = 'body-large',
  ...props
}: TypographyPropsWithIntrinsic<T>) => {
  const Component = (semantic || 'span') as unknown as T;

  return (
    <Component
      {...(props as any)}
      className={clsx(
        styles.typography,
        styles[variants],
        maxLines && styles[`line-${maxLines}`],
        className,
      )}
    >
      {children}
    </Component>
  );
};

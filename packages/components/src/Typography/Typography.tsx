import type {
  ComponentProps,
  ElementType,
  JSX,
  PropsWithChildren,
} from 'react';

import { cn } from '@devlog/utils';
import { cva } from 'class-variance-authority';

const typographyVariants = cva('break-all whitespace-pre-wrap', {
  defaultVariants: { variants: 'body-large' },
  variants: {
    variants: {
      'body-large': 'text-body-large',
      'body-medium': 'text-body-medium',
      'body-small': 'text-body-small',
      'display-large': 'text-display-large',
      'display-medium': 'text-display-medium',
      'display-small': 'text-display-small',
      'heading-large': 'text-heading-large',
      'heading-medium': 'text-heading-medium',
      'heading-small': 'text-heading-small',
      'label-large': 'text-label-large',
      'label-medium': 'text-label-medium',
      'label-small': 'text-label-small',
      'title-large': 'text-title-large',
      'title-medium': 'text-title-medium',
      'title-small': 'text-title-small',
    },
  },
});

interface TypographyProps<
  T extends ElementType = TypographySemantic,
> extends PropsWithChildren {
  className?: string;
  maxLines?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  semantic?: T;
  variants?: TypographyVariants;
}

type TypographyPropsWithIntrinsic<
  T extends ElementType = TypographySemantic,
> = Omit<ComponentProps<T>, keyof TypographyProps<T>> &
  TypographyProps<T>;

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
  | 'heading-large'
  | 'heading-medium'
  | 'heading-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small';

export const Typography = <
  T extends ElementType = TypographySemantic,
>({
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
      className={cn(
        typographyVariants({ variants }),
        maxLines && `line-clamp-${maxLines}`,
        className,
      )}
    >
      {children}
    </Component>
  );
};

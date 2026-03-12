'use client';

import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@devlog/utils';
import { cva } from 'class-variance-authority';
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

/* ------------------------------------------------------------------ */
/*  CVA Definitions                                                    */
/* ------------------------------------------------------------------ */

const tabsContainerVariants = cva('relative', {
  defaultVariants: { orientation: 'horizontal' },
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'flex flex-row h-full',
    },
  },
});

const tabListVariants = cva('relative flex', {
  defaultVariants: {
    centered: false,
    orientation: 'horizontal',
    scrollable: false,
  },
  variants: {
    centered: {
      false: '',
      true: 'justify-center',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    scrollable: {
      false: '',
      true: 'overflow-hidden',
    },
  },
});

const tabListInnerVariants = cva('flex', {
  defaultVariants: {
    orientation: 'horizontal',
    scrollable: false,
  },
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    scrollable: {
      false: '',
      true: 'overflow-x-auto scrollbar-none',
    },
  },
});

const tabVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'cursor-pointer select-none whitespace-nowrap',
    'px-4 py-3 text-sm font-medium',
    'border-0 bg-transparent',
    'transition-colors duration-200',
    'text-white',
    'min-w-[90px] min-h-[48px]',
    'hover:not-disabled:bg-white/5',
  ],
  {
    defaultVariants: {
      disabled: false,
      fullWidth: false,
      selected: false,
    },
    variants: {
      disabled: {
        false: '',
        true: 'cursor-not-allowed text-gray-300',
      },
      fullWidth: {
        false: '',
        true: 'flex-1',
      },
      iconPosition: {
        bottom: 'flex-col-reverse gap-1',
        end: 'flex-row-reverse gap-2',
        start: 'flex-row gap-2',
        top: 'flex-col gap-1',
      },
      selected: {
        false: '',
        true: 'text-indigo-500',
      },
    },
  },
);

const indicatorVariants = cva('absolute bg-indigo-500', {
  defaultVariants: { orientation: 'horizontal' },
  variants: {
    orientation: {
      horizontal: 'bottom-0 left-0 h-[2px]',
      vertical: 'top-0 right-0 w-[2px]',
    },
  },
});

const scrollButtonClass = cn(
  'flex items-center justify-center',
  'cursor-pointer border-0 bg-transparent shrink-0',
  'text-gray-500 w-[40px] min-h-[48px]',
  'hover:bg-white/5',
  'disabled:cursor-not-allowed disabled:text-gray-300',
);

/* ------------------------------------------------------------------ */
/*  Tab                                                                */
/* ------------------------------------------------------------------ */

interface TabProps extends Omit<ComponentProps<'button'>, 'value'> {
  disabled?: boolean;
  /** @internal injected by Tabs */
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'bottom' | 'end' | 'start' | 'top';
  /** @internal injected by Tabs */
  selected?: boolean;
  /** @internal injected by Tabs */
  textColor?: string;
  value: string;
}

interface TabsProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  centered?: boolean;
  children: ReactNode;
  indicatorColor?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  textColor?: string;
  value: string;
  variant?: 'fullWidth' | 'scrollable' | 'standard';
}

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

export function Tab({
  children,
  className,
  disabled = false,
  fullWidth,
  icon,
  iconPosition = 'top',
  selected = false,
  style,
  textColor,
  value,
  ...props
}: TabProps) {
  return (
    <button
      aria-selected={selected}
      className={cn(
        tabVariants({
          disabled,
          fullWidth: fullWidth ?? false,
          iconPosition: icon ? iconPosition : undefined,
          selected,
        }),
        className,
      )}
      data-value={value}
      disabled={disabled}
      role='tab'
      style={{
        ...(selected && textColor ? { color: textColor } : {}),
        ...style,
      }}
      tabIndex={selected ? 0 : -1}
      type='button'
      {...props}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
}

export function Tabs({
  centered = false,
  children,
  className,
  indicatorColor,
  onChange,
  orientation = 'horizontal',
  textColor,
  value,
  variant = 'standard',
  ...props
}: TabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ offset: 0, size: 0 });

  const isHorizontal = orientation === 'horizontal';
  const isScrollable = variant === 'scrollable';

  /* ---- indicator position ---- */
  const updateIndicator = useCallback(() => {
    const activeEl = tabRefs.current.get(value);
    if (!activeEl || !tabListRef.current) return;

    if (isHorizontal) {
      setIndicator({
        offset: activeEl.offsetLeft,
        size: activeEl.offsetWidth,
      });
    } else {
      setIndicator({
        offset: activeEl.offsetTop,
        size: activeEl.offsetHeight,
      });
    }
  }, [value, isHorizontal]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const container = tabListRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(container);
    return () => ro.disconnect();
  }, [updateIndicator]);

  /* ---- scrollable: auto-scroll to active tab ---- */
  useEffect(() => {
    if (!isScrollable || !isHorizontal) return;
    const activeEl = tabRefs.current.get(value);
    const container = tabListRef.current;
    if (!activeEl || !container) return;

    const left =
      activeEl.offsetLeft -
      container.offsetWidth / 2 +
      activeEl.offsetWidth / 2;
    container.scrollTo({ behavior: 'smooth', left });
  }, [value, isScrollable, isHorizontal]);

  /* ---- scroll buttons ---- */
  const scroll = (direction: -1 | 1) => {
    const container = tabListRef.current;
    if (!container) return;
    container.scrollBy({
      behavior: 'smooth',
      left: direction * container.offsetWidth * 0.8,
    });
  };

  /* ---- keyboard navigation ---- */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabs = Array.from(tabRefs.current.entries());
    const currentIndex = tabs.findIndex(([v]) => v === value);
    if (currentIndex === -1) return;

    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    let nextIndex = -1;

    if (e.key === nextKey) {
      for (let i = 1; i <= tabs.length; i++) {
        const idx = (currentIndex + i) % tabs.length;
        const el = tabs[idx]![1];
        if (!el.disabled) {
          nextIndex = idx;
          break;
        }
      }
    } else if (e.key === prevKey) {
      for (let i = 1; i <= tabs.length; i++) {
        const idx = (currentIndex - i + tabs.length) % tabs.length;
        const el = tabs[idx]![1];
        if (!el.disabled) {
          nextIndex = idx;
          break;
        }
      }
    } else if (e.key === 'Home') {
      nextIndex = tabs.findIndex(([, el]) => !el.disabled);
    } else if (e.key === 'End') {
      for (let i = tabs.length - 1; i >= 0; i--) {
        if (!tabs[i]![1].disabled) {
          nextIndex = i;
          break;
        }
      }
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      const [nextValue, nextEl] = tabs[nextIndex]!;
      nextEl.focus();
      onChange?.(nextValue);
    }
  };

  /* ---- clone children ---- */
  const tabElements = Children.map(children, (child) => {
    if (!isValidElement<TabProps>(child)) return child;

    const childValue = child.props.value;
    const isSelected = childValue === value;

    return cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onClick?.(e);
        if (!child.props.disabled) {
          onChange?.(childValue);
        }
      },
      ref: (el: HTMLButtonElement | null) => {
        if (el) {
          tabRefs.current.set(childValue, el);
        } else {
          tabRefs.current.delete(childValue);
        }
      },
      selected: isSelected,
      textColor,
    });
  });

  /* ---- indicator style ---- */
  const indicatorTransition =
    'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  const indicatorStyle: React.CSSProperties = isHorizontal
    ? {
        transform: `translateX(${indicator.offset}px)`,
        transition: indicatorTransition,
        width: indicator.size,
        ...(indicatorColor ? { backgroundColor: indicatorColor } : {}),
      }
    : {
        height: indicator.size,
        transform: `translateY(${indicator.offset}px)`,
        transition: indicatorTransition,
        ...(indicatorColor ? { backgroundColor: indicatorColor } : {}),
      };

  return (
    <div
      className={cn(
        tabsContainerVariants({ orientation }),
        className,
      )}
      {...props}
    >
      {isScrollable && isHorizontal && (
        <button
          aria-label='Scroll left'
          className={scrollButtonClass}
          onClick={() => scroll(-1)}
          tabIndex={-1}
          type='button'
        >
          <svg
            fill='currentColor'
            height='20'
            viewBox='0 0 24 24'
            width='20'
          >
            <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
          </svg>
        </button>
      )}

      <div
        aria-orientation={orientation}
        className={tabListVariants({
          centered: centered && variant === 'standard',
          orientation,
          scrollable: isScrollable,
        })}
        role='tablist'
      >
        <div
          className={tabListInnerVariants({
            orientation,
            scrollable: isScrollable,
          })}
          onKeyDown={handleKeyDown}
          ref={tabListRef}
        >
          {tabElements}
          <span
            className={indicatorVariants({ orientation })}
            style={indicatorStyle}
          />
        </div>
      </div>

      {isScrollable && isHorizontal && (
        <button
          aria-label='Scroll right'
          className={scrollButtonClass}
          onClick={() => scroll(1)}
          tabIndex={-1}
          type='button'
        >
          <svg
            fill='currentColor'
            height='20'
            viewBox='0 0 24 24'
            width='20'
          >
            <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
          </svg>
        </button>
      )}
    </div>
  );
}

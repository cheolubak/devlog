'use client';

import type { ComponentProps, ReactNode } from 'react';

import clsx from 'clsx';
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

import styles from './Tabs.module.css';

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

const iconPositionClass = {
  bottom: styles.iconBottom,
  end: styles.iconEnd,
  start: styles.iconStart,
  top: styles.iconTop,
} as const;

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
      className={clsx(
        styles.tab,
        selected && styles.selected,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        icon && iconPositionClass[iconPosition],
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
  const indicatorStyle: React.CSSProperties = isHorizontal
    ? {
        transform: `translateX(${indicator.offset}px)`,
        width: indicator.size,
        ...(indicatorColor ? { backgroundColor: indicatorColor } : {}),
      }
    : {
        height: indicator.size,
        transform: `translateY(${indicator.offset}px)`,
        ...(indicatorColor ? { backgroundColor: indicatorColor } : {}),
      };

  return (
    <div
      className={clsx(
        styles.tabs,
        isHorizontal ? styles.horizontal : styles.vertical,
        className,
      )}
      {...props}
    >
      {isScrollable && isHorizontal && (
        <button
          aria-label='Scroll left'
          className={styles.scrollButton}
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
        className={clsx(
          styles.tabList,
          isHorizontal ? styles.horizontal : styles.vertical,
          centered && variant === 'standard' && styles.centered,
          isScrollable && styles.scrollable,
        )}
        role='tablist'
      >
        <div
          className={clsx(
            styles.tabListInner,
            isHorizontal ? styles.horizontal : styles.vertical,
            isScrollable && styles.scrollable,
          )}
          onKeyDown={handleKeyDown}
          ref={tabListRef}
        >
          {tabElements}
          <span
            className={clsx(
              styles.indicator,
              isHorizontal ? styles.horizontal : styles.vertical,
            )}
            style={indicatorStyle}
          />
        </div>
      </div>

      {isScrollable && isHorizontal && (
        <button
          aria-label='Scroll right'
          className={styles.scrollButton}
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

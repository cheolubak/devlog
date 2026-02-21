'use client';

import type { ReactNode } from 'react';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Modal } from '../Modal/Modal';

interface GlobalModalContextValue {
  close: () => void;
  open: (content: ReactNode) => void;
}

const GlobalModalContext = createContext<GlobalModalContextValue | null>(
  null,
);

interface GlobalModalProviderProps {
  children: ReactNode;
}

export const GlobalModalProvider = ({
  children,
}: GlobalModalProviderProps) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.id = 'global-modal-root';
    document.body.appendChild(el);
    portalRef.current = el;

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  const open = useCallback((content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setModalContent(null);
    setIsOpen(false);
  }, []);

  return (
    <GlobalModalContext.Provider value={{ close, open }}>
      {children}
      {isOpen &&
        portalRef.current &&
        createPortal(
          <Modal onClose={close}>{modalContent}</Modal>,
          portalRef.current,
        )}
    </GlobalModalContext.Provider>
  );
};

export const useGlobalModal = (): GlobalModalContextValue => {
  const context = useContext(GlobalModalContext);

  if (!context) {
    throw new Error(
      'useGlobalModal must be used within a GlobalModalProvider',
    );
  }

  return context;
};

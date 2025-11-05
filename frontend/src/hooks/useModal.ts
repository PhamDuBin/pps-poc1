import { useState, useEffect, useCallback, useRef } from 'react';

interface UseModalOptions {
  onClose?: () => void;
  autoFocus?: boolean;
  closeOnEscape?: boolean;
}

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  firstElementRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Custom hook for managing modal state and behavior
 * Handles keyboard events, focus management, and cleanup
 */
export function useModal(options: UseModalOptions = {}): UseModalReturn {
  const {
    onClose,
    autoFocus = true,
    closeOnEscape = true,
  } = options;

  const [isOpen, setIsOpen] = useState(false);
  const firstElementRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Auto-focus first element when modal opens
  useEffect(() => {
    if (isOpen && autoFocus && firstElementRef.current) {
      // Small delay to ensure modal is rendered
      const timer = setTimeout(() => {
        firstElementRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoFocus]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close, closeOnEscape]);

  return {
    isOpen,
    open,
    close,
    toggle,
    firstElementRef,
  };
}

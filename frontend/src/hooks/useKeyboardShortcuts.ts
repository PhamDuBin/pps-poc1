import { useEffect, useCallback } from 'react';

type ShortcutHandler = () => void;

interface KeyboardShortcut {
  key: string;
  handler: ShortcutHandler;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

interface UseKeyboardShortcutsOptions {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

/**
 * Custom hook for managing keyboard shortcuts
 * Consolidates duplicate event listener logic across components
 */
export function useKeyboardShortcuts(
  options: UseKeyboardShortcutsOptions
): void {
  const { shortcuts, enabled = true } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      for (const shortcut of shortcuts) {
        const {
          key,
          handler,
          ctrlKey = false,
          metaKey = false,
          altKey = false,
          shiftKey = false,
        } = shortcut;

        const keyMatches = event.key.toLowerCase() === key.toLowerCase();
        const ctrlMatches = ctrlKey === event.ctrlKey;
        const metaMatches = metaKey === event.metaKey;
        const altMatches = altKey === event.altKey;
        const shiftMatches = shiftKey === event.shiftKey;

        if (keyMatches && ctrlMatches && metaMatches && altMatches && shiftMatches) {
          event.preventDefault();
          handler();
          break;
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}

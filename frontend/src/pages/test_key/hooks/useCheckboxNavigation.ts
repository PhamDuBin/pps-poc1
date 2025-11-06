/**
 * Hook for handling checkbox group keyboard navigation
 */

interface CheckboxNavigationOptions {
  checkboxes: HTMLInputElement[];
  onShiftTabBack?: () => void;
  onTabForward?: () => void;
}

export const useCheckboxNavigation = (options: CheckboxNavigationOptions) => {
  const { checkboxes, onShiftTabBack, onTabForward } = options;

  const setupCheckboxListeners = () => {
    const listeners: Array<{
      element: HTMLInputElement;
      event: string;
      handler: EventListenerOrEventListenerObject;
    }> = [];

    checkboxes.forEach((checkbox, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle ESC key to uncheck checkbox
        if (kbEvent.key === "Escape") {
          kbEvent.preventDefault();
          checkbox.checked = false;
          return;
        }

        // Handle Shift+Tab to ALWAYS go back to input before checkboxes
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          onShiftTabBack?.();
          return;
        }

        // Navigate within checkboxes using arrow keys
        const keyMap: { [key: string]: number } = {
          ArrowRight: 1,
          ArrowDown: 1,
          ArrowLeft: -1,
          ArrowUp: -1,
        };

        if (keyMap[kbEvent.key]) {
          kbEvent.preventDefault();
          const nextIndex = index + keyMap[kbEvent.key];
          if (nextIndex >= 0 && nextIndex < checkboxes.length) {
            checkboxes[nextIndex].focus();
          }
        } else if (kbEvent.key === "Enter" || kbEvent.key === "Tab") {
          kbEvent.preventDefault();
          onTabForward?.();
        } else if (kbEvent.key.toLowerCase() === "c") {
          kbEvent.preventDefault();
          checkbox.checked = !checkbox.checked;
        }
      };

      checkbox.addEventListener("keydown", handler);
      listeners.push({ element: checkbox, event: "keydown", handler });
    });

    return listeners;
  };

  return { setupCheckboxListeners };
};

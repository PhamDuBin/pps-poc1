/**
 * Hook for handling radio group keyboard navigation
 */

interface RadioNavigationOptions {
  radios: HTMLInputElement[];
  onShiftTabBack?: () => void;
  onTabForward?: () => void;
}

export const useRadioNavigation = (options: RadioNavigationOptions) => {
  const { radios, onShiftTabBack, onTabForward } = options;

  const setupRadioListeners = () => {
    const listeners: Array<{
      element: HTMLInputElement;
      event: string;
      handler: EventListenerOrEventListenerObject;
    }> = [];

    radios.forEach((radio, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          onShiftTabBack?.();
          return;
        }

        // Handle arrow keys for navigation and selection
        if (["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          let nextIndex = index;

          if (kbEvent.key === "ArrowDown" || kbEvent.key === "ArrowRight") {
            nextIndex = (index + 1) % radios.length;
          } else if (kbEvent.key === "ArrowUp" || kbEvent.key === "ArrowLeft") {
            nextIndex = (index - 1 + radios.length) % radios.length;
          }

          const nextRadio = radios[nextIndex];
          if (nextRadio) {
            nextRadio.focus();
            nextRadio.click();
            nextRadio.checked = true;
            const event = new Event("change", { bubbles: true });
            nextRadio.dispatchEvent(event);
          }
          return;
        }

        // Handle Tab/Enter to move forward
        if (kbEvent.key === "Tab" || kbEvent.key === "Enter") {
          kbEvent.preventDefault();
          onTabForward?.();
        }
      };

      radio.addEventListener("keydown", handler);
      listeners.push({ element: radio, event: "keydown", handler });
    });

    return listeners;
  };

  return { setupRadioListeners };
};

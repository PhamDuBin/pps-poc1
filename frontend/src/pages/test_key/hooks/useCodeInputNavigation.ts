/**
 * Hook for handling code input keyboard navigation
 */

interface CodeInputNavigationOptions {
  codeInputs: HTMLInputElement[];
  form: HTMLElement;
}

export const useCodeInputNavigation = (options: CodeInputNavigationOptions) => {
  const { codeInputs, form } = options;

  const setupCodeInputListeners = () => {
    const listeners: Array<{
      element: HTMLInputElement;
      event: string;
      handler: EventListenerOrEventListenerObject;
    }> = [];

    codeInputs.forEach((input, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to previous code input or text5
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          if (index > 0) {
            codeInputs[index - 1].focus();
          } else {
            const text5Input = form.querySelector<HTMLInputElement>('[data-group="text5"]');
            text5Input?.focus();
          }
          return;
        }

        // Handle Tab/Enter to go forward
        if (kbEvent.key === "Enter" || kbEvent.key === "Tab") {
          kbEvent.preventDefault();
          const nextCodeInput = codeInputs[index + 1];
          if (nextCodeInput) {
            nextCodeInput.focus();
          } else {
            const text6Input = form.querySelector<HTMLInputElement>('[data-group="text6"]');
            text6Input?.focus();
          }
        }
      };

      input.addEventListener("keydown", handler);
      listeners.push({ element: input, event: "keydown", handler });
    });

    return listeners;
  };

  return { setupCodeInputListeners };
};

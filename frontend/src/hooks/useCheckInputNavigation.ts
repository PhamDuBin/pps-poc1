import { useEffect } from "react";
import {
  handleNavigationKey,
  handleInputToRadio,
  handleRadioNavigation,
} from "../utils/InputHandlers";

interface Listener {
  element: EventTarget;
  event: string;
  handler: EventListenerOrEventListenerObject;
}

export const useKeyboardNavigation = (
  formRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!(formRef.current instanceof HTMLElement)) return;

    const form = formRef.current;
    const navigableInputs = Array.from(
      form.querySelectorAll<HTMLElement>(".input-navigable")
    );
    // *** MODIFIED START: Updated query selector ***
    const mainRadios = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        ".radio-group input[type='radio']"
      )
    );
    // *** MODIFIED END ***
    const inputToMainRadio =
      form.querySelector<HTMLInputElement>(".input-to-radio");
    const checkboxes = Array.from(
      form.querySelectorAll<HTMLInputElement>(".checkbox-group-item")
    );
    // *** MODIFIED START: Updated query selector ***
    const radioGroup2 = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        ".radio2-group input[type='radio']"
      )
    );
    // *** MODIFIED END ***
    const text3Input = form.querySelector<HTMLInputElement>(".text3-input");
    // *** MODIFIED START: Updated query selector ***
    const radioGroup1 = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        ".radio1-group input[type='radio']"
      )
    );
    // *** MODIFIED END ***
    const inputToCheckbox =
      form.querySelector<HTMLInputElement>(".input-to-checkbox");
    const codeInputs = Array.from(
      form.querySelectorAll<HTMLInputElement>(".code-input")
    );
    const afterRadioInput =
      form.querySelector<HTMLInputElement>(".after-radio");
    const afterRadio1Input =
      form.querySelector<HTMLInputElement>(".after-radio1");
    const textareaAfterRadio2 = form.querySelector<HTMLTextAreaElement>(
      ".textarea-after-radio2"
    );

    const listeners: Listener[] = [];
    const addListener = (
      element: EventTarget,
      event: string,
      handler: EventListenerOrEventListenerObject
    ) => {
      element.addEventListener(event, handler);
      listeners.push({ element, event, handler });
    };

    /**
     * Navigates to a radio group, focusing the currently checked item.
     * If no item is checked, focuses the first item.
     * @param radios - Array of radio input elements.
     * @param clickIfNoneSelected - If true, clicks the first item if none are selected (for forward nav).
     */
    const navigateToRadioGroup = (
      radios: HTMLInputElement[],
      clickIfNoneSelected: boolean = false
    ) => {
      if (!radios || radios.length === 0) return;

      // This line will now work correctly as 'radios' is an array of actual inputs
      const selectedRadio = radios.find((radio) => radio.checked);

      if (selectedRadio) {
        selectedRadio.focus();
      } else {
        // Fallback to the first radio
        radios[0].focus();
        if (clickIfNoneSelected) {
          // This ensures the value is set when tabbing in for the first time
          radios[0].click();
        }
      }
    };

    navigableInputs.forEach((input, index) => {
      addListener(input, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        const target = kbEvent.target as HTMLInputElement | HTMLTextAreaElement;

        // Handle ESC key to clear input/textarea value
        if (kbEvent.key === "Escape") {
          kbEvent.preventDefault();
          if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
            target.value = "";
          }
          return;
        }

        // For TEXTAREA, only handle ESC, not navigation keys
        if (input.tagName === "TEXTAREA") {
          return;
        }

        // Skip handleNavigationKey for special inputs that have custom navigation logic
        const hasCustomForwardNav =
          input.classList.contains("input-to-radio") ||
          input.classList.contains("input-to-checkbox") ||
          input.classList.contains("text3-input") ||
          (input.hasAttribute("data-group") &&
            input.getAttribute("data-group") === "text5");

        const hasCustomBackNav =
          input.classList.contains("after-radio") ||
          input.classList.contains("after-radio1") ||
          input.classList.contains("textarea-after-radio2") ||
          input.classList.contains("input-to-radio") ||
          input.classList.contains("input-to-checkbox") ||
          input.classList.contains("text3-input") ||
          (input.hasAttribute("data-group") &&
            input.getAttribute("data-group") === "text5");

        // Skip forward navigation for inputs that jump to radio/checkbox groups
        if (
          hasCustomForwardNav &&
          ["Tab", "Enter", "ArrowDown"].includes(kbEvent.key)
        ) {
          // Let the custom handler deal with this
          return;
        }

        // Skip backward navigation for inputs with custom Shift+Tab logic
        if (hasCustomBackNav && kbEvent.key === "Tab" && kbEvent.shiftKey) {
          // Let the custom handler deal with this
          return;
        }

        handleNavigationKey(kbEvent, index, navigableInputs);
      });
    });

    // Remove digit input auto-advance since customer code now allows 4 digits

    if (inputToMainRadio) {
      addListener(inputToMainRadio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to last enabled customer code input
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          // Find all customer code inputs
          const customerCodeInputs = Array.from(
            form.querySelectorAll<HTMLInputElement>(".input-customer-digit")
          );
          // Find the last enabled input (not disabled)
          let targetInput = customerCodeInputs[0]; // Default to first
          for (let i = customerCodeInputs.length - 1; i >= 0; i--) {
            if (!customerCodeInputs[i].disabled) {
              targetInput = customerCodeInputs[i];
              break;
            }
          }
          if (targetInput) {
            targetInput.focus();
          }
          return;
        }

        // Handle forward navigation (Tab, Enter, ArrowDown)
        if (["Tab", "Enter", "ArrowDown"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          // Find selected radio or default to first, then click
          navigateToRadioGroup(mainRadios, true);
        }
      });
    }

    mainRadios.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        kbEvent.stopPropagation(); // Stop NextUI's built-in handler

        // Handle Shift+Tab and ArrowUp to go back to previous
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          const prevInput =
            form.querySelector<HTMLInputElement>(".input-to-radio");
          if (prevInput) {
            prevInput.focus();
          }
          return;
        }

        // Arrow Left/Right: navigate within group
        if (["ArrowRight", "ArrowLeft"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          let nextIndex = index;

          if (kbEvent.key === "ArrowRight") {
            nextIndex = (index + 1) % mainRadios.length;
          } else if (kbEvent.key === "ArrowLeft") {
            nextIndex = (index - 1 + mainRadios.length) % mainRadios.length;
          }

          const nextRadio = mainRadios[nextIndex];
          if (nextRadio) {
            nextRadio.focus();
            nextRadio.click();
            // Ensure the radio is actually checked
            nextRadio.checked = true;
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            nextRadio.dispatchEvent(event);
          }
          return;
        }

        // Handle Tab, Enter, and ArrowDown (Move to next element)
        if (
          kbEvent.key === "ArrowDown" ||
          kbEvent.key === "Tab" ||
          kbEvent.key === "Enter"
        ) {
          kbEvent.preventDefault();
          // Explicitly go to next element (after-radio)
          const nextInput =
            form.querySelector<HTMLInputElement>(".after-radio");
          if (nextInput) {
            nextInput.focus();
          }
          return;
        }
      });
    });

    radioGroup1.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        kbEvent.stopPropagation(); // Stop NextUI's built-in handler

        // Handle Shift+Tab and ArrowUp to go back to previous
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          text3Input?.focus();
          return;
        }

        // Handle Arrow Left/Right (Intra-group navigation)
        if (["ArrowRight", "ArrowLeft"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          let nextIndex = index;

          if (kbEvent.key === "ArrowRight") {
            nextIndex = (index + 1) % radioGroup1.length;
          } else if (kbEvent.key === "ArrowLeft") {
            nextIndex = (index - 1 + radioGroup1.length) % radioGroup1.length;
          }

          const nextRadio = radioGroup1[nextIndex];
          if (nextRadio) {
            nextRadio.focus();
            nextRadio.click();
            // Ensure the radio is actually checked
            nextRadio.checked = true;
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            nextRadio.dispatchEvent(event);
          }
          return;
        }

        // Handle Tab, Enter, and ArrowDown (Move to next element)
        if (
          kbEvent.key === "ArrowDown" ||
          kbEvent.key === "Tab" ||
          kbEvent.key === "Enter"
        ) {
          kbEvent.preventDefault();
          // Explicitly go to next element (after-radio1)
          const nextInput =
            form.querySelector<HTMLInputElement>(".after-radio1");
          if (nextInput) {
            nextInput.focus();
          }
          return;
        }
      });
    });

    radioGroup2.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        kbEvent.stopPropagation(); // Stop NextUI's built-in handler

        // Handle Shift+Tab and ArrowUp to go back to previous
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          const lastCheckbox = checkboxes[checkboxes.length - 1];
          if (lastCheckbox) {
            lastCheckbox.focus();
          }
          return;
        }

        // Handle Arrow Left/Right (Intra-group navigation)
        if (["ArrowRight", "ArrowLeft"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          let nextIndex = index;

          if (kbEvent.key === "ArrowRight") {
            nextIndex = (index + 1) % radioGroup2.length;
          } else if (kbEvent.key === "ArrowLeft") {
            nextIndex = (index - 1 + radioGroup2.length) % radioGroup2.length;
          }

          const nextRadio = radioGroup2[nextIndex];
          if (nextRadio) {
            nextRadio.focus();
            nextRadio.click();
            // Ensure the radio is actually checked
            nextRadio.checked = true;
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            nextRadio.dispatchEvent(event);
          }
          return;
        }

        // Handle Tab, Enter, and ArrowDown (Move to next element)
        if (
          kbEvent.key === "ArrowDown" ||
          kbEvent.key === "Tab" ||
          kbEvent.key === "Enter"
        ) {
          kbEvent.preventDefault();
          // Explicitly go to next element (textarea-after-radio2)
          const nextInput = form.querySelector<HTMLTextAreaElement>(
            ".textarea-after-radio2"
          );
          if (nextInput) {
            nextInput.focus();
          }
          return;
        }
      });
    });

    // Checkboxes navigation (Adding stopPropagation for consistency)
    checkboxes.forEach((checkbox, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        kbEvent.stopPropagation(); // Stop any potential built-in checkbox group handlers

        // Handle ESC key to uncheck checkbox
        if (kbEvent.key === "Escape") {
          kbEvent.preventDefault();
          checkbox.checked = false;
          return;
        }

        // Handle Shift+Tab and ArrowUp to ALWAYS go back to TEXT6 (input-to-checkbox)
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          // Always go back to the input before checkboxes
          if (inputToCheckbox) {
            inputToCheckbox.focus();
          }
          return;
        }

        // Handle Arrow Left/Right (Intra-group navigation)
        const keyMapLR: { [key: string]: number } = {
          ArrowRight: 1,
          ArrowLeft: -1,
        };
        if (keyMapLR[kbEvent.key]) {
          kbEvent.preventDefault();
          const nextIndex = index + keyMapLR[kbEvent.key];
          if (nextIndex >= 0 && nextIndex < checkboxes.length)
            checkboxes[nextIndex].focus();
          return; // Prevent falling through
        }

        // Handle Tab, Enter, and ArrowDown (Move to next group)
        if (
          kbEvent.key === "Enter" ||
          kbEvent.key === "Tab" ||
          kbEvent.key === "ArrowDown"
        ) {
          kbEvent.preventDefault();
          // Move forward to first radio in group 2
          navigateToRadioGroup(radioGroup2, true);
          return; // Prevent falling through
        }

        // Handle 'c' key to check/uncheck
        if (kbEvent.key.toLowerCase() === "c") {
          kbEvent.preventDefault();
          checkbox.checked = !checkbox.checked;
        }
      };
      addListener(checkbox, "keydown", handler);
    });

    if (text3Input && radioGroup1.length > 0) {
      addListener(text3Input, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back using normal navigation
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          // Let handleNavigationKey handle this - find text3 in navigableInputs
          const text3Index = navigableInputs.indexOf(text3Input);
          if (text3Index > 0) {
            kbEvent.preventDefault();
            navigableInputs[text3Index - 1].focus();
          }
          return;
        }

        if (["Tab", "Enter", "ArrowDown"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          navigateToRadioGroup(radioGroup1, true);
        }
      });
    }

    if (inputToCheckbox && checkboxes.length > 0) {
      addListener(inputToCheckbox, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to CODE2
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          const lastCodeInput = codeInputs[codeInputs.length - 1];
          if (lastCodeInput) {
            lastCodeInput.focus();
          }
          return;
        }

        if (["Tab", "Enter", "ArrowDown"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          checkboxes[0]?.focus();
        }
      });
    }

    codeInputs.forEach((input, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to previous code input or text5
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          if (index > 0) {
            // Go to previous code input
            codeInputs[index - 1].focus();
          } else {
            // First code input: go back to text5 input
            const text5Input = form.querySelector<HTMLInputElement>(
              '[data-group="text5"]'
            );
            if (text5Input) {
              text5Input.focus();
            }
          }
          return;
        }

        // Handle Tab/Enter to go forward
        if (kbEvent.key === "Enter" || kbEvent.key === "Tab") {
          kbEvent.preventDefault();
          const nextCodeInput = codeInputs[index + 1];
          if (nextCodeInput) {
            // Go to next code input
            nextCodeInput.focus();
          } else {
            // Last code input: go to text6
            const text6Input = form.querySelector<HTMLInputElement>(
              '[data-group="text6"]'
            );
            if (text6Input) {
              text6Input.focus();
            }
          }
        }
      };
      addListener(input, "keydown", handler);
    });

    if (afterRadioInput && mainRadios.length > 0) {
      addListener(afterRadioInput, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        // Handle Shift+Tab and ArrowUp to go back to radio group
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          // Find selected radio or default to first (don't click)
          navigateToRadioGroup(mainRadios, false);
        }
      });
    }

    if (afterRadio1Input && radioGroup1.length > 0) {
      addListener(afterRadio1Input, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        // Handle Shift+Tab and ArrowUp to go back to radio group
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          // Find selected radio or default to first (don't click)
          navigateToRadioGroup(radioGroup1, false);
        }
      });
    }

    if (textareaAfterRadio2 && radioGroup2.length > 0) {
      addListener(textareaAfterRadio2, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        // Only handle Shift+Tab specially to go back to radio group
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          // Find selected radio or default to first (don't click)
          navigateToRadioGroup(radioGroup2, false);
        }
      });
    }

    return () => {
      listeners.forEach(({ element, event, handler }) =>
        element.removeEventListener(event, handler)
      );
    };
  }, [formRef]);
};

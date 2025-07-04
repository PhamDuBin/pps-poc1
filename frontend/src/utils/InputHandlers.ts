/**
 * @param e
 * @param index
 * @param inputs
 * @param radios
 */
export function handleDigitInput(
  e: Event,
  index: number,
  inputs: HTMLElement[]
): void {
  const target = e.target as HTMLInputElement;
  const value = target.value;

  // Only one numeric character is allowed
  if (!/^\d$/.test(value)) {
    target.value = "";
  } else if (index < inputs.length - 1) {
    // Auto focus
    inputs[index + 1].focus();
  }
}

export function handleNavigationKey(
  e: KeyboardEvent,
  index: number,
  inputs: HTMLElement[]
): void {
  const target = e.target as HTMLInputElement;

  switch (e.key) {
    case "ArrowDown":
    case "Tab":
    case "Enter":
      e.preventDefault();
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (index > 0) {
        inputs[index - 1].focus();
      }
      break;
    case "ArrowRight":
      // Only move focus if cursor is at end of text
      if (target.selectionEnd === target.value.length) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
      break;
    case "ArrowLeft":
      // Only move focus if cursor is at the beginning of text
      if (target.selectionStart === 0) {
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
      break;
    case "Escape":
      e.preventDefault();
      target.value = "";
      break;
    default:
      break;
  }
}

export function handleRadioNavigation(
  e: KeyboardEvent,
  index: number,
  radios: HTMLInputElement[]
): void {
  const focusAndClick = (i: number): void => {
    if (radios[i]) {
      radios[i].focus();
      radios[i].click();
    }
  };

  switch (e.key) {
    case "ArrowRight":
    case "ArrowDown":
      e.preventDefault();
      if (index < radios.length - 1) {
        focusAndClick(index + 1);
      }
      break;
    case "ArrowLeft":
    case "ArrowUp":
      e.preventDefault();
      if (index > 0) {
        focusAndClick(index - 1);
      }
      break;
    case "Tab":
    case "Enter":
      e.preventDefault();
      const currentRadio = radios[index];
      if (!currentRadio) return;
      const parentForm = currentRadio.closest("form") || document;

      // Find and focus on the next element based on the class of the radio container
      let nextElement: HTMLElement | null = null;
      if (currentRadio.closest(".radio2-group")) {
        nextElement = parentForm.querySelector<HTMLTextAreaElement>(
          ".textarea-after-radio2"
        );
      } else if (currentRadio.closest(".radio1-group")) {
        nextElement =
          parentForm.querySelector<HTMLInputElement>(".after-radio1");
      } else if (currentRadio.closest(".radio-group")) {
        nextElement =
          parentForm.querySelector<HTMLInputElement>(".after-radio");
      }

      nextElement?.focus();
      break;
  }
}

export const handleInputToRadio = (
  e: KeyboardEvent,
  radios: HTMLInputElement[]
): void => {
  const keys = ["Tab", "Enter", "ArrowDown", "ArrowRight"];
  if (keys.includes(e.key)) {
    e.preventDefault();
    const firstRadio = radios[0];
    if (firstRadio) {
      firstRadio.focus();
      firstRadio.click();
    }
  }
};

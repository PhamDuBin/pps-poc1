import { KeyboardEvent as ReactKeyboardEvent } from "react";

// Interface for code options
export interface CodeOption {
  code: string;
  label: string;
}

// Handling when changing values ​​in textbox(code) and pull-down
export const handleCodeKeyDown = (
  e: ReactKeyboardEvent<HTMLInputElement>,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  codeOptions: CodeOption[]
): void => {
  const idx = codeOptions.findIndex((o) => o.code === value);
  if (idx === -1) return;

  let newIndex = idx;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    newIndex = (idx + 1) % codeOptions.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    newIndex = (idx - 1 + codeOptions.length) % codeOptions.length;
  }

  if (newIndex !== idx) setValue(codeOptions[newIndex].code);
};

import React, { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";

const toHalfWidthKana = (str: string): string => {
  if (!str) {
    return "";
  }
  return str.normalize("NFKC").replace(/[^\uFF61-\uFF9F]/g, "");
};

interface KanaInputProps extends Omit<InputProps, "onChange" | "value"> {
  value?: string;
  onChange: (value: string) => void;
  clearOnEscape?: boolean;
}

const HalfWidthKanaInput = forwardRef<InputRef, KanaInputProps>(
  ({ value = "", onChange, clearOnEscape = true, onKeyDown, ...rest }, ref) => {
    const normalizedValue = toHalfWidthKana(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value ?? "";
      const halfWidthValue = toHalfWidthKana(String(rawValue));
      onChange(halfWidthValue);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const halfWidthValue = toHalfWidthKana(pastedText);
      onChange(halfWidthValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (clearOnEscape && e.key === "Escape") {
        e.preventDefault();
        onChange("");
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <Input
        ref={ref}
        value={normalizedValue}
        onChange={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    );
  }
);

export default HalfWidthKanaInput;

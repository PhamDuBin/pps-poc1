import React, { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";
import { convertToFullWidth } from "../utils/InputHandlers";

interface KanaInputProps extends Omit<InputProps, "onChange" | "value"> {
  value?: string;
  onChange: (value: string) => void;
  clearOnEscape?: boolean;
}

const KanaFullWidthInput = forwardRef<InputRef, KanaInputProps>(
  ({ value = "", onChange, clearOnEscape = true, onKeyDown, ...rest }, ref) => {
    const normalizedValue = convertToFullWidth(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value ?? "";
      const fullWidthValue = convertToFullWidth(String(rawValue));
      onChange(fullWidthValue);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const fullWidthValue = convertToFullWidth(pastedText);
      onChange(fullWidthValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (clearOnEscape && e.key === "Escape") {
        e.preventDefault();
        onChange("");
      }
      // Call original onKeyDown if provided
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

export default KanaFullWidthInput;

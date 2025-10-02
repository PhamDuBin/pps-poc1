import React, { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";
import { toHalfWidth } from "../utils/InputHandlers";

interface KanaInputProps extends Omit<InputProps, "onChange" | "value"> {
  value?: string;
  onChange: (value: string) => void;
}

const HalfWidthKanaInput = forwardRef<InputRef, KanaInputProps>(
  ({ value = "", onChange, ...rest }, ref) => {
    const normalizedValue = toHalfWidth(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value ?? "";
      const halfWidthValue = toHalfWidth(String(rawValue));
      onChange(halfWidthValue);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const halfWidthValue = toHalfWidth(pastedText);
      onChange(halfWidthValue);
    };

    return (
      <Input
        ref={ref}
        value={normalizedValue}
        onChange={handleInputChange}
        onPaste={handlePaste}
        {...rest}
      />
    );
  }
);

export default HalfWidthKanaInput;

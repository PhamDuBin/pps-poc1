import React, { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";

interface HalfWidthNumberInputProps
  extends Omit<InputProps, "onChange" | "value"> {
  value?: string;
  onChange: (value: string) => void;
}

const toHalfWidthNumber = (str: string): string => {
  return str
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, "");
};

const HalfWidthNumberInput = forwardRef<InputRef, HalfWidthNumberInputProps>(
  ({ value = "", onChange, ...rest }, ref) => {
    const normalizedValue = toHalfWidthNumber(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value ?? "";
      const halfWidthValue = toHalfWidthNumber(rawValue);
      onChange(halfWidthValue);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const halfWidthValue = toHalfWidthNumber(pastedText);
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

export default HalfWidthNumberInput;

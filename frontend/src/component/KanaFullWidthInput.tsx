import React, { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";
import { convertToFullWidth } from "../utils/InputHandlers";

interface KanaInputProps extends Omit<InputProps, "onChange" | "value"> {
  value?: string;
  onChange: (value: string) => void;
}

const KanaFullWidthInput = forwardRef<InputRef, KanaInputProps>(
  ({ value = "", onChange, ...rest }, ref) => {
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

export default KanaFullWidthInput;

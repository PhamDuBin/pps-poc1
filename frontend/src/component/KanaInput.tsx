import React, { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";
import { convertToFullWidth } from "../utils/InputHandlers";

interface KanaInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
}

const KanaInput = forwardRef<InputRef, KanaInputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const fullWidthValue = convertToFullWidth(rawValue);
      if (onChange) {
        onChange(fullWidthValue);
      }
    };

    return (
      <Input ref={ref} value={value} onChange={handleInputChange} {...rest} />
    );
  }
);

export default KanaInput;

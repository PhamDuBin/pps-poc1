import React, { useState, useRef, forwardRef } from "react";
import { Select } from "antd";
import type { BaseSelectRef } from "rc-select";
import type { InputRef } from "antd";
import HalfWidthNumberInput from "./HalfWidthNumberInput";

interface CodeOption {
  code: string;
  label: string;
}

interface CodeInputSelectProps {
  options: CodeOption[];
  value: string;
  onChange: (newValue: string) => void;
  resetValue?: string;
  disabled?: boolean;
  inputClassName?: string;
  selectClassName?: string;
}

const CodeInputSelect = forwardRef<InputRef, CodeInputSelectProps>(
  (
    {
      options,
      value,
      onChange,
      resetValue = "0",
      disabled,
      inputClassName,
      selectClassName,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<BaseSelectRef>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "F4":
          e.preventDefault();
          setIsOpen(true);
          selectRef.current?.focus();
          break;

        case "Escape":
          e.preventDefault();
          onChange(resetValue);
          break;

        default:
          break;
      }
    };

    const isValidValue = options.some((opt) => opt.code === value);
    const displayOptions = options.map((opt) => ({
      value: opt.code,
      label: opt.label,
    }));
    if (!isValidValue && value) {
      displayOptions.unshift({
        value: value,
        label: "Invalid",
      });
    }

    return (
      <div className="flex flex-row gap-1 items-center code-input-select w-full">
        <HalfWidthNumberInput
          ref={ref}
          value={value}
          onChange={(e) => onChange(e)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`w-[70px] text-center h-6 ${inputClassName || ""}`}
        />
        <Select
          ref={selectRef}
          value={value || undefined}
          onChange={(newValue) => onChange(newValue)}
          disabled={disabled}
          className={`ml-2 w-3/5 h-6 [&>.ant-select-selector]:!bg-[#ebcec0] ${
            selectClassName || ""
          }`}
          options={displayOptions}
          open={isOpen}
          onDropdownVisibleChange={(visible) => setIsOpen(visible)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.code === "Space") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      </div>
    );
  }
);

export default CodeInputSelect;

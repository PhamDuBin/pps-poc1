import React, { useState, useRef, forwardRef } from "react";
import { Select } from "antd";
import type { BaseSelectRef } from "rc-select";
import type { InputRef } from "antd";
import { HalfWidthNumberInput } from "./JapaneseInputs";

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
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  autoSelectOnFocus?: boolean;
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
      onArrowUp,
      onArrowDown,
      autoSelectOnFocus = true,
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
          setTimeout(() => {
            selectRef.current?.focus();
          }, 0);
          break;

        case "Escape":
          e.preventDefault();
          onChange(resetValue);
          break;

        case "ArrowUp":
          if (onArrowUp) {
            e.preventDefault();
            onArrowUp();
          }
          break;

        case "ArrowDown":
          if (onArrowDown) {
            e.preventDefault();
            onArrowDown();
          }
          break;

        default:
          break;
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (autoSelectOnFocus) {
        e.target.select();
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
      <div className="flex flex-row gap-1 items-center code-input-select">
        <HalfWidthNumberInput
          ref={ref}
          value={value}
          onChange={(e) => onChange(e)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          disabled={disabled}
          className={`w-[70px] text-center h-6 ${inputClassName || ""}`}
        />
        <Select
          ref={selectRef}
          value={value || undefined}
          onChange={(newValue) => onChange(newValue)}
          disabled={disabled}
          className={`ml-2 w-40 h-6 [&>.ant-select-selector]:!bg-input ${
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
            // Handle ArrowUp/ArrowDown only when dropdown is closed
            // When dropdown is open, allow normal navigation through options
            if (!isOpen) {
              if (e.key === "ArrowUp" && onArrowUp) {
                e.preventDefault();
                e.stopPropagation();
                onArrowUp();
              } else if (e.key === "ArrowDown" && onArrowDown) {
                e.preventDefault();
                e.stopPropagation();
                onArrowDown();
              }
            }
          }}
        />
      </div>
    );
  }
);

export default CodeInputSelect;

import React, { useState, useRef, useEffect, forwardRef } from "react";

type Option = {
  value: string;
  label: string;
};

type CustomCodeTextPairProps = {
  label: string;
  options: Option[];
  codeValue: string;
  onCodeChange: (value: string) => void;
  textValue: string;
  onTextChange: (value: string) => void;
  disabled?: boolean;
  resetValue?: string;
};

export const CustomCodeTextPair = forwardRef<
  HTMLInputElement,
  CustomCodeTextPairProps
>(
  (
    {
      label,
      options,
      codeValue,
      onCodeChange,
      textValue,
      onTextChange,
      disabled = false,
      resetValue = "0",
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (!open) return;

      const handleGlobalKey = (e: KeyboardEvent) => {
        if (["ArrowUp", "ArrowDown", "Enter", " "].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();

          if (e.key === "ArrowDown") {
            setHighlightIndex((prev) =>
              prev === null ? 0 : Math.min(prev + 1, options.length - 1)
            );
          } else if (e.key === "ArrowUp") {
            setHighlightIndex((prev) =>
              prev === null ? options.length - 1 : Math.max(prev - 1, 0)
            );
          } else if (e.key === "Enter" || e.key === " ") {
            if (highlightIndex !== null) {
              const selected = options[highlightIndex];
              onCodeChange(selected.value);
              onTextChange(selected.label);
              setOpen(false);
              textAreaRef.current?.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleGlobalKey, true);
      return () =>
        document.removeEventListener("keydown", handleGlobalKey, true);
    }, [open, highlightIndex, options, onCodeChange, onTextChange]);

    useEffect(() => {
      if (typeof ref === "function") ref(inputRef.current);
      else if (ref)
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          inputRef.current;
    }, [ref]);

    useEffect(() => {
      if (open && highlightIndex !== null) {
        const list = wrapperRef.current?.querySelectorAll("ul li");
        const active = list?.[highlightIndex] as HTMLElement | undefined;
        active?.scrollIntoView({ block: "nearest" });
      }
    }, [open, highlightIndex]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      switch (e.key) {
        case "ArrowDown":
          if (open) {
            e.preventDefault();
            e.stopPropagation();
            setHighlightIndex((prev) =>
              prev === null ? 0 : Math.min(prev + 1, options.length - 1)
            );
          }
          break;

        case "ArrowUp":
          if (open) {
            e.preventDefault();
            e.stopPropagation();
            setHighlightIndex((prev) =>
              prev === null ? options.length - 1 : Math.max(prev - 1, 0)
            );
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          e.stopPropagation();
          if (open) {
            if (highlightIndex !== null) {
              const selected = options[highlightIndex];
              onCodeChange(selected.value);
              onTextChange(selected.label);
              setOpen(false);
              textAreaRef.current?.focus();
            }
          } else {
            setOpen(true);
            const currentIndex = options.findIndex(
              (opt) => opt.value === codeValue
            );
            setHighlightIndex(currentIndex >= 0 ? currentIndex : 0);
          }
          break;

        case "F4":
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => {
            const next = !prev;
            if (next) {
              const currentIndex = options.findIndex(
                (opt) => opt.value === codeValue
              );
              setHighlightIndex(currentIndex >= 0 ? currentIndex : 0);
            } else {
              setHighlightIndex(null);
            }
            return next;
          });
          break;

        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          if (open) {
            setOpen(false);
          } else {
            onCodeChange(resetValue);
            onTextChange("");
          }
          break;

        default:
          break;
      }
    };
    const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!open) return;

      if (["ArrowUp", "ArrowDown", "Enter", "Escape", "Tab"].includes(e.key)) {
        e.stopPropagation();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCode = e.target.value;
      onCodeChange(newCode);
      const foundOption = options.find((opt) => opt.value === newCode);
      onTextChange(foundOption ? foundOption.label : "Invalid");
    };

    return (
      <div
        ref={wrapperRef}
        className={`w-full flex flex-row text-[12px] ${
          open ? "custom-dropdown-open" : ""
        }`}
        onKeyDown={handleDropdownKeyDown}
      >
        <span className="w-[10%] h-[80px] bg-label flex justify-center items-center text-center border border-black">
          {label}
        </span>

        <div className="relative w-1/12 h-[80px] flex flex-col border border-black border-l-0">
          <input
            ref={inputRef}
            type="text"
            value={codeValue}
            onChange={handleCodeChange}
            onKeyDown={handleCodeKeyDown}
            disabled={disabled}
            className="w-full h-1/2 text-center border-b border-black focus:outline-none"
          />
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setOpen((prev) => !prev)}
            className={`w-full h-1/2 text-center border-none ${
              disabled
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white cursor-pointer"
            }`}
          >
            ▼
          </button>

          {open && (
            <ul className="absolute top-full left-0 w-[300px] max-h-[150px] overflow-y-auto border border-black bg-white z-50 text-left shadow-lg">
              {options.map((opt, i) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    onCodeChange(opt.value);
                    onTextChange(opt.label);
                    setOpen(false);
                    textAreaRef.current?.focus();
                  }}
                  className={`px-2 py-1 cursor-pointer ${
                    i === highlightIndex
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {opt.value}: {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <textarea
          ref={textAreaRef}
          disabled={disabled}
          value={textValue}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-11/12 h-[80px] border border-black border-l-0 bg-input p-1 resize-none"
          style={{ backgroundColor: "#ebcec0" }}
        />
      </div>
    );
  }
);

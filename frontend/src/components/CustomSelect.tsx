import React, { useState, useRef, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = "custom-select-listbox";

  // Find current selected index
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  // Update focused index when value changes
  useEffect(() => {
    if (selectedIndex !== -1) {
      setFocusedIndex(selectedIndex);
    }
  }, [selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to focused item
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const focusedElement = dropdownRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case " ": // Space
        e.preventDefault();
        e.stopPropagation();
        if (isOpen) {
          // Select current focused option
          onChange(options[focusedIndex].value);
          setIsOpen(false);
        } else {
          // Open dropdown
          setIsOpen(true);
        }
        break;

      case "Enter":
        if (isOpen) {
          // Select current focused option and close
          e.preventDefault();
          e.stopPropagation();
          onChange(options[focusedIndex].value);
          setIsOpen(false);
        } else {
          // When closed, open dropdown
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }
        break;

      case "ArrowDown":
        if (isOpen) {
          // Navigate down in dropdown when open
          e.preventDefault();
          e.stopPropagation();
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
        }
        // When closed, DON'T stopPropagation - let parent handler navigate
        break;

      case "ArrowUp":
        if (isOpen) {
          // Navigate up in dropdown when open
          e.preventDefault();
          e.stopPropagation();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        }
        // When closed, DON'T stopPropagation - let parent handler navigate
        break;

      case "ArrowLeft":
      case "ArrowRight":
        // Don't handle left/right - let them navigate between elements
        break;

      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        break;

      case "Tab":
        // Allow tab to work naturally, close dropdown
        setIsOpen(false);
        break;

      case "Home":
        if (isOpen) {
          e.preventDefault();
          e.stopPropagation();
          setFocusedIndex(0);
        }
        break;

      case "End":
        if (isOpen) {
          e.preventDefault();
          e.stopPropagation();
          setFocusedIndex(options.length - 1);
        }
        break;

      default:
        break;
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    containerRef.current?.focus();
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      ref={containerRef}
      className={`custom-select relative ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={isOpen}
      aria-controls={dropdownId}
      aria-haspopup="listbox"
    >
      {/* Select button */}
      <div
        onClick={toggleDropdown}
        className={`flex items-center justify-between ${className} ${
          isOpen ? "ring-2 ring-blue-500" : ""
        }`}
      >
        <span className="truncate">{selectedOption?.label || ""}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id={dropdownId}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-black max-h-60 overflow-y-auto shadow-lg"
          style={{ minWidth: "100%" }}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`px-2 py-1 cursor-pointer ${
                index === focusedIndex
                  ? "bg-blue-100"
                  : value === option.value
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

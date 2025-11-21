import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { format, addMonths, subMonths, startOfMonth } from "date-fns";
import { ja } from "date-fns/locale";

interface JapaneseMonthPickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  format?: string;
}

export interface JapaneseMonthPickerHandle {
  focus: () => void;
}

const JapaneseMonthPicker = forwardRef<
  JapaneseMonthPickerHandle,
  JapaneseMonthPickerProps
>(
  (
    {
      value,
      onChange,
      placeholder = "YYYY/MM",
      className = "",
      format: dateFormat = "yyyy/MM",
    },
    ref
  ) => {
    const [selectedMonth, setSelectedMonth] = useState<Date>(
      value ? startOfMonth(value) : startOfMonth(new Date())
    );
    const [isOpen, setIsOpen] = useState(false);
    const [displayYear, setDisplayYear] = useState<number>(
      selectedMonth.getFullYear()
    );
    const [popupPosition, setPopupPosition] = useState<"bottom" | "top">(
      "bottom"
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }
        return;
      }

      // CRITICAL: Stop ALL arrow keys and Enter/Escape from propagating to parent
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Enter",
          "Escape",
        ].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }

      switch (e.key) {
        case "ArrowUp": {
          const newDate = subMonths(selectedMonth, 3);
          setSelectedMonth(newDate);
          setDisplayYear(newDate.getFullYear());
          break;
        }
        case "ArrowDown": {
          const newDate = addMonths(selectedMonth, 3);
          setSelectedMonth(newDate);
          setDisplayYear(newDate.getFullYear());
          break;
        }
        case "ArrowLeft": {
          const newDate = subMonths(selectedMonth, 1);
          setSelectedMonth(newDate);
          setDisplayYear(newDate.getFullYear());
          break;
        }
        case "ArrowRight": {
          const newDate = addMonths(selectedMonth, 1);
          setSelectedMonth(newDate);
          setDisplayYear(newDate.getFullYear());
          break;
        }
        case "Enter":
          if (onChange) {
            onChange(selectedMonth);
          }
          setIsOpen(false);
          inputRef.current?.focus();
          break;
        case "Escape":
          setIsOpen(false);
          inputRef.current?.focus();
          break;
        default:
          break;
      }
    };

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          pickerRef.current &&
          !pickerRef.current.contains(event.target as Node) &&
          !inputRef.current?.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Update selected month when value prop changes
    useEffect(() => {
      if (value) {
        const monthStart = startOfMonth(value);
        setSelectedMonth(monthStart);
        setDisplayYear(monthStart.getFullYear());
      }
    }, [value]);

    // Focus picker and calculate position when it opens
    useEffect(() => {
      if (isOpen && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const pickerHeight = 250; // Approximate picker height

        // If not enough space below and more space above, show on top
        if (spaceBelow < pickerHeight && spaceAbove > spaceBelow) {
          setPopupPosition("top");
        } else {
          setPopupPosition("bottom");
        }

        // Focus picker after position is set
        setTimeout(() => {
          if (pickerRef.current) {
            pickerRef.current.focus();
          }
        }, 0);
      }
    }, [isOpen]);

    const handleMonthClick = (monthIndex: number) => {
      const newDate = new Date(displayYear, monthIndex, 1);
      setSelectedMonth(newDate);
      if (onChange) {
        onChange(newDate);
      }
      setIsOpen(false);
      inputRef.current?.focus();
    };

    const months = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ];

    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={format(selectedMonth, dateFormat, { locale: ja })}
          readOnly
          placeholder={placeholder}
          className={`cursor-pointer ${className} custom-date-input`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }
          }}
        />

        {isOpen && (
          <div
            ref={pickerRef}
            className={`japanese-month-picker-popup absolute left-0 z-50 bg-white border-2 border-gray-400 shadow-lg rounded-md p-4 ${
              popupPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
            }`}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            data-calendar-popup="true"
            style={{
              outline: "none",
              width: "280px",
            }}
          >
            {/* Year selector */}
            <div className="flex justify-between items-center mb-4">
              <button
                className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-100"
                onClick={() => setDisplayYear(displayYear - 1)}
              >
                ◀
              </button>
              <span className="font-bold text-lg">{displayYear}年</span>
              <button
                className="px-2 py-1 border border-gray-400 rounded hover:bg-gray-100"
                onClick={() => setDisplayYear(displayYear + 1)}
              >
                ▶
              </button>
            </div>

            {/* Month grid */}
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => {
                const isSelected =
                  selectedMonth.getMonth() === index &&
                  selectedMonth.getFullYear() === displayYear;

                return (
                  <button
                    key={index}
                    className={`py-2 px-3 border rounded text-sm ${
                      isSelected
                        ? "bg-[#ffffcc] border-[#4a90e2] border-2 font-bold"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => handleMonthClick(index)}
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

JapaneseMonthPicker.displayName = "JapaneseMonthPicker";

export default JapaneseMonthPicker;

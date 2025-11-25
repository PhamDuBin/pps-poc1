import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parse,
  isValid,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
} from "date-fns";
import { ja } from "date-fns/locale";
import HolidayJp from "@holiday-jp/holiday_jp";
import "react-day-picker/dist/style.css";

interface JapaneseCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  format?: string;
  disabled?: boolean;
  align?: "left" | "right";
}

export interface JapaneseCalendarHandle {
  focus: () => void;
}

const JapaneseCalendar = forwardRef<
  JapaneseCalendarHandle,
  JapaneseCalendarProps
>(
  (
    {
      value,
      onChange,
      placeholder = "YYYY/MM/DD",
      className = "",
      format: dateFormat = "yyyy/MM/dd",
      disabled = false,
      align = "left",
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [month, setMonth] = useState<Date>(value || new Date());
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [popupPosition, setPopupPosition] = useState<"bottom" | "top">(
      "bottom"
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const getHolidaysInMonth = (date: Date): Date[] => {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const daysInMonth = eachDayOfInterval({ start, end });
      return daysInMonth.filter((day) => HolidayJp.isHoliday(day));
    };
    const holidays = getHolidaysInMonth(month);
    const isSaturday = (date: Date) => date.getDay() === 6;
    const isSunday = (date: Date) => date.getDay() === 0;
    const isHoliday = (date: Date) =>
      holidays.some((holiday) => isSameDay(holiday, date));

    const handleCalendarKeyDown = (e: React.KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp": {
          const newDate = subWeeks(selectedDate, 1);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "ArrowDown": {
          const newDate = addWeeks(selectedDate, 1);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "ArrowLeft": {
          const newDate = subDays(selectedDate, 1);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "ArrowRight": {
          const newDate = addDays(selectedDate, 1);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "Enter":
          if (onChange) onChange(selectedDate);
          setIsOpen(false);
          inputRef.current?.focus();
          break;
        case "Escape":
          setIsOpen(false);
          inputRef.current?.focus();
          break;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const isClickOnInput = inputRef.current?.contains(event.target as Node);
        const isClickOnCalendar = calendarRef.current?.contains(
          event.target as Node
        );
        if (!isClickOnInput && !isClickOnCalendar) {
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

    useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setMonth(value);
      }
    }, [value]);

    useEffect(() => {
      setInputValue(format(selectedDate, dateFormat, { locale: ja }));
    }, [selectedDate, dateFormat]);

    useEffect(() => {
      if (isOpen && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const calendarHeight = 350;
        const position = spaceBelow < calendarHeight ? "top" : "bottom";
        setPopupPosition(position);

        let top = 0;
        let left = 0;
        if (position === "bottom") top = rect.bottom + window.scrollY + 4;
        else top = rect.top + window.scrollY - 4;

        if (align === "right") left = rect.right + window.scrollX;
        else left = rect.left + window.scrollX;

        setCoords({ top, left });
        setTimeout(() => {
          if (calendarRef.current) {
            calendarRef.current.focus();
          }
        }, 0);
      }
    }, [isOpen, align]);

    const handleDayClick = (date: Date | undefined) => {
      if (date) {
        setSelectedDate(date);
        if (onChange) onChange(date);
        setIsOpen(false);
        inputRef.current?.focus();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
      const parsedDate = parse(inputValue, dateFormat, new Date(), {
        locale: ja,
      });
      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
        setMonth(parsedDate);
        if (onChange) onChange(parsedDate);
      } else {
        setInputValue(format(selectedDate, dateFormat, { locale: ja }));
      }
    };

    const modifiers = {
      saturday: isSaturday,
      sunday: isSunday,
      holiday: isHoliday,
    };
    const modifiersStyles = {
      saturday: { color: "#0066cc" },
      sunday: { color: "#cc0000" },
      holiday: { color: "#cc0000", fontWeight: "bold" },
    };

    return (
      <>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          className={`cursor-pointer ${className} custom-date-input outline-none ${
            disabled
              ? "bg-gray-300 cursor-not-allowed opacity-60 text-gray-500"
              : "bg-white"
          }`}
          onClick={() => !disabled && setIsOpen(true)}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === "ArrowDown") {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }
          }}
        />

        {isOpen &&
          !disabled &&
          createPortal(
            <div
              ref={calendarRef}
              className="fixed z-[9999] bg-white border-2 border-gray-400 shadow-xl rounded-md p-2"
              style={{
                top: coords.top,
                left: coords.left,
                transform: `
                translate(
                  ${align === "right" ? "-100%" : "0"}, 
                  ${popupPosition === "top" ? "-100%" : "0"}
                )
              `,
                outline: "none",
              }}
              tabIndex={-1}
              onKeyDown={handleCalendarKeyDown}
            >
              <style>{`
              .rdp { --rdp-cell-size: 35px; --rdp-accent-color: #4a90e2; --rdp-background-color: #ffffcc; margin: 0; }
              .rdp-day_selected { background-color: var(--rdp-background-color) !important; border: 2px solid var(--rdp-accent-color) !important; font-weight: bold; color: black; }
              .rdp-day:hover:not(.rdp-day_selected) { background-color: #e6f2ff; }
            `}</style>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDayClick}
                month={month}
                onMonthChange={setMonth}
                locale={ja}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                showOutsideDays={false}
              />
            </div>,
            document.body
          )}
      </>
    );
  }
);

JapaneseCalendar.displayName = "JapaneseCalendar";

export default JapaneseCalendar;

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { DayPicker } from "react-day-picker";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parse, // +++ THÊM IMPORT
  isValid, // +++ THÊM IMPORT
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
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [month, setMonth] = useState<Date>(value || new Date());
    const [popupPosition, setPopupPosition] = useState<"bottom" | "top">(
      "bottom"
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // +++ THÊM STATE CHO INPUT VALUE +++
    const [inputValue, setInputValue] = useState("");

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    // Get Japanese holidays (không đổi)
    const getHolidaysInMonth = (date: Date): Date[] => {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const daysInMonth = eachDayOfInterval({ start, end });

      return daysInMonth.filter((day) => {
        const holiday = HolidayJp.isHoliday(day);
        return holiday;
      });
    };

    const holidays = getHolidaysInMonth(month);
    const isSaturday = (date: Date) => date.getDay() === 6;
    const isSunday = (date: Date) => date.getDay() === 0;
    const isHoliday = (date: Date) =>
      holidays.some((holiday) => isSameDay(holiday, date));

    // Handle keyboard navigation in calendar (không đổi)
    const handleCalendarKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }
        return;
      }
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
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() - 7);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "ArrowDown": {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() + 7);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "ArrowLeft": {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() - 1);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "ArrowRight": {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() + 1);
          setSelectedDate(newDate);
          setMonth(newDate);
          break;
        }
        case "Enter":
          if (onChange) {
            onChange(selectedDate);
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

    // Handle click outside (không đổi)
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node) &&
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

    // Update selected date when value prop changes
    useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setMonth(value);
      }
    }, [value]);

    // +++ THÊM EFFECT ĐỂ ĐỒNG BỘ STATE VÀO INPUT +++
    // Khi selectedDate thay đổi (do click lịch hoặc prop), cập nhật inputValue
    useEffect(() => {
      setInputValue(format(selectedDate, dateFormat, { locale: ja }));
    }, [selectedDate, dateFormat]);

    // Focus calendar and calculate position (không đổi)
    useEffect(() => {
      if (isOpen && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const calendarHeight = 400;
        if (spaceBelow < calendarHeight && spaceAbove > spaceBelow) {
          setPopupPosition("top");
        } else {
          setPopupPosition("bottom");
        }
        setTimeout(() => {
          if (calendarRef.current) {
            calendarRef.current.focus();
          }
        }, 0);
      }
    }, [isOpen]);

    // Handle Day Click (không đổi)
    const handleDayClick = (date: Date | undefined) => {
      if (date) {
        setSelectedDate(date);
        if (onChange) {
          onChange(date);
        }
        setIsOpen(false);
        inputRef.current?.focus();
      }
    };

    // +++ HANDLER MỚI CHO VIỆC GÕ INPUT +++
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    // +++ HANDLER MỚI ĐỂ VALIDATE KHI RỜI INPUT +++
    const handleInputBlur = () => {
      const parsedDate = parse(inputValue, dateFormat, new Date(), {
        locale: ja,
      });

      if (isValid(parsedDate)) {
        // Nếu ngày gõ vào là hợp lệ
        setSelectedDate(parsedDate);
        setMonth(parsedDate);
        if (onChange) {
          onChange(parsedDate);
        }
      } else {
        // Nếu ngày gõ vào không hợp lệ, trả lại giá trị cũ
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
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          className={`cursor-pointer ${className} custom-date-input`}
          onClick={() => setIsOpen(!isOpen)}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();

              handleInputBlur();
              setIsOpen(!isOpen);
            }
          }}
        />

        {isOpen && (
          <div
            ref={calendarRef}
            className={`japanese-calendar-popup absolute left-0 z-50 bg-white border-2 border-gray-400 shadow-lg rounded-md p-2 ${
              popupPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
            }`}
            onKeyDown={handleCalendarKeyDown}
            tabIndex={-1}
            data-calendar-popup="true"
            style={{
              outline: "none",
            }}
          >
            <style>{`
              /* ... (CSS style không đổi) ... */
              .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: #4a90e2;
                --rdp-background-color: #ffffcc;
                margin: 0;
              }
              .rdp-months {
                justify-content: center;
              }
              .rdp-month {
                width: 100%;
              }
              .rdp-caption {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.5rem;
                font-weight: bold;
              }
              .rdp-nav {
                position: absolute;
                top: 1.2rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 0 0.5rem;
              }
              .rdp-nav_button {
                width: 2rem;
                height: 2rem;
                border-radius: 0.25rem;
                border: 1px solid #ccc;
                background: white;
                cursor: pointer;
              }
              .rdp-nav_button:hover {
                background: #f0f0f0;
              }
              .rdp-head_cell {
                font-weight: bold;
                text-align: center;
                font-size: 0.875rem;
                padding: 0.5rem 0;
              }
              .rdp-cell {
                text-align: center;
              }
              .rdp-day {
                width: var(--rdp-cell-size);
                height: var(--rdp-cell-size);
                border-radius: 0.25rem;
                cursor: pointer;
                border: 1px solid transparent;
              }
              .rdp-day:hover {
                background-color: #e6f2ff;
              }
              .rdp-day_selected {
                background-color: var(--rdp-background-color) !important;
                border: 2px solid var(--rdp-accent-color) !important;
                font-weight: bold;
              }
              .rdp-day_today {
                font-weight: bold;
                background-color: #fff3cd;
              }
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
          </div>
        )}
      </div>
    );
  }
);

JapaneseCalendar.displayName = "JapaneseCalendar";

export default JapaneseCalendar;

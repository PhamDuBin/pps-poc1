// File: DatePickerInput.tsx
import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, parse, isValid } from "date-fns";
import { DownArrowIcon } from "../component/transaction_information/LeftPanel";

export const DatePickerInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [inputValue, setInputValue] = useState<string>(
    format(new Date(), "yyyy/MM/dd")
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate && isValid(selectedDate)) {
      setInputValue(format(selectedDate, "yyyy/MM/dd"));
    } else {
      setInputValue("");
    }
  }, [selectedDate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const parsedDate = parse(e.target.value, "yyyy/MM/dd", new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
    }
  };

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setIsPickerOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-grow">
      <input
        className="w-full border border-black px-2 py-1 pr-8"
        type="text"
        placeholder="yyyy/MM/dd"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
      >
        <DownArrowIcon />
      </button>

      {isPickerOpen && (
        <div className="absolute top-full right-0 z-10 bg-white border rounded-md shadow-lg mt-1">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
            defaultMonth={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

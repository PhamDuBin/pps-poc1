import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ja } from "date-fns/locale";

export const CustomDatePicker = ({
  selectedDate,
  onDateChange,
  onClose,
}: {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  onClose: () => void;
}) => {
  return (
    <div className="absolute top-full right-0 mt-1 border border-black bg-white text-black z-10 shadow-lg rounded-md">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          onDateChange(date);
          onClose();
        }}
        locale={ja}
        captionLayout="dropdown"
        fromYear={2015}
        toYear={2030}
        defaultMonth={selectedDate || new Date()}
      />
    </div>
  );
};

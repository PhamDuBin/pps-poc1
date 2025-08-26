import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import CSS mặc định
import { format } from "date-fns";
import { ja } from "date-fns/locale"; // Import ngôn ngữ tiếng Nhật

export const MonthYearPicker = ({
  selectedDate,
  onDateChange,
  onClose,
}: {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  onClose: () => void;
}) => {
  const footer = (
    <div className="flex justify-between p-2 pt-0">
      <button
        type="button"
        className="text-blue-600 text-sm"
        onClick={() => {
          onDateChange(new Date());
          onClose();
        }}
      >
        今月
      </button>
      <button
        type="button"
        className="text-red-600 text-sm"
        onClick={() => {
          onDateChange(undefined);
          onClose();
        }}
      >
        削除
      </button>
    </div>
  );

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
        footer={footer}
      />
    </div>
  );
};

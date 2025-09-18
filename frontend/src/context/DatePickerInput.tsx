// File: DatePickerInput.tsx
import React, { useState } from "react";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DownArrowIcon } from "../component/transaction_information/LeftPanel";

export const DatePickerInput = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );

  const handleChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="relative flex-grow">
      <DatePicker
        value={selectedDate}
        defaultValue={dayjs()}
        onChange={handleChange}
        format="YYYY/MM/DD"
        placeholder="yyyy/mm/dd"
        className="w-full bg-[#ebcec0] px-2 py-1 border border-black"
        suffixIcon={<DownArrowIcon />}
      />
    </div>
  );
};

"use client";

import { forwardRef, useState } from "react";
import { DatePicker, Select, Checkbox } from "antd";
import dayjs from "dayjs";
import { inputColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";

const ContinuousIssue = forwardRef<any>((props, ref) => {
  const [month, setMonth] = useState(dayjs());
  const [rangeStart, setRangeStart] = useState<dayjs.Dayjs | null>(null);
  const [rangeEnd, setRangeEnd] = useState<dayjs.Dayjs | null>(null);

  const labelClass =
    "bg-[#80bad7] border border-gray-400 text-sm font-bold flex items-center justify-center min-h-[32px] w-[120px] px-2";

  return (
    <div
      tabIndex={0}
      onKeyDown={blockTab}
      className="border border-black w-full p-2"
    >
      {/* Title */}
      <div className="bg-[#80bad7] font-bold text-center py-2">
        抽出条件｜連続発行
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 py-4">
        {/* 月度 */}
        <div className="flex items-center">
          <div className={labelClass}>月度</div>
          <DatePicker
            ref={ref}
            picker="month"
            value={month}
            onChange={(date) => setMonth(date)}
            className={`ml-2 max-w-[160px] w-full ${inputColor}`}
            format="YYYY/MM"
            style={{ width: "160px" }}
          />
        </div>

        {/* 締切指定 */}
        <div className="flex items-center">
          <div className={labelClass}>締切指定</div>
          <Select
            defaultValue="締切残"
            className={`ml-2 max-w-[160px] w-full [&>.ant-select-selector]:!bg-[#ebcec0] `}
            options={[
              { value: "締切残", label: "締切残" },
              { value: "現在残", label: "現在残" },
              { value: "当月分", label: "当月分" },
            ]}
          />
        </div>

        {/* 残高指定 */}
        <div className="flex items-center">
          <div className={labelClass}> 残高指定 </div>
          <Select
            defaultValue="残有り"
            className={`ml-2 max-w-[160px] w-full [&>.ant-select-selector]:!bg-[#ebcec0] `}
            options={[
              { value: "残有り", label: "残有り" },
              { value: "取引有り", label: "取引有り" },
              { value: "無条件", label: "無条件" },
            ]}
          />
        </div>

        {/* 今回検計日 */}
        <div className="flex items-center md:col-span-1">
          <div className={`${labelClass} !min-w-[120px]`}>今回検計日</div>
          <div
            className="flex items-center ml-2 gap-2"
            style={{
              minWidth: "1px",
              maxWidth: "100%",
              width: "100%",
              flexBasis: "320px",
            }}
          >
            <DatePicker
              value={rangeStart}
              onChange={(date) => setRangeStart(date)}
              format="YYYY/MM/DD"
              style={{ flex: 1, minWidth: 0 }}
              placeholder="開始日"
              className={`bg-[#ebcec0] `}
            />
            <span className="select-none">〜</span>
            <DatePicker
              value={rangeEnd}
              onChange={(date) => setRangeEnd(date)}
              format="YYYY/MM/DD"
              style={{ flex: 1, minWidth: 0 }}
              placeholder="終了日"
              className={`bg-[#ebcec0] `}
            />
          </div>
        </div>

        {/* 売上の条件 */}
        <div className="flex items-center">
          <div className={labelClass}>売上の条件</div>
          <Select
            defaultValue="無条件"
            className={`ml-2 max-w-[160px] w-full [&>.ant-select-selector]:!bg-[#ebcec0] `}
            options={[
              { value: "無条件", label: "無条件" },
              { value: "検針後売上有り", label: "検針後売上有り" },
            ]}
          />
        </div>

        {/* 取引区分 */}
        <div className="flex items-center sm:col-span-1">
          <div className={labelClass}>取引区分</div>
          <Checkbox.Group
            defaultValue={["直売", "卸"]}
            className="ml-2 flex gap-4"
          >
            <Checkbox value="直売">直売</Checkbox>
            <Checkbox value="卸">卸</Checkbox>
          </Checkbox.Group>
        </div>
      </div>
    </div>
  );
});

export default ContinuousIssue;

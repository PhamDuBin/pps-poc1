"use client";

import { forwardRef, useState } from "react";
import { Select, Checkbox } from "antd";
import { blockTab } from "../../../utils/InputHandlers";
import JapaneseCalendar from "../../JapaneseCalendar";

const ContinuousIssue = forwardRef<any>((props, ref) => {
  const [keiriDate, setKeiriDate] = useState<Date>(new Date());
  const [keiriDate1, setKeiriDate1] = useState<Date>(new Date());
  const [keiriDate2, setKeiriDate2] = useState<Date>(new Date());

  const labelClass =
    "bg-label border border-gray-400 text-sm font-bold flex items-center justify-center min-h-[32px] w-[120px] px-2 rounded-md";

  return (
    <div tabIndex={0} onKeyDown={blockTab} className="w-full p-2">
      {/* Title */}
      <div className="bg-label font-bold text-center py-2 rounded-md">
        抽出条件｜連続発行
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3 py-4">
        {/* 月度 */}
        <div className="flex items-center">
          <div className={labelClass}>月度</div>

          <JapaneseCalendar
            ref={ref}
            value={keiriDate}
            onChange={(date) => setKeiriDate(date)}
            format="yyyy/MM/dd"
            placeholder="yyyy/MM/dd"
            className="japanese-calendar w-40 ml-2 px-2 py-1 rounded-md bg-input"
          />
        </div>

        {/* 締切指定 */}
        <div className="flex items-center">
          <div className={labelClass}>締切指定</div>
          <Select
            defaultValue="締切残"
            className={`ml-2 max-w-[160px] w-full [&>.ant-select-selector]:!bg-input `}
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
            className={`ml-2 max-w-[160px] w-full [&>.ant-select-selector]:!bg-input `}
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
            <JapaneseCalendar
              value={keiriDate1}
              onChange={(date) => setKeiriDate1(date)}
              format="yyyy/MM/dd"
              placeholder="yyyy/MM/dd"
              className="japanese-calendar w-40  px-2 py-1 rounded-md bg-input"
            />
            <span className="select-none">〜</span>
            <JapaneseCalendar
              value={keiriDate2}
              onChange={(date) => setKeiriDate2(date)}
              format="yyyy/MM/dd"
              placeholder="yyyy/MM/dd"
              className="japanese-calendar w-40  px-2 py-1 rounded-md bg-input"
            />
          </div>
        </div>

        {/* 売上の条件 */}
        <div className="flex items-center">
          <div className={labelClass}>売上の条件</div>
          <Select
            defaultValue="無条件"
            className={`ml-2 max-w-[160px] w-full [&>.ant-select-selector]:!bg-input `}
            options={[
              { value: "無条件", label: "無条件" },
              { value: "検針後売上有り", label: "検針後売上有り" },
            ]}
          />
        </div>

        {/* 取引区分 */}
        <div className="flex items-center sm:col-span-1">
          <div className={labelClass}>取引区分</div>
          <div className="ant-checkbox-group-navigable ml-2" role="group">
            <Checkbox value="直売">直売</Checkbox>
            <Checkbox value="卸">卸</Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContinuousIssue;

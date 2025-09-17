"use client";

import { DatePicker, Input, Button, Select } from "antd";
import dayjs from "dayjs";
import AdvanceSearchModal from "../AdvanceSearchModal";
import { useState } from "react";

const { MonthPicker } = DatePicker;
const { Option } = Select;

const labelClass =
  "bg-[#D9D9D9] border border-black px-2 flex items-center justify-center min-h-[32px] w-[120px]";

const IndividualIssue = () => {
  const [selected, setSelected] = useState("0");
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);

  const options = [
    { value: "0", label: "顧客コード" },
    { value: "1", label: "五十音順" },
    { value: "2", label: "検針順" },
    { value: "3", label: "営業順" },
    { value: "4", label: "集金順" },
    { value: "5", label: "配送順" },
    { value: "6", label: "点検順" },
    { value: "7", label: "検索１順" },
    { value: "8", label: "検索２順" },
  ];

  return (
    <div className="relative border border-black p-2">
      {showAdvanceSearch && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowAdvanceSearch(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white max-h-[90vh] overflow-auto w-full max-w-4xl shadow-lg border border-black rounded-sm">
              <AdvanceSearchModal
                showAdvanceSearch={showAdvanceSearch}
                setShowAdvanceSearch={setShowAdvanceSearch}
                onRowEnter={() => console.log("Selected from modal")}
              />
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <div className="bg-[#D9D9D9] font-bold text-center p-2">
        抽出条件｜個別発行
      </div>

      {/* 条件 form */}
      <div className="flex flex-rows-3 p-2">
        <div>
          {/* 月度 */}
          <span className="flex gap-4">
            <div className={labelClass}>月度</div>
            <MonthPicker defaultValue={dayjs("2022-01", "YYYY-MM")} format="YYYY-MM" />
          </span>

          {/* 事務所 */}
          <span className="flex mt-2 gap-4 items-center">
            <div className={labelClass}>事務所</div>
            <Input className="w-[100px]" placeholder="0000000" />
            <div>-</div>
            <Input className="w-[100px]" placeholder="0000000" />
            <Button onClick={() => setShowAdvanceSearch(true)} className="h-8 w-8">
              ▼
            </Button>
            <div>関東地方営業事務所</div>
          </span>

          {/* 顧客コード */}
          <span className="flex mt-2 gap-4 items-center">
            <Select
              value={selected}
              onChange={(value) => setSelected(value)}
              className="w-[120px] text-black [&>.ant-select-selector]:!bg-gray-400 [&>.ant-select-selector]:!border-black [&>.ant-select-selector]:!text-black [&>.ant-select-selector]:!rounded-none [&>.ant-select-selector]:!text-center"
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Input className="w-[100px]" placeholder="0000000" />
            <div>-</div>
            <Input className="w-[100px]" placeholder="0000000" />
            <Button onClick={() => setShowAdvanceSearch(true)} className="h-8 w-8">
              ▼
            </Button>
            <Button className="px-2">確定</Button>
            <Button onClick={() => setShowAdvanceSearch(true)} className="px-2">
              再入力
            </Button>
          </span>
        </div>
      </div>

      {/* 顧客情報詳細 */}
      <div className="min-h-[120px] p-4">
        <div className="font-bold py-2">顧客情報詳細</div>
        <div className="border border-black">
          <div className="flex flex-cols-3 p-2">
            <span className="flex gap-4 w-[40%]">
              <div className={`font-semibold ${labelClass}`}>氏名</div>
              <div>鈴木　カンクロウ</div>
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>開閉</div>
              <div className="ml-2">新規開栓</div>
              <div>自振</div>
              <div>4</div>
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>締日</div>
              <div>31</div>
            </span>
          </div>

          <div className="flex flex-cols-3 p-2">
            <span className="flex w-[40%] gap-4">
              <div className={`font-semibold ${labelClass}`}>住所</div>
              <div>埼玉県さいたま市なんちゃら０００１</div>
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>電話番号</div>
              <div className="ml-2">03-1234-9999</div>
            </span>
            <span className="flex gap-5 w-[30%] items-center">
              <div className={`font-semibold ${labelClass}`}>締切指定</div>
              <Select defaultValue="締切残" className="w-[50%]">
                <Option value="締切残">締切残</Option>
                <Option value="現在残">現在残</Option>
                <Option value="当月分">当月分</Option>
              </Select>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualIssue;

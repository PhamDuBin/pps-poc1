"use client";

import { DatePicker, Input, Button, Select } from "antd";
import dayjs from "dayjs";
import AdvanceSearchModal from "../../transaction_information/1.1.1_03/AdvanceSearchModal";
import { useRef, useState, KeyboardEvent } from "react";
import { forwardRef } from "react";
import { labelColor, inputColor } from "../../../constants/colors";
import { allowDecimalInput } from "../../../utils/InputHandlers";
import { blockTab } from "../../../utils/InputHandlers";
import { options } from "../../../constants/configuration_information";

const { MonthPicker } = DatePicker;
const { Option } = Select;

const labelClass = `${labelColor} border border-black px-2 flex items-center justify-center min-h-[32px] w-[120px] rounded-md`;

const IndividualIssue = forwardRef<any>((props, ref) => {
  const [selected, setSelected] = useState("0");
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [showCustomerInfor, setShowCustomerInfor] = useState(false);
  const [officeCode, setOfficeCode] = useState(["", ""]);
  const [customerCode, setCustomerCode] = useState(["", ""]);
  const [officeName, setOfficeName] = useState("");

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleCloseCustomerInfor = () => {
    setShowCustomerInfor(false);
  };

  const handleCloseOfficeInfor = () => {
    setOfficeName("");
    setOfficeCode(["", ""]);
  };

  const handleOfficeSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && officeCode[0] && officeCode[1]) {
      e.preventDefault();
      setOfficeName("関東地方営業事務所");
    }
  };

  const handleShowCustomerInforKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && customerCode[0] && customerCode[1]) {
      e.preventDefault();
      setShowCustomerInfor(true);
      btnRef.current?.focus();
    }
  };

  const handleShowCustomerInforClick = () => {
    if (customerCode[0] && customerCode[1]) {
      setShowCustomerInfor(true);
      btnRef.current?.focus();
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={blockTab}
      className="relative p-2 xl:text-base text-sm"
    >
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
                onRowEnter={() => {
                  setShowCustomerInfor(true);
                  btnRef.current?.focus();
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <div className="bg-label font-bold text-center p-2 rounded-md">
        抽出条件｜個別発行
      </div>

      {/* 条件 form */}
      <div className="flex flex-rows-3 p-2">
        <div>
          {/* 月度 */}
          <span className="flex gap-4">
            <div className={labelClass}>月度</div>
            <MonthPicker
              ref={ref}
              defaultValue={dayjs()}
              format="YYYY/MM"
              className={`${inputColor}`}
            />
          </span>

          {/* 事務所 */}
          <span className="flex mt-2 gap-4 items-center">
            <div className={labelClass}>事務所</div>
            <Input
              disabled={showCustomerInfor}
              className={`w-[100px] ${inputColor} ${
                showCustomerInfor
                  ? ""
                  : "disabled:bg-[#f2e2dc] disabled:cursor-not-allowed"
              }`}
              placeholder="0000000"
              onKeyDown={(e) => {
                allowDecimalInput(e);
              }}
              onChange={(e) => setOfficeCode([officeCode[0], e.target.value])}
            />
            <div>-</div>
            <Input
              disabled={showCustomerInfor}
              className={`w-[100px] ${inputColor} ${
                showCustomerInfor
                  ? ""
                  : "disabled:bg-[#f2e2dc] disabled:cursor-not-allowed"
              }`}
              onChange={(e) => setOfficeCode([officeCode[1], e.target.value])}
              placeholder="0000000"
              onKeyDown={(e) => {
                allowDecimalInput(e);
                handleOfficeSearch(e);
              }}
            />
            <Button
              onClick={() => {
                setShowAdvanceSearch(true);
              }}
              className="h-8 w-8  !bg-blue-600 !text-white hover:!bg-blue-400"
            >
              ▼
            </Button>
            <div>{officeName}</div>
            <Button
              onClick={() => handleCloseOfficeInfor()}
              className="px-2 !bg-blue-600 !text-white hover:!bg-blue-400 ml-[3.1rem]"
            >
              再入力
            </Button>
          </span>

          {/* 顧客コード */}
          <span className="flex mt-2 gap-4 items-center">
            <Select
              value={selected}
              onChange={(value) => setSelected(value)}
              className={`w-[120px] text-black 
                [&>.ant-select-selector]:!bg-blue-300 
                [&>.ant-select-selector]:!border-black 
                [&>.ant-select-selector]:!text-black 
                [&>.ant-select-selector]:!text-center 
                [&>.ant-select-selector]:!rounded-md
              `}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            <Input
              disabled={showCustomerInfor}
              className={`w-[100px] ${inputColor}  ${
                showCustomerInfor
                  ? ""
                  : "disabled:bg-gray-300 disabled:cursor-not-allowed"
              }`}
              placeholder="0000000"
              onKeyDown={(e) => {
                allowDecimalInput(e);
              }}
              onChange={(e) =>
                setCustomerCode([customerCode[0], e.target.value])
              }
            />
            <div>-</div>
            <Input
              disabled={showCustomerInfor}
              className={`w-[100px] ${inputColor}  ${
                showCustomerInfor
                  ? ""
                  : "disabled:bg-gray-300 disabled:cursor-not-allowed"
              }`}
              placeholder="0000000"
              onKeyDown={(e) => {
                allowDecimalInput(e);
                handleShowCustomerInforKeyDown(e);
              }}
              onChange={(e) =>
                setCustomerCode([customerCode[1], e.target.value])
              }
            />
            <Button
              onClick={() => {
                setShowAdvanceSearch(true);
              }}
              className="h-8 w-8  !bg-blue-600 !text-white hover:!bg-blue-400"
            >
              ▼
            </Button>
            <Button
              onClick={handleShowCustomerInforClick}
              className="px-2 !bg-blue-600 !text-white hover:!bg-blue-400"
            >
              確定
            </Button>
            <Button
              ref={btnRef}
              onClick={() => handleCloseCustomerInfor()}
              className="px-2 !bg-blue-600 !text-white hover:!bg-blue-400"
            >
              再入力
            </Button>
          </span>
        </div>
      </div>

      {/* 顧客情報詳細 */}
      {showCustomerInfor && (
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
      )}
    </div>
  );
});

export default IndividualIssue;

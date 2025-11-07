import { useEffect, useRef, useState } from "react";
import JapaneseCalendar from "../../JapaneseCalendar";
import {
  shukinOptions,
  nyukinOptions,
} from "../../../constants/sale_slip_entry";
import { Select } from "antd";
type Props = {
  isDeposited: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function DepositProcess({
  isDeposited,
  onClose,
  onSave,
}: Props) {
  const [keiriDate, setKeiriDate] = useState<Date>(new Date());
  const [shukin, setShukin] = useState("集金");
  const [nyukin, setNyukin] = useState("現金");

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  return (
    <div className="flex flex-col w-full border border-black">
      {/* --- Top Fields --- */}
      <div className="w-full p-2 grid grid-cols-3 gap-x-4 gap-y-2 whitespace-nowrap font-bold text-black">
        {/* 経理入金日 */}
        <div className="flex items-center">
          <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
            経理入金日
          </label>
          <div className="relative ml-1 w-1/2">
            <JapaneseCalendar
              value={keiriDate}
              onChange={(date) => setKeiriDate(date)}
              format="yyyy/MM/dd"
              placeholder="yyyy/MM/dd"
              className="w-full border border-black px-2 py-1"
            />
          </div>
        </div>

        {/* 集金方法 */}
        <div className="flex items-center">
          <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
            集金方法
          </label>
          <Select
            value={shukin}
            onChange={(value) => setShukin(value)}
            options={shukinOptions.map((opt) => ({
              value: opt.value,
              label: `${opt.code}:${opt.value}`
            }))}
            className="ml-1 w-1/2 border border-black text-black px-1 py-1 [&>.ant-select-selector]:!bg-white"
          />
        </div>

        {/* 入金種別 */}
        <div className="flex items-center">
          <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
            入金種別
          </label>
          <Select
            value={nyukin}
            onChange={(value) => setNyukin(value)}
            options={nyukinOptions.map((opt) => ({
              value: opt.value,
              label: `${opt.code}:${opt.value}`
            }))}
            className="ml-1 w-1/2 border border-black px-2 py-1 [&>.ant-select-selector]:!bg-white"
          />
        </div>
      </div>

      {/* --- Middle Fields --- */}
      <div className="mx-20 flex justify-center space-x-4 mt-5 font-bold text-black">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              入金項目
            </label>
            <input
              ref={firstInputRef}
              type="text"
              defaultValue="現金"
              className="ml-1 w-1/2 border border-black text-black px-1 py-1"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              値引項目
            </label>
            <input
              type="text"
              defaultValue="値引き"
              className="ml-1 w-1/2 border border-black text-black px-1 py-1"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              入金金額
            </label>
            <input
              type="text"
              defaultValue="10,000"
              className="ml-1 w-1/2 border border-black text-black px-1 py-1"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              値引金額
            </label>
            <input
              type="text"
              defaultValue="0"
              className="ml-1 w-1/2 border border-black text-black px-1 py-1"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              合計金額
            </label>
            <input
              type="text"
              defaultValue="10,000"
              className="ml-1 w-1/2 border border-black text-black px-1 py-1"
            />
          </div>
        </div>
      </div>

      {/* --- Buttons --- */}
      <div className="flex space-x-4 justify-center items-center mx-20 my-5 font-bold text-black">
        <button
          className="bg-bg-gray border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
          onClick={onSave}
        >
          保存登録
        </button>
        <button
          className="bg-[#5E5E5E] text-[#D0D0D0] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
          onClick={onClose}
          disabled={!isDeposited}
        >
          未入金に戻す
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import JapaneseCalendar from "../../JapaneseCalendar";
import {
  shukinOptions,
  nyukinOptions,
} from "../../../constants/sale_slip_entry";
import { Button, Select } from "antd";
import { HalfWidthNumberInput, KanaFullWidthInput } from "../../JapaneseInputs";
import { InputRef } from "antd";

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

  const [nyukinItem, setNyukinItem] = useState("現金");
  const [nebikiItem, setNebikiItem] = useState("値引き");
  const [nyukinKingaku, setNyukinKingaku] = useState("10000");
  const [nebikiKingaku, setNebikiKingaku] = useState("0");
  const [gokeiKingaku, setGokeiKingaku] = useState("10000");

  const firstInputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    const numNyukin = parseInt(nyukinKingaku || "0", 10);
    const numNebiki = parseInt(nebikiKingaku || "0", 10);
    const total = numNyukin + numNebiki;
    setGokeiKingaku(total.toString());
  }, [nyukinKingaku, nebikiKingaku]);

  return (
    <div className="flex flex-col w-full border border-black">
      <div className="w-full p-2 grid grid-cols-3 gap-x-4 gap-y-2 whitespace-nowrap font-bold text-black">
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
          <div className="ml-1 w-1/2">
            <Select
              value={shukin}
              onChange={(value) => setShukin(value)}
              options={shukinOptions.map((opt) => ({
                value: opt.value,
                label: `${opt.code}:${opt.value}`,
              }))}
              className="h-7 w-24"
            />
          </div>
        </div>

        {/* 入金種別 */}
        <div className="flex items-center">
          <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
            入金種別
          </label>
          <div className="ml-1 w-1/2">
            <Select
              value={nyukin}
              onChange={(value) => setNyukin(value)}
              options={nyukinOptions.map((opt) => ({
                value: opt.value,
                label: `${opt.code}:${opt.value}`,
              }))}
              className="h-7 w-24"
            />
          </div>
        </div>
      </div>

      {/* --- Middle Fields --- */}
      <div className="mx-20 flex justify-center space-x-4 mt-5 font-bold text-black">
        <div className="flex flex-col space-y-2">
          {/* 入金項目 */}
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              入金項目
            </label>
            <KanaFullWidthInput
              ref={firstInputRef}
              value={nyukinItem}
              onChange={setNyukinItem}
              className="ml-1 w-1/2 h-7 px-1 py-1"
            />
          </div>
          {/* 値引項目 */}
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              値引項目
            </label>
            <KanaFullWidthInput
              value={nebikiItem}
              onChange={setNebikiItem}
              className="ml-1 w-1/2 h-7 px-1 py-1"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {/* 入金金額 */}
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              入金金額
            </label>
            <HalfWidthNumberInput
              allowDecimal={true}
              value={nyukinKingaku}
              onChange={setNyukinKingaku}
              className="ml-1 w-1/2 h-7 px-1 py-1"
            />
          </div>
          {/* 値引金額 */}
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              値引金額
            </label>
            <HalfWidthNumberInput
              allowDecimal={true}
              value={nebikiKingaku}
              onChange={setNebikiKingaku}
              className="ml-1 w-1/2 h-7 px-1 py-1"
            />
          </div>
          {/* 合計金額 */}
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              合計金額
            </label>
            <HalfWidthNumberInput
              allowDecimal={true}
              value={gokeiKingaku}
              onChange={setGokeiKingaku}
              className="ml-1 w-1/2 h-7 px-1 py-1"
            />
          </div>
        </div>
      </div>

      {/* --- Buttons --- */}
      <div className="flex space-x-4 justify-center items-center mx-20 my-5 font-bold text-black">
        <Button
          className="bg-bg-gray border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
          onClick={onSave}
        >
          保存登録
        </Button>
        <Button
          className="bg-[#5E5E5E] text-[#D0D0D0] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
          onClick={onClose}
          disabled={!isDeposited}
        >
          未入金に戻す
        </Button>
      </div>
    </div>
  );
}

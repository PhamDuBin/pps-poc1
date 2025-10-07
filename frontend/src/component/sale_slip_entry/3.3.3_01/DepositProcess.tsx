import { useEffect, useRef, useState } from "react";
import { CustomDatePicker } from "../../../context/CustomDatePicker";
import { format, parse, isValid } from "date-fns";
import {
  shukinOptions,
  nyukinOptions,
} from "../../../constants/sale_slip_entry";
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
  const [keiriDate, setKeiriDate] = useState<Date | undefined>(new Date());
  const [inputValue, setInputValue] = useState(
    format(new Date(), "yyyy/MM/dd")
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [shukin, setShukin] = useState("集金");
  const [nyukin, setNyukin] = useState("現金");

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // 3. useEffect để đồng bộ từ Date -> sang String (khi chọn từ lịch)
  useEffect(() => {
    if (keiriDate && isValid(keiriDate)) {
      setInputValue(format(keiriDate, "yyyy/MM/dd"));
    }
  }, [keiriDate]);

  // 4. Hàm xử lý khi nhập tay vào input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Cập nhật giá trị hiển thị ngay lập tức
    setInputValue(e.target.value);

    // Cố gắng chuyển chuỗi thành ngày
    const parsedDate = parse(e.target.value, "yyyy/MM/dd", new Date());

    // Nếu chuỗi hợp lệ, cập nhật lại state Date
    if (isValid(parsedDate)) {
      setKeiriDate(parsedDate);
    }
  };
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
            {/* THAY ĐỔI 1: Cho phép nhập tay và xử lý định dạng */}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange} // Gọi hàm xử lý nhập tay
              placeholder="yyyy/MM/dd"
              className="w-full border border-black px-2 py-1 pr-8"
            />
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center px-2 text-gray-500 cursor-pointer"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              ▼
            </button>

            {showDatePicker && (
              <CustomDatePicker
                selectedDate={keiriDate}
                onDateChange={setKeiriDate}
                onClose={() => setShowDatePicker(false)}
              />
            )}
          </div>
        </div>

        {/* 集金方法 */}
        <div className="flex items-center">
          <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
            集金方法
          </label>
          {/* THAY ĐỔI 2: Dùng trực tiếp thẻ select */}
          <select
            value={shukin}
            onChange={(e) => setShukin(e.target.value)}
            className="ml-1 w-1/2 border border-black text-black px-1 py-1 appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg class="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>')`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "0.75rem",
            }}
          >
            {shukinOptions.map((opt) => (
              <option key={opt.code} value={opt.value}>
                {opt.code}:{opt.value}
              </option>
            ))}
          </select>
        </div>

        {/* 入金種別 */}
        <div className="flex items-center">
          <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
            入金種別
          </label>
          {/* THAY ĐỔI 3: Dùng trực tiếp thẻ select */}
          <select
            value={nyukin}
            onChange={(e) => setNyukin(e.target.value)}
            className="ml-1 w-1/2 border border-black px-2 py-1 appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg class="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>')`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "0.75rem",
            }}
          >
            {nyukinOptions.map((opt) => (
              <option key={opt.code} value={opt.value}>
                {opt.code}:{opt.value}
              </option>
            ))}
          </select>
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
          className="bg-[#EEEEEE] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
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

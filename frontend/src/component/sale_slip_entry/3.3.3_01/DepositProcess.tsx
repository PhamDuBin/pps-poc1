import { useState } from "react";
import { DownArrowIcon } from "../../transaction_information/LeftPanel";

type Props = {
    isDeposited: boolean;
    onClose: () => void;
    onSave: () => void;
};

const shukinOptions = [
    { value: "集金", code: "0" },
    { value: "クレジット", code: "13" },
];

const nyukinOptions = [
    { value: "現金", code: "1" },
    { value: "小切手", code: "2" },
    { value: "振込", code: "3" },
    { value: "手形", code: "4" },
    { value: "相殺", code: "5" },
    { value: "自振", code: "7" },
    { value: "コンビニ", code: "8" },
    { value: "その他", code: "9" },
];

export default function DepositProcess({ isDeposited, onClose, onSave }: Props) {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const [keiriDate, setKeiriDate] = useState(today);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [shukin, setShukin] = useState("集金"); // 集金方法 input
    const [nyukin, setNyukin] = useState("現金"); // 入金種別 input

    const [showShukinSelect, setShowShukinSelect] = useState(false);
    const [showNyukinSelect, setShowNyukinSelect] = useState(false);

    return (
        <div className="flex flex-col w-full border border-black">
            {/* --- Top Fields --- */}
            <div className="w-full p-2 grid grid-cols-3 gap-x-4 gap-y-2 whitespace-nowrap font-bold text-black">
                {/* 経理入金日 */}
                <div className="flex items-center relative">
                    <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">経理入金日</label>
                    <input
                        type="text"
                        value={keiriDate.replace(/-/g, "/")} // hiển thị YYYY/MM/DD
                        readOnly
                        className="ml-1 w-1/2 border border-black px-2 py-1"
                    />
                    <button
                        className="mx-1 w-[20px] h-[20px] flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        <DownArrowIcon />
                    </button>

                    {showDatePicker && (
                        <input
                            type="date"
                            className="absolute top-full left-1/2 mt-1 border border-black bg-white text-black z-10"
                            value={keiriDate}
                            onChange={(e) => {
                                setKeiriDate(e.target.value);
                                setShowDatePicker(false);
                            }}
                        />
                    )}
                </div>

                {/* 集金方法 */}
                <div className="flex items-center relative">
                    <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">集金方法</label>
                    <input
                        type="text"
                        value={shukin}
                        readOnly
                        className="ml-1 w-1/2 border border-black text-black px-2 py-1"
                    />
                    <button
                        className="mx-1 w-[20px] h-[20px] flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                        onClick={() => setShowShukinSelect(!showShukinSelect)}
                    >
                        <DownArrowIcon />
                    </button>

                    {showShukinSelect && (
                        <select
                            className="absolute top-full left-1/2 mt-1 border border-black bg-white text-black z-10"
                            onChange={(e) => {
                                setShukin(e.target.value);
                                setShowShukinSelect(false);
                            }}
                            value={shukin}
                        >
                            {shukinOptions.map((opt) => (
                                <option key={opt.code} value={opt.value}>
                                    {opt.code}:{opt.value}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* 入金種別 */}
                <div className="flex items-center relative">
                    <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">入金種別</label>
                    <input
                        type="text"
                        value={nyukin}
                        readOnly
                        className="ml-1 w-1/2 border border-black px-2 py-1"
                    />
                    <button
                        className="mx-1 w-[20px] h-[20px] flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                        onClick={() => setShowNyukinSelect(!showNyukinSelect)}
                    >
                        <DownArrowIcon />
                    </button>

                    {showNyukinSelect && (
                        <select
                            className="absolute top-full left-1/2 mt-1 border border-black bg-white text-black z-10"
                            onChange={(e) => {
                                setNyukin(e.target.value);
                                setShowNyukinSelect(false);
                            }}
                            value={nyukin}
                        >
                            {nyukinOptions.map((opt) => (
                                <option key={opt.code} value={opt.value}>
                                    {opt.code}:{opt.value}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* --- Middle Fields --- */}
            <div className="mx-20 flex justify-center space-x-4 mt-5 font-bold text-black">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                        <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">入金項目</label>
                        <input
                            type="text"
                            defaultValue="現金"
                            className="ml-1 w-1/2 border border-black text-black px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">値引項目</label>
                        <input
                            type="text"
                            defaultValue="値引き"
                            className="ml-1 w-1/2 border border-black text-black px-2 py-1"
                        />
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                        <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">入金金額</label>
                        <input
                            type="text"
                            defaultValue="10,000"
                            className="ml-1 w-1/2 border border-black text-black px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">値引金額</label>
                        <input
                            type="text"
                            defaultValue="0"
                            className="ml-1 w-1/2 border border-black text-black px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">合計金額</label>
                        <input
                            type="text"
                            defaultValue="10,000"
                            className="ml-1 w-1/2 border border-black text-black px-2 py-1"
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

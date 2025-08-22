import { DownArrowIcon } from "../../transaction_information/LeftPanel";
type Props = {
    onClose: () => void;
    onSave: () => void;
};

export default function DepositProcess({ onClose, onSave }: Props) {

    return (
        <div className="flex flex-col w-full border border-black">
            <div className="w-full p-2 grid grid-cols-3  gap-x-4 gap-y-2 whitespace-nowrap font-bold text-black">
                <div className="flex items-center">
                    <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">経理入金日</label>
                    <input
                        type="text"
                        defaultValue="2025/05/01"
                        className="ml-1 w-1/2 border border-black px-2 py-1"
                    />
                    <button
                        className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                    >
                        <DownArrowIcon />
                    </button>
                </div>
                <div className="flex items-center">
                    <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">集金方法</label>
                    <input
                        type="text"
                        defaultValue="集金"
                        className="ml-1 w-1/2 border border-black text-black px-2 py-1"
                    />
                    <button
                        className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                    >
                        <DownArrowIcon />
                    </button>
                </div>
                <div className="flex items-center">
                    <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">入金種別</label>
                    <input
                        type="text"
                        defaultValue="現金"
                        className="ml-1 w-1/2 border border-black px-2 py-1"
                    />
                    <button
                        className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                    >
                        <DownArrowIcon />
                    </button>
                </div>
            </div>
            <div className="mx-20 flex justify-center space-x-4 mt-5 font-bold  text-black">
                <div className="flex flex-col space-y-2 space-evenly">
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
                <div className="flex flex-col space-y-2 space-evenly">
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
            <div className="flex space-x-4 justify-center items-center mx-20 my-5 font-bold  text-black">
                <button className="bg-[#EEEEEE] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
                onClick={onSave}
                >
                    保存登録
                </button>
                <button className="bg-[#5E5E5E] text-[#D0D0D0] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
                onClick={onClose}
                >
                    未入金に戻す
                </button>
            </div>
        </div>
    );

}
import React from "react";

export default function SalesSlipEntry() {
    return (
        <div className="bg-white w-full h-full flex flex-col items-center p-4">
            {/* Header */}
            <div className="w-3/4 border border-black">
                <div className="bg-[#D9D9D9] text-center font-bold border-b border-black py-2">
                    <h1 className="text-[24px] font-bold text-black">
                        売上伝票入力
                    </h1>
                </div>
            </div>

            <div className="mx-60 mt-4">

                {/* Customer Info */}
                <div className="p-2 grid grid-cols-4 gap-x-4 gap-y-2 whitespace-nowrap font-bold text-[16px] text-black border border-black">
                    <div className="flex items-center">
                        <label className="min-w-[90px] bg-[#D9D9D9] px-2 py-1 border border-black text-center">顧客氏名</label>
                        <span className="ml-1 w-32 px-2 py-1">山田太郎</span>
                    </div>
                    <div className="flex items-center">
                        <label className="min-w-[90px] bg-[#D9D9D9] px-2 py-1 border border-black text-center">売上日</label>
                        <input
                            type="text"
                            defaultValue="2025/05/01"
                            className="ml-1 w-32 border border-black px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="min-w-[90px] bg-[#D9D9D9] px-2 py-1 border border-black text-center">品番No.</label>
                        <input
                            type="text"
                            defaultValue="0000000000"
                            className="ml-1 w-32 border border-black text-black px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="min-w-[90px] bg-[#D9D9D9] px-2 py-1 border border-black text-center">伝票No.</label>
                        <input
                            type="text"
                            defaultValue="0000000000"
                            className="ml-1 w-32 border border-black px-2 py-1"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="min-w-[90px] bg-[#D9D9D9] px-2 py-1 border border-black text-center">請求年月</label>
                        <input
                            type="text"
                            defaultValue="2025/05"
                            className="ml-1 w-32 border border-black px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center col-span-3">
                        <label className="min-w-[90px] bg-[#D9D9D9] px-2 py-1 border border-black text-center">担当者</label>
                        <span className="ml-1 w-32 px-2 py-1">営業タロウ</span>
                    </div>
                </div>
                {/* 行追加 */}
                <div className="flex justify-center items-center my-6 font-bold text-[16px] text-black">
                    <button className="bg-[#EEEEEE] border border-black px-8 py-1">
                        行追加
                    </button>
                </div>

                {/* 売上合計 */}
                <div className="flex justify-end font-bold text-[16px] text-black">
                    <div className="flex border border-black p-2 w-80">
                        <div className="flex justify-center items-center">
                            <span className="w-32 bg-[#D9D9D9] px-2 py-1 border border-black text-center">売上合計</span>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between px-2 py-1">
                                <div></div>
                                <div>0　</div>
                            </div>
                            <div className="flex justify-between px-2 py-1">
                                <div>（税</div>
                                <div>０）</div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 入金処理 */}
                <div className="flex justify-center items-center mt-12 font-bold text-[16px] text-black">
                    <button className="bg-[#D9D9D9] border border-black px-12 py-2 rounded">
                        入金処理
                    </button>
                </div>
            </div>


        </div>
    );
}

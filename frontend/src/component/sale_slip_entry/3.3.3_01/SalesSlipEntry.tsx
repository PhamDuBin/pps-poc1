import React from "react";
import { useState } from "react";
import DepositProcess from "./DepositProcess";
import CategorySelectionModal from "./CategorySelectionModal";
import { DownArrowIcon } from "../../transaction_information/LeftPanel";
import ProductSearchModal from "./ProductSearchModal";

export default function SalesSlipEntry() {
  const [labelDeposit, setLabelDeposit] = useState("入金処理");
  const [isDeposited, setIsDeposited] = useState(false);
  const [isOpenCategorySelection, setIsOpenCategorySelection] = useState(false);
  const [isOpenDepositProcess, setIsOpenDepositProcess] = useState(false);
  const [isProductSearchModalOpen, setProductSearchModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsOpenCategorySelection(false);
    setProductSearchModalOpen(true);
  };

  const handleBackToCategory = () => {
    setProductSearchModalOpen(false);
    setIsOpenCategorySelection(true);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col items-center px-4 pt-4 2xl:text-[16px] text-[11px]">
      {/* Header */}
      <div className="w-3/4 border border-black">
        <div className="bg-[#D9D9D9] text-center font-bold border-b border-black py-2">
          <h1 className="text-[24px] font-bold text-black">売上伝票入力</h1>
        </div>
      </div>

      <div className="h-full w-3/5 mx-60 mt-4">
        {/* Customer Info */}
        <div className="w-full p-2 grid lg:grid-cols-4 grid-cols-3  gap-x-4 gap-y-2 whitespace-nowrap font-bold  text-black border border-black">
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 border border-black text-center">
              顧客氏名
            </label>
            <span className="ml-1 w-1/2 px-2 py-1">山田太郎</span>
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 border border-black text-center">
              売上日
            </label>
            <input
              type="text"
              defaultValue="2025/05/01"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
            <button className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer">
              <DownArrowIcon />
            </button>
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 border border-black text-center">
              品番No.
            </label>
            <input
              type="text"
              defaultValue="0000000000"
              className="ml-1 w-1/2 border border-black text-black px-2 py-1"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 border border-black text-center">
              伝票No.
            </label>
            <input
              type="text"
              defaultValue="0000000000"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 border border-black text-center">
              請求年月
            </label>
            <input
              type="text"
              defaultValue="2025/05"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
            <button className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer">
              <DownArrowIcon />
            </button>
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 border border-black text-center">
              担当者
            </label>
            <input
              type="text"
              defaultValue="営業タロウ"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
            <button className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer">
              <DownArrowIcon />
            </button>
          </div>
        </div>
        {/* 行追加 */}
        <div className="flex justify-center items-center my-6 font-bold text-[16px] text-black">
          <button
            className="bg-[#EEEEEE] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
            onClick={() => setIsOpenCategorySelection(true)}
          >
            行追加
          </button>
        </div>

        {/* 売上合計 */}
        <div className="w-full flex justify-end font-bold text-[16px] text-black">
          <div className="flex border border-black p-2 w-80">
            <div className="w-1/2 flex justify-center items-center">
              <span className="bg-[#D9D9D9] px-2 py-1 border border-black text-center">
                売上合計
              </span>
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
      </div>
      <div className="w-3/5 bottom-0 flex justify-center items-center mt-12 font-bold text-[16px] text-black">
        <button
          className="bg-[#D9D9D9] border border-black px-12 py-2 rounded"
          onClick={() => setIsOpenDepositProcess(!isOpenDepositProcess)}
        >
          {labelDeposit}
        </button>
      </div>
      <div className="w-3/5 mt-0">
        {isOpenDepositProcess && (
          <DepositProcess
            isDeposited={isDeposited}
            onClose={() => {
                setIsOpenDepositProcess(false);
                setLabelDeposit("入金処理");
            }}
            onSave={() => {
              setLabelDeposit("入金済み");
              setIsDeposited(true);
              setIsOpenDepositProcess(false);
            }}
          />
        )}
      </div>
      {isOpenCategorySelection && (
        <CategorySelectionModal
          onClose={() => setIsOpenCategorySelection(false)}
          onCategorySelect={handleCategorySelect}
        />
      )}
      {isProductSearchModalOpen && (
        <ProductSearchModal
          isOpen={isProductSearchModalOpen}
          onClose={handleBackToCategory}
          categoryName={selectedCategory}
        />
      )}
    </div>
  );
}

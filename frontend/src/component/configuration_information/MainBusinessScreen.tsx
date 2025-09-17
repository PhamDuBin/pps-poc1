import React, { useState } from "react";
import PaperSelectionModal from "./PaperSelectionModal";

const MainBusinessScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const button =
    "flex text-center justify-center items-center bg-[#D9D9D9] border border-black shadow-xl font-bold";
  const span =
    "w-[10%] flex justify-center text-center items-center font-bold bg-[#D9D9D9]";
  return (
    <div className="h-screen w-full flex flex-col p-4">
      <span className="w-full h-10 font-bold text-2xl flex text-center justify-center items-center bg-[#D9D9D9]">
        請求書発行
      </span>
      <div className="flex flex-row items-center text-base mt-3 h-8 px-8 justify-between">
        <span className={`${span}`}>用紙設定</span>
        <p className="ml-3">伝票請｜請求書（15日）〇〇商社様用</p>
        <button 
          className="p-2 rounded-md border border-black h-6 w-14 text-xs flex text-center justify-center items-center shadow-lg"
          onClick={() => setIsModalOpen(true)}
          >
          再設定
        </button>
        <span className={`${span}`}>フォーム選択</span>
        <select className="border border-black w-[15%] h-6">
          <option>請求書（大）</option>
          <option>請求書（小）</option>
          <option>請求書（小）</option>
          <option>3部料金</option>
          <option>請求書（中）</option>
          <option>請求書（中）3部料金</option>
          <option>請求書（大）レーザー用</option>
          <option>請求書（小） レーザー用</option>
          <option>請求書（小）レーザー用3部料金</option>
          <option>請求書（WS01）</option>
          <option>請求書（W02）</option>
          <option>請求書（WK.01）</option>
        </select>
        <span className={`${span}`}>発行方法</span>
        <div className="flex items-center">
          <input type="radio" id="overall" className="mr-1" />
          <label htmlFor="overall">連続発行</label>
        </div>
        <div className="flex items-center">
          <input type="radio" id="collective" className="mr-1" />
          <label htmlFor="collective">個別発行</label>
        </div>
      </div>
      <div className="mt-3 flex flex-row px-40 font-bold text-lg justify-between h-10">
        <button className={`${button} w-1/6`}>抽出条件 （1）</button>
        <button className={`${button} w-1/6`}>対象顧客（2）</button>
        <button className={`${button} w-1/6`}>印刷指定（3）</button>
        <button className={`${button} w-1/6`}>タイトル・鑑設定（4）</button>
      </div>
      <div className="mt-3 h-[80%] border border-black"></div>
      <div className="mt-2 flex flex-row justify-between">
        <button className={`${button} w-[10%]`}>条件保存（F3）</button>
        <button className={`${button} w-[10%]`}>伝票メモ設定（F7）</button>
        <button className={`${button} w-[10%]`}>再入力（F8）</button>
        <button className={`${button} w-[10%]`}>プレビュー（V）</button>
        <button className={`${button} w-[10%]`}>印刷（P）</button>
        <button className={`${button} w-[10%]`}>データ（H）</button>
        <button className={`${button} w-[10%]`}>閉じる（C）</button>
      </div>
      <PaperSelectionModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default MainBusinessScreen;

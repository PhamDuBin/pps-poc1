"use client";
import React from "react";
interface ModalSearchProps {
  onClose: () => void;
}
export default function SearchModal({ onClose }: ModalSearchProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-400 w-[600px] rounded-md relative p-6">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-lg font-bold px-2 py-1"
          onClick={onClose}
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold mb-4">事業所マスター</h2>

        {/* Header Control */}
        <div className="flex items-center gap-2 mb-4">
          <label className="text-sm font-semibold">事業所ナンバー</label>
          <select className="border border-gray-300 px-2 py-1 text-sm w-20">
            <option>0</option>
          </select>
          <button className="bg-gray-200 px-4 py-1 text-sm font-semibold">
            新規登録
          </button>
        </div>

        <label className="text-sm font-semibold">事業所ナンバー</label>

        {/* Table Box */}
        <div className="border border-gray-400 p-4">
          <div className="flex font-bold text-sm border-b border-gray-300 pb-1 mb-2">
            <div className="w-[40px]">No.</div>
            <div className="w-[60px]">事業所No.</div>
            <div className="flex-1">事業所名</div>
            <div className="w-[120px] text-center">操作</div>
          </div>

          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="flex text-sm items-center py-1 border-b border-dotted border-gray-300"
            >
              <div className="w-[40px]">{i + 1}</div>
              <div className="w-[60px]">00{i + 1}</div>
              <div className="flex-1">〇〇〇事業所</div>
              <div className="w-[120px] flex gap-1 justify-center">
                <button className="bg-gray-200 px-2 py-0.5 text-xs">
                  編集
                </button>
                <button className="bg-gray-200 px-2 py-0.5 text-xs">
                  照会
                </button>
              </div>
            </div>
          ))}
          <div className="text-center mt-2 text-xl">・・・</div>
        </div>
      </div>
    </div>
  );
}

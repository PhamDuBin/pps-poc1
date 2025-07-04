"use client";
import React from "react";

export default function Window3() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0] p-4">
      <div className="border border-gray-400 bg-white w-[400px] h-[180px] flex flex-col items-center justify-center">
        <div className="text-lg font-semibold mb-6">Window_3</div>
        <button
          onClick={() => window.close()}
          className="bg-gray-200 px-6 py-2 text-sm font-semibold rounded-none"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}

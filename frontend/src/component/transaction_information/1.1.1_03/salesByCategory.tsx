import React from "react";
import clsx from "clsx";

const labels = [
  "LPG", "ガス器具", "その他器具・工事", "リース", "大分類5",
  "大分類6", "大分類7", "大分類8", "大分類9", "電力", "割賦金",
  "その他", "", "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "", "", "", "", "合計"
];

function CheckSaleByCategoryScreen() {
  const columns = [0, 1, 2].map(col => labels.slice(col * 11, (col + 1) * 11));

  const labelClass = "bg-gray-300 text-base font-medium w-full max-w-[150px] h-8 flex items-center justify-center";
  const inputClass = "border border-black text-base w-full max-w-[150px] h-8 text-center";

  return (
    <div className="mt-2">
      <div className="bg-gray-300 w-full max-w-4xl h-8 text-center font-semibold text-lg mb-2 leading-8">
        ＜大分類別売上＞
      </div>

      <div className="border border-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-4xl">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="grid p-2 grid-rows-11 mb-1 gap-y-1">
            {col.map((label, rowIndex) => {
              const isHidden = colIndex === 1 && rowIndex === 10;
              const isTotal = label === "合計";
              // const isLastRow = rowIndex === col.length - 1;

              const containerClass = clsx(
                "flex items-center space-x-1",
                isHidden && "invisible",
                
              );

              return (
                <div key={rowIndex} className="relative">
                  {isTotal && (
                    <div className="relative bottom-0.5 left-0 border-t-2 border-black w-full" />
                  )}
                  <div
                    className={containerClass}
                  >
                    
                    <label className={labelClass}>{label}</label>
                    <input type="text" readOnly value="" className={inputClass} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckSaleByCategoryScreen;

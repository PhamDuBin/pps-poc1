import React from "react";

const labels = [
  "LPG", "ガス器具", "その他器具・工事", "リース", "大分類5",
  "大分類6", "大分類7", "大分類8", "大分類9", "電力", "割賦金",   
  "その他", "", "", "", "", "", "", "", "", "",                   
  "", "", "", "", "", "", "", "", "", "", "", "合計"               
];

function CheckSaleByCategoryScreen() {
  const columns = [0, 1, 2].map(col => labels.slice(col * 11, (col + 1) * 11));

  const labelClass = "bg-gray-300 text-base font-medium w-[150px] h-[32px] flex items-center justify-center";
  const inputClass = "border border-black text-base w-[150px] h-[32px] text-center";

  return (
    <div className="mt-2">
      <div className="bg-gray-300 w-[962px] h-[32px] text-center font-semibold text-lg mb-2 leading-[32px]">
        ＜大分類別売上＞
      </div>

      <div className="border border-black grid grid-cols-3 w-[962px]">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="grid p-2 grid-rows-12 gap-y-1">
            {col.map((label, rowIndex) => {
              const isHidden = colIndex === 1 && rowIndex === 10;
              return (
                <div>
                  {(label === '合計')&&(
                    
                      <div className="border-t mb-2 border-rose-600">
                    </div>
                    
                  )} 
                  <div
                  key={rowIndex}
                  className={`flex items-center space-x-1 ${isHidden ? "invisible" : ""}`}>
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

//■03大分類別売上
import clsx from "clsx";

const labels = [
  "LPG",
  "ガス器具",
  "その他器具・工事",
  "リース",
  "大分類5",
  "大分類6",
  "大分類7",
  "大分類8",
  "大分類9",
  "電力",
  "割賦金",
  "その他",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "合計",
];

function CheckSaleByCategoryScreen() {
  const columns = [0, 1, 2].map((col) =>
    labels.slice(col * 11, (col + 1) * 11)
  );

  const labelClass =
    "bg-[#80bad7] text-base font-medium w-full  h-8 flex items-center justify-center bg-[#80bad7]";
  const inputClass =
    "border border-black text-base w-full  h-8 text-center bg-[#ebcec0]";

  return (
    <div className="p-4 w-full">
      <div className="bg-[#80bad7] w-full h-8 text-center font-semibold text-lg mb-2 leading-8 border border-black">
        ＜大分類別売上＞
      </div>

      <div className="border border-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="grid p-2 grid-rows-11 mb-1 gap-y-1">
            {col.map((label, rowIndex) => {
              const isHidden = colIndex === 1 && rowIndex === 10;
              const isTotal = label === "合計";

              const containerClass = clsx(
                "flex items-center space-x-1",
                isHidden && "invisible"
              );

              return (
                <div key={rowIndex} className="relative ">
                  {isTotal && (
                    <div className="relative bottom-0.5 left-0 border-t-2 border-black w-full" />
                  )}
                  <div className={containerClass}>
                    <label className={labelClass}>{label}</label>
                    <input
                      placeholder="0"
                      type="text"
                      readOnly
                      value=""
                      className={inputClass}
                    />
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

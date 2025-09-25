import { Input, Button } from "antd";
import React from "react";

const AreaInfo = () => {
  const headerCellClass =
    "h-6 px-2 bg-[#D9D9D9] font-bold text-center flex items-center justify-center text-sm rounded-md";
  const rowLabelClass =
    "h-6 w-32 px-2 bg-[#D9D9D9] font-bold flex items-center justify-center text-sm rounded-md";

  const rows = ["営業", "検針", "集金", "配送", "点検", "保安"];

  const handleNumericInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    max: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value.slice(0, max);
  };

  return (
    <div className="w-full text-xs">
      <div className="h-8 rounded-md bg-[#D9D9D9] font-bold flex items-center px-3 text-sm">
        担当・地区情報
      </div>

      <div className="mt-3 grid grid-cols-[128px_1fr_1fr_1.5fr] gap-x-4 gap-y-2 items-center p-3">
        <div></div>
        <div className={headerCellClass}>担当者</div>
        <div className={headerCellClass}>地区</div>
        <div className={headerCellClass}>順路</div>

        {rows.map((label) => (
          <React.Fragment key={label}>
            <div className={rowLabelClass}>{label}</div>

            <div className="flex items-center">
              <Input
                className="h-6 w-32 text-center "
                defaultValue={"000000"}
                maxLength={6}
                onChange={(e) => handleNumericInput(e, 6)}
              />
              <Button className="h-6 w-6 p-0 rounded-md shadow-md shadow-zinc-500 ml-2">
                ▼
              </Button>
            </div>

            {label === "保安" ? (
              <>
                <div></div>
                <div></div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <Input
                    className="h-6 w-32 text-center "
                    defaultValue={"000"}
                    maxLength={3}
                    onChange={(e) => handleNumericInput(e, 3)}
                  />
                  <Button className="h-6 w-6 p-0 rounded-md shadow-md shadow-zinc-500 ml-2">
                    ▼
                  </Button>
                </div>

                <div className="flex items-center">
                  <Input
                    className="h-6 w-32 text-center "
                    defaultValue={"0000"}
                    maxLength={4}
                    onChange={(e) => handleNumericInput(e, 4)}
                  />
                  <span className="mx-1">-</span>
                  <Input
                    className="h-6 w-32 text-center "
                    defaultValue={"000"}
                    maxLength={3}
                    onChange={(e) => handleNumericInput(e, 3)}
                  />
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AreaInfo;

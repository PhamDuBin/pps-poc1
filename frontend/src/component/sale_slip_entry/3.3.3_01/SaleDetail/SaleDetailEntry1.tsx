import React, { useEffect, useRef } from "react";
import {
  extractHalfWidthDigits,
  handleFormatting,
  allowDecimalInput,
  convertToFullWidth,
} from "../../../../utils/InputHandlers";
import { handleOpenWindow } from "../../../../constants/functions";
import CustomSelect from "../../../../components/CustomSelect";

interface SaleDetailEntry1Props {
  onChange: (field: string, value: string) => void;
  formData: any;
}

const SaleDetailEntry1: React.FC<SaleDetailEntry1Props> = ({
  onChange,
  formData,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex gap-1 ">
      <div className="flex gap-2 p-1 border border-black h-56">
        <div className=" w-20 text-center">
          <div className="bg-label">数量</div>
          <div>
            <input
              type="text"
              placeholder="000"
              ref={firstInputRef}
              className="w-20 placeholder-black-200 border border-black"
              value={formData.quantity || ""}
              onChange={(e) =>
                onChange("quantity", extractHalfWidthDigits(e.target.value))
              }
              onInput={allowDecimalInput}
            />
          </div>
        </div>
        <div className=" w-14 text-center">
          <div className="bg-label">単位</div>
          <div>
            <input
              type="text"
              placeholder="000"
              className="w-14 placeholder-black-200 border border-black"
              value={formData.unit || ""}
              onChange={(e) =>
                onChange("unit", extractHalfWidthDigits(e.target.value))
              }
              onInput={allowDecimalInput}
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg">
        <div className="grid grid-cols-4 grid-rows-3 gap-2 p-1 border border-black h-56">
          <div className=" text-center h-[64px]">
            <div className="bg-label h-1/2">売上単価</div>
            <div className="h-1/2">
              <input
                type="text"
                placeholder="0.00"
                className="h-full px-1 w-[120px] placeholder-black-200 border border-black"
                value={formData.salesPrice || ""}
                onChange={(e) =>
                  onChange("salesPrice", e.target.value)
                }
                onInput={allowDecimalInput}
              />
            </div>
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">売上単価区分</div>
            <CustomSelect
              value={formData.salesPriceType || "0"}
              onChange={(value) => onChange("salesPriceType", value)}
              options={[
                { value: "0", label: "0 確定単価" },
                { value: "1", label: "1 仮単価" }
              ]}
              className="border border-black w-full h-1/2 bg-white px-2"
            />
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">売上金額</div>
            <input
              type="text"
              placeholder="0"
              className="w-[120px] h-1/2 border px-1 border-black placeholder-black-200"
              value={formData.saleAmount || ""}
              onChange={(e) =>
                onChange("saleAmount", extractHalfWidthDigits(e.target.value))
              }
              onInput={allowDecimalInput}
            />
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">売上消費税</div>
            <input
              type="text"
              placeholder="0"
              className="w-[120px] h-1/2 border px-1 border-black placeholder-black-200"
              value={formData.tax || ""}
              onChange={(e) =>
                onChange("tax", extractHalfWidthDigits(e.target.value))
              }
              onInput={allowDecimalInput}
            />
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">仕入単価</div>
            <input
              type="text"
              placeholder="01234567.00"
              className="w-[120px] h-1/2 border px-1 border-black placeholder-black-200"
              value={formData.purchasePrice || ""}
              onChange={(e) =>
                onChange(
                  "purchasePrice",
                  extractHalfWidthDigits(e.target.value)
                )
              }
              onInput={allowDecimalInput}
            />
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">仕入単価区分</div>
            <CustomSelect
              value={formData.purchasePriceType || "0"}
              onChange={(value) => onChange("purchasePriceType", value)}
              options={[
                { value: "0", label: "0 確定単価" },
                { value: "1", label: "1 仮単価" }
              ]}
              className="border border-black w-full h-1/2 bg-white px-2"
            />
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">仕入金額</div>
            <input
              type="text"
              placeholder="0"
              className="w-[120px] h-1/2 border px-1 border-black placeholder-black-200"
              value={formData.purchaseAmount || ""}
              onChange={(e) =>
                onChange(
                  "purchaseAmount",
                  extractHalfWidthDigits(e.target.value)
                )
              }
              onInput={allowDecimalInput}
            />
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">自振対象</div>
            <CustomSelect
              value={
                formData.selfTransferTarget !== undefined
                  ? String(formData.selfTransferTarget)
                  : "0"
              }
              onChange={(value) => onChange("selfTransferTarget", value)}
              options={[
                { value: "0", label: "0 対象" },
                { value: "1", label: "1 対象外" }
              ]}
              className="border border-black w-full h-1/2 bg-white px-2"
            />
          </div>
          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">当月外</div>
            <CustomSelect
              value={
                formData.outsideMonth !== undefined
                  ? String(formData.outsideMonth)
                  : "0"
              }
              onChange={(value) => onChange("outsideMonth", value)}
              options={[
                { value: "0", label: "0 空欄" },
                { value: "1", label: "1 当月外" }
              ]}
              className="border border-black w-full h-1/2 bg-white px-2"
            />
          </div>
          <div className=" text-center h-[64px] col-span-2 relative">
            <div className="bg-label h-1/2">備考</div>
            <input
              type="text"
              className="w-full h-1/2 border px-1 border-black placeholder-black-200"
              value={formData.note || ""}
              onChange={(e) =>
                onChange("note", convertToFullWidth(e.target.value))
              }
              onKeyDown={(e) => {
                handleFormatting(e, convertToFullWidth);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex w-28 border border-black h-56 items-center justify-center">
        <button
          onClick={handleOpenWindow}
          className="border border-black rounded px-1 shadow-md shadow-zinc-600"
        >
          器具登録
        </button>
      </div>
    </div>
  );
};

export default SaleDetailEntry1;

import React, { useEffect, useRef } from "react";
import { handleOpenWindow } from "../../../../constants/functions";
import { Button, Select } from "antd";
import {
  KanaFullWidthInput,
  HalfWidthNumberInput,
} from "../../../JapaneseInputs";
import type { InputRef } from "antd";

interface SaleDetailEntry5Props {
  onChange: (field: string, value: string) => void;
  formData: any;
}

const SaleDetailEntry5: React.FC<SaleDetailEntry5Props> = ({
  onChange,
  formData,
}) => {
  const firstInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex gap-1 ">
      <div className="flex gap-2 p-1 border border-black h-56">
        <div className=" w-20 text-center h-[64px]">
          <div className="bg-label h-1/2">仕入単価</div>
          <div className="h-1/2">
            <HalfWidthNumberInput
              maxLength={5}
              ref={firstInputRef}
              allowDecimal={true}
              placeholder="0.00"
              className="w-20 h-6 placeholder-black-200"
              value={formData.purchasePrice ?? ""}
              onChange={(e) => onChange("purchasePrice", e)}
            />
          </div>
        </div>
        <div className=" w-14 text-center h-[64px]">
          <div className="bg-label h-1/2">数量</div>
          <div className="h-1/2 ">
            <KanaFullWidthInput
              placeholder="000"
              className="w-14 h-6 placeholder-black-200 "
              value={formData.quantity ?? ""}
              onChange={(e) => onChange("quantity", e)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg">
        <div className="grid grid-cols-4 grid-rows-3 gap-2 p-1 border border-black h-56">
          <div className=" text-center h-[64px]">
            <div className="bg-label h-1/2">売上単価</div>
            <div className="h-1/2">
              <HalfWidthNumberInput
                maxLength={9}
                allowDecimal={true}
                placeholder="01234567.00"
                className="h-full w-[120px] placeholder-black-200"
                value={formData.salesPrice ?? ""}
                onChange={(e) => onChange("salesPrice", e)}
              />
            </div>
          </div>

          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">仕入単価区分</div>
            <Select
              value={
                formData.purchasePriceType !== undefined
                  ? String(formData.purchasePriceType)
                  : "0"
              }
              onChange={(value) => onChange("purchasePriceType", value)}
              options={[
                { value: "0", label: "0 確定単価" },
                { value: "1", label: "1 仮単価" },
              ]}
              className="w-full"
            />
          </div>

          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">仕入金額</div>
            <HalfWidthNumberInput
              maxLength={9}
              placeholder="0"
              className="w-[120px] h-1/2 placeholder-black-200"
              value={formData.purchaseAmount ?? ""}
              onChange={(e) => onChange("purchaseAmount", e)}
            />
          </div>

          <div className="row-span-3 flex items-center justify-center">
            <Button
              onClick={handleOpenWindow}
              className="w-[90px] h-[50px]items-center mt-1 shadow-md shadow-zinc-600"
            >
              貸付設備
            </Button>
          </div>

          <div className=" col-span-3 text-center h-[64px] relative">
            <div className="bg-label h-1/2">経費分類No.</div>
            <div className="flex gap-2">
              <div className="flex w-1/4 relative text-center">
                <Select
                  value={formData.expenseNo ?? "0"}
                  onChange={(value) => onChange("expenseNo", value)}
                  options={[
                    { value: "0", label: "0" },
                    ...Array.from({ length: 10 }, (_, i) => {
                      const value = (i + 1).toString();
                      return { value, label: value };
                    }),
                  ]}
                  className="w-full h-7"
                />
              </div>
              <HalfWidthNumberInput
                className="w-full h-full placeholder-black-200"
                value={formData.expenseText ?? ""}
                onChange={(e) => onChange("expenseText", e)}
              />
            </div>
          </div>

          <div className=" text-center h-[64px] relative">
            <div className="bg-label h-1/2">当月外</div>
            <Select
              value={
                formData.outsideMonth !== undefined
                  ? String(formData.outsideMonth)
                  : "0"
              }
              onChange={(value) => onChange("outsideMonth", value)}
              options={[
                { value: "0", label: "0 空欄" },
                { value: "1", label: "1 当月外" },
              ]}
              className="w-full"
            />
          </div>

          <div className=" text-center h-[64px] col-span-2 relative">
            <div className="bg-label h-1/2">備考</div>
            <KanaFullWidthInput
              className="w-full h-1/2 placeholder-black-200"
              value={formData.note ?? ""}
              onChange={(e) => onChange("note", e)}
            />
          </div>
        </div>
      </div>

      <div className="flex w-28 border border-black h-56 items-center justify-center">
        <Button
          onClick={handleOpenWindow}
          className="shadow-md shadow-zinc-600"
        >
          器具登録
        </Button>
      </div>
    </div>
  );
};

export default SaleDetailEntry5;

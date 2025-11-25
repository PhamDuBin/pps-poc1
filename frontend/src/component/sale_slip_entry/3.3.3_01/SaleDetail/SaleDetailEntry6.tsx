import React, { useEffect, useRef } from "react";
import { handleOpenWindow } from "../../../../constants/functions";
import { Button, Select } from "antd";
import {
  KanaFullWidthInput,
  HalfWidthNumberInput,
} from "../../../JapaneseInputs";
import type { InputRef } from "antd";
interface SaleDetailEntry6Props {
  onChange: (field: string, value: string) => void;
  formData: any;
}

const SaleDetailEntry6: React.FC<SaleDetailEntry6Props> = ({
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
      <div className="flex gap-2 p-1 border border-black h-[150px]">
        {/* 数量 */}
        <div className="w-20 text-center h-[64px]">
          <div className="bg-label h-1/2">数量</div>
          <div className="h-1/2">
            <HalfWidthNumberInput
              ref={firstInputRef}
              maxLength={5}
              allowDecimal={true}
              placeholder="0.00"
              className="w-20 h-6 placeholder-black-200 "
              value={formData.quantity ?? ""}
              onChange={(e) => onChange("quantity", e)}
            />
          </div>
        </div>

        {/* 単位 */}
        <div className="w-14 text-center h-[64px]">
          <div className="bg-label h-1/2">単位</div>
          <div className="h-1/2">
            <KanaFullWidthInput
              placeholder="000"
              className="w-14 h-6 placeholder-black-200 "
              value={formData.unit ?? ""}
              onChange={(e) => onChange("unit", e)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 p-1 border border-black h-[150px]">
          {/* 売上単価 */}
          <div className="text-center h-[64px]">
            <div className="bg-label h-1/2">仕入単価</div>
            <div className="h-1/2">
              <HalfWidthNumberInput
                maxLength={9}
                allowDecimal={true}
                placeholder="01234567.00"
                className="h-full w-[120px] placeholder-black-200 "
                value={formData.purchasePrice ?? ""}
                onChange={(e) => onChange("purchasePrice", e)}
              />
            </div>
          </div>

          {/* 仕入単価区分 */}
          <div className="text-center h-[64px] relative">
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
              className=" w-full h-1/2 "
            />
          </div>

          {/* 仕入金額 */}
          <div className="text-center h-[64px] relative">
            <div className="bg-label h-1/2">仕入金額</div>
            <HalfWidthNumberInput
              maxLength={9}
              placeholder="0"
              className="w-[120px] h-1/2 placeholder-black-200"
              value={formData.purchaseAmount ?? ""}
              onChange={(e) => onChange("purchaseAmount", e)}
            />
          </div>

          {/* 貸付設備 Button */}
          <div className="row-span-2 flex items-end justify-center">
            <Button
              onClick={handleOpenWindow}
              className="w-[90px] h-[50px] shadow-md shadow-zinc-600"
            >
              貸付設備
            </Button>
          </div>

          {/* 当月外 */}
          <div className="text-center h-[64px] relative">
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
              className=" w-full h-1/2 "
            />
          </div>

          {/* 備考 */}
          <div className="text-center h-[64px] col-span-2 relative">
            <div className="bg-label h-1/2">備考</div>
            <KanaFullWidthInput
              className="w-full h-1/2 placeholder-black-200"
              value={formData.note ?? ""}
              onChange={(e) => onChange("note", e)}
            />
          </div>
        </div>
      </div>

      {/* 器具登録 Button */}
      <div className="flex w-28 border border-black h-[150px] items-end justify-center pb-5">
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

export default SaleDetailEntry6;

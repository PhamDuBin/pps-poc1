import React, { useEffect, useRef } from "react";
import { Select } from "antd";
import {
  KanaFullWidthInput,
  HalfWidthNumberInput,
} from "../../../JapaneseInputs";
import type { InputRef } from "antd";

interface SaleDetailEntry3Props {
  onChange: (field: string, value: string) => void;
  formData: any;
}

const SaleDetailEntry3: React.FC<SaleDetailEntry3Props> = ({
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
      <div className="flex gap-2 p-1 border border-black h-40">
        {/* Quantity */}
        <div className="w-20 text-center">
          <div className="bg-label">数量</div>
          <div>
            <HalfWidthNumberInput
              ref={firstInputRef}
              maxLength={5}
              className="w-20 h-7 placeholder-black-200"
              placeholder="(0.00)"
              value={formData.quantity}
              onChange={(e) => {
                onChange("quantity", e);
              }}
            />
          </div>
        </div>
        <div className="w-14 text-center">
          <div className="bg-label">単位</div>
          <div>
            <KanaFullWidthInput
              placeholder="000"
              className="w-14 h-7 placeholder-black-200 "
              value={formData.unit || ""}
              onChange={(e) => onChange("unit", e)}
            />
          </div>
        </div>
      </div>

      {/* Grid on the right */}
      <div className="max-w-lg">
        <div className="h-40 grid grid-cols-4 grid-rows-2 gap-2 p-1 border border-black">
          {/* Sale Amount */}
          <div className="text-center h-[64px]">
            <div className="bg-label h-1/2">売上金額</div>
            <div className="h-1/2">
              <HalfWidthNumberInput
                allowDecimal={true}
                maxLength={9}
                placeholder="0"
                className="h-full w-[120px] placeholder-black-200"
                value={formData.saleAmount || ""}
                onChange={(e) => onChange("saleAmount", e)}
              />
            </div>
          </div>

          {/* Tax */}
          <div className="text-center h-[64px]">
            <div className="bg-label h-1/2">売上消費税</div>
            <HalfWidthNumberInput
              maxLength={8}
              placeholder="0"
              className="w-[120px] h-1/2  placeholder-black-200"
              value={formData.tax || ""}
              onChange={(e) => onChange("tax", e)}
            />
          </div>

          {/* Outside the Month */}
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

          {/* Self Swing Target */}
          <div className="text-center h-[64px] relative">
            <div className="bg-label h-1/2">売上消費税対象</div>
            <Select
              value={
                formData.selfTransferTarget !== undefined
                  ? String(formData.selfTransferTarget)
                  : "0"
              }
              onChange={(value) => onChange("selfTransferTarget", value)}
              options={[
                { value: "0", label: "0 対象" },
                { value: "1", label: "1 対象外" },
              ]}
              className="w-full h-1/2 "
            />
          </div>

          {/* Note */}
          <div className="text-center h-[64px] col-span-2 relative">
            <div className="bg-label h-1/2">備考</div>
            <KanaFullWidthInput
              placeholder="値引き"
              className="w-full h-1/2 placeholder-black-200"
              value={formData.note || ""}
              onChange={(e) => onChange("note", e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailEntry3;

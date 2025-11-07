import React, { useEffect, useRef } from "react";
import {
  allowDecimalInput,
  extractHalfWidthDigits,
} from "../../../../utils/InputHandlers";
import { Select } from "antd";

interface SaleDetailEntry7Props {
  onChange: (field: string, value: string) => void;
  formData: any;
}

const SaleDetailEntry7: React.FC<SaleDetailEntry7Props> = ({
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
    <div className="flex gap-2">
      <div className="h-[64px] w-[100px]">
        <div className="h-1/2 bg-label p-1">商品コード</div>
        <input
          type="text"
          className="h-1/2 w-full border border-black text-center placeholder-black"
          placeholder="96-0001"
          value={formData.productCode ?? ""}
          disabled
        />
      </div>

      <div className="h-[64px] w-[100px]">
        <div className="h-1/2 bg-label p-1">商品名</div>
        <input
          ref={firstInputRef}
          type="text"
          placeholder="消費税"
          className="h-1/2 w-full border border-black text-center"
          value={formData.productName ?? ""}
          onChange={(e) => onChange("productName", e.target.value)}
        />
      </div>

      <div className="h-[64px] w-[100px]">
        <div className="h-1/2 bg-label p-1">型式</div>
        <input
          type="text"
          className="h-1/2 w-full border border-black text-center"
          value={formData.modelNumber ?? ""}
          onChange={(e) => onChange("modelNumber", e.target.value)}
        />
      </div>

      <div className="h-[64px] w-[120px]">
        <div className="h-1/2 bg-label p-1">売上消費税</div>
        <input
          type="text"
          className="h-1/2 w-full border border-black text-center"
          placeholder="0"
          value={formData.tax ?? ""}
          onChange={(e) =>
            onChange("tax", extractHalfWidthDigits(e.target.value))
          }
          onKeyDown={allowDecimalInput}
        />
      </div>

      <div className="h-[64px] w-[120px]">
        <div className="h-1/2 bg-label p-1">自振対象</div>
        <Select
          value={
            formData.selfSwingTarget !== undefined
              ? String(formData.selfSwingTarget)
              : "0"
          }
          onChange={(value) => onChange("selfSwingTarget", value)}
          options={[
            { value: "0", label: "0 対象" },
            { value: "1", label: "1 対象外" }
          ]}
          className="border border-black w-full h-1/2 text-center [&>.ant-select-selector]:!bg-white"
        />
      </div>

      <div className="h-[64px] w-[120px]">
        <div className="h-1/2 bg-label p-1">当月外</div>
        <Select
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
          className="border border-black w-full h-1/2 text-center [&>.ant-select-selector]:!bg-white"
        />
      </div>
    </div>
  );
};

export default SaleDetailEntry7;

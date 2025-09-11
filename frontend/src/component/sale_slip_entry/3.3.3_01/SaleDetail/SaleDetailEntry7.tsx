import React, { useEffect, useRef } from "react";

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
        <div className="h-1/2 bg-[#80bad7] p-1">商品コード</div>
        <input
          ref={firstInputRef}
          type="text"
          className="h-1/2 w-full border border-black text-center"
          placeholder="96-0001"
          value={formData.productCode ?? ""}
          onChange={(e) => onChange("productCode", e.target.value)}
        />
      </div>

      <div className="h-[64px] w-[100px]">
        <div className="h-1/2 bg-[#80bad7] p-1">商品名</div>
        <input
          type="text"
          placeholder="消費税"
          className="h-1/2 w-full border border-black text-center"
          value={formData.productName ?? ""}
          onChange={(e) => onChange("productName", e.target.value)}
        />
      </div>

      <div className="h-[64px] w-[100px]">
        <div className="h-1/2 bg-[#80bad7] p-1">型式</div>
        <input
          type="text"
          className="h-1/2 w-full border border-black text-center"
          value={formData.modelNumber ?? ""}
          onChange={(e) => onChange("modelNumber", e.target.value)}
        />
      </div>

      <div className="h-[64px] w-[120px]">
        <div className="h-1/2 bg-[#80bad7] p-1">売上消費税</div>
        <input
          type="text"
          className="h-1/2 w-full border border-black text-center"
          placeholder="0"
          value={formData.tax ?? ""}
          onChange={(e) => onChange("tax", e.target.value)}
        />
      </div>

      <div className="h-[64px] w-[120px]">
        <div className="h-1/2 bg-[#80bad7] p-1">自振対象</div>
        <select
          className="border border-black w-full h-1/2 text-center"
          value={
            formData.selfSwingTarget !== undefined
              ? String(formData.selfSwingTarget)
              : "0"
          }
          onChange={(e) => onChange("selfSwingTarget", e.target.value)}
        >
          <option value="0">0 対象</option>
          <option value="1">1 対象外</option>
        </select>
      </div>

      <div className="h-[64px] w-[120px]">
        <div className="h-1/2 bg-[#80bad7] p-1">当月外</div>
        <select
          className="border border-black w-full h-1/2 text-center"
          value={
            formData.outsideMonth !== undefined
              ? String(formData.outsideMonth)
              : "0"
          }
          onChange={(e) => onChange("outsideMonth", e.target.value)}
        >
          <option value="0">0 空欄</option>
          <option value="1">1 当月外</option>
        </select>
      </div>
    </div>
  );
};

export default SaleDetailEntry7;

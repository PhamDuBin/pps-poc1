import React, { useEffect, useRef, useState } from "react";

interface SaleDetailEntry3Props {
  onChange: (field: string, value: string) => void;
  formData: any;
}

const SaleDetailEntry3: React.FC<SaleDetailEntry3Props> = ({
  onChange,
  formData,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const [isQuantityFocused, setIsQuantityFocused] = useState(false);
  return (
    <div className="flex gap-1 ">
      <div className="flex gap-2 p-1 border border-black h-40">
        {/* Quantity */}
        <div className="w-20 text-center">
          <div className="bg-[#80bad7]">数量</div>
          <div>
            <input
              ref={firstInputRef}
              type="text"
              className="w-20 text-right border border-black"
              value={
                isQuantityFocused
                  ? formData.quantity || ""
                  : `(${Number(formData.quantity || 0).toFixed(2)})`
              }
              onFocus={() => setIsQuantityFocused(true)}
              onBlur={() => setIsQuantityFocused(false)}
              onChange={(e) => {
                const val = e.target.value;
                const cleaned = val.replace(/[^\d.]/g, "");
                onChange("quantity", cleaned);
              }}
            />
          </div>
        </div>
        <div className="w-14 text-center">
          <div className="bg-[#80bad7]">単位</div>
          <div>
            <input
              type="text"
              placeholder="000"
              className="w-14 placeholder-black-200 border border-black"
              value={formData.unit || ""}
              onChange={(e) => onChange("unit", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid on the right */}
      <div className="max-w-lg">
        <div className="h-40 grid grid-cols-4 grid-rows-2 gap-2 p-1 border border-black">
          {/* Sale Amount */}
          <div className="text-center h-[64px]">
            <div className="bg-[#80bad7] h-1/2">売上金額</div>
            <div className="h-1/2">
              <input
                type="text"
                placeholder="0"
                className="h-full px-1 w-[120px] border border-black placeholder-black-200"
                value={formData.saleAmount || ""}
                onChange={(e) => onChange("saleAmount", e.target.value)}
              />
            </div>
          </div>

          {/* Tax */}
          <div className="text-center h-[64px]">
            <div className="bg-[#80bad7] h-1/2">売上消費税</div>
            <input
              type="text"
              placeholder="0"
              className="w-[120px] h-1/2 border px-1 border-black placeholder-black-200"
              value={formData.tax || ""}
              onChange={(e) => onChange("tax", e.target.value)}
            />
          </div>

          {/* Outside the Month */}
          <div className="text-center h-[64px] relative">
            <div className="bg-[#80bad7] h-1/2">当月外</div>
            <select
              className="border border-black w-full h-1/2"
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

          {/* Self Swing Target */}
          <div className="text-center h-[64px] relative">
            <div className="bg-[#80bad7] h-1/2">売上消費税対象</div>
            <select
              className="border border-black w-full h-1/2"
              value={
                formData.selfTransferTarget !== undefined
                  ? String(formData.selfTransferTarget)
                  : "0"
              }
              onChange={(e) => onChange("selfTransferTarget", e.target.value)}
            >
              <option value="0">0 対象</option>
              <option value="1">1 対象外</option>
            </select>
          </div>

          {/* Note */}
          <div className="text-center h-[64px] col-span-2 relative">
            <div className="bg-[#80bad7] h-1/2">備考</div>
            <input
              type="text"
              placeholder="値引き"
              className="w-full h-1/2 border px-1 border-black placeholder-black-200"
              value={formData.note || ""}
              onChange={(e) => onChange("note", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailEntry3;

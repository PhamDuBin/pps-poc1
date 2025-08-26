import React from "react";

// Map key → label tiếng Nhật
const fieldLabelMap: Record<string, string> = {
  productName: "商品名",
  supplierName: "仕入先",
  supplierCode: "仕入先コード",
  quantity: "数量",
  tax: "消費税",
  note: "備考",
  saleAmount: "売上金額",
  salesPrice: "売上単価",
  discountAmount: "値引金額",
  expenseNo: "経費分類No.",
  purchasePrice: "仕入単価",
  purchaseAmount: "仕入金額",
  supplier:"仕入先 "
};

type HeaderRow = {
  no: string | number;
  icon?: string;
  categoryName: string;
  outsideMonth?: number;
  selfTransferTarget?: number;
};

type BodyRow = {
  titleInfo?: {
    productName?: string;
    // supplierName?: string;
    supplier?: string;
  };
  detailInfo?: {
    quantity?: string;
    tax?: string;
  };
  note?: string;
};

type SalesSlipEntryRegistrationProps = {
  id?: string;
  headerRow: HeaderRow;
  bodyRow: BodyRow;
};

// helper gom các field thành 1 dòng
function renderRow(obj?: Record<string, string | undefined>) {
  if (!obj) return null;
  const items = Object.entries(obj)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${fieldLabelMap[key] || key}: ${value}`);
  return items.length > 0
    ? items.join("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0")
    : null;
}

export default function SalesSlipEntryRegistration({
  headerRow,
  bodyRow,
}: SalesSlipEntryRegistrationProps) {
  return (
    <div
      tabIndex={0}
      role="registmodal"
      className="w-full border border-black rounded-md overflow-hidden shadow-sm mb-4"
    >
      {/* Header */}
      <div className="bg-[#BFE7F5] flex justify-between items-center px-3 py-2 border-b font-semibold text-[14px] text-black">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <span className="text-[16px]">No:{headerRow.no}</span>
          {/* <img src={headerRow.icon} alt="icon" className="w-5 h-5" /> */}
          <span className="bg-white px-2 py-2">Icon</span>
          <span>区分: {headerRow.categoryName.split(".")[1]}</span>
        </div>

        {/* Right side */}
        <div className="flex space-x-2">
          {headerRow.outsideMonth === 1 && (
            <div className="w-20 bg-[#DADADA] text-xs px-2 py-2 rounded text-center whitespace-nowrap flex items-center justify-center">
              当月外
            </div>
          )}
          {headerRow.selfTransferTarget !== undefined && (
            <div className="w-20 bg-[#DADADA] text-xs px-2 py-2 rounded text-center whitespace-nowrap flex items-center justify-center">
              {headerRow.selfTransferTarget === 1 ? "自振対象外" : "自動対象"}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white p-3 text-sm space-y-2 font-normal text-[16px] text-black">
        {renderRow(bodyRow.titleInfo) && (
          <div>{renderRow(bodyRow.titleInfo)}</div>
        )}
        {renderRow(bodyRow.detailInfo) && (
          <div>{renderRow(bodyRow.detailInfo)}</div>
        )}
        {bodyRow.note && (
          <div>{`${fieldLabelMap["note"]}: ${bodyRow.note}`}</div>
        )}
      </div>
    </div>
  );
}

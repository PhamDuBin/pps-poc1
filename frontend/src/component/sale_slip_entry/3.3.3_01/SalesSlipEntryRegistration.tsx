import React from "react";

// Map key → label tiếng Nhật
const fieldLabelMap: Record<string, string> = {
  name: "商品名",
  supplierName: "仕入先",
  quantity: "数量",
  tax: "消費税",
  note: "備考",
};

type HeaderRow = {
  no: string | number;
  icon?: string;
  categoryName: string;
  outsideMonth?: 0 | 1;
  selfTransferTarget?: 0 | 1;
};

type BodyRow = {
  productionInfo?: {
    name?: string;
    supplierName?: string;
    
  };
  detailInfo?: {
    quantity?: string;
    tax?: string;
  };
  note?: string;
};

type SalesSlipEntryRegistrationProps = {
  headerRow: HeaderRow;
  bodyRow: BodyRow;
};

// helper gom các field thành 1 dòng
function renderRow(obj?: Record<string, string | undefined>) {
  if (!obj) return null;
  const items = Object.entries(obj)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => `${fieldLabelMap[key] || key}: ${value}`);
   return items.length > 0 ? items.join("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0") : null;
}

export default function SalesSlipEntryRegistration({
  headerRow,
  bodyRow,
}: SalesSlipEntryRegistrationProps) {
  return (
    <div className="w-full max-w-3xl border border-gray-300 rounded-md overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-blue-100 flex justify-between items-center px-3 py-2 border-b">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <span className="font-bold text-gray-800">No:{headerRow.no}</span>
          {headerRow.icon && <img src={headerRow.icon} alt="icon" className="w-5 h-5" />}
          <span className="font-bold text-gray-800">区分: {headerRow.categoryName}</span>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {headerRow.outsideMonth === 1 && (
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">当月外</span>
          )}
          {headerRow.selfTransferTarget === 1 && (
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">自動対象</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white p-3 text-sm space-y-2">
        {renderRow(bodyRow.productionInfo) && (
          <div>{renderRow(bodyRow.productionInfo)}</div>
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

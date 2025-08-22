import React, { useState } from "react";
import StatusBar from "../StatusBar";
import SaleDetailModal from "./SaleDetail/SaleDetailModal";

interface ProductSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  onNext: () => void; 
}



const mockData = [
  {
    id: 1,
    productCode: "1900004",
    makerCode: "メーカ084",
    no: "KP-20",
    name: "二連二重コンローバー",
    warehouse: "0001-001",
    price: "12,000.00",
    stock: "10.00",
    allocated: "2.00",
    available: "8.00",
  },
  {
    id: 2,
    productCode: "1900004",
    makerCode: "メーカ084",
    no: "KP-20",
    name: "二連二重コンローバー",
    warehouse: "事務所0001-001",
    price: "12,000.00",
    stock: "10.00",
    allocated: "2.00",
    available: "8.00",
  },
  {
    id: 3,
    productCode: "1900004",
    makerCode: "メーカ084",
    no: "KP-20",
    name: "二連二重コンローバー",
    warehouse: "0001-001",
    price: "12,000.00",
    stock: "10.00",
    allocated: "2.00",
    available: "8.00",
  },
  {
    id: 4,
    productCode: "1900004",
    makerCode: "メーカ084",
    no: "KP-20",
    name: "二連二重コンローバー",
    warehouse: "事務所0001-001",
    price: "12,000.00",
    stock: "10.00",
    allocated: "2.00",
    available: "8.00",
  },
];

const fieldDefinitions = [
  {
    id: "0",
    selectLabel: "0中分類+小分類+メーカ",
    type: "multi-labeled",
    parts: [
      { label: "中分類", placeholder: "000", options: ["000", "001", "002"] },
      { label: "小分類", placeholder: "00", options: ["00", "01", "02"] },
      { label: "メーカ", placeholder: "000", options: ["000", "001", "002"] },
    ],
  },
  { id: "1", selectLabel: "1商品コード", label: "商品コード", type: "single" },
  { id: "2", selectLabel: "2商品名", label: "2商品名", type: "single" },
  { id: "3", selectLabel: "3型式", label: "型式", type: "single" },
  {
    id: "4",
    selectLabel: "4商品名+型式",
    label: "商品名+型式",
    type: "single",
  },
  {
    id: "5",
    selectLabel: "5商品名+メーカー名",
    label: "商品名+メーカー名",
    type: "single",
  },
] as const;

type FieldId = (typeof fieldDefinitions)[number]["id"];
type FormValues = { [key in FieldId]?: string | string[] };

const AdvancedSearchForm: React.FC = () => {
  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
    fieldDefinitions[2].id
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const currentField = fieldDefinitions.find((f) => f.id === selectedFieldId);

  const handleValueChange = (value: string, index: number | null = null) => {
    if (!currentField) return;

    let newValues: string | string[];
    if (currentField.type === "multi-labeled") {
      const existingValues = Array.isArray(formValues[selectedFieldId])
        ? [...(formValues[selectedFieldId] as string[])]
        : [];
      if (index !== null) {
        existingValues[index] = value;
      }
      newValues = existingValues;
    } else {
      newValues = value;
    }
    setFormValues((prev) => ({ ...prev, [selectedFieldId]: newValues }));
  };

  const renderDynamicInput = () => {
    if (!currentField) return null;
    const value = formValues[currentField.id];

    switch (currentField.type) {
      case "multi-labeled":
        return (
          <div className="flex items-stretch gap-2 border border-gray-400 p-2 h-[64px]">
            {currentField.parts.map((part, index) => (
              <div key={index} className="flex flex-col flex-grow">
                <label className="text-center text-sm bg-gray-300 border border-gray-400 px-2">
                  {part.label}
                </label>
                <select
                  className="border border-gray-400 rounded-sm h-full px-2 bg-white"
                  value={(Array.isArray(value) && value[index]) || ""}
                  onChange={(e) => handleValueChange(e.target.value, index)}
                >
                  <option value="">{part.placeholder}</option>
                  {part.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      case "single":
      default:
        return (
          <div className="border border-gray-400 h-[64px] flex flex-col">
            <label className="text-center text-sm bg-gray-300 border-b border-gray-400 px-2">
              {currentField.label}
            </label>
            <input
              type="text"
              className="p-1 w-full h-full bg-white rounded-b-sm"
              value={(typeof value === "string" && value) || ""}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-200 border border-gray-400 rounded p-3 flex items-start gap-4">
      <div className="flex flex-col">
        <label className="text-center text-sm bg-gray-300 border border-gray-400 px-2 h-[28px]">
          検索種類
        </label>
        <select
          className="border border-gray-400 p-2 bg-white h-[36px]"
          value={selectedFieldId}
          onChange={(e) => setSelectedFieldId(e.target.value as FieldId)}
        >
          {fieldDefinitions.map((field) => (
            <option key={field.id} value={field.id}>
              {field.selectLabel}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow">{renderDynamicInput()}</div>

      <div className="flex flex-col gap-1 h-[64px]">
        <button className="bg-gray-300 border border-gray-500 rounded px-8 font-bold hover:bg-gray-400 h-[30px]">
          検索
        </button>
        <button className="bg-gray-300 border border-gray-500 rounded px-8 font-bold hover:bg-gray-400 h-[30px]">
          再入力
        </button>
      </div>
    </div>
  );
};

const ProductSearchModal: React.FC<ProductSearchModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  onNext,
}) => {

  const [currentStep, setCurrentStep] = useState(1);
  

  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      {/* Modal Panel */}
      <div className="bg-gray-100 rounded-lg shadow-xl p-5 border border-gray-300 w-[840px] h-[650px]">
        {/* 1. Status Bar & Title */}
        <div className="w-full flex items-center justify-between">
          {/* Button */}
          <button className="flex items-center justify-center mb-8">
            <span className="text-black border bg-[#D9D9D9] p-4">
              {categoryName}
            </span>
          </button>

          {/* StatusBar + Title */}
          <div className="flex-1 flex flex-col items-center justify-center mr-24">
            <div className="w-1/2">
              <StatusBar currentStep={2} />
            </div>
          </div>
        </div>
        
        {/* 2. Search Form */}
        <AdvancedSearchForm />

        <div className="flex flex-row mt-2">
          <div className="flex items-center gap-2 mr-4">
            <label className="bg-gray-300 p-2 rounded w-28 text-center text-sm font-bold">
              現在庫数ゼロ
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="stock" className="mr-1" /> 表示する
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stock"
                  className="mr-1"
                  defaultChecked
                />
                表示しない
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="bg-gray-300 p-2 rounded w-28 text-center text-sm font-bold">
              倉庫
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="warehouse"
                  className="mr-1"
                  defaultChecked
                />
                自倉庫
              </label>
              <label className="flex items-center">
                <input type="radio" name="warehouse" className="mr-1" />
                全倉庫
              </label>
            </div>
          </div>
        </div>

        {/* 3. Results Table */}
        <div className="mt-4 h-64 overflow-y-auto border border-gray-400">
          <table className="w-full text-sm border-collapse bg-white">
            <thead className="sticky top-0 bg-gray-300">
              <tr>
                <th className="border border-gray-400 p-2">
                  商品コード/メーカ
                </th>
                <th className="border border-gray-400 p-2">No.</th>
                <th className="border border-gray-400 p-2 w-1/4">
                  商品名/型式
                </th>
                <th className="border border-gray-400 p-2">倉庫</th>
                <th className="border border-gray-400 p-2">仕入単価</th>
                <th className="border border-gray-400 p-2">現在庫数</th>
                <th className="border border-gray-400 p-2">引当数</th>
                <th className="border border-gray-400 p-2">引当可能</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50">
                  <td className="border-b border-gray-300 p-2">
                    {item.productCode}
                    <br />
                    {item.makerCode}
                  </td>
                  <td className="border-b border-gray-300 p-2">{item.no}</td>
                  <td className="border-b border-gray-300 p-2">{item.name}</td>
                  <td className="border-b border-gray-300 p-2">
                    {item.warehouse}
                  </td>
                  <td className="border-b border-gray-300 p-2 text-right">
                    {item.price}
                  </td>
                  <td className="border-b border-gray-300 p-2 text-right">
                    {item.stock}
                  </td>
                  <td className="border-b border-gray-300 p-2 text-right">
                    {item.allocated}
                  </td>
                  <td className="border-b border-gray-300 p-2 text-right">
                    {item.available}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Footer Actions */}
        <div className="mt-4">
          <div className="flex gap-2">
            <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
              F5引当済状況
            </button>
            <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
              F6在庫詳細表示
            </button>
          </div>
        </div>
        <div className="flex gap-4 w-full justify-center items-center">
          <button
            onClick={onClose}
            className="bg-gray-300 border border-gray-500 rounded px-10 py-2 font-bold hover:bg-gray-400"
          >
            戻る (R)
          </button>
          <button
          onClick={onNext}
          className="bg-gray-300 border border-gray-500 rounded px-10 py-2 font-bold hover:bg-gray-400">
            選択 (N)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchModal;

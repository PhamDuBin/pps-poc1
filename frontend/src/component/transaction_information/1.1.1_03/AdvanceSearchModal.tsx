import React, { useState } from "react";

const fieldDefinitions = [
  { id: "allTel", label: "ALL電話番号", type: "single" },
  {
    id: "customerCode",
    label: "顧客コード",
    type: "multi",
    partSizes: [45, 35, 65, 35],
  },
  { id: "searchCode1", label: "検索コード１", type: "single" },
  { id: "kanaName", label: "カナ氏名", type: "single" },
  { id: "securityCode", label: "保安機関コード", type: "dropdown" },
  { id: "searchCode2", label: "検索コード２", type: "single" },
  { id: "tel1", label: "電話番号１", type: "single" },
  {
    id: "meterRouteCode",
    label: "検針順コード",
    type: "multi",
    partSizes: [50, 40, 40],
  },
  {
    id: "keroseneCode",
    label: "灯油配達順コード",
    type: "multi",
    partSizes: [50, 40, 40],
  },
  { id: "tel2", label: "電話番号２", type: "single" },
  {
    id: "deliveryRouteCode",
    label: "配送順コード",
    type: "multi",
    partSizes: [50, 40, 40],
  },
  {
    id: "salesRepCode",
    label: "営業順コード",
    type: "multi",
    partSizes: [50, 40, 40],
  },
  { id: "tel3", label: "電話番号３", type: "single" },
  {
    id: "gMeterCode",
    label: "点検順コード",
    type: "multi",
    partSizes: [50, 40, 40],
  },
  {
    id: "chimneyCode",
    label: "集金順コード",
    type: "multi",
    partSizes: [50, 40, 40],
  },
  {
    id: "addressName",
    label: "住所＋カナ",
    type: "double",
    placeholders: ["住所", "カナ氏名"],
  },
  {
    id: "managementCenterCode",
    label: "集中管理センターコード",
    type: "dropdown",
  },
  { id: "deliveryCenterCode", label: "配送センターコード", type: "dropdown" },
  {
    id: "addressName",
    label: "住所名称＋カナ",
    type: "double",
    placeholders: ["住所名称", "カナ氏名"],
  },
  { id: "gasMeterSerial", label: "ガスメータ製造番号", type: "single" },
] as const;

type FieldId = (typeof fieldDefinitions)[number]["id"];
type FormValues = { [key in FieldId]?: string | string[] };

const AdvancedSearchForm: React.FC = () => {
  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
    fieldDefinitions[0].id
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const currentField = fieldDefinitions.find((f) => f.id === selectedFieldId);

  const handleValueChange = (
    value: string,
    index: number | null = null
  ): void => {
    if (!currentField) return;
    let newValues =
      formValues[selectedFieldId] ||
      (currentField.type === "multi" || currentField.type === "double"
        ? []
        : "");
    if (
      currentField.type === "multi" ||
      currentField.type === "double" ||
      currentField.type === "dropdown"
    ) {
      let tempArray: string[];
      if (Array.isArray(newValues)) {
        tempArray = [...newValues];
      } else {
        tempArray = currentField.type === "dropdown" ? ["0", ""] : [];
      }
      if (index !== null) {
        tempArray[index] = value;
      }
      newValues = tempArray;
    } else {
      newValues = value;
    }
    setFormValues((prev) => ({ ...prev, [selectedFieldId]: newValues }));
  };

  const renderDynamicInput = (): React.ReactNode => {
    if (!currentField) return null;
    const value = formValues[currentField.id];
    switch (currentField.type) {
      case "multi":
        return (
          <div className="flex items-center space-x-1">
            {currentField.partSizes?.map((size, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  placeholder="000"
                  className="border border-black p-1 text-center placeholder-black"
                  style={{ width: `${size}px` }}
                  value={(Array.isArray(value) && value[index]) || ""}
                  onChange={(e) => handleValueChange(e.target.value, index)}
                />
                {index < currentField.partSizes.length - 1 && <span>-</span>}
              </React.Fragment>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <div className="flex items-center space-x-1">
            <input
              type="text"
              className="border border-black p-1 placeholder-black w-[40px]"
              placeholder="0"
            />
            <span> - </span>
            <input
              type="text"
              className="border border-black p-1 flex-1"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 1)}
            />
          </div>
        );
      case "double":
        return (
          <div className="flex flex-col space-y-1">
            <div className=" bg-gray-300 flex text-center justify-center p-1">
              {currentField.placeholders?.[0]}
            </div>
            <input
              type="text"
              className="border border-gray-400 p-1 placeholder-black"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 0)}
            />
            <div className=" bg-gray-300 flex text-center justify-center p-1">
              {currentField.placeholders?.[1]}
            </div>
            <input
              type="text"
              className="border border-gray-400 p-1 placeholder-black"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 1)}
            />
          </div>
        );
      default:
        return (
          <input
            type="text"
            className="border border-black p-1 w-full"
            value={(typeof value === "string" && value) || ""}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="flex items-start space-x-2 mt-2 p-3 border z-30 border-black rounded-md bg-gray-50">
      <div className="flex flex-col">
        <label className="text-xs  font-semibold text-gray-600 mb-1">
          検索種類 / 検索順
        </label>
        <select
          className="border border-black p-1"
          value={selectedFieldId}
          onChange={(e) => setSelectedFieldId(e.target.value as FieldId)}
        >
          {fieldDefinitions.map((field) => (
            <option key={field.id} value={field.id}>
              {field.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow">
        <label className="flex text-center justify-center text-xs font-semibold mb-1 p-1 bg-[#80bad7] ">
          {currentField?.label}
        </label>
        {renderDynamicInput()}
      </div>

      <div className="flex flex-col space-y-1">
        <button className="bg-[#80bad7] border border-black px-4 py-1 h-[26px] flex items-center justify-center">
          検索
        </button>
        <button className="bg-[#80bad7] border border-black px-4 py-1 h-[26px] flex items-center justify-center">
          再入力
        </button>
      </div>
    </div>
  );
};

const AdvanceSearchModal: React.FC<{
  showAdvanceSearch: boolean;
  setShowAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showAdvanceSearch, setShowAdvanceSearch }) => {
  const [searchMode, setSearchMode] = useState<string>("overall");
  const tableData = Array.from({ length: 12 }).map(() => ({
    kanaName: "cell",
    name: "cell",
    address: "cell",
    building: "cell",
  }));

  return (
    <div className="p-4 bg-white text-black w-full text-sm">
      <div className="bg-[#80bad7] border border-black p-2 text-center font-bold mb-2">
        顧客検索
      </div>
      <div className="flex items-center space-x-6 bg-[#80bad7]  p-2 border border-black">
        <div className="flex items-center space-x-2">
          <label className="font-semibold">事務所</label>
          <span>0000-000 全指定</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="overall"
              name="searchMode"
              value="overall"
              checked={searchMode === "overall"}
              onChange={(e) => setSearchMode(e.target.value)}
              className="mr-1"
            />
            <label htmlFor="overall">全体検索</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="collective"
              name="searchMode"
              value="collective"
              checked={searchMode === "collective"}
              onChange={(e) => setSearchMode(e.target.value)}
              className="mr-1"
            />
            <label htmlFor="collective">集合検索</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="bulk"
              name="searchMode"
              value="bulk"
              checked={searchMode === "bulk"}
              onChange={(e) => setSearchMode(e.target.value)}
              className="mr-1"
            />
            <label htmlFor="bulk">バルク</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="kerosene"
              name="searchMode"
              value="kerosene"
              checked={searchMode === "kerosene"}
              onChange={(e) => setSearchMode(e.target.value)}
              className="mr-1"
            />
            <label htmlFor="kerosene">灯油</label>
          </div>
        </div>
      </div>

      <AdvancedSearchForm />

      <div
        className="overflow-auto border border-black mt-2"
        style={{ height: "200px" }}
      >
        <table className="min-w-full border-collapse border border-black text-sm">
          <thead className="sticky top-0 bg-[#80bad7]">
            <tr>
              <th className="border border-black p-1">カナ氏名</th>
              <th className="border border-black p-1">氏名</th>
              <th className="border border-black p-1">住所 / 番地</th>
              <th className="border border-black p-1">住所名称 / 部屋番号</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="hover:bg-blue-50">
                <td className="bg-[#ebcec0] border border-black p-1">
                  {row.kanaName}
                </td>
                <td className="bg-[#ebcec0] border border-black p-1">
                  {row.name}
                </td>
                <td className="bg-[#ebcec0] border border-black p-1">
                  {row.address}
                </td>
                <td className="bg-[#ebcec0] border border-black p-1">
                  {row.building}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowAdvanceSearch(false);
          }}
          className="w-20 border border-black bg-[#80bad7] px-2 py-1 flex mt-2 justify-center"
        >
          請求額
        </button>
      </div>
    </div>
  );
};

export default AdvanceSearchModal;

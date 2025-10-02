import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, DatePicker, Select, Input, Table } from "antd";
import dayjs from "dayjs";
import FamilyInfoModal from "../FamilyInfoModal";
import { inputColor, labelColor, hoverInputColor, focusInputColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";

const workingCoupleOptions = [
  { code: "0", label: "0 空欄" },
  { code: "1", label: "1 共働き" },
];

const housingTypeOptions = [
  { code: "0", label: "00:空白" },
  { code: "1", label: "01:戸建て" },
  { code: "2", label: "02:3LDK" },
  { code: "3", label: "03:3DK" },
  { code: "4", label: "04:2LDK" },
  { code: "5", label: "05:2DK" },
  { code: "6", label: "06:1ルーム" },
  { code: "20", label: "20:その他" },
];

const relationshipOptions = [
  { code: "0", label: "0:空欄" },
  { code: "1", label: "1:A" },
  { code: "2", label: "2:B" },
  { code: "3", label: "3:C" },
  { code: "4", label: "4:D" },
];

const freeDescriptionOptions = [
  { code: "0", label: "0:空欄" },
  { code: "1", label: "1:null" },
  { code: "2", label: "2:null" },
  { code: "3", label: "3:null" },
  { code: "4", label: "4:null" },
  { code: "5", label: "5:null" },
  { code: "6", label: "6:null" },
  { code: "7", label: "7:null" },
  { code: "8", label: "8:null" },
  { code: "9", label: "9:null" },
];

const familyData = [
  {
    id: 1,
    relation: "父",
    name: "テスト氏名1",
    gender: "男性",
    dob: "1980/01/01",
    job: "会社員",
    health: "その他",
    hobby: "マリンスポーツ",
  },
  {
    id: 2,
    relation: "母",
    name: "テスト氏名2",
    gender: "女性",
    dob: "1982/05/10",
    job: "主婦",
    health: "良好",
    hobby: "読書",
  },
  {
    id: 3,
    relation: "長男",
    name: "テスト氏名3",
    gender: "男性",
    dob: "2010/11/20",
    job: "学生",
    health: "良好",
    hobby: "ゲーム",
  },
];
const initialFamilyData = [
  {
    id: 1,
    relation: "父",
    name: "テスト氏名1",
    gender: "男性",
    dob: "1980/01/01",
    job: "会社員",
    health: "その他",
    hobby: "マリンスポーツ",
  },
  {
    id: 2,
    relation: "母",
    name: "テスト氏名2",
    gender: "女性",
    dob: "1982/05/10",
    job: "主婦",
    health: "良好",
    hobby: "読書",
  },
  {
    id: 3,
    relation: "長男",
    name: "テスト氏名3",
    gender: "男性",
    dob: "2010/11/20",
    job: "学生",
    health: "良好",
    hobby: "ゲーム",
  },
];

const FamilyInfo = forwardRef<any, { showData: boolean }>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<any>(null);
  const { showData } = props;
  const isFormDisabled = !showData;

  // --- State Management ---
  const [formValues, setFormValues] = useState({
    residenceDate: dayjs(),
    workingCoupleType: "0",
    housingType: "0",
    businessRelationship: "0",
    creditStatus: "0",
    purchasingPower: "0",
    lifestyle: "0",
    overallRank: "0",
    freeDescription: "0",
  });
  const [familyData, setFamilyData] = useState(initialFamilyData);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const handleValueChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstInputRef.current?.focus();
    },
  }));

  const handleOpenAddModal = () => {
    setEditingRow(null);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (row: any, index: number) => {
    setEditingRow(row);
    setSelectedRowIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = (newData: any) => {
    if (newData.id) {
      setFamilyData((prev) =>
        prev.map((row) => (row.id === newData.id ? newData : row))
      );
    } else {
      const newEntry = { ...newData, id: Date.now() };
      setFamilyData((prev) => [newEntry, ...prev]);
      setSelectedRowIndex(0);
    }
    setIsModalOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedRowIndex === null) return;

      let newIndex = selectedRowIndex;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        newIndex = Math.min(selectedRowIndex + 1, familyData.length - 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        newIndex = Math.max(selectedRowIndex - 1, 0);
      }
      setSelectedRowIndex(newIndex);
    };
    const tableBody = rowRefs.current[0]?.parentElement;
    tableBody?.addEventListener("keydown", handleKeyDown);

    return () => {
      tableBody?.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRowIndex, familyData.length]);
  useEffect(() => {
    if (selectedRowIndex !== null) {
      rowRefs.current[selectedRowIndex]?.focus();
    }
  }, [selectedRowIndex]);
  const labelClass = `w-32 mr-2 h-6 border-gray-300 rounded-md font-bold flex text-center justify-center items-center ${labelColor}`;
  const inputCodeClass = `${inputColor} border border-black h-6 w-14 text-center`;

  // --- JSX ---
  return (
    <div onKeyDown={blockTab} className="w-full text-xs">
      <div
        className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}
      >
        家族情報
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        <div className="flex items-center">
          <label className={labelClass}>居住年月</label>
          <DatePicker
            ref={firstInputRef}
            picker="month"
            value={formValues.residenceDate}
            onChange={(date) => handleValueChange("residenceDate", date)}
            className={`h-6 w-32 !bg-[#ebcec0]`}
            format="YYYY/MM"
            disabled={isFormDisabled}
          />
        </div>
        <div className="flex items-center">
          <label className={labelClass}>共働き区分</label>
          <CodeInputSelect
            options={workingCoupleOptions}
            value={formValues.workingCoupleType}
            onChange={(value) => handleValueChange("workingCoupleType", value)}
            disabled={isFormDisabled}
          />
        </div>

        <div className="flex items-center">
          <label className={labelClass}>住居タイプ</label>
          <div className="w-4/5">
            <CodeInputSelect
              options={housingTypeOptions}
              value={formValues.housingType}
              onChange={(value) => handleValueChange("housingType", value)}
              disabled={isFormDisabled}
            />
          </div>
          
        </div>
        <div className="flex items-center">
          <label className={labelClass}>取引関係</label>
          <CodeInputSelect
            options={relationshipOptions}
            value={formValues.businessRelationship}
            onChange={(value) =>
              handleValueChange("businessRelationship", value)
            }
            disabled={isFormDisabled}
          />
        </div>
        <div className="flex items-center">
          <label className={labelClass}>信用状況</label>
          <div className="w-4/5">
            <CodeInputSelect
              options={relationshipOptions}
              value={formValues.creditStatus}
              onChange={(value) => handleValueChange("creditStatus", value)}
              disabled={isFormDisabled}
            />
          </div>
          
        </div>
        <div className="flex items-center">
          <label className={labelClass}>購買力</label>

          <CodeInputSelect
            options={relationshipOptions}
            value={formValues.purchasingPower}
            onChange={(value) => handleValueChange("purchasingPower", value)}
            disabled={isFormDisabled}
          />
        </div>

        <div className="flex items-center">
          <label className={labelClass}>生活行動</label>
          <div className="w-4/5">
            <CodeInputSelect
              options={relationshipOptions}
              value={formValues.lifestyle}
              onChange={(value) => handleValueChange("lifestyle", value)}
              disabled={isFormDisabled}
            />
          </div>
          
        </div>
        <div className="flex items-center">
          <label className={labelClass}>総合ランク</label>
          <CodeInputSelect
            options={relationshipOptions}
            value={formValues.overallRank}
            onChange={(value) => handleValueChange("overallRank", value)}
            disabled={isFormDisabled}
          />
        </div>

        <div className="flex items-center ">
          <label className={labelClass}>自由記述要素</label>
          <div className="w-4/5">
            <CodeInputSelect
              options={freeDescriptionOptions}
              value={formValues.freeDescription}
              onChange={(value) => handleValueChange("freeDescription", value)}
              disabled={isFormDisabled}
            />
          </div>
          
        </div>
      </div>
      <div className="px-3 pb-2">
        <Button
          onClick={handleOpenAddModal}
          className={`text-xs shadow-md shadow-zinc-600 px-3 py-1 ${labelColor}`}
          disabled={isFormDisabled}
        >
          家族情報追加
        </Button>
      </div>
      <div className="overflow-x-auto px-3 pb-3">
        <table className="w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              {[
                "関係",
                "家族氏名",
                "性別",
                "生年月日",
                "職業",
                "健康関連",
                "趣味",
              ].map((h) => (
                <th
                  key={h}
                  className={`border border-gray-400 ${labelColor} px-2 py-1`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {familyData.map((row, index) => (
              <tr
                key={row.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                tabIndex={0}
                className={`cursor-pointer ${inputColor} hover:bg-gray-100 focus:bg-blue-200 focus:outline-none ${
                  selectedRowIndex === index ? "bg-blue-200" : ""
                }`}
                onDoubleClick={() => handleOpenEditModal(row, index)}
                onFocus={() => setSelectedRowIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleOpenEditModal(row, index);
                  }
                }}
              >
                {showData && (
                  <>
                    <td className="border border-gray-400 px-2">
                      {row.relation}
                    </td>
                    <td className="border border-gray-400 px-2">{row.name}</td>
                    <td className="border border-gray-400 px-2">
                      {row.gender}
                    </td>
                    <td className="border border-gray-400 px-2">{row.dob}</td>
                    <td className="border border-gray-400 px-2">{row.job}</td>
                    <td className="border border-gray-400 px-2">
                      {row.health}
                    </td>
                    <td className="border border-gray-400 px-2">{row.hobby}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FamilyInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingRow}
      />
    </div>
  );
});

export default FamilyInfo;

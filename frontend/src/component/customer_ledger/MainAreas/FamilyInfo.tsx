import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";
import FamilyInfoModal from "../FamilyInfoModal";
import { inputColor, labelColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";

const { Option } = Select;

const workingCoupleOptions = [
  { value: "0", label: "0 空欄" },
  { value: "1", label: "1 共働き" },
];

const housingTypeOptions = [
  { value: "0", label: "00:空白" },
  { value: "1", label: "01:戸建て" },
  { value: "2", label: "02:3LDK" },
  { value: "3", label: "03:3DK" },
  { value: "4", label: "04:2LDK" },
  { value: "5", label: "05:2DK" },
  { value: "6", label: "06:1ルーム" },
  { value: "20", label: "20:その他" },
];

const relationshipOptions = [
  { value: "0", label: "0:空欄" },
  { value: "1", label: "1:A" },
  { value: "2", label: "2:B" },
  { value: "3", label: "3:C" },
  { value: "4", label: "4:D" },
];

const freeDescriptionOptions = [
  { value: "0", label: "0:空欄" },
  { value: "1", label: "1:null" },
  { value: "2", label: "2:null" },
  { value: "3", label: "3:null" },
  { value: "4", label: "4:null" },
  { value: "5", label: "5:null" },
  { value: "6", label: "6:null" },
  { value: "7", label: "7:null" },
  { value: "8", label: "8:null" },
  { value: "9", label: "9:null" },
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

const FamilyInfo = forwardRef<any>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<any>(null);

  // --- State Management ---
  const [formValues, setFormValues] = useState({
    residenceDate: dayjs(),
    workingCoupleType: "0",
    housingType: "00",
    businessRelationship: "0",
    creditStatus: "0",
    purchasingPower: "0",
    lifestyle: "0",
    overallRank: "0",
    freeDescription: "0",
  });

  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const handleValueChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstInputRef.current?.focus();
    },
  }));

  const handleOpenModal = () => setIsModalOpen((prev) => !prev);

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
          />
        </div>
        <div className="flex items-center">
          <label className={labelClass}>共働き区分</label>
          <Input
            className={inputCodeClass}
            value={formValues.workingCoupleType}
            onChange={(e) =>
              handleValueChange("workingCoupleType", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("workingCoupleType");
              }
            }}
          />
          <Select
            value={formValues.workingCoupleType}
            onChange={(value) => handleValueChange("workingCoupleType", value)}
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "workingCoupleType"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "workingCoupleType" : null)
            }
          >
            {workingCoupleOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex items-center">
          <label className={labelClass}>住居タイプ</label>
          <Input
            className={inputCodeClass}
            value={formValues.housingType}
            onChange={(e) => handleValueChange("housingType", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("housingType");
              }
            }}
          />
          <Select
            value={formValues.housingType}
            onChange={(value) => handleValueChange("housingType", value)}
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "housingType"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "housingType" : null)
            }
          >
            {housingTypeOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <label className={labelClass}>取引関係</label>
          <Input
            className={inputCodeClass}
            value={formValues.businessRelationship}
            onChange={(e) =>
              handleValueChange("businessRelationship", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("businessRelationship");
              }
            }}
          />
          <Select
            value={formValues.businessRelationship}
            onChange={(value) =>
              handleValueChange("businessRelationship", value)
            }
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "businessRelationship"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "businessRelationship" : null)
            }
          >
            {relationshipOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <label className={labelClass}>信用状況</label>
          <Input
            className={inputCodeClass}
            value={formValues.creditStatus}
            onChange={(e) => handleValueChange("creditStatus", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("creditStatus");
              }
            }}
          />
          <Select
            value={formValues.creditStatus}
            onChange={(value) => handleValueChange("creditStatus", value)}
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "creditStatus"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "creditStatus" : null)
            }
          >
            {relationshipOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <label className={labelClass}>購買力</label>
          <Input
            className={inputCodeClass}
            value={formValues.purchasingPower}
            onChange={(e) =>
              handleValueChange("purchasingPower", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("purchasingPower");
              }
            }}
          />
          <Select
            value={formValues.purchasingPower}
            onChange={(value) => handleValueChange("purchasingPower", value)}
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "purchasingPower"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "purchasingPower" : null)
            }
          >
            {relationshipOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex items-center">
          <label className={labelClass}>生活行動</label>
          <Input
            className={inputCodeClass}
            value={formValues.lifestyle}
            onChange={(e) => handleValueChange("lifestyle", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("lifestyle");
              }
            }}
          />
          <Select
            value={formValues.lifestyle}
            onChange={(value) => handleValueChange("lifestyle", value)}
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "lifestyle"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "lifestyle" : null)
            }
          >
            {relationshipOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <label className={labelClass}>総合ランク</label>
          <Input
            className={inputCodeClass}
            value={formValues.overallRank}
            onChange={(e) => handleValueChange("overallRank", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("overallRank");
              }
            }}
          />
          <Select
            value={formValues.overallRank}
            onChange={(value) => handleValueChange("overallRank", value)}
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "overallRank"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "overallRank" : null)
            }
          >
            {relationshipOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex items-center col-span-2">
          <label className={labelClass}>自由記述要素</label>
          <Input
            className={inputCodeClass}
            value={formValues.freeDescription}
            onChange={(e) =>
              handleValueChange("freeDescription", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("freeDescription");
              }
            }}
          />
          <Select
            value={formValues.freeDescription}
            onChange={(value) => handleValueChange("freeDescription", value)}
            className="h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2"
            open={openSelect === "freeDescription"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "freeDescription" : null)
            }
          >
            {freeDescriptionOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="px-3 pb-2">
        <Button
          onClick={handleOpenModal}
          className={`text-xs shadow-md shadow-zinc-600 px-3 py-1 ${labelColor}`}
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
            {familyData.map((row) => (
              <tr
                key={row.id}
                tabIndex={0}
                className={`cursor-pointer ${inputColor} hover:bg-gray-100 focus:bg-blue-200 focus:outline-none`}
                onDoubleClick={handleOpenModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleOpenModal();
                  }
                }}
              >
                <td className="border border-gray-400 px-2">{row.relation}</td>
                <td className="border border-gray-400 px-2">{row.name}</td>
                <td className="border border-gray-400 px-2">{row.gender}</td>
                <td className="border border-gray-400 px-2">{row.dob}</td>
                <td className="border border-gray-400 px-2">{row.job}</td>
                <td className="border border-gray-400 px-2">{row.health}</td>
                <td className="border border-gray-400 px-2">{row.hobby}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <FamilyInfoModal onClose={handleOpenModal} />}
    </div>
  );
});

export default FamilyInfo;

import React, { useState, useEffect, useRef, useMemo } from "react";
import { DatePicker, Button } from "antd";
import dayjs from "dayjs";
import CodeInputSelect from "../CodeInputSelect";
import KanaFullWidthInput from "../KanaFullWidthInput";
import {
  relationOptions,
  genderOptions,
  jobOptions,
  healthOptions,
  hobbyOptions,
} from "../../constants/customer_ledger";
interface FamilyMember {
  id: number | null;
  relation: string;
  name: string;
  gender: string;
  dob: string;
  job: string;
  health: string;
  hobby: string;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FamilyMember) => void;
  initialData: FamilyMember | null;
}

const FamilyInfoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const defaultFormData: FamilyMember = useMemo(
    () => ({
      id: null,
      relation: "0",
      name: "",
      gender: "0",
      dob: dayjs().format("YYYY/MM/DD"),
      job: "0",
      health: "0",
      hobby: "0",
    }),
    []
  );

  const firstInputRef = useRef<any>(null);
  const [formData, setFormData] = useState<FamilyMember>(defaultFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || defaultFormData);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialData, defaultFormData]);

  const handleChange = (field: keyof FamilyMember, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 w-[800px] rounded-md shadow-lg">
        <div className="bg-gray-300 font-bold text-center py-2 rounded-md">
          家族情報
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 text-sm">
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              間柄
            </label>
            <CodeInputSelect
              ref={firstInputRef}
              options={relationOptions}
              value={formData.relation}
              onChange={(value) => handleChange("relation", value)}
              inputClassName="ml-2"
            />
          </div>

          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              家族氏名
            </label>
            <KanaFullWidthInput
              value={formData.name}
              onChange={(e) => handleChange("name", e)}
              type="text"
              className="h-6 ml-2 px-1 flex-1"
            />
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              性別
            </label>
            <CodeInputSelect
              options={genderOptions}
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              inputClassName="ml-2"
            />
          </div>

          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              生年月日
            </label>
            <DatePicker
              value={dayjs(formData.dob, "YYYY/MM/DD")}
              onChange={(date, dateString) =>
                handleChange("dob", dateString as string)
              }
              className={`h-6 flex-1 ml-2`}
              format="YYYY/MM/DD"
            />
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              職業
            </label>
            <CodeInputSelect
              options={jobOptions}
              value={formData.job}
              onChange={(value) => handleChange("job", value)}
              inputClassName="ml-2"
            />
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              健康関連
            </label>
            <CodeInputSelect
              options={healthOptions}
              value={formData.health}
              onChange={(value) => handleChange("health", value)}
              inputClassName="ml-2"
            />
          </div>
          <div className="flex items-center col-span-2">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              趣味
            </label>
            <CodeInputSelect
              options={hobbyOptions}
              value={formData.hobby}
              onChange={(value) => handleChange("hobby", value)}
              inputClassName="ml-2"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={onClose}
            className="px-4 py-1 border border-black bg-gray-200 hover:bg-gray-300"
          >
            閉じる
          </Button>
          <Button onClick={handleSave} type="primary" className="px-4 py-1">
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyInfoModal;

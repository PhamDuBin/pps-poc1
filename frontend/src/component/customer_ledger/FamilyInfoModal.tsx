import React, { useState, useEffect } from "react";
import { Select, DatePicker, Input, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

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
const relationOptions = [
  "本人",
  "妻",
  "父",
  "母",
  "兄",
  "姉",
  "弟",
  "妹",
  "子",
  "祖父",
  "祖母",
  "義父",
  "義母",
  "義祖父",
  "義祖母",
  "義兄",
  "義弟",
  "義姉",
  "義妹",
  "その他",
];
const genderOptions = ["男性", "女性"];
const jobOptions = ["会社員", "公務員", "自営業", "学生", "主婦", "無職"];
const healthOptions = [
  "肥満対応",
  "健康食品",
  "健康器具",
  "美容飲料",
  "良好",
  "その他",
];
const hobbyOptions = [
  "映画鑑賞",
  "音楽鑑賞",
  "美術鑑賞",
  "スポーツ観戦",
  "読書",
  "フィッシング",
  "ドライブ",
  "サイクリング",
  "ガーデニング",
  "スキー",
  "スノーボード",
  "マリンスポーツ",
  "登山",
  "料理",
  "写真",
  "インターネット",
  "旅行",
  "ブリーディング",
  "アウトドア",
  "その他",
];

const FamilyInfoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const defaultFormData: FamilyMember = {
    id: null,
    relation: "",
    name: "",
    gender: "男性",
    dob: dayjs().format("YYYY/MM/DD"),
    job: "会社員",
    health: "良好",
    hobby: "",
  };
  const firstRef = React.useRef<any>(null);

  const [formData, setFormData] = useState<FamilyMember>(defaultFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || defaultFormData);
      setTimeout(() => {
        firstRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialData]);

  const handleChange = (field: keyof FamilyMember, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 w-[700px] rounded-md shadow-lg">
        <div className="bg-gray-300 font-bold text-center py-2 rounded-md">
          家族情報
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4 text-sm">
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              間柄
            </label>
            <Select
              ref={firstRef}
              value={formData.relation}
              onChange={(value) => handleChange("relation", value)}
              className="h-6 ml-2 w-36"
            >
              {relationOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              家族氏名
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              type="text"
              className="h-6 ml-2 px-1"
            />
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              性別
            </label>
            <Select
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
              className="h-6 ml-2 w-36"
            >
              {genderOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              生年月日
            </label>
            <DatePicker
              value={dayjs(formData.dob, "YYYY/MM/DD")}
              onChange={(date, dateString) => handleChange("dob", dateString)}
              className={`h-6 w-full ml-2`}
              format="YYYY/MM/DD"
            />
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              職業
            </label>
            <Select
              value={formData.job}
              onChange={(value) => handleChange("job", value)}
              className="h-6 ml-2 w-36"
            >
              {jobOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              健康関連
            </label>
            <Select
              value={formData.health}
              onChange={(value) => handleChange("health", value)}
              className="h-6 ml-2 w-full"
            >
              {healthOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center col-span-2">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300">
              趣味
            </label>
            <Select
              value={formData.hobby}
              onChange={(value) => handleChange("hobby", value)}
              className="h-6 ml-2 w-36"
            >
              {hobbyOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
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

import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Input, Button } from "antd";
import dayjs from "dayjs";
import CodeInputSelect from "../CodeInputSelect";
import KanaFullWidthInput from "../KanaFullWidthInput";
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
  "0:空白",
  "1:本人",
  "2:妻",
  "3:父",
  "4:母",
  "5:兄",
  "6:姉",
  "7:弟",
  "8:妹",
  "9:子",
  "10:祖父",
  "11:祖母",
  "12:義父",
  "13:義母",
  "14:義祖父",
  "15:義祖母",
  "16:義兄",
  "17:義弟",
  "18:義姉",
  "19:義妹",
  "20:その他",
].map((item) => {
  const [code, label] = item.split(":");
  return { code, label: item };
});
const genderOptions = ["0:空白", "1:男性", "2:女性"].map((item) => {
  const [code, label] = item.split(":");
  return { code, label: item };
});
const jobOptions = [
  "0:空白",
  "1:会社員",
  "2:公務員",
  "3:自営業",
  "4:学生",
  "5:主婦",
  "6:無職",
].map((item) => {
  const [code, label] = item.split(":");
  return { code, label: item };
});
const healthOptions = [
  "0:空白",
  "1:肥満対応",
  "2:健康食品",
  "3:健康器具",
  "4:美容飲料",
  "5:良好",
  "6:その他",
].map((item) => {
  const [code, label] = item.split(":");
  return { code, label: item };
});
const hobbyOptions = [
  "0:空白",
  "1:映画鑑賞",
  "2:音楽鑑賞",
  "3:美術鑑賞",
  "4:スポーツ観戦",
  "5:読書",
  "6:フィッシング",
  "7:ドライブ",
  "8:サイクリング",
  "9:ガーデニング",
  "10:スキー",
  "11:スノーボード",
  "12:マリンスポーツ",
  "13:登山",
  "14:料理",
  "15:写真",
  "16:インターネット",
  "17:旅行",
  "18:ブリーディング",
  "19:アウトドア",
  "20:その他",
].map((item) => {
  const [code, label] = item.split(":");
  return { code, label: item };
});

const FamilyInfoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const defaultFormData: FamilyMember = {
    id: null,
    relation: "0",
    name: "",
    gender: "0",
    dob: dayjs().format("YYYY/MM/DD"),
    job: "0",
    health: "0",
    hobby: "0",
  };

  const firstInputRef = useRef<any>(null);
  const [formData, setFormData] = useState<FamilyMember>(defaultFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || defaultFormData);
      setTimeout(() => {
        firstInputRef.current?.focus();
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

import { Button, Input, Select } from "antd";
import { inputColor, labelColor } from "../../../constants/colors";
import { forwardRef, useImperativeHandle, useRef } from "react";

const EmergencyContact = forwardRef<any>((props, ref) => {
    const firstSelectRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
  
    useImperativeHandle(ref, () => ({
      focusFirstSelect : () => {
        firstSelectRef.current.focus();
      },
      getContainerNode: () => {
        return containerRef.current
      }
  
    }));
  const label =
    `w-32 mr-2 h-6 border-gray-300 rounded-md ${labelColor} font-bold flex text-center justify-center items-center`;
  return (
    <div className="w-full text-xs py-4">
      {/* Header */}
      <div className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}>
        緊急連絡先
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        <div className="flex items-center">
          <label className="font-bold">緊急連絡先1</label>
        </div>
        <div className="flex items-center">
          <label className="font-bold">緊急連絡先2</label>
        </div>

        <div className="flex items-center">
          <label className={label}>時間帯</label>
          <Select ref={firstSelectRef} className={`h-6 w-32 [&>.ant-select-selector]:!${inputColor}`} defaultValue="0:空欄">
            <Select.Option value="0:空欄">0:空欄</Select.Option>
            <Select.Option value="1:随時">1:随時</Select.Option>
            <Select.Option value="2:昼間">2:昼間</Select.Option>
            <Select.Option value="3:夜間">3:夜間</Select.Option>
          </Select>
        </div>

        <div className="flex items-center">
          <label className={label}>時間帯</label>
          <Select className={`h-6 w-32 [&>.ant-select-selector]:!${inputColor}`} defaultValue="0:空欄">
            <Select.Option value="0:空欄">0:空欄</Select.Option>
            <Select.Option value="1:随時">1:随時</Select.Option>
            <Select.Option value="2:昼間">2:昼間</Select.Option>
            <Select.Option value="3:夜間">3:夜間</Select.Option>
          </Select>
        </div>

        <div className="flex items-center">
          <label className={label}>名称</label>
          <Input className={`h-6 w-32 ${inputColor}`}  defaultValue={"緊急連絡先01"}></Input>
        </div>

        <div className="flex items-center">
          <label className={label}>名称</label>
          <Input className={`h-6 w-32 ${inputColor}`}  defaultValue={""}></Input>
        </div>

        <div className="flex items-center">
          <label className={label}>住所</label>
          <Input
            className={`h-6 w-32 ${inputColor}`} 
            defaultValue={"緊急連絡先住所01"}
          ></Input>
        </div>

        <div className="flex items-center">
          <label className={label}>住所</label>
          <Input className={`h-6 w-32 ${inputColor}`}  defaultValue={""}></Input>
        </div>

        <div className="flex items-center">
          <label className={label}>電話番号</label>
          <Input className={`h-6 w-32 ${inputColor}`}  defaultValue={"8098876767"}></Input>
        </div>

        <div className="flex items-center">
          <label className={label}>電話番号</label>
          <Input className={`h-6 w-32 ${inputColor}`}  defaultValue={""}></Input>
        </div>
      </div>
    </div>
  );
});
export default EmergencyContact;

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input, Select } from "antd";
import { labelColor, inputColor, focusInputColor, hoverInputColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";

const timeSlotOptions = [
  { code: "0", label: "0:空欄" },
  { code: "1", label: "1:随時" },
  { code: "2", label: "2:昼間" },
  { code: "3", label: "3:夜間" },
];

const EmergencyContact = forwardRef<any, { showData: boolean }>(
  (props, ref) => {
    const firstInputRef = useRef<any>(null);
    const { showData } = props;
    const isFormDisabled = !showData;

    const [formValues, setFormValues] = useState({
      contact1: {
        timeSlot: "0",
        name: "緊急連絡先01",
        address: "緊急連絡先住所01",
        phone: "8098876767",
      },
      contact2: {
        timeSlot: "0",
        name: "",
        address: "",
        phone: "",
      },
    });

    useEffect(() => {
      if (showData) {
        setFormValues((prev) => ({
          ...prev,
          contact1: {
            timeSlot: "0",
            name: "緊急連絡先01",
            address: "緊急連絡先住所01",
            phone: "8098876767",
          },
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          contact1: {
            timeSlot: "0",
            name: "",
            address: "",
            phone: "",
          },
        }));
      }
    }, [showData]);

    const handleValueChange = (
      contact: "contact1" | "contact2",
      field: string,
      value: string
    ) => {
      setFormValues((prev) => ({
        ...prev,
        [contact]: {
          ...prev[contact],
          [field]: value,
        },
      }));
    };

    useImperativeHandle(ref, () => ({
      focusFirstButton: () => {
        firstInputRef.current?.focus();
      },
    }));

    const labelClass = `w-32 mr-2 h-6 border-gray-300 rounded-md ${labelColor} font-bold flex text-center justify-center items-center`;
    const inputCodeClass = `${inputColor} border border-black h-6 w-14 text-center`;
    const inputClass = `${hoverInputColor} ${focusInputColor} border border-black h-6 w-32`;

    return (
      <div onKeyDown={blockTab} className="w-full text-xs py-4">
        <div
          className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}
        >
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
            <label className={labelClass}>時間帯</label>
            <CodeInputSelect
              ref={firstInputRef}
              options={timeSlotOptions}
              value={formValues.contact1.timeSlot}
              onChange={(newValue) =>
                handleValueChange("contact1", "timeSlot", newValue)
              }
              disabled={isFormDisabled}
            />
          </div>
          <div className="flex items-center">
            <label className={labelClass}>時間帯</label>
            <CodeInputSelect
              options={timeSlotOptions}
              value={formValues.contact2.timeSlot}
              onChange={(newValue) =>
                handleValueChange("contact2", "timeSlot", newValue)
              }
              disabled={isFormDisabled}
            />
          </div>

          <div className="flex items-center">
            <label className={labelClass}>名称</label>
            <Input
              className={inputClass}
              value={formValues.contact1.name}
              onChange={(e) =>
                handleValueChange("contact1", "name", e.target.value)
              }
              disabled={isFormDisabled}
            />
          </div>
          <div className="flex items-center">
            <label className={labelClass}>名称</label>
            <Input
              className={inputClass}
              value={formValues.contact2.name}
              onChange={(e) =>
                handleValueChange("contact2", "name", e.target.value)
              }
              disabled={isFormDisabled}
            />
          </div>

          <div className="flex items-center">
            <label className={labelClass}>住所</label>
            <Input
              className={inputClass}
              value={formValues.contact1.address}
              onChange={(e) =>
                handleValueChange("contact1", "address", e.target.value)
              }
              disabled={isFormDisabled}
            />
          </div>
          <div className="flex items-center">
            <label className={labelClass}>住所</label>
            <Input
              className={inputClass}
              value={formValues.contact2.address}
              onChange={(e) =>
                handleValueChange("contact2", "address", e.target.value)
              }
              disabled={isFormDisabled}
            />
          </div>

          <div className="flex items-center">
            <label className={labelClass}>電話番号</label>
            <Input
              className={inputClass}
              value={formValues.contact1.phone}
              onChange={(e) =>
                handleValueChange("contact1", "phone", e.target.value)
              }
              disabled={isFormDisabled}
            />
          </div>
          <div className="flex items-center">
            <label className={labelClass}>電話番号</label>
            <Input
              className={inputClass}
              value={formValues.contact2.phone}
              onChange={(e) =>
                handleValueChange("contact2", "phone", e.target.value)
              }
              disabled={isFormDisabled}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default EmergencyContact;

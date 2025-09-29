import { Button, Select, Input } from "antd";
import { labelColor, inputColor } from "../../../constants/colors";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { blockTab } from "../../../utils/InputHandlers";

const { Option } = Select;
const OtherInfo = forwardRef<any>((props, ref) => {
  const firstButtonRef = useRef<any>(null);
  const homeOwnershipOptions = [
    { value: "0", label: "0:空白" },
    { value: "1", label: "1:持家" },
    { value: "2", label: "2:借家" },
    { value: "3", label: "3:マンション" },
    { value: "4", label: "4:アパート" },
    { value: "5", label: "5:公営住宅" },
    { value: "6", label: "6:社宅・寮" },
    { value: "7", label: "7:店舗事務所" },
    { value: "8", label: "8:別荘" },
    { value: "9", label: "9:その他" },
  ];

  const notificationTypeOptions = [
    { value: "0", label: "0:空欄" },
    { value: "1", label: "1:1年" },
    { value: "2", label: "2:2年" },
    { value: "3", label: "3:3年" },
  ];
  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstButtonRef.current?.focus();
    },
  }));
  const [formValues, setFormValues] = useState({
    customerConstruction: "0000",
    introducer: "",
    referralConstruction: "0000",
    previousSupplier: "0000",
    owner: "0000",
    managementCompany: "0000",
    homeOwnershipType: "0",
    roomCount: "",
    familySize: "",
    distance: "",
    time: "",
    notificationType: "0",
    financeAuxCode: "",
  });
  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const handleValueChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const inputColorClass = `!${inputColor} border border-black`;
  const label = `w-32 mr-2 h-6 border-gray-300 rounded-md font-bold flex text-center justify-center items-center ${labelColor}`;
  return (
    <div onKeyDown={blockTab} className="w-full text-xs py-4">
      {/* Header */}
      <div
        className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}
      >
        その他情報
      </div>

      {/* Form phía trên */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        {/* Cột trái */}
        <div className="flex items-center">
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            ref={firstButtonRef}
            className={`${label} shadow-md shadow-zinc-500 focus:border-3 focus:border-yellow-600`}
          >
            顧客工務店
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
          ></Input>
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className="ml-2 h-6 w-6"
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <label className={label}>紹介者</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
          ></Input>
        </div>

        <div className="flex items-center">
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className={`${label} shadow-md shadow-zinc-500`}
          >
            紹介元工務店
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
          ></Input>
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className="ml-2 h-6 w-6"
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className={`${label} shadow-md shadow-zinc-500`}
          >
            前納入先
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
          ></Input>
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className="ml-2 h-6 w-6"
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className={`${label} shadow-md shadow-zinc-500`}
          >
            オーナー
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
          ></Input>
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className="ml-2 h-6 w-6"
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className={`${label} shadow-md shadow-zinc-500`}
          >
            管理会社
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
          ></Input>
          <Button
            onClick={() => {
              const newWindow = window.open(
                "/link-destination",
                "_blank",
                "width=500,height=300,noopener,noreferrer"
              );
              if (newWindow) {
                newWindow.focus();
              }
            }}
            className="ml-2 h-6 w-6"
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <label className={label}>持家区分</label>
          <Input
            className={` h-6 w-10 ${inputColorClass}`}
            value={formValues.homeOwnershipType}
            onChange={(e) =>
              handleValueChange("homeOwnershipType", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("homeOwnershipType");
              }
            }}
          />
          <Select
            className={`h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2`}
            value={formValues.homeOwnershipType}
            onChange={(value) => handleValueChange("homeOwnershipType", value)}
            open={openSelect === "homeOwnershipType"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "homeOwnershipType" : null)
            }
          >
            {homeOwnershipOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <label className={label}>部屋数</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
          ></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>家族人数</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
          ></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>距離</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
          ></Input>
          <p>Km</p>
        </div>
        <div className="flex items-center">
          <label className={label}>時間</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
          ></Input>
          <p>分</p>
        </div>
        <div className="flex items-center">
          <label className={label}>周知対象区分</label>
          <Input
            className={` h-6 w-10 ${inputColorClass}`}
            value={formValues.notificationType}
            onChange={(e) =>
              handleValueChange("notificationType", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("notificationType");
              }
            }}
          />
          <Select
            className={`h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] ml-2`}
            value={formValues.notificationType}
            onChange={(value) => handleValueChange("notificationType", value)}
            open={openSelect === "notificationType"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "notificationType" : null)
            }
          >
            {notificationTypeOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <label className={label}>財務補助コード</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
          ></Input>
        </div>
      </div>
    </div>
  );
});

export default OtherInfo;

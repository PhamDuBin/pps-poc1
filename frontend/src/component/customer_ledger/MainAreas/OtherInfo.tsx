import { Button, Input } from "antd";
import { labelColor, inputColor } from "../../../constants/colors";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";

const OtherInfo = forwardRef<any, { showData: boolean }>((props, ref) => {
  const firstButtonRef = useRef<any>(null);
  const { showData } = props;
  const isFormDisabled = !showData;
  const homeOwnershipOptions = [
    { code: "0", label: "0:空白" },
    { code: "1", label: "1:持家" },
    { code: "2", label: "2:借家" },
    { code: "3", label: "3:マンション" },
    { code: "4", label: "4:アパート" },
    { code: "5", label: "5:公営住宅" },
    { code: "6", label: "6:社宅・寮" },
    { code: "7", label: "7:店舗事務所" },
    { code: "8", label: "8:別荘" },
    { code: "9", label: "9:その他" },
  ];

  const notificationTypeOptions = [
    { code: "0", label: "0:空欄" },
    { code: "1", label: "1:1年" },
    { code: "2", label: "2:2年" },
    { code: "3", label: "3:3年" },
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

  const handleValueChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const openPopup = (url = "/link-destination") => {
    const newWindow = window.open(
      url,
      "_blank",
      "width=500,height=300,noopener,noreferrer"
    );
    if (newWindow) {
      newWindow.focus();
    }
  };

  const inputColorClass = `hover:${inputColor} focus:!${inputColor} border border-black`;
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
            onClick={() => openPopup()}
            disabled={isFormDisabled}
            ref={firstButtonRef}
            className={`${label} shadow-md shadow-zinc-500 focus:border-3 focus:border-yellow-600`}
          >
            顧客工務店
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
            disabled={isFormDisabled}
          ></Input>
          <Button
            onClick={() => openPopup()}
            disabled={isFormDisabled}
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
            disabled={isFormDisabled}
          ></Input>
        </div>

        <div className="flex items-center">
          <Button
            onClick={() => openPopup()}
            className={`${label} shadow-md shadow-zinc-500`}
            disabled={isFormDisabled}
          >
            紹介元工務店
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
            disabled={isFormDisabled}
          ></Input>
          <Button
            onClick={() => openPopup()}
            className="ml-2 h-6 w-6"
            disabled={isFormDisabled}
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => openPopup()}
            className={`${label} shadow-md shadow-zinc-500`}
            disabled={isFormDisabled}
          >
            前納入先
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
            disabled={isFormDisabled}
          ></Input>
          <Button
            onClick={() => openPopup()}
            disabled={isFormDisabled}
            className="ml-2 h-6 w-6"
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => openPopup()}
            className={`${label} shadow-md shadow-zinc-500`}
            disabled={isFormDisabled}
          >
            オーナー
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
            disabled={isFormDisabled}
          ></Input>
          <Button
            onClick={() => openPopup()}
            className="ml-2 h-6 w-6"
            disabled={isFormDisabled}
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => openPopup()}
            className={`${label} shadow-md shadow-zinc-500`}
            disabled={isFormDisabled}
          >
            管理会社
          </Button>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={"0000"}
            disabled={isFormDisabled}
          ></Input>
          <Button
            onClick={() => openPopup()}
            className="ml-2 h-6 w-6"
            disabled={isFormDisabled}
          >
            ▼
          </Button>
        </div>
        <div className="flex items-center">
          <label className={label}>持家区分</label>
          <CodeInputSelect
            options={homeOwnershipOptions}
            value={formValues.homeOwnershipType}
            onChange={(newValue) =>
              handleValueChange("homeOwnershipType", newValue)
            }
            disabled={isFormDisabled}
          />
        </div>
        <div className="flex items-center">
          <label className={label}>部屋数</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
            disabled={isFormDisabled}
          ></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>家族人数</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
            disabled={isFormDisabled}
          ></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>距離</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
            disabled={isFormDisabled}
          ></Input>
          <p>Km</p>
        </div>
        <div className="flex items-center">
          <label className={label}>時間</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
            disabled={isFormDisabled}
          ></Input>
          <p>分</p>
        </div>
        <div className="flex items-center">
          <label className={label}>周知対象区分</label>
          <CodeInputSelect
            options={notificationTypeOptions}
            value={formValues.notificationType}
            onChange={(newValue) =>
              handleValueChange("notificationType", newValue)
            }
            disabled={isFormDisabled}
          />
        </div>
        <div className="flex items-center">
          <label className={label}>財務補助コード</label>
          <Input
            className={` h-6 w-32 ${inputColorClass}`}
            defaultValue={""}
            disabled={isFormDisabled}
          ></Input>
        </div>
      </div>
    </div>
  );
});

export default OtherInfo;

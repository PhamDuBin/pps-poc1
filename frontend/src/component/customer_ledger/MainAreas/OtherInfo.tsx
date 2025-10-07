import { Button } from "antd";
import { labelColor, inputColor } from "../../../constants/colors";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";
import HalfWidthNumberInput from "../../HalfWidthNumberInput";
import KanaFullWidthInput from "../../KanaFullWidthInput";
import {
  homeOwnershipOptions,
  notificationTypeOptions,
} from "../../../constants/customer_ledger";

const OtherInfo = forwardRef<any, { showData: boolean }>((props, ref) => {
  const firstButtonRef = useRef<any>(null);
  const { showData } = props;
  const isFormDisabled = !showData;

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

      {/* Form */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        {/* 左列 */}
        <div className="flex items-center">
          <Button
            onClick={() => openPopup()}
            disabled={isFormDisabled}
            ref={firstButtonRef}
            className={`${label} shadow-md shadow-zinc-500`}
          >
            顧客工務店
          </Button>
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.customerConstruction}
            onChange={(val) => handleValueChange("customerConstruction", val)}
            disabled={isFormDisabled}
          />
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
          <KanaFullWidthInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.introducer}
            onChange={(val) => handleValueChange("introducer", val)}
            disabled={isFormDisabled}
          />
        </div>

        <div className="flex items-center">
          <Button
            onClick={() => openPopup()}
            className={`${label} shadow-md shadow-zinc-500`}
            disabled={isFormDisabled}
          >
            紹介元工務店
          </Button>
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.referralConstruction}
            onChange={(val) => handleValueChange("referralConstruction", val)}
            disabled={isFormDisabled}
          />
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
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.previousSupplier}
            onChange={(val) => handleValueChange("previousSupplier", val)}
            disabled={isFormDisabled}
          />
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
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.owner}
            onChange={(val) => handleValueChange("owner", val)}
            disabled={isFormDisabled}
          />
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
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.managementCompany}
            onChange={(val) => handleValueChange("managementCompany", val)}
            disabled={isFormDisabled}
          />
          <Button
            onClick={() => openPopup()}
            className="ml-2 h-6 w-6"
            disabled={isFormDisabled}
          >
            ▼
          </Button>
        </div>

        <div className="flex items-center">
          <label className={`${label}`}>持家区分</label>
          <div className="w-2/5">
            <CodeInputSelect
              options={homeOwnershipOptions}
              value={formValues.homeOwnershipType}
              onChange={(newValue) =>
                handleValueChange("homeOwnershipType", newValue)
              }
              disabled={isFormDisabled}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className={label}>部屋数</label>
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.roomCount}
            onChange={(val) => handleValueChange("roomCount", val)}
            disabled={isFormDisabled}
          />
        </div>

        <div className="flex items-center">
          <label className={label}>家族人数</label>
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.familySize}
            onChange={(val) => handleValueChange("familySize", val)}
            disabled={isFormDisabled}
          />
        </div>

        <div className="flex items-center">
          <label className={label}>距離</label>
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.distance}
            onChange={(val) => handleValueChange("distance", val)}
            disabled={isFormDisabled}
          />
          <p>Km</p>
        </div>

        <div className="flex items-center">
          <label className={label}>時間</label>
          <HalfWidthNumberInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.time}
            onChange={(val) => handleValueChange("time", val)}
            disabled={isFormDisabled}
          />
          <p>分</p>
        </div>

        <div className="flex items-center">
          <label className={label}>周知対象区分</label>
          <div className="w-2/5">
            <CodeInputSelect
              options={notificationTypeOptions}
              value={formValues.notificationType}
              onChange={(newValue) =>
                handleValueChange("notificationType", newValue)
              }
              disabled={isFormDisabled}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className={label}>財務補助コード</label>
          <KanaFullWidthInput
            className={`h-6 w-32 ${inputColorClass}`}
            value={formValues.financeAuxCode}
            onChange={(val) => handleValueChange("financeAuxCode", val)}
            disabled={isFormDisabled}
          />
        </div>
      </div>
    </div>
  );
});

export default OtherInfo;

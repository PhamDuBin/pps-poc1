import { Button, Checkbox, DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { inputColor, labelColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";

const { Option } = Select;

const openCloseOptions = [
  { value: "0", label: "0 新規開栓" },
  { value: "1", label: "1 入居開栓" },
  { value: "2", label: "2 閉栓解除" },
  { value: "3", label: "3 季節開栓" },
  { value: "4", label: "4 解約閉栓" },
  { value: "5", label: "5 引越閉栓" },
  { value: "6", label: "6 季節中断閉栓" },
  { value: "7", label: "7 強制中断閉栓" },
  { value: "9", label: "9 対象外" },
  { value: "12", label: "12 未入居閉栓" },
];

const contractOptions = [
  { value: "0", label: "0 空白" },
  { value: "1", label: "1 新設" },
  { value: "2", label: "2 転入" },
  { value: "3", label: "3 解約" },
  { value: "4", label: "4 対象外" },
  { value: "9", label: "9 債権者" },
];

const acquisitionRouteOptions = [
  { value: "0", label: "0 空白" },
  { value: "1", label: "1 既存工務店紹介" },
  { value: "2", label: "2 新規工務店紹介" },
  { value: "3", label: "3 転換営業" },
  { value: "4", label: "4 顧客からの紹介" },
  { value: "5", label: "5 取引先からの紹介" },
  { value: "6", label: "6 社内紹介" },
  { value: "7", label: "7 受託" },
  { value: "8", label: "8 買収" },
  { value: "9", label: "9 建替" },
  { value: "10", label: "10 増築" },
  { value: "20", label: "20 その他" },
];

const customerStatusOptions = [
  { value: "0", label: "0 空白" },
  { value: "1", label: "1 新規" },
  { value: "2", label: "2 買収" },
  { value: "9", label: "9 その他" },
];

const groupTypeOptions = [
  { value: "0", label: "0 個別" },
  { value: "1", label: "1 集合親" },
  { value: "2", label: "2 集合子" },
];

const inspectionTypeOptions = [
  { value: "0", label: "0 対象外" },
  { value: "1", label: "1 検針（シリンダー）" },
  { value: "2", label: "2 検針（バルク）" },
  { value: "3", label: "3 検針（新バルク）" },
  { value: "4", label: "4 重量（シリンダー）" },
  { value: "5", label: "5 ローリー（バルク）" },
  { value: "6", label: "6 ローリー（新バルク）" },
];

const usageTypeOptions = [
  { value: "01", label: "01 家庭用・戸建" },
  { value: "07", label: "07 家庭用・集合" },
  { value: "09", label: "09 集合ファミリー・借家" },
  { value: "11", label: "11 バルク" },
  { value: "12", label: "12 簡易ガス" },
  { value: "13", label: "13 業務用" },
  { value: "15", label: "15 業務用（空調）" },
  { value: "16", label: "16 業務用（事務所他）" },
  { value: "17", label: "17 工業用（一般）" },
  { value: "19", label: "19 集計なし" },
  { value: "20", label: "20 その他" },
];

const decisionStatusOptions = [
  { value: "0", label: "0 確定" },
  { value: "1", label: "1 仮" },
];

const availabilityOptions = [
  { value: "0", label: "0 無" },
  { value: "1", label: "1 有" },
];

const labelClass = `w-32 mr-2 h-6 border-gray-300 rounded-md ${labelColor} font-bold flex text-center justify-center items-center`;

const AcquisitionInformation = forwardRef<any>((props, ref) => {
  const [month, setMonth] = useState(dayjs());
  const firstSelectRef = useRef<any>(null);
  const [formValues, setFormValues] = useState({
    openCloseType: "0",
    contractType: "0",
    acquisitionRoute: "0",
    customerStatus: "0",
    groupType: "0",
    inspectionType: "1",
    usageType: "01",
    decisionStatus: "0",
    autoGas: "0",
    privateUse: "0",
  });

  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const handleValueChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstSelectRef.current?.focus();
    },
  }));

  const inputCodeClass = `w-14 h-6 text-center ${inputColor} placeholder:text-black`;
  return (
    <div onKeyDown={blockTab} className="w-full text-xs py-4">
      <div
        className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}
      >
        獲得情報
      </div>
      <div className="flex flex-col p-3">
        <div className="w-full flex py-1">
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
            className={`font-semibold shadow-md shadow-zinc-500 ${labelClass}`}
          >
            開閉栓区分
          </Button>
          <Input
            ref={firstSelectRef}
            className={inputCodeClass}
            value={formValues.openCloseType}
            onChange={(e) => handleValueChange("openCloseType", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("openCloseType");
              }
            }}
          />
          <Select
            value={formValues.openCloseType}
            onChange={(value) => handleValueChange("openCloseType", value)}
            className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
            size="small"
            open={openSelect === "openCloseType"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "openCloseType" : null)
            }
          >
            {openCloseOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="w-full flex justify-between py-1">
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>取引開始日</div>
            <DatePicker
              picker="month"
              value={month}
              onChange={(date) => setMonth(date)}
              className={` h-6 w-1/4 z-10 ${inputColor}`}
              format="YYYY/MM"
            />
          </div>
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>取引開始日</div>
            <DatePicker
              picker="month"
              value={month}
              onChange={(date) => setMonth(date)}
              className={` h-6 w-1/4 ${inputColor}`}
              format="YYYY/MM"
            />
          </div>
        </div>
        <div className="w-full flex py-1">
          <div className={`font-semibold ${labelClass}`}>開閉栓区分</div>
          <Input
            className={inputCodeClass}
            value={formValues.contractType}
            onChange={(e) => handleValueChange("contractType", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("contractType");
              }
            }}
          />
          <Select
            value={formValues.contractType}
            onChange={(value) => handleValueChange("contractType", value)}
            className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
            size="small"
            open={openSelect === "contractType"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "contractType" : null)
            }
          >
            {contractOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex w-full justify-between py-1">
          <div className="flex w-1/2">
            <div className={`font-semibold ${labelClass}`}>新規登録理由</div>
            <Input
              className={inputCodeClass}
              value={formValues.acquisitionRoute}
              onChange={(e) =>
                handleValueChange("acquisitionRoute", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("acquisitionRoute");
                }
              }}
            />
            <Select
              value={formValues.acquisitionRoute}
              onChange={(value) => handleValueChange("acquisitionRoute", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
              size="small"
              open={openSelect === "acquisitionRoute"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "acquisitionRoute" : null)
              }
            >
              {acquisitionRouteOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex w-1/2">
            <div className={`font-semibold ${labelClass}`}>新規登録理由</div>
            <Input
              className={inputCodeClass}
              value={formValues.customerStatus}
              onChange={(e) =>
                handleValueChange("customerStatus", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("customerStatus");
                }
              }}
            />
            <Select
              value={formValues.customerStatus}
              onChange={(value) => handleValueChange("customerStatus", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
              size="small"
              open={openSelect === "customerStatus"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "customerStatus" : null)
              }
            >
              {customerStatusOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex w-full py-1">
          <div className={`font-semibold ${labelClass} h-[60px]`}>取引開始</div>
          <div className="flex flex-col gap-2">
            <div className="flex h-1/2 items-center gap-2">
              <Button
                size="small"
                className="!bg-blue-600 !text-white hover:!bg-white hover:!text-black px-2 h-6 w-32"
                type="default"
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
              >
                LPG
              </Button>
              <div>2025/01/01</div>
            </div>
            <div className="flex h-1/2 items-center gap-2">
              <Button
                size="small"
                className="!bg-blue-600 !text-white hover:!bg-white hover:!text-black px-2 h-6 w-32"
                type="default"
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
              >
                電力
              </Button>
              <div>2025/01/01</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between py-1">
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>供給形態</div>
            <Input
              className={inputCodeClass}
              value={formValues.groupType}
              onChange={(e) => handleValueChange("groupType", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("groupType");
                }
              }}
            />
            <Select
              value={formValues.groupType}
              onChange={(value) => handleValueChange("groupType", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
              size="small"
              open={openSelect === "groupType"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "groupType" : null)
              }
            >
              {groupTypeOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>集合戸数</div>
            <Input
              className={`${inputColor} w-2/5`}
              placeholder="0"
              size="small"
            />
          </div>
        </div>
        <div className="flex w-4/5 py-1 items-center">
          <div className={`font-semibold ${labelClass}`}>集合親コード</div>
          <div className="flex gap-2 items-center w-4/5">
            <Input
              className={`${inputColor} w-[25%] h-6 placeholder:text-black`}
              placeholder="0000"
            />
            <div> - </div>
            <Input
              className={`${inputColor} w-[15%] h-6 placeholder:text-black`}
              placeholder="000"
            />
            <div> - </div>
            <Input
              className={`${inputColor} w-[30%] h-6 placeholder:text-black`}
              placeholder="000000"
            />
            <div> - </div>
            <Input
              className={`${inputColor} w-[15%] h-6 placeholder:text-black`}
              placeholder="000"
            />
            <Button className="w-6 h-6">▼</Button>
            <div className="w-[200px]">テストさん太郎</div>
          </div>
        </div>
        <div className="w-full flex justify-between py-1">
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>ガス販売形態</div>
            <Input
              className={inputCodeClass}
              value={formValues.inspectionType}
              onChange={(e) =>
                handleValueChange("inspectionType", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("inspectionType");
                }
              }}
            />
            <Select
              value={formValues.inspectionType}
              onChange={(value) => handleValueChange("inspectionType", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
              size="small"
              open={openSelect === "inspectionType"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "inspectionType" : null)
              }
            >
              {inspectionTypeOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>販売用途区分</div>
            <Input
              className={inputCodeClass}
              value={formValues.usageType}
              onChange={(e) => handleValueChange("usageType", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("usageType");
                }
              }}
            />
            <Select
              value={formValues.usageType}
              onChange={(value) => handleValueChange("usageType", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
              size="small"
              open={openSelect === "usageType"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "usageType" : null)
              }
            >
              {usageTypeOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-full flex py-1">
          <div className={`font-semibold ${labelClass}`}>販売単価設定</div>
          <Input
            className={inputCodeClass}
            value={formValues.decisionStatus}
            onChange={(e) =>
              handleValueChange("decisionStatus", e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "F4") {
                e.preventDefault();
                setOpenSelect("decisionStatus");
              }
            }}
          />
          <Select
            value={formValues.decisionStatus}
            onChange={(value) => handleValueChange("decisionStatus", value)}
            className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
            size="small"
            open={openSelect === "decisionStatus"}
            onDropdownVisibleChange={(isOpen) =>
              setOpenSelect(isOpen ? "decisionStatus" : null)
            }
          >
            {decisionStatusOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex w-full justify-between py-1">
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>オートガス</div>
            <Input
              className={inputCodeClass}
              value={formValues.autoGas}
              onChange={(e) => handleValueChange("autoGas", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("autoGas");
                }
              }}
            />
            <Select
              value={formValues.autoGas}
              onChange={(value) => handleValueChange("autoGas", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
              size="small"
              open={openSelect === "autoGas"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "autoGas" : null)
              }
            >
              {availabilityOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="w-1/2 flex">
            <div className={`font-semibold ${labelClass}`}>自家使用</div>
            <Input
              className={inputCodeClass}
              value={formValues.privateUse}
              onChange={(e) => handleValueChange("privateUse", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("privateUse");
                }
              }}
            />
            <Select
              value={formValues.privateUse}
              onChange={(value) => handleValueChange("privateUse", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[220px] h-6 ml-2"
              size="small"
              open={openSelect === "privateUse"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "privateUse" : null)
              }
            >
              {availabilityOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-full flex py-1">
          <div className={`font-semibold h-[60px] ${labelClass}`}>在宅日時</div>
          <div className="flex flex-col items-center gap-2 p-1 w-4/5">
            <div className="w-full flex gap-2">
              <div className="flex items-center gap-1 mr-5">
                <Input
                  defaultValue={"15"}
                  size="small"
                  className={`w-[50px] ${inputColor}`}
                />
                <div>日頃</div>
              </div>
              <div className="flex items-center gap-1">
                <Input
                  defaultValue={"13"}
                  size="small"
                  className={`w-[50px] ${inputColor}`}
                />
                <div>時 ～</div>
              </div>
              <div className="flex items-center gap-1 mr-5">
                <Input
                  defaultValue={"17"}
                  size="small"
                  className={`w-[50px] ${inputColor}`}
                />
                <div>時</div>
              </div>
              <div className="flex items-center gap-1">
                <Input size="small" className={`w-[50px] ${inputColor}`} />
                <Button className="w-6 h-6">▼</Button>
                <div>曜日</div>
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <Checkbox>土</Checkbox>
              <Checkbox>日</Checkbox>
              <Checkbox>月</Checkbox>
              <Checkbox>火</Checkbox>
              <Checkbox>水</Checkbox>
              <Checkbox>木</Checkbox>
              <Checkbox>金</Checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AcquisitionInformation;

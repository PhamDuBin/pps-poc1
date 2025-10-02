import { Button, Checkbox, DatePicker, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  inputColor,
  labelColor,
  hoverInputColor,
  focusInputColor,
} from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";
import HalfWidthNumberInput from "../../HalfWidthNumberInput";

const openCloseOptions = [
  { code: "0", label: "0 新規開栓" },
  { code: "1", label: "1 入居開栓" },
  { code: "2", label: "2 閉栓解除" },
  { code: "3", label: "3 季節開栓" },
  { code: "4", label: "4 解約閉栓" },
  { code: "5", label: "5 引越閉栓" },
  { code: "6", label: "6 季節中断閉栓" },
  { code: "7", label: "7 強制中断閉栓" },
  { code: "9", label: "9 対象外" },
  { code: "12", label: "12 未入居閉栓" },
];

const contractOptions = [
  { code: "0", label: "0 空白" },
  { code: "1", label: "1 新設" },
  { code: "2", label: "2 転入" },
  { code: "3", label: "3 解約" },
  { code: "4", label: "4 対象外" },
  { code: "9", label: "9 債権者" },
];

const acquisitionRouteOptions = [
  { code: "0", label: "0 空白" },
  { code: "1", label: "1 既存工務店紹介" },
  { code: "2", label: "2 新規工務店紹介" },
  { code: "3", label: "3 転換営業" },
  { code: "4", label: "4 顧客からの紹介" },
  { code: "5", label: "5 取引先からの紹介" },
  { code: "6", label: "6 社内紹介" },
  { code: "7", label: "7 受託" },
  { code: "8", label: "8 買収" },
  { code: "9", label: "9 建替" },
  { code: "10", label: "10 増築" },
  { code: "20", label: "20 その他" },
];

const customerStatusOptions = [
  { code: "0", label: "0 空白" },
  { code: "1", label: "1 新規" },
  { code: "2", label: "2 買収" },
  { code: "9", label: "9 その他" },
];

const groupTypeOptions = [
  { code: "0", label: "0 個別" },
  { code: "1", label: "1 集合親" },
  { code: "2", label: "2 集合子" },
];

const inspectionTypeOptions = [
  { code: "0", label: "0 対象外" },
  { code: "1", label: "1 検針（シリンダー）" },
  { code: "2", label: "2 検針（バルク）" },
  { code: "3", label: "3 検針（新バルク）" },
  { code: "4", label: "4 重量（シリンダー）" },
  { code: "5", label: "5 ローリー（バルク）" },
  { code: "6", label: "6 ローリー（新バルク）" },
];

const usageTypeOptions = [
  { code: "01", label: "01 家庭用・戸建" },
  { code: "07", label: "07 家庭用・集合" },
  { code: "09", label: "09 集合ファミリー・借家" },
  { code: "11", label: "11 バルク" },
  { code: "12", label: "12 簡易ガス" },
  { code: "13", label: "13 業務用" },
  { code: "15", label: "15 業務用（空調）" },
  { code: "16", label: "16 業務用（事務所他）" },
  { code: "17", label: "17 工業用（一般）" },
  { code: "19", label: "19 集計なし" },
  { code: "20", label: "20 その他" },
];

const decisionStatusOptions = [
  { code: "0", label: "0 確定" },
  { code: "1", label: "1 仮" },
];

const availabilityOptions = [
  { code: "0", label: "0 無" },
  { code: "1", label: "1 有" },
];

const labelClass = `w-32 mr-2 h-6 border-gray-300 rounded-md ${labelColor} font-bold flex text-center justify-center items-center`;

const AcquisitionInformation = forwardRef<any, { showData: boolean }>(
  (props, ref) => {
    const { showData } = props;
    const isFormDisabled = !showData;
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
      startDate: dayjs("", "YYYY/MM/DD"),
      endDate: null as Dayjs | null,
      groupCount: "",
      groupParent1: "",
      groupParent2: "",
      groupParent3: "",
      groupParent4: "",
      zaitakuDay: "",
      zaitakuStartHour: "",
      zaitakuEndHour: "",
      zaitakuWeek: "",
      numberRoom: "",
    });

    const handleValueChange = (
      fieldName: string,
      value: string | Dayjs | null
    ) => {
      setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    };
    useImperativeHandle(ref, () => ({
      focusFirstButton: () => {
        firstSelectRef.current?.focus();
      },
    }));
    useEffect(() => {
      if (showData) {
        setFormValues({
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
          startDate: dayjs("2024/01/25", "YYYY/MM/DD"),
          endDate: null,
          groupCount: "",
          groupParent1: "0000",
          groupParent2: "000",
          groupParent3: "000000",
          groupParent4: "000",
          zaitakuDay: "15",
          zaitakuStartHour: "13",
          zaitakuEndHour: "17",
          zaitakuWeek: "",
          numberRoom: "",
        });
      }
    }, [showData]);

    return (
      <div onKeyDown={blockTab} className="w-full text-xs py-4">
        <div
          className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}
        >
          獲得情報
        </div>
        <div className="flex flex-col p-3">
          <div className="w-full flex gap-4 py-1">
            <div className="w-1/2 flex py-1">
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
                disabled={isFormDisabled}
                ref={firstSelectRef}
              >
                開閉栓区分
              </Button>
              <div className="w-4/5">
                <CodeInputSelect
                  options={openCloseOptions}
                  value={formValues.openCloseType}
                  onChange={(value) =>
                    handleValueChange("openCloseType", value)
                  }
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>

          <div className="w-full gap-4 flex justify-between py-1">
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>取引開始日</div>
              <div className="w-4/5">
                <DatePicker
                  value={formValues.startDate}
                  onChange={(date) => handleValueChange("startDate", date)}
                  className={`h-6 w-2/5 ${inputColor}`}
                  format="YYYY/MM/DD"
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>取引中止日</div>
              <DatePicker
                value={formValues.endDate}
                onChange={(date) => handleValueChange("endDate", date)}
                className={`h-6 w-1/5 ${inputColor}`}
                format="YYYY/MM/DD"
                disabled={isFormDisabled}
              />
            </div>
          </div>
          <div className="w-full flex gap-4 py-1">
            <div className="w-1/2 flex py-1">
              <div className={`font-semibold ${labelClass}`}>開閉栓区分</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={contractOptions}
                  value={formValues.contractType}
                  onChange={(value) => handleValueChange("contractType", value)}
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>

          <div className="flex justify-between gap-4 py-1">
            <div className="flex w-1/2">
              <div className={`font-semibold ${labelClass}`}>新規登録理由</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={acquisitionRouteOptions}
                  value={formValues.acquisitionRoute}
                  onChange={(value) =>
                    handleValueChange("acquisitionRoute", value)
                  }
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex ">
                <div className={`font-semibold ${labelClass}`}>
                  新規登録理由
                </div>
                <div className="w-4/5">
                  <CodeInputSelect
                    options={customerStatusOptions}
                    value={formValues.customerStatus}
                    onChange={(value) =>
                      handleValueChange("customerStatus", value)
                    }
                    disabled={isFormDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4 py-1">
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass} h-[60px]`}>
                取引開始
              </div>
              <div className="flex flex-col gap-2 w-4/5">
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
                    disabled={isFormDisabled}
                  >
                    LPG
                  </Button>
                  {showData && <div>2025/01/01</div>}
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
                    disabled={isFormDisabled}
                  >
                    電力
                  </Button>
                  {showData && <div>2025/01/01</div>}
                </div>
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>
          <div className="w-full flex gap-4 justify-between py-1">
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>供給形態</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={groupTypeOptions}
                  value={formValues.groupType}
                  onChange={(value) => handleValueChange("groupType", value)}
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2 flex pr-2">
              <div className={`font-semibold ${labelClass}`}>集合戸数</div>
              <div className="w-4/5">
                <HalfWidthNumberInput
                  className={`${hoverInputColor} ${focusInputColor} w-[70px] rounded-md`}
                  placeholder="0"
                  size="small"
                  disabled={isFormDisabled}
                  value={formValues.numberRoom ?? ""}
                  onChange={(value) => handleValueChange("numberRoom", value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4 py-1">
            <div className="flex w-1/2 py-1 items-center">
              <div className={`font-semibold ${labelClass}`}>集合親コード</div>
              <div className="flex gap-2 items-center w-4/5">
                <HalfWidthNumberInput
                  value={formValues.groupParent1 ?? ""}
                  onChange={(value) => handleValueChange("groupParent1", value)}
                  className={`${hoverInputColor} ${focusInputColor} w-[20%] h-6 placeholder:text-black`}
                  placeholder="0000"
                  disabled={isFormDisabled}
                />
                <div> - </div>
                <HalfWidthNumberInput
                  value={formValues.groupParent2 ?? ""}
                  onChange={(value) => handleValueChange("groupParent2", value)}
                  className={`${hoverInputColor} ${focusInputColor} w-[20%] h-6 placeholder:text-black`}
                  placeholder="000"
                  disabled={isFormDisabled}
                />
                <div> - </div>
                <HalfWidthNumberInput
                  value={formValues.groupParent3 ?? ""}
                  onChange={(value) => handleValueChange("groupParent3", value)}
                  className={`${hoverInputColor} ${focusInputColor} w-[25%] h-6 placeholder:text-black`}
                  placeholder="000000"
                  disabled={isFormDisabled}
                />
                <div> - </div>
                <HalfWidthNumberInput
                  value={formValues.groupParent4 ?? ""}
                  onChange={(value) => handleValueChange("groupParent4", value)}
                  className={`${hoverInputColor} ${focusInputColor} w-[20%] h-6 placeholder:text-black`}
                  placeholder="000"
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2 flex items-center">
              <Button className="w-6 h-6" disabled={isFormDisabled}>
                ▼
              </Button>

              {showData && <div className="w-[200px]">テストさん太郎</div>}
            </div>
          </div>

          <div className="w-full flex gap-4 justify-between py-1">
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>ガス販売形態</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={inspectionTypeOptions}
                  value={formValues.inspectionType}
                  onChange={(value) =>
                    handleValueChange("inspectionType", value)
                  }
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>販売用途区分</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={usageTypeOptions}
                  value={formValues.usageType}
                  onChange={(value) => handleValueChange("usageType", value)}
                  disabled={isFormDisabled}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex py-1 gap-4">
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>販売単価設定</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={decisionStatusOptions}
                  value={formValues.decisionStatus}
                  onChange={(value) =>
                    handleValueChange("decisionStatus", value)
                  }
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>
          <div className="flex w-full gap-4 justify-between py-1">
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>オートガス</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={availabilityOptions}
                  value={formValues.autoGas}
                  onChange={(value) => handleValueChange("autoGas", value)}
                  disabled={isFormDisabled}
                />
              </div>
            </div>
            <div className="w-1/2 flex">
              <div className={`font-semibold ${labelClass}`}>自家使用</div>
              <div className="w-4/5">
                <CodeInputSelect
                  options={availabilityOptions}
                  value={formValues.privateUse}
                  onChange={(value) => handleValueChange("privateUse", value)}
                  disabled={isFormDisabled}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-3/5 flex py-1">
              <div
                className={`h-[60px] w-[125px] mr-2 border-gray-300 rounded-md bg-[#80bad7] font-bold flex text-center justify-center items-center`}
              >
                在宅日時
              </div>
              <div className="flex flex-col items-center gap-2 p-1 w-4/5">
                <div className="w-full flex gap-1">
                  <div className="flex items-center gap-1 mr-5">
                    <HalfWidthNumberInput
                      value={formValues.zaitakuDay ?? ""}
                      onChange={(value) =>
                        handleValueChange("zaitakuDay", value)
                      }
                      size="small"
                      className={`w-[50px] ${hoverInputColor} ${focusInputColor}`}
                      disabled={isFormDisabled}
                    />
                    <div>日頃</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <HalfWidthNumberInput
                      value={formValues.zaitakuStartHour ?? ""}
                      onChange={(value) =>
                        handleValueChange("zaitakuStartHour", value)
                      }
                      size="small"
                      className={`w-[50px] ${hoverInputColor} ${focusInputColor}`}
                      disabled={isFormDisabled}
                    />
                    <div>時 ～</div>
                  </div>
                  <div className="flex items-center gap-1 mr-5">
                    <HalfWidthNumberInput
                      value={formValues.zaitakuEndHour ?? ""}
                      onChange={(value) =>
                        handleValueChange("zaitakuEndHour", value)
                      }
                      size="small"
                      className={`w-[50px] ${hoverInputColor} ${focusInputColor}`}
                      disabled={isFormDisabled}
                    />
                    <div>時</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <HalfWidthNumberInput
                      value={formValues.zaitakuWeek ?? ""}
                      onChange={(value) =>
                        handleValueChange("zaitakuWeek", value)
                      }
                      size="small"
                      className={`w-[50px] ${hoverInputColor} ${focusInputColor}`}
                      disabled={isFormDisabled}
                    />
                    <Button disabled={isFormDisabled} className="ml-1 w-6 h-6">
                      ▼
                    </Button>
                    <div>曜日</div>
                  </div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <Checkbox disabled={isFormDisabled}>土</Checkbox>
                  <Checkbox disabled={isFormDisabled}>日</Checkbox>
                  <Checkbox disabled={isFormDisabled}>月</Checkbox>
                  <Checkbox disabled={isFormDisabled}>火</Checkbox>
                  <Checkbox disabled={isFormDisabled}>水</Checkbox>
                  <Checkbox disabled={isFormDisabled}>木</Checkbox>
                  <Checkbox disabled={isFormDisabled}>金</Checkbox>
                </div>
              </div>
            </div>
            <div className="w-2/5"></div>
          </div>
        </div>
      </div>
    );
  }
);

export default AcquisitionInformation;

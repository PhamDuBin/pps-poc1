import { useEffect, useRef, useState } from "react";
import OperatorSelectionModal from "./OperatorSelectionModal";
import ContinuousIssue from "./MainBusinessAreas/ContinuousIssue";
import IndividualIssue from "./MainBusinessAreas/IndividualIssue";
import TargetCustomer from "./MainBusinessAreas/TargetCustomer";
import PrintingDesignation from "./MainBusinessAreas/PrintingDesignation";
import TitleFormSetting from "./MainBusinessAreas/TitleFormSetting";
import PaperSelectionModal from "./PaperSelectionModal";
import { labelColor } from "../../constants/colors";
import { Select, Button, Radio } from "antd";

const MainBusinessScreen = () => {
  const individualIssueRef = useRef<{ focusMonthPicker: () => void }>(null);

  const [isOperationSeachModalOpen, setIsOperationSeachModalOpen] =
    useState(false);
  const [isPaperSelectionModalOpen, setIsPaperSelectionModalOpen] =
    useState(false);
  const [condition, setCondition] = useState("連続発行");
  const [isShowExtraForm, setIsShowExtraForm] = useState(false);
  const [isShowTargetCustomer, setIsShowTargetCustomer] = useState(false);
  const [isShowPrintingDesignation, setIsShowPrintingDesignation] =
    useState(false);
  const [isShowTitleFormSetting, setIsShowTitleFormSetting] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const monthPickerRef = useRef<any>(null);
  const datePickerRef = useRef<any>(null);
  const targetCustomerRef = useRef<any>(null);
  const printingDesignationRef = useRef<any>(null);
  const TitleFormSettingRef = useRef<any>(null);

  const handleCloseOperationSerachModal = () => {
    setIsOperationSeachModalOpen(false);
  };

  const handleClosePaperSelectionModalOpen = () => {
    setIsPaperSelectionModalOpen(false);
  };

  const handleChangeCondition = (value: string) => {
    setCondition(value);
  };

  const handleShowExtraForm = () => {
    setIsShowExtraForm(!isShowExtraForm);
    setTimeout(() => {
      monthPickerRef.current?.focus?.();
      datePickerRef.current?.focus?.();
    }, 0);
  };

  const handleShowTargetCustomer = () => {
    setIsShowTargetCustomer(!isShowTargetCustomer);
    setTimeout(() => {
      targetCustomerRef.current?.focusFirstButton();
    }, 0);
  };

  const handleShowPrintingDesignation = () => {
    setIsShowPrintingDesignation(!isShowPrintingDesignation);
    setTimeout(() => {
      printingDesignationRef.current?.focus();
    }, 0);
  };

  const handleShowTitleFormSetting = () => {
    setIsShowTitleFormSetting(!isShowTitleFormSetting);
    setTimeout(() => {
      TitleFormSettingRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    setIsPaperSelectionModalOpen(true);
  }, []);

  const button = `flex text-center justify-center items-center ${labelColor} border border-black xl:text-base text-xs font-bold shadow-md shadow-zinc-600 hover:bg-white`;
  const span = `w-[10%] flex justify-center text-center items-center font-bold ${labelColor}`;
  return (
    <div className="h-screen w-full flex flex-col p-4 min-w-[1080px]">
      <span
        className={`w-full h-10 font-bold xl:text-2xl text-xl flex text-center justify-center items-center ${labelColor}`}
      >
        請求書発行
      </span>
      <div className="flex flex-row items-center xl:text-base text-xs mt-3 h-8 px-8 justify-between">
        <span className={`${span}`}>用紙設定</span>
        <p className="ml-3">伝票請｜請求書（15日）〇〇商社様用</p>
        <Button
          onClick={() => setIsPaperSelectionModalOpen(true)}
          className="p-2 rounded-md border border-black h-6 w-14 text-xs flex text-center justify-center items-center shadow-md shadow-zinc-600"
        >
          再設定
        </Button>
        <span className={`${span}`}>フォーム選択</span>
        <Select
          className="w-[15%] h-7 [&>.ant-select-selector]:!bg-[#ebcec0] "
          defaultValue="請求書（大）"
          options={[
            { value: "請求書（大）", label: "請求書（大）" },
            { value: "請求書（小）", label: "請求書（小）" },
            { value: "3部料金", label: "3部料金" },
            { value: "請求書（中）", label: "請求書（中）" },
            { value: "請求書（中）3部料金", label: "請求書（中）3部料金" },
            {
              value: "請求書（大）レーザー用",
              label: "請求書（大）レーザー用",
            },
            {
              value: "請求書（小）レーザー用3部料金",
              label: "請求書（小）レーザー用3部料金",
            },
            { value: "請求書（WS01）", label: "請求書（WS01）" },
            { value: "請求書（W02）", label: "請求書（W02）" },
            { value: "請求書（WK.01）", label: "請求書（WK.01）" },
          ]}
        />
        <span className={`${span}`}>発行方法</span>

        <Radio.Group
          defaultValue={["連続発行", "個別発行"]}
          className="ml-2 flex gap-4"
        >
          <Radio value="連続発行">連続発行</Radio>
          <Radio value="個別発行">個別発行</Radio>
        </Radio.Group>
      </div>
      <div className="mt-3 flex flex-row px-40 font-bold xl:text-base text-xs justify-between h-10">
        <Button onClick={handleShowExtraForm} className={`${button} w-1/6`}>
          抽出条件 （1）
        </Button>
        <Button
          onClick={handleShowTargetCustomer}
          className={`${button} w-1/6`}
        >
          対象顧客（2）
        </Button>
        <Button
          onClick={handleShowPrintingDesignation}
          className={`${button} w-1/6`}
        >
          印刷指定（3）
        </Button>
        <Button
          onClick={handleShowTitleFormSetting}
          className={`${button} w-1/6 `}
        >
          タイトル ・鑑設定(4)
        </Button>
      </div>
      <div className="mt-3 h-[80%] border border-black p-4 overflow-auto">
        <div>
          <div>
            {condition === "連続発行" ? (
              <>
                {/* ContinuousIssue component */}
                <ContinuousIssue ref={datePickerRef} />
              </>
            ) : (
              <>
                {/* IndividualIssue component */}
                <IndividualIssue ref={monthPickerRef} />
              </>
            )}
          </div>
        </div>
        <div className="mt-2">
          <TargetCustomer
            ref={targetCustomerRef}
            onLabelClick={(title) => {
              setSelectedLabel(title);
              setIsOperationSeachModalOpen(true);
            }}
          />
        </div>
        <div>
          <PrintingDesignation ref={printingDesignationRef} />
        </div>
        <div>
          <TitleFormSetting ref={TitleFormSettingRef} />
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-between">
        <Button className={`${button} w-[10%] xl:text-base text-xs`}>
          条件保存（F3）
        </Button>
        <Button className={`${button} w-[10%] xl:text-base text-xs`}>
          伝票メモ設定(F7)
        </Button>
        <Button className={`${button} w-[10%] xl:text-base text-xs`}>
          再入力（F8）
        </Button>
        <Button className={`${button} w-[10%] xl:text-base text-xs`}>
          プレビュー（V）
        </Button>
        <Button className={`${button} w-[10%] xl:text-base text-xs`}>
          印刷（P）
        </Button>
        <Button className={`${button} w-[10%] xl:text-base text-xs`}>
          データ（H）
        </Button>
        <Button className={`${button} w-[10%] xl:text-base text-xs`}>
          閉じる（C）
        </Button>
      </div>
      {isOperationSeachModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <OperatorSelectionModal
            title={selectedLabel ?? ""}
            isOpen={isOperationSeachModalOpen}
            onClose={handleCloseOperationSerachModal}
          />
        </div>
      )}
      {isPaperSelectionModalOpen}
      <div>
        <PaperSelectionModal
          open={isPaperSelectionModalOpen}
          onClose={handleClosePaperSelectionModalOpen}
        />
      </div>
    </div>
  );
};

export default MainBusinessScreen;

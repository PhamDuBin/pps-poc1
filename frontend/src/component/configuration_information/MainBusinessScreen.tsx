import { useEffect, useRef, useState } from "react";
import OperatorSelectionModal from "./OperatorSelectionModal";
import ContinuousIssue from "./MainBusinessAreas/ContinuousIssue";
import IndividualIssue from "./MainBusinessAreas/IndividualIssue";
import TargetCustomer from "./MainBusinessAreas/TargetCustomer";
import PrintingDesignation from "./MainBusinessAreas/PrintingDesignation";
import TitleFormSetting from "./MainBusinessAreas/TitleFormSetting";
import PaperSelectionModal from "./PaperSelectionModal";
import { labelColor } from "../../constants/colors";

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

  const button = `flex text-center justify-center items-center ${labelColor} border border-black shadow-xl font-bold`;
  const span = `w-[10%] flex justify-center text-center items-center font-bold ${labelColor}`;
  return (
    <div className="h-screen w-full flex flex-col p-4">
      <span
        className={`w-full h-10 font-bold text-2xl flex text-center justify-center items-center ${labelColor}`}
      >
        請求書発行
      </span>
      <div className="flex flex-row items-center text-base mt-3 h-8 px-8 justify-between">
        <span className={`${span}`}>用紙設定</span>
        <p className="ml-3">伝票請｜請求書（15日）〇〇商社様用</p>
        <button className="p-2 rounded-md border border-black h-6 w-14 text-xs flex text-center justify-center items-center shadow-lg">
          再設定
        </button>
        <span className={`${span}`}>フォーム選択</span>
        <select className="border border-black w-[15%] h-6">
          <option>請求書（大）</option>
          <option>請求書（小）</option>
          <option>請求書（小）</option>
          <option>3部料金</option>
          <option>請求書（中）</option>
          <option>請求書（中）3部料金</option>
          <option>請求書（大）レーザー用</option>
          <option>請求書（小） レーザー用</option>
          <option>請求書（小）レーザー用3部料金</option>
          <option>請求書（WS01）</option>
          <option>請求書（W02）</option>
          <option>請求書（WK.01）</option>
        </select>
        <span className={`${span}`}>発行方法</span>
        <div className="flex items-center">
          <input
            type="radio"
            id="overall"
            name="issueMethod"
            defaultChecked
            value="連続発行"
            className="mr-1"
            onChange={(e) => handleChangeCondition(e.target.value)}
          />
          <label htmlFor="overall">連続発行</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="collective"
            name="issueMethod"
            value={"個別発行"}
            className="mr-1"
            onChange={(e) => handleChangeCondition(e.target.value)}
          />
          <label htmlFor="collective">個別発行</label>
        </div>
      </div>
      <div className="mt-3 flex flex-row px-40 font-bold text-lg justify-between h-10">
        <button onClick={handleShowExtraForm} className={`${button} w-1/6`}>
          抽出条件 （1）
        </button>
        <button
          onClick={handleShowTargetCustomer}
          className={`${button} w-1/6`}
        >
          対象顧客（2）
        </button>
        <button
          onClick={handleShowPrintingDesignation}
          className={`${button} w-1/6`}
        >
          印刷指定（3）
        </button>
        <button
          onClick={handleShowTitleFormSetting}
          className={`${button} w-1/6`}
        >
          タイトル・鑑設定（4）
        </button>
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
        <button className={`${button} w-[10%]`}>条件保存（F3）</button>
        <button className={`${button} w-[10%]`}>伝票メモ設定（F7）</button>
        <button className={`${button} w-[10%]`}>再入力（F8）</button>
        <button className={`${button} w-[10%]`}>プレビュー（V）</button>
        <button className={`${button} w-[10%]`}>印刷（P）</button>
        <button className={`${button} w-[10%]`}>データ（H）</button>
        <button className={`${button} w-[10%]`}>閉じる（C）</button>
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
      {/* {isPaperSelectionModalOpen}
        <div className="absolute bg-white rounded shadow-lg w-[60%] flex items-center justify-center p-4 z-10">
          <PaperSelectionModal 
          isOpen = {isPaperSelectionModalOpen}
          onClose={handleClosePaperSelectionModalOpen}
          />
        </div> */}
    </div>
  );
};

export default MainBusinessScreen;

import React, { useEffect, useRef, useState } from "react";
import RightPanel from "../../component/sale_slip_entry/RightPanel";
import LeftPanel from "../../component/sale_slip_entry/LeftPanel";
import CheckSaleByCategoryScreen from "../../component/transaction_information/1.1.1_03/CheckSaleByCategoryScreen";
import CurrentMonthDetails from "../../component/transaction_information/1.1.1_03/CurrentMonthDetails";
import CheckCurrentMonthSalesStatusScreen from "../../component/transaction_information/1.1.1_03/CheckCurrentMonthSalesStatus";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import BalanceDetailScreen from "../../component/transaction_information/1.1.1_03/BalanceDetailScreen";
import MeterReadingInforScreen from "../../component/transaction_information/1.1.1_03/MeterReadingInforScreen";
import CRM from "../../component/transaction_information/1.1.1_03/CRM";
import LinkDestinationScreen from "../../component/transaction_information/1.1.1_03/LinkDestinationScreen";
import { handleNavigationKey } from "../../utils/InputHandlers";
//import AdvanceSearchModal from "../../component/sale_slip_entry/3.3.3_01/AdvanceSearchModal";
import SalesSlipEntry from "../../component/sale_slip_entry/3.3.3_01/SalesSlipEntry";
const SaleSlipEntryScreen = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveScreen(buttonName);
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "大分類別売上":
        return <CheckSaleByCategoryScreen />;
      case "当月明細":
        return <CurrentMonthDetails />;
      case "当月売上状況":
        return <CheckCurrentMonthSalesStatusScreen />;
      case "残高内訳":
        return <BalanceDetailScreen />;
      case "検針情報":
        return <MeterReadingInforScreen />;
      case "年間明細":
        return <LinkDestinationScreen />;
      case "CRM":
        return <CRM />;
      case "ポイント":
        return <LinkDestinationScreen />;
      case "印刷依頼情報":
        return <LinkDestinationScreen />;
      case "自振照会":
        return <LinkDestinationScreen />;
      case "大分類残高":
        return <LinkDestinationScreen />;

      default:
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContainerKeyDown = (e: KeyboardEvent) => {
      const focusableElements = Array.from(
        container.querySelectorAll(
          'input, button, [role="button"], select, textarea'
        )
      ) as HTMLElement[];

      const activeElement = document.activeElement as HTMLElement;
      const currentIndex = focusableElements.indexOf(activeElement);

      if (currentIndex !== -1) {
        handleNavigationKey(e, currentIndex, focusableElements);
      }
    };

    container.addEventListener("keydown", handleContainerKeyDown as any);
    return () => {
      container.removeEventListener("keydown", handleContainerKeyDown as any);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#d8dadc] h-screen flex flex-row"
    >
      {!showLeftPanel && (
        <div className="relative flex items-center h-full w-2 bg-[#e6cfcf]"></div>
      )}
      {showLeftPanel && (
        <div className="w-[600px] transition-all duration-300 absolute z-20">
          <LeftPanel
            showAdvanceSearch={showAdvanceSearch}
            setShowAdvanceSearch={setShowAdvanceSearch}
          />
        </div>
      )}
      {showLeftPanel ? (
        <CircleArrowLeft
          className={`absolute left-[36.8rem] top-1/2 -translate-y-1/2 text-black w-5 h-5 cursor-pointer bg-[#d8dadc] rounded-full shadow 
            ${showAdvanceSearch ? "z-0 hidden pointer-events-none" : "z-30"}`}
          onClick={() => setShowLeftPanel(false)}
        />
      ) : (
        <CircleArrowRight
          className={`absolute left-2 top-1/2 -translate-y-1/2 text-black w-5 h-5 cursor-pointer bg-[#d8dadc] rounded-full
            ${showAdvanceSearch ? "z-0 pointer-events-none" : "z-30"}`}
          onClick={() => setShowLeftPanel(true)}
        />
      )}
      <div className="my-3 ml-2 flex-1 h-[calc(100%-0.75rem*2)] flex flex-row min-w-0 z-10">
        <div className="relative mr-2 border border-black w-10/12 text-black flex justify-center ">
          {/* <div className="overflow-y-auto">{renderActiveScreen()}</div> */}
          {/* <div className="overflow-y-auto">
            <SalesSlipEntry />
          </div> */}
          <SalesSlipEntry />
        </div>

        <RightPanel
          onButtonClick={handleButtonClick}
          activeButton={activeScreen}
        />
      </div>
    </div>
  );
};

export default SaleSlipEntryScreen;

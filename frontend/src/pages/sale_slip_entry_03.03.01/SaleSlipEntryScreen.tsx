import React, { useEffect, useRef, useState } from "react";
import RightPanel from "../../component/sale_slip_entry/RightPanel";
import LeftPanel from "../../component/sale_slip_entry/LeftPanel";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { handleNavigationKey } from "../../utils/InputHandlers";
import SalesSlipEntry from "../../component/sale_slip_entry/3.3.3_01/SalesSlipEntry";
const SaleSlipEntryScreen = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [showCustomerInLeftPanel, setShowCustomerInLeftPanel] = useState(false);

  const handleOpenAndResetLeftPanel = () => {
    setShowLeftPanel(true);
    setShowCustomerInLeftPanel(false);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveScreen(buttonName);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContainerKeyDown = (e: KeyboardEvent) => {
      const focusableElements = Array.from(
        container.querySelectorAll(
          'input, button, [role="registmodal"], select, textarea'
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
            showCustomer={showCustomerInLeftPanel}
            setShowCustomer={setShowCustomerInLeftPanel}
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
        <div className="relative mr-2 border border-black w-10/12 text-black flex justify-center overflow-auto bg-white">
          <SalesSlipEntry
            onOpenLeftPanelForSearch={handleOpenAndResetLeftPanel}
          />
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

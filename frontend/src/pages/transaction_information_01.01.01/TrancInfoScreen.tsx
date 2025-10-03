import React, { useEffect, useRef, useState } from "react";
import RightPanel from "../../component/transaction_information/RightPanel";
import LeftPanel from "../../component/transaction_information/LeftPanel";
import CheckSaleByCategoryScreen from "../../component/transaction_information/1.1.1_03/CheckSaleByCategoryScreen";
import CurrentMonthDetails from "../../component/transaction_information/1.1.1_03/CurrentMonthDetails";
import CheckCurrentMonthSalesStatusScreen from "../../component/transaction_information/1.1.1_03/CheckCurrentMonthSalesStatus";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import BalanceDetailScreen from "../../component/transaction_information/1.1.1_03/BalanceDetailScreen";
import MeterReadingInforScreen from "../../component/transaction_information/1.1.1_03/MeterReadingInforScreen";
import CRM from "../../component/transaction_information/1.1.1_03/CRM";
import LinkDestinationScreen from "../../component/transaction_information/1.1.1_03/LinkDestinationScreen";
export const handleNavigationKey = (
  e: KeyboardEvent,
  currentIndex: number,
  focusableElements: HTMLElement[]
) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    let nextIndex = currentIndex;
    const total = focusableElements.length;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % total;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + total) % total;
    }

    focusableElements[nextIndex]?.focus();
  }
};

const TrancInfoScreen = () => {
  const screens = [
    "当月明細",
    "当月売上状況",
    "大分類別売上",
    "残高内訳",
    "検針情報",
    "年間明細",
    "CRM",
    "ポイント",
    "印刷依頼情報",
    "自振照会",
    "大分類残高",
  ];
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [activeScreen, setActiveScreen] = useState<string>(screens[0]);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);

  const lastLeftPanelButtonRef = useRef<HTMLButtonElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const mainScreenRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveScreen(buttonName);
  };

  const handleSwitchScreen = (direction: "next" | "prev") => {
    if (!activeScreen) {
      setActiveScreen(screens[0]);
      return;
    }

    const idx = screens.indexOf(activeScreen);
    let newIndex = direction === "next" ? idx + 1 : idx - 1;
    if (newIndex < 0) newIndex = screens.length - 1;
    if (newIndex >= screens.length) newIndex = 0;
    setActiveScreen(screens[newIndex]);
  };

  const handleFirstButtonFocus = () => {
    setIsNavActive(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "大分類別売上":
        return (
          <CheckSaleByCategoryScreen onSwitchScreen={handleSwitchScreen} />
        );
      case "当月明細":
        return <CurrentMonthDetails onSwitchScreen={handleSwitchScreen} />;
      case "当月売上状況":
        return (
          <CheckCurrentMonthSalesStatusScreen
            onSwitchScreen={handleSwitchScreen}
          />
        );
      case "残高内訳":
        return <BalanceDetailScreen onSwitchScreen={handleSwitchScreen} />;
      case "検針情報":
        return <MeterReadingInforScreen onSwitchScreen={handleSwitchScreen} />;
      case "年間明細":
        return <LinkDestinationScreen />;
      case "CRM":
        return <CRM onSwitchScreen={handleSwitchScreen} />;
      case "ポイント":
        return <LinkDestinationScreen />;
      case "印刷依頼情報":
        return <LinkDestinationScreen />;
      case "自振照会":
        return <LinkDestinationScreen />;
      case "大分類残高":
        return <LinkDestinationScreen />;
      default:
        return <CurrentMonthDetails />;
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      const leftPanel = leftPanelRef.current;
      if (leftPanel && leftPanel.contains(activeElement)) {
        const focusableElements = Array.from(
          leftPanel.querySelectorAll(
            'input:not([disabled]), button:not([disabled]), [role="button"], select, textarea'
          )
        ) as HTMLElement[];

        const currentIndex = focusableElements.indexOf(activeElement);
        if (currentIndex !== -1) {
          handleNavigationKey(e, currentIndex, focusableElements);
        }
      }
      if (isNavActive && e.key === "Tab") {
        e.preventDefault();
        handleSwitchScreen(e.shiftKey ? "prev" : "next");
      }
      const isInsideMainScreen = mainScreenRef.current?.contains(activeElement);
      if (
        isNavActive &&
        isInsideMainScreen &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [activeScreen, isNavActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^F\d{1,2}$/.test(e.key)) {
        if (![""].includes(e.key)) {
          e.preventDefault();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-row bg-[#d8dadc]">
      {!showLeftPanel && (
        <>
          <div className="relative flex items-center h-full w-2 bg-[#e6cfcf]"></div>
          <CircleArrowRight
            className={`absolute left-2 top-1/2 -translate-y-1/2 text-black w-5 h-5 cursor-pointer bg-white rounded-full
                  ${showAdvanceSearch ? "z-0 pointer-events-none" : "z-20"}`}
            onClick={() => setShowLeftPanel(true)}
          />
        </>
      )}
      <div
        ref={leftPanelRef}
        className={`transition-all absolute duration-300 z-20 ${
          showLeftPanel ? "" : "hidden"
        }`}
      >
        <LeftPanel
          showAdvanceSearch={showAdvanceSearch}
          setShowAdvanceSearch={setShowAdvanceSearch}
          lastButtonRef={lastLeftPanelButtonRef}
          firstInputRef={firstInputRef}
        />
        <CircleArrowLeft
          className={`absolute left-[17.3rem] top-1/2 -translate-y-1/2 text-black w-5 h-5 cursor-pointer bg-white rounded-full shadow
              ${showAdvanceSearch ? "z-0 hidden pointer-events-none" : "z-20"}`}
          onClick={() => setShowLeftPanel(false)}
        />
      </div>

      <div className="my-3 ml-2 flex-1 h-[calc(100%-0.75rem*2)] flex flex-row z-10 w-full">
        <div
          ref={mainScreenRef}
          className="relative mr-2 border border-black w-10/12 text-black flex justify-center"
        >
          <div className="overflow-y-auto w-full">{renderActiveScreen()}</div>
        </div>
        <RightPanel
          ref={rightPanelRef}
          onButtonClick={handleButtonClick}
          activeButton={activeScreen}
          buttons={screens}
          onFirstButtonFocus={handleFirstButtonFocus}
        />
      </div>
    </div>
  );
};

export default TrancInfoScreen;

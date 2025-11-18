import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { handleNavigationKey040504 } from "../../utils/InputHandlers";

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

const TrancInfoScreen = () => {
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

  const handleSwitchScreen = useCallback(
    (direction: "next" | "prev") => {
      if (!activeScreen) {
        setActiveScreen(screens[0]);
        return;
      }

      const idx = screens.indexOf(activeScreen);
      let newIndex = direction === "next" ? idx + 1 : idx - 1;

      if (newIndex < 0) newIndex = screens.length - 1;
      if (newIndex >= screens.length) newIndex = 0;

      setActiveScreen(screens[newIndex]);
    },
    [activeScreen]
  );

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

      // +++ LOGIC CHO LEFTPANEL +++
      if (leftPanel && leftPanel.contains(activeElement)) {
        // GIỮ NGUYÊN: Logic Tab đặc biệt (ưu tiên hàng đầu)
        if (
          e.key === "Tab" &&
          !e.shiftKey &&
          activeElement === lastLeftPanelButtonRef.current
        ) {
          e.preventDefault();
          setShowLeftPanel(false);
          // Focus vào element đầu tiên của main screen
          setTimeout(() => {
            const firstFocusable = mainScreenRef.current?.querySelector(
              'button:not([disabled]), input:not([disabled]), [role="radio"]'
            ) as HTMLElement;
            if (firstFocusable) {
              firstFocusable.focus();
              setIsNavActive(true);
            }
          }, 0);
          return;
        }

        // GIỮ NGUYÊN: Logic Tab (chung) sẽ không làm gì cả, để trình duyệt xử lý
        if (e.key === "Tab") {
          return;
        }

        // +++ THAY THẾ: Gọi handleNavigationKey040504 +++
        const focusableElements = Array.from(
          leftPanel.querySelectorAll(
            'input:not([disabled]), button:not([disabled]), [role="button"], select, textarea'
          )
        ) as HTMLElement[];

        const currentIndex = focusableElements.indexOf(activeElement);
        if (currentIndex !== -1) {
          // Gọi hàm mới: Hàm này đã bao gồm logic Lên/Xuống = Tab/Shift+Tab
          handleNavigationKey040504(e, currentIndex, focusableElements);
        }
        return; // Đã xử lý xong LeftPanel, dừng lại
      }

      // +++ LOGIC CHO MAIN SCREEN +++

      // GIỮ NGUYÊN: Logic Tab đặc biệt (chuyển screen)
      if (isNavActive && e.key === "Tab") {
        e.preventDefault();
        handleSwitchScreen(e.shiftKey ? "prev" : "next");
        // Focus vào element đầu tiên của screen mới sau khi switch
        setTimeout(() => {
          const firstFocusable = mainScreenRef.current?.querySelector(
            'button:not([disabled]), input:not([disabled]), [role="radio"]'
          ) as HTMLElement;
          firstFocusable?.focus();
        }, 0);
        return;
      }

      // +++ THAY THẾ: Logic điều hướng nội bộ cho Main Screen +++
      const isInsideMainScreen = mainScreenRef.current?.contains(activeElement);
      if (isNavActive && isInsideMainScreen && mainScreenRef.current) {
        // (Thêm các kiểm tra ngoại lệ nếu cần)
        // if (activeElement.closest(".ant-modal-root")) return;
        // if (activeElement.closest(".ant-select-open")) return;
        if (
          activeElement &&
          activeElement.closest('[data-calendar-popup="true"]')
        ) {
          return;
        }

        const allElements = Array.from(
          mainScreenRef.current.querySelectorAll(
            // <--- GIỜ ĐÃ AN TOÀN
            "input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])"
          )
        ) as HTMLElement[];

        // Lọc các element (logic lọc radio/checkbox từ các file trước)
        const focusableElements = allElements.filter((el) => {
          if (el.offsetParent === null) return false; // Bỏ qua element bị ẩn

          if (
            el.tagName === "INPUT" &&
            (el as HTMLInputElement).type === "radio"
          ) {
            const radioGroup = el.closest(".ant-radio-group");
            if (!radioGroup) return true;
            const checkedRadio = radioGroup.querySelector(
              'input[type="radio"]:checked'
            ) as HTMLInputElement | null;

            if (checkedRadio) return el === checkedRadio;

            const firstRadioInGroup = radioGroup.querySelector(
              'input[type="radio"]'
            );
            return el === firstRadioInGroup;
          }
          if (
            el.tagName === "INPUT" &&
            (el as HTMLInputElement).type === "checkbox"
          ) {
            const checkboxGroup = el.closest(".ant-checkbox-group-navigable");
            if (!checkboxGroup) return true;

            const firstCheckboxInGroup = checkboxGroup.querySelector(
              'input[type="checkbox"]'
            );
            return el === firstCheckboxInGroup;
          }
          return true;
        });

        const currentIndex = focusableElements.indexOf(activeElement);
        handleNavigationKey040504(e, currentIndex, focusableElements);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [activeScreen, isNavActive, handleSwitchScreen]);

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
    <div className="w-full h-screen flex flex-row bg-bg-alt">
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

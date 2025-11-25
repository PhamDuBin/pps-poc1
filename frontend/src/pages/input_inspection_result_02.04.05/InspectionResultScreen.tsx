// src/screens/InspectionResultScreen.tsx

import RightPanel from "../../component/input_inspection_result/RightPanel";
import TopBar from "../../component/input_inspection_result/TopBar";
import { useEffect, useRef } from "react";
import MainBusinessScreen from "../../component/input_inspection_result/MainBusinessScreen";
import { handleNavigationKey } from "../../utils/InputHandlers";

const InspectionResultScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContainerKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key.startsWith("F") && !isNaN(Number(key.substring(1)))) {
        e.preventDefault();
        return;
      }

      if (e.ctrlKey && e.altKey) {
        e.preventDefault();
        return;
      }

      const isAdvanceSearchOpen = container.querySelector(
        ".advance-search-modal"
      );
      if (isAdvanceSearchOpen) return;

      const confirmationModalRoot = container.querySelector(".ant-modal-root");
      if (
        confirmationModalRoot &&
        (confirmationModalRoot as HTMLElement).style.display !== "none" &&
        getComputedStyle(confirmationModalRoot).pointerEvents !== "none"
      ) {
        return;
      }

      const activeElement = document.activeElement as HTMLElement;

      if (
        activeElement &&
        activeElement.closest('[data-calendar-popup="true"]')
      ) {
        return;
      }

      if (e.key === "Enter") {
        if (activeElement?.classList.contains("custom-date-input")) return;
        if (activeElement?.classList.contains("japanese-calendar")) return;
        if (activeElement?.closest(".ant-picker")) return;
      }

      if (activeElement?.classList.contains("sale-slip-row")) {
        if (
          [
            "ArrowUp",
            "ArrowDown",
            "ArrowRight",
            "ArrowLeft",
            "Enter",
            "Tab",
          ].includes(e.key)
        ) {
          return;
        }
      }

      const topbarEls = Array.from(
        container.querySelectorAll(
          "#topbar input:not([disabled]), #topbar button:not([disabled]), #topbar select:not([disabled]), #topbar textarea:not([disabled])"
        )
      ) as HTMLElement[];
      const rightEls = Array.from(
        container.querySelectorAll(
          "#rightpanel input:not([disabled]), #rightpanel button:not([disabled]), #rightpanel select:not([disabled]), #rightpanel textarea:not([disabled])"
        )
      ) as HTMLElement[];
      const mainEls = Array.from(
        container.querySelectorAll(
          "#mainscreen input:not([disabled]), #mainscreen button:not([disabled]), #mainscreen select:not([disabled]), #mainscreen textarea:not([disabled])"
        )
      ) as HTMLElement[];

      let focusableElements = [...topbarEls, ...rightEls, ...mainEls];

      focusableElements = focusableElements.filter((el) => {
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
          else return el === radioGroup.querySelector('input[type="radio"]');
        }
        if (
          el.tagName === "INPUT" &&
          (el as HTMLInputElement).type === "checkbox"
        ) {
          const checkboxGroup = el.closest(".ant-checkbox-group-navigable");
          if (!checkboxGroup) return true;
          return el === checkboxGroup.querySelector('input[type="checkbox"]');
        }

        return true;
      });

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
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col xl:text-base text-xs"
    >
      <div id="topbar">
        <TopBar />
      </div>
      <div className="flex-1 flex flex-row min-h-0">
        <div id="mainscreen" className="w-full overflow-x-auto z-10">
          <MainBusinessScreen />
        </div>
        <div id="rightpanel">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default InspectionResultScreen;

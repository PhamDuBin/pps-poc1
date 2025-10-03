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

      const focusableElements = [...topbarEls, ...rightEls, ...mainEls];

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

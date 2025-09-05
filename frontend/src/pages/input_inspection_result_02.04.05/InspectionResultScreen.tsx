// src/screens/InspectionResultScreen.tsx

import RightPanel from "../../component/input_inspection_result/RightPanel";
import TopBar from "../../component/input_inspection_result/TopBar";
import { CustomerSearchModal } from "../../component/input_inspection_result/CustomerSearchModal";
import { useEffect, useRef, useState } from "react";
import MainBusinessScreen from "../../component/input_inspection_result/MainBusinessScreen";
import { handleNavigationKey } from "../../utils/InputHandlers";

const InspectionResultScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
      className="w-full h-screen flex flex-col xl:text-base text-xs"
    >
      <TopBar />
      <div className="flex-1 flex flex-row min-h-0">
        <div className="w-full overflow-x-auto">
          <MainBusinessScreen />
        </div>
        <RightPanel />
      </div>
      {isModalOpen && (
        <CustomerSearchModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default InspectionResultScreen;

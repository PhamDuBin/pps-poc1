// src/screens/InspectionResultScreen.tsx

import RightPanel from "../../component/input_inspection_result/RightPanel";
import TopBar from "../../component/input_inspection_result/TopBar";
import { CustomerSearchModal } from "../../component/input_inspection_result/CustomerSearchModal";
import { useState } from "react";
import MainBusinessScreen from "../../component/input_inspection_result/MainBusinessScreen";

const InspectionResultScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className="w-full h-screen flex flex-col xl:text-base text-xs">
      <TopBar />
      <div className="flex-1 flex flex-row min-h-0">
        <div className="w-full">
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

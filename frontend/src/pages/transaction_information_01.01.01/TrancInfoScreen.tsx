import React, { useState } from "react";
import RightPanel from "../../component/transaction_information/RightPanel";
import LeftPanel from "../../component/transaction_information/LeftPanel";
import CheckSaleByCategoryScreen from "../../component/transaction_information/1.1.1_03/CheckSaleByCategoryScreen";
import CurrentMonthDetails from "../../component/transaction_information/1.1.1_03/CurrentMonthDetails";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const TrancInfoScreen = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveScreen(buttonName);
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "大分類別売上":
        return <CheckSaleByCategoryScreen />;
      case "当月明細":
        return <CurrentMonthDetails />;
      default:
    }
  };

  return (
    <div className="w-full h-screen flex flex-row">
      {!showLeftPanel && (
        <div className="relative flex items-center h-full w-2 bg-[#e6cfcf]"></div>
      )}
      {showLeftPanel && (
        <div className="transition-all duration-300">
          <LeftPanel />
        </div>
      )}

      <div className="my-3 ml-2 w-full h-[calc(100%-0.75rem*2)] flex flex-row">
        <div className="relative mr-2 border border-black w-10/12 bg-[#f0f0f0] text-black flex  justify-center">
          {showLeftPanel ? (
            <CircleArrowLeft
              className="absolute -left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 z-10 cursor-pointer bg-white rounded-full shadow"
              onClick={() => setShowLeftPanel(false)}
            />
          ) : (
            <CircleArrowRight
              className="absolute -left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 z-10 cursor-pointer bg-white rounded-full"
              onClick={() => setShowLeftPanel(true)}
            />
          )}
          {renderActiveScreen()}
        </div>
        <RightPanel
          onButtonClick={handleButtonClick}
          activeButton={activeScreen}
        />
      </div>
    </div>
  );
};

export default TrancInfoScreen;

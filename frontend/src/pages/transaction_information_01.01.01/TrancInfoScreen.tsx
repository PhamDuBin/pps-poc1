import React, { useState } from "react";
import RightPanel from "../../component/transaction_information/RightPanel";
import LeftPanel from "../../component/transaction_information/LeftPanel";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const TrancInfoScreen = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(false);

  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      {!showLeftPanel && (
        <div className="relative flex items-center h-full w-2 bg-[#e6cfcf]"></div>
      )}
      {showLeftPanel && (
        <div className="transition-all duration-300">
          <LeftPanel />
        </div>
      )}

      <div className="my-3 ml-2 w-full h-[calc(100%-0.75rem*2)] flex flex-row">
        <div className="relative mr-2 border border-black w-10/12 bg-[#f0f0f0] text-black">
          {showLeftPanel ? (
            <CircleArrowLeft
              className="absolute -left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 z-10 cursor-pointer bg-white rounded-full shadow"
              onClick={() => setShowLeftPanel(false)}
            />
          ) : (
            <CircleArrowRight
              className="absolute -left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 z-10 cursor-pointer bg-white rounded-full shadow"
              onClick={() => setShowLeftPanel(true)}
            />
          )}
        </div>
        <RightPanel />
      </div>
    </div>
  );
};

export default TrancInfoScreen;

import React from "react";

const steps = [
  { id: 1, label: "伝票区分選択" },
  { id: 2, label: "商品検索" },
  { id: 3, label: "詳細情報" },
];

interface StatusBarProps {
  currentStep: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ currentStep }) => {
  const activeStep = steps.find((step) => step.id === currentStep);

  return (
    <div className="w-full">
      <div className="px-4 sm:px-8 pt-8 pb-4">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="relative flex flex-col items-center">
                  {isActive && (
                    <div className="absolute bottom-full mb-3 w-max">
                      <div className="relative bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg">
                        {step.label}
                        <div className="absolute left-1/2 -bottom-1 w-3 h-3 bg-gray-200 transform -translate-x-1/2 rotate-45"></div>
                      </div>
                    </div>
                  )}
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-colors duration-300
                      ${isCompleted || isActive ? "bg-blue-500" : "bg-gray-300"}
                    `}
                  ></div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 transition-colors duration-300
                      ${isCompleted ? "bg-blue-500" : "bg-gray-300"}
                    `}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {activeStep && (
        <h2 className="text-center text-2xl font-bold text-gray-800 mt-2">
          {activeStep.label}
        </h2>
      )}
    </div>
  );
};

export default StatusBar;

import { Input, Button } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { inputColor, labelColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import PersonnelSearchModal from "../../input_inspection_result/PersonnelSearchModal";

const AreaInfo = forwardRef<any, { showData: boolean }>((props, ref) => {
  const headerCellClass = `h-6 px-2 ${labelColor} font-bold text-center flex items-center justify-center text-sm rounded-md`;
  const rowLabelClass = `h-6 w-32 px-2 ${labelColor} font-bold flex items-center justify-center text-sm rounded-md`;
  const rows = ["営業", "検針", "集金", "配送", "点検", "保安"];
  const firstInputRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showData } = props;
  const isFormDisabled = !showData;

  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstInputRef.current?.focus();
    },
  }));

  const handleNumericInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    max: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value.slice(0, max);
  };

  return (
    <div onKeyDown={blockTab} className="w-full text-xs">
      <div
        className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}
      >
        担当・地区情報
      </div>

      <div className="mt-3 grid grid-cols-[128px_1fr_1fr_1.5fr] gap-x-4 gap-y-2 items-center p-3">
        <div></div>
        <div className={headerCellClass}>担当者</div>
        <div className={headerCellClass}>地区</div>
        <div className={headerCellClass}>順路</div>

        {rows.map((label) => (
          <React.Fragment key={label}>
            <div className={rowLabelClass}>{label}</div>

            <div className="flex items-center">
              <Input
                ref={label === "営業" ? firstInputRef : null}
                className={`h-6 w-32 text-center ${inputColor}`}
                defaultValue={"000000"}
                maxLength={6}
                onChange={(e) => handleNumericInput(e, 6)}
                disabled={isFormDisabled}
              />
              <Button
                onClick={() => setIsModalOpen(true)}
                className="h-6 w-6 p-0 rounded-md shadow-md shadow-zinc-500 ml-2"
                disabled={isFormDisabled}
              >
                ▼
              </Button>
            </div>

            {label === "保安" ? (
              <>
                <div></div>
                <div></div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <Input
                    className={`h-6 w-32 text-center ${inputColor}`}
                    defaultValue={"000"}
                    maxLength={3}
                    onChange={(e) => handleNumericInput(e, 3)}
                    disabled={isFormDisabled}
                  />
                  <Button
                    onClick={() => {
                      const newWindow = window.open(
                        "/link-destination",
                        "_blank",
                        "width=500,height=300,noopener,noreferrer"
                      );
                      if (newWindow) {
                        newWindow.focus();
                      }
                    }}
                    className="h-6 w-6 p-0 rounded-md shadow-md shadow-zinc-500 ml-2"
                    disabled={isFormDisabled}
                  >
                    ▼
                  </Button>
                </div>

                <div className="flex items-center">
                  <Input
                    className={`h-6 w-32 text-center ${inputColor}`}
                    defaultValue={"0000"}
                    maxLength={4}
                    onChange={(e) => handleNumericInput(e, 4)}
                    disabled={isFormDisabled}
                  />
                  <span className="mx-1">-</span>
                  <Input
                    className={`h-6 w-32 text-center ${inputColor}`}
                    defaultValue={"000"}
                    maxLength={3}
                    onChange={(e) => handleNumericInput(e, 3)}
                    disabled={isFormDisabled}
                  />
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      {isModalOpen && (
        <PersonnelSearchModal onSelectAndClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
});

export default AreaInfo;

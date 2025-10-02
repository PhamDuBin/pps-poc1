import { Button } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  focusInputColor,
  hoverInputColor,
  labelColor,
} from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import PersonnelSearchModal from "../../input_inspection_result/PersonnelSearchModal";
import HalfWidthNumberInput from "../../HalfWidthNumberInput";

const AreaInfo = forwardRef<any, { showData: boolean }>((props, ref) => {
  const headerCellClass = `h-6 px-2 ${labelColor} font-bold text-center flex items-center justify-center text-sm rounded-md`;
  const rowLabelClass = `h-6 w-32 px-2 ${labelColor} font-bold flex items-center justify-center text-sm rounded-md`;
  const rows = ["営業", "検針", "集金", "配送", "点検", "保安"];
  const firstInputRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showData } = props;
  const isFormDisabled = !showData;

  const [formValues, setFormValues] = useState<any>({});

  const handleChange = (name: string, val: string) => {
    setFormValues((prev: any) => ({
      ...prev,
      [name]: val,
    }));
  };

  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstInputRef.current?.focus();
    },
  }));

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
              <HalfWidthNumberInput
                ref={label === "営業" ? firstInputRef : null}
                className={`h-6 w-32 text-center ${hoverInputColor} ${focusInputColor}`}
                value={formValues[`${label}_person`] || ""}
                maxLength={6}
                onChange={(val) => handleChange(`${label}_person`, val)}
                disabled={isFormDisabled}
                placeholder="000000"
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
                  <HalfWidthNumberInput
                    className={`h-6 w-32 text-center ${hoverInputColor} ${focusInputColor}`}
                    value={formValues[`${label}_area`] || ""}
                    maxLength={3}
                    onChange={(val) => handleChange(`${label}_area`, val)}
                    disabled={isFormDisabled}
                    placeholder="000"
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
                  <HalfWidthNumberInput
                    className={`h-6 w-32 text-center ${hoverInputColor} ${focusInputColor}`}
                    value={formValues[`${label}_route1`] || ""}
                    maxLength={4}
                    onChange={(val) => handleChange(`${label}_route1`, val)}
                    disabled={isFormDisabled}
                    placeholder="0000"
                  />
                  <span className="mx-1">-</span>
                  <HalfWidthNumberInput
                    className={`h-6 w-32 text-center ${hoverInputColor} ${focusInputColor}`}
                    value={formValues[`${label}_route2`] || ""}
                    maxLength={3}
                    onChange={(val) => handleChange(`${label}_route2`, val)}
                    disabled={isFormDisabled}
                    placeholder="000"
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

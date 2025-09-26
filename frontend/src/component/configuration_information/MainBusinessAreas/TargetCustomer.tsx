import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { inputColor, labelColor } from "../../../constants/colors";
import { Button } from "antd";
import { blockTab } from "../../../utils/InputHandlers";
interface TargetCustomerProps {
  onLabelClick?: (title: string) => void;
}

export interface TargetCustomerRef {
  focusFirstButton: () => void;
  getContainerNode: () => HTMLDivElement | null;
}

const TargetCustomer = forwardRef<TargetCustomerRef, TargetCustomerProps>(
  ({ onLabelClick }, ref) => {
    const firstButtonRef = useRef<HTMLButtonElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      focusFirstButton: () => {
        firstButtonRef.current?.focus();
      },
      getContainerNode: () => {
        return containerRef.current;
      },
    }));

    const [isOpenModalF1, setModalF1Open] = useState(false);

    const labelClass = `${labelColor} border border-gray-400 px-2 flex items-center justify-center min-h-[32px] w-[160px]`;

    const buttonTitle = [
      "事業者",
      "事業所",
      "管理部門",
      "開閉栓区分",
      "供給業態",
      "販売用途区分",
      "締日",
      "集金方法",
      "集金日",
      "自振区分",
      "料金標No.",
      "検針予定日",
      "請求発行区分",
    ];
    const gridItems = Array.from(
      { length: 18 },
      (_, index) => buttonTitle[index] || null
    );
    return (
      <>
        <div
          tabIndex={0}
          onKeyDown={blockTab}
          ref={containerRef}
          className="border border-black min-h-[120px] p-2 xl:text-base text-sm"
        >
          <div className={`${labelColor} font-bold text-center py-2`}>
            対象顧客
          </div>
          <div className="grid grid-cols-4 my-2">
            {buttonTitle.map((title, index) => (
              <div className="flex py-2 font-bold gap-2" key={title}>
                <Button
                  ref={index === 0 ? firstButtonRef : null}
                  onClick={() => onLabelClick?.(title)}
                  className={`${labelClass} font-bold  shadow-md shadow-zinc-600 focus:border-2 focus:border-blue-600 hover:bg-white`}
                >
                  {title}
                </Button>
                <div>指定済み</div>
              </div>
            ))}
          </div>
          <div className="flex font-bold justify-between items-center pb-6 ">
            <Button
              onClick={() => setModalF1Open(true)}
              className={`${labelColor} border shadow-md font-bold hover:bg-white shadow-zinc-600 border-gray-400 flex items-center justify-center h-[60px] w-[160px]`}
            >
              顧客抽出
            </Button>
            <div
              className={`grid grid-cols-6 border-l w-max border-t border-black overflow-y-auto h-14 ${inputColor}`}
            >
              {gridItems.map((title, index) => (
                <div
                  key={index}
                  className="border-r border-b border-black px-4 h-[30px] w-[150px] flex items-center justify-center"
                >
                  {title}
                </div>
              ))}
            </div>
          </div>
        </div>
        {isOpenModalF1 && (
          <ModalF1
            isOpen={isOpenModalF1}
            onClose={() => setModalF1Open(false)}
          />
        )}
      </>
    );
  }
);

export default TargetCustomer;

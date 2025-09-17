import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
interface TargetCustomerProps {
  onLabelClick?: (title: string) => void;
}

const TargetCustomer: React.FC<TargetCustomerProps> = ({onLabelClick }) => {

    const [isOpenModalF1, setModalF1Open] = useState(false);

    const labelClass ="bg-[#D9D9D9] border border-gray-400 px-2 flex items-center justify-center min-h-[32px] w-[160px]";

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
    ]

    
  return (
    <>
        <div className="border border-black min-h-[120px] p-2">
            <div className="bg-[#D9D9D9] font-bold text-center py-2">
                対象顧客
            </div>
            <div className="grid grid-cols-4 my-2">
                {buttonTitle.map((title) => (
                    <div className="flex py-2 font-bold gap-2" key={title}>
                        <button 
                        onClick={() => onLabelClick?.(title)}
                        className={`${labelClass } shadow-lg`} >
                            {title}
                        </button>
                        <div>指定済み</div>
                    </div>
                ))}
            </div>
            <div className="flex font-bold justify-between items-center pb-6">
                <button 
                onClick = {() => setModalF1Open(true)}
                className="bg-[#D9D9D9] border border-gray-400 flex items-center justify-center h-[60px] w-[160px]">
                    顧客抽出
                </button>
                <div className="overflow-x-auto h-[60px] border border-black mr-10">
                    <div className="grid grid-cols-6">
                        {buttonTitle.map((title) => (
                            <div
                            key={title}
                            className="border px-4 py-2 text-center w-[150px]"
                            >
                            {title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        {isOpenModalF1 && <ModalF1 isOpen={isOpenModalF1} onClose={() => setModalF1Open(false)} />}

    </>
  );
};

export default TargetCustomer;

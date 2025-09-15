interface TargetCustomerProps {
  onLabelClick?: (title: string) => void;
}

const TargetCustomer: React.FC<TargetCustomerProps> = ({onLabelClick }) => {

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
        <div className="border border-black min-h-[120px]">
            <div className="bg-[#D9D9D9] font-bold text-center py-2">
                対象顧客
            </div>
            <div className="grid grid-cols-4 my-2">
                {buttonTitle.map((title) => (
                    <div className="flex p-2 font-bold gap-2" key={title}>
                        <button 
                        onClick={() => onLabelClick?.(title)}
                        className={labelClass}>
                            {title}
                        </button>
                        <div>指定済み</div>
                    </div>
                ))}
            </div>
            <div className="flex font-bold px-2 justify-between items-center pb-6">
                <button className="bg-[#D9D9D9] border border-gray-400 flex items-center justify-center h-[60px] w-[160px]">
                    顧客抽出
                </button>
                <div className="overflow-x-auto h-[60px] border border-black">
                    <div className="grid grid-cols-6 border border-gray-300 ">
                        {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="border border-gray-300 px-4 py-2 text-center w-[150px] "
                        >
                            cell
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default TargetCustomer;

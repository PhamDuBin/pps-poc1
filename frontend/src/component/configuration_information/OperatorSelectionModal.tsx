import React, { useEffect, useState } from "react";
import { labelColor } from "../../constants/colors";

interface TransferItem {
  name: string;
  id: string;
}

interface OperatorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OperatorSelectionModal: React.FC<OperatorSelectionModalProps> = ({ isOpen, onClose }) => {

  const [placeholder1, setPlaceholder1] = useState("🔍️ 項目を検索する");
  const [placeholder2, setPlaceholder2] = useState("🔍️ 項目を検索する");

  const [leftItems, setLeftItems] = useState<TransferItem[]>([]);
  const [rightItems, setRightItems] = useState<TransferItem[]>([]);

  const leftData: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
    name: `事業者${i + 1}`,
    id: `${i + 1}`,
  }));

  const rightData: TransferItem[] = Array.from({ length: 10 }, (_, i) => ({
    name: `事業者${i + 11}`,
    id: `${i + 11}`,
  }));

  useEffect(() => {
    setLeftItems(leftData);
    setRightItems(rightData);
  }, []);


  const [selectedLeft, setSelectedLeft] = useState<string[]>([]);
  const [selectedRight, setSelectedRight] = useState<string[]>([]);

  const isCheckedAllLeft = leftItems.length > 0 && selectedLeft.length === leftItems.length;
  const isCheckedAllRight = rightItems.length > 0 && selectedRight.length === rightItems.length;

  const moveToRight = () => {
    const itemsToMove = leftItems.filter(item => selectedLeft.includes(item.id));
    setRightItems(prev => [...prev, ...itemsToMove].sort((a,b) => Number(a.id) - Number(b.id)));
    setLeftItems(prev => prev.filter(item => !selectedLeft.includes(item.id)));
    setSelectedLeft([]);
  }

  const moveToLeft = () => {
    const itemsToMove = rightItems.filter(item => selectedRight.includes(item.id));
    setLeftItems(prev => [...prev, ...itemsToMove].sort((a,b) => Number(a.id) - Number(b.id)));
    setRightItems(prev => prev.filter(item => !selectedRight.includes(item.id)));
    setSelectedRight([]);
  }

  const toggleSelection = (
    id: string,
    _selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    console.log("id", id);
    console.log("_selected", _selected);
    console.log(leftItems)
    setSelected(prev => {
        const isSelected = prev.includes(id);
        if (isSelected) {
        return prev.filter(itemId => itemId !== id);
        } else {
        return [...prev, id];
        }
    });
    };

    const handleClickAllLeft = () => {
        if (isCheckedAllLeft) {
            setSelectedLeft([]); 
        } else {
            setSelectedLeft(leftItems.map(item => item.id)); 
        }
    };

    

    const handleClickAllRight = () => {
    if (isCheckedAllRight) {
        setSelectedRight([]);
    } else {
        setSelectedRight(rightItems.map(item => item.id));
    }
    };



  return (
    <>
        <div className="w-[720px] h-[440px] bg-white border border-black p-4 z-50">
            <div className={`w-full h-10 ${labelColor} border border-black flex justify-center items-center mb-4`}>
                <span className="font-bold text-lg">事業者</span>
            </div>
                
            <div className="flex flex-row justify-between h-[300px]">
                <div className="w-[40%] h-full ">
                    <div className={`${labelColor} px-2 border border-black`}>
                        <div className="flex items-center mt-1">
                            <input 
                            checked={isCheckedAllLeft}
                            onChange={handleClickAllLeft}
                            type="checkbox" className="w-5 h-5 mr-3" />
                            <span>対象項目（全10件）</span>
                        </div>
                        <input type="search" 
                        placeholder={placeholder1}
                        onFocus={() => setPlaceholder1("")}
                        onBlur={() => setPlaceholder1("🔍️ 項目を検索する")}
                        className="border border-black rounded-sm my-2 w-[80%]" />
                    </div>
                    <div className="overflow-auto h-[200px]">
                        {leftItems.map((item) => (
                            <div key={item.id} className="flex items-center border border-gray-300 p-2 cursor-pointer">
                                <input 
                                checked={selectedLeft.includes(item.id)}
                                onChange={() => toggleSelection(item.id, selectedLeft, setSelectedLeft)}
                                type="checkbox" className="mr-3 w-5 h-5 border border-black"/>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[20%]">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div>
                            <button 
                            onClick={moveToRight}
                            className="bg-gray-200 border border-black p-2 w-full h-8 mb-2 flex justify-center items-center">
                                追加する⏩️
                            </button>
                        </div>
                        <div>
                            <button 
                            onClick={moveToLeft}
                            className="bg-gray-200 border border-black p-2 w-full h-8 mt-2 flex justify-center items-center">
                                ⏪️削除する️
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[40%] h-full ">
                    <div className={`${labelColor} px-2 border border-black`}>
                        <div className="flex items-center mt-1">
                            <input 
                            checked={isCheckedAllRight}
                            onChange={handleClickAllRight}
                            type="checkbox" 
                            className="w-5 h-5 mr-3" />
                            <span>選択済み項目（全10件）</span>
                        </div>
                        <input type="search"
                        placeholder={placeholder2}
                        onFocus={() => setPlaceholder2("")}
                        onBlur={() => setPlaceholder2("🔍️ 項目を検索する")}
                        className="border border-black rounded-sm my-2 w-[80%]" />
                    </div>
                    <div className="overflow-auto h-[200px]">
                        {rightItems.map((item) => (
                            <div key={item.id} className="flex items-center border border-gray-300 p-2 cursor-pointer">
                                <input 
                                onChange={() => toggleSelection(item.id, selectedRight, setSelectedRight)}
                                checked = {selectedRight.includes(item.id)}
                                type="checkbox" className="mr-3 w-5 h-5"/>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full h-10 flex justify-center items-center">
                <button 
                onClick={onClose}
                className="bg-gray-200 border border-black p-2 w-40 h-10 font-bold flex justify-center items-center">閉じる</button>
            </div>
        </div>
    </>
  )
};

export default OperatorSelectionModal;

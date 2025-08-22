import React from 'react';
import SaleDetailSelector from './SaleDetailSelector';
import SaleDetailEntry1 from './SaleDetailEntry1'; 
import SaleDetailEntry2 from './SaleDetailEntry2' ;
import SaleDetailEntry3 from './SaleDetailEntry3' ;
import StatusBar from '../../StatusBar';
import { useState } from "react";
import SaleDetailEntry4 from './SaleDetailEntry4';
import SaleDetailEntry6 from './SaleDetailEntry6';
import SaleDetailEntry7 from './SaleDetailEntry7';
import SaleDetailEntry5 from './SaleDetailEntry5';

interface SaleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;  
}

const TitleSaleDetail = [
  "1.売上", "2.直送売上" , "3.売上値引" , "4.返品" , "5.経費" , "6.資産" , "7.消費税"
]





const SaleDetailModal: React.FC<SaleDetailModalProps> = ({
  isOpen,
  onClose,
  categoryName,
}) => {
let SelectedEntry: React.ReactNode = null;

switch (categoryName) {
  case "1.売上":
    SelectedEntry = <SaleDetailEntry1 />;
    break;
  case "2.直送売上":
    SelectedEntry = <SaleDetailEntry2 />;
    break;
  case "3.売上値引":
    SelectedEntry = <SaleDetailEntry3 />;
    break;
  case "4.返品":
    SelectedEntry = <SaleDetailEntry4 />;
    break;
  case "5.経費":
    SelectedEntry = <SaleDetailEntry5 />;
    break;
  case "6.資産":
    SelectedEntry = <SaleDetailEntry6 />;
    break;
  case "7.消費税":
    SelectedEntry = <SaleDetailEntry7 />;
    break;
  default:
    SelectedEntry = null;
}


  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      {/* Modal Panel */}
      <div className="bg-gray-100 rounded-lg shadow-xl p-5 border border-gray-300 w-[840px] h-[650px]">
        {/* 1. Status Bar & Title */}
        <div className="w-full flex items-center justify-between">
          {/* Button */}
          <button className="flex items-center justify-center mb-8">
            <span className="text-black border bg-[#D9D9D9] p-4">
              {categoryName}
            </span>
          </button>

          {/* StatusBar + Title */}
          <div className="flex-1 flex flex-col items-center justify-center mr-24">
            <div className="w-1/2">
              <StatusBar currentStep={3} />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <SaleDetailSelector />
        </div>
        

        <div className='my-5'>
          {SelectedEntry}
        </div>
        

        {/* 4. Footer Actions */}
        <div className="flex gap-4 w-full justify-center items-center">
          <button
            onClick={onClose}
            className="bg-gray-300 border border-gray-500 rounded px-10 py-2 font-bold hover:bg-gray-400"
          >
            戻る (R)
          </button>
          <button className="bg-gray-300 border border-gray-500 rounded px-10 py-2 font-bold hover:bg-gray-400">
            選択 (N)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;

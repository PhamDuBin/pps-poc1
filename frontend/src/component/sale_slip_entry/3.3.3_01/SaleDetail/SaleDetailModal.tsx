import React from 'react';
import SaleDetailSelector from './SaleDetailSelector';
import SaleDetailEntry1 from './SaleDetailEntry1';
import SaleDetailEntry2 from './SaleDetailEntry2';
import SaleDetailEntry3 from './SaleDetailEntry3';
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
  onNext: (data: any) => void;
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  onNext,
}) => {

  
  let SelectedEntry: React.ReactNode = null;

  const [formData, setFormData] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      return updated;
    });
  };

  switch (categoryName) {
    case "1.売上":        SelectedEntry = <SaleDetailEntry1 onChange={handleChange}/>; break;
    case "2.直送売上":    SelectedEntry = <SaleDetailEntry2 onChange={handleChange} />;; break;
    case "3.売上値引":    SelectedEntry = <SaleDetailEntry3 onChange={handleChange}/>; break;
    case "4.返品":        SelectedEntry = <SaleDetailEntry4 onChange={handleChange}/>; break;
    case "5.経費":        SelectedEntry = <SaleDetailEntry5 onChange={handleChange}/>; break;
    case "6.資産":        SelectedEntry = <SaleDetailEntry6 onChange={handleChange}/>; break;
    case "7.消費税":      SelectedEntry = <SaleDetailEntry7 onChange={handleChange}/>; break;
  }
  

  const handleNext = () => {

  let bodyRow: any = {};

  switch (categoryName) { 
    case "1.売上":   // Form 1
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
          supplierName: formData.supplierName || "",
        },
        detailInfo: {
          quantity: formData.purchaseAmount || "0",
          tax: formData.tax || "0",
          saleAmount: formData.saleAmount,
          selfSwingTarget: formData.selfSwingTarget,
        },
        note: formData.note || "",
      };
      break;

    case "2.直送売上":   // Form 2
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
          supplierName: formData.supplierName || "",
        },
        detailInfo: {
          quantity: formData.purchaseAmount || "0",
          tax: formData.tax || "0",
          saleAmount: formData.saleAmount || "0",
          salesPrice: formData.salesPrice || "0",
          
        },
        note: formData.note || "",
      };
      break;

    case "3.売上値引":   // Form 3
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
          supplierName: formData.supplierName || "",
        },
        detailInfo: {
          quantity: formData.purchaseAmount || "0",
          tax: formData.tax || "0",
          discountAmount: formData.discountAmount || "0",
        },
        note: formData.note || "",
      };
      break;

    case "4.返品":   // Form 4
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
          supplierName: formData.supplierName || "",
        },
        detailInfo: {
          quantity: formData.purchaseAmount || "0",
          tax: formData.tax || "0",
          purchaseAmount: formData.purchaseAmount || "0",
        },
        note: formData.note || "",
      };
      break;
  case "5.経費":   // Form 5
    bodyRow = {
      titleInfo: {
        productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
        supplierName: formData.supplierName || "",
      },
      detailInfo: {
        quantity: formData.purchaseAmount || "0",
        tax: formData.tax || "0",
        purchaseAmount: formData.purchaseAmount || "0",
      },
      note: formData.note || "",
    };
    break;

  case "6.資産":   // Form 6
    bodyRow = {
      titleInfo: {
        productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
        supplierName: formData.supplierName || "",
      },
      detailInfo: {
        quantity: formData.purchaseAmount || "0",
        tax: formData.tax || "0",
        purchaseAmount: formData.purchaseAmount || "0",
      },
      note: formData.note || "",
    };
    break;

  case "7.消費税":   // Form 7
    bodyRow = {
          detailInfo: {
            tax: formData.tax,
          },
        };
      break;

    default:
      bodyRow = {};
  }

  const data = {
    headerRow: {
      no: "03",
      icon: "",
      categoryName,
      outsideMonth: formData.outsideMonth || 1,
      selfTransferTarget: formData.selfTransferTarget || 1,
    },
    bodyRow,
  };

  onNext(data);
};



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
          <button
              onClick={() => {
                handleNext() 
              }}

            className="bg-gray-300 border border-gray-500 rounded px-10 py-2 font-bold hover:bg-gray-400">
            選択 (N)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;
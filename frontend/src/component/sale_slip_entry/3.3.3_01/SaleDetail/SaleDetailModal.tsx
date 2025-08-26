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
import { useEffect } from "react";

interface SaleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  onNext: (data: any) => void;
  rowEdit?: any;
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  onNext,
  rowEdit,

}) => {

  
  let SelectedEntry: React.ReactNode = null;

  const [formData, setFormData] = useState<any>({});
  

  const handleChange = (field: string, value: string) => {
    console.log(field,value);
    setFormData((prev: any) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      return updated;
    });
  };

  switch (categoryName) {
    case "1.売上":        SelectedEntry = <SaleDetailEntry1 onChange={handleChange} formData={formData}/>; break;
    case "2.直送売上":    SelectedEntry = <SaleDetailEntry2 onChange={handleChange} formData={formData}/>; break;
    case "3.売上値引":    SelectedEntry = <SaleDetailEntry3 onChange={handleChange} formData={formData}/>; break;
    case "4.返品":        SelectedEntry = <SaleDetailEntry4 onChange={handleChange} formData={formData}/>; break;
    case "5.経費":        SelectedEntry = <SaleDetailEntry5 onChange={handleChange} formData={formData}/>; break;
    case "6.資産":        SelectedEntry = <SaleDetailEntry6 onChange={handleChange} formData={formData}/>; break;
    case "7.消費税":      SelectedEntry = <SaleDetailEntry7 onChange={handleChange} formData={formData}/>; break;
  }
  

  const handleNext = () => {

  console.log(formData);

  console.log(formData.supplier);

  console.log("test" , rowEdit);

  let bodyRow: any = {};

  switch (categoryName) { 
    case "1.売上":   // Form 1
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
        },
        detailInfo: {
          quantity: formData.quantity || "0",
          salesPrice: formData.salesPrice || "0",
          saleAmount: formData.saleAmount,
          tax: formData.tax || "0",
        },
        note: formData.note || "",
      };
      break;

    case "2.直送売上":   // Form 2
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
          supplier: [formData.supplierCode, formData.supplierName]
          .filter(val => val && val !== "0000000000")
          .join(" | "),
        },
        detailInfo: {
          quantity: formData.quantity || "0",
          salesPrice: formData.salesPrice || "0",
          saleAmount: formData.saleAmount || "0",
          tax: formData.tax || "0",
        },
        note: formData.note || "",
      };
      break;

    case "3.売上値引":   // Form 3
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
        },
        detailInfo: {
          quantity: `(${formData.quantity})` || "(0.00)",
          discountAmount: "-1,000,000",
          tax: formData.tax || "0",
        },
        note: formData.note || "",
      };
      break;

    case "4.返品":  // Form 4
      bodyRow = {
          titleInfo: {
            productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
          },
          detailInfo: {
            quantity: formData.quantity || "0",
            purchasePrice: formData.purchasePrice || "0",
            purchaseAmount: formData.purchaseAmount || "0",
          },
          note: formData.note || "",
        };
      break;
    case "5.経費":   // Form 5
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
        },
        detailInfo: {
          quantity: formData.quantity || "0",
          purchasePrice: formData.purchasePrice || "0",
          purchaseAmount: formData.purchaseAmount || "0",
        },
        note: formData.note || "",
      };
      break;
    case "6.資産":   // Form 6
      bodyRow = {
        titleInfo: {
          productName:  "0111107 | パロマ湯沸器（13A） | PH−5BV" ,
        },
        detailInfo: {
          quantity: formData.quantity || "0",
          purchasePrice: formData.purchasePrice || "0",
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
    id: rowEdit?.id,
    headerRow: {
      no: formData.no,
      icon: "",
      categoryName,
      outsideMonth: Number(formData.outsideMonth) || 0,
      selfTransferTarget: Number(formData.selfTransferTarget) || 0,
    },
    bodyRow,
  };
  
  onNext(data);
  
};

  useEffect(() => {
    if (rowEdit) {
    const supplierRaw = rowEdit.bodyRow?.titleInfo?.supplier || "";
    let supplierCode = "";
    let supplierName = "";

    if (supplierRaw.includes(" | ")) {
      [supplierCode, supplierName] = supplierRaw.split(" | ");
    } else if (/^\d{10}$/.test(supplierRaw)) {
      // Nếu chỉ có mã supplier 10 số
      supplierCode = supplierRaw;
    } else {
      // Nếu chỉ có tên
      supplierName = supplierRaw;
    }
    setFormData({
    quantity: (rowEdit.bodyRow?.detailInfo?.quantity || "")
      .replace(/[()]/g, "")
      .trim(),  
    unit: rowEdit.bodyRow?.detailInfo?.unit || "",
    salesPrice: rowEdit.bodyRow?.detailInfo?.salesPrice || "",
    salesPriceType: rowEdit.bodyRow?.detailInfo?.salesPriceType ?? "0",
    saleAmount: rowEdit.bodyRow?.detailInfo?.saleAmount || "",
    tax: rowEdit.bodyRow?.detailInfo?.tax || "",
    purchasePrice: rowEdit.bodyRow?.detailInfo?.purchasePrice || "",
    purchasePriceType: rowEdit.bodyRow?.detailInfo?.purchasePriceType ?? "0",
    purchaseAmount: rowEdit.bodyRow?.detailInfo?.purchaseAmount || "",
    selfTransferTarget: Number(rowEdit.headerRow?.selfTransferTarget) || 0,
    outsideMonth: Number(rowEdit.headerRow?.outsideMonth) || 0,
    discountAmount: rowEdit.headerRow?.discountAmount || "0",
    note: rowEdit.bodyRow?.note || "",
    no: rowEdit.headerRow?.no || "99",
    supplierCode,
    supplierName,
    });
    console.log(rowEdit);
    
    }
  }, [rowEdit]);




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


        {categoryName !== "7.消費税" && (
            <div className='mt-5'>
              <SaleDetailSelector />
            </div>
        )} 
        


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
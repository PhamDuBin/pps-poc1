import React, { useEffect, useRef } from 'react';

interface SaleDetailEntry4Props {
  onChange: (field: string, value: string) => void;
  formData: any;
}

const handleOpenWindow = () => {
  const win = window.open(
    "/link-destination",
    "_blank",
    "width=800,height=600,noopener,noreferrer"
  );

  if (win) {
    win.focus();
  }
};

const SaleDetailEntry4: React.FC<SaleDetailEntry4Props> = ({ onChange, formData }) => {
  
  const firstInputRef = useRef<HTMLInputElement>(null);
      
  useEffect(() => {
      if(firstInputRef.current) {
        firstInputRef.current.focus();
      }
    }, [])

  return (
    <div className='flex gap-1 '>  
      {/* Left side */}
      <div className='grid w-[155px] grid-cols-2 gap-5 grid-rows-3 p-1 border border-black h-56'>
        <div className=' w-20 text-center h-16'>
          <div className='bg-[#80bad7]'>数量</div>
          <div>
            <input
              ref = {firstInputRef}
              type="text"
              placeholder='000'
              className='w-20 placeholder-black-200 border border-black'
              value={formData.quantity ?? ''}
              onChange={(e) => onChange("quantity", e.target.value)}
            />
          </div>
        </div>
        <div className=' w-15 text-center h-16 '>
          <div className='bg-[#80bad7]'>単位</div>
          <div>
            <input
              type="text"
              placeholder='000'
              className='w-full placeholder-black-200 border border-black'
              value={formData.unit ?? ''}
              onChange={(e) => onChange("unit", e.target.value)}
            />
          </div>
        </div>
        <div className=' w-15 text-center h-16 col-span-2'>
          <div className='bg-[#80bad7]'>出庫伝票No.</div>
          <div>
            <input
              type="text"
              placeholder='0000000000'
              className='w-full placeholder-black-200 border border-black'
              value={formData.expenseNo ?? ''}
              onChange={(e) => onChange("expenseNo", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='max-w-lg'>
        <div className='grid grid-cols-4 grid-rows-3 gap-2 p-1 border border-black h-56'>
          <div className=' text-center h-[64px]'>
            <div className='bg-[#80bad7] h-1/2'>売上単価</div>
            <div className='h-1/2'>
              <input
                type="text"
                placeholder='0.00'
                className='h-full px-1 w-[120px] placeholder-black-200 border border-black'
                value={formData.salesPrice ?? ''}
                onChange={(e) => onChange("salesPrice", e.target.value)}
              />
            </div>
          </div>

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>売上単価区分</div>
            <select
              className="border border-black w-full h-1/2"
              value={formData.salesPriceType !== undefined ? String(formData.salesPriceType) : "0"}
              onChange={(e) => onChange("salesPriceType", e.target.value)}
            >
              <option value="0">0 確定単価</option>
              <option value="1">1 仮単価</option>
            </select>
          </div>  

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>売上金額</div>
            <input
              type="text"
              placeholder='0'
              className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200'
              value={formData.saleAmount ?? ''}
              onChange={(e) => onChange("saleAmount", e.target.value)}
            />
          </div>

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>売上消費税</div>
            <input
              type="text"
              placeholder='0'
              className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200'
              value={formData.tax ?? ''}
              onChange={(e) => onChange("tax", e.target.value)}
            />
          </div>

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>仕入単価</div>
            <input
              type="text"
              placeholder='01234567.00'
              className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200'
              value={formData.purchasePrice ?? ''}
              onChange={(e) => onChange("purchasePrice", e.target.value)}
            />
          </div>

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>仕入単価区分</div>
            <select
              className="border border-black w-full h-1/2"
              value={formData.purchasePriceType !== undefined ? String(formData.purchasePriceType) : "0"}
              onChange={(e) => onChange("purchasePriceType", e.target.value)}
            >
              <option value="0">0 確定単価</option>
              <option value="1">1 仮単価</option>
            </select>
          </div>

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>仕入金額</div>
            <input
              type="text"
              placeholder='0'
              className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200'
              value={formData.purchaseAmount ?? ''}
              onChange={(e) => onChange("purchaseAmount", e.target.value)}
            />
          </div>

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>自振対象</div>
            <select
              className="border border-black w-full h-1/2"
              value={formData.selfTransferTarget !== undefined ? String(formData.selfTransferTarget) : "0"}
              onChange={(e) => onChange("selfTransferTarget", e.target.value)}
            >
              <option value="0">0 対象</option>
              <option value="1">1 対象外</option>
            </select>
          </div>

          <div className=' text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>当月外</div>
            <select
              className="border border-black w-full h-1/2"
              value={formData.outsideMonth !== undefined ? String(formData.outsideMonth) : "0"}
              onChange={(e) => onChange("outsideMonth", e.target.value)}
            >
              <option value="0">0 空欄</option>
              <option value="1">1 当月外</option>
            </select>
          </div>

          <div className=' text-center h-[64px] col-span-2 relative'>
            <div className='bg-[#80bad7] h-1/2'>備考</div>
            <input
              type="text"
              placeholder="返品"
              className='w-full h-1/2 border px-1 border-black placeholder-black-200'
              value={formData.note ?? ''}
              onChange={(e) => onChange("note", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className='flex w-28 border border-black h-56 items-center justify-center'>
        <button
          onClick={handleOpenWindow}
          className='border border-black rounded px-1 shadow-lg'
        >
          器具登録
        </button>
      </div>
    </div>
  );
};

export default SaleDetailEntry4;

import React from 'react';

interface SaleDetailEntry6Props {
  onChange: (field: string, value: string) => void;
}

const handleOpenWindow = () => {
  const win = window.open(
    "/link-destination",
    "_blank",
    "width=800,height=600,noopener,noreferrer"
  );
  if (win) win.focus();
};

const SaleDetailEntry6: React.FC<SaleDetailEntry6Props> = ({ onChange }) => {
  return (
    <div className='flex gap-1 '>  
      <div className='flex gap-2 p-1 border border-black h-[150px]'>
        {/* 数量 */}
        <div className='w-20 text-center h-[64px]'>
          <div className='bg-[#80bad7] h-1/2'>数量</div>
          <div className='h-1/2'>
            <input
              type="text"
              placeholder='0.00'
              className='w-20 h-full placeholder-black-200 border border-black'
              onChange={(e) => onChange("quantity", e.target.value)}
            />
          </div>
        </div>

        {/* 単位 */}
        <div className='w-14 text-center h-[64px]'>
          <div className='bg-[#80bad7] h-1/2'>単位</div>
          <div className='h-1/2'>
            <input
              type="text"
              placeholder='000'
              className='w-14 h-full placeholder-black-200 border border-black'
              onChange={(e) => onChange("unit", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='max-w-lg'>
        <div className='grid grid-cols-4 grid-rows-2 gap-2 p-1 border border-black h-[150px]'>

          {/* 売上単価 */}
          <div className='text-center h-[64px]'>
            <div className='bg-[#80bad7] h-1/2'>売上単価</div>
            <div className='h-1/2'>
              <input
                type="text"
                placeholder='01234567.00'
                className='h-full px-1 w-[120px] placeholder-black-200 border border-black'
                onChange={(e) => onChange("salesPrice", e.target.value)}
              />
            </div>
          </div>

          {/* 仕入単価区分 */}
          <div className='text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>仕入単価区分</div>
            <select
              className="border border-black w-full h-1/2"
              onChange={(e) => onChange("purchasePriceType", e.target.value)}
            >
              <option value="0">0 確定単価</option>
              <option value="1">1 仮単価</option>
            </select>
          </div>

          {/* 仕入金額 */}
          <div className='text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>仕入金額</div>
            <input
              type="text"
              placeholder='0'
              className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200'
              onChange={(e) => onChange("purchaseAmount", e.target.value)}
            />
          </div>

          {/* 貸付設備 Button */}
          <div className='row-span-2 flex items-end justify-center'>
            <button 
              onClick={handleOpenWindow}
              className='w-[90px] h-[50px] border border-black rounded-md items-center mt-1'
            >
              貸付設備
            </button>
          </div>

          {/* 当月外 */}
          <div className='text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>当月外</div>
            <select
              className="border border-black w-full h-1/2"
              onChange={(e) => onChange("outsideCurrentMonth", e.target.value)}
            >
              <option value="0">0 空欄</option>
              <option value="1">1 当月外</option>
            </select>
          </div>

          {/* 備考 */}
          <div className='text-center h-[64px] col-span-2 relative'>
            <div className='bg-[#80bad7] h-1/2'>備考</div>
            <input
              type="text"
              className='w-full h-1/2 border px-1 border-black placeholder-black-200'
              onChange={(e) => onChange("remarks", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 器具登録 Button */}
      <div className='flex w-28 border border-black h-[150px] items-end justify-center pb-5'>
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

export default SaleDetailEntry6;

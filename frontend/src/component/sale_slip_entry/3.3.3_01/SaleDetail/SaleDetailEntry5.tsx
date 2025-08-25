import React from 'react';

interface SaleDetailEntry5Props {
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

const SaleDetailEntry5: React.FC<SaleDetailEntry5Props> = ({ onChange }) => {
  return (
    <div className='flex gap-1'>
      {/* Left side */}
      <div className='flex gap-2 p-1 border border-black h-56'>
        <div className='w-20 text-center h-[64px]'>
          <div className='bg-[#80bad7] h-1/2'>Purchase Price</div>
          <div className='h-1/2'>
            <input
              type="text"
              placeholder='0.00'
              className='w-20 h-full placeholder-black-200 border border-black'
              onChange={(e) => onChange("purchasePrice", e.target.value)}
            />
          </div>
        </div>

        <div className='w-14 text-center h-[64px]'>
          <div className='bg-[#80bad7] h-1/2'>Quantity</div>
          <div className='h-1/2'>
            <input
              type="text"
              placeholder='000'
              className='w-14 h-full placeholder-black-200 border border-black'
              onChange={(e) => onChange("quantity", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Middle grid */}
      <div className='max-w-lg'>
        <div className='grid grid-cols-4 grid-rows-3 gap-2 p-1 border border-black h-56'>

          <div className='text-center h-[64px]'>
            <div className='bg-[#80bad7] h-1/2'>Sales Price</div>
            <div className='h-1/2'>
              <input
                type="text"
                placeholder='0.00'
                className='h-full px-1 w-[120px] placeholder-black-200 border border-black'
                onChange={(e) => onChange("salesPrice", e.target.value)}
              />
            </div>
          </div>

          <div className='text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>Purchase Price Type</div>
            <select
              className="border border-black w-full h-1/2"
              onChange={(e) => onChange("purchasePriceType", e.target.value)}
            >
              <option value="0">0 Fixed</option>
              <option value="1">1 Provisional</option>
            </select>
          </div>

          <div className='text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>Purchase Amount</div>
            <input
              type="text"
              placeholder='0'
              className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200'
              onChange={(e) => onChange("purchaseAmount", e.target.value)}
            />
          </div>

          <div className='row-span-3 flex items-center justify-center'>
            <button
              onClick={handleOpenWindow}
              className='w-[90px] h-[50px] border border-black rounded-md items-center mt-1'
            >
              Equipment
            </button>
          </div>

          <div className='col-span-3 text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>Expense Category No.</div>
            <div className='flex gap-2'>
              <div className='flex w-1/4 relative text-center'>
                <select
                  className="text-center border w-full border-black"
                  onChange={(e) => onChange("expenseCategoryNo", e.target.value)}
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const value = (i + 1).toString();
                    return <option key={value} value={value}>{value}</option>;
                  })}
                </select>
              </div>
              <input
                type="text"
                className='w-full h-full border p-1 border-black placeholder-black-200'
                onChange={(e) => onChange("expenseCategoryText", e.target.value)}
              />
            </div>
          </div>

          <div className='text-center h-[64px] relative'>
            <div className='bg-[#80bad7] h-1/2'>Outside Current Month</div>
            <select
              className="border border-black w-full h-1/2"
              onChange={(e) => onChange("outsideCurrentMonth", e.target.value)}
            >
              <option value="0">0 Blank</option>
              <option value="1">1 Outside</option>
            </select>
          </div>

          <div className='text-center h-[64px] col-span-2 relative'>
            <div className='bg-[#80bad7] h-1/2'>Remarks</div>
            <input
              type="text"
              className='w-full h-1/2 border px-1 border-black placeholder-black-200'
              onChange={(e) => onChange("remarks", e.target.value)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SaleDetailEntry5;

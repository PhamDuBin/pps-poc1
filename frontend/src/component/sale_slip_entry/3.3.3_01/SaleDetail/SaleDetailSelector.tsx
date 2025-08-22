import React from 'react';

const SaleDetailSelector = () => {
  return (
    <div className='flex'>
        <div className='w-44 flex gap-1 items-center'>
          <div className='bg-[#80bad7] p-1'>
            商品コード  
          </div>
          <div>
            0111107 
          </div>
        </div>
        <div className='w-32 flex gap-1 items-center'>
          <div className='bg-[#80bad7] p-1'>
            セットNo.
          </div>
          <div className='w-8 h-8 border border-black'>
              
          </div>
        </div>
        <div className='w-56 flex gap-1 items-center'>
          <div className='bg-[#80bad7] p-1'>
            商品名
          </div>
          <div>
            パロマ湯沸器（13A）
          </div>
        </div>
        <div className='w-32 flex gap-1 items-center'>
          <div className='bg-[#80bad7] p-1'>
            型式
          </div>
          <div>
            PH−5BV
          </div>
        </div>
        <button className=" border border-black rounded px-1 shadow-lg">
            <span className="w-[25%] m-2">再検索</span>
        </button>
    </div>
  );
};

export default SaleDetailSelector;

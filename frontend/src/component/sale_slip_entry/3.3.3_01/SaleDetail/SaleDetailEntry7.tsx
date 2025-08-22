import React from 'react';


const SaleDetailEntry7 = () => {
  return (
    <div className='flex gap-2'>
        <div className='h-[64px] w-[100px]'>
            <div className='h-1/2 bg-[#80bad7] p-1'>
                商品コード
            </div>
            <input type="text" className='h-1/2 w-full border border-black text-center' placeholder='96-0001'/>
        </div>
        <div className='h-[64px] w-[100px]'>
            <div className='h-1/2 bg-[#80bad7] p-1'>
                商品名
            </div>
            <input type="text" className='h-1/2 w-full border border-black text-center' />
        </div>
        <div className='h-[64px] w-[100px]'>
            <div className='h-1/2 bg-[#80bad7] p-1'>
                型式
            </div>
            <input type="text" className='h-1/2 w-full border border-black text-center' />
        </div>
        <div className='h-[64px] w-[120px]'>
            <div className='h-1/2 bg-[#80bad7] p-1'>
                売上消費税
            </div>
            <input type="text" className='h-1/2 w-full border border-black text-center' placeholder='0' />
        </div>
        <div className='h-[64px] w-[120px]'>
            <div className='h-1/2 bg-[#80bad7] p-1'>
                自振対象
            </div>
            <select className="border border-black w-full h-1/2 text-center">
                <option value="0">0 対象</option>
                <option value="1">1 対象外</option>
            </select>
        </div>
        <div className='h-[64px] w-[120px]'>
            <div className='h-1/2 bg-[#80bad7] p-1'>
                当月外
            </div>
                <select className="border border-black w-full h-1/2 text-center">
                    <option value="0">0 対象</option>
                    <option value="1">1 対象外</option>
                </select>
            </div>
    </div>
  );
};

export default SaleDetailEntry7;

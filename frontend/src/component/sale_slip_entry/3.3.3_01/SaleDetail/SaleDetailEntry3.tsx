import React from 'react';

const SaleDetailEntry2 = () => {
  return (
    <div className='flex gap-1 '>  
        <div className='flex gap-2 p-1 border border-black h-40'>
            <div className=' w-20 text-center'>
                <div className='bg-[#80bad7]'>
                    数量
                </div>
                <div>
                    <input type="text" placeholder='000' className='w-20 placeholder-black-200 border border-black' />
                </div>
            </div>
            <div className=' w-14 text-center'>
                <div className='bg-[#80bad7]'>
                    数量
                </div>
                <div>
                    <input type="text" placeholder='000' className='w-14 placeholder-black-200 border border-black' />
                </div>
            </div>
        </div>
        <div className='max-w-lg '>
            <div className='h-40 grid grid-cols-4 grid-rows-2 gap-2 p-1 border border-black'>
                <div className=' text-center h-[64px]'>
                    <div className='bg-[#80bad7] h-1/2'>
                        売上金額
                    </div>
                    <div className='h-1/2'>
                        <input type="text" placeholder='(0.00)' className='h-full px-1 w-[120px] placeholder-black-200 border border-black' />
                    </div>
                </div>
                <div className=' text-center h-[64px]'>
                    <div className='bg-[#80bad7] h-1/2'>
                        売上消費税
                    </div>
                    <input type="text" placeholder='0 確定単価' className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200 ' />
                </div>  
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        当月外
                    </div>
                    <select className="border border-black w-full h-1/2">
                        <option value="0">0 空欄</option>
                        <option value="1">1 当月外</option>
                    </select>
                </div>
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        売上消費税
                    </div>
                    <select className="border border-black w-full h-1/2">
                        <option value="0">0 対象</option>
                        <option value="1">1 対象外</option>
                    </select>
                </div>
                <div className=' text-center h-[64px] col-span-2 relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        備考
                    </div>
                    <input type="text" placeholder='値引き' className='w-full h-1/2 border px-1 border-black placeholder-black-200 ' />
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default SaleDetailEntry2;

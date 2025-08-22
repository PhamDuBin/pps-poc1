import React from 'react';

const handleOpenWindow = () => {
    const win = window.open(
      "/link-destination",
      "_blank",
      "width=800,height=600,noopener,noreferrer"
    );

    if (win) {
      win.focus();
    }
}

const SaleDetailEntry2 = () => {
  return (
    <div className='flex gap-1 '>  
        <div className='flex gap-2 p-1 border border-black h-80'>
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
            <div className='grid grid-cols-4 grid-rows-4 gap-2 p-1 border border-black h-80'>
                <div className=' text-center h-[64px]'>
                    <div className='bg-[#80bad7] h-1/2'>
                        売上単価
                    </div>
                    <div className='h-1/2'>
                        <input type="text" placeholder='0.00' className='h-full px-1 w-[120px] placeholder-black-200 border border-black' />
                    </div>
                </div>
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        売上単価区分
                    </div>
                    <select className="border border-black w-full h-1/2">
                        <option value="0">0 確定単価</option>
                        <option value="1">1 仮単価</option>
                    </select>
                </div>  
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        売上金額
                    </div>
                    <input type="text" placeholder='0' className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200 ' />
                </div>
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        売上消費税
                    </div>
                    <input type="text" placeholder='0' className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200 ' />
                </div>
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        仕入単価
                    </div>
                    <input type="text" placeholder='01234567.00' className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200 ' />
                </div>
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        仕入単価区分
                    </div>
                    <select className="border border-black w-full h-1/2">
                        <option value="0">0 確定単価</option>
                        <option value="1">1 仮単価</option>
                    </select>
                </div>
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        仕入金額
                    </div>
                    <input type="text" placeholder='0' className='w-[120px] h-1/2 border px-1 border-black placeholder-black-200 ' />
                </div>
                <div className=' text-center h-[64px] relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        自振対象
                    </div>
                    <select className="border border-black w-full h-1/2">
                        <option value="0">0 対象</option>
                        <option value="1">1 対象外</option>
                    </select>
                </div>
                <div className=' text-center h-[64px] col-span-3 '>
                    <div className='bg-[#80bad7] h-1/2'>
                        仕入先
                    </div>
                    <div className='flex'>
                        <div className='flex w-3/5 relative'>
                            <select className="border w-full border-black">
                            {Array.from({ length: 10 }, (_, i) => {
                                const value = (i + 1).toString().padStart(10, '0');
                                return <option key={value} value={value}>{value}</option>;
                            })}
                            </select>
                        </div>
                        <input type="text" className='w-full h-full border p-1 border-black placeholder-black-200 ' />
                    </div>
                </div>
                <div>
                    <button className='w-[90px] h-[50px] border border-black rounded-md items-center mt-1'>
                        発注
                    </button>
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
                <div className=' text-center h-[64px] col-span-2 relative'>
                    <div className='bg-[#80bad7] h-1/2'>
                        備考
                    </div>
                    <input type="text" className='w-full h-1/2 border px-1 border-black placeholder-black-200 ' />
                </div>
            </div>
        </div>
        <div className='flex w-28 border border-black h-80 items-center justify-center'>
            <button
            onClick={handleOpenWindow}
            className='border border-black rounded px-1 shadow-lg'>
                器具登録
            </button>
        </div>
    </div>
    
  );
};

export default SaleDetailEntry2;

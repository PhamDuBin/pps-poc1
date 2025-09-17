const labelClass =
  "bg-[#D9D9D9] border border-black px-2 flex items-center justify-center h-[32px] w-[180px]";

const TitleFormSetting = () => {
  return (
    <div className="p-2 border border-black mt-2">
      <div className="w-full bg-[#D9D9D9] flex justify-center items-center p-2 font-bold">
        タイトル・鑑設定
      </div>

      <div className=" p-4">
        <div className="font-bold py-2">印字項目名称設定</div>
        <div className="border border-black">
          {/* Row 1 */}
          <div className="flex p-2 gap-5">
            <span className="flex gap-4 w-[40%]">
              <div className={`font-semibold ${labelClass}`}>前回ご請求</div>
              <input
                type="text"
                placeholder="前回ご請求額"
                className="border border-black px-2 w-full"
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>今回ご請求</div>
              <input
                type="text"
                placeholder="今回ご請求額"
                className="border border-black px-2 w-full"
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月ご入金額</div>
              <input
                type="text"
                placeholder="当月ご入金額"
                className="border border-black px-2 w-full"
              />
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex p-2 gap-4">
            <span className="flex gap-4 w-[40%]">
              <div className={`font-semibold ${labelClass}`}>差引金額</div>
              <input
                type="text"
                placeholder="差引金額"
                className="border border-black px-2 w-full"
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月お買上額</div>
              <input
                type="text"
                placeholder="当月お買上額"
                className="border border-black px-2 w-full"
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月外修正額</div>
              <input
                type="text"
                placeholder="当月外修正額"
                className="border border-black px-2 w-full"
              />
            </span>
          </div>

          {/* Row 3 (消費税額) */}
          <div className="flex p-2 gap-5">
            <span className="flex gap-4 w-[40%] items-stretch">
                <div className={`font-semibold ${labelClass}`}>当月消費税額</div>
                <input
                type="text"
                placeholder="当月消費税額"
                className="border border-black px-2 w-full"
                />
            </span>
            <span className="flex gap-5 w-[30%]"></span>
            <span className="flex gap-5 w-[30%]"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleFormSetting;

//■左カラム顧客検索＆情報表示ランチャー
import { useState } from "react";

const DownArrowIcon = () => (
  <svg
    className="w-3 h-3 text-black"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M19 9l-7 7-7-7"
    ></path>
  </svg>
);

const LeftPanel = () => {
  const [postcode1, setPostcode1] = useState("");
  const [postcode2, setPostcode2] = useState("");
  const [showDepart, setShowDepart] = useState(false);
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [showCustomer, setShowCustomer] = useState(false);

  const hanleSearchDepartment = (postcode1: string, postcode2: string) => {
    if (postcode1 && postcode2) {
      setShowDepart(true);
    } else {
      setShowDepart(false);
    }
  };

  const hanleSearchCustomer = (id1: string, id2: string) => {
    if (id1 && id2) {
      setShowCustomer(true);
    } else {
      setShowCustomer(false);
    }
  };

  return (
    <div className="w-72 h-screen p-3 bg-white border-2 border-gray-400 font-sans">
      <div className="mb-4">
        <div className="text-center text-sm bg-gray-200 py-1 font-semibold">
          {!showDepart ? "事務所コード" : "事務所情報"}
        </div>
        <div className="text-xs flex items-center flex-row py-2 w-full">
          {!showDepart ? (
            <>
              <input
                type="number"
                className="w-[30%] px-1 py-0.5 border border-gray-500"
                onChange={(e) => setPostcode1(e.target.value)}
              />
              <span className="mx-1">-</span>
              <input
                type="number"
                className="w-[30%] px-1 py-0.5 border border-gray-500"
                onChange={(e) => setPostcode2(e.target.value)}
              />
              <div
                onClick={() => hanleSearchDepartment(postcode1, postcode2)}
                className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-gray-200 border border-gray-500 cursor-pointer"
              >
                <DownArrowIcon />
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <span>
                {postcode1} - {postcode2}
              </span>
              <button className=" border border-black rounded">
                <span className="w-[25%] m-2">再検索</span>
              </button>
            </div>
          )}
        </div>
        {showDepart && (
          <div className="text-xs flex flex-col">
            <span>東京23区担当営業所</span>
            <span>サンプル部門</span>
          </div>
        )}
      </div>

      {/* Customer Code Section */}
      <div className="mb-4">
        <div className="text-center text-sm bg-gray-200 py-1 font-semibold">
          {!showCustomer ? "顧客コード" : "顧客情報"}
        </div>
        <div className="text-xs flex items-center flex-row py-2 w-full">
          {!showCustomer ? (
            <>
              <input
                type="number"
                className="w-[30%] px-1 py-0.5 border border-gray-500"
                onChange={(e) => setId1(e.target.value)}
              />
              <span className="mx-1">-</span>
              <input
                type="number"
                className="w-[30%] px-1 py-0.5 border border-gray-500"
                onChange={(e) => setId2(e.target.value)}
              />
              <div
                onClick={() => hanleSearchCustomer(id1, id2)}
                className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-gray-200 border border-gray-500 cursor-pointer"
              >
                <DownArrowIcon />
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <span>
                {id1} - {id2}
              </span>
              <button className="border border-black rounded">
                <span className="w-[25%] m-2">再検索</span>
              </button>
            </div>
          )}
        </div>
        {showCustomer && (
          <div className="text-xs flex flex-col">
            <span>山田　太郎</span>
            <span>東京都文京区小石川1-1-1 文京ビルディング</span>
            <div>
              <div className="mt-2 flex flex-row justify-between items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  電話番号
                </label>
                <span>03-1234-9999</span>
                <button className="border border-black rounded">
                  <span className="w-[25%] m-2">電話番号</span>
                </button>
              </div>
              <div className="mt-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  地図番号
                </label>
                <span className="ml-1">X0123:Y0315</span>
              </div>
            </div>
            {/* black line */}
            <div className="border border-black mt-4"></div>
            <div className="mt-2 flex flex-col">
              <div className="mb-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  当月締日
                </label>
                <span className="ml-4">2025/05/31</span>
              </div>
              <div className="mb-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  回収
                </label>
                <span className="ml-4">自振翌月</span>
              </div>
              <div className="mb-2 flex flex-row justify-between items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  締日
                </label>
                <span className="ml-4">31</span>
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  集金日
                </label>
                <span className="ml-4">14</span>
              </div>
            </div>
            <div className="border border-black mt-4"></div>
            <div className="mt-2 flex flex-col">
              <div className="mb-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  開閉栓区分
                </label>
                <span className="ml-4">新規開栓（2017/10/17）</span>
              </div>
              <div className="mb-2 flex flex-row items-center justify-between">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  不可能回収
                </label>
                <span>0回</span>
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  回収日数
                </label>
                <span>0回</span>
              </div>
            </div>
          </div>
        )}
        <div className="text-xs mt-4 flex items-center flex-col gap-2">
          <button className="border text-center border-black p-2 rounded-md shadow-md shadow-zinc-600">
            詳細検索（S）
          </button>
          <button className="w-1/2 font-bold border text-center border-black p-2 text-white bg-gray-500">
            請求親
          </button>
          <div className="relative group w-1/2">
            <button className="font-bold border text-center border-black p-2 bg-gray-200 w-full">
              担当者
            </button>
            {/* Tooltip for  担当者*/}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-36 bg-white border border-gray-400 rounded shadow-lg p-2 text-xs z-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              <div className="font-bold mb-1 text-center bg-gray-200 p-1">
                担当者表示
              </div>
              <div className="mb-2">
                <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span>
                001 担当者名01
              </div>
              <div className="mb-2">
                <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span>
                001 担当者名01
              </div>
              <div className="mb-2">
                <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span>
                001 担当者名01
              </div>
              <div className="mb-2">
                <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span>
                001 担当者名01
              </div>
            </div>
          </div>
          <div className="relative group w-1/2">
            <button className="font-bold border text-center border-black p-2 bg-gray-200 w-full">
              顧客備考
            </button>
            {/* Tooltip for  顧客備考*/}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-white border border-gray-400 rounded shadow-lg p-2 text-xs z-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              <div className="font-bold mb-1 text-center bg-gray-200 p-1">
                顧客備考
              </div>
              <div className="mb-2">
                <span className="font-bold bg-gray-200 p-0.5 mr-2">
                  顧客備考1
                </span>
                住所仮のものになります。
              </div>
              <div className="mb-2">
                <span className="font-bold bg-gray-200 p-0.5 mr-2">
                  顧客備考2
                </span>
                世帯主様に直接お伺い。
              </div>
              <div>
                <span className="font-bold bg-gray-200 p-0.5">顧客備考3</span>
              </div>
            </div>
          </div>
          <button className="w-1/2 font-bold border text-center border-black p-2 bg-gray-200">
            日報入力
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;

import { DownArrowIcon } from "../transaction_information/LeftPanel";

export const CustomerSearchModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="border border-black bg-white p-2">
        <div className="flex flex-col">
          <span className="w-[748.75px] h-[40px] p-2 flex text-center justify-center items-center font-bold bg-[#D9D9D9]">
            顧客検索ー点検調査結果入力
          </span>
          <div className="mt-4 px-2">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <span className="w-28 h-6 bg-[#D9D9D9] flex justify-center items-center">
                  事務所
                </span>
                <input className="w-16 h-6 border border-black" />
                <p>-</p>
                <input className="w-16 h-6 border border-black" />
                <button className="w-[22px] h-[22px] flex items-center justify-center border border-gray-500">
                  <DownArrowIcon />
                </button>
                <p>関東地方営業事務所</p>
              </div>

              <div className="flex flex-row items-center gap-4 mt-2">
                <button className="w-28 h-6 bg-[#D9D9D9] flex justify-center items-center">
                  顧客コード
                </button>
                <input className="w-16 h-6 border border-black" />
                <p>-</p>
                <input className="w-16 h-6 border border-black" />
                <button className="w-[22px] h-[22px] flex items-center justify-center border border-gray-500">
                  <DownArrowIcon />
                </button>
                <button className="w-11 h-6 flex justify-center items-center border border-b rounded-md">
                  確定
                </button>
                <button className="w-14 h-6 flex justify-center items-center border border-b rounded-md">
                  再入力
                </button>
              </div>
            </div>
          </div>

          {/* ==== Phần thông tin chi tiết ==== */}
          <div className="mt-4 px-2">
            <span className="font-bold">顧客情報詳細</span>
            <div className="border border-black p-2 h-40 mt-1 text-sm">
              {/* Hàng 1 */}
              <div className="flex items-center mb-1">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  氏名
                </span>
                <span className="ml-2">鈴木　カンクロウ</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  開閉
                </span>
                <span className="ml-2">新規開栓</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  供給
                </span>
                <span className="ml-2">個別</span>
              </div>

              {/* Hàng 2 */}
              <div className="flex items-center mb-1">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  住所
                </span>
                <div className="ml-2">
                  <p>埼玉県さいたま市なんちゃら０００１</p>
                  <p>さいたま市宮団地００１−２０１号室</p>
                </div>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  電話番号
                </span>
                <span className="ml-2">03-1234-9999</span>
              </div>

              {/* Hàng 3 */}
              <div className="flex items-center mb-1 mt-3">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  地区
                </span>
                <span className="ml-2">空白〇〇〇〇</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  地図
                </span>
                <span className="ml-2">空白</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  距離
                </span>
                <span className="ml-2">25km（53分）</span>
              </div>

              {/* Hàng 4 */}
              <div className="flex items-center mt-3">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  案内
                </span>
                <span className="ml-2">空白〇〇〇〇</span>
              </div>
            </div>
          </div>
          {/* ==== Phần thông tin chi tiết 2==== */}
          <div className="mt-4 px-2 font-bold">
            <span className="font-bold">前回実施情報</span>
            <div className="border border-black p-2 h-16 mt-1 text-sm">
              <div className="flex justify-between">
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    供給開始
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    消費調査
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    埋設管
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    供給点検
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center text-[11px]">
                    消費調査（器具のみ）
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    地下室
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-row p-2">
            <div className="flex flex-row">
              <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                印刷コード
              </span>
              <select className="border border-black ml-2 w-32">
                <option value="0">検索キー1</option>
                <option value="1">検索キー２</option>
                <option value="2">検索キー３</option>
              </select>
            </div>
            <div className="flex flex-row ml-4">
              <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                集合装置
              </span>
              <select className="border border-black ml-2 w-24">
                <option value="0">00</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              onClick={onClose}
              className="w-36 h-10 bg-[#D9D9D9] font-bold"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

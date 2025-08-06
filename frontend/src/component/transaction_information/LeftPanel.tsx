const LeftPanel = () => {
  return (
    <div className="w-[280px] h-full bg-white border-r border-gray-300 p-3 space-y-4 text-sm text-black">
      {/* 事務所コード */}
      <div>
        <div className="font-semibold bg-gray-200 px-2 py-1">事務所コード</div>
        <div className="flex items-center space-x-1 mt-1">
          <input
            type="text"
            className="w-24 border border-gray-300 px-2 py-1"
            placeholder="12345678"
          />
          <input
            type="text"
            className="w-24 border border-gray-300 px-2 py-1"
            placeholder="12345678"
          />
          <button className="border border-gray-400 bg-gray-100 px-2 h-8">
            ▼
          </button>
        </div>
      </div>

      {/* 顧客コード */}
      <div>
        <div className="font-semibold bg-gray-200 px-2 py-1">顧客コード</div>
        <div className="flex items-center space-x-1 mt-1">
          <input
            type="text"
            className="w-24 border border-gray-300 px-2 py-1"
            placeholder="12345678"
          />
          <input
            type="text"
            className="w-24 border border-gray-300 px-2 py-1"
            placeholder="12345678"
          />
          <button className="border border-gray-400 bg-gray-100 px-2 h-8">
            ▼
          </button>
        </div>
        <button className="mt-2 border border-gray-400 bg-white px-2 py-1">
          詳細検索（S）
        </button>
      </div>

      {/* 顧客情報 - Customer Info */}
      <div className="border border-gray-300 p-2 space-y-1 bg-gray-50">
        <div>山田　太郎</div>
        <div>東京都文京区小石川1-1-1 文京ビルディング</div>
        <div>03-1234-9999　電話番号</div>
        <div>X0123Y0315</div>

        <div className="grid grid-cols-3 gap-1 mt-2 text-xs">
          <div>
            <div className="bg-gray-200 text-center">当月日</div>
            <div className="text-center">2025/05/31</div>
          </div>
          <div>
            <div className="bg-gray-200 text-center">請求額</div>
            <div className="text-center">31</div>
          </div>
          <div>
            <div className="bg-gray-200 text-center">集金額</div>
            <div className="text-center">14</div>
          </div>
        </div>

        <div className="text-xs mt-2">
          <div>前回請求：2025/01/01</div>
          <div>回収日数：0日</div>
        </div>

        <button className="mt-2 border border-gray-400 bg-white px-2 py-1 text-xs">
          詳細表示（S）
        </button>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-gray-700 text-white py-2 font-semibold">
          請求親
        </button>
        <button className="w-full bg-white border border-gray-400 py-2">
          担当者
        </button>
        <button className="w-full bg-white border border-gray-400 py-2">
          顧客備考
        </button>
        <button className="w-full bg-white border border-gray-400 py-2">
          日報入力
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;

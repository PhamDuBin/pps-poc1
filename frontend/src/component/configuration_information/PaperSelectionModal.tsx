interface PaperSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaperSelectionModal: React.FC<PaperSelectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const rows = [
    { type: "伝票", name: "請求書 (15日)" },
    { type: "伝票", name: "請求書 (月末)" },
    { type: "伝票", name: "請求書 (月初)" },
    { type: "伝票", name: "請求書特別" },
    { type: "伝票", name: "請求書 (15日) ○○あて" },
  ];

  return (
    <div className="w-[60%] py-2 px-4">
      <div className="bg-[#D9D9D9] font-bold w-full mb-2">
        用紙選択 / 条件参照
      </div>

      {/* Select + Radio */}
      <div className="flex gap-4 mb-3">
        <select className="border border-gray-400 rounded px-2 py-1">
          <option value="0">新規</option>
          <option value="1">既存</option>
        </select>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1">
            <input type="radio" name="paperType" value="個別" />
            個別
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="paperType" value="共通" />
            共通
          </label>
        </div>
      </div>

      {/* Table with header + scrollable body */}
      <div className="border border-gray-400">
        {/* Header */}
        <table className="table-fixed w-full border-collapse">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[60%]" />
          </colgroup>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-2 py-1 text-center">
                帳票種類
              </th>
              <th className="border border-gray-400 px-2 py-1 text-center">
                ファイル名称
              </th>
            </tr>
          </thead>
        </table>

        {/* Body (scrollable) */}
        <div className="max-h-32 overflow-y-auto">
          <table className="table-fixed w-full border-collapse">
            <colgroup>
              <col className="w-[40%]" />
              <col className="w-[60%]" />
            </colgroup>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-2 py-1 text-center">
                    {row.type}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {row.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaperSelectionModal;

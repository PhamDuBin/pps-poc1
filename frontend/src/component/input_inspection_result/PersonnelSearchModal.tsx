import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { kanaButtons } from "../../constants/sale_slip_entry";
import {
  Select,
  Radio,
  type RadioChangeEvent,
  type InputRef,
  Button,
} from "antd";
import { HalfWidthKanaInput } from "../input/JapaneseInputs";
import { inputColor } from "../../constants/colors";

type PersonnelSearchModalProps = {
  onSelectAndClose: (personnel: PersonnelData) => void;
};

type PersonnelData = {
  name: string;
  kanaName: string;
};

const PersonnelSearchModal: React.FC<PersonnelSearchModalProps> = ({
  onSelectAndClose,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [selected, setSelected] = useState("1");
  const [customerCode, setCustomerCode] = useState({
    part1: "",
  });

  const rowCount = 30;
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);
  const tableHeaders = [
    "コード",
    "氏名",
    "カナ氏名",
    "所属事務所名",
    "所属事務所No.",
  ];
  const rowData = [
    "00000001",
    "担当者太郎",
    "タントウシャタロウ",
    "東京事務所03",
    "0001-001-000",
  ];
  const colWidths = ["15%", "20%", "20%", "25%", "20%"];

  const firstInputRef = useRef<InputRef>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleSelectRow = (rowIndex: number) => {
    const selectedData: PersonnelData = {
      name: rowData[1],
      kanaName: rowData[2],
    };
    onSelectAndClose(selectedData);
  };

  const handleTableKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (focusedRowIndex === null) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation(); // <-- Thêm vào
        setFocusedRowIndex(0); // Focus vào hàng đầu tiên
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation(); // <-- Thêm vào
        setFocusedRowIndex((prev) => Math.min((prev ?? 0) + 1, rowCount - 1)); // Di chuyển xuống
        break;
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation(); // <-- Thêm vào
        setFocusedRowIndex((prev) => Math.max((prev ?? 0) - 1, 0)); // Di chuyển lên
        break;
      case "Enter":
        e.preventDefault();
        e.stopPropagation(); // <-- Thêm vào
        if (focusedRowIndex !== null) {
          handleSelectRow(focusedRowIndex); // Chọn hàng hiện tại
        }
        break;
      default:
        // Không cần ngăn chặn các phím khác
        break;
    }
  };
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (focusedRowIndex !== null && rowRefs.current[focusedRowIndex]) {
      rowRefs.current[focusedRowIndex]?.scrollIntoView({
        behavior: "smooth", // Cuộn mượt
        block: "center", // Đảm bảo hàng nằm giữa màn hình
      });
    }
  }, [focusedRowIndex]);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      filterButtonRef.current?.focus();
    }
  };

  const handleFilterClick = () => {
    setShowTable(true);
    setFocusedRowIndex(0);
    setTimeout(() => {
      tableContainerRef.current?.focus();
    }, 0);
  };
  useEffect(() => {
    if (showTable && tableContainerRef.current) {
      tableContainerRef.current.focus();
    }
  }, [showTable]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        onKeyDown={(e) => e.stopPropagation()}
        className="bg-white p-4 rounded-lg shadow-xl border border-gray-400 w-[800px] "
      >
        <div>
          <div className="text-center h-8 text-sm bg-label border border-black py-1 font-semibold">
            担当者検索
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-sm flex items-center flex-row py-2">
                <>
                  <label className="bg-label p-1 font-bold w-24 text-center mr-2">
                    検索種類
                  </label>
                  <label className="bg-label w-64 p-1 font-bold text-center">
                    カナ
                  </label>
                </>
              </div>
              <div className="text-sm flex items-center flex-row py-2 w-full">
                <>
                  <form>
                    <Select className=" h-7 mr-2 bg-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24">
                      <Select.Option value="0">カナ</Select.Option>
                      <Select.Option value="1">コード</Select.Option>
                    </Select>
                  </form>
                  <HalfWidthKanaInput
                    ref={firstInputRef}
                    className={`w-64 p-1 border border-gray-500 hover:${inputColor}`}
                    value={customerCode.part1}
                    onChange={(e) =>
                      setCustomerCode((prev) => ({ ...prev, part1: e }))
                    }
                    onKeyDown={handleInputKeyDown}
                  ></HalfWidthKanaInput>
                </>
              </div>
            </div>
            <div>
              <Button
                ref={filterButtonRef}
                onClick={handleFilterClick} // Giữ nguyên
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    // Gọi hàm handleFilterClick đã được cập nhật
                    handleFilterClick();
                  }
                }}
                className="bg-white border text-center border-black p-2 w-32 rounded-md shadow-md shadow-zinc-600"
              >
                絞り込む
              </Button>
            </div>
          </div>
          <div className="mb-2 flex flex-wrap items-center justify-between">
            <div>
              <div className="text-sm flex items-center flex-row py-2 w-full">
                <>
                  <label className="bg-label p-1 font-bold w-24 text-center mr-2">
                    表示順
                  </label>

                  <Select className=" mr-2 bg-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24">
                    <Select.Option value="0">コード順</Select.Option>
                    <Select.Option value="1">五十音順</Select.Option>
                  </Select>

                  <label className="bg-label p-1 font-bold w-24 text-center mr-2">
                    検索種類
                  </label>
                  <Radio.Group
                    onChange={(e: RadioChangeEvent) =>
                      setSelected(e.target.value)
                    }
                    value={selected}
                    className="flex items-center"
                  >
                    <Radio
                      value="0"
                      className="text-sm w-24 justify-center whitespace-nowrap"
                    >
                      退職者以外
                    </Radio>
                    <Radio value="1" className="text-sm w-24 justify-center">
                      全て
                    </Radio>
                  </Radio.Group>
                </>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {kanaButtons.map((item, index) => {
            const isObject = typeof item === "object";
            const label = isObject ? item.label : item;
            const isWide = isObject && item.wide;
            return (
              <button
                key={index}
                className={`border text-center bg-white border-black p-0.5 mr-1 ${
                  isWide ? "w-20" : "w-8"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <h1 className="mt-2">検索結果：{rowCount}件</h1>
        {showTable && (
          <div className="personnel-search-modal-root">
            <div className="flex w-full sticky top-0 pr-3">
              {tableHeaders.map((header, colIndex) => (
                <div
                  key={header}
                  style={{ width: colWidths[colIndex] }}
                  className="flex pl-1 text-sm bg-label font-semibold border border-[#5D5D5D] m-0.5 h-8 items-center"
                >
                  {header}
                </div>
              ))}
            </div>
            <div
              ref={tableContainerRef}
              tabIndex={0}
              onKeyDown={handleTableKeyDown}
              className="h-48 overflow-y-auto outline-none"
            >
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  ref={(el) => {
                    rowRefs.current[rowIndex] = el;
                  }}
                  className={`flex cursor-pointer ${
                    focusedRowIndex === rowIndex ? "bg-blue-200" : ""
                  }`}
                  onClick={() => handleSelectRow(rowIndex)}
                >
                  {rowData.map((data, cellIndex) => (
                    <div
                      key={cellIndex}
                      style={{ width: colWidths[cellIndex] }}
                      className=" pl-1 flex items-center text-sm m-0.5 h-8"
                    >
                      {data}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => onSelectAndClose({ name: "", kanaName: "" })}
            className="bg-[#D9D9D9] font-bold py-2 px-8 rounded border border-gray-500"
          >
            閉じる
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonnelSearchModal;

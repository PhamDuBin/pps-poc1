import React, { useEffect, useRef, useState } from "react";
import { Button, Select, Radio, RadioChangeEvent } from "antd";
import "../../styles/04.05.04/style.css";
import {
  existCommonData,
  existIndividualData,
  newData,
  columns,
} from "../../constants/configuration_information";
import JapaneseCalendar from "../JapaneseCalendar";

type TableRowData = any;
type TableColumn = {
  title: string;
  dataIndex: string;
  key: string;
  width?: number | string;
};

const PaperSelectionModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [selectValue, setSelectValue] = useState("new");
  const [radioValue, setRadioValue] = useState("individual");
  const [data, setData] = useState<TableRowData[]>(newData);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [keiriDate, setKeiriDate] = useState<Date>(new Date());
  const [keiriDate1, setKeiriDate1] = useState<Date>(new Date());
  const calendarRef = useRef<any>(null);
  const firstInputRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const newRadioRef = useRef<any>(null);
  const referenceRadioRef = useRef<any>(null);
  const wasChangedByKeyboard = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);

  const onSelectChange = (value: string) => {
    setSelectValue(value);
    setSelectedRowIndex(null);
    if (value === "new") {
      setData(newData);
    } else {
      setData(existIndividualData);
      setRadioValue("individual");
    }
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setSelectedRowIndex(null);
    if (e.target.value === "individual") {
      setData(existIndividualData);
    } else {
      setData(existCommonData);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        firstInputRef.current?.focus?.();
      }, 100);
    } else {
      setSelectedRowIndex(null);
    }
  }, [open]);

  useEffect(() => {
    if (selectedRowIndex === null) return;
    const body = tableBodyRef.current;
    if (!body) return;
    const rows = body.querySelectorAll("tbody tr");
    const rowEl = rows[selectedRowIndex] as HTMLElement | undefined;
    rowEl?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [selectedRowIndex]);

  const handleSelectKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      wasChangedByKeyboard.current = true;
    }
  };

  useEffect(() => {
    const tableBody = tableBodyRef.current;
    if (!tableBody) return;

    const handleTableKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (selectedRowIndex !== null) {
          onClose();
        }
        return;
      }
      if (key === "ArrowDown" || key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();

        setSelectedRowIndex((prev) => {
          if (!data || data.length === 0) return null;
          const current = prev === null ? 0 : prev;

          if (key === "ArrowDown") {
            return Math.min(current + 1, data.length - 1);
          } else {
            return Math.max(current - 1, 0);
          }
        });
        return;
      }
      if (key === "ArrowLeft" || key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };
    tableBody.addEventListener("keydown", handleTableKeyDown);
    return () => {
      tableBody.removeEventListener("keydown", handleTableKeyDown);
    };
  }, [data, selectedRowIndex, onClose]);

  const handleRadioKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;

    if (key === "ArrowLeft" || key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      const newValue = radioValue === "individual" ? "common" : "individual";
      setRadioValue(newValue);
      if (newValue === "individual") {
        setData(existIndividualData);
      } else {
        setData(existCommonData);
      }
      setTimeout(() => {
        (newValue === "individual"
          ? newRadioRef.current
          : referenceRadioRef.current
        )?.focus();
      }, 0);
    } else if (key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      if (tableBodyRef.current) {
        tableBodyRef.current.focus();
        setSelectedRowIndex(0);
      }
    } else if (key === "ArrowUp" || (key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      e.stopPropagation();
      firstInputRef.current?.focus();
    } else if (key === "ArrowDown" || key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      calendarRef.current?.focus();
    }
  };

  const renderHtmlTable = (
    columns: TableColumn[],
    dataSource: TableRowData[]
  ) => {
    const colWidths = columns.map((col) =>
      col.width
        ? typeof col.width === "number"
          ? `${col.width}px`
          : col.width
        : "auto"
    );

    return (
      <div
        className="table-container"
        style={{ height: "300px", overflowY: "auto" }}
      >
        <table className="min-w-full border-collapse border border-black text-sm">
          <thead className="sticky top-0 bg-[#D9D9D9] text-black">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className="border border-black p-1 font-bold text-center"
                  style={{ width: colWidths[index] }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody ref={tableBodyRef} tabIndex={0}>
            {dataSource.map((record, index) => (
              <tr
                key={index}
                className={`custom-table-row ${
                  index === selectedRowIndex ? "selected-row" : ""
                }`}
                onClick={() => {
                  setSelectedRowIndex(index);
                  onClose();
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="border border-black p-1 text-center"
                  >
                    {record[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (!open) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      ref={modalRef}
    >
      <div
        className=" modal-content bg-white p-4 rounded-lg shadow-xl"
        style={{ width: 600, maxWidth: "90%" }}
      >
        <div className="text-center bg-[#D9D9D9] text-black text-2xl font-semibold py-2 mb-4">
          用紙選択 / 条件参照
        </div>
        <div className="mb-4 flex items-center gap-4">
          {/* Col 1 */}
          <div className="flex-shrink-0">
            <Select
              ref={firstInputRef}
              className="w-32 text-sm font-normal text-black"
              onChange={onSelectChange}
              value={selectValue}
              onKeyDown={handleSelectKeyDown}
            >
              <Select.Option value="new">新規</Select.Option>
              <Select.Option value="existing">既存</Select.Option>
            </Select>
          </div>
          {selectValue !== "new" && (
            <div className="modal flex-shrink-0">
              <div onKeyDown={handleRadioKeyDown}>
                <Radio.Group onChange={onRadioChange} value={radioValue}>
                  <Radio
                    value="individual"
                    ref={newRadioRef}
                    className="font-medium text-lg text-black"
                  >
                    個別
                  </Radio>
                  <Radio
                    value="common"
                    ref={referenceRadioRef}
                    className="font-medium text-lg text-black"
                  >
                    共通
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          )}
        </div>

        <div ref={wrapperRef} className="mb-4">
          {renderHtmlTable(columns as TableColumn[], data)}
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex items-center flex-1">
            <span className="bg-[#D9D9D9] font-bold text-sm text-black px-2 py-1 mr-2 flex-shrink-0">
              作成日
            </span>
            <JapaneseCalendar
              value={keiriDate}
              ref={calendarRef}
              onChange={(date) => setKeiriDate(date)}
              format="yyyy/MM/dd"
              placeholder="yyyy/MM/dd"
              className="japanese-calendar w-full ml-2 px-2 py-1 rounded-md bg-input flex-1"
            />
          </div>
          <div className="flex items-center flex-1">
            <span className="bg-[#D9D9D9] font-bold text-sm text-black px-2 py-1 mr-2 flex-shrink-0">
              更新日
            </span>
            <JapaneseCalendar
              value={keiriDate1}
              onChange={(date) => setKeiriDate1(date)}
              format="yyyy/MM/dd"
              placeholder="yyyy/MM/dd"
              className="japanese-calendar w-full ml-2 px-2 py-1 rounded-md bg-input flex-1"
            />
          </div>
        </div>

        {/* 保存目的 (Save Purpose) */}
        <div className="text-center mt-4 w-full">
          <div className="bg-[#D9D9D9] font-bold text-sm text-black mb-2 px-2 py-1 w-full inline-block">
            保存目的
          </div>
          <div className="w-full bg-white/20 border border-black mt-1 p-2 min-h-[50px] text-left"></div>
        </div>

        {/* Modal Footer (Footer Button Group) */}
        <div className="flex justify-around w-full mt-4 pt-4 border-t border-gray-300">
          {["実行", "削除", "閉じる"].map((label) => (
            <Button
              key={label}
              onClick={
                label === "閉じる" || label === "実行" ? onClose : undefined
              }
              type={label === "実行" ? "primary" : "default"}
              className="bg-bg-gray border border-black font-bold text-lg text-black px-8 py-2 shadow-md"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaperSelectionModal;

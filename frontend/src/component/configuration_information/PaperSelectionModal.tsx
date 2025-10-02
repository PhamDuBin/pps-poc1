import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Table,
  DatePicker,
  Select,
  Radio,
  Row,
  Col,
  ConfigProvider,
  RadioChangeEvent,
} from "antd";
import dayjs from "dayjs";
import jaJP from "antd/es/locale/ja_JP";
import "../../styles/04.05.04/style.css";

const { Option } = Select;

// Sample table data
const existCommonData = [
  { key: 1, type: "伝票", form: "請求書（15日）" },
  { key: 2, type: "伝票", form: "請求書（月末）" },
  { key: 3, type: "伝票", form: "請求書（15日）" },
  { key: 4, type: "伝票", form: "請求書特別" },
  { key: 5, type: "伝票", form: "請求書（15日）〇〇あて" },
  { key: 6, type: "伝票", form: "請求書（15日）" },
  { key: 7, type: "伝票", form: "請求書（月末）" },
  { key: 8, type: "伝票", form: "請求書（15日）" },
  { key: 9, type: "伝票", form: "請求書特別" },
  { key: 10, type: "伝票", form: "請求書（15日）〇〇あて" },
];

const existIndividualData = [
  {
    key: 1,
    type: "伝票",
    form: "テスト作成",
  },
];

const newData = [{ key: 1, type: "伝票", form: "空白(null)" }];

// Table columns
const columns = [
  { title: "帳票種類", dataIndex: "type", key: "type" },
  { title: "ファイル名称", dataIndex: "form", key: "form" },
];

const PaperSelectionModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [selectValue, setSelectValue] = useState("new");
  const [radioValue, setRadioValue] = useState("individual");
  const [data, setData] = useState(newData);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  // Refs
  const firstInputRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const newRadioRef = useRef<any>(null);
  const referenceRadioRef = useRef<any>(null);
  const wasChangedByKeyboard = useRef(false);

  const onSelectChange = (value: string) => {
    setSelectValue(value);
    setSelectedRowIndex(null);
    if (value === "new") {
      setData(newData);
    } else {
      setData(existIndividualData);
      setRadioValue("individual");
    }

    if (wasChangedByKeyboard.current) {
      setTimeout(() => {
        if (value === "new") {
          const tableBody = wrapperRef.current?.querySelector(
            ".ant-table-body"
          ) as HTMLElement | null;
          tableBody?.focus();
        } else {
          newRadioRef.current?.focus();
        }
      }, 0);

      wasChangedByKeyboard.current = false;
    }
  };

  // Radio change handler
  const onRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setSelectedRowIndex(null);
    if (e.target.value === "individual") {
      setData(existIndividualData);
    } else {
      setData(existCommonData);
    }
  };

  // Focus first input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        firstInputRef.current?.focus?.();
      }, 100);
    } else {
      setSelectedRowIndex(null);
    }
  }, [open]);

  // Table keyboard navigation
  useEffect(() => {
    if (!open) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const body = wrapper.querySelector(".ant-table-body") as HTMLElement | null;
    if (!body) return;
    body.tabIndex = 0;

    const onFocus = () => {
      setSelectedRowIndex((prev) => (prev === null ? 0 : prev));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (
        key === "ArrowDown" ||
        key === "ArrowUp" ||
        key === "Enter" ||
        (key === "Tab" && e.shiftKey)
      ) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        return;
      }

      setSelectedRowIndex((prev) => {
        const len = data.length;
        if (key === "ArrowDown")
          return prev === null ? 0 : Math.min(prev + 1, len - 1);
        if (key === "ArrowUp") return prev === null ? 0 : Math.max(prev - 1, 0);
        if (key === "Enter") {
          onClose();
          return prev;
        }
        if (key === "Tab" && e.shiftKey) {
          if (selectValue !== "new") {
            if (radioValue === "individual") newRadioRef.current?.focus();
            else referenceRadioRef.current?.focus();
          } else {
            firstInputRef.current?.focus();
          }
          return null;
        }

        return prev;
      });
    };

    body.addEventListener("focus", onFocus);
    body.addEventListener("keydown", onKeyDown);

    return () => {
      body.removeEventListener("focus", onFocus);
      body.removeEventListener("keydown", onKeyDown);
    };
  }, [open, data, radioValue, selectValue, onClose]);

  // Scroll table to selected row
  useEffect(() => {
    if (selectedRowIndex === null) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const body = wrapper.querySelector(".ant-table-body") as HTMLElement | null;
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

  const handleRadioKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      const tableBody = wrapperRef.current?.querySelector(
        ".ant-table-body"
      ) as HTMLElement | null;
      tableBody?.focus();
    }
  };

  return (
    <div>
      <Modal
        title={
          <div className="text-center bg-[#D9D9D9] text-black text-2xl font-semibold py-2">
            用紙選択 / 条件参照
          </div>
        }
        open={open}
        onCancel={onClose}
        closable={false}
        maskClosable={false}
        footer={
          <div className="flex justify-around w-full">
            {["実行", "削除", "閉じる"].map((label) => (
              <Button
                key={label}
                onClick={
                  label === "閉じる" || label === "実行" ? onClose : undefined
                }
                type={label === "実行" ? "primary" : "default"}
                className="bg-[#EEEEEE] border border-black font-bold text-lg text-black px-8 py-2 shadow-md"
              >
                {label}
              </Button>
            ))}
          </div>
        }
        width={600}
      >
        <ConfigProvider locale={jaJP}>
          {/* Select and Radio group */}
          <Row gutter={16} align="middle" className="mb-4">
            <Col>
              <Select
                ref={firstInputRef}
                className="w-32 text-sm font-normal text-black"
                onChange={onSelectChange}
                value={selectValue}
                onKeyDown={handleSelectKeyDown}
              >
                <Option value="new">新規</Option>
                <Option value="existing">既存 </Option>
              </Select>
            </Col>
            {selectValue !== "new" && (
              <Col>
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
              </Col>
            )}
          </Row>

          {/* Table */}
          <div ref={wrapperRef} className="mb-4">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              scroll={{ y: 300 }}
              rowClassName={(_, index) =>
                index === selectedRowIndex
                  ? "custom-table-row selected-row"
                  : "custom-table-row"
              }
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    onClose();
                  },
                };
              }}
            />
          </div>

          {/* DatePickers */}
          <Row gutter={16} className="mb-4">
            <Col span={12} className="flex items-center">
              <span className="bg-[#D9D9D9] font-bold text-sm text-black px-2 py-1 mr-2">
                作成日
              </span>
              <DatePicker
                className="flex-1"
                format="YYYY/MM/DD"
                value={dayjs("2010-12-30")}
              />
            </Col>
            <Col span={12} className="flex items-center">
              <span className="bg-[#D9D9D9] font-bold text-sm text-black px-2 py-1 mr-2">
                更新日
              </span>
              <DatePicker
                className="flex-1"
                format="YYYY/MM/DD"
                value={dayjs("2015-12-30")}
              />
            </Col>
          </Row>

          {/* Notes */}
          <div className="text-center mt-4 w-full">
            <div className="bg-[#D9D9D9] font-bold text-sm text-black mb-2 px-2 py-1 w-full inline-block">
              保存目的
            </div>
            <div className="w-full bg-white/20 border border-black mt-1 p-2 min-h-[50px] text-left"></div>
          </div>
        </ConfigProvider>
      </Modal>
    </div>
  );
};

export default PaperSelectionModal;

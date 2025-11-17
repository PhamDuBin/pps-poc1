import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Table,
  Select,
  Radio,
  Row,
  Col,
  ConfigProvider,
  RadioChangeEvent,
} from "antd";
import jaJP from "antd/es/locale/ja_JP";
import "../../styles/04.05.04/style.css";
import {
  existCommonData,
  existIndividualData,
  newData,
  columns,
} from "../../constants/configuration_information";
import JapaneseCalendar from "../JapaneseCalendar";

const { Option } = Select;
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
  const [keiriDate, setKeiriDate] = useState<Date>(new Date());
  const [keiriDate1, setKeiriDate1] = useState<Date>(new Date());

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
            (radioValue === "individual"
              ? newRadioRef.current
              : referenceRadioRef.current
            )?.focus();
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
                className="bg-bg-gray border border-black font-bold text-lg text-black px-8 py-2 shadow-md"
              >
                {label}
              </Button>
            ))}
          </div>
        }
        width={600}
      >
        <ConfigProvider locale={jaJP}>
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
          <Row gutter={16} className="mb-4">
            <Col span={12} className="flex items-center">
              <span className="bg-[#D9D9D9] font-bold text-sm text-black px-2 py-1 mr-2">
                作成日
              </span>
              <JapaneseCalendar
                value={keiriDate}
                onChange={(date) => setKeiriDate(date)}
                format="yyyy/MM/dd"
                placeholder="yyyy/MM/dd"
                className="japanese-calendar w-40 ml-2 px-2 py-1 rounded-md bg-input flex-1"
              />
            </Col>
            <Col span={12} className="flex items-center">
              <span className="bg-[#D9D9D9] font-bold text-sm text-black px-2 py-1 mr-2">
                更新日
              </span>
              <JapaneseCalendar
                value={keiriDate1}
                onChange={(date) => setKeiriDate1(date)}
                format="yyyy/MM/dd"
                placeholder="yyyy/MM/dd"
                className="japanese-calendar w-40 ml-2 px-2 py-1 rounded-md bg-input flex-1"
              />
            </Col>
          </Row>
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

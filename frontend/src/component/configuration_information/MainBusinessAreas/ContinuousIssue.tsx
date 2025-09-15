"use client";

import { DatePicker, Select, Checkbox, Form, Row, Col } from "antd";
import dayjs from "dayjs";

const { MonthPicker, RangePicker } = DatePicker;

const labelClass =
  "bg-[#D9D9D9] border border-gray-400 font-bold px-2 flex items-center justify-center min-h-[32px] w-[120px]";


const ContinuousIssue = () => {
  return (
    <div className="border border-black min-h-[120px]">
      <div className="bg-[#D9D9D9] font-bold text-center py-2">
        抽出条件｜連続発行
      </div>

      <Form layout="horizontal" colon={false} className="p-2">
  <Row gutter={[16, 16]}>
    {/* 1 hàng */}
    <Col span={8}>
      <Form.Item
        label={<div className={labelClass}>月度</div>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
      >
        <MonthPicker
          defaultValue={dayjs("2025-05", "YYYY-MM")}
          format="YYYY/MM"
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        label={<div className={labelClass}>締切指定</div>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
      >
        <Select defaultValue="締切残" style={{ width: "100%" }}>
          <Select.Option value="締切残">締切残</Select.Option>
          <Select.Option value="現在残">現在残</Select.Option>
          <Select.Option value="当月分">当月分</Select.Option>
        </Select>
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        label={<div className={labelClass}>残高指定</div>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
      >
        <Select defaultValue="残有り" style={{ width: "100%" }}>
          <Select.Option value="残有り">残有り</Select.Option>
          <Select.Option value="取引有り">取引有り</Select.Option>
          <Select.Option value="無条件">無条件</Select.Option>
        </Select>
      </Form.Item>
    </Col>

    {/* 2 hàng */}
    <Col span={8}>
      <Form.Item
        label={<div className={labelClass}>今回検計日</div>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <RangePicker format="YYYY/MM/DD" style={{ width: "100%" }} />
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        label={<div className={labelClass}>売上の条件</div>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
      >
        <Select defaultValue="無条件" style={{ width: "100%" }}>
          <Select.Option value="無条件">無条件</Select.Option>
          <Select.Option value="検針後売上有り ">検針後売上有り</Select.Option>
        </Select>
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item
        label={<div className={labelClass}>取引区分</div>}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 6 }}
      >
        <Checkbox.Group defaultValue={["直売", "卸"]}>
          <Checkbox value="直売">直売</Checkbox>
          <Checkbox value="卸">卸</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </Col>
  </Row>
</Form>

    </div>
  );
};

export default ContinuousIssue;

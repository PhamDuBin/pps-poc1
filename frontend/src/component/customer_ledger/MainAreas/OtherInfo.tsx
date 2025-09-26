import { Button, Select, Input } from "antd";
import { labelColor,inputColor} from "../../../constants/colors";
import { forwardRef, useImperativeHandle, useRef } from "react";

const OtherInfo = forwardRef<any>((props, ref) => {

    const firstButtonRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useImperativeHandle(ref, () => ({
        focusFirstButton : () => {
          firstButtonRef.current.focus();
        },
        getContainerNode: () => {
          return containerRef.current
        }
    
    }));
  const inputColorClass = `!${inputColor} border border-black`;
  const label =
    `w-32 mr-2 h-6 border-gray-300 rounded-md font-bold flex text-center justify-center items-center ${labelColor}`;
  return (
    <div className="w-full text-xs py-4">
      {/* Header */}
      <div className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}>
        その他情報
      </div>

      {/* Form phía trên */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        {/* Cột trái */}
        <div className="flex items-center">
          <Button ref={firstButtonRef} className={`${label} shadow-md shadow-zinc-500 focus:border-3 focus:border-yellow-600`}>
            顧客工務店
          </Button>
          <Input className={` h-6 w-32 ${inputColorClass}`} defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <label className={label}>紹介者</label>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={""}></Input>
        </div>

        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            紹介元工務店
          </Button>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            前納入先
          </Button>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            オーナー
          </Button>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            管理会社
          </Button>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <label className={label}>持家区分</label>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={"0"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <label className={label}>部屋数</label>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={""}></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>家族人数</label>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={""}></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>距離</label>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={""}></Input>
          <p>Km</p>
        </div>
        <div className="flex items-center">
          <label className={label}>時間</label>
          <Input className={` h-6 w-32 ${inputColorClass}`}  defaultValue={""}></Input>
          <p>分</p>
        </div>
        <div className="flex items-center">
          <label className={label}>周知対象区分</label>
          <Select className={` h-6 w-32 [&>.ant-select-selector]:!bg-[#ebcec0] border border-black rounded-lg`}  defaultValue="0:空欄">
            <Select.Option value="0:空欄">0:空欄</Select.Option>
            <Select.Option value="1:1年">1:1年</Select.Option>
            <Select.Option value="2:2年">2:2年</Select.Option>
            <Select.Option value="3:3年">3:3年</Select.Option>
          </Select>
        </div>
        <div className="flex items-center">
          <label className={label}>財務補助コード</label>
          <Input className={` h-6 w-32 ${inputColorClass}`} defaultValue={""}></Input>
        </div>
      </div>
    </div>
  );
});

export default OtherInfo;

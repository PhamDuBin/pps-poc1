import React from "react";
import { Button } from "antd";
type SaleDetailSelectorProps = {
  onReSearch: () => void;
};
const SaleDetailSelector: React.FC<SaleDetailSelectorProps> = ({
  onReSearch,
}) => {
  return (
    <div className="flex">
      <div className="w-44 flex gap-1 items-center">
        <div className="bg-label p-1">商品コード</div>
        <div>0111107</div>
      </div>
      <div className="w-32 flex gap-1 items-center">
        <div className="bg-label p-1">セットNo.</div>
        <div className="w-8 h-6 border border-black"></div>
      </div>
      <div className="w-56 flex gap-1 items-center">
        <div className="bg-label p-1">商品名</div>
        <div>パロマ湯沸器（13A）</div>
      </div>
      <div className="w-32 flex gap-1 items-center">
        <div className="bg-label p-1">型式</div>
        <div>PH−5BV</div>
      </div>
      <Button
        onClick={onReSearch}
        className="border border-black shadow-md shadow-zinc-600"
      >
        再検索
      </Button>
    </div>
  );
};

export default SaleDetailSelector;

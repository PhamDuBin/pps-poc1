import { labelColor } from "../../constants/colors";
import { Select, Button, Radio, Input } from "antd";
import BasicInformation from "./BasicInformation";
import FamilyInfo from "./FamilyInfo";
import OtherInfo from "./OtherInfo";
import AcquisitionInformation from "./AcquisitionInformation";

const MainBusinessScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col px-4 py-2">
      {/* label header */}
      <span
        className={`w-full h-10 rounded-md font-bold xl:text-2xl text-xl flex text-center justify-center items-center ${labelColor}`}
      >
        顧客台帳
      </span>
      {/* customer search */}
      <div className="w-full flex justify-center items-center text-sm">
        <div className="w-[90%] h-24 border border-black rounded-md p-2 flex flex-col mt-2 ">
          <div className="w-full flex flex-row items-center justify-center">
            <Select className="w-40 mr-2 " defaultValue="顧客コード">
              <Select.Option value="顧客コード">顧客コード</Select.Option>
              <Select.Option value="取引先">取引先</Select.Option>
              <Select.Option value="検索キー2">検索キー2</Select.Option>
              <Select.Option value="電算コード">電算コード</Select.Option>
              <Select.Option value="軒先バーコード">
                軒先バーコード
              </Select.Option>
              <Select.Option value="配送順コード">配送順コード</Select.Option>
              <Select.Option value="点検順コード">点検順コード</Select.Option>
              <Select.Option value="営業順コード">営業順コード</Select.Option>
              <Select.Option value="検針順コード">検針順コード</Select.Option>
              <Select.Option value="集金順コード">集金順コード</Select.Option>
              <Select.Option value="配送センターコード">
                配送センターコード
              </Select.Option>
              <Select.Option value="保安機関コード">
                保安機関コード
              </Select.Option>
              <Select.Option value="集中監視センターコード">
                集中監視センターコード
              </Select.Option>
            </Select>
            <Input
              className="w-10 !px-0 text-center"
              defaultValue={"0000"}
            ></Input>
            <span>-</span>
            <Input
              className="w-10 !px-0 text-center"
              defaultValue={"000"}
            ></Input>
            <span>-</span>
            <Input
              className="w-14 !px-0 text-center"
              defaultValue={"000000"}
            ></Input>
            <span>-</span>
            <Input
              className="w-10 !px-0 text-center"
              defaultValue={"000"}
            ></Input>
            <Button className="h-8 w-8 mx-2 shadow-md shadow-zinc-500">
              ▼
            </Button>
            <Button className="h-8 w-14 shadow-md shadow-zinc-500">
              再入力
            </Button>
            <span className="h-8 border border-black font-bold flex text-center justify-center items-center px-2 ml-7 mr-2">
              管理区分
            </span>
            <Button className="h-8 w-12 mx-2 shadow-md shadow-zinc-500">
              直売
            </Button>
            <Button className="h-8 w-12 mx-2 shadow-md shadow-zinc-500">
              卸
            </Button>
            <Button className="h-8 w-12 mx-2 shadow-md shadow-zinc-500">
              配送
            </Button>
            <Button className="h-8 w-12 mx-2 shadow-md shadow-zinc-500">
              保安
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center mt-2">
            <span className="h-8 border border-black font-bold flex text-center justify-center items-center px-2 ml-7 mr-2">
              氏名
            </span>
            <Input className="w-[20%] !px-0 text-center"></Input>
            <span className="h-8 border border-black font-bold flex text-center justify-center items-center px-2 ml-7 mr-2">
              顧客種別
            </span>
            <Radio.Group defaultValue={"法人以外"}>
              <Radio value="法人以外">法人以外</Radio>
              <Radio value="法人 ">法人 </Radio>
            </Radio.Group>
            <span className="h-8 border border-black font-bold flex text-center justify-center items-center px-2 ml-7 mr-2">
              代表者名
            </span>
            <Input className="w-[20%] !px-0 text-center"></Input>
          </div>
        </div>
      </div>
      {/* button group */}
      <div className="flex flex-row my-2 justify-between items-center text-sm mx-48">
        <Button className="w-28 shadow-md shadow-zinc-500">基本情報</Button>
        <Button className="w-28 shadow-md shadow-zinc-500">獲得情報</Button>
        <Button className="w-28 shadow-md shadow-zinc-500">担当・地区</Button>
        <Button className="w-28 shadow-md shadow-zinc-500">緊急連絡先</Button>
        <Button className="w-28 shadow-md shadow-zinc-500">その他情報</Button>
        <Button className="w-28 shadow-md shadow-zinc-500">家族情報</Button>
      </div>
      {/* content area */}
      <div className="w-full h-[70%] flex justify-center items-center text-sm">
        <div className="w-[90%] h-full border border-black p-4 overflow-auto">
          <BasicInformation />
          <AcquisitionInformation/>
          <OtherInfo />
          <FamilyInfo />
        </div>
      </div>
      {/* footer */}
      <div className="flex flex-col text-sm w-full justify-center items-center mt-2">
        <div className="flex flex-row justify-between items-center w-[90%]">
          <Button className="w-28 shadow-md shadow-zinc-500">F1ヘルプ</Button>
          <Button className="w-28 shadow-md shadow-zinc-500">F2入力切替</Button>
          <Button className="w-28 shadow-md shadow-zinc-500">
            F3事業所変更
          </Button>
          <Button className="w-28 shadow-md shadow-zinc-500">F4検索</Button>
          <Button className="w-28 shadow-md shadow-zinc-500">F5前の顧客</Button>
          <Button className="w-28 shadow-md shadow-zinc-500">F6次の顧客</Button>
          <Button className="w-28 shadow-md shadow-zinc-500">
            F7顧客コード変更
          </Button>
          <Button className="w-28 shadow-md shadow-zinc-500">F8再入力</Button>
        </div>
        <div className="flex flex-col w-[90%] mt-2">
          {/* Hàng thứ hai: chia 3 block */}
          <div className="flex flex-row justify-between w-full">
            {/* マスター情報 */}
            <div className="flex flex-col w-[40%]">
              <span className="h-8 border border-gray-300 rounded-md font-bold flex text-center justify-center items-center w-full">
                マスター情報
              </span>
              <div className="flex flex-row w-full">
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  顧客{"\n"}情報
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  請求{"\n"}情報
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  検配{"\n"}情報
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  灯油{"\n"}情報
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  集中{"\n"}監視
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  保証金
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  保安{"\n"}情報
                </Button>
              </div>
            </div>

            {/* 伝票入力 */}
            <div className="flex flex-col w-[30%]">
              <span className="h-8 border border-gray-300 rounded-md font-bold flex text-center justify-center items-center w-full">
                伝票入力
              </span>
              <div className="flex flex-row w-full">
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  開始{"\n"}点検
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  開閉{"\n"}伝票
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  検針{"\n"}伝票
                </Button>
                <Button className="flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line">
                  配送{"\n"}伝票
                </Button>
              </div>
            </div>

            {/* 保存削除閉じる */}
            <div className="flex flex-row justify-end w-[30%]">
              <Button className="flex-1 h-full shadow-md shadow-zinc-500">
                保存(S)
              </Button>
              <Button className="flex-1 h-full shadow-md shadow-zinc-500">
                削除(D)
              </Button>
              <Button className="flex-1 h-full shadow-md shadow-zinc-500">
                閉じる(C)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBusinessScreen;

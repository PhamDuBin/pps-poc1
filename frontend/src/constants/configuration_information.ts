// IndividualIssue
export const options = [
  { value: "0", label: "顧客コード" },
  { value: "1", label: "五十音順" },
  { value: "2", label: "検針順" },
  { value: "3", label: "営業順" },
  { value: "4", label: "集金順" },
  { value: "5", label: "配送順" },
  { value: "6", label: "点検順" },
  { value: "7", label: "検索１順" },
  { value: "8", label: "検索２順" },
];

// PrintingDesignation
export const printingButtons: { [key: string]: string[] } = {
  group1: ["事業者", "事業所", "部門"],
  group2: ["取引区分", "営業地区", "集金地区", "検針地区", "点検地区"],
  group3: [
    "営業担当",
    "集金担当",
    "点検担当",
    "検針担当",
    "配送担当",
    "保安担当",
  ],
  group4: ["集金方法", "請求書発行区分"],
};
export const printingOrderOptions = [
  "顧客コード",
  "五十音順",
  "検針順",
  "営業順",
  "集金順",
  "配送順",
  "点検順",
  "検索１順",
  "検索２順",
];
export const detailOptions = ["全明細", "集金明細", "自振明細"];
export const taxTypeOptions = ["外税", "内税"];
export const taxCollectOptions = ["する", "しない"];
export const printItemOptions = [
  "事業所名",
  "ガス料金名称",
  "電話番号",
  "領収額",
  "振込先",
  "お買い上げ先",
];
export const memoOptions = ["伝票メモ", "ポイント"];
export const memoRadioOptions = [
  "割引（割引対象外顧客の場合は伝票メモを印字）",
  "割引（割引対象外顧客の場合はポイントを印字）",
];
export const parentChildOptions = [
  "請求親子取りまとめて発行する。",
  "個別に発行する。",
];
export const addressOptions = [
  "宛先登録内容を印字しない",
  "宛先登録内容を印字する",
];
export const detailOrderOptions = [
  "日付順",
  "大分類・商品コード・日付順",
  "大分類・日付順",
];

//TargetCustomer
export const buttonTitle = [
  "事業者",
  "事業所",
  "管理部門",
  "開閉栓区分",
  "供給業態",
  "販売用途区分",
  "締日",
  "集金方法",
  "集金日",
  "自振区分",
  "料金表No.",
  "検針予定日",
  "請求発行区分",
];

//TitleFormSetting
export const labelOptions = [
  { code: "0", label: "0:ご請求" },
  { code: "1", label: "1:ご案内1" },
  { code: "2", label: "2:ご案内2" },
  { code: "3", label: "3:ご案内3" },
  { code: "4", label: "4:ご案内4（仮）" },
];

//PaperSelectionModal
export const existCommonData = [
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
export const existIndividualData = [
  {
    key: 1,
    type: "伝票",
    form: "テスト作成",
  },
];
export const newData = [{ key: 1, type: "伝票", form: "空白(null)" }];
export const columns = [
  { title: "帳票種類", dataIndex: "type", key: "type" },
  { title: "ファイル名称", dataIndex: "form", key: "form" },
];

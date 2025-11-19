//AdvanceSearchModal
export const fieldDefinitions = [
  { id: "allTelNumber", label: "ALL電話番号", type: "single" }, // (1.1) ALL電話番号
  {
    id: "customerCode",
    label: "顧客コード",
    type: "multi",
    // 0000 - 000 - 000000 - 000
    partSizes: [
      { size: 4, placeholder: "0000" },
      { size: 3, placeholder: "000" },
      { size: 6, placeholder: "000000" },
      { size: 3, placeholder: "000" },
    ],
  }, // (1.2) 顧客コード
  { id: "searchCode1", label: "検索コード１", type: "single" }, // (1.3) 検索コード１

  { id: "kanaNameFuzzy", label: "カナ氏名（あいまい）", type: "single" }, // (2.1) カナ氏名 (あいまい)
  { id: "securityCode", label: "保安機関コード", type: "dropdown" }, // (2.2) 保安機関コード
  { id: "searchCode2", label: "検索コード２", type: "single" }, // (2.3) 検索コード２

  { id: "tel1", label: "電話番号１", type: "single" }, // (3.1) 電話番号１
  {
    id: "meterRouteCode",
    label: "検針順コード",
    type: "multi",
    // 0000 - 000 - 000
    partSizes: [
      { size: 4, placeholder: "0000" },
      { size: 3, placeholder: "000" },
      { size: 3, placeholder: "000" },
    ],
  }, // (3.2) 検針順コード
  {
    id: "keroseneCode",
    label: "灯油配達順コード",
    type: "multi",
    // 0000 - 000 - 000
    partSizes: [
      { size: 4, placeholder: "0000" },
      { size: 3, placeholder: "000" },
      { size: 3, placeholder: "000" },
    ],
  }, // (3.3) 灯油配達順コード (Cùng hàng với 検針順コード)

  { id: "tel2", label: "電話番号２", type: "single" }, // (4.1) 電話番号２
  {
    id: "deliveryRouteCode",
    label: "配送順コード",
    type: "multi",
    // 0000 - 000 - 000
    partSizes: [
      { size: 4, placeholder: "0000" },
      { size: 3, placeholder: "000" },
      { size: 3, placeholder: "000" },
    ],
  }, // (4.2) 配送順コード
  {
    id: "salesRepCode",
    label: "営業順コード",
    type: "multi",
    // 0000 - 000 - 000
    partSizes: [
      { size: 4, placeholder: "0000" },
      { size: 3, placeholder: "000" },
      { size: 3, placeholder: "000" },
    ],
  }, // (4.3) 営業順コード (Cùng hàng với 配送順コード)

  { id: "tel3", label: "電話番号３", type: "single" }, // (5.1) 電話番号３
  {
    id: "gMeterCode",
    label: "点検順コード",
    type: "multi",
    // 0000 - 000 - 000
    partSizes: [
      { size: 4, placeholder: "0000" },
      { size: 3, placeholder: "000" },
      { size: 3, placeholder: "000" },
    ],
  }, // (5.2) 点検順コード
  {
    id: "chimneyCode",
    label: "集金順コード",
    type: "multi",
    // 0000 - 000 - 000
    partSizes: [
      { size: 4, placeholder: "0000" },
      { size: 3, placeholder: "000" },
      { size: 3, placeholder: "000" },
    ],
  }, // (5.3) 集金順コード (Cùng hàng với 点検順コード)

  {
    id: "addressName",
    label: "住所＋カナ",
    type: "double",
    placeholders: ["住所", "カナ氏名"],
  }, // (6.1) 住所＋カナ
  {
    id: "managementCenterCode",
    label: "集中管理センターコード",
    type: "dropdown",
  }, // (6.2) 集中管理センターコード (Nằm ở giữa)

  {
    id: "addressName2",
    label: "住所名称＋カナ",
    type: "double",
    placeholders: ["住所名称", "カナ氏名"],
  }, // (7.1) 住所名称＋カナ
  { id: "deliveryCenterCode", label: "配送センターコード", type: "dropdown" }, // (7.2) 配送センターコード (Nằm ở giữa)

  { id: "gasMeterSerial", label: "ガスメータ製造番号", type: "single" }, // (8.1) ガスメータ製造番号
] as const;

// BalanceDetailScreen
export const detailsHeaders = [
  "日付",
  "伝票番号",
  "項目名",
  "売上金額（税込）",
  "入金金額",
  "残高",
  "自振対象",
];
export const categoryHeaders = [
  "項目名",
  "前月残高",
  "当月売上額",
  "当月入金額",
  "調整額・返品",
  "大分類別残高",
];
export const categoryItemNames = [
  "LPG",
  "ガス器具",
  "その他器具・工事",
  "リース",
  "大分類5",
  "大分類6",
  "大分類7",
  "大分類8",
  "大分類9",
  "電力",
  "その他",
  "",
  "",
  "",
  "",
  "",
  "割賦金",
];

//CheckSaleByCategoryScreen
export const labels = [
  "LPG",
  "ガス器具",
  "その他器具・工事",
  "リース",
  "大分類5",
  "大分類6",
  "大分類7",
  "大分類8",
  "大分類9",
  "電力",
  "割賦金",
  "その他",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "合計",
];

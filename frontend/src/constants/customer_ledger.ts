//AcquisitionInformation
export const openCloseOptions = [
  { code: "0", label: "0 新規開栓" },
  { code: "1", label: "1 入居開栓" },
  { code: "2", label: "2 閉栓解除" },
  { code: "3", label: "3 季節開栓" },
  { code: "4", label: "4 解約閉栓" },
  { code: "5", label: "5 引越閉栓" },
  { code: "6", label: "6 季節中断閉栓" },
  { code: "7", label: "7 強制中断閉栓" },
  { code: "9", label: "9 対象外" },
  { code: "12", label: "12 未入居閉栓" },
];
export const contractOptions = [
  { code: "0", label: "0 空白" },
  { code: "1", label: "1 新設" },
  { code: "2", label: "2 転入" },
  { code: "3", label: "3 解約" },
  { code: "4", label: "4 対象外" },
  { code: "9", label: "9 債権者" },
];
export const acquisitionRouteOptions = [
  { code: "0", label: "0 空白" },
  { code: "1", label: "1 既存工務店紹介" },
  { code: "2", label: "2 新規工務店紹介" },
  { code: "3", label: "3 転換営業" },
  { code: "4", label: "4 顧客からの紹介" },
  { code: "5", label: "5 取引先からの紹介" },
  { code: "6", label: "6 社内紹介" },
  { code: "7", label: "7 受託" },
  { code: "8", label: "8 買収" },
  { code: "9", label: "9 建替" },
  { code: "10", label: "10 増築" },
  { code: "20", label: "20 その他" },
];
export const customerStatusOptions = [
  { code: "0", label: "0 空白" },
  { code: "1", label: "1 新規" },
  { code: "2", label: "2 買収" },
  { code: "9", label: "9 その他" },
];
export const groupTypeOptions = [
  { code: "0", label: "0 個別" },
  { code: "1", label: "1 集合親" },
  { code: "2", label: "2 集合子" },
];
export const inspectionTypeOptions = [
  { code: "0", label: "0 対象外" },
  { code: "1", label: "1 検針（シリンダー）" },
  { code: "2", label: "2 検針（バルク）" },
  { code: "3", label: "3 検針（新バルク）" },
  { code: "4", label: "4 重量（シリンダー）" },
  { code: "5", label: "5 ローリー（バルク）" },
  { code: "6", label: "6 ローリー（新バルク）" },
];
export const usageTypeOptions = [
  { code: "01", label: "01 家庭用・戸建" },
  { code: "07", label: "07 家庭用・集合" },
  { code: "09", label: "09 集合ファミリー・借家" },
  { code: "11", label: "11 バルク" },
  { code: "12", label: "12 簡易ガス" },
  { code: "13", label: "13 業務用" },
  { code: "15", label: "15 業務用（空調）" },
  { code: "16", label: "16 業務用（事務所他）" },
  { code: "17", label: "17 工業用（一般）" },
  { code: "19", label: "19 集計なし" },
  { code: "20", label: "20 その他" },
];
export const decisionStatusOptions = [
  { code: "0", label: "0 確定" },
  { code: "1", label: "1 仮" },
];
export const availabilityOptions = [
  { code: "0", label: "0 無" },
  { code: "1", label: "1 有" },
];

//BasicInformation
export const labels = [
  "氏名",
  "顧客種別",
  "カナ",
  "取引種類",
  "代表者名",
  "郵便番号",
  "住所",
  "番地",
  "住所名称",
  "電話番号1",
  "時間帯1",
  "電話番号2",
  "時間帯2",
  "電話番号3",
  "FAX",
  "地図番号",
  "メールアドレス",
  "管理部門",
  "検索キー1",
  "検索キー2",
  "配送センターコード",
  "保安機関コード",
  "集中監視コード",
  "案内",
  "備考1",
  "備考2",
  "備考3",
];
export const labelGroups = [
  "代表者名",
  "郵便番号",
  "住所名称",
  "管理部門",
  "配送センターコード",
  "保安機関コード",
  "集中監視コード",
  "案内",
  "備考1",
  "備考2",
  "備考3",
  "番地",
  "住所",
];
export const timeSlotOptions = [
  { code: "0", label: "0:空白" },
  { code: "1", label: "1:随時" },
  { code: "2", label: "2:昼間" },
  { code: "3", label: "3:夜間" },
];
export const departmentOptions = [
  { code: "0", label: "0:空白" },
  { code: "1", label: "1:部門1" },
  { code: "2", label: "2:部門2" },
  { code: "3", label: "3:部門3" },
];
export const deliveryCenterOptions = [
  { code: "0", label: "空白" },
  { code: "1", label: "拠点名0001" },
  { code: "2", label: "拠点名0002" },
  { code: "3", label: "拠点名0003" },
  { code: "4", label: "拠点名0004" },
];
export const securityAgencyOptions = [
  { code: "0", label: "空白" },
  { code: "1", label: "保安機関0001" },
  { code: "2", label: "保安機関0002" },
  { code: "3", label: "保安機関0003" },
  { code: "4", label: "保安機関0005" },
];
export const monitoringOptions = [
  { code: "0", label: "空白" },
  { code: "1", label: "集中監視0001" },
  { code: "2", label: "集中監視002" },
  { code: "3", label: "集中監視003" },
];
export const defaultInputValues: { [key: string]: string } = {
  氏名: "テストさん太郎",
  カナ: "ﾃｽﾄｻﾝﾀﾛｳ",
  代表者名: "代表者テスト",
  番地: "1-2-3",
  住所名称: "◯◯ハイツ文京区",
  部屋番号: "203",
  電話番号1: "050-1234-9999",
  電話番号2: "090-1234-5555",
  メールアドレス: "sample_user@gmail.com",
  検索キー1: "A0001BBB",
  検索キー2: "Testkey001",
  案内: "電話番号2を通常で使う",
  備考1: "電話番号2を通常で使う",
  備考2: "電話番号2を通常で使う",
  備考3: "電話番号2を通常で使う",
};
export const initialEmptyValues = {
  time1: "0",
  time2: "0",
  departmentCode: "0",
  deliveryCenterCode: "0",
  securityAgencyCode: "0",
  monitoringCode: "0",
  postalCode1: "",
  postalCode2: "",
  address: "",
  氏名: "",
  カナ: "",
  代表者名: "",
  番地: "",
  住所名称: "",
  電話番号1: "",
  電話番号2: "",
  電話番号3: "",
  FAX: "",
  地図番号: "",
  メールアドレス: "",
  検索キー1: "",
  検索キー2: "",
  案内: "",
  備考1: "",
  備考2: "",
  備考3: "",
  representativeName: "",
  customerType: "法人以外",
  transactionType: "ガス顧客",
  deliveryCenterName: "9352716",
  securityAgencyName: "TA90",
  monitoringName: "00503",
};
export const customerTypeOption = ["法人以外", "法人"];
export const transactionTypeOption = ["ガス顧客", "ガス外顧客"];

//FamilyInfo
export const workingCoupleOptions = [
  { code: "0", label: "0 空欄" },
  { code: "1", label: "1 共働き" },
];
export const housingTypeOptions = [
  { code: "0", label: "00:空白" },
  { code: "1", label: "01:戸建て" },
  { code: "2", label: "02:3LDK" },
  { code: "3", label: "03:3DK" },
  { code: "4", label: "04:2LDK" },
  { code: "5", label: "05:2DK" },
  { code: "6", label: "06:1ルーム" },
  { code: "20", label: "20:その他" },
];
export const relationshipOptions = [
  { code: "0", label: "0:空欄" },
  { code: "1", label: "1:A" },
  { code: "2", label: "2:B" },
  { code: "3", label: "3:C" },
  { code: "4", label: "4:D" },
];
export const freeDescriptionOptions = [
  { code: "0", label: "0:空欄" },
  { code: "1", label: "1:null" },
  { code: "2", label: "2:null" },
  { code: "3", label: "3:null" },
  { code: "4", label: "4:null" },
  { code: "5", label: "5:null" },
  { code: "6", label: "6:null" },
  { code: "7", label: "7:null" },
  { code: "8", label: "8:null" },
  { code: "9", label: "9:null" },
];
export const initialFamilyData = [
  {
    id: 1,
    relation: "父",
    name: "テスト氏名1",
    gender: "男性",
    dob: "1980/01/01",
    job: "会社員",
    health: "その他",
    hobby: "マリンスポーツ",
  },
  {
    id: 2,
    relation: "母",
    name: "テスト氏名2",
    gender: "女性",
    dob: "1982/05/10",
    job: "主婦",
    health: "良好",
    hobby: "読書",
  },
  {
    id: 3,
    relation: "長男",
    name: "テスト氏名3",
    gender: "男性",
    dob: "2010/11/20",
    job: "学生",
    health: "良好",
    hobby: "ゲーム",
  },
];

//OtherInfo
export const homeOwnershipOptions = [
  { code: "0", label: "0:空白" },
  { code: "1", label: "1:持家" },
  { code: "2", label: "2:借家" },
  { code: "3", label: "3:マンション" },
  { code: "4", label: "4:アパート" },
  { code: "5", label: "5:公営住宅" },
  { code: "6", label: "6:社宅・寮" },
  { code: "7", label: "7:店舗事務所" },
  { code: "8", label: "8:別荘" },
  { code: "9", label: "9:その他" },
];
export const notificationTypeOptions = [
  { code: "0", label: "0:空欄" },
  { code: "1", label: "1:1年" },
  { code: "2", label: "2:2年" },
  { code: "3", label: "3:3年" },
];

//FamilyInfoModal
export const relationOptions = [
  "0:空白",
  "1:本人",
  "2:妻",
  "3:父",
  "4:母",
  "5:兄",
  "6:姉",
  "7:弟",
  "8:妹",
  "9:子",
  "10:祖父",
  "11:祖母",
  "12:義父",
  "13:義母",
  "14:義祖父",
  "15:義祖母",
  "16:義兄",
  "17:義弟",
  "18:義姉",
  "19:義妹",
  "20:その他",
].map((item) => {
  const [code] = item.split(":");
  return { code, label: item };
});
export const genderOptions = ["0:空白", "1:男性", "2:女性"].map((item) => {
  const [code] = item.split(":");
  return { code, label: item };
});
export const jobOptions = [
  "0:空白",
  "1:会社員",
  "2:公務員",
  "3:自営業",
  "4:学生",
  "5:主婦",
  "6:無職",
].map((item) => {
  const [code] = item.split(":");
  return { code, label: item };
});
export const healthOptions = [
  "0:空白",
  "1:肥満対応",
  "2:健康食品",
  "3:健康器具",
  "4:美容飲料",
  "5:良好",
  "6:その他",
].map((item) => {
  const [code] = item.split(":");
  return { code, label: item };
});
export const hobbyOptions = [
  "0:空白",
  "1:映画鑑賞",
  "2:音楽鑑賞",
  "3:美術鑑賞",
  "4:スポーツ観戦",
  "5:読書",
  "6:フィッシング",
  "7:ドライブ",
  "8:サイクリング",
  "9:ガーデニング",
  "10:スキー",
  "11:スノーボード",
  "12:マリンスポーツ",
  "13:登山",
  "14:料理",
  "15:写真",
  "16:インターネット",
  "17:旅行",
  "18:ブリーディング",
  "19:アウトドア",
  "20:その他",
].map((item) => {
  const [code] = item.split(":");
  return { code, label: item };
});

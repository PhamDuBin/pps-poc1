export const symbols = ["", "◯", "×", "✔"];

// CircuitBreaker
export const rows = [
  { label: "放出防止", model: "00001", count: "00001" },
  { label: "耐震遮断", model: "00001", count: "00001" },
  { label: "警報遮断", model: "00001", count: "00001" },
  { group: "気化器", label: "気化装置停電対策" },
  { group: "気化器", label: "電気気化装置による手動復帰式自動ガス遮断器" },
];

//ConnectingPipe
export const options = [
  "0: 未選択",
  "1: 掘出調査",
  "2: 気密試験",
  "3: 漏洩試験",
  "4: 目視",
  "5: ボーリング調査",
  "6: 検知装置",
  "9: その他",
];
export const rowsPipe = [
  { group: "高圧側", no: 1 },
  { group: "高圧側", no: 2 },
  { group: "低圧側", no: 1 },
  { group: "低圧側", no: 2 },
];

//Equipment
export const headers = ["開放式湯弗器", "給温器", "風呂釜"];

//Meter
export const optionsMeter = [
  "0: 空白",
  "01: 火災・爆発",
  "02: 地震",
  "03: CO",
  "04: ガス漏れ",
  "05: ガス臭",
  "06: 不着火",
  "07: 圧力異常",
  "08: 遮断異常",
  "09: 使用時間遮断",
  "10: 流量遮断",
  "11: ガス漏れ警報",
  "12: 圧力低下遮断",
  "13: 閉塞圧異常警報",
  "14: 電池圧力低下",
  "15: 流量式減少",
  "16: 圧力式減少",
  "17: 異常なし",
  "18: 電源プラグ",
  "30: その他",
];

//Piping
export const inspectionMethods = [
  { value: 0, label: "0:未選択" },
  { value: 1, label: "1:掘出調査" },
  { value: 2, label: "2:気密試験" },
  { value: 3, label: "3:漏洩試験" },
  { value: 4, label: "4:目視" },
  { value: 5, label: "5:ボーリング調査" },
  { value: 6, label: "6:検知装置" },
  { value: 9, label: "7:その他" },
];

//Regulator
export const rowsRegulator = [
  {
    no: "1",
    type: "種別01",
    maker: "xxx003",
    model: "00001",
    capacity: "00001",
    manufacture: "2012/01",
    valid: "2012/01",
  },
  {
    no: "2",
    type: "種別02",
    maker: "xxx003",
    model: "00001",
    capacity: "00001",
    manufacture: "2012/01",
    valid: "2012/01",
  },
];

//SupplyPipe
export const optionsSupplyPipe = [
  "0: 未選択",
  "1: 掘出調査",
  "2: 気密試験",
  "3: 漏洩試験",
  "4: 目視",
  "5: ボーリング調査",
  "6: 検知装置",
  "9: その他",
];
export const rowsSupplyPipe = [
  { group: "高圧側", no: 1 },
  { group: "高圧側", no: 2 },
  { group: "低圧側", no: 1 },
  { group: "低圧側", no: 2 },
];

// Vessel
export const leftLabels = [
  "①火気制限",
  "②40℃以下",
  "③設置場所",
  "④転倒転落週出防止",
  "⑤バルブ損傷防止",
  "⑥腐食防止",
];
export const rightLabels = [
  "⑦保安距離",
  "⑧滞留防止",
  "⑨柵塀設置",
  "⑩警戒標",
  "⑪消火設備",
  "⑫屋根・遮蔽板",
];

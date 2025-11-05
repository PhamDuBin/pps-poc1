// Types for Sale Slip Entry features

export interface HeaderRow {
  slipNumber: string;
  category: string;
  date: string;
  customerCode: string;
  customerName: string;
  billingCode: string;
  billingName: string;
  remarks: string;
  [key: string]: string | number;
}

export interface DetailRow {
  id: number;
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
  remarks: string;
  [key: string]: string | number;
}

export interface SaleSlip {
  id: number;
  headerRow: HeaderRow;
  detailRows: DetailRow[];
  totalAmount: number;
  totalTax: number;
  grandTotal: number;
}

export interface SaleSlipFormData {
  slipNumber?: string;
  category?: string;
  date?: string;
  customerCode?: string;
  customerName?: string;
  billingCode?: string;
  billingName?: string;
  remarks?: string;
}

export interface CategoryOption {
  id: string;
  name: string;
  displayName: string;
}

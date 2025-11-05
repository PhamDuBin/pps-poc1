// Types for Customer related features

export interface Customer {
  id: number | string;
  customerCode: string;
  customerName: string;
  kanaName: string;
  postalCode: string;
  address: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  billingCode?: string;
  remarks?: string;
  [key: string]: string | number | undefined;
}

export interface CustomerSearchParams {
  customerCode?: string;
  customerName?: string;
  kanaName?: string;
  phoneNumber?: string;
  address?: string;
  [key: string]: string | undefined;
}

export interface CustomerBalance {
  month: string;
  balance: number;
  status: string;
  autoTransfer: boolean;
}

export interface FamilyMember {
  id: number;
  relationship: string;
  name: string;
  kanaName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

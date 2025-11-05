// Common TypeScript interfaces and types used across the application

// Screen navigation types
export type ScreenDirection = "next" | "prev";

export interface ScreenNavigationProps {
  onSwitchScreen?: (direction: ScreenDirection) => void;
}

// Form field types
export interface FormField {
  id: string;
  label: string;
  type: 'single' | 'double' | 'triple' | 'text' | 'select' | 'date';
  placeholder?: string;
  options?: string[];
  width?: string;
}

export interface FormValues {
  [key: string]: string | number | boolean | null;
}

// Table row types
export interface TableRow {
  id: number | string;
  [key: string]: any; // Allow flexible properties for different table types
}

// Search result types
export interface SearchResult<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Modal props
export interface BaseModalProps {
  onClose: () => void;
}

// Button types
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'default';

// Input change handler
export type InputChangeHandler = (value: string) => void;

// Generic callback
export type VoidCallback = () => void;

export interface ColumnConfig<T> {
    id: keyof T | string;
    label: string;
    align?: 'left' | 'right' | 'center' | 'inherit' | 'justify';
    render?: (row: T) => React.ReactNode;
  }
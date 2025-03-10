export type ColumnType = "String" | "Number" | "Boolean";

export interface ColumnData {
  name: string;
  type: ColumnType;
  required: boolean;
  unique: boolean;
}

export interface ColumnFormProps {
  index: number;
  columns: ColumnData[];
  errorMessage?: string;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  setErrors: React.Dispatch<React.SetStateAction<TableFormError>>;
}

export interface TableFormError {
  tableName: string;
  columnNames: (string | "")[];
}

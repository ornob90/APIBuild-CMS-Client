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
  column: ColumnData;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  setErrors: React.Dispatch<React.SetStateAction<TableFormError>>;
}

export interface Table {
  _id?: string;
  projectId: string;
  tableName: string;
  columnNames: string[];
}

export interface TableFormError {
  tableName: string;
  columnNames: (string | "")[];
}

export interface TablesByUserResponse {
  tables?: Table[];
  total?: number;
  page?: number;
  limit?: number;
  totalPage?: number;
}

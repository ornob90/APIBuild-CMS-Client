import { Option } from "@/types/htmls.types";
import { ColumnData, TableFormError } from "@/types/tables.types";

export const columnTypeOptions: Option[] = [
  {
    value: "String",
    label: "String",
  },
  {
    value: "Number",
    label: "Number",
  },
  {
    value: "Boolean",
    label: "Boolean",
  },
];

export const initialColumnForm: ColumnData = {
  name: "",
  required: false,
  type: "String",
  unique: false,
};
export const initialTableError: TableFormError = {
  tableName: "",
  columnNames: [],
};

export const tablesHeaderData = [
  { key: "rowNumber", label: "No." },
  { key: "projectName", label: "Project Name" },
  { key: "tableName", label: "Table Name" },
  { key: "action", label: "Action", className: "text-center" }, // Center the action column
];

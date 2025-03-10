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


export const initialColumnForm: ColumnData  = { name: "", required: false, type: "String", unique: false }
export const initialTableError: TableFormError = { tableName: "", columnNames: [] }
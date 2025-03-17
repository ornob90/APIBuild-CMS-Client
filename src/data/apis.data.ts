import { Option } from "@/types/htmls.types";

export const methodOptions: Option[] = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "DELETE", label: "DELETE" },
];

export const actionOptions: Option[] = [
  // { value: 'findone', label: 'findone' },
  // { value: 'findAll', label: 'findAll' },
  { value: "find", label: "Find" },
  { value: "insert", label: "Insert" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
];

export const findOptions: Option[] = [
  { value: "findOne", label: "Find One" },
  { value: "findAll", label: "Find All" },
  { value: "aggregate", label: "Aggregate" },
];

export const sortOrderOptions: Option[] = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export const aggregateTypeOptions: Option[] = [
  { value: "count", label: "Count" },
  { value: "sum", label: "Sum" },
  { value: "avg", label: "Average" },
];

export const initialFormData = {
  path: "",
  method: "GET",
  action: "find",
  tableId: "",
  queryField: "",
  sortField: "",
  sortOrder: 0,
  limit: 0,
  groupBy: "",
  aggregateType: "",
  aggregateField: "",
  params: [],
};

export const apisTableHeader = [
  { key: "rowNumber", label: "No." },
  { key: "tableName", label: "Table" },
  { key: "method", label: "Method" },
  { key: "path", label: "Path" },
  { key: "action", label: "Operation" },
  { key: "delete", label: "Action" },
];

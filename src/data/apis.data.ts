import { Option } from "@/types/htmls.types";

export const methodOptions: Option[] = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

export const actionOptions: Option[]  = [
  { value: 'findone', label: 'findone' },
  { value: 'findAll', label: 'findAll' },
  { value: 'aggregate', label: 'aggregate' },
  { value: 'insert', label: 'insert' },
  { value: 'update', label: 'update' },
  { value: 'delete', label: 'delete' },
];

export const sortOrderOptions: Option[]  = [
  { value: "1", label: 'Ascending' },
  { value: "-1", label: 'Descending' },
];

export const aggregateTypeOptions: Option[]  = [
  { value: 'count', label: 'Count' },
  { value: 'sum', label: 'Sum' },
  { value: 'average', label: 'Average' },
];
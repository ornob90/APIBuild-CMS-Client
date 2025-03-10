export interface ApiFormData {
  method: string;
  path: string;
  tableId: string;
  action: string;
  queryField?: string;
  paramName?: string;
  sortField?: string;
  sortOrder?: number;
  limit?: number;
  groupBy?: string;
  aggregateType?: string;
  aggregateField?: string;
  returnIdOnly?: boolean;
  returnUpdated?: boolean;
  returnCount?: boolean;
}

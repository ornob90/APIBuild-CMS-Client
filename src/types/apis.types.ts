export type Param = {
  name: string;
  action: "findOne" | "findAll";
};

export interface ApiFormData {
  method: string;
  path: string;
  tableId: string;
  action: string;
  queryField?: string;
  params?: Param[];
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

export interface APIFormError {
  path: string;
}

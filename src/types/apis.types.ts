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
  sortOrder?: string;
  limit?: number;
  groupBy?: string;
  aggregateType?: string;
  aggregateField?: string;
  returnIdOnly?: boolean;
  returnUpdated?: boolean;
  returnCount?: boolean;
}

export interface Api {
  _id: string;
  method: string;
  path: string;
  table: {
    _id: string;
    userId: string;
    projectId: string;
    tableName: string;
  };
  action: string;
  params: {
    name: string;
    action: string;
    _id: string;
  };
  sortOrder: "desc" | "asc";
  limit: number;
  aggregateType: string;
}

export interface APIFormError {
  path: string;
}

export interface ApisByUserResponse {
  apis: Api[];
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

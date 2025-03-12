export enum ApiStatus {
  IDLE = "",
  PENDING = "pending",
  FINISH = "finish",
  ERROR = "error",
}

export interface ServerActionState {
  message: string;
  status: ApiStatus;
}

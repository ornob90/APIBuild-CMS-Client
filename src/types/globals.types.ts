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

export interface PageParams {
  params: { [key: string]: string };
}

export interface PageSearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

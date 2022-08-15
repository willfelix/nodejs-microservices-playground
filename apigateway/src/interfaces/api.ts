export type RequestMethod =
  | "get"
  | "put"
  | "post"
  | "patch"
  | "delete"
  | "options";

type RequestOptions = {
  url: string;
  method: RequestMethod;
  params?: object;
  timeout?: number;
};

export interface API {
  request<T = string>(options: RequestOptions): Promise<T>;
  get<T = string>(options: RequestOptions): Promise<T>;
  put<T = string>(options: RequestOptions): Promise<T>;
  post<T = string>(options: RequestOptions): Promise<T>;
  patch<T = string>(options: RequestOptions): Promise<T>;
  delete<T = string>(options: RequestOptions): Promise<T>;
}

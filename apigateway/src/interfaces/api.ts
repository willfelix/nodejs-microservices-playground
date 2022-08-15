type RequestOptions = {
  url: string;
  method: "get" | "put" | "post" | "patch" | "delete" | "options";
  params?: object;
  timeout?: number;
};

export interface API {
  request<T = string>(options: RequestOptions): Promise<T>;
}

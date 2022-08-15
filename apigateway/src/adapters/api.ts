import axios from "axios";
import { API } from "../interfaces/api";

export const api: API = {
  get: async (options) => {
    return api.request({
      ...options,
      method: "get",
    });
  },
  post: async (options) => {
    return api.request({
      ...options,
      method: "post",
    });
  },
  put: async (options) => {
    return api.request({
      ...options,
      method: "put",
    });
  },
  patch: async (options) => {
    return api.request({
      ...options,
      method: "patch",
    });
  },
  delete: async (options) => {
    return api.request({
      ...options,
      method: "delete",
    });
  },
  request: async (options) => {
    const { data } = await axios.request({
      url: options.url,
      method: options.method,
      timeout: options.timeout,
      params: options.params,
    });

    return data;
  },
};

import axios from "axios";
import { API } from "../interfaces/api";

export const api: API = {
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

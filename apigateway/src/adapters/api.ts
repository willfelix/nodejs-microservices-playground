import axios from "axios";
import { CircuitBreaker } from "./circuitBreaker";
import { APIError } from "./exception";

type RequestOptions = {
  cache: boolean;
  params?: any;
};

type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

type Cache = {
  [key: string]: {
    timestamp: number;
    value: any;
  };
};

class APIHandler {
  private cache: Cache;
  private readonly circuit: CircuitBreaker;
  private readonly CACHING_TIMEOUT_IN_SECONDS: number = 60 * 1000;

  constructor() {
    this.circuit = new CircuitBreaker();
    this.cache = {};
  }

  get(url: string, options?: RequestOptions) {
    console.log(`# GET ${url}`);
    return this.request(url, "get", options);
  }

  post(url: string, options?: RequestOptions) {
    console.log(`# POST ${url}`);
    return this.request(url, "post", options);
  }

  put(url: string, options?: RequestOptions) {
    console.log(`# PUT ${url}`);
    return this.request(url, "put", options);
  }

  patch(url: string, options?: RequestOptions) {
    console.log(`# PATCH ${url}`);
    return this.request(url, "patch", options);
  }

  delete(url: string, options?: RequestOptions) {
    console.log(`# DELETE ${url}`);
    return this.request(url, "delete", options);
  }

  async request(url: string, method: RequestMethod, options?: RequestOptions) {
    const canRequest = this.circuit.can(url);
    if (!canRequest) {
      throw new APIError(
        `Circuit breaker is open, try again in ${this.circuit.COOLDOWN_PERIOD} seconds`,
        401
      );
    }

    try {
      const { data } = options?.cache
        ? await this.recoverCache(url, method, options?.params)
        : await this.doRequest(url, method, options?.params);

      this.circuit.onSuccess(url);

      return data;
    } catch (e: any) {
      this.circuit.onFailure(url);
      throw new APIError(e.message, 500);
    }
  }

  private async doRequest(url: string, method: RequestMethod, params: any) {
    return await axios.request({
      url,
      method,
      timeout: this.circuit.TIMEOUT,
      params,
    });
  }

  private async recoverCache(url: string, method: RequestMethod, params: any) {
    if (!this.cache[url]) {
      this.cache[url] = {
        value: undefined,
        timestamp: Number.MAX_VALUE,
      };
    }

    const isExpired =
      this.cache[url].timestamp >
      new Date().getTime() + this.CACHING_TIMEOUT_IN_SECONDS;

    if (isExpired) {
      const { data } = await this.doRequest(url, method, params);
      this.cache[url] = {
        value: data,
        timestamp: new Date().getTime(),
      };
    }

    const data = this.cache[url].value;

    return { data };
  }
}

const API = new APIHandler();

export { API };

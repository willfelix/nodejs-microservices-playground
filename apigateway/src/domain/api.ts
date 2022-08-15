import { api } from "../adapters/api";
import { APIError } from "../adapters/exception";
import { CircuitBreaker } from "./circuitBreaker";

type Cache = {
  [key: string]: {
    expireAt: number;
    value: any;
  };
};

type RequestOptions = {
  service: string;
  mappedPath: string;
  cache?: boolean;
  cacheTimeoutInSeconds?: number;
  params?: any;
};

export type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

class APIHandler {
  private cache: Cache;
  private readonly circuit: CircuitBreaker;
  private readonly CACHING_TIMEOUT_IN_SECONDS: number = 20;

  constructor() {
    this.circuit = new CircuitBreaker();
    this.cache = {};
  }

  get(url: string, options: RequestOptions) {
    return this.request(url, "get", options);
  }

  post(url: string, options: RequestOptions) {
    return this.request(url, "post", options);
  }

  put(url: string, options: RequestOptions) {
    return this.request(url, "put", options);
  }

  patch(url: string, options: RequestOptions) {
    return this.request(url, "patch", options);
  }

  delete(url: string, options: RequestOptions) {
    return this.request(url, "delete", options);
  }

  async request(url: string, method: RequestMethod, options: RequestOptions) {
    const canRequest = this.circuit.can(url);
    if (!canRequest) {
      throw new APIError(
        `Circuit breaker is open, try again in ${this.circuit.COOLDOWN_PERIOD} seconds`,
        401
      );
    }

    try {
      const data = options.cache
        ? await this.recoverCache(url, method, options)
        : await this.doRequest(url, method, options);

      this.circuit.onSuccess(url);

      return data;
    } catch (e: any) {
      this.circuit.onFailure(url);
      throw new APIError(e.message, 500);
    }
  }

  private async doRequest(
    endpoint: string,
    method: RequestMethod,
    options: RequestOptions
  ) {
    const serviceRegistryUrl = process.env.SERVICE_REGISTRY_URL;

    const serviceUrl = await api.request({
      url: `${serviceRegistryUrl}/service/${options.service}`,
      method: "get",
    });

    const serviceEndpoint = endpoint.replace(
      options.mappedPath.split("*")[0],
      ""
    );

    const url = `${serviceUrl}/${serviceEndpoint}`;

    return await api.request({
      url,
      method,
      timeout: this.circuit.TIMEOUT,
      params: options.params,
    });
  }

  private async recoverCache(
    endpoint: string,
    method: RequestMethod,
    options: RequestOptions
  ) {
    if (!this.cache[endpoint]) {
      this.cache[endpoint] = {
        value: undefined,
        expireAt: 0,
      };
    }

    const now = new Date().getTime();
    const isExpired = this.cache[endpoint].expireAt < now;

    if (isExpired) {
      const data = await this.doRequest(endpoint, method, options);

      const timeoutInSeconds =
        options.cacheTimeoutInSeconds || this.CACHING_TIMEOUT_IN_SECONDS;
      const timeout = timeoutInSeconds * 1000;

      this.cache[endpoint] = {
        value: data,
        expireAt: new Date().getTime() + timeout,
      };
    }

    const data = this.cache[endpoint].value;

    return { data };
  }
}

const API = new APIHandler();

export { API };

import axios from "axios";
import { CircuitBreaker } from "./circuitBreaker";
import { APIError } from "./exception";

class APIHandler {
  private readonly circuit: CircuitBreaker;

  constructor() {
    this.circuit = new CircuitBreaker();
  }

  async get(url: string) {
    console.log(`# GET ${url}`);

    const canRequest = this.circuit.can(url);
    if (!canRequest) {
      throw new APIError(
        `Circuit breaker is open, try again in ${this.circuit.COOLDOWN_PERIOD} seconds`,
        401
      );
    }

    try {
      const { data } = await axios.get(url, {
        timeout: this.circuit.TIMEOUT,
      });
      this.circuit.onSuccess(url);
      return data;
    } catch (e: any) {
      this.circuit.onFailure(url);
      throw new APIError(e.message, 500);
    }
  }
}

const API = new APIHandler();

export { API };

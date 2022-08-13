enum CircuitStates {
  OPEN,
  CLOSED,
  HALF,
}

export class CircuitBreaker {
  public readonly TIMEOUT: number = 1 * 1000;
  public readonly COOLDOWN_PERIOD: number = 10;
  public readonly FAILURE_THRESHOLD: number = 5;

  private states: {
    [key: string]: {
      failures: number;
      cooldownPeriod: number;
      circuit: CircuitStates;
      nextTry: number;
    };
  };

  constructor() {
    this.states = {};
  }

  onSuccess(endpoint: string) {
    this.init(endpoint);
  }

  onFailure(endpoint: string) {
    const state = this.getState(endpoint);
    state.failures += 1;

    if (state.failures > this.FAILURE_THRESHOLD) {
      state.circuit = CircuitStates.OPEN;
      state.nextTry = new Date().getTime() / 1000 + this.COOLDOWN_PERIOD;
      console.log(`Alert! Circuit for ${endpoint} is OPEN`);
    }
  }

  can(endpoint: string) {
    const state = this.getState(endpoint);

    if (state.circuit === CircuitStates.CLOSED) {
      return true;
    }

    const now = new Date().getTime() / 1000;
    if (state.nextTry <= now) {
      state.circuit = CircuitStates.HALF;
      return true;
    }

    return false;
  }

  private init(endpoint: string) {
    this.states[endpoint] = {
      failures: 0,
      cooldownPeriod: this.COOLDOWN_PERIOD,
      circuit: CircuitStates.CLOSED,
      nextTry: 0,
    };
  }

  private getState(endpoint: string) {
    const state = this.states[endpoint];
    if (!state) {
      this.init(endpoint);
    }

    return this.states[endpoint];
  }
}

export class APIError extends Error {
  private status: number;

  constructor(message: string, status: number = 500) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status;
  }

  statusCode() {
    return this.status;
  }
}

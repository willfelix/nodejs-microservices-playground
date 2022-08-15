import { Logger } from "../interfaces/logger";

export const logger: Logger = {
  info(message) {
    console.log(message);
  },
  error(message, error) {
    console.error(message, error);
  },
};

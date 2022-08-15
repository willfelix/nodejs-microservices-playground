import "dotenv/config";

import { logger } from "./adapters/logger";
import server from "./adapters/server";

try {
  server.start();
} catch (e) {
  logger.error("[apigateway] uncaught error", e);
}

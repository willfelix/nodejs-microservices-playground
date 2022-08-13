import "dotenv/config";
import express from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/error";
import { getRegistry } from "./middleware/registry";

import routes from "./routes";

const port = 3001;
const app = express();

app.use(express.json());

app.use("/api", getRegistry, routes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

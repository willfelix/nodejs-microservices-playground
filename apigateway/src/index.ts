import "dotenv/config";
import express from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/error";

import routes from "./routes";

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

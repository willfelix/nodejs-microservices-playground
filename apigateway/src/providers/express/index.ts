import express from "express";
import "express-async-errors";
import morgan from "morgan";

import { errorHandler } from "./middleware/error";
import routes from "./routes";

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

app.use("/", routes);

app.use(errorHandler);

export default {
  start: () => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  },
};

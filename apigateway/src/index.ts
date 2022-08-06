import "dotenv/config";
import express from "express";

import routes from "./routes";

const port = 3001;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

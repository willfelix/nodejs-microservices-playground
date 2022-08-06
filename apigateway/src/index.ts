import "dotenv/config";

import express from "express";
import { AddressInfo } from "net";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

const listener = app.listen(3001, () => {
  const address = listener.address() as AddressInfo;
  console.log(`Server running on ${address.port}`);
});

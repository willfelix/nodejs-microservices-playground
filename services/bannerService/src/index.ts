import express from "express";
import { AddressInfo } from "net";
import ServiceRegistry from "../lib/registry";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json([
    { title: "Banner 01", image: "" },
    { title: "Banner 02", image: "" },
    { title: "Banner 03", image: "" },
  ]);
});

const listener = app.listen(3002, () => {
  const address = listener.address() as AddressInfo;
  console.log(`Server running on ${address.port}`);

  ServiceRegistry.register({
    name: "banners",
    ip: address.address,
    port: address.port,
  });
});

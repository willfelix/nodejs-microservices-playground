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

const listener = app.listen(3003, () => {
  const address = listener.address() as AddressInfo;
  console.log(`Server running on port ${address.port}`);

  ServiceRegistry.register({
    name: "banners",
    port: address.port,
  });

  const signals = ["SIGTERM", "SIGINT", "uncaughtException"];

  signals.forEach((signal) => {
    process.on(signal, () => {
      ServiceRegistry.unregister({ port: address.port }).finally(() => {
        process.exit(0);
      });
    });
  });
});

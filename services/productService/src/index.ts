import express from "express";
import { AddressInfo } from "net";
import ServiceRegistry from "../lib/registry";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json([
    { title: "Product 01", image: "" },
    { title: "Product 02", image: "" },
    { title: "Product 03", image: "" },
  ]);
});

const listener = app.listen(0, () => {
  const address = listener.address() as AddressInfo;
  console.log(`Server running on port ${address.port}`);

  ServiceRegistry.register({
    name: "products",
    port: address.port,
  });

  process.on("SIGTERM", () => {
    ServiceRegistry.unregister({ port: address.port }).finally(() => {
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    ServiceRegistry.unregister({ port: address.port }).finally(() => {
      process.exit(0);
    });
  });

  process.on("uncaughtException", () => {
    ServiceRegistry.unregister({ port: address.port }).finally(() => {
      process.exit(0);
    });
  });
});

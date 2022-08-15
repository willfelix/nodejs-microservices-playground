import express from "express";
import { AddressInfo } from "net";
import ServiceRegistry from "../lib/registry";

const app = express();

const banners = [
  { id: 1, title: "Banner 01 teste", image: "" },
  { id: 2, title: "Banner 02", image: "" },
  { id: 3, title: "Banner 03", image: "" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.json(banners);
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const banner = banners.find((banner) => banner.id === id);
  res.json(banner);
});

const listener = app.listen(0, () => {
  const address = listener.address() as AddressInfo;
  console.log(`Server running on port ${address.port}`);

  ServiceRegistry.register({
    name: "banners",
    port: address.port,
  });
});

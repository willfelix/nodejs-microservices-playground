import express from "express";
import ServiceRegistry from "./registry";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.end("Ninja Eureka - Service Registry");
});

routes.post("/register", (req, res) => {
  const ip = req.socket.remoteAddress || "";
  const port = req.body.port;
  const name = req.body.name;
  ServiceRegistry.register(name, ip, port);
});

routes.get("/service/:service", (req, res) => {
  try {
    const service = ServiceRegistry.get(req.params.service);
    res.end(service);
  } catch (e: any) {
    res.statusCode = 404;
    res.end(`${e.message}`);
  }
});

export default routes;

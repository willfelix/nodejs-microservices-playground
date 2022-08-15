import express from "express";
import { API, RequestMethod } from "../../../domain/api";

import { services } from "../../../config/index.json";

const routes = express.Router();

services.forEach(({ service, path }) => {
  routes.all(path, async (req, res) => {
    const method = req.method.toLowerCase() as RequestMethod;
    const cache = method === "get";

    const data = await API[method](req.url, {
      cache,
      service,
      mappedPath: path,
    });

    res.json(data);
  });
});

export default routes;

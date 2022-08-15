import express from "express";
import { API, RequestMethod } from "../adapters/api";

import { services } from "../config/index.json";

const routes = express.Router();

const methods: RequestMethod[] = ["put", "post", "delete", "patch"];

services.forEach(({ service, path }) => {
  routes.get(path, async (req, res) => {
    const data = await API.get(req.url, {
      service,
      mappedPath: path,
      cache: true,
    });

    res.json(data);
  });

  methods.forEach((method) => {
    routes[method](path, async (req, res) => {
      const data = await API.put(req.url, { service, mappedPath: path });
      res.json(data);
    });
  });
});

export default routes;

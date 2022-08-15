import express from "express";
import { API } from "../../../domain/api";

import { services } from "../../../config/index.json";
import { RequestMethod } from "../../../interfaces/api";

const routes = express.Router();

services.forEach(({ service, path }) => {
  routes.all(path, async (req, res) => {
    const method = req.method.toLowerCase() as RequestMethod;
    const data = await API.request(req.url, method, {
      service,
      mappedPath: path,
      cache: method === "get",
    });

    res.json(data);
  });
});

export default routes;

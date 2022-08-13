import express from "express";
import { API } from "../adapters/api";

const routes = express.Router();

routes.get("/", async (req, res) => {
  const data = await API.get(`${req.service}/products`);
  res.json(data);
});

export default routes;

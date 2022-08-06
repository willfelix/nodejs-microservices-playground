import axios from "axios";
import express from "express";

const routes = express.Router();

routes.get("/", async (req, res, next) => {
  const service: string = (req as any)["service"];

  const banners = await axios.get(`${service}/products`);

  res.json(banners);
});

export default routes;

import axios from "axios";
import express from "express";

const routes = express.Router();

routes.get("/", async (req, res) => {
  const service: string = (req as any)["service"];
  const url = `${service}/`;

  console.log(`GET ${url}`);
  const { data } = await axios.get(url);
  res.json(data);
});

export default routes;

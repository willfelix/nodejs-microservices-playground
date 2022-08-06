import express from "express";

import { getRegistry } from "../middleware/registry";
import bannerRoutes from "./banners.routes";
import productRoutes from "./products.routes";

const routes = express.Router();

routes.use("/banners", getRegistry, bannerRoutes);
routes.use("/products", getRegistry, productRoutes);

export default routes;

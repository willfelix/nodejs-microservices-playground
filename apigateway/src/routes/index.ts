import express from "express";

import bannerRoutes from "./banners.routes";
import productRoutes from "./products.routes";

const routes = express.Router();

routes.use("/banners", bannerRoutes);
routes.use("/products", productRoutes);

export default routes;

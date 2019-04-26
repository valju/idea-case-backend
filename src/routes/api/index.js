import express from "express";

import reset_service from "./reset_service";
import category from "./category";
import idea from "./idea";
const routes = express.Router();
routes.use("/reset_service", reset_service);
routes.use("/category", category);
routes.use("/idea", idea);

export default routes;

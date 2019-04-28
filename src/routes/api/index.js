import express from "express";

import reset_service from "./reset_service";
import category from "./category";
import member from "./member";

const routes = express.Router();
routes.use("/reset_service", reset_service);
routes.use("/category", category);
routes.use("/member", member);

export default routes;

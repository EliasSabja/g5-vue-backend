import Router from 'express';
const routes = Router();

const userRoutes = require("./user");
const reviewRoutes = require("./review");
const loginRoutes = require("./login");


routes.use("/user", userRoutes);
routes.use("/review", reviewRoutes);
routes.use("/login", loginRoutes);
export default routes;


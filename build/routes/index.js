"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = (0, express_1.default)();
const userRoutes = require("./user");
const reviewRoutes = require("./review");
const loginRoutes = require("./login");
routes.use("/user", userRoutes);
routes.use("/review", reviewRoutes);
routes.use("/login", loginRoutes);
exports.default = routes;

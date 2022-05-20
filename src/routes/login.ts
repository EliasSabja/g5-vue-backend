import { Router, Response, Request } from "express";
import { User } from "../schemas/user";
import { AuthRequest } from "../types/auth";
const LoginController = require("../controllers/loginController");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const loginRouter = Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const { message, user } = await LoginController.loginUser(req.body);
  if (user == null || user == undefined)
    return res.status(400).json({ error: message });

  const token = LoginController.generateToken(user)!;

  res.json({ token, message });
});

module.exports = loginRouter;
